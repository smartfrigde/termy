import en from "@/assets/i18n/en.json";
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
const translations = {
    ...en,
};
export const i18n = new I18n(translations, {
    defaultLocale: "en",
    enableFallback: true,
    locale: getLocales()[0]?.languageCode ?? "en",
});
