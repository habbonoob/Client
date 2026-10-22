import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export interface IHabboAvatarEditorAvatarEffect {
    get amountInInventory(): number;
    get type(): number;
    get subType(): number;
    get secondsLeft(): number;
    get duration(): number;
    get isPermanent(): boolean;
    get isActive(): boolean;
    get isInUse(): boolean;
    get icon(): BitmapData;
    set iconImage(param1: BitmapData);
    get iconImage(): BitmapData;
    set isSelected(param1: boolean);
    get isSelected(): boolean;
}

export const IHabboAvatarEditorAvatarEffect = Symbol('com.sulake.habbo.avatar::IHabboAvatarEditorAvatarEffect');
registerClassName(IHabboAvatarEditorAvatarEffect, 'com.sulake.habbo.avatar::IHabboAvatarEditorAvatarEffect');

export function isIHabboAvatarEditorAvatarEffect(value: unknown): value is IHabboAvatarEditorAvatarEffect {
    return (value as { [IHabboAvatarEditorAvatarEffect]?: true } | null | undefined)?.[IHabboAvatarEditorAvatarEffect] === true;
}
