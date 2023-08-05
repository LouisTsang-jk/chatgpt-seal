import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import translationEN from "@/conf/locale_en.json"
import translationZH from "@/conf/locale_zh.json"

const resources = {
  en: {
    translation: translationEN
  },
  zh: {
    translation: translationZH
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
})

export default i18n
