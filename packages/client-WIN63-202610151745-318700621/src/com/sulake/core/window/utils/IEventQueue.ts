import type { Event } from '@habbo-pixi/runtime/events/Event';

export interface IEventQueue {
    get length(): number;
    begin(): void;
    next(): Event;
    remove(): void;
    end(): void;
    flush(): void;
}
