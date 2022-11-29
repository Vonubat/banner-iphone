import { Language, DEFAULT_LANGUAGE, LANG } from '../constants';

const getSystemLanguages = (languageCodeOnly = true): string[] => {
  const browserLocales: readonly string[] =
    navigator.languages === undefined ? [navigator.language] : navigator.languages;

  return browserLocales.map((locale: string): string => {
    const trimmedLocale = locale.trim();
    return languageCodeOnly ? trimmedLocale.split(/-|_/)[0] : trimmedLocale;
  });
};

const getPreferredLanguage = (): Language => {
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

const setLang = (lang: Language): Language => {
  document.documentElement.setAttribute(LANG, lang);
  return lang;
};

export const searchParamsHandler = (): Language => {
  const url: URL = new URL(window.location.href);
  const langParam: string | null = new URLSearchParams(url.search).get(LANG);
  const preferredLanguage: Language = getPreferredLanguage();

  switch (langParam) {
    case DEFAULT_LANGUAGE:
      return setLang(DEFAULT_LANGUAGE);

    case Language.es:
      return setLang(Language.es);

    case Language.fr:
      return setLang(Language.fr);

    case Language.ja:
      return setLang(Language.ja);

    case Language.nl:
      return setLang(Language.nl);

    case Language.ru:
      return setLang(Language.ru);

    case Language.zh:
      return setLang(Language.zh);

    default:
      url.searchParams.set(LANG, preferredLanguage);
      window.history.replaceState({}, '', url);
      return setLang(preferredLanguage);
  }
};
