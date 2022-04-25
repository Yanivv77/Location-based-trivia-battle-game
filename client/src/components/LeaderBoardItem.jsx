import React from "react";

function LeaderBoardItem(props) {
  return (
    <div className="items">
      {props.usersList.map((user, index) => {
        return (
          <div
            className="item"
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "white",
              borderRadius: "7px",
              padding: "8px 15px",
              marginBottom: "10px",
            }}
          >
            <div className="user">
              {index + 1}. {user.userName}
            </div>

            <div className="points">{user.points}</div>
          </div>
        );
      })}
    </div>
  );
}

export default LeaderBoardItem;
