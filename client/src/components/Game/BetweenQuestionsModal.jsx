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
  bgcolor: "background.paper",
  border: "2px solid #000",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#90caf9",

  boxShadow: 24,
  p: 4,
};

const BetweenQuestionsModal = ({ open, handleClose }) => {
  const [usersList, setUsersList] = useState([
    { userName: "user 1", points: 11 },
    { userName: "user 2", points: 8 },
    { userName: "user 3", points: 5 },
    { userName: "user 4", points: 3 },
  ]);

  const currentQuestion = useSelector((state) =>
    state.quiz.questions[state.quiz.currentQuestionIndex]
      ? state.quiz.questions[state.quiz.currentQuestionIndex]
      : state.quiz.questions[state.quiz.currentQuestionIndex - 1]
  );

  useEffect(() => {
    open &&
      setTimeout(() => {
        handleClose();
        console.log("closed");
        console.log(open);
      }, 2000);
  }, [open]);
  return (
    <div>
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
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default BetweenQuestionsModal;
