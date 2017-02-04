/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/

/** External dependencies **/

/** Internal dependencies **/
import ChatController from './../controller/chatControlelr';

const ChatRouter = {
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
    },
};

export default ChatRouter;
