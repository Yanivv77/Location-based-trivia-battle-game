import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Question
interface QuestionAttrs {
  location: string;
  question: string;
  options: Array<string>;
  correctAnswer: number;
}

interface QuestionModel extends mongoose.Model<QuestionDoc> {
  build(attrs: QuestionAttrs): QuestionDoc;
}

// An interface that describes the properties
// that a Question Document has
interface QuestionDoc extends mongoose.Document {
  location: string;
  question: string;
  options: Array<string>;
  correctAnswer: number;
  
}


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

questionSchema.statics.build = (attrs: QuestionAttrs) => {
  return new Question(attrs);
};
// const Question: QuestionAttrs = mongoose.model("Question", questionSchema);

const Question = mongoose.model<QuestionDoc, QuestionModel>('Question', questionSchema);

// exports.QuestionModel = Question;
export  { Question as QuestionModel };
