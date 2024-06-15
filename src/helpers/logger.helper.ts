import * as winston from "winston";

export class LoggerHelper {
  public static newInstance(): winston.Logger {
    const isLocal = ["local"].indexOf(process.env.NODE_ENV || "") >= 0;

    const transporters: any[] = [];

    const combinedFormat = winston.format.combine(
      winston.format.colorize(),
      winston.format.align(),
      winston.format.prettyPrint(),
      winston.format.json(),
      winston.format.timestamp(),
      winston.format.printf((info) => {
        const { timestamp, level, message, ...args } = info;

        const ts = timestamp.slice(0, 19).replace("T", "");

        return `${ts} [${level}]:${message} ${
          Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
        }`;
      })
    );

    const consoleTransport = new winston.transports.Console({
      format: combinedFormat,
    });

    transporters.push(consoleTransport);

    transporters.push(new winston.transports.File({ filename: "error.log" }));

    return winston.createLogger({
      transports: transporters,
    });
  }
}

export const Logger = LoggerHelper.newInstance();
