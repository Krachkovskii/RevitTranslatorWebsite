/**
 * i18n module — loads locale JSON files and exposes translation data.
 *
 * To add a new language:
 *   1. Create locales/<code>.json with all required keys
 *   2. Add the code to the LANGUAGES array below
 */

export const LANGUAGES = [
  'en', 'de', 'fr', 'es', 'pt', 'it', 'ru', 'zh', 'ja', 'ko',
] as const;

export type LangCode = typeof LANGUAGES[number];

export interface Translations {
  tagline: string;
  download_btn: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
}

export interface LocaleEntry {
  lang: LangCode;
  translations: Translations;
}

export async function loadLocales(): Promise<LocaleEntry[]> {
  return Promise.all(
    LANGUAGES.map(async (lang): Promise<LocaleEntry> => {
      const response = await fetch(`locales/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load locale: ${lang}`);
      const translations = await response.json() as Translations;
      return { lang, translations };
    })
  );
}
