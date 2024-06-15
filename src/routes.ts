import { Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import publicRouter from "./public-site";
// import apiRouter from "./api";
var corsOptions = {
  origin: "*",
  credentials: true,
};

// const MongoStore = connectMongo(session);

export default function (app: Express) {
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(morgan("dev"));

  app.use(
    session({
      secret: process.env.SECRET || "ASFASOSAJASKWOIW93KALSKSIAKSLWIKA",
      saveUninitialized: true,
      resave: false,
    })
  );
  app.get("/favicon.ico", function (req, res, next) {
    return res.json({ result: "Success" });
  });
  app.use("/", publicRouter);
  // app.use("/api/v1", apiRouter);

  app.use("*", (req, res) => {
    res.status(404).json({
      message: "Resource not available",
    });
  });

  app.use((err: any, req: any, res: any, next: any) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({
      error: true,
      message: "Unexpected Error Occurred. Please contact our support team.",
    });
  });
}
