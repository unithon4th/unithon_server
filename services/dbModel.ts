/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/

/** External dependencies **/
import {Document, model, Model, Schema} from 'mongoose';

/** Internal dependencies **/

/*
 user = new UserModel({
 nickname: obj.nickname,});
 */

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
    profile_image: String,
    gender: String,
    naverId: String,
    birthday: String,
    nickname: String
    // data: [Schema.Types.Mixed]
});

interface IUser extends Document {
    username: string;
    name: string;
    password: string;
    age: string;
    bank: string;
    account: number;
    profile_image: number;
    gender: string;
    naverId: string;
    birthday: string;
    // data: any[];
}

export let UserModel: Model<IUser> = model<IUser>('User', UserSchema);
