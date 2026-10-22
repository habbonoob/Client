import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';

export interface _SafeCls_6086 {
    getHeaderSourceTypeSelectorParam(param1: Triggerable): SourceTypeSelectorParam;
    get headerSourceType(): number;
}

export const _SafeCls_6086 = Symbol('com.sulake.habbo.roomevents.wired_setup::_SafeCls_6086');
registerClassName(_SafeCls_6086, 'com.sulake.habbo.roomevents.wired_setup::_SafeCls_6086');

export function is_SafeCls_6086(value: unknown): value is _SafeCls_6086 {
    return (value as { [_SafeCls_6086]?: true } | null | undefined)?.[_SafeCls_6086] === true;
}
