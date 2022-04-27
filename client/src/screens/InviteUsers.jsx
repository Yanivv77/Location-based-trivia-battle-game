import Input from "./../components/Input";
import { Button } from "@mui/material";
import { useState } from "react";
import MultipleUsersSelect from "../components/MultipleUsersSelect";
import GameHeader from "./../components/GameHeader";
import { useTranslation } from "react-i18next";

function InviteUsers() {
  const { t } = useTranslation(["Game/InviteUsers"]);

  const [usersList, setUsersList] = useState([
    { userName: "user 1", status: "accepted" },
    { userName: "user 2", status: "pending" },
    { userName: "user 3", status: "accepted" },
  ]);

  return (
    <div>
      <GameHeader />

      <div className="main-container" style={{ marginTop: "10%" }}>
        <div
          className="invite-options"
          style={{ width: "fit-content", margin: "auto" }}
        >
          <div className="users-by-link">
            <p>
              {t("send invitation link to friends and family to play with")}
            </p>

            <div style={{ display: "flex", marginBottom: "20px" }}>
              <Input values={{ placeholder: t("enter email") }} />
              <Button variant="contained" color="primary" size="small">
                {t("send")}
              </Button>
            </div>
          </div>

          <div
            className="users-from-list"
            style={{ display: "inline-grid", marginBottom: "20px" }}
          >
            <p>{t("or you can add online users from list")}</p>
            <MultipleUsersSelect
              usersList={usersList}
              label={t("select user")}
            />
          </div>
        </div>
        <div
          className="total-invited"
          style={{ textAlign: "center", marginBottom: "30px" }}
        >
          <p>
            {t("total invited")} {usersList.length}
          </p>

          <div
            style={{
              backgroundColor: "white",
              width: "fit-content",
              margin: "auto",
            }}
          >
            <h2>{t("invited players")}</h2>
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
          style={{ margin: "auto", width: "50%" }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="small"
            style={{
              width: "70%",
              display: "block",
              margin: "auto",
              marginBottom: "10px",
            }}
          >
            {t("start game")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: "70%", display: "block", margin: "auto" }}
          >
            {t("back to menu")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InviteUsers;
