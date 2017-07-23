import { Document, model, Mongoose, Schema, Types } from 'mongoose';
import { IClient, IProjects, Payment } from '../entities/client.entity';

export interface IClientDb extends IClient, Document { }
export interface IProjectDb extends IProjects, Types.Subdocument { }

 const ProjectSchema = new Schema({
     projectName: { type: String, required: true },
     isFinished: {type: Boolean, required: true, default: false }
 });

const ClientSchema = new Schema({
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
    isActive: { type: Boolean, required: true, default: true },
    projects: [ProjectSchema],
    payment: { type: Payment , require: true, default: Payment.FixedPrice }
});

export const ClientModel = model<IClientDb>('Client', ClientSchema);
