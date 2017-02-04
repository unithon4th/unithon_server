/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const mailService_1 = require("./../services/mailService");
class UserController {
    constructor() {
    }
    static sendMail(email) {
        return mailService_1.default.sendMail(email);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserController;
