import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizService from "./quizService";
import { finishGame } from "../game/gameSlice";

const initialState = {
  questions: [],
  answersToShow: [],
  error: null,
  score: null,
  currentQuestionIndex: null,
  answers: [],
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
    answerQuestion(state, action) {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      state.score +=
        action.payload.answer === currentQuestion.correct_answer ? 1 : 0;
      state.answers.push({
        question: currentQuestion.question,
        answer: action.payload.answer,
        correctAnswer: currentQuestion.correct_answer,
        isCorrect: action.payload.answer === currentQuestion.correct_answer,
      });
    },
    nextQuestion(state) {
      state.currentQuestionIndex += 1;
    },
    resetState(state) {
      state.answers = [];
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

export const { answerQuestion, nextQuestion } = quizSlice.actions;

export default quizSlice.reducer;
