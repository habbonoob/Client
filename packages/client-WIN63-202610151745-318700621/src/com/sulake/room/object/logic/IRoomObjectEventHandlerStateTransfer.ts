import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';

export interface IRoomObjectEventHandlerStateTransfer {
    transferStateFrom(param1: IRoomObjectEventHandler): void;
}

export const IRoomObjectEventHandlerStateTransfer = Symbol('com.sulake.room.object.logic::IRoomObjectEventHandlerStateTransfer');
registerClassName(IRoomObjectEventHandlerStateTransfer, 'com.sulake.room.object.logic::IRoomObjectEventHandlerStateTransfer');

export function isIRoomObjectEventHandlerStateTransfer(value: unknown): value is IRoomObjectEventHandlerStateTransfer {
    return (value as { [IRoomObjectEventHandlerStateTransfer]?: true } | null | undefined)?.[IRoomObjectEventHandlerStateTransfer] === true;
}
