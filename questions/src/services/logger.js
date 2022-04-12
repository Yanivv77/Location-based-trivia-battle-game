const { createLogger, transports, format } = require("winston");

const customFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info) => {
    const { timestamp, level, message, ...args } = info;

    const ts = timestamp.slice(0, 19).replace("T", " ");
    return `${ts} [${level}]: ${message} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
    }`;
  })
);

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({ filename: "app.log", level: "info" }),
  ],
});

module.exports = logger;
