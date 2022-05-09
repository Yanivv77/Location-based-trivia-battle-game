import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizService from "./quizService";
import { finishGame } from "../game/gameSlice";

const initialState = {
  questions: [],
  currentQuestion: null,
  correctAnswer: null,
  error: null,
  score: null,
  currentQuestionIndex: null,
  currentQuestionNumber: 0,
  currentAnswer: "",
  currentPlayersAnswers: [],
  playerAnswersData: [],
  allPlayersAnswersData: [],
  answers: [],
  quizPlayers: [],
  isLoading: false,
};

// Fetch Questions
export const fetchQuestions = createAsyncThunk(
  "quiz/fetch",
  async (_, thunkAPI) => {
    try {
      return await quizService.getQuestions();
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

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addPlayers(state, action) {
      state.quizPlayers = action.payload;
    },
    removePlayer(state, action) {
      state.quizPlayers.filter((player) => player.id !== action.payload.id);
    },
    answerQuestion(state, action) {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const correctAnswer = currentQuestion.answers.find(
        (answer) => answer.isCorrect
      );
      state.score += action.payload.answer === correctAnswer.text ? 1 : 0;
      state.answers.push({
        question: currentQuestion.question,
        answer: action.payload.answer,
        correctAnswer: correctAnswer.text,
        isCorrect: action.payload.answer === correctAnswer.text,
      });
    },
    setQuestion(state, action) {
      console.log(action.payload);
      state.currentAnswer = null;
      state.currentPlayersAnswers = [];
      state.currentQuestion = action.payload.question;
      state.currentQuestionNumber = action.payload.number;
    },
    setAnswer(state, action) {
      state.correctAnswer = action.payload;
      state.currentAnswer = action.payload;
      state.playerAnswersData.push(action.payload);
      console.log(state.correctAnswer);
      state.score = action.payload.player.score;
    },
    setAllAnswers(state, action) {
      state.currentPlayersAnswers.push(action.payload);
      state.allPlayersAnswersData.push(action.payload);
    },
    nextQuestion(state) {
      state.currentQuestionIndex += 1;
    },
    resetState(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload;
        state.score = 0;
        state.currentQuestionIndex = 0;
        state.answers = [];
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  answerQuestion,
  nextQuestion,
  resetState,
  addPlayers,
  removePlayer,
  setQuestion,
  setAnswer,
  setAllAnswers,
} = quizSlice.actions;

export default quizSlice.reducer;
