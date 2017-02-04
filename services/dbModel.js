/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
const mongoose_1 = require("mongoose");
/** Internal dependencies **/
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
/*
 user = new UserModel({
 nickname: obj.nickname,});
 */
=======
>>>>>>> Stashed changes
let RecordSchema = new mongoose_1.Schema({
    recordId: {
        type: String,
        required: true,
        unique: true
    },
    fromId: {
        type: String,
        required: true
    },
    toId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});
let BankSchema = new mongoose_1.Schema({
    accountId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    records: [
        {
            recordId: {
                type: String,
                unique: true
            },
            fromId: {
                type: String
            },
            toId: {
                type: String
            },
            amount: {
                type: Number
            }
        }
    ]
});
let ChatSchema = new mongoose_1.Schema({
    chatSeqNo: {
        type: String,
        required: true,
        unique: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    fromId: {
        type: String,
        required: true
    },
    toId: {
        type: String,
        required: true
    },
    chatText: {
        type: String,
        required: true
    }
});
<<<<<<< Updated upstream
=======
>>>>>>> 2583cc94bded84010a2d95dccd116664ef55f6e5
>>>>>>> Stashed changes
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
exports.ChatModel = mongoose_1.model('Chat', ChatSchema);
exports.BankModel = mongoose_1.model('Bank', BankSchema);
