const mongoose = require("mongoose");

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

exports.QuestionModel = Question;
