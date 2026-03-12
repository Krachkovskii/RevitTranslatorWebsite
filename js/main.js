/**
 * main.js — application entry point.
 * Loads locales, extracts taglines, and starts the typewriter animation.
 */

import { loadLocales } from './i18n.js';
import { startTypewriter } from './typewriter.js';

async function init() {
  const typewriterEl = document.getElementById('typewriter');

  try {
    const locales = await loadLocales();
    const phrases = locales.map(({ translations }) => translations.tagline);
    startTypewriter(typewriterEl, phrases);
  } catch (err) {
    console.error('Failed to initialise Revit Translator site:', err);
    typewriterEl.textContent = 'BIM Localization Tool';
  }
}

init();
