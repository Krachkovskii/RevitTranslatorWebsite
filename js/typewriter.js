/**
 * Typewriter module — animates text character by character on a target element.
 *
 * Sequence per phrase:
 *   1. Type characters one by one
 *   2. Pause (showDuration)
 *   3. Delete characters one by one
 *   4. Advance to next phrase
 */

const DEFAULTS = {
  typeSpeed: 60,      // ms per character while typing
  deleteSpeed: 35,    // ms per character while deleting
  showDuration: 2200, // ms to display the completed phrase
  pauseBefore: 300,   // ms pause before typing starts (after previous phrase deleted)
};

/**
 * Waits for a given number of milliseconds.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Starts an infinite typewriter loop on the given element.
 *
 * @param {HTMLElement} el       - Target element whose textContent is animated
 * @param {string[]}    phrases  - Ordered list of phrases to cycle through
 * @param {object}      [opts]   - Optional overrides for timing constants
 */
export async function startTypewriter(el, phrases, opts = {}) {
  const cfg = { ...DEFAULTS, ...opts };
  let index = 0;

  while (true) {
    const phrase = phrases[index % phrases.length];

    await wait(cfg.pauseBefore);

    // Type
    for (let i = 1; i <= phrase.length; i++) {
      el.textContent = phrase.slice(0, i);
      await wait(cfg.typeSpeed);
    }

    await wait(cfg.showDuration);

    // Delete
    for (let i = phrase.length - 1; i >= 0; i--) {
      el.textContent = phrase.slice(0, i);
      await wait(cfg.deleteSpeed);
    }

    index++;
  }
}
