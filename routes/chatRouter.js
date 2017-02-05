/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const chatControlelr_1 = require("./../controller/chatControlelr");
const ChatRouter = {
    add(req, res) {
        let userId = req.body.userId;
        let chatText = req.body.chatText;
        chatControlelr_1.default.add(userId, chatText).then((data) => {
            console.log(data['result']['parameters']);
            if (Object.keys(data['result']['parameters']).length === 0) {
                data['result']['parameters'] = {
                    'money': 'wrong',
                    'name': 'wrong'
                };
            }
            res.status(200).json({
                res: 'success',
                data: {
                    action: data['result']['metadata']['intentName'] || 'wrong',
                    resolvedQuery: data['result']['resolvedQuery'] || 'wrong',
                    speech: data['result']['speech'] || 'wrong',
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
