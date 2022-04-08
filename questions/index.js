const mongoose = require("mongoose");
const express = require("express");

const app = express();

mongoose
  .connect(
    // process.env.QUESTIONS_MONGO_URI
    "mongodb+srv://admin:admin@usercluster.lb38v.mongodb.net/questions"
  )
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log("could not connect to mongoDB", err);
  });

app.get("/api/questions", (req, res) => {
  res.send("hello from questions api");
});

const port = 5001 ;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
