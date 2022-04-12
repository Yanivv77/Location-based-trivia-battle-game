require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("../services/logger");

function connect() {
  const dbUri = process.env.QUESTIONS_MONGO_URI;

  return mongoose
    .connect(dbUri)
    .then(() => {
      logger.info("connected to mongoDB");
    })
    .catch((err) => {
      logger.error("could not connect to mongoDB", err);
      process.exit(1);
    });
}

module.exports = connect;
