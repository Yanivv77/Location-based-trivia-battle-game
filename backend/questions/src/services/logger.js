import winston from "winston";
import MongoDB from "winston-mongodb";

const url = process.env.MONGO_CONNECTION_STRING;

const customFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...args } = info;

    const ts = timestamp.slice(0, 19).replace("T", " ");
    return `${ts} [${level}]: ${message} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
    }`;
  })
);

const logger = winston.createLogger({
  format: customFormat,
  // transports: [
  //   new winston.transports.MongoDB({
  //     db: 'mongodb+srv://admin:admin@usercluster.lb38v.mongodb.net/',
  //     collection: 'logs',
  //   }),
  // ],
});

export default logger;
