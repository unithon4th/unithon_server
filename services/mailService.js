/**
 * Copyright (c) 2016 timeros -
 *
 * @author yuhogyun
 **/
"use strict";
/** Internal dependencies **/
const config_1 = require("./../config");
/** External dependencies **/
let mailgun = require('mailgun-js')({ apiKey: config_1.default.MAILGUN_API_KEY, domain: config_1.default.MAILGUN_DOMAIN });
const mailHTML_1 = require("./mailHTML");
class MailService {
    constructor() {
    }
    static sendMail(email) {
        return new Promise((resolve, reject) => {
            let data = {
                from: 'unithon <yoohoogun114@naver.com>',
                to: email,
                subject: '돈 받으러 나왔습니다.',
                text: '일수하러 나왔습니다 \n <a href="https://namu.wiki/w/%EC%9D%BC%EC%88%98">일수란?</a>',
                html: mailHTML_1.default
            };
            mailgun.messages().send(data, function (error, body) {
                if (error)
                    reject(error);
                resolve(body);
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MailService;
