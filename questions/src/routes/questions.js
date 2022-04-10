const express = require("express");
const {
  getAllQuestions,
  getSingleRandomQuestion,
  getTenRandomQuestions,
  addQuestion,
  deleteQuestion,
  deleteAllQuestion,
} = require("../controllers/questions");

const router = express.Router();

router.get("/", getAllQuestions);

router.get("/randomQuestions/single", getSingleRandomQuestion);

router.get("/randomQuestions/many", getTenRandomQuestions);

router.post("/", addQuestion);

router.delete("/:id", deleteQuestion);

router.delete("/", deleteAllQuestion);

module.exports = router;
