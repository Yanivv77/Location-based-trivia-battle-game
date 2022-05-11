import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new Question
interface QuestionAttrs {
  category: string;
  location: { country: string; place: string };
  difficulty: "Easy" | "Normal" | "Hard";
  question: string;
  answers: Array<{ text: string; isCorrect: boolean }>;
}

interface QuestionModel extends mongoose.Model<QuestionDoc> {
  build(attrs: QuestionAttrs): QuestionDoc;
}

// An interface that describes the properties
// that a Question Document has
interface QuestionDoc extends mongoose.Document {
  category: string;
  location: { country: string; place: string };
  difficulty: "Easy" | "Normal" | "Hard";
  question: string;
  answers: Array<{ text: string; isCorrect: boolean }>;
}

const questionSchema = new mongoose.Schema({
  category: { type: String },
  location: {
    country: { type: String },
    place: { type: String },
    // required: true,
  },
  difficulty: { type: String, required: true },
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [{}],
    required: true,
  },
});

questionSchema.statics.build = (attrs: QuestionAttrs) => {
  return new Question(attrs);
};
// const Question: QuestionAttrs = mongoose.model("Question", questionSchema);

const Question = mongoose.model<QuestionDoc, QuestionModel>(
  "Question",
  questionSchema
);

// exports.QuestionModel = Question;
export { Question as QuestionModel };
