import express from "express";

import {
  getAllQuestions,
  getSingleRandomQuestion,
  getTenRandomQuestions,
  addQuestion,
  deleteQuestion,
  deleteAllQuestion,
} from "../controllers/questions";

const router = express.Router();

router.get("/", getAllQuestions);

router.get("/randomQuestions/single", getSingleRandomQuestion);

router.get("/randomQuestions/many", getTenRandomQuestions);

router.post("/", addQuestion);

router.delete("/:id", deleteQuestion);

router.delete("/", deleteAllQuestion);

export  {router as questions};
