import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface ITab extends IDisposable {
    get window(): IWindowContainer;
    get selected(): boolean;
    get recycled(): boolean;
    select(param1: boolean): void;
    deselect(param1: boolean): void;
    recycle(): void;
}

export const ITab = Symbol('com.sulake.habbo.friendbar.view.tabs::ITab');
registerClassName(ITab, 'com.sulake.habbo.friendbar.view.tabs::ITab');

export function isITab(value: unknown): value is ITab {
    return (value as { [ITab]?: true } | null | undefined)?.[ITab] === true;
}
