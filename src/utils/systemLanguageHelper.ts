import { Language, DEFAULT_LANGUAGE, LANG } from '../constants';

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

export const searchParamsHandler = () => {
  const url: URL = new URL(window.location.href);
  const langParam: string | null = new URLSearchParams(url.search).get(LANG);
  const preferredLanguage: Language = getPreferredLanguage();

  switch (langParam) {
    case DEFAULT_LANGUAGE:
      return DEFAULT_LANGUAGE;

    case Language.es:
      return Language.es;

    case Language.fr:
      return Language.fr;

    case Language.ja:
      return Language.ja;

    case Language.nl:
      return Language.nl;

    case Language.ru:
      return Language.ru;

    case Language.zh:
      return Language.zh;

    default:
      url.searchParams.set(LANG, preferredLanguage);
      window.history.replaceState({}, '', url);
      return preferredLanguage;
  }
};
