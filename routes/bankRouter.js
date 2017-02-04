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
        console.log(req.query);
        var userId = req.query.userId;
        bankControlelr_1.default.read(userId).then((data) => {
            res.status(200).json({
                res: 'success',
                data: data
            });
        }).catch((err) => {
            res.status(500).json({ errmsg: err.errmsg });
        });
    },
    withdraw(req, res) {
        var userId = req.body.userId;
        var toId = req.body.toId;
        var amount = req.body.amount;
        if (userId == toId) {
            res.status(500).json({ errmsg: "you can't send it to yourself" });
        }
        else {
            bankControlelr_1.default.withdraw(userId, toId, amount).then((data) => {
                res.status(200).json({
                    res: 'success',
                    data: data
                });
            }).catch((err) => {
                res.status(500).json({ errmsg: err.errmsg });
            });
        }
    },
    deposit(req, res) {
        var userId = req.body.userId;
        var toId = req.body.toId;
        var amount = req.body.amount;
        bankControlelr_1.default.deposit(userId, amount).then((data) => {
            res.status(200).json({
                res: 'success',
                data: data
            });
        }).catch((err) => {
            res.status(500).json({ errmsg: err.errmsg });
        });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BankRouter;
