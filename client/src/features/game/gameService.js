import axios from "axios";
import { questions, game } from "../../data/data";
import quizService from "../quiz/quizService";

//Base URL to Quiz Service
const API_URL =
  "https://opentdb.com/api.php?amount=10&category=22&type=multiple";

// Fetch Questions
const createGame = async () => {
  //   const response = await axios.post(API_URL, game);
  const newGame = game;
  game.questions = await quizService.getQuestions();
  return newGame;
};

const getGameById = async (id) => {
  const response = await axios.get(API_URL + `/${id}`);

  return response.data.results;
};

const updateGame = async (id) => {
  const response = await axios.put(API_URL + `/${id}`);

  return response.data.results;
};
const addGamePlayer = async (gameId, gamePlayer) => {
  const response = await axios.post(API_URL + `/${gameId}`, gamePlayer);

  return response.data;
};

const updateGamePlayer = async (gamePlayerId, updatedGamePlayer) => {
  const response = await axios.put(
    API_URL + `/${gamePlayerId}`,
    updatedGamePlayer
  );

  return response.data;
};

const gameService = {
  createGame,
  getGameById,
  updateGame,
  addGamePlayer,
  updateGamePlayer,
};

export default gameService;
