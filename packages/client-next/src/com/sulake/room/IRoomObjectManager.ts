import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';

export interface IRoomObjectManager {
    dispose(): void;
    createObject(param1: number, param2: number, param3: string): IRoomObjectController;
    getObject(param1: number): IRoomObjectController;
    getObjects(): any[];
    disposeObject(param1: number): boolean;
    getObjectCount(): number;
    getObjectWithIndex(param1: number): IRoomObjectController;
    getObjectCountForType(param1: string): number;
    getObjectWithIndexAndType(param1: number, param2: string): IRoomObjectController;
    reset(): void;
}

export const IRoomObjectManager = Symbol('com.sulake.room::IRoomObjectManager');
registerClassName(IRoomObjectManager, 'com.sulake.room::IRoomObjectManager');

export function isIRoomObjectManager(value: unknown): value is IRoomObjectManager {
    return (value as { [IRoomObjectManager]?: true } | null | undefined)?.[IRoomObjectManager] === true;
}
