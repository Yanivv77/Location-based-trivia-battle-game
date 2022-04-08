import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: [],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

function validateQuestion(question) {
  const joinSchema = Joi.object({
    question: Joi.string(),
    answers: Joi.array().items(Joi.string()),
    correctAnswer: Joi.string,
  });

  return joinSchema.validate(question);
}

exports.QuestionModel = Question;
exports.validate = validateQuestion;
