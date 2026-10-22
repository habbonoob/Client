import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectMouseHandler } from '@/com/sulake/room/object/logic/IRoomObjectMouseHandler';
import type { IRoomObjectVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectVisualization';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';

export interface IRoomObject {
    getId(): number;
    getInstanceId(): number;
    getType(): string;
    isInitialized(): boolean;
    getLocation(): IVector3d;
    getDirection(): IVector3d;
    getModel(): IRoomObjectModel;
    getVisualization(): IRoomObjectVisualization;
    getMouseHandler(): IRoomObjectMouseHandler;
    getAvatarLibraryAssetName(): string;
    getState(param1: number): number;
    getUpdateID(): number;
    tearDown(): void;
}

export const IRoomObject = Symbol('com.sulake.room.object::IRoomObject');
registerClassName(IRoomObject, 'com.sulake.room.object::IRoomObject');

export function isIRoomObject(value: unknown): value is IRoomObject {
    return (value as { [IRoomObject]?: true } | null | undefined)?.[IRoomObject] === true;
}
