const mongoose = require("mongoose");
const Joi = require("joi");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [],
    required: true,
  },
  correctAnswer: {
    type: Number,
    range: {
      min: { type: Number, min: 0 },
      max: { type: Number, min: 3 },
    },
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

function validateQuestion(question) {
  const joinSchema = Joi.object({
    question: Joi.string(),
    answers: Joi.array().items(Joi.string()),
    correctAnswer: Joi.number().greater(-1).less(4),
  });

  return joinSchema.validate(question);
}

exports.QuestionModel = Question;
exports.validate = validateQuestion;
