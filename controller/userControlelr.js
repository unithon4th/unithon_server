/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const authService_1 = require("./../services/authService");
class AuthController {
    constructor() {
    }
    // Todo: used by naver auth and local auth both. need to divde function
    static createUser(_obj) {
        let obj = {
            username: _obj.username,
            password: _obj.password,
            bank: _obj.bank,
            account: _obj.account
        };
        return authService_1.default.createUser(obj);
    }
    static readUser(id) {
        return authService_1.default.readUser(id);
    }
    static updateUser(userID, user) {
        return authService_1.default.updateUser(userID, user);
    }
    static deleteUser(id) {
        return authService_1.default.deleteUser(id);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthController;
