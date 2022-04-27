import React, { useState } from "react";
import { Button } from "@mui/material";
import LeaderBoard from "./../components/LeaderBoard";

import GameHeader from "../components/GameHeader";
import { useTranslation } from 'react-i18next';


function BetweenQuestions(props) {
  const { t } = useTranslation(["Game/BetweenQuestions"]);

  const [usersList, setUsersList] = useState([
    { userName: "user 1", points: 11 },
    { userName: "user 2", points: 8 },
    { userName: "user 3", points: 5 },
    { userName: "user 4", points: 3 },
  ]);
  return (
    <div>
      <GameHeader />

      <div className="main-container" style={{ marginTop: "10%" }}>
        <LeaderBoard usersList={usersList} />

        <div
          className="right-answer"
          style={{
            width: "fit-content",
            margin: "auto",
            textAlign: "center",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <h1>{t("the right answer is")}</h1>
        </div>

        <div
          className="random-fact"
          style={{
            backgroundColor: "white",
            width: "50%",
            margin: "auto",
            textAlign: "center",
          }}
        >
          Random fact
        </div>
      </div>
    </div>
  );
}

export default BetweenQuestions;
