import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Avatar, Stack } from "@mui/material";
import {
  changeHalfHelper,
  changeStatisticsHelper,
  changeFollowHelper,
} from "../features/game/gameSlice";

function Helps({ answers, setAnswers, setOpen, setType }) {
  const dispatch = useDispatch();
  const helpOptions = useSelector((state) => state.game.helpers);

  const helpStatistics = () => {
    if (!helpOptions.isStatisticsUsed) {
      setType("statistics");
      setOpen();
      dispatch(changeStatisticsHelper());
    }
  };
  const helpHalf = () => {
    if (!helpOptions.isHalfAnswersUsed) {
      const correctAnswer = answers.filter((answer) => answer.isCorrect);

      const wrongAnswer = answers
        .filter((answer) => !answer.isCorrect)
        .slice(2);
      const halfAnswers = [...correctAnswer, ...wrongAnswer];
      setAnswers(halfAnswers);
      dispatch(changeHalfHelper());
    }
  };
  const helpFollow = () => {
    setType("follow");
    setOpen();
    dispatch(changeFollowHelper());
  };

  return (
    <>
      <Stack
        spacing={1}
        direction="row"
        sx={{ mt: 5, textAlign: "center", width: "100%", fontSize: "0.7rem" }}
      >
        {!helpOptions.isStatisticsUsed && (
          <Button
            onClick={() => helpStatistics()}
            sx={{ width: "20vh", fontSize: "0.7rem", bgcolor: "#ab47bc" }}
            variant="contained"
            color="secondary"
            startIcon={
              <Avatar
                sx={{ width: 35, height: 35 }}
                src={
                  "https://cdn-icons.flaticon.com/png/512/2936/premium/2936709.png"
                }
              />
            }
          >
            Statistics
          </Button>
        )}

        {!helpOptions.isHalfAnswersUsed && (
          <Button
            onClick={() => helpHalf()}
            sx={{ width: "20vh", bgcolor: "#ab47bc" }}
            variant="contained"
            color="secondary"
            startIcon={
              <Avatar
                sx={{ width: 35, height: 35 }}
                src={"https://cdn-icons-png.flaticon.com/512/6663/6663212.png"}
              />
            }
          >
            50/50
          </Button>
        )}

        {!helpOptions.isFollowUsed && (
          <Button
            onClick={() => helpFollow()}
            sx={{ width: "20vh", fontSize: "0.8rem", bgcolor: "#ab47bc" }}
            variant="contained"
            color="secondary"
            startIcon={
              <Avatar
                sx={{ width: 35, height: 35 }}
                src={"https://cdn-icons-png.flaticon.com/512/1177/1177444.png"}
              />
            }
          >
            Follow
          </Button>
        )}
      </Stack>
    </>
  );
}

export default Helps;
