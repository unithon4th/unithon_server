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
    fromId:{
        type: String,
        required: true 
    },
    toId:{
        type: String,
        required: true 
    },
    amount:{
        type:Number,
        required: true
    }
})

let BankSchema: Schema = new Schema({
    accountId: {
        type: String,
        required: true,
        unique: true 
    },
    userId:{
        type: String,
        required: true
    },
    records:[
        {
            recordId : {
                type: String,
                unique: true
            },
            fromId:{
                type: String
            },
            toId:{
                type: String
            },
            amount:{
                type:Number
            }
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
        type:Number,
        required: true
    },
    fromId: {
        type: String,
        required: true
    },
    toId:{
        type: String, 
        required: true
    },
    chatText:{
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
    age: Number,
    friends: [String],
    data: [Schema.Types.Mixed]
});

interface IBank extends Document {
    accountId: string;
    userId: string;
    records: any[];
}

interface IUser extends Document {
    username: string;
    password: string;
    age: number;
    friends: string[];
    data: any[];
}

interface IChat extends Document {
    chatSeqNo: string;
    timestamp: number;
    fromId: string;
    toId: string;
    chatText: string;
}

export let UserModel: Model<IUser> = model<IUser>('User', UserSchema);
export let ChatModel: Model<IChat> = model<IChat>('Chat', ChatSchema);
export let BankModel: Model<IBank> = model<IBank>('Bank', BankSchema);