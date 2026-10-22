import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { Component } from '@/com/sulake/core/runtime/Component';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetFriendRequestUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetFriendRequestUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RoomWidgetUserLocationUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserLocationUpdateEvent';
import { FriendRequestDialog } from '@/com/sulake/habbo/ui/widget/friendrequest/FriendRequestDialog';
import { RoomWidgetFriendRequestMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFriendRequestMessage';
import { RoomWidgetGetObjectLocationMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetGetObjectLocationMessage';
import { RoomWidgetOpenProfileMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenProfileMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class FriendRequestWidget extends RoomWidgetBase implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.friendrequest::FriendRequestWidget'); }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: Component) {
        super(param1, param2, param3, param4);
        this._component = param5;
        this._requests = new UtilsMap();
    }

    declare private _component: Component;

    declare private _requests: UtilsMap;

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._component) {
            this._component.removeUpdateReceiver(this);
            this._component = null;
        }
        if (this._requests) {
            for (let _loc1_ of valuesOf(this._requests)) {
                _loc1_.dispose();
                _loc1_ = null;
            }
            this._requests.dispose();
            this._requests = null;
        }
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (!param1) {
            return;
        }
        param1.addEventListener("RWFRUE_SHOW_FRIEND_REQUEST", this.eventHandler);
        param1.addEventListener("RWFRUE_HIDE_FRIEND_REQUEST", this.eventHandler);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWFRUE_SHOW_FRIEND_REQUEST", this.eventHandler);
        param1.removeEventListener("RWFRUE_HIDE_FRIEND_REQUEST", this.eventHandler);
    }

    public checkUpdateNeed(): void {
        if (!this._component) {
            return;
        }
        if (this._requests && this._requests.length > 0) {
            this._component.registerUpdateReceiver(this, 10);
        } else {
            this._component.removeUpdateReceiver(this);
        }
    }

    public update(param1: number): void {
        let _loc3_: RoomWidgetUserLocationUpdateEvent = null;
        if (!this._requests) {
            return;
        }
        for (const _loc2_ of valuesOf(this._requests)) {
            if (_loc2_) {
                _loc3_ = asInstanceOf(this.messageListener.processWidgetMessage(new RoomWidgetGetObjectLocationMessage("RWGOI_MESSAGE_GET_OBJECT_LOCATION", _loc2_.userId | 0, 1)), RoomWidgetUserLocationUpdateEvent);
                if (_loc3_) {
                    _loc2_.targetRect = _loc3_.rectangle;
                }
            }
        }
    }

    public acceptRequest(param1: number): void {
        if (!this.messageListener) {
            return;
        }
        this.messageListener.processWidgetMessage(new RoomWidgetFriendRequestMessage("RWFRM_ACCEPT", param1));
        this.removeRequest(param1);
    }

    public declineRequest(param1: number): void {
        if (!this.messageListener) {
            return;
        }
        this.messageListener.processWidgetMessage(new RoomWidgetFriendRequestMessage("RWFRM_DECLINE", param1));
        this.removeRequest(param1);
    }

    public ignoreRequest(param1: number): void {
        this.removeRequest(param1);
    }

    public showProfile(param1: number, param2: string): void {
        this.messageListener.processWidgetMessage(new RoomWidgetOpenProfileMessage("RWOPEM_OPEN_USER_PROFILE", param1, param2));
    }

    private addRequest(param1: number, param2: FriendRequestDialog): void {
        if (!this._requests || !param2) {
            return;
        }
        this._requests.add(param1, param2);
    }

    private removeRequest(param1: number): void {
        if (!this._requests) {
            return;
        }
        let _loc2_: FriendRequestDialog = asInstanceOf(this._requests.getValue(param1), FriendRequestDialog);
        if (!_loc2_) {
            return;
        }
        this._requests.remove(param1);
        _loc2_.dispose();
        this.checkUpdateNeed();
    }

    private eventHandler = (param1: RoomWidgetFriendRequestUpdateEvent): void => {
        if (!param1) {
            return;
        }
        switch (param1.type) {
            case "RWFRUE_SHOW_FRIEND_REQUEST":
                this.addRequest(param1.requestId, new FriendRequestDialog(this, param1.requestId, param1.userId, param1.userName));
                break;
            case "RWFRUE_HIDE_FRIEND_REQUEST":
                this.removeRequest(param1.requestId);
        }
        this.checkUpdateNeed();
    };

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
