import Input from "./../components/Input";
import { Button } from "@mui/material";
import MultipleSelect from "../components/MultipleUsersSelect";
import { useState } from "react";

function InviteUsers() {
  const [usersList, setUsersList] = useState([
    { userName: "user 1", status: "accepted" },
    { userName: "user 2", status: "pending" },
    { userName: "user 3", status: "accepted" },
  ]);

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
            <MultipleSelect usersList={usersList} />
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
            style={{ width: "100%", marginBottom: "10px" }}
          >
            Start game
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: "100%" }}
          >
            Back to menu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InviteUsers;
