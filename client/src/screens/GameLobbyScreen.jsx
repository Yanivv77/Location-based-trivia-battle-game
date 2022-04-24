import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography, Box, Paper } from "@mui/material";
import TriviaLocationOptions from "../components/Game/TriviaLocation";
import GameOptions from "../components/Game/GameOptions";
import LoadingGame from "../components/Game/LoadingGame";
import Game from "../components/Game/Game";
import EndGame from "../components/Game/EndGame";

import { useSelector } from "react-redux";
import {
  INIT_GAME,
  LOADING_GAME,
  GAME_OPTIONS,
  GAME,
  END_GAME,
} from "../utils/gameConstants";

const GameLobbyScreen = () => {
  const currentStage = useSelector((state) => state.game.stage);

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
    case END_GAME:
      gameStage = <EndGame />;
      break;
    default:
      break;
  }
  return (
    <>
      <Typography
        variant="h3"
        component="div"
        sx={{
          flexGrow: 1,
          color: "##eeeeee",
          textAlign: "center",
          mt: 3,
          mb: 3,
        }}
      >
        Game Lobby
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: "100%",
          background: "#ffecb3",
          p: 3,
        }}
      >
        {gameStage}
      </Paper>
    </>
  );
};

export default GameLobbyScreen;
