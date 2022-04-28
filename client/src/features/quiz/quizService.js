import axios from "axios";
import { questions } from "../../data/data";

//Base URL to Quiz Service
const API_URL =
  "https://opentdb.com/api.php?amount=10&category=22&type=multiple";

// Fetch Questions
const getQuestions = async () => {
  const response = await axios.get(API_URL);

  // return response.data.results;

  return questions;
};

const quizService = {
  getQuestions,
};

export default quizService;
