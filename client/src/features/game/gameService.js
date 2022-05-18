import axios from "axios";
import { game } from "../../data/data";
import quizService from "../quiz/quizService";
import { v4 as uuid } from "uuid";

//Base URL to Quiz Service
const API_URL = "https://localhost:5000";

// Create a new Game
const createGame = async () => {
  //   const response = await axios.post(API_URL, game);
  const newGame = {};
  newGame.id = uuid();
  newGame.host = { id: uuid(), name: "Jakob(host)" };
  newGame.gameId = uuid();
  newGame.questions = await quizService.getQuestions();
  newGame.currentQuestionNumber = 1;
  newGame.isActive = false;
  newGame.isFinished = false;
  newGame.invitedPlayers = [
    { id: 676767, name: "Yaniv", email: "yaniv@mail.com" },
    { id: 676768, name: "Sharon", email: "sharon@mail.com" },
  ];
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
//userName, gameId, answers=[], helpersStatus={}
const addGamePlayer = async (gamePlayer) => {
  const gamePlayerObj = {
    userName: gamePlayer.userName,
    gameId: gamePlayer.gameId,
    answers: [],
    helpersStatus: {
      isHalfAnswersUsed: false,
      isStatisticsUsed: false,
      isFolowUsed: false,
    },
  };
  const response = await axios.post(
    API_URL + `/api/gamePlayers`,
    gamePlayerObj
  );

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
