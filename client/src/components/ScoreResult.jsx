import React, { useEffect, useState } from "react";
import { Typography, Stack } from "@mui/material";

const ScoreResult = ({ score }) => {
  const [title, setTitle] = useState("");

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
        variant="h4"
        sx={{
          textAlign: "center",
          mt: 2,

          color: "##eeeeee",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          mt: 1,
          mb: 1,
          fontWeight: "bold",
          color: "##eeeeee",
        }}
      >
        Your score is {score}/10
      </Typography>
    </Stack>
  );
};

export default ScoreResult;
