import { Document, model, Mongoose, Schema, Types } from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: (email: string) => {
            return /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
        },
        message: '{VALUE} is not a valid email!',
    },
});

export const UserModel = model<IUserModel>('User', UserSchema);
