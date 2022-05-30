import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import RainbowText from 'react-rainbow-text'
import Cookies from 'js-cookie'
const username = Cookies.get('username')

function Header() {
  const { i18n, t } = useTranslation(['header'])

  useEffect(() => {
    let userLang = navigator.language || navigator.userLanguage
    userLang = userLang.split('-')
    if (localStorage.getItem('i18nextLng')?.length > 2) {
      i18next.changeLanguage(userLang[0])
    }
  }, [])

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <>
      <header className="mt-3">
        <div className="container d-flex justify-content-center ">
          <h1 className="display-2">
            <RainbowText lightness={0.4} saturation={1}>
              {t('World Trivia Battle')}
            </RainbowText>
          </h1>

          {/* <select value={localStorage.getItem('i18nextLng')} onChange={handleLanguageChange}>
            <option value="en">english</option>
            <option value="he">עברית </option>
          </select>  */}
        </div>
      </header>
      <br />
    </>
  )
}

export default Header
