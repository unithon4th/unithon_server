/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const bankControlelr_1 = require("./../controller/bankControlelr");
const BankRouter = {
    read(req, res) {
        var userId = req.body.userId;
        bankControlelr_1.default.read(userId).then((data) => {
            res.status(200).json({
                res: 'success',
                data: data
            });
        });
    },
    deposit(req, res) {
        var userId = req.body.userId;
        var toId = req.body.toId;
        var amount = req.body.amount;
        bankControlelr_1.default.deposit(userId, toId, amount).then((data) => {
            res.status(200).json({
                res: 'success',
                data: data
            });
        });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BankRouter;
