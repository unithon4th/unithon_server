/**
 * Created by yuhogyun on 2017. 2. 3..
 */
/** External dependencies **/
import * as passport from 'passport';

/** Internal dependencies **/
import AuthController from './../controller/authController';
import UserController from './../controller/userControlelr';

const AuthRouter = {
    login(req, res) {
        if (req.user) {
            res.status(307).redirect('/auth/success');
            return;
        }
        res.sendFile(__dirname + '/login.html');
    },
    success(req, res) {
        let user = req.user;
        res.status(200).json({res: 'success login with ' + user.username});
    },
    fail(req, res) {
        res.status(500).json({res: 'login failed'});
    },
    loginAlert(req, res) {
        res.status(500).json({res: 'need to login'});
    },
    naver(req, res) {
        let token = req.body.token;
        let bank = req.body.bank;
        let account = req.body.account;
        if (!token) {
            res.status(500).json({res: 'need to token'});
            return;
        }
        // first get naver user info by token
        AuthController.getNaverUserInfo(token).then((body) => {
            body['bank'] = bank;
            body['account'] = account;
            return Promise.resolve(body);
        }).then((body) => {
            if (body.hasOwnProperty('message') && body['message'] === 'success') {
                return Promise.resolve(body);
            }else return Promise.reject('Naver auth crashed');
        }).then((body) => {
            AuthController.authByNaver(body).then((result) => {
                res.status(200).json({res: result || 'Signup success by naver'});
            }).catch((err) => {
                res.status(500).json({res: err});
            });
        }).catch((err) => {
            res.status(500).json({res: 'Token need to resissue', cause: err});
        });
    }
};

export default AuthRouter;
