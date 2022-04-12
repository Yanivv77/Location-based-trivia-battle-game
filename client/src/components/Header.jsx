import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function Header() {
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
    <>
      <header className="my-4">
        <div className="container d-flex justify-content-center ">
          <h1 className="text-red">{t("world trivia battle")}</h1>

          <select
            value={localStorage.getItem("i18nextLng")}
            onChange={handleLanguageChange}
          >
            <option value="en">english</option>
            <option value="he">עברית </option>
          </select>
        </div>
      </header>
      <br />
    </>
  );
}

export default Header;
