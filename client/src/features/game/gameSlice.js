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
      return await gameService.createGame();
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
    addInvitedPlayer(state, action) {
      state.gameOptions.invitedPlayers.push(action.payload);
    },
    setTimer(state, action) {
      state.gameOptions.secondsPerQuestion = action.payload;
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
  addInvitedPlayer,
  setTimer,
} = gameState.actions;

export default gameState.reducer;
