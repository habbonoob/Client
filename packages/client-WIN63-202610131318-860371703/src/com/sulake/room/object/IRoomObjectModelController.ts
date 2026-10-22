import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';

export interface IRoomObjectModelController extends IRoomObjectModel {
    setNumber(param1: string, param2: number, param3?: boolean): void;
    setString(param1: string, param2: string, param3?: boolean): void;
    setObject(param1: string, param2: any, param3?: boolean): void;
    setNumberArray(param1: string, param2: any[], param3?: boolean): void;
    setStringArray(param1: string, param2: any[], param3?: boolean): void;
    setStringToStringMap(param1: string, param2: UtilsMap, param3?: boolean): void;
}

export const IRoomObjectModelController = Symbol('com.sulake.room.object::IRoomObjectModelController');
registerClassName(IRoomObjectModelController, 'com.sulake.room.object::IRoomObjectModelController');

export function isIRoomObjectModelController(value: unknown): value is IRoomObjectModelController {
    return (value as { [IRoomObjectModelController]?: true } | null | undefined)?.[IRoomObjectModelController] === true;
}
