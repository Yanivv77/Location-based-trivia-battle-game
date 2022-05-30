import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gameService from "./gameService";
import { resetState } from "../quiz/quizSlice";
import {
  INIT_GAME,
  LOADING_GAME,
  GAME_OPTIONS,
  GAME,
  END_GAME,
} from "../../utils/gameConstants";

export const createGame = createAsyncThunk(
  "game/create",
  async (_, thunkAPI) => {
    try {
      let { auth, game } = thunkAPI.getState();
      console.log(auth);
      return await gameService.createGame({
        user: auth.user,
        invitedPlayers: game.gameOptions.invitedPlayers,
        amount: game.gameOptions.numberOfQuestions,
      });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createGamePlayer = createAsyncThunk(
  "game/createPlayer",
  async (player, thunkAPI) => {
    try {
      return await gameService.addGamePlayer(player);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  game: null,
  stage: INIT_GAME,
  gameOptions: {
    numberOfQuestions: 10,
    timeOut: false,
    secondsPerQuestion: 30,

    invitedPlayers: [],
    isActive: false,
    waitTillNextQuestion: false,
  },
  helpers: {
    isHalfAnswersUsed: false,
    isStatisticsUsed: false,
    isFolowUsed: false,
  },
};

const gameState = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setGame(state, action) {
      //  state.username = action.payload.username;
      state.stage = GAME_OPTIONS;
    },
    loadGame(state, action) {
      //  state.username = action.payload.username;
      state.stage = LOADING_GAME;
    },
    startGame(state, action) {
      //  state.username = action.payload.username;
      state.stage = GAME;
    },

    finishGame(state) {
      state.stage = END_GAME;
    },
    initGame(state) {
      state.stage = INIT_GAME;
    },
    changeHalfHelper(state) {
      state.helpers.isHalfAnswersUsed = true;
    },
    changeStatisticsHelper(state) {
      state.helpers.isStatisticsUsed = true;
    },
    changeFollowHelper(state) {
      state.helpers.isFollowUsed = true;
    },
    addInvitedPlayer(state, action) {
      state.gameOptions.invitedPlayers.push(action.payload);
    },
    setTimer(state, action) {
      state.gameOptions.secondsPerQuestion = action.payload;
    },
    setNumberOfQuestions(state, action) {
      state.gameOptions.numberOfQuestions = action.payload;
    },
    setUpdatedTimer(state, action) {
      state.gameOptions.updatedSecondsPerQuestion = action.payload;
    },
    setGameToActive(state, game) {
      state.gameOptions.isActive = true;
    },
    setWait(state, action) {
      if (action.payload === true) {
        state.gameOptions.waitTillNextQuestion = true;
      } else {
        state.gameOptions.waitTillNextQuestion = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetState, (state) => {
        state.stage = INIT_GAME;
        state.helpers = {
          isHalfAnswersUsed: false,
          isStatisticsUsed: false,
          isFolowUsed: false,
        };
        state.game = null;
        state.gameOptions.isActive = false;
        state.gameOptions.secondsPerQuestion = 30;
        state.gameOptions.updatedSecondsPerQuestion = 30;
        state.gameOptions.invitedPlayers = [];
      })

      .addCase(createGame.fulfilled, (state, action) => {
        state.game = action.payload;
      })
      .addCase(createGame.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createGamePlayer.fulfilled, (state, action) => {
        // state.helpers = action.payload;
        console.log(action.payload);
      })
      .addCase(createGamePlayer.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  setGame,
  loadGame,
  startGame,
  finishGame,
  initGame,
  changeHalfHelper,
  changeStatisticsHelper,
  changeFollowHelper,
  addInvitedPlayer,
  setTimer,
  setGameToActive,
  setUpdatedTimer,
  setWait,
  setNumberOfQuestions,
} = gameState.actions;

export default gameState.reducer;
