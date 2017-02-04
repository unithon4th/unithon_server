/**
 * Copyright (c) 2016 timeros -
 *
 * @author yuhogyun
 **/

/** External dependencies **/
let bcrypt = require('bcrypt');

/** Internal dependencies **/
import RequestService from './requestService';
import {UserModel} from './dbModel';
import CONFIG from './../config';

export default class AuthService {
    constructor() {

    }
    /** param: obj중에
     enc_id: _obj.response.enc_id 안 써서 버림
     **/
    static createUser(obj) {
        return new Promise((resolve, reject) => {
            this.findUserByUsername(obj.username).then((user) => { // 유져 아이디 찾고
                if (user) reject('duplicated user ID'); // 있으면 중복 알려줌
                else {
                    this._encryptPassword(obj.password).then((hashedPassword) => {
                        let user = new UserModel({username: obj.username, password: hashedPassword, bank: obj.bank, account: obj.account});
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
            this.findUserByUsername(obj.username).then((user) => { // 유져 아이디 찾고
                if (user) { // 네이버 아이디 있으면 로그인시도
                    console.log(CONFIG.NAVER_API_PROFILE);
                    console.log(obj.token);
                    AuthService.getUserInfoByNaver(CONFIG.NAVER_API_PROFILE, obj.token).then((body) => {
                        if (body.hasOwnProperty('message') && body['message'] === 'success') {
                            resolve('login success by naver'); // 로그인 성공 Todo: 바꿔야함 비밀번호, 정보 업데이트 되도록
                        } else {
                            reject(body); // 실패 => 가입
                        }
                    }).catch((err) => {
                        return reject(err);
                    });
                } else { // 네이버 아이디가 없으면 가입
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
                if (obj.naverAuth === true) { // naver auth
                    user = new UserModel({username: obj.username, password: hashedPassword, age: obj.age,
                        nickname: obj.nickname, birthday: obj.birthday, name: obj.name,
                        naverId: obj.id, gender: obj.gender, profile_image: obj.profile_image, bank: obj.bank, account: obj.account});
                }else { // normal auth
                    user = new UserModel({username: obj.username, password: hashedPassword});
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
        return UserModel.findOne({_id: id});
    }

    static findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    static updateUser(userID, user) {
        return UserModel.update({_id: userID}, {username: user.username});
    }

    static deleteUser(id) {
        return UserModel.remove({_id: id});
    }

    static getUserInfoByNaver(url, token) {
        return new Promise((resolve, reject) => {
            RequestService.requestHTTP(url, token).then((body) => {
                let object: any = body;
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
            bcrypt.hash(plaintextPassword, CONFIG.BCRYPT_SALT_ROUNDS).then((hash) => {
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
}
