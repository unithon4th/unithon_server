/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
const mongoose_1 = require("mongoose");
/** Internal dependencies **/
/*
 user = new UserModel({
 nickname: obj.nickname,});
 */
let UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
    age: String,
    bank: {
        type: String,
        required: true,
    },
    account: {
        type: Number,
        required: true,
    },
    profile_image: String,
    gender: String,
    naverId: String,
    birthday: String,
    nickname: String
});
exports.UserModel = mongoose_1.model('User', UserSchema);
