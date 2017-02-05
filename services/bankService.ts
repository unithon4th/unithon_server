/**
 * Copyright (c) 2016 timeros -
 *
 * @author yuhogyun
 **/

/** External dependencies **/
let bcrypt = require('bcrypt');
var request = require('request');

/** Internal dependencies **/
import {ChatModel} from './dbModel';
import {BankModel} from './dbModel';
import CONFIG from './../config';

export default class BankService {

    constructor() {
         
    }

    static initBank(userId){
        return new Promise( (resolve, reject) => {
        console.log("id" + userId);
            new BankModel(
                {
                    accountId: this.makeId(),
                    userId: userId
                }
            ).save().then(() => {
                resolve();
            })
        })

    }

    static getBankByType(userId, type) {
        let regex = /.*type.*/;
        return new Promise((resolve, reject) => {
            BankModel.findOne(
                {
                    'userId': userId,
                }).then((data) => {
                console.log(data);
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        });

    };
    
    static getBankInfo(userId){
        console.log('exist');
        return new Promise((resolve, reject) => {
            BankModel.findOne(
                {
                    'userId': userId
                }
            ).then((data) => {
                // console.log(data);
                if(data == null){
                    this.initBank(userId).then(()=> {
                        this.getBankInfo(userId).then(()=>{
                            resolve(this.getBankInfo(userId));
                        })
                    })
                }
                else{
                    var money = 0
                    for(var i=0; i<data['records'].length; i++){
                        if(data['records'][i]['amount'] == null) continue;
                        if (data['records'][i]['toId'] == userId){
                            money+=data['records'][i]['amount'];
                        }else{
                            money-=data['records'][i]['amount'];
                        }
                    }
                    var result = JSON.parse(JSON.stringify(data));
                    // console.log(result);
                    result['money'] = money;
                    // console.log(money);
                    // console.log(result);
                    resolve(result)
                }
            });
        })
    }

    static read(userId){
        return new Promise( (resolve, reject) => {

            this.getBankInfo(userId).then((data) => {
                resolve(data)
            });
        });
    }

    static withdraw(userId, toId, amount, name, date){

        return new Promise( (resolve, reject) => {

            this.getBankInfo(userId).then((data) => {
                if(data['money'] < amount){
                    reject(
                        {
                            errmsg:'not enough money'
                        }
                    );
                }
                else{
                    var recordSendId = this.makeId();
                    var recordRecvId = this.makeId();
                    BankModel.update(
                        {
                            userId: userId
                        },
                        {
                            $push: {
                                'records':{
                                    recordId: recordSendId,
                                    fromId: userId,
                                    toId: toId,
                                    amount: amount,
                                    name: name,
                                    timestamp: date || Date.now(),
                                    status: 'out'
                                }
                            }
                        }
                    ).then(() => {
                    BankModel.update(
                            {
                                userId: toId
                            },
                            {
                                $push: {
                                    'records':{
                                        recordId: recordRecvId,
                                        fromId: toId,
                                        toId: userId,
                                        amount: amount,
                                        name: name,
                                        timestamp: date || Date.now(),
                                        status: 'in'
                                    }
                                }
                            }
                        ).then(() => {
                            resolve({
                                'recoredSendId': recordSendId,
                                'recordRecvId':recordRecvId,
                                'totalAmount': parseInt(data['money'])-parseInt(amount),
                                name: name
                            })
                        });
                    });
                }

            });

        });
    }
 
    static deposit(userId, amount, name, date){

        console.log('=========');
        // console.log(name);
        console.log('=========');

        return new Promise( (resolve, reject) => {

            this.getBankInfo(userId).then((data) => {
                BankModel.update(
                    {
                        userId: userId
                    },
                    {
                        $push: {
                            'records':{
                                recordId: this.makeId(),
                                fromId: userId,
                                toId: userId,
                                amount: amount,
                                name: name,
                                timestamp: date || Date.now(),
                                status: 'in'
                            }
                        }
                    }
                ).then(() => {
                    resolve(parseInt(data['money'])+parseInt(amount))
                });
            });

            

        });
    }
    

    static makeId()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 64; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
/*
    static addChat(userId, chatText){
        return new Promise((resolve, reject) => {
            this.createChat(userId, 'bot', chatText).then(() => {
                this.executeNlp(chatText).then((nlpResult) => {
                    console.log(nlpResult);
                    console.log("speech : "+ nlpResult['result']['speech']);
                    this.createChat('bot', userId, nlpResult['result']['speech']).then(() => {
                    console.log("hihihi");
                        resolve(nlpResult);                
                    });
                })

            });
        });
    }

    static createChat(fromId, toId, chatText){
        return new Promise((resolve, reject) => {
            new ChatModel(
                {
                    chatSeqNo: this.makeId(),
                    timestamp: Math.floor(Date.now() / 1000),
                    fromId: fromId,
                    toId: toId,
                    chatText: chatText
                }
            ).save().then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            })
        });
    }

    static executeNlp(chatText){
        return new Promise( (resolve, reject) => {
            request.get(
                {
                    url: 'https://api.api.ai/v1/query',
                    headers: {
                        'Authorization': 'Bearer 24a5576f040d49c1a45552a11334dc86'
                    },
                    qs: {
                        'query': chatText,
                        'lang': 'kr',
                        'sessionId': '1234' 
                    }
                },
                (error, response, body) => {
                    console.log(body)
                    console.log(response.statusCode)
                    if (!error && response.statusCode == 200){
                        resolve(JSON.parse(body))
                    }
                    else{
                        reject(error)
                    }
                }
            );
            
        }) 
            
    }

    static readUser(userId) {
        return ChatModel.find(
            {
                $or:
                [
                    {
                        'fromId': userId
                    },
                    {
                        'toId': userId
                    }
                ]
            }
        );
        
    }*/
}
