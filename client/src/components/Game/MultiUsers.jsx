import React, { useState, useContext, useEffect } from "react";
import Input from "../Input";
import { Button, TextField, Stack, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { WebSocketContext } from "../Websocket/WebSocket";
import {
  restartGame,
  loadGame,
  addInvitedPlayer,
} from "../../features/game/gameSlice";

import MultipleUsersSelect from "../MultipleUsersSelect";

const MultiUsers = () => {
  const [invited, setInvited] = useState({ name: "", email: "" });
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  const onlinePlayers = useSelector((state) => state.quiz.quizPlayers);
  const invitedPlayers = useSelector(
    (state) => state.game.gameOptions.invitedPlayers
  );

  const handleCreateGame = () => {
    ws.createGame("770");
  };

  const handleStartGame = () => {
    ws.startGame();
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
    <div>
      <Button variant="contained" color="primary" size="small">
        Settings
      </Button>

      <div className="main-container" style={{ marginTop: "10%" }}>
        <div className="invite-options">
          <div className="users-by-link">
            <p> Send invitation link to friends and family to play with</p>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Stack spacing={2}>
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
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleSend}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </div>

          <div
            style={{
              backgroundColor: "white",
              width: "fit-content",
              margin: "auto",
            }}
          >
            <br />
            {invitedPlayers.length > 0 &&
              invitedPlayers.map((user) => {
                return (
                  <p key={user.name}>
                    {user.name} is invited <br />
                  </p>
                );
              })}
            <br />
          </div>

          <div
            className="users-from-list"
            style={{ display: "inline-grid", marginBottom: "20px" }}
          >
            <p>Or you can add online users from list:</p>
            {/* <MultipleUsersSelect usersList={invitedPlayers} /> */}
          </div>
        </div>
        <div
          className="total-invited"
          style={{ textAlign: "center", marginBottom: "30px" }}
        >
          <p>Total invited: {invitedPlayers.length}</p>
          <h2>Invited Players</h2>

          <div
            style={{
              backgroundColor: "white",
              width: "fit-content",
              margin: "auto",
            }}
          >
            <br />
            {onlinePlayers.length > 0 &&
              onlinePlayers.map((user) => {
                return (
                  <p key={user.id}>
                    {user.name}: is online <br />
                  </p>
                );
              })}
            <br />
          </div>
        </div>
        <div
          className="options-buttons"
          style={{ margin: "auto", width: "70%" }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{
              width: "70%",
              display: "block",
              margin: "auto",
              marginBottom: "10px",
            }}
            onClick={handleCreateGame}
          >
            Create game
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{
              width: "70%",
              display: "block",
              margin: "auto",
              marginBottom: "10px",
            }}
            onClick={handleStartGame}
          >
            Start game
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: "70%", display: "block", margin: "auto" }}
          >
            Back to menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultiUsers;
