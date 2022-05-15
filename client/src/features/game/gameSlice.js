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

const initialState = {
  game: null,
  stage: INIT_GAME,
  gameOptions: {
    timeOut: false,
    gameDuration: 30,
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
    restartGame(state) {
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
      })

      .addCase(createGame.fulfilled, (state, action) => {
        state.game = action.payload;
      })
      .addCase(createGame.rejected, (state, action) => {
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
  restartGame,

  changeHalfHelper,
  changeStatisticsHelper,
  addInvitedPlayer,
} = gameState.actions;

export default gameState.reducer;
