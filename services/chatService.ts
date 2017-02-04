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
import CONFIG from './../config';

export default class ChatService {

    constructor() {
    }

    static makeId() {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for ( let i = 0; i < 64; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    static addChat(userId, chatText) {
        return new Promise((resolve, reject) => {
            this.createChat(userId, 'bot', chatText).then(() => {
                this.executeNlp(chatText).then((nlpResult) => {
                    console.log(nlpResult);
                    console.log('speech : ' + nlpResult['result']['speech']);
                    this.createChat('bot', userId, nlpResult['result']['speech']).then(() => {
                    console.log('hihihi');
                        resolve(nlpResult);
                    });
                });
            });
        });
    }

    static createChat(fromId, toId, chatText){
        return new Promise((resolve, reject) => {
            new ChatModel(
                {
                    chatSeqNo: this.makeId(),
                    timestamp: Date.now()
                    fromId: fromId,
                    toId: toId,
                    chatText: chatText
                }
            ).save().then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
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
                    console.log(body);
                    console.log(response.statusCode);
                    if (!error && response.statusCode === 200) {
                        resolve(JSON.parse(body));
                    }
                    else {
                        reject(error);
                    }
                }
            );
        });
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
    }
}
