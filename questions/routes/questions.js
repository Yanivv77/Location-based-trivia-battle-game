const express = require("express");
const { getAllQuestions, addQuestion, getTenQuestions } = require("../controllers/questions");

const router = express.Router();

router.get("/", getAllQuestions);

router.get("/randomQuestions", getTenQuestions);

router.get("/:id", (req, res) => {
  res.send("hello from single questions api");
});

router.post("/", addQuestion);

module.exports = router;
