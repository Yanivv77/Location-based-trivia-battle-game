import express from "express";

import {
  getAllQuestions,
  getSingleRandomQuestion,
  getGameQuestions,
  addQuestion,
  deleteQuestion,
  deleteAllQuestion,
} from "../controllers/questions";

const router = express.Router();

router.get("/", getAllQuestions);

router.get("/randomQuestions/single", getSingleRandomQuestion);

router.get("/randomQuestions/:amount/:location", getGameQuestions);

router.post("/", addQuestion);

router.delete("/:id", deleteQuestion);

router.delete("/", deleteAllQuestion);

export  {router as questions};
