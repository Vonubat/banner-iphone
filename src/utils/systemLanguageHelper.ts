import { Language, DEFAULT_LANGUAGE } from '../constants';

const getSystemLanguages = (languageCodeOnly = true): string[] => {
  const browserLocales: readonly string[] =
    navigator.languages === undefined ? [navigator.language] : navigator.languages;

  return browserLocales.map((locale: string): string => {
    const trimmedLocale = locale.trim();
    return languageCodeOnly ? trimmedLocale.split(/-|_/)[0] : trimmedLocale;
  });
};

export const getPreferredLanguage = (): Language => {
  const systemLanguages = getSystemLanguages();
  const availableLanguages = Object.values(Language);

  const preferredLanguage = systemLanguages.find((systemLang) =>
    availableLanguages.some((availableLang) => systemLang === availableLang)
  ) as Language | undefined;

  if (!preferredLanguage) {
    return DEFAULT_LANGUAGE;
  }

  return preferredLanguage;
};
