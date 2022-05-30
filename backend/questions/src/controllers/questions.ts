import express, { Request, Response } from "express";

import { QuestionModel } from "../models/question";
import { validate } from "../utils/validation";
import "dotenv/config";

const getRandomQuestions = async (
  numberOfRandomQuestions: number,
  location: string
) => {
  let randomQuestions = await QuestionModel.aggregate([
    { $match: { "location.place": location } },
    { $sample: { size: numberOfRandomQuestions } },
  ]);
  return randomQuestions;
};

const getRandomQuestions1 = async (numberOfRandomQuestions: number) => {
  let randomQuestions = await QuestionModel.aggregate([
    { $sample: { size: numberOfRandomQuestions } },
  ]);
  return randomQuestions;
};

const getAllQuestions = async (req: Request, res: Response) => {
  let questions = await QuestionModel.find();
  return res.status(201).send(questions);
};

const getSingleRandomQuestion = async (req: Request, res: Response) => {
  let { location } = req.params;

  return res.status(201).send(await getRandomQuestions(1, location));
};

const getGameQuestions = async (req: Request, res: Response) => {
  let { amount,location} = req.params;

  return res
    .status(201)
    .send(await getRandomQuestions(parseInt(amount), location));
};

const addQuestion = async (req: Request, res: Response) => {
  //Checking inputs validation with Joi, if error!=undefined(null) => meaning: 'error exist'
  let { error } = validate(req.body);
  if (error !== undefined && error.details !== undefined) {
    return res.status(400).send(error.details[0].message);
  }
  //Check if question already exist in DB
  let { category, location, difficulty, question, answers } = req.body;
  let questionToFind = await QuestionModel.findOne({
    location,
    question,
  });

  // if questionToFind !==null => meaning: 'question exist'
  if (questionToFind !== null) {
    // return res.status(400).send("question already exist!");
    return res.status(400).send({ message: "question already exist!" });
  }
  // if question not exist create new question model and save to DB
  let newQuestion = new QuestionModel({
    category,
    location,
    difficulty,
    question,
    answers,
  });
  let result = await newQuestion.save();
  return res.status(201).send(result);
};

const deleteQuestion = async (req: Request, res: Response) => {
  let result = await QuestionModel.deleteOne({ _id: req.params.id });
  return res.status(201).send(result);
};

const deleteAllQuestion = async (req: Request, res: Response) => {
  let result = await QuestionModel.collection.drop();
  return res.status(201).send(result);
};

export {
  getAllQuestions,
  getSingleRandomQuestion,
  getGameQuestions,
  addQuestion,
  deleteQuestion,
  deleteAllQuestion,
};
