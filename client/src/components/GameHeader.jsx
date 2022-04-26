import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import RainbowText from "react-rainbow-text";
import { Button } from "@mui/material";

function GameHeader() {
  const { i18n, t } = useTranslation(["header"]);

  useEffect(() => {
    let userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.split("-");
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage(userLang[0]);
    }
  }, []);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button   variant="contained" color="primary" size="small">
        {/* {t("settings")} */}
        <i className="bi bi-gear-fill">
      </Button>
      <select
        value={localStorage.getItem("i18nextLng")}
        onChange={handleLanguageChange}
      >
        <option value="en">(EN) english</option>
        <option value="he">(HE) עברית </option>
      </select>
    </div>
  );
}

export default GameHeader;
