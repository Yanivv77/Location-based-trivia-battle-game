import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography, Box, Paper } from "@mui/material";
import TriviaLocationOptions from "../components/Game/TriviaLocation";
import GameOptions from "../components/Game/GameOptions";
import LoadingGame from "../components/Game/LoadingGame";
import Game from "../components/Game/Game";
import EndGame from "../components/Game/EndGame";
import BetweenQuestions from "../components/Game/BetweenQuestions";
import NavBar from "../components/NavBar";
import LeftSideMenu from "../components/LeftSideMenu";

import { useSelector } from "react-redux";



import TriviaLocation from "./../components/Game/TriviaLocation";
import Helps from './../components/Helps';

import {
  INIT_GAME,
  LOADING_GAME,
  GAME_OPTIONS,
  BETWEEN_QUESTIONS,
  GAME,
  END_GAME,
} from "../utils/gameConstants";

const GameLobbyScreen = () => {
  const [open, setOpen] = useState(false);
  const currentStage = useSelector((state) => state.game.stage);
  const navigate = useNavigate();
  let gameStage;
  switch (currentStage) {
    case INIT_GAME:
      gameStage = <TriviaLocationOptions />;
      break;
    case GAME_OPTIONS:
      gameStage = <GameOptions />;
      break;
    case LOADING_GAME:
      gameStage = <LoadingGame />;
      break;
    case GAME:
      gameStage = <Game />;
      break;
    case BETWEEN_QUESTIONS:
      gameStage = <BetweenQuestions />;
      break;
    case END_GAME:
      gameStage = <EndGame />;
      break;
    default:
      break;
  }
  return (
    <>
      <NavBar setOpen={setOpen} />
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: "100%",
          background:
            "url(https://imgc.allpostersimages.com/img/posters/aged-treasure-map-background_u-L-F78UCO0.jpg?artHeight=900&artPerspective=n&artWidth=900) no-repeat fixed center",
          backgroundSize: "cover",
          p: 3,
        }}
      >
        {gameStage}
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{ borderRadius: 10, mt: 5 }}
          onClick={() => {
            navigate("/profile");
          }}
        >
          Go Back
        </Button>

        <Helps></Helps>
      </Paper>
      <LeftSideMenu open={setOpen} isOpen={open} />
    </>
  );
};

export default GameLobbyScreen;
