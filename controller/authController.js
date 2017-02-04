/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const authService_1 = require("./../services/authService");
const config_1 = require("./../config");
class AuthController {
    constructor() {
    }
    static getNaverUserInfo(_token) {
        let token = _token;
        return new Promise((resolve, reject) => {
            authService_1.default.getUserInfoByNaver(config_1.default.NAVER_API_PROFILE, token).then((body) => {
                resolve(body);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    static authByNaver(_obj) {
        let obj = {
            username: _obj.response.email,
            nickname: _obj.response.nickname,
            enc_id: _obj.response.enc_id,
            profile_image: _obj.response.profile_image,
            age: _obj.response.age,
            gender: _obj.response.gender,
            id: _obj.response.id,
            name: _obj.response.age,
            birthday: _obj.response.birthday,
            password: _obj.token,
            naverAuth: _obj.naverAuth,
            bank: _obj.bank,
            account: _obj.account,
            token: _obj.token
        };
        return new Promise((resolve, reject) => {
            authService_1.default.authByNaver(obj).then((body) => {
                resolve(body);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthController;
