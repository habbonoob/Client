import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ITab } from '@/com/sulake/habbo/friendbar/view/tabs/ITab';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboFriendBarView extends IUnknown {
    get events(): IEventDispatcher;
    set visible(param1: boolean);
    get visible(): boolean;
    selectTab(param1: ITab, param2: boolean): void;
    deSelect(param1: boolean): void;
    getAvatarFaceBitmap(param1: string): BitmapData;
    getGroupIconBitmap(param1: string): BitmapData;
    setMessengerIconNotify(param1: boolean): void;
    setFriendListIconNotify(param1: boolean): void;
    removeMessengerNotifications(): void;
    get friendBarWidth(): number;
    getIconLocation(param1: string): IWindowContainer;
}

export const IHabboFriendBarView = Symbol('com.sulake.habbo.friendbar.view::IHabboFriendBarView');
registerClassName(IHabboFriendBarView, 'com.sulake.habbo.friendbar.view::IHabboFriendBarView');

export function isIHabboFriendBarView(value: unknown): value is IHabboFriendBarView {
    return (value as { [IHabboFriendBarView]?: true } | null | undefined)?.[IHabboFriendBarView] === true;
}
