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
        user.password = undefined;
        res.status(200).json({res: user});
    },
    fail(req, res) {
        res.status(500).json({res: 'login failed'});
    },
    loginAlert(req, res) {
        res.status(500).json({res: 'need to login'});
    },
    naver(req, res) {
        let accessToken = req.body.accessToken;
        let refreshToken = req.body.refreshToken;
        let tokenType = req.body.tokenType;
        let bank = req.body.bank;
        let account = req.body.account;
        if (!accessToken) {
            res.status(500).json({res: 'need to token'});
            return;
        }
        // first get naver user info by token
        AuthController.getNaverUserInfo(accessToken).then((body) => {
            body['bank'] = bank;
            body['account'] = account;
            body['refreshToken'] = refreshToken;
            body['tokenType'] = tokenType;
            return Promise.resolve(body);
        }).then((body) => {
            if (body.hasOwnProperty('message') && body['message'] === 'success') {
                return Promise.resolve(body);
            }else return Promise.reject('Naver auth crashed');
        }).then((body) => {
            AuthController.authByNaver(body).then((result) => {
                res.status(200).json({res: result});
            }).catch((err) => {
                res.status(500).json({res: err});
            });
        }).catch((err) => {
            res.status(500).json({res: 'Token need to resissue', cause: err});
        });
    }
};

export default AuthRouter;
