/**
 * Copyright (c) 2016 timeros -
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
let bcrypt = require('bcrypt');
var request = require('request');
const dbModel_1 = require("./dbModel");
class BankService {
    constructor() {
    }
    static initBank(userId) {
        return new Promise((resolve, reject) => {
            console.log("id" + userId);
            new dbModel_1.BankModel({
                accountId: this.makeId(),
                userId: userId
            }).save().then(() => {
                resolve();
            });
        });
    }
    static getBankByType(userId, type) {
        let regex = /.*type.*/;
        return new Promise((resolve, reject) => {
            dbModel_1.BankModel.findOne({
                'userId': userId,
            }).then((data) => {
                console.log(data);
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    ;
    static getBankInfo(userId) {
        console.log('exist');
        return new Promise((resolve, reject) => {
            dbModel_1.BankModel.findOne({
                'userId': userId
            }).then((data) => {
                // console.log(data);
                if (data == null) {
                    this.initBank(userId).then(() => {
                        this.getBankInfo(userId).then(() => {
                            resolve(this.getBankInfo(userId));
                        });
                    });
                }
                else {
                    var money = 0;
                    for (var i = 0; i < data['records'].length; i++) {
                        if (data['records'][i]['amount'] == null)
                            continue;
                        if (data['records'][i]['toId'] == userId) {
                            money += data['records'][i]['amount'];
                        }
                        else {
                            money -= data['records'][i]['amount'];
                        }
                    }
                    var result = JSON.parse(JSON.stringify(data));
                    // console.log(result);
                    result['money'] = money;
                    // console.log(money);
                    // console.log(result);
                    resolve(result);
                }
            });
        });
    }
    static read(userId) {
        return new Promise((resolve, reject) => {
            this.getBankInfo(userId).then((data) => {
                resolve(data);
            });
        });
    }
    static withdraw(userId, toId, amount, name, date) {
        return new Promise((resolve, reject) => {
            this.getBankInfo(userId).then((data) => {
                if (data['money'] < amount) {
                    reject({
                        errmsg: 'not enough money'
                    });
                }
                else {
                    var recordSendId = this.makeId();
                    var recordRecvId = this.makeId();
                    dbModel_1.BankModel.update({
                        userId: userId
                    }, {
                        $push: {
                            'records': {
                                recordId: recordSendId,
                                fromId: userId,
                                toId: toId,
                                amount: amount,
                                name: name,
                                timestamp: date || Date.now(),
                                status: 'out'
                            }
                        }
                    }).then(() => {
                        dbModel_1.BankModel.update({
                            userId: toId
                        }, {
                            $push: {
                                'records': {
                                    recordId: recordRecvId,
                                    fromId: toId,
                                    toId: userId,
                                    amount: amount,
                                    name: name,
                                    timestamp: date || Date.now(),
                                    status: 'in'
                                }
                            }
                        }).then(() => {
                            resolve({
                                'recoredSendId': recordSendId,
                                'recordRecvId': recordRecvId,
                                'totalAmount': parseInt(data['money']) - parseInt(amount),
                                name: name
                            });
                        });
                    });
                }
            });
        });
    }
    static deposit(userId, amount, name, date) {
        console.log('=========');
        // console.log(name);
        console.log('=========');
        return new Promise((resolve, reject) => {
            this.getBankInfo(userId).then((data) => {
                dbModel_1.BankModel.update({
                    userId: userId
                }, {
                    $push: {
                        'records': {
                            recordId: this.makeId(),
                            fromId: userId,
                            toId: userId,
                            amount: amount,
                            name: name,
                            timestamp: date || Date.now(),
                            status: 'in'
                        }
                    }
                }).then(() => {
                    resolve(parseInt(data['money']) + parseInt(amount));
                });
            });
        });
    }
    static makeId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 64; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BankService;
