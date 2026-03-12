/**
 * lang-selector.ts — Win11-style language combobox.
 *
 * Renders language options into #lang-dropdown and wires up open/close
 * behaviour. Calls onLangChange(langCode) when the user picks a language.
 */

import type { LangCode } from './i18n.js';

interface LangInfo {
  code: string;
  name: string;
}

export const LANG_META: Record<LangCode, LangInfo> = {
  en: { code: 'EN', name: 'English' },
  de: { code: 'DE', name: 'Deutsch' },
  fr: { code: 'FR', name: 'Français' },
  es: { code: 'ES', name: 'Español' },
  pt: { code: 'PT', name: 'Português' },
  it: { code: 'IT', name: 'Italiano' },
  ru: { code: 'RU', name: 'Русский' },
  zh: { code: 'ZH', name: '中文' },
  ja: { code: 'JA', name: '日本語' },
  ko: { code: 'KO', name: '한국어' },
};

export function initLangSelector(
  languages: readonly LangCode[],
  onLangChange: (lang: LangCode) => void
): void {
  const trigger  = document.getElementById('lang-trigger') as HTMLButtonElement | null;
  const dropdown = document.getElementById('lang-dropdown') as HTMLUListElement | null;
  const codeEl   = document.getElementById('lang-code')    as HTMLSpanElement  | null;

  if (!trigger || !dropdown || !codeEl) {
    console.error('lang-selector: required elements not found in DOM');
    return;
  }

  for (const lang of languages) {
    const li = document.createElement('li');
    li.className = 'lang-option';
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', lang === 'en' ? 'true' : 'false');
    li.dataset.lang = lang;
    li.textContent = LANG_META[lang].name;
    dropdown.appendChild(li);
  }

  function open(): void {
    trigger!.setAttribute('aria-expanded', 'true');
    dropdown!.classList.add('open');
  }

  function close(): void {
    trigger!.setAttribute('aria-expanded', 'false');
    dropdown!.classList.remove('open');
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    trigger.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  document.addEventListener('click', close);

  dropdown.addEventListener('click', (e) => {
    const item = (e.target as Element).closest<HTMLLIElement>('.lang-option');
    if (!item) return;
    e.stopPropagation();

    const lang = item.dataset.lang as LangCode;
    codeEl.textContent = LANG_META[lang].code;

    dropdown.querySelectorAll<HTMLLIElement>('.lang-option').forEach(el =>
      el.setAttribute('aria-selected', String(el === item))
    );

    close();
    onLangChange(lang);
  });
}
