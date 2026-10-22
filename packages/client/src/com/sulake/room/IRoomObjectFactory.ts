import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IRoomObjectManager } from '@/com/sulake/room/IRoomObjectManager';
import type { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IRoomObjectFactory extends IUnknown {
    get events(): IEventDispatcher;
    addObjectEventListener(param1: (...args: any[]) => any): void;
    removeObjectEventListener(param1: (...args: any[]) => any): void;
    createRoomObjectLogic(param1: string): IRoomObjectEventHandler;
    createRoomObjectManager(): IRoomObjectManager;
}
