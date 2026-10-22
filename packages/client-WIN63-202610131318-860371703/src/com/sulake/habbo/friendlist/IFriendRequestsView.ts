import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { FriendRequest } from '@/com/sulake/habbo/friendlist/domain/FriendRequest';

export interface IFriendRequestsView {
    refreshShading(param1: FriendRequest, param2: boolean): void;
    refreshRequestEntry(param1: FriendRequest): void;
    addRequest(param1: FriendRequest): void;
    removeRequest(param1: FriendRequest): void;
    acceptRequest(param1: number): void;
    acceptAllRequests(): void;
    declineRequest(param1: number): void;
    declineAllRequests(): void;
}

export const IFriendRequestsView = Symbol('com.sulake.habbo.friendlist::IFriendRequestsView');
registerClassName(IFriendRequestsView, 'com.sulake.habbo.friendlist::IFriendRequestsView');

export function isIFriendRequestsView(value: unknown): value is IFriendRequestsView {
    return (value as { [IFriendRequestsView]?: true } | null | undefined)?.[IFriendRequestsView] === true;
}
