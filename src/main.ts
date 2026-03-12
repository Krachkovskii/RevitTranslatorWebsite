/**
 * main.ts — application entry point.
 * Loads locales, starts the typewriter, and wires up the language selector.
 */

import { loadLocales, LANGUAGES }  from './i18n.js';
import type { LangCode, Translations } from './i18n.js';
import { startTypewriter }          from './typewriter.js';
import { initLangSelector }         from './lang-selector.js';

const localeMap = new Map<LangCode, Translations>();

function applyTranslations(lang: LangCode): void {
  const t = localeMap.get(lang);
  if (!t) return;
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n as keyof Translations;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
}

async function init(): Promise<void> {
  const typewriterEl = document.getElementById('typewriter') as HTMLElement;

  try {
    initLangSelector(LANGUAGES, (lang) => applyTranslations(lang));
  } catch (err) {
    console.error('Failed to init lang selector:', err);
  }

  try {
    const locales = await loadLocales();
    const phrases: string[] = [];

    for (const { lang, translations } of locales) {
      localeMap.set(lang, translations);
      phrases.push(translations.tagline);
    }

    startTypewriter(typewriterEl, phrases);
    applyTranslations('en');

  } catch (err) {
    console.error('Failed to initialise Revit Translator site:', err);
    typewriterEl.textContent = 'BIM Localization Tool';
  }
}

init();
