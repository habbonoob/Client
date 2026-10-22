import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import type { IRoomObjectMouseHandler } from '@/com/sulake/room/object/logic/IRoomObjectMouseHandler';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IRoomObjectEventHandler extends IRoomObjectMouseHandler {
    set object(param1: IRoomObjectController);
    get object(): IRoomObjectController;
    dispose(): void;
    initialize(param1: XML): void;
    tearDown(): void;
    update(param1: number): void;
    processUpdateMessage(param1: RoomObjectUpdateMessage): void;
    useObject(): void;
    set eventDispatcher(param1: IEventDispatcher);
    get eventDispatcher(): IEventDispatcher;
    getEventTypes(): any[];
    get widget(): string;
    get contextMenu(): string;
}

export const IRoomObjectEventHandler = Symbol('com.sulake.room.object.logic::IRoomObjectEventHandler');
registerClassName(IRoomObjectEventHandler, 'com.sulake.room.object.logic::IRoomObjectEventHandler');

export function isIRoomObjectEventHandler(value: unknown): value is IRoomObjectEventHandler {
    return (value as { [IRoomObjectEventHandler]?: true } | null | undefined)?.[IRoomObjectEventHandler] === true;
}
