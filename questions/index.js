require("dotenv").config();
const logger = require("./src/services/logger")

const express = require("express");
const connect = require("./src/db/connect");
const questions = require("./src/routes/questions");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/questions", questions);

const port = process.env.QUESTIONS_PORT;

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);

  connect();
});
