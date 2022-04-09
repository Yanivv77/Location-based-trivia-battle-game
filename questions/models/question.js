const mongoose = require("mongoose");
const Joi = require("joi");

const questionSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
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
    location:Joi.string(),
    question: Joi.string(),
    options: Joi.array().items(Joi.string()),
    correctAnswer: Joi.number().greater(-1).less(4),
  });

  return joinSchema.validate(question);
}

exports.QuestionModel = Question;
exports.validate = validateQuestion;
