/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/

/** External dependencies **/
import {Document, model, Model, Schema} from 'mongoose';

/** Internal dependencies **/
let RecordSchema: Schema = new Schema({
    recordId : {
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
    },
    name: String
});

let BankSchema: Schema = new Schema({
    accountId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    name: String,
    records: [
        {
            recordId : {
                type: String
            },
            timestamp: {
                type: Date
            },
            fromId: {
                type: String
            },
            toId: {
                type: String
            },
            amount: {
                type: Number
            },
            name: {
                type: String
            },
            status: {
                type: String
            },
        }
    ]
});

let ChatSchema: Schema = new Schema({
    chatSeqNo: {
        type: String,
        required: true,
        unique: true
    },
    timestamp: {
        type: Date,
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

let UserSchema: Schema = new Schema({
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
    accessToken: String,
    refreshToken: String,
    tokenType: String,
    profile_image: String,
    gender: String,
    naverId: String,
    birthday: String,
    nickname: String
    // data: [Schema.Types.Mixed]
});

interface IBank extends Document {
    accountId: string;
    userId: string;
    name: string;
    timestamp: Date;
    records: any[];
}

interface IUser extends Document {
    username: string;
    password: string;
    name: string;
    age: string;
    bank: string;
    account: number;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    profile_image: string;
    gender: string;
    naverId: string;
    birthday: string;
    nickname: string;
}

interface IChat extends Document {
    chatSeqNo: string;
    timestamp: Date;
    fromId: string;
    toId: string;
    chatText: string;
}

export let UserModel: Model<IUser> = model<IUser>('User', UserSchema);
export let ChatModel: Model<IChat> = model<IChat>('Chat', ChatSchema);
export let BankModel: Model<IBank> = model<IBank>('Bank', BankSchema);
