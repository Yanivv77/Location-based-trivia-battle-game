const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from all questions api");
});

router.get("/randomQuestions", (req, res) => {
  res.send("hello from 10 random questions api");
});

router.get("/:id", (req, res) => {
  res.send("hello from single questions api");
});

router.post("/", (req, res) => {
  res.send("hello from add questions api");
});

module.exports = router;
