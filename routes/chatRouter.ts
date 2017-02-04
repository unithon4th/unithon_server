/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/

/** External dependencies **/

/** Internal dependencies **/
import UserController from './../controller/userControlelr';
import ChatController from './../controller/chatControlelr';

const ChatRouter = {
    test(req,res){
        console.dir(req.body)
        console.log("body" + req.body.chatText)
        console.log("body" + req.body.userId)
        let userId = req.body.userId
        let chatText = req.body.chatText
        ChatController.test(userId, chatText).then((data) => {
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
            )
        }).catch((err) => {
            res.status(500).json({errmsg: err});
        });
    },
    add(req, res){
        
    },
    create(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        UserController.createUser(username, password).then(() => {
            res.status(200).json({res: 'success'});
        }).catch((err) => {
            res.status(500).json({errmsg: err});
        });
    },
    read(req, res) {
        let userID = req.params.id;
        UserController.readUser(userID).then((user) => {
            res.status(200).json({res: user});
        }).catch((err) => {
            res.status(500).json({errmsg: err.errmsg});
        });
    },
    update(req, res) {
        let userID = req.params.id;
        let user = req.body;
        UserController.updateUser(userID, user).then((user) => {
            res.status(200).json({res: user});
        }).catch((err) => {
            res.status(500).json({errmsg: err.errmsg});
        });
    },
    delete(req, res) {
        let userID = req.params.id;
        UserController.deleteUser(userID).then((user) => {
            res.status(200).json({res: user});
        }).catch((err) => {
            res.status(500).json({errmsg: err.errmsg});
        });
    },
};

export default ChatRouter;
