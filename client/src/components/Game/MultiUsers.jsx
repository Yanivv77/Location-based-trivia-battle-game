import React, { useState } from "react";
import Input from "../Input";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { restartGame, loadGame } from "../../features/game/gameSlice";

import MultipleUsersSelect from "../MultipleUsersSelect";

const MultiUsers = () => {
  const [usersList, setUsersList] = useState([
    { userName: "user 1", status: "accepted" },
    { userName: "user 2", status: "pending" },
    { userName: "user 3", status: "accepted" },
  ]);
  const dispatch = useDispatch();
  return (
    <div>
      <Button variant="contained" color="primary" size="small">
        Settings
      </Button>

      <div className="main-container" style={{ marginTop: "10%" }}>
        <div className="invite-options">
          <div className="users-by-link">
            <p> Send invitation link to friends and family to play with</p>

            <div style={{ display: "flex", marginBottom: "20px" }}>
              <Input values={{ placeholder: "Enter email" }} />
              <Button variant="contained" color="primary" size="small">
                Send
              </Button>
            </div>
          </div>

          <div
            className="users-from-list"
            style={{ display: "inline-grid", marginBottom: "20px" }}
          >
            <p>Or you can add online users from list:</p>
            <MultipleUsersSelect usersList={usersList} />
          </div>
        </div>
        <div
          className="total-invited"
          style={{ textAlign: "center", marginBottom: "30px" }}
        >
          <p>Total invited: {usersList.length}</p>

          <div
            style={{
              backgroundColor: "white",
              width: "fit-content",
              margin: "auto",
            }}
          >
            <h2>Invited Players</h2>
            <br />
            {usersList.map((user) => {
              return (
                <p key={user.userName}>
                  {user.userName}: {user.status} <br />
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
            onClick={() => dispatch(loadGame())}
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
