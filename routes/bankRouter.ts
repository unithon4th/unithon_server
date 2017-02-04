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
        console.log(req.query);
        var userId = req.query.userId;
        BankController.read(userId).then((data) => {
            res.status(200).json(
                {
                    res: 'success',
                    data: data
                }
            );    
        }).catch((err) => {
            res.status(500).json({errmsg: err.errmsg});
        });
    },
    withdraw(req,res){
        var userId = req.body.userId;
        var toId = req.body.toId;
        var amount = req.body.amount;
        if(userId == toId){
            res.status(500).json({errmsg: "you can't send it to yourself"});
        }
        else{
            BankController.withdraw(userId, toId, amount).then((data) => {
                res.status(200).json(
                    {
                        res: 'success',
                        data: data
                    }
                );    
            }).catch((err) => {
                res.status(500).json({errmsg: err.errmsg});
            });
        }
    },
    deposit(req, res) {
        var userId = req.body.userId;
        var toId = req.body.toId;
        var amount = req.body.amount;
        BankController.deposit(userId, amount).then((data) => {
            res.status(200).json(
                {
                    res: 'success',
                    data: data
                }
            );    
        }).catch((err) => {
            res.status(500).json({errmsg: err.errmsg});
        });
    }
};

export default BankRouter;
