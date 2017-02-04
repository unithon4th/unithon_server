/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/

/** External dependencies **/

/** Internal dependencies **/
import AuthService from './../services/authService';

export default class AuthController {

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
        return AuthService.createUser(obj);
    }

    static readUser(id) {
        return AuthService.readUser(id);
    }

    static updateUser(userID, user) {
        return AuthService.updateUser(userID, user);
    }

    static deleteUser(id) {
        return AuthService.deleteUser(id);
    }

}
