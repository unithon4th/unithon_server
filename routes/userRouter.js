/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const userControlelr_1 = require("./../controller/userControlelr");
const UserRouter = {
    create(req, res) {
        let body = req.body;
        userControlelr_1.default.createUser(body).then(() => {
            res.status(200).json({ res: 'success' });
        }).catch((err) => {
            res.status(500).json({ res: err });
        });
    },
    read(req, res) {
        let userID = req.params.id;
        userControlelr_1.default.readUser(userID).then((user) => {
            res.status(200).json({ res: user });
        }).catch((err) => {
            res.status(500).json({ res: err.errmsg });
        });
    },
    update(req, res) {
        let userID = req.params.id;
        let user = req.body;
        userControlelr_1.default.updateUser(userID, user).then((user) => {
            res.status(200).json({ res: user });
        }).catch((err) => {
            res.status(500).json({ res: err.errmsg });
        });
    },
    delete(req, res) {
        let userID = req.params.id;
        userControlelr_1.default.deleteUser(userID).then((user) => {
            res.status(200).json({ res: user });
        }).catch((err) => {
            res.status(500).json({ res: err.errmsg });
        });
    },
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserRouter;
