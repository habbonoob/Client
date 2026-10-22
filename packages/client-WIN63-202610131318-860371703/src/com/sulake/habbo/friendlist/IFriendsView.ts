import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IFriendsView {
    refreshList(): void;
    setNewMessageArrived(): void;
    refreshed(): void;
}

export const IFriendsView = Symbol('com.sulake.habbo.friendlist::IFriendsView');
registerClassName(IFriendsView, 'com.sulake.habbo.friendlist::IFriendsView');

export function isIFriendsView(value: unknown): value is IFriendsView {
    return (value as { [IFriendsView]?: true } | null | undefined)?.[IFriendsView] === true;
}
