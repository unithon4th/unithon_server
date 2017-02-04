/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/

/** External dependencies **/

/** Internal dependencies **/
import UserController from './../controller/userControlelr';

const UserRouter = {
    create(req, res) {
        let body = req.body;
        UserController.createUser(body).then(() => {
            res.status(200).json({res: 'success'});
        }).catch((err) => {
            res.status(500).json({res: err});
        });
    },
    read(req, res) {
        let userID = req.params.id;
        UserController.readUser(userID).then((user) => {
            res.status(200).json({res: user});
        }).catch((err) => {
            res.status(500).json({res: err.errmsg});
        });
    },
    update(req, res) {
        let userID = req.params.id;
        let user = req.body;
        UserController.updateUser(userID, user).then((user) => {
            res.status(200).json({res: user});
        }).catch((err) => {
            res.status(500).json({res: err.errmsg});
        });
    },
    delete(req, res) {
        let userID = req.params.id;
        UserController.deleteUser(userID).then((user) => {
            res.status(200).json({res: user});
        }).catch((err) => {
            res.status(500).json({res: err.errmsg});
        });
    },
};

export default UserRouter;
