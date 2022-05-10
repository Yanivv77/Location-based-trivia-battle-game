import LeaderBoardItem from "./../components/LeaderBoardItem";
import { useTranslation } from "react-i18next";

function LeaderBoard({ usersList }) {
  const { t } = useTranslation(["Game/LeaderBoard"]);

  return (
    <div>
      <div
        className="leader-board"
        style={{
          width: "90%",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h1>{t("leader board")}</h1>
        <br />
        <LeaderBoardItem usersList={usersList}></LeaderBoardItem>
      </div>
    </div>
  );
}

export default LeaderBoard;
