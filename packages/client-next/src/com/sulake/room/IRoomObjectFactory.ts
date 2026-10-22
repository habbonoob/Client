import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IRoomObjectManager } from '@/com/sulake/room/IRoomObjectManager';
import type { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IRoomObjectFactory extends IUnknown {
    addObjectEventListener(param1: (...args: any[]) => any): void;
    removeObjectEventListener(param1: (...args: any[]) => any): void;
    createRoomObjectLogic(param1: string, param2?: string): IRoomObjectEventHandler;
    disposeRoomLogicData(param1: string): void;
    updateVariableFxConfigs(param1: string, param2: any[]): void;
    removeVariableFxConfigs(param1: string, param2: any[]): void;
    createRoomObjectManager(): IRoomObjectManager;
    get events(): IEventDispatcher;
}
