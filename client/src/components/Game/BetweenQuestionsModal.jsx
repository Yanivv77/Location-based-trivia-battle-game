import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import LeaderBoard from "../LeaderBoard";
import { useDispatch, useSelector } from "react-redux";
import {
  restartGame,
  finishGame,
  startGame,
} from "../../features/game/gameSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "#f0f4c3",
  filter: " opacity(95%)",
  border: "none",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // background: "#90caf9",

  boxShadow: 24,
  p: 4,
};

const BetweenQuestionsModal = ({ open, handleClose, timeFinished }) => {
  const {
    correctAnswer,
    currentAnswer,
    currentPlayersAnswers,
    currentQuestionNumber,
  } = useSelector((state) => state.quiz);

  useEffect(() => {
    console.log("open in modal: ", open);
  }, [open]);

  return (
    <>
      {" "}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2>Question {currentQuestionNumber}</h2>
            {timeFinished ? (
              <div className="main-container" style={{ marginTop: "5%" }}>
                {currentPlayersAnswers.length ? (
                  <LeaderBoard usersList={currentPlayersAnswers} />
                ) : null}

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
                  <h1>Sorry the time is up!</h1>
                </div>

                {/* <div
                className="random-fact"
                style={{
                  backgroundColor: "white",
                  width: "50%",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                {currentAnswer?.correctAnswer.text}
              </div> */}
              </div>
            ) : (
              <>
                <div className="main-container" style={{ marginTop: "5%" }}>
                  <LeaderBoard usersList={currentPlayersAnswers} />

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
                    {currentAnswer && currentAnswer.isCorrect ? (
                      <h3>Verry Good !</h3>
                    ) : (
                      <h3>Sorry your answer is not correct</h3>
                    )}
                    <h2 style={{ marginTop: "1opx" }}>The right answer is:</h2>
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
                    {correctAnswer.text}
                  </div>
                </div>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default BetweenQuestionsModal;
