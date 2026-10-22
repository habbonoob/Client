import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface ISearchView {
    refreshList(): void;
    setSearchStr(param1: string): void;
    focus(): void;
}

export const ISearchView = Symbol('com.sulake.habbo.friendlist::ISearchView');
registerClassName(ISearchView, 'com.sulake.habbo.friendlist::ISearchView');

export function isISearchView(value: unknown): value is ISearchView {
    return (value as { [ISearchView]?: true } | null | undefined)?.[ISearchView] === true;
}
