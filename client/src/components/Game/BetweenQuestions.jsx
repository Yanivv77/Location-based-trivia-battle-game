import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import LeaderBoard from "../LeaderBoard";
import { useDispatch, useSelector } from "react-redux";
import {
  restartGame,
  finishGame,
  startGame,
} from "../../features/game/gameSlice";
import { answerQuestion, nextQuestion } from "../../features/quiz/quizSlice";

function BetweenQuestions(props) {
  const [usersList, setUsersList] = useState([
    { userName: "user 1", points: 11 },
    { userName: "user 2", points: 8 },
    { userName: "user 3", points: 5 },
    { userName: "user 4", points: 3 },
  ]);
  const dispatch = useDispatch();

  const currentQuestion = useSelector((state) =>
    state.quiz.questions[state.quiz.currentQuestionIndex]
      ? state.quiz.questions[state.quiz.currentQuestionIndex]
      : state.quiz.questions[state.quiz.currentQuestionIndex - 1]
  );
  const { currentQuestionIndex, score } = useSelector((state) => state.quiz);
  useEffect(() => {
    //     dispatch(nextQuestion());
    //     dispatch(startGame());
    setTimeout(() => {
      dispatch(startGame());
    }, 2000);
  }, []);
  return (
    <div>
      <div className="main-container" style={{ marginTop: "20%" }}>
        <LeaderBoard usersList={usersList} />

        <div
          className="right-answer"
          style={{
            width: "fit-content",
            margin: "auto",
            textAlign: "center",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <h1>The right answer is:</h1>
        </div>

        <div
          className="random-fact"
          style={{
            backgroundColor: "white",
            width: "50%",
            margin: "auto",
            textAlign: "center",
          }}
        >
          {currentQuestion.correct_answer}
        </div>
      </div>
    </div>
  );
}

export default BetweenQuestions;
