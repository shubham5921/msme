import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import initRoutes from "./routes";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { Logger } from "./helpers/logger.helper";
import { Db } from "./db";
const sassMiddleware = require('sass-middleware');
const APP_ENV = process.env.NODE_ENV || "development";
const APP_PORT = process.env.PORT ? parseInt(process.env.PORT) : 8888;

const app = express();
app.set("../views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false, limit: "3gb" }));

const publicFolderPath = path.resolve("public");
app.use("/static", express.static(publicFolderPath));

initRoutes(app);
// Db.init().then(() => {});

app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.listen(APP_PORT, "0.0.0.0", () => {
  Logger.info(`Express server listening on ${APP_PORT} in ENV:${APP_ENV}`);
});

export default app;
