/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
const mongoose_1 = require("mongoose");
/** Internal dependencies **/
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
    age: Number,
    friends: [String],
    data: [mongoose_1.Schema.Types.Mixed]
});
exports.UserModel = mongoose_1.model('User', UserSchema);
exports.ChatModel = mongoose_1.model('Chat', ChatSchema);
