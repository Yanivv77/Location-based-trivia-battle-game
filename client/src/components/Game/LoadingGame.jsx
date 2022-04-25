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
  return (
    <div className=" w-55 container d-flex justify-content-center">
      <lottie-player
        src="https://assets4.lottiefiles.com/private_files/lf30_c7xcgjbt.json"
        background="transparent"
        speed="0.5"
        loop
        autoplay
      ></lottie-player>
    </div>
  );
};

export default LoadingGame;
