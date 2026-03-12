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
    typeSpeed: 60,
    deleteSpeed: 35,
    showDuration: 2200,
    pauseBefore: 300,
};
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function startTypewriter(el, phrases, opts = {}) {
    const cfg = { ...DEFAULTS, ...opts };
    let index = 0;
    while (true) {
        const phrase = phrases[index % phrases.length];
        await wait(cfg.pauseBefore);
        for (let i = 1; i <= phrase.length; i++) {
            el.textContent = phrase.slice(0, i);
            await wait(cfg.typeSpeed);
        }
        await wait(cfg.showDuration);
        for (let i = phrase.length - 1; i >= 0; i--) {
            el.textContent = phrase.slice(0, i);
            await wait(cfg.deleteSpeed);
        }
        index++;
    }
}
//# sourceMappingURL=typewriter.js.map