/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/

/** External dependencies **/

/** Internal dependencies **/
import BankController from './../controller/bankControlelr';

const BankRouter = {

    read(req, res) {
        var userId = req.body.userId;
        BankController.read(userId).then((data) => {
            res.status(200).json(
                {
                    res: 'success',
                    data: data
                }
            );    
        });
    },
    deposit(req, res) {
        var userId = req.body.userId;
        var toId = req.body.toId;
        var amount = req.body.amount;
        BankController.deposit(userId, toId, amount).then((data) => {
            res.status(200).json(
                {
                    res: 'success',
                    data: data
                }
            );    
        });
    }
    /*
    test(req,res){
        let userId = req.body.userId
        let chatText = req.body.chatText
        ChatController.add(userId, chatText).then((data) => {
            res.status(200).json(
                {
                    res: 'success',
                    data: {
                        action: data['result']['metadata']['intentName'],
                        resolvedQuery: data['result']['resolvedQuery'],
                        speech: data['result']['speech'],
                        parameters: data['result']['parameters']    
                    }
                }
            );
        }).catch((err) => {
            res.status(500).json({errmsg: err});
        });
    },
    add(req, res){
        let userId = req.body.userId;
        let chatText = req.body.chatText;

        ChatController.add(userId, chatText).then((data) => {
            res.status(200).json(
                {
                    res: 'success',
                    data: {
                        action: data['result']['metadata']['intentName'],
                        resolvedQuery: data['result']['resolvedQuery'],
                        speech: data['result']['speech'],
                        parameters: data['result']['parameters']    
                    }
                }
            );
        }).catch((err) => {
            res.status(500).json({errmsg: err});
        });
    },
    read(req, res) {
        let userId = req.body.userId
        ChatController.readChat(userId).then((user) => {
            res.status(200).json({res: user});
        }).catch((err) => {
            res.status(500).json({errmsg: err.errmsg});
        });
    },*/
};

export default BankRouter;
