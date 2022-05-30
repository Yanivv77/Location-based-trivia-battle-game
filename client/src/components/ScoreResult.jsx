import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Stack } from "@mui/material";

const ScoreResult = ({ score }) => {
  const [title, setTitle] = useState("");
  const { numberOfQuestions } = useSelector((state) => state.game.gameOptions);

  useState(() => {
    if (score > 7) {
      setTitle("Very good !");
    } else if (score >= 5) {
      setTitle("Not Bad !");
    } else {
      setTitle("You can do better !");
    }
  }, []);
  return (
    <Stack>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          mt: 2,
          fontWeight: "bold",

          color: "##eeeeee",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          mt: 1,
          mb: 1,
          fontWeight: "bold",
          color: "##eeeeee",
        }}
      >
        Your score is{" "}
        <span style={{ fontSize: "1.4rem", color: "red" }}>{score}</span> /
        {numberOfQuestions}
      </Typography>
    </Stack>
  );
};

export default ScoreResult;
