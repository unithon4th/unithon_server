/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/

/** External dependencies **/

/** Internal dependencies **/
import MailService from './../services/mailService';

export default class UserController {

    constructor() {

    }

    static sendMail(email) {
        return MailService.sendMail(email);
    }

}
