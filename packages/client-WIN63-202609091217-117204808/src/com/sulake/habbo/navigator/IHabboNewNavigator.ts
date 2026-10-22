import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';

export interface IHabboNewNavigator extends IUnknown {
    open(): void;
    performSearch(param1: string, param2?: string, param3?: string): void;
    performTagSearch(param1: string): void;
    goToRoom(param1: number, param2?: string): void;
    get isReady(): boolean;
    get legacyNavigator(): IHabboNavigator;
    get habboHelp(): IHabboHelp;
}

export const IHabboNewNavigator = Symbol('com.sulake.habbo.navigator::IHabboNewNavigator');
registerClassName(IHabboNewNavigator, 'com.sulake.habbo.navigator::IHabboNewNavigator');

export function isIHabboNewNavigator(value: unknown): value is IHabboNewNavigator {
    return (value as { [IHabboNewNavigator]?: true } | null | undefined)?.[IHabboNewNavigator] === true;
}
