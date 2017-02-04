/**
 * Created by yuhogyun on 2017. 2. 4..
 */
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const mailController_1 = require("./../controller/mailController");
const MailRouter = {
    send(req, res) {
        let email = req.body.email;
        mailController_1.default.sendMail(email).then(() => {
            res.status(200).json({ res: 'success' });
        }).catch((err) => {
            res.status(500).json({ res: err });
        });
    },
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MailRouter;
