import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography, Box, Paper } from "@mui/material";
import TriviaLocationOptions from "../components/Game/TriviaLocation";
import GameOptions from "../components/Game/GameOptions";
import LoadingGame from "../components/Game/LoadingGame";
import Game from "../components/Game/Game";
import EndGame from "../components/Game/EndGame";

import { useSelector } from "react-redux";
import TriviaLocation from "./../components/Game/TriviaLocation";
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
          pt: 3,
          pb: 3,

          background: "rgb(243, 168, 71)",
        }}
      >
        Game Lobby
      </Typography>
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
            // navigate("/profile");
          }}
        >
          Go Back
        </Button>
        <Box sx={{ maxWidth: "400px", m: "0 auto" }}>
          <TriviaLocation />
        </Box>

        {/* <Helps></Helps> */}
      </Paper>
    </>
  );
};

export default GameLobbyScreen;
