const { validate, QuestionModel } = require("../models/question");

module.exports = {
  getAllQuestions: async (req, res) => {
    let questions = await QuestionModel.find();
    res.send(questions);
  },
  getTenQuestions: async (req, res) => {
    // for (let i = 0; i < 2; i++) {
    //   // Get the count of all questions
    //   await QuestionModel.count().exec(function (err, count) {
    //     // Get a random entry
    //     var random = Math.floor(Math.random() * count);

    //     // Again query all questions but only fetch one offset by our random #
    //     QuestionModel.findOne()
    //       .skip(random)
    //       .exec(function (err, result) {
    //         // random question
    //         res.send(result);
    //       });
    //   });
    // }
  },
  addQuestion: async (req, res) => {
    //Checking inputs validation, if error!=undefined(null) => meaning: 'error exist'
    let { error } = validate(req.body);
    if (error !== undefined && error.details !== undefined) {
      return res.status(400).send(error.details[0].message);
    }
    //Check if question already exist in DB
    let _question = req.body.question;
    let questionToFind = await QuestionModel.findOne({
      question: _question,
    });

    // if questionToFind !==null => meaning: 'question exist'
    if (questionToFind !== null) {
      // return res.status(400).send("question already exist!");
      return res.status(400).send({ message: "question already exist!" });
    }
    // if question not exist create new question model and save to DB
    question = new QuestionModel({
      question: req.body.question,
      answers: req.body.answers,
      correctAnswer: req.body.correctAnswer,
    });
    let result = await question.save();
    return res.send(result);
  },
};
