import React, { useEffect, useState, useContext } from "react";
import { Grid, Button, Typography, Box, Paper, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WebSocketContext } from "../Websocket/WebSocket";

import { resetState } from "../../features/quiz/quizSlice";
import BetweenQuestionsModal from "../Game/BetweenQuestionsModal";
import HelperModal from "../Game/HelperModal";
import Timer from "../Timer";
import Helps from "../Helps";

const Game = () => {
  const {
    quizPlayers,
    currentQuestion,
    currentQuestionNumber,
    currentAnswer,
    score,
  } = useSelector((state) => state.quiz);
  const { numberOfQuestions } = useSelector((state) => state.game.gameOptions);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [timeFinished, setTimeFinished] = useState(false);
  const [answers, setAnswers] = useState(currentQuestion?.answers || []);
  const [clicked, setClicked] = useState(false);
  const [helperOpen, setHelperOpen] = useState(false);

  const ws = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleExitGame = () => {
    dispatch(resetState());
    ws.socket.current.disconnect();
    ws.socket.current.connect();
    navigate("/gamelobby");
  };

  const moveToNextQuestion = () => {
    console.log("moveToNextQuestion");
    ws.nextQuestion();
  };

  const handleAnswer = (answer) => {
    if (!clicked) {
      setClicked(true);
      ws.submitAnswer(answer);
    }

    // moveToNextQuestion();
  };
  const handleTimeout = () => {
    if (!clicked) {
      setTimeFinished(true);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
    }
  };

  useEffect(() => {
    if (currentAnswer) {
      console.log("got answer ,opening modal");
      setTimeout(() => {
        handleOpen();
      }, 1000);
    } else {
      console.log("next question setup");
      setClicked(false);
      setHelperOpen(false);
      setOpen(false);
      setTimeFinished(false);
      setAnswers(currentQuestion.answers);
    }
  }, [currentAnswer, currentQuestion]);
  return (
    <>
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ borderRadius: 10, mt: 1 }}
        onClick={handleExitGame}
      >
        EXIT GAME
      </Button>
      <Box
        sx={{
          maxWidth: { xs: "350px", sm: "400px", md: "500px" },
          m: "0 auto",
          position: "relative",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            width: "35px",
            height: "35px",

            fontWeight: "bold",
            borderRadius: "50%",
            border: "2px solid #7b1fa2",

            color: "#7b1fa2",
            position: "absolute",
            top: -5,
            right: 10,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",

              fontWeight: "bold",
              color: "#6a1b9a",
            }}
          >
            <Timer
              currentQuestion={currentQuestionNumber}
              moveToNextQuestion={moveToNextQuestion}
              currentAnswer={currentAnswer}
              handleTimeout={handleTimeout}
              clicked={clicked}
              players={quizPlayers}
            />
          </Typography>
        </Box>
        <Typography
          variant="h6"
          component="div"
          sx={{
            textAlign: "center",

            fontWeight: "bold",
            color: "#7b1fa2",
            position: "absolute",
            top: -2,
            left: 0,
          }}
        >
          Score : <span style={{ color: "#6a1b9a " }}> {score}</span>
        </Typography>
        <Box>
          <Grid container spacing={1} sx={{ width: "100%", mt: 3 }}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  pb: 2,
                  mt: 3,

                  mb: 2,
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
                  /{numberOfQuestions}
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
              answers.map((answer, i) => (
                <Grid item xs={12} sm={6} key={i + 1}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      size="large"
                      // disabled={clicked}
                      sx={{
                        minWidth: "130px",
                        borderRadius: 10,

                        fontSize: "0.8rem",

                        backgroundColor: "secondary.main",
                        "&:hover": {
                          backgroundColor: "secondary.dark",
                          transform: "scale(1.05)",
                        },
                      }}
                      onClick={() => handleAnswer(answer.text)}
                    >
                      {answer.text}
                    </Button>
                  </Stack>
                </Grid>
              ))}
          </Grid>
          <Helps
            answers={answers}
            setAnswers={setAnswers}
            setOpen={() => setHelperOpen(true)}
            setType={setType}
          ></Helps>
        </Box>
      </Box>
      <BetweenQuestionsModal
        open={open}
        handleClose={handleClose}
        timeFinished={timeFinished}
      />
      <HelperModal
        open={helperOpen}
        type={type}
        handleAnswer={handleAnswer}
        handleClose={() => setHelperOpen(false)}
        statisticAnswers={currentQuestion.statistics.perAnswer}
      />
    </>
  );
};

export default Game;
