import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Paper, Stack } from "@mui/material";

import LeaderBoard from "../components/LeaderBoard";
import ScoreResult from "../components/ScoreResult";
import { resetState } from "../features/quiz/quizSlice";

const EndGame = () => {
  const { quizPlayers, score } = useSelector((state) => state.quiz);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(resetState());

    navigate("/profile");
  };

  return (
    <>
      <Box
        sx={{
          m: "0 auto",
          maxWidth: { xs: "350px", sm: "400px", md: "500px" },
        }}
      >
        <ScoreResult score={score} />
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            m: 1,
            mb: 3,
            borderRadius: 5,
            border: "3px solid green",
            color: "",
            p: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{
              textAlign: "center",

              fontWeight: "bold",
              color: "#6a1b9a",
            }}
          >
            The WINNER is{" "}
            <span style={{ fontSize: "1.2rem", color: "#4a148c" }}>
              {quizPlayers[0].name}
            </span>{" "}
            !
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ borderRadius: 10 }}
            onClick={handleButtonClick}
          >
            Go To Profile
          </Button>
        </Stack>
        <LeaderBoard usersList={quizPlayers} />
      </Box>
    </>
  );
};

export default EndGame;
