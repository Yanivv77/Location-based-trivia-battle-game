import React, { useState } from "react";
import { Button } from "@mui/material";
import LeaderBoardItem from "./../components/LeaderBoardItem";

function LeaderBoard(props) {
  let { usersList } = props;
  return (
    <div>
      <div
        className="leader-board"
        style={{
          width: "fit-content",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h1>Leader Board</h1>
        <br />
        <LeaderBoardItem usersList={usersList}></LeaderBoardItem>
      </div>
    </div>
  );
}

export default LeaderBoard;
