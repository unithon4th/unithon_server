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
                        console.log('1');
                        this.getBankInfo(userId).then(() => {
                            console.log('2');
                            resolve(this.getBankInfo(userId));
                        });
                    });
                }
                else {
                    resolve(data);
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
    static deposit(userId, toId, amount) {
        return new Promise((resolve, reject) => {
            this.getBankInfo(userId);
            resolve('hi');
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
