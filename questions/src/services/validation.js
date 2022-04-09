const Joi = require("joi");

function validateQuestion(question) {
  const joinSchema = Joi.object({
    location: Joi.string(),
    question: Joi.string(),
    options: Joi.array().items(Joi.string()),
    correctAnswer: Joi.number().greater(-1).less(4),
  });

  return joinSchema.validate(question);
}
exports.validate = validateQuestion;
