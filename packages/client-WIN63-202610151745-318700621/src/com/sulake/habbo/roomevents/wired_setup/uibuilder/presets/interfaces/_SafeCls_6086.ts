import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface _SafeCls_6086 {
    get validationError(): string;
    get validationActive(): boolean;
    hideDetachedWindows(): void;
}

export const _SafeCls_6086 = Symbol('com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.interfaces::_SafeCls_6086');
registerClassName(_SafeCls_6086, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.interfaces::_SafeCls_6086');

export function is_SafeCls_6086(value: unknown): value is _SafeCls_6086 {
    return (value as { [_SafeCls_6086]?: true } | null | undefined)?.[_SafeCls_6086] === true;
}
