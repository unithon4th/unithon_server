/**
 * Copyright (c) 2016 timeros -
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
let bcrypt = require('bcrypt');
var request = require('request');
/** Internal dependencies **/
const dbModel_1 = require("./dbModel");
const dbModel_2 = require("./dbModel");
const config_1 = require("./../config");
class ChatService {
    constructor() {
    }
    static makeId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 64; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    static addChat(userId, chatText) {
        return new Promise((resolve, reject) => {
            this.createChat(userId, 'bot', chatText).then(() => {
                this.executeNlp(chatText).then((nlpResult) => {
                    console.log(nlpResult);
                    console.log("speech : " + nlpResult['result']['speech']);
                    this.createChat('bot', userId, nlpResult['result']['speech']).then(() => {
                        console.log("hihihi");
                        resolve(nlpResult);
                    });
                });
            });
        });
    }
    static createChat(fromId, toId, chatText) {
        return new Promise((resolve, reject) => {
            new dbModel_2.ChatModel({
                chatSeqNo: this.makeId(),
                timestamp: Math.floor(Date.now() / 1000),
                fromId: fromId,
                toId: toId,
                chatText: chatText
            }).save().then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    }
    static executeNlp(chatText) {
        return new Promise((resolve, reject) => {
            request.get({
                url: 'https://api.api.ai/v1/query',
                headers: {
                    'Authorization': 'Bearer 24a5576f040d49c1a45552a11334dc86'
                },
                qs: {
                    'query': chatText,
                    'lang': 'kr',
                    'sessionId': '1234'
                }
            }, (error, response, body) => {
                console.log(body);
                console.log(response.statusCode);
                if (!error && response.statusCode == 200) {
                    resolve(JSON.parse(body));
                }
                else {
                    reject(error);
                }
            });
        });
    }
    static readUser(userId) {
        return dbModel_2.ChatModel.find({
            $or: [
                {
                    'fromId': userId
                },
                {
                    'toId': userId
                }
            ]
        });
    }
    static updateUser(userID, user) {
        return dbModel_1.UserModel.update({ _id: userID }, { username: user.username });
    }
    static deleteUser(id) {
        return dbModel_1.UserModel.remove({ _id: id });
    }
    static _encryptPassword(plaintextPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(plaintextPassword, config_1.default.BCRYPT_SALT_ROUNDS).then((hash) => {
                resolve(hash);
            });
        });
    }
    static _verifyPassword(plainPassword, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainPassword, hash).then((res) => {
                resolve(res);
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatService;
