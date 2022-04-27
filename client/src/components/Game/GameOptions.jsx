import React, { useState } from "react";
import { Grid, Button, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MultiUsers from "../Game/MultiUsers";
import { useDispatch } from "react-redux";
import { restartGame, loadGame } from "../../features/game/gameSlice";
// import OnlineUsers from "../components/Game/OnlineUsers";

const GameOptions = () => {
  const [multi, setMulti] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      {!multi ? (
        <>
          {" "}
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ borderRadius: 10, mt: 5 }}
            onClick={() => {
              dispatch(restartGame());
            }}
          >
            Go Back
          </Button>
          <Box sx={{ maxWidth: "400px", m: "0 auto" }}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                mt: 3,
                mb: 3,
                fontWeight: "bold",
                color: "##eeeeee",
              }}
            >
              Now choose how many players you want in your game
            </Typography>
            <Grid
              container
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  sx={{ borderRadius: 10, mt: 5 }}
                  onClick={() => dispatch(loadGame())}
                >
                  Single Player
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ borderRadius: 10, mt: 5 }}
                  onClick={() => setMulti(true)}
                >
                  Multipleyer
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <MultiUsers />
      )}
    </>
  );
};

export default GameOptions;
