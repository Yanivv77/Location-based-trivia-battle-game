import { Button } from "@mui/material";
import React, { useState } from "react";
import LeaderBoard from "../components/LeaderBoard";

function EndGame(props) {
  const [usersList, setUsersList] = useState([
    { userName: "user 1", points: 11 },
    { userName: "user 2", points: 8 },
    { userName: "user 3", points: 5 },
    { userName: "user 4", points: 3 },
  ]);
  return (
    <div>
      <Button variant="contained" color="primary" size="small">
        Settings
      </Button>

      <div style={{ marginTop: "20%" }}>
        <LeaderBoard usersList={usersList} />

        <div
          className="options-buttons"
          style={{ margin: "auto", width: "70%",marginTop:"50px" }}

        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: "70%",display:"block",margin:"auto", marginBottom: "10px" }}
          >
            Play again
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: "70%",display:"block",margin:"auto" }}
          >
            End game
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EndGame;
