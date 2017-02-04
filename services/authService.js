/**
 * Copyright (c) 2016 timeros -
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
let bcrypt = require('bcrypt');
let request = require('request');
/** Internal dependencies **/
const requestService_1 = require("./requestService");
const userService_1 = require("./userService");
const dbModel_1 = require("./dbModel");
const config_1 = require("./../config");
class AuthService {
    constructor() {
    }
    /** param: obj중에
     enc_id: _obj.response.enc_id 안 써서 버림
     **/
    static createUser(obj) {
        return new Promise((resolve, reject) => {
            this.findUserByUsername(obj.username).then((user) => {
                if (user)
                    reject('duplicated user ID'); // 있으면 중복 알려줌
                else {
                    this._encryptPassword(obj.password).then((hashedPassword) => {
                        let user = new dbModel_1.UserModel({ username: obj.username, password: hashedPassword, bank: obj.bank, account: obj.account });
                        user.save().then(() => {
                            resolve();
                        }).catch((err) => {
                            reject(err);
                        });
                    });
                }
            }).catch((err) => {
                return Promise.reject(err);
            });
        });
    }
    static authByNaver(obj) {
        return new Promise((resolve, reject) => {
            this.findUserByUsername(obj.username).then((user) => {
                if (user) {
                    console.log(config_1.default.NAVER_API_PROFILE);
                    console.log(obj.accessToken);
                    this._refreshToken(obj.accessToken, config_1.default.NAVER_API_CLIENT_ID, config_1.default.NAVER_API_CLIENT_SECRET, obj.refreshToken, obj.username).then((refreshedObj) => {
                        console.log('=============Refreshed Token============');
                        console.log(refreshedObj['access_token']);
                        console.log('=============Refreshed Token============');
                        AuthService.getUserInfoByNaver(config_1.default.NAVER_API_PROFILE, refreshedObj['access_token']).then((body) => {
                            if (body.hasOwnProperty('message') && body['message'] === 'success') {
                                user.password = undefined;
                                user.accessToken = undefined;
                                user.refreshToken = undefined;
                                user.tokenType = undefined;
                                resolve(user); // 로그인 성공 Todo: 바꿔야함 비밀번호, 정보 업데이트 되도록
                            }
                            else {
                                reject(body); // 실패 => 가입
                            }
                        }).catch((err) => {
                            return reject(err);
                        });
                    });
                }
                else {
                    this._encryptAndSave(obj).then(() => {
                        return resolve();
                    }).catch((err) => {
                        return reject(err);
                    });
                }
            }).catch((error) => {
                return reject(error);
            });
        });
    }
    static _encryptAndSave(obj) {
        return new Promise((resolve, reject) => {
            this._encryptPassword(obj.password).then((hashedPassword) => {
                let user;
                if (obj.naverAuth === true) {
                    user = new dbModel_1.UserModel({ username: obj.username, password: hashedPassword, age: obj.age,
                        nickname: obj.nickname, birthday: obj.birthday, name: obj.name,
                        naverId: obj.id, gender: obj.gender, profile_image: obj.profile_image, bank: obj.bank, account: obj.account });
                }
                else {
                    user = new dbModel_1.UserModel({ username: obj.username, password: hashedPassword });
                }
                user.save().then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }
    static readUser(id) {
        return dbModel_1.UserModel.findOne({ _id: id });
    }
    static findUserByUsername(username) {
        return dbModel_1.UserModel.findOne({ username: username });
    }
    static updateUser(userID, user) {
        return dbModel_1.UserModel.update({ _id: userID }, { username: user.username });
    }
    static deleteUser(id) {
        return dbModel_1.UserModel.remove({ _id: id });
    }
    static getUserInfoByNaver(url, token) {
        return new Promise((resolve, reject) => {
            requestService_1.default.requestHTTP(url, token).then((body) => {
                let object = body;
                object.naverAuth = true;
                object.token = token;
                resolve(object);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    static _encryptPassword(plaintextPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(plaintextPassword, config_1.default.BCRYPT_SALT_ROUNDS).then((hash) => {
                resolve(hash);
            }).catch((err) => {
                console.log(err);
                reject(err);
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
    static _refreshToken(grant_type, client_id, client_secret, refresh_token, username) {
        return new Promise((resolve, reject) => {
            let options = { method: 'GET',
                url: 'https://nid.naver.com/oauth2.0/token',
                qs: { grant_type: grant_type,
                    client_id: client_id,
                    client_secret: client_secret,
                    refresh_token: refresh_token },
                headers: { 'cache-control': 'no-cache',
                    'content-type': 'application/json' } };
            request(options, function (error, response, body) {
                if (error)
                    reject(error);
                console.log(body);
                let parsedBody = JSON.parse(body);
                userService_1.default.updateUser(username, body['accessToken']).then(() => {
                    resolve(parsedBody);
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthService;
