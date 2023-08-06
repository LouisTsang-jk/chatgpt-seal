import { Switch } from "@mui/material"
import useStorage from "@/hooks/useStorage"
import { useTranslation } from 'react-i18next'

const Setting = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useStorage("language")

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const language = event.target.checked ? "en" : "zh"
    setLanguage(language)
    i18n.changeLanguage(language)
  }

  return (
    <div>
      <h1>{t("Setting")}</h1>
      <Switch
        checked={language === "en"}
        onChange={handleSwitchChange}
        name="languageSwitch"
        inputProps={{ "aria-label": "language switch" }}
      />

    </div>
  )
}

export default Setting