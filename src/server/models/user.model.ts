import { Document, model, Mongoose, Schema, Types } from 'mongoose';
import {IUser } from '../entities/user.entity';

export interface IUserDb extends IUser, Document {}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: (email: string) => {
            return /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
        },
        message: '{VALUE} is not a valid email!',
    },
});

export const UserModel = model<IUserDb>('User', UserSchema);
