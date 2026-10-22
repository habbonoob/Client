import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { FriendRequestEvent } from '@/com/sulake/habbo/friendlist/events/FriendRequestEvent';
import { RoomSessionFriendRequestEvent } from '@/com/sulake/habbo/session/events/RoomSessionFriendRequestEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetFriendRequestUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetFriendRequestUpdateEvent';
import { RoomWidgetFriendRequestMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFriendRequestMessage';

export class FriendRequestWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FriendRequestWidgetHandler'); }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_ROOM_POLL";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RWFRM_ACCEPT");
        _loc1_.push("RWFRM_DECLINE");
        return _loc1_;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc2_: RoomWidgetFriendRequestMessage = null;
        let _loc3_: RoomWidgetFriendRequestMessage = null;
        if (!param1 || !this._container) {
            return null;
        }
        switch (param1.type) {
            case "RWFRM_ACCEPT":
                _loc2_ = param1 instanceof RoomWidgetFriendRequestMessage ? param1 : null;
                if (!_loc2_ || !this._container.friendList) {
                    return null;
                }
                this._container.friendList.acceptFriendRequest(_loc2_.requestId);
                break;
            case "RWFRM_DECLINE":
                _loc3_ = param1 instanceof RoomWidgetFriendRequestMessage ? param1 : null;
                if (!_loc3_ || !this._container.friendList) {
                    return null;
                }
                this._container.friendList.declineFriendRequest(_loc3_.requestId);
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RSFRE_FRIEND_REQUEST");
        _loc1_.push("FRE_ACCEPTED");
        _loc1_.push("FRE_DECLINED");
        return _loc1_;
    }

    public processEvent(param1: Event): void {
        let _loc3_: RoomWidgetFriendRequestUpdateEvent = null;
        let _loc5_: string = null;
        let _loc2_: RoomSessionFriendRequestEvent = null;
        let _loc4_: FriendRequestEvent = null;
        if (this._container == null || this._container.events == null) {
            return;
        }
        switch (param1.type) {
            case "RSFRE_FRIEND_REQUEST":
                _loc2_ = param1 instanceof RoomSessionFriendRequestEvent ? param1 : null;
                if (!_loc2_) {
                    return;
                }
                _loc5_ = "RWFRUE_SHOW_FRIEND_REQUEST";
                _loc3_ = new RoomWidgetFriendRequestUpdateEvent(_loc5_, _loc2_.requestId, _loc2_.userId, _loc2_.userName);
                break;
            case "FRE_ACCEPTED":
            case "FRE_DECLINED":
                _loc4_ = param1 instanceof FriendRequestEvent ? param1 : null;
                if (!_loc4_) {
                    return;
                }
                _loc5_ = "RWFRUE_HIDE_FRIEND_REQUEST";
                _loc3_ = new RoomWidgetFriendRequestUpdateEvent(_loc5_, _loc4_.requestId);
        }
        if (_loc3_) {
            this._container.events.dispatchEvent(_loc3_);
        }
    }

    public update(): void {
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
