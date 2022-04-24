import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGame } from "../../features/game/gameSlice";
import { fetchQuestions } from "../../features/quiz/quizSlice";

const LoadingGame = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions());
    setTimeout(() => dispatch(startGame()), 3000);
  });
  return <div>LoadingGame...</div>;
};

export default LoadingGame;
