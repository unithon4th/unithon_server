/**
 * Copyright (c) 2016 timeros -
 *
 * @author yuhogyun
 **/

/** Internal dependencies **/
import CONFIG from './../config';

/** External dependencies **/
let mailgun = require('mailgun-js')({apiKey: CONFIG.MAILGUN_API_KEY, domain: CONFIG.MAILGUN_DOMAIN});
import mailHTML from './mailHTML';


export default class MailService {
    constructor() {

    }

    static sendMail(email) {
        return new Promise((resolve, reject) => {
            let data = {
                from: 'unithon <yoohoogun114@naver.com>',
                to: email,
                subject: '돈 받으러 나왔습니다.',
                text: '일수하러 나왔습니다 \n <a href="https://namu.wiki/w/%EC%9D%BC%EC%88%98">일수란?</a>',
                html: mailHTML
            };
            mailgun.messages().send(data, function (error, body) {
                if (error) reject(error);
                resolve(body);
            });
        });
    }
}
