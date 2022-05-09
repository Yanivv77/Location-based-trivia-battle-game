import Joi from "joi";
import { QuestionModel } from "../models/question";

function validateQuestion(question: any) {
  const joinSchema = Joi.object({
    location: Joi.string(),
    question: Joi.string(),
    options: Joi.array().items(Joi.string()),
    correctAnswer: Joi.number().greater(-1).less(4),
  });

  return joinSchema.validate(question);
}
// exports.validate = validateQuestion;
export { validateQuestion as validate };
