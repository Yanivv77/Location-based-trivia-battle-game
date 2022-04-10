const { QuestionModel } = require("../models/question");
const { validate } = require("../services/validation");

// number of questions in each game
const QUESTIONS_PER_GAME = 10;

const getRandomQuestions = async (numberOfRandomQuestions) => {
  let randomQuestions = await QuestionModel.aggregate([
    { $sample: { size: numberOfRandomQuestions } },
  ]);
  return randomQuestions;
};

module.exports = {
  getAllQuestions: async (req, res) => {
    let questions = await QuestionModel.find();
    res.send(questions);
  },
  getSingleRandomQuestion: async (req, res) => {
    res.send(await getRandomQuestions(1));
  },
  getTenRandomQuestions: async (req, res) => {
    res.send(await getRandomQuestions(QUESTIONS_PER_GAME));
  },
  addQuestion: async (req, res) => {
    //Checking inputs validation with Joi, if error!=undefined(null) => meaning: 'error exist'
    let { error } = validate(req.body);
    if (error !== undefined && error.details !== undefined) {
      return res.status(400).send(error.details[0].message);
    }
    //Check if question already exist in DB
    let { location, question, options, correctAnswer } = req.body;
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
    newQuestion = new QuestionModel({
      location,
      question,
      options,
      correctAnswer,
    });
    let result = await newQuestion.save();
    return res.send(result);
  },
  deleteQuestion: async (req, res) => {
    let result = await QuestionModel.deleteOne({ _id: req.params.id });
    res.send(result);
  },
  deleteAllQuestion: async (req, res) => {
    let result = await QuestionModel.collection.drop();
    console.log(result);
    res.send(result);
  },
};
