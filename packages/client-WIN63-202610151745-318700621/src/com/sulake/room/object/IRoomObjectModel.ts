import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export interface IRoomObjectModel {
    hasNumber(param1: string): boolean;
    hasNumberArray(param1: string): boolean;
    hasString(param1: string): boolean;
    hasStringArray(param1: string): boolean;
    hasObject(param1: string): boolean;
    getNumber(param1: string): number;
    getString(param1: string): string;
    getNumberArray(param1: string): any[];
    getStringArray(param1: string): any[];
    getObject(param1: string): any;
    getUpdateID(): number;
    getStringToStringMap(param1: string): UtilsMap;
}

export const IRoomObjectModel = Symbol('com.sulake.room.object::IRoomObjectModel');
registerClassName(IRoomObjectModel, 'com.sulake.room.object::IRoomObjectModel');

export function isIRoomObjectModel(value: unknown): value is IRoomObjectModel {
    return (value as { [IRoomObjectModel]?: true } | null | undefined)?.[IRoomObjectModel] === true;
}
