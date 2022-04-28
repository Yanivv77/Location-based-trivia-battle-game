import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Avatar } from "@mui/material";
import { changeHalfHelper } from "../features/game/gameSlice";

function Helps({ answers, setAnswers }) {
  const dispatch = useDispatch();
  const helpOptions = useSelector((state) => state.game.helpers);
  const helpStatistics = () => {
    console.log("help statistics");
  };
  const helpHalf = () => {
    if (!helpOptions.isHalfAnswersUsed) {
      const correctAnswer = answers.filter((answer) => answers.isCorrect);
      const wrongAnswer = answers
        .filter((answer) => !answers.isCorrect)
        .slice(2);
      const halfAnswers = [...correctAnswer, ...wrongAnswer];
      setAnswers(halfAnswers);
      dispatch(changeHalfHelper());
      console.log(wrongAnswer);
      console.log(halfAnswers);
    }
  };
  const helpFollow = () => {
    console.log("help follow");
  };

  return (
    <>
      <Grid sx={{ mt: 5, textAlign: "center", width: "100%" }}>
        <Button
          onClick={() => helpStatistics()}
          sx={{ mr: 5, mt: 1, width: "20vh" }}
          variant="contained"
          color="secondary"
          startIcon={
            <Avatar
              src={
                "https://cdn-icons.flaticon.com/png/512/2936/premium/2936709.png?token=exp=1650995228~hmac=1db2c77cfcc9548ff209d1f03865845d"
              }
            />
          }
        >
          Statistics
        </Button>

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
