import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import type { IRoomObjectVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectVisualization';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';

export interface IRoomObjectController extends IRoomObject {
    dispose(): void;
    setInitialized(param1: boolean): void;
    setLocation(param1: IVector3d): void;
    setDirection(param1: IVector3d): void;
    setVisualization(param1: IRoomObjectVisualization): void;
    setState(param1: number, param2: number): boolean;
    setEventHandler(param1: IRoomObjectEventHandler): void;
    getEventHandler(): IRoomObjectEventHandler;
    getModelController(): IRoomObjectModelController;
}

export const IRoomObjectController = Symbol('com.sulake.room.object::IRoomObjectController');
registerClassName(IRoomObjectController, 'com.sulake.room.object::IRoomObjectController');

export function isIRoomObjectController(value: unknown): value is IRoomObjectController {
    return (value as { [IRoomObjectController]?: true } | null | undefined)?.[IRoomObjectController] === true;
}
