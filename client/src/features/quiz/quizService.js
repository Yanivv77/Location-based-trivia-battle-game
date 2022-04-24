import axios from "axios";

//Base URL to Quiz Service
const API_URL = "https://opentdb.com/api.php?amount=10&type=boolean";

// Fetch Questions
const getQuestions = async () => {
  const response = await axios.get(API_URL);

  return response.data.results;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const quizService = {
  getQuestions,
};

export default quizService;
