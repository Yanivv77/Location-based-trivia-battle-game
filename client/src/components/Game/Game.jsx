import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { restartGame, finishGame } from "../../features/game/gameSlice";
import { answerQuestion, nextQuestion } from "../../features/quiz/quizSlice";

const Game = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const dispatch = useDispatch();

  const currentQuestion = useSelector((state) =>
    state.quiz.questions[state.quiz.currentQuestionIndex]
      ? state.quiz.questions[state.quiz.currentQuestionIndex]
      : state.quiz.questions[state.quiz.currentQuestionIndex - 1]
  );
  const { currentQuestionIndex, score } = useSelector((state) => state.quiz);

  const handleAnswer = (answer) => {
    dispatch(answerQuestion({ answer }));

    setTimeout(() => dispatch(nextQuestion()), 1000);
  };
  useEffect(() => {
    if (currentQuestionIndex === 10) {
      dispatch(finishGame());
    }
  }, [currentQuestionIndex]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {" "}
      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{ borderRadius: 10, mt: 5 }}
        onClick={() => {
          dispatch(restartGame());
        }}
      >
        EXIT GAME
      </Button>
      <Box sx={{ maxWidth: "400px", m: "0 auto", position: "relative" }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mt: 3,
            mb: 3,
            fontWeight: "bold",
            color: "##eeeeee",
          }}
        >
          Trivia
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",

            fontWeight: "bold",
            color: "##eeeeee",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {currentQuestionIndex + 1}/10
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",

            fontWeight: "bold",
            color: "##eeeeee",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          Time left : {timeLeft}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",

            fontWeight: "bold",
            color: "##eeeeee",
            position: "absolute",
            top: 20,
            right: 0,
          }}
        >
          Score : {score}
        </Typography>
        <Box>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Grid item xs={12}>
              <Paper sx={{ p: 3, mt: 3, mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",

                    fontWeight: "bold",
                    color: "##eeeeee",
                  }}
                >
                  {currentQuestion.question}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ borderRadius: 10, mt: 5 }}
                onClick={() => handleAnswer("True")}
              >
                True
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ borderRadius: 10, mt: 3 }}
                onClick={() => handleAnswer("False")}
              >
                False
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      ;
    </>
  );
};

export default Game;
