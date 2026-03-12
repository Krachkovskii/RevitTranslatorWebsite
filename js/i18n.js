/**
 * i18n module — loads locale JSON files and exposes translation data.
 *
 * To add a new language:
 *   1. Create locales/<code>.json with all required keys
 *   2. Add the code to the LANGUAGES array below
 */

export const LANGUAGES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'ru', 'zh', 'ja', 'ko'];

/**
 * Fetches all locale files and returns an array of translation objects
 * in the same order as LANGUAGES.
 * @returns {Promise<Array<{lang: string, translations: Object}>>}
 */
export async function loadLocales() {
  const results = await Promise.all(
    LANGUAGES.map(async (lang) => {
      const response = await fetch(`locales/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load locale: ${lang}`);
      const translations = await response.json();
      return { lang, translations };
    })
  );
  return results;
}
