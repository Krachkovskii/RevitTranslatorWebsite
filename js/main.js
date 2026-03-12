/**
 * main.ts — application entry point.
 * Loads locales, starts the typewriter, and wires up the language selector.
 */
import { loadLocales, LANGUAGES } from './i18n.js';
import { startTypewriter } from './typewriter.js';
import { initLangSelector } from './lang-selector.js';
const localeMap = new Map();
function applyTranslations(lang) {
    const t = localeMap.get(lang);
    if (!t)
        return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key] !== undefined)
            el.innerHTML = t[key];
    });
}
async function init() {
    const typewriterEl = document.getElementById('typewriter');
    try {
        initLangSelector(LANGUAGES, (lang) => applyTranslations(lang));
    }
    catch (err) {
        console.error('Failed to init lang selector:', err);
    }
    try {
        const locales = await loadLocales();
        const phrases = [];
        for (const { lang, translations } of locales) {
            localeMap.set(lang, translations);
            phrases.push(translations.tagline);
        }
        startTypewriter(typewriterEl, phrases);
        applyTranslations('en');
    }
    catch (err) {
        console.error('Failed to initialise Revit Translator site:', err);
        typewriterEl.textContent = 'BIM Localization Tool';
    }
}
init();
//# sourceMappingURL=main.js.map