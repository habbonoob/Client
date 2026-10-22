import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';

/**
 * The window the application runs in: here, the browser tab. The title is the document title;
 * the display state reflects whether the tab is visible (a hidden tab counts as minimized).
 */
export class NativeWindow extends EventDispatcher {
    get title(): string {
        return document.title;
    }

    set title(value: string) {
        document.title = value;
    }

    /** 'normal', or 'minimized' while the tab is hidden. */
    get displayState(): string {
        return document.visibilityState === 'hidden' ? 'minimized' : 'normal';
    }

    /** Bring the window to the front (focus the browser tab where the browser allows it). */
    activate(): void {
        window.focus();
    }
}
