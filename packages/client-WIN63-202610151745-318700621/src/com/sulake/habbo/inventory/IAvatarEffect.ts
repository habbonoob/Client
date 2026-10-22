import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IAvatarEffect {
    get type(): number;
    get subType(): number;
    get secondsLeft(): number;
    get duration(): number;
    get isActive(): boolean;
    get isSelected(): boolean;
}

export const IAvatarEffect = Symbol('com.sulake.habbo.inventory::IAvatarEffect');
registerClassName(IAvatarEffect, 'com.sulake.habbo.inventory::IAvatarEffect');

export function isIAvatarEffect(value: unknown): value is IAvatarEffect {
    return (value as { [IAvatarEffect]?: true } | null | undefined)?.[IAvatarEffect] === true;
}
