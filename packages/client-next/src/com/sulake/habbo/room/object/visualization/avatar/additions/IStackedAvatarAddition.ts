import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStackedAddition } from '@/com/sulake/habbo/room/object/visualization/stacked/IStackedAddition';

export interface IStackedAvatarAddition extends IStackedAddition {
}

export const IStackedAvatarAddition = Symbol('com.sulake.habbo.room.object.visualization.avatar.additions::IStackedAvatarAddition');
registerClassName(IStackedAvatarAddition, 'com.sulake.habbo.room.object.visualization.avatar.additions::IStackedAvatarAddition');

export function isIStackedAvatarAddition(value: unknown): value is IStackedAvatarAddition {
    return (value as { [IStackedAvatarAddition]?: true } | null | undefined)?.[IStackedAvatarAddition] === true;
}
