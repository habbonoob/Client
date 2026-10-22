import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IFriendEntity } from '@/com/sulake/habbo/friendbar/data/IFriendEntity';
import type { IFriendRequest } from '@/com/sulake/habbo/friendbar/data/IFriendRequest';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboFriendBarData extends IUnknown {
    get events(): IEventDispatcher;
    get numFriends(): number;
    get numFriendRequests(): number;
    getFriendAt(param1: number): IFriendEntity;
    getFriendByID(param1: number): IFriendEntity;
    getFriendByName(param1: string): IFriendEntity;
    getFriendRequestAt(param1: number): IFriendRequest;
    getFriendRequestByID(param1: number): IFriendRequest;
    getFriendRequestByName(param1: string): IFriendRequest;
    getFriendRequestList(): any[];
    acceptFriendRequest(param1: number): void;
    acceptAllFriendRequests(): void;
    declineFriendRequest(param1: number): void;
    declineAllFriendRequests(): void;
    followToRoom(param1: number): void;
    startConversation(param1: number): void;
    findNewFriends(): void;
    openUserTextSearch(): void;
    sendGameTabTracking(param1: string): void;
    sendGameButtonTracking(param1: string): void;
    toggleFriendList(): void;
    toggleMessenger(): void;
    showProfile(param1: number): void;
    showProfileByName(param1: string): void;
}
