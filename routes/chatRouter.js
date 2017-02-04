/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/
"use strict";
const chatControlelr_1 = require("./../controller/chatControlelr");
const ChatRouter = {
    test(req, res) {
        let userId = req.body.userId;
        let chatText = req.body.chatText;
        chatControlelr_1.default.add(userId, chatText).then((data) => {
            res.status(200).json({
                res: 'success',
                data: {
                    action: data['result']['metadata']['intentName'],
                    resolvedQuery: data['result']['resolvedQuery'],
                    speech: data['result']['speech'],
                    parameters: data['result']['parameters']
                }
            });
        }).catch((err) => {
            res.status(500).json({ errmsg: err });
        });
    },
    add(req, res) {
        let userId = req.body.userId;
        let chatText = req.body.chatText;
        chatControlelr_1.default.add(userId, chatText).then((data) => {
            res.status(200).json({
                res: 'success',
                data: {
                    action: data['result']['metadata']['intentName'],
                    resolvedQuery: data['result']['resolvedQuery'],
                    speech: data['result']['speech'],
                    parameters: data['result']['parameters']
                }
            });
        }).catch((err) => {
            res.status(500).json({ errmsg: err });
        });
    },
    read(req, res) {
        let userId = req.body.userId;
        chatControlelr_1.default.readChat(userId).then((user) => {
            res.status(200).json({ res: user });
        }).catch((err) => {
            res.status(500).json({ errmsg: err.errmsg });
        });
    },
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatRouter;
