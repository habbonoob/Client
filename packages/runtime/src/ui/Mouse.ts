/**
 * The mouse cursor: `cursor` is 'auto' (follow what the pointer is over), 'arrow', 'button'
 * (a hand), 'hand' (a grabbing hand) or 'ibeam'; hide() hides it over the stage.
 */
export class Mouse {
    static #cursor = 'auto';
    static #hidden = false;
    static readonly supportsCursor = true;
    static readonly supportsNativeCursor = true;

    static get cursor(): string {
        return Mouse.#cursor;
    }

    static set cursor(value: string) {
        Mouse.#cursor = value;
        Mouse.#apply();
    }

    static hide(): void {
        Mouse.#hidden = true;
        Mouse.#apply();
    }

    static show(): void {
        Mouse.#hidden = false;
        Mouse.#apply();
    }

    /** The stage installs how an override is applied (see Stage.setCursorOverride). */
    static apply: (cursor: string | null) => void = () => {};

    static #apply(): void {
        if (Mouse.#hidden) { Mouse.apply('none'); return; }
        const css: Record<string, string | null> = { auto: null, arrow: 'default', button: 'pointer', hand: 'grab', ibeam: 'text' };
        Mouse.apply(css[Mouse.#cursor] ?? null);
    }
}
