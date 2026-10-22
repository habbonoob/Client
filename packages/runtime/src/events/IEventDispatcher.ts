import type { Event } from './Event';

/** IEventDispatcher */
export interface IEventDispatcher {
    addEventListener(type: string, listener: (event: any) => void, useCapture?: boolean, priority?: number, useWeakReference?: boolean): void;
    removeEventListener(type: string, listener: (event: any) => void, useCapture?: boolean): void;
    dispatchEvent(event: Event): boolean;
    hasEventListener(type: string): boolean;
    willTrigger(type: string): boolean;
}

/** Runtime brand: classes implementing IEventDispatcher carry it, so code can test for the interface. */
export const IEventDispatcher = Symbol('events.IEventDispatcher');

export function isIEventDispatcher(value: unknown): value is IEventDispatcher {
    return (value as { [IEventDispatcher]?: true } | null | undefined)?.[IEventDispatcher] === true;
}
