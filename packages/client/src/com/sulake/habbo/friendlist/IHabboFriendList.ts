import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IFriend } from '@/com/sulake/habbo/friendlist/IFriend';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface IHabboFriendList extends IUnknown {
    get events(): IEventDispatcher;
    get mainWindow(): IWindowContainer;
    get hasfriendsListInitialized(): boolean;
    canBeAskedForAFriend(param1: number): boolean;
    askForAFriend(param1: number, param2: string): boolean;
    getFriend(param1: number): IFriend;
    openFriendList(): void;
    openFriendRequests(): void;
    openFriendSearch(): void;
    close(): void;
    alignBottomLeftTo(param1: Point): void;
    isOpen(): boolean;
    currentTabId(): number;
    getFriendCount(param1: boolean, param2: boolean): number;
    openHabboWebPage(param1: string, param2: Map<any, any>, param3: number, param4: number): void;
    getFriendNames(): any[];
    acceptFriendRequest(param1: number): void;
    acceptAllFriendRequests(): void;
    declineFriendRequest(param1: number): void;
    declineAllFriendRequests(): void;
    getRelationshipStatus(param1: number): number;
    setRelationshipStatus(param1: number, param2: number): void;
}

export const IHabboFriendList = Symbol('com.sulake.habbo.friendlist::IHabboFriendList');
registerClassName(IHabboFriendList, 'com.sulake.habbo.friendlist::IHabboFriendList');

export function isIHabboFriendList(value: unknown): value is IHabboFriendList {
    return (value as { [IHabboFriendList]?: true } | null | undefined)?.[IHabboFriendList] === true;
}
