import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Button, Box } from "@mui/material";

const Follow = ({ handleAnswer, handleClose }) => {
  const { user, guestUser } = useSelector((state) => state.auth);
  const { currentPlayersAnswers } = useSelector((state) => state.quiz);
  const userOrGuest = user ? user : guestUser;
  const playersAnswers = useMemo(() => {
    return currentPlayersAnswers.filter(
      (answer) => answer.id !== userOrGuest?.id
    );
  }, [currentPlayersAnswers]);

  const handleFollow = (answer) => {
    console.log(answer);
    handleAnswer(answer);
    setTimeout(() => handleClose(), 500);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100px" }}>
      {playersAnswers?.length ? (
        playersAnswers.map((user, index) => {
          return (
            <div
              className="item"
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#F5F5F5",
                borderRadius: "11px",
                padding: "10px 15px",
                marginBottom: "10px",
              }}
            >
              <div className="user">{index + 1})</div>
              {user.name}

              <Button onClick={() => handleFollow(user.answer)}>Follow</Button>
            </div>
          );
        })
      ) : (
        <h5>You can't follow yet</h5>
      )}
    </Box>
  );
};

export default Follow;
