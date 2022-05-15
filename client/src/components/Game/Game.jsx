import React, { useEffect, useState, useContext } from "react";
import { Grid, Button, Typography, Box, Paper, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WebSocketContext } from "../Websocket/WebSocket";
import { finishGame } from "../../features/game/gameSlice";
import {
  answerQuestion,
  nextQuestion,
  resetState,
} from "../../features/quiz/quizSlice";
import BetweenQuestionsModal from "../Game/BetweenQuestionsModal";
import Timer from "../Timer";
import Helps from "../Helps";

const Game = () => {
  const { currentQuestion, currentQuestionNumber, currentAnswer, score } =
    useSelector((state) => state.quiz);
  const [open, setOpen] = useState(false);
  const [timeFinished, setTimeFinished] = useState(false);
  const [answers, setAnswers] = useState(currentQuestion?.answers || []);
  const [clicked, setClicked] = useState(false);

  const ws = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isHalfAnswersUsed } = useSelector((state) => state.game.helpers);

  const handleOpen = () => setOpen(true);

  const delay = (timer, callback) => {
    setTimeout(() => callback(), timer);
  };
  const handleClose = () => setOpen(false);

  const handleExitGame = () => {
    dispatch(resetState());
    navigate("/profile");
  };

  const moveToNextQuestion = () => {
    ws.nextQuestion();
    setClicked(false);
  };

  const handleAnswer = (answer) => {
    setClicked(true);
    ws.submitAnswer(answer);

    // moveToNextQuestion();
  };
  const handleTimeout = () => {
    setTimeFinished(true);
    setOpen(true);
  };

  useEffect(() => {
    console.log("currentQuestion changed");
    console.log(currentQuestion);
    // setAnswers(currentQuestion.answers);
    // if (currentQuestionIndex === 10) {
    //   dispatch(finishGame());
  }, [currentQuestion]);

  useEffect(() => {
    if (currentAnswer) {
      setTimeout(() => {
        handleOpen();
      }, 1500);
    } else {
      handleClose();
      setTimeFinished(false);
      setAnswers(currentQuestion.answers);
    }
  }, [currentAnswer, currentQuestion]);
  return (
    <>
      {" "}
      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{ borderRadius: 10, mt: 5 }}
        onClick={handleExitGame}
      >
        EXIT GAME
      </Button>
      <Box sx={{ maxWidth: "400px", m: "0 auto", position: "relative" }}>
        {/* <Typography
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
        </Typography> */}

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
          Time left :{" "}
          <Timer
            currentQuestion={currentQuestionNumber}
            moveToNextQuestion={moveToNextQuestion}
            currentAnswer={currentAnswer}
            handleTimeout={handleTimeout}
          />
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
          Score : {score}
        </Typography>
        <Box>
          <Grid container spacing={2} sx={{ width: "100%", mt: 3 }}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  pb: 2,
                  mt: 3,
                  mb: 3,
                  borderRadius: "10px",
                  minHeight: "200px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",

                    fontWeight: "bold",
                    color: "##eeeeee",
                    mb: 2,
                  }}
                >
                  Question{" "}
                  <span className={{ fontSize: "15px", color: "red" }}>
                    {currentQuestionNumber}
                  </span>
                  /10
                </Typography>
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
            {answers.length &&
              answers.map((answer) => (
                <Grid key={answer.id} item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    size="large"
                    // disabled={clicked}
                    sx={{
                      minWidth: "150px",
                      borderRadius: 10,

                      backgroundColor: "secondary.main",
                      "&:hover": {
                        backgroundColor: "secondary.dark",
                        // opacity: [0.9, 0.8, 0.7],
                      },
                    }}
                    onClick={() => handleAnswer(answer.text)}
                  >
                    {answer.text}
                  </Button>
                </Grid>
              ))}
          </Grid>
          <Helps answers={answers} setAnswers={setAnswers}></Helps>
        </Box>
      </Box>
      <BetweenQuestionsModal
        open={open}
        handleClose={handleClose}
        timeFinished={timeFinished}
      />
    </>
  );
};

export default Game;
