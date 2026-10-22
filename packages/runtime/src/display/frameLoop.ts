// Per-frame events. Every display object with an enterFrame/exitFrame/frameConstructed/render
// listener receives them each frame, whether or not it is on the display list. An error thrown by
// one listener is reported as uncaught and does not stop the others.

import { Event } from '@habbo-pixi/runtime/events/Event';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';
import type { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';

const listeners = new Map<string, Set<EventDispatcher>>();

export const frameBroadcast = {
    add(type: string, target: EventDispatcher): void {
        let set = listeners.get(type);
        if (!set) listeners.set(type, set = new Set());
        set.add(target);
    },

    remove(type: string, target: EventDispatcher): void {
        listeners.get(type)?.delete(target);
    },

    /** Dispatch `type` to every registered object (those added during the dispatch wait for the next one). */
    dispatch(type: string): void {
        const set = listeners.get(type);
        if (!set?.size) return;
        for (const target of [...set]) runGuarded(() => { target.dispatchEvent(new Event(type)); });
    },
};
