import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Avatar } from "@mui/material";
import {
  changeHalfHelper,
  changeStatisticsHelper,
} from "../features/game/gameSlice";

function Helps({ answers, setAnswers, setOpen }) {
  const dispatch = useDispatch();
  const helpOptions = useSelector((state) => state.game.helpers);

  const helpStatistics = () => {
    if (!helpOptions.isStatisticsUsed) {
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
    console.log("help follow");
  };

  return (
    <>
      <Grid sx={{ mt: 5, textAlign: "center", width: "100%" }}>
        {!helpOptions.isStatisticsUsed && (
          <Button
            onClick={() => helpStatistics()}
            sx={{ mr: 5, mt: 1, width: "20vh" }}
            variant="contained"
            color="secondary"
            startIcon={
              <Avatar
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
            sx={{ mr: 5, mt: 1, width: "20vh" }}
            variant="contained"
            color="secondary"
            startIcon={
              <Avatar
                src={"https://cdn-icons-png.flaticon.com/512/6663/6663212.png"}
              />
            }
          >
            50/50
          </Button>
        )}

        <Button
          onClick={() => helpFollow()}
          sx={{ mr: 5, mt: 1, width: "20vh" }}
          variant="contained"
          color="secondary"
          startIcon={
            <Avatar
              src={"https://cdn-icons-png.flaticon.com/512/1177/1177444.png"}
            />
          }
        >
          Follow
        </Button>
      </Grid>
    </>
  );
}

export default Helps;
