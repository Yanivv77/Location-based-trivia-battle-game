import { Button } from "@mui/material";
import React, { useState } from "react";
import LeaderBoard from "../components/LeaderBoard";
import GameHeader from "./../components/GameHeader";
import { useTranslation } from "react-i18next";

function EndGame(props) {
  const { t } = useTranslation(["Game/EndGame"]);

  const [usersList, setUsersList] = useState([
    { userName: "user 1", points: 11 },
    { userName: "user 2", points: 8 },
    { userName: "user 3", points: 5 },
    { userName: "user 4", points: 3 },
  ]);
  return (
    <div>
      <GameHeader />

      <div style={{ marginTop: "10%" }}>
        <LeaderBoard usersList={usersList} />

        <div
          className="options-buttons"
          style={{
            display: "flex",
            margin: "auto",
            width: "90%",
            marginTop: "40px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{
              width: "100%",
              margin: "5px",
            }}
          >
            {t("play again")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: "100%", margin: "5px" }}
          >
            {t("end game")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EndGame;
