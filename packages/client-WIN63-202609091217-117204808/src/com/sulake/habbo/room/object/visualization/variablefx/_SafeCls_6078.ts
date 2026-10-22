import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface _SafeCls_6078 {
    dispose(): void;
}

export const _SafeCls_6078 = Symbol('com.sulake.habbo.room.object.visualization.variablefx::_SafeCls_6078');
registerClassName(_SafeCls_6078, 'com.sulake.habbo.room.object.visualization.variablefx::_SafeCls_6078');

export function is_SafeCls_6078(value: unknown): value is _SafeCls_6078 {
    return (value as { [_SafeCls_6078]?: true } | null | undefined)?.[_SafeCls_6078] === true;
}
