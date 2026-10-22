import { Event, eventState } from './Event';
import { EventPhase } from './EventPhase';
import { IEventDispatcher } from './IEventDispatcher';

type Listener = (event: any) => void;
interface Registration { listener: Listener; priority: number }

/**
 * For display objects: the ancestors an event travels through, nearest first. DisplayObject
 * implements this so dispatched events capture down from and bubble up to the stage.
 */
export const EVENT_ANCESTORS = Symbol('events.EventDispatcher.ancestors');

/**
 * Listeners run in priority order (higher first), then in the order
 * they were added; adding the same listener twice for the same type and phase is a no-op. The
 * listener list is snapshotted when an event reaches a node, so listeners removed during dispatch
 * still run for that event and listeners added during it don't. An error thrown by a listener
 * propagates out of dispatchEvent. Weak references are not supported: `useWeakReference` listeners
 * are held strongly.
 */
export class EventDispatcher implements IEventDispatcher {
    #target: object;
    #bubble = new Map<string, Registration[]>();
    #capture = new Map<string, Registration[]>();

    /** @param target the object reported as `event.target` (for dispatchers used by composition) */
    constructor(target: IEventDispatcher = null) {
        this.#target = target ?? this;
    }

    get [IEventDispatcher](): true {
        return true;
    }

    addEventListener(type: string, listener: Listener, useCapture: boolean = false, priority: number = 0, useWeakReference: boolean = false): void {
        void useWeakReference;
        const table = useCapture ? this.#capture : this.#bubble;
        let list = table.get(type);
        if (!list) table.set(type, list = []);
        if (list.some(r => r.listener === listener)) return;
        // after every registration with an equal or higher priority
        let at = list.length;
        while (at > 0 && list[at - 1].priority < priority) at--;
        list.splice(at, 0, { listener, priority });
    }

    removeEventListener(type: string, listener: Listener, useCapture: boolean = false): void {
        const table = useCapture ? this.#capture : this.#bubble;
        const list = table.get(type);
        if (!list) return;
        const i = list.findIndex(r => r.listener === listener);
        if (i < 0) return;
        list.splice(i, 1);
        if (!list.length) table.delete(type);
    }

    hasEventListener(type: string): boolean {
        return this.#bubble.has(type) || this.#capture.has(type);
    }

    /** Would dispatching `type` here reach a listener, on this object or an ancestor? */
    willTrigger(type: string): boolean {
        if (this.hasEventListener(type)) return true;
        return this[EVENT_ANCESTORS]().some(a => a.hasEventListener(type));
    }

    /** False when a listener called preventDefault() on the (cancelable) event. */
    dispatchEvent(event: Event): boolean {
        // an event that was dispatched before is re-dispatched as a copy
        if (event.target != null) event = event.clone();
        eventState.begin(event, this.#target);
        const ancestors = this[EVENT_ANCESTORS]();
        try {
            for (let i = ancestors.length - 1; i >= 0; i--) {
                ancestors[i].#invoke(event, true, EventPhase.CAPTURING_PHASE);
                if (eventState.stopLevel(event)) return !event.isDefaultPrevented();
            }
            this.#invoke(event, false, EventPhase.AT_TARGET);
            if (eventState.stopLevel(event) || !event.bubbles) return !event.isDefaultPrevented();
            for (const a of ancestors) {
                a.#invoke(event, false, EventPhase.BUBBLING_PHASE);
                if (eventState.stopLevel(event)) break;
            }
            return !event.isDefaultPrevented();
        } finally {
            eventState.end(event);
        }
    }

    [EVENT_ANCESTORS](): EventDispatcher[] {
        return [];
    }

    #invoke(event: Event, capture: boolean, phase: number): void {
        const list = (capture ? this.#capture : this.#bubble).get(event.type);
        if (!list) return;
        eventState.at(event, this.#target, phase);
        for (const r of [...list]) {
            r.listener(event);
            if (eventState.stopLevel(event) === 2) return;
        }
    }

    toString(): string {
        return `[object ${this.constructor.name}]`;
    }
}
