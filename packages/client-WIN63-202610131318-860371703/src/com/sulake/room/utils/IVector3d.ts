import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IVector3d {
    get x(): number;
    get y(): number;
    get z(): number;
    get length(): number;
}

export const IVector3d = Symbol('com.sulake.room.utils::IVector3d');
registerClassName(IVector3d, 'com.sulake.room.utils::IVector3d');

export function isIVector3d(value: unknown): value is IVector3d {
    return (value as { [IVector3d]?: true } | null | undefined)?.[IVector3d] === true;
}
