import React from "react";
import { useTranslation } from 'react-i18next';

function LeaderBoardItem(props) {
  const { t } = useTranslation(["Game/LeaderBoard"]);

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
              backgroundColor: "#F5F5F5",
              borderRadius: "11px",
              padding: "10px 15px",
              marginBottom: "10px",
            }}
          >
            <div className="user">
              {index + 1})
            </div>
            {user.userName}
            <div className="points">{user.points} {t("pt")}</div>
          </div>
        );
      })}
    </div>
  );
}

export default LeaderBoardItem;
