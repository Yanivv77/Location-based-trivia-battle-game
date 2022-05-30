import axios from "axios";

//Base URL to Quiz Service
const API_URL =
  "https://opentdb.com/api.php?amount=10&category=22&type=multiple";
const API_TRIVIA_URL = "api/questions/randomQuestions";
//?amount=${amount}&location=${location}
// Fetch Questions
const getQuestions = async (amount = 5, location = "Tel Aviv") => {
  const response = await axios.get(`${API_TRIVIA_URL}/${amount}/${location}`);
  console.log(response);
  // return response.data.results;
  const questions = addStatistics(response.data);

  return questions;
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

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const addStatistics = (questions) => {
  const newQuestions = questions.map((q) => {
    const statistics = {
      total: { " correctAnswers": 100, notCorrectAnswers: 30 },
      perAnswer: [],
    };
    q.answers.forEach((ans) => {
      if (ans.isCorrect) {
        statistics.perAnswer.push({
          text: ans.text,
          count: randomInteger(25, 45),
        });
      } else {
        statistics.perAnswer.push({
          text: ans.text,
          count: randomInteger(0, 12),
        });
      }
    });
    const question = {
      ...q,
      statistics,
    };
    return question;
  });
  return newQuestions;
};

const quizService = {
  getQuestions,
};

export default quizService;
