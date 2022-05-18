import axios from "axios";
import { questions } from "../../data/data";

//Base URL to Quiz Service
const API_URL =
  "https://opentdb.com/api.php?amount=10&category=22&type=multiple";

// Fetch Questions
const getQuestions = async () => {
  const response = await axios.get(API_URL);

  // return response.data.results;
  const questions = changeQuestions(response.data.results);
  console.log(questions);

  return questions;
};

const quizService = {
  getQuestions,
};

const changeQuestions = (questions) => {
  const newQuestions = questions.map((q) => {
    const statistics = {
      total: { " correctAnswers": 100, notCorrectAnswers: 30 },
      perAnswer: [],
    };
    const answers = q.incorrect_answers.map((answer, i) => {
      const newAnswer = {
        id: i + 1,
        text: answer,
        isCorrect: false,
        falsyLevel: "1",
      };
      statistics.perAnswer.push({ text: answer, count: 10 });
      return newAnswer;
    });
    answers.push({
      id: answers.length + 1,
      text: q.correct_answer,
      isCorrect: true,
    });
    statistics.perAnswer.push({ text: q.correct_answer, count: 40 });
    const question = {
      question: q.question,
      location: {
        country: "Israel",
        place: "Kotel Maaravi",
      },
      category: "Geography",
      answers: answers,
      statistics,
    };
    return question;
  });
  return newQuestions;
};

export default quizService;
