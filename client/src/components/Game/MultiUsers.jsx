import React, { useState, useContext, useEffect } from "react";

import { Button, TextField, Stack, Grid, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { WebSocketContext } from "../Websocket/WebSocket";
import Copy from "../Copy";
import { loadGame, addInvitedPlayer } from "../../features/game/gameSlice";

const MultiUsers = () => {
  const [invited, setInvited] = useState({ name: "", email: "" });
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  const onlinePlayers = useSelector((state) => state.quiz.quizPlayers);
  const { game, gameOptions } = useSelector((state) => state.game);
  const { invitedPlayers } = useSelector((state) => state.game.gameOptions);

  const handleCreateGame = () => {
    setClicked(true);
    ws.createGame({ ...game, gameOptions });
  };

  const handleStartGame = () => {
    ws.startGame(game.gameId);
    dispatch(loadGame());
  };

  const handleSend = () => {
    dispatch(addInvitedPlayer(invited));
    setInvited({ name: "", email: "" });
  };

  useEffect(() => {
    console.log(onlinePlayers);
  }, [onlinePlayers]);
  return (
    <Box
      sx={{
        filter: "opacity(70%)",
        bgcolor: "background.paper",
        borderRadius: "5px",
        width: "100%",
        m: "0 auto",
        p: 1,
      }}
    >
      <div className="main-container" style={{ marginTop: "10px" }}>
        <div className="invite-options">
          <div className="users-by-link">
            <h6> Send invitation link to friends and family to play with</h6>
            <Grid
              container
              // justifyContent="center"
              // alignItems="center"
              spacing={2}
              sx={{ mt: 1 }}
            >
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <TextField
                    required
                    id="standard-required"
                    label="Name"
                    variant="standard"
                    value={invited.name}
                    onChange={(e) => {
                      setInvited({ ...invited, name: e.target.value });
                    }}
                  />
                  <TextField
                    required
                    id="standard-required"
                    label="Email"
                    variant="standard"
                    value={invited.email}
                    onChange={(e) => {
                      setInvited({ ...invited, email: e.target.value });
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4} justifyContent="center" alignItems="center">
                <Stack
                  sx={{ width: "100%", height: "100%" }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleSend}
                  >
                    Send
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </div>

          <Grid
            container
            spacing={1}
            sx={{ width: "100%", mt: 1, mr: 1, mb: 1 }}
          >
            <Grid item xs={6}>
              <Typography>Invited Players:</Typography>
              <Stack
                justifyContent="center"
                sx={{
                  minHeight: "50px",
                  bgcolor: "#f0f4c3",

                  borderRadius: "10px",
                  pl: "5px",
                }}
              >
                {invitedPlayers.length > 0 &&
                  invitedPlayers.map((user) => {
                    return (
                      <Typography variant="body2" key={user.name}>
                        {user.name} <br />
                      </Typography>
                    );
                  })}
                {/* <p>Total invited: {invitedPlayers.length}</p> */}
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Typography>Players online:</Typography>
              <Stack
                justifyContent="center"
                sx={{
                  minHeight: "50px",
                  bgcolor: "#f0f4c3",

                  borderRadius: "10px",
                  pl: "5px",
                }}
              >
                {onlinePlayers.length > 0 &&
                  onlinePlayers.map((user, i) => {
                    return (
                      <Typography variant="body2" key={i}>
                        {user.name}
                      </Typography>
                    );
                  })}
              </Stack>
            </Grid>
          </Grid>

          {/* <div
            className="users-from-list"
            style={{ display: "inline-grid", marginBottom: "20px" }}
          >
            <p>Or you can add online users from list:</p>
             <MultipleUsersSelect usersList={invitedPlayers} /> 
          </div> */}
        </div>

        {game && clicked && (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2, mb: 4 }}
          >
            <Typography variant="body2" sx={{ mb: 1 }}>
              You can copy a link to invite players :{" "}
            </Typography>
            <Copy
              joinGameId={`http://localhost:3000/waitingroom/${game.gameId}`}
              // joinGameId={`https://worldtrivia.herokuapp.com/waitingroom/${game.gameId}`}
            />
          </Stack>
        )}
        <div
          className="options-buttons"
          style={{ margin: "auto", width: "90%" }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{
              width: "60%",
              display: "block",
              margin: "auto",
              marginBottom: "20px",
            }}
            onClick={handleCreateGame}
            disabled={clicked}
          >
            Create game
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{
              width: "60%",
              display: "block",
              margin: "auto",
              marginBottom: "10px",
            }}
            onClick={handleStartGame}
            disabled={!clicked}
          >
            Start game
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default MultiUsers;
