import { SaveOptions } from "mongoose";

export interface IMongooseOptions {
    saveOptions?: SaveOptions;
    retry?: number;
}

export interface MongooseWriteResult {
    ok?: number;
    n?: number;
    nModified?: number;
}
