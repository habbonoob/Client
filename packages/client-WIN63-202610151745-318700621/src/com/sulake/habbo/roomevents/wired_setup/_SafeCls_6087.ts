import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';

export interface _SafeCls_6087 {
    getHeaderSourceTypeSelectorParam(param1: Triggerable): SourceTypeSelectorParam;
    get headerSourceType(): number;
}

export const _SafeCls_6087 = Symbol('com.sulake.habbo.roomevents.wired_setup::_SafeCls_6087');
registerClassName(_SafeCls_6087, 'com.sulake.habbo.roomevents.wired_setup::_SafeCls_6087');

export function is_SafeCls_6087(value: unknown): value is _SafeCls_6087 {
    return (value as { [_SafeCls_6087]?: true } | null | undefined)?.[_SafeCls_6087] === true;
}
