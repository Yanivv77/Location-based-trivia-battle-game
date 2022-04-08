const mongoose = require("mongoose");
const express = require("express");
const questions = require("./routes/questions");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/questions",questions);

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

const port = 5001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
