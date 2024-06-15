import { ObjectId } from "mongodb";
import {Schema} from "mongoose";

export class BaseDoc {
    constructor(
        public addedBy?: ObjectId,

        public _id?: string | ObjectId,
        public createdAt?: number | Date,
        public updatedAt?: number | Date,
    ) {}
}

export const baseSchema = {
    addedBy: {type: Schema.Types.ObjectId, required: false},
    createdAt: {type: Schema.Types.Date},
    updatedAt: {type: Schema.Types.Date}
}
