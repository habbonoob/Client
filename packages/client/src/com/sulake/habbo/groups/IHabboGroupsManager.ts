import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboGroupsManager extends IUnknown {
    get events(): IEventDispatcher;
    showGroupBadgeInfo(param1: boolean, param2: number): void;
    openGroupInfo(param1: number): void;
    updateVisibleExtendedProfile(param1: number): void;
    showExtendedProfile(param1: number): void;
}

export const IHabboGroupsManager = Symbol('com.sulake.habbo.groups::IHabboGroupsManager');
registerClassName(IHabboGroupsManager, 'com.sulake.habbo.groups::IHabboGroupsManager');

export function isIHabboGroupsManager(value: unknown): value is IHabboGroupsManager {
    return (value as { [IHabboGroupsManager]?: true } | null | undefined)?.[IHabboGroupsManager] === true;
}
