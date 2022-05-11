import Joi from "joi";
import { QuestionModel } from "../models/question";

function validateQuestion(question: any) {
  const joinSchema = Joi.object({
    category: Joi.string(),
    location: Joi.object({ country: Joi.string(), place: Joi.string() }),
    difficulty: Joi.string().valid("Easy", "Normal", "Hard").required(),
    question: Joi.string(),
    options: Joi.array().items(Joi.string()),
    answers: Joi.array().items({
      text: Joi.string(),
      isCorrect: Joi.boolean(),
    }),
  });

  return joinSchema.validate(question);
}
// exports.validate = validateQuestion;
export { validateQuestion as validate };
