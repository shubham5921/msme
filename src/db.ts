import mongoose from "mongoose";
import { Logger } from "./helpers/logger.helper";

export class Db {
  public static async init() {
    try {
      await mongoose.connect(process.env.MONGO_DB_URL!);
      Logger.info(`[DB]: MongoDB Connection Established.`);
    } catch (e) {
      Logger.error(`[DB]: MongoDB connection error:`, { error: e });
      process.exit(-1);
    }
  }
}
