import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboMessenger extends IUnknown {
    get events(): IEventDispatcher;
    set followingToGroupRoom(param1: boolean);
    isOpen(): boolean;
    toggleMessenger(): void;
    startConversation(param1: number): void;
    closeConversation(param1: number): void;
    setFollowingAllowed(param1: number, param2: boolean): void;
    setOnlineStatus(param1: number, param2: boolean): void;
    getUnseenMiniMailMessageCount(): number;
    getRoomInvitesIgnored(): boolean;
    setRoomInvitesIgnored(param1: boolean): void;
}
