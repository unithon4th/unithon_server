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
    static getBankInfo(userId) {
        console.log('exist');
        return new Promise((resolve, reject) => {
            dbModel_1.BankModel.findOne({
                'userId': userId
            }).then((data) => {
                console.log(data);
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
                    console.log(result);
                    result['money'] = money;
                    console.log(money);
                    console.log(result);
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
    static withdraw(userId, toId, amount) {
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
                                timestamp: Math.floor(Date.now() / 1000)
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
                                    timestamp: Math.floor(Date.now() / 1000)
                                }
                            }
                        }).then(() => {
                            resolve({
                                'recoredSendId': recordSendId,
                                'recordRecvId': recordRecvId
                            });
                        });
                    });
                }
            });
        });
    }
    static deposit(userId, amount) {
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
                            timestamp: Math.floor(Date.now() / 1000)
                        }
                    }
                }).then(() => {
                    resolve();
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
