import mongoose from "mongoose";
import { app } from "./app";
import { logger } from "./logger";
import chalk from "chalk";

const url = process.env.MONGO_CONNECTION_STRING;
const port = process.env.PORT || 5000;
const jwtKey = process.env.JWT_KEY;

const start = async () => {
  if (!jwtKey) {
    logger.error("JWT_KEY must be defined", process.env.NODE_ENV);
    throw new Error("JWT_KEY must be defined");
  }

  try {
    if (url) {
      const conn = await mongoose.connect(url);
      console.log(chalk.yellow(`MongoDB Connected: ${conn.connection.name}`));
      logger.info("Connected to MongoDb", process.env.NODE_ENV);
    }
  } catch (err) {
    const { message } = err as Error;
    logger.info(message, process.env.NODE_ENV);
  }

  app.listen(port, () => {
    console.log(chalk.yellow(`Server started on port ${port}`));
    logger.info("Listening on port 5000", process.env.NODE_ENV);
  });
};

start();
