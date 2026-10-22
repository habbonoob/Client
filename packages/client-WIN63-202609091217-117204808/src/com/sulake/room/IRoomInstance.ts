import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomRendererBase } from '@/com/sulake/room/renderer/IRoomRendererBase';

export interface IRoomInstance {
    hasValueForName(param1: string): boolean;
    getNumber(param1: string): number;
    setNumber(param1: string, param2: number, param3?: boolean): void;
    getString(param1: string): string;
    setString(param1: string, param2: string, param3?: boolean): void;
    dispose(): void;
    update(): void;
    createRoomObject(param1: number, param2: string, param3: number): IRoomObject;
    getObject(param1: number, param2: number): IRoomObject;
    getObjects(param1: number): any[];
    disposeObject(param1: number, param2: number): boolean;
    getObjectCount(param1: number): number;
    getObjectWithIndexAndType(param1: number, param2: string, param3: number): IRoomObject;
    getObjectCountForType(param1: string, param2: number): number;
    getObjectWithIndex(param1: number, param2: number): IRoomObject;
    disposeObjects(param1: number): number;
    setRenderer(param1: IRoomRendererBase): void;
    getRenderer(): IRoomRendererBase;
}

export const IRoomInstance = Symbol('com.sulake.room::IRoomInstance');
registerClassName(IRoomInstance, 'com.sulake.room::IRoomInstance');

export function isIRoomInstance(value: unknown): value is IRoomInstance {
    return (value as { [IRoomInstance]?: true } | null | undefined)?.[IRoomInstance] === true;
}
