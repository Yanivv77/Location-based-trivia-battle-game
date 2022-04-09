const express = require("express");
const {
  getAllQuestions,
  getSingleRandomQuestion,
  getTenRandomQuestions,
  addQuestion,
} = require("../controllers/questions");

const router = express.Router();

router.get("/", getAllQuestions);

router.get("/randomQuestions/single", getSingleRandomQuestion);

router.get("/randomQuestions/many", getTenRandomQuestions);

router.post("/", addQuestion);

module.exports = router;
