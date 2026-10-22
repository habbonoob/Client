import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISpriteDataContainer } from '@/com/sulake/habbo/avatar/animation/ISpriteDataContainer';

export interface IAnimation {
    get id(): string;
    get spriteData(): ISpriteDataContainer[];
    get removeData(): any[];
    get addData(): any[];
    get resetOnToggle(): boolean;
    hasAvatarData(): boolean;
    hasDirectionData(): boolean;
    hasAddData(): boolean;
}

export const IAnimation = Symbol('com.sulake.habbo.avatar.animation::IAnimation');
registerClassName(IAnimation, 'com.sulake.habbo.avatar.animation::IAnimation');

export function isIAnimation(value: unknown): value is IAnimation {
    return (value as { [IAnimation]?: true } | null | undefined)?.[IAnimation] === true;
}
