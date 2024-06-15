import {SchemaOptions} from "mongoose";

const transformFn = (doc: any, ret: any, options: any): any => {

    return ret;
};

export const defaultSchemaOptions: SchemaOptions & { autoCreate: boolean } = {
    toJSON: {
        transform: transformFn
    },
    toObject: {
        transform: transformFn
    },
    // timestamps: false,

    timestamps: {
        createdAt: true,
        updatedAt: true
    },

    versionKey: false,
    id: false,
    _id: true,
    autoCreate: true
};
