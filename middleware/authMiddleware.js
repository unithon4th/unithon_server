/**
 * Created by yuhogyun on 2017. 2. 4..
 */
"use strict";
const AuthMiddleware = {
    userAuthenticated: function (req, res, next) {
        if (req.user) {
            next();
        }
        else {
            res.redirect('/auth/login/alert');
        }
    },
    userNaverAuthenticated: function (req, res, next) {
        if (req.user) {
            res.redirect('/auth/success');
        }
        else {
            next();
        }
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthMiddleware;
