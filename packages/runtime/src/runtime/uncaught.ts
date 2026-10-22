// Errors escaping from code the runtime calls on its own (timers, frame events, input, network
// callbacks) go to the application's uncaught-error dispatcher as an UncaughtErrorEvent, where the
// client's crash handling listens. If no listener cancels it, the error is reported to the console.

import { UncaughtErrorEvent } from '@habbo-pixi/runtime/events/UncaughtErrorEvent';
import type { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';

let target: EventDispatcher | null = null;

/** Set by the root LoaderInfo when the application starts. */
export function setUncaughtErrorTarget(dispatcher: EventDispatcher): void {
    target = dispatcher;
}

export function reportUncaught(error: unknown): void {
    const event = new UncaughtErrorEvent(UncaughtErrorEvent.UNCAUGHT_ERROR, true, true, error);
    const handled = target ? !target.dispatchEvent(event) : false;
    if (!handled) console.error(error);
}

/** Run a runtime-initiated callback, sending anything it throws to reportUncaught. */
export function runGuarded(fn: () => void): void {
    try {
        fn();
    } catch (e) {
        reportUncaught(e);
    }
}
