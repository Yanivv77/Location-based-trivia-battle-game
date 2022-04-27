import { createSlice } from "@reduxjs/toolkit";
import {
  INIT_GAME,
  LOADING_GAME,
  GAME_OPTIONS,
  GAME,
  BETWEEN_QUESTIONS,
  END_GAME,
} from "../../utils/gameConstants";

const initialState = {
  stage: INIT_GAME,
  gameOptions: {},
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
    betweenQuestions(state) {
      //  state.username = action.payload.username;
      state.stage = BETWEEN_QUESTIONS;
    },

    finishGame(state) {
      state.stage = END_GAME;
    },
    restartGame(state) {
      state.stage = INIT_GAME;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchQuestionsSuccess, (state, action) => {
  //         state.stage = GAME;
  //       })
  //       .addCase(fetchQuestionsFail, (state, action) => {
  //         state.stage = START_GAME;
  //       });
  //   },
});

export const {
  setGame,
  loadGame,
  startGame,
  finishGame,
  restartGame,
  betweenQuestions,
} = gameState.actions;

export default gameState.reducer;
