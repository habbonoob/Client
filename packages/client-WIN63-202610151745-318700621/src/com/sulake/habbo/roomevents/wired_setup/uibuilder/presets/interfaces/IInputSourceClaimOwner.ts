import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { InputSourceControlPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/inputsources/InputSourceControlPreset';

export interface IInputSourceClaimOwner {
    get claimedBaseSourceType(): number;
    get claimedSourceId(): number;
    attachInputSourceControl(param1: string, param2: InputSourceControlPreset): void;
    syncClaimedSourceType(param1: number): void;
    refreshClaimedSourceVisibility(): void;
}

export const IInputSourceClaimOwner = Symbol('com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.interfaces::IInputSourceClaimOwner');
registerClassName(IInputSourceClaimOwner, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.interfaces::IInputSourceClaimOwner');

export function isIInputSourceClaimOwner(value: unknown): value is IInputSourceClaimOwner {
    return (value as { [IInputSourceClaimOwner]?: true } | null | undefined)?.[IInputSourceClaimOwner] === true;
}
