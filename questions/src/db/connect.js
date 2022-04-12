const mongoose = require("mongoose");
require('dotenv').config()

function connect() {
  const dbUri = process.env.QUESTIONS_MONGO_URI;

  return mongoose
    .connect(dbUri)
    .then(() => {
      console.log("connected to mongoDB");
    })
    .catch((err) => {
      console.log("could not connect to mongoDB", err);
      process.exit(1);
    });
}

module.exports = connect;
