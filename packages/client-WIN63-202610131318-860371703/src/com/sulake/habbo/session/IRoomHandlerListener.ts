import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IRoomHandlerListener {
    sessionUpdate(param1: number, param2: string): void;
    sessionReinitialize(param1: number, param2: number): void;
    getSession(param1: number): IRoomSession;
    get events(): IEventDispatcher;
}
