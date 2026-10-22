import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RoomEventData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/RoomEventData';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class RoomEventInfoCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.navigator.inroom::RoomEventInfoCtrl'); }

    private static readonly TOOLBAR_EXTENSION_ID: string = "room_event_info";

    constructor(param1: IHabboTransitionalNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _window: IWindowContainer;

    private _expanded: boolean = true;

    public set expanded(param1: boolean) {
        this._expanded = param1;
    }

    public get disposed(): boolean {
        return this._navigator == null;
    }

    private get enabled(): boolean {
        let _loc1_: boolean = this._navigator.getInteger("new.identity", 0) == 0 || !this._navigator.getBoolean("new.identity.hide.ui");
        return this._navigator.getBoolean("eventinfo.enabled") && _loc1_;
    }

    public dispose(): void {
        if (this._navigator) {
            this._navigator.toolbar.extensionView.detachExtension("room_event_info");
        }
        this._navigator = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public refresh(): void {
        if (this._navigator.toolbar == null || this._navigator.toolbar.extensionView == null || !this.enabled) {
            return;
        }
        let _loc5_: any = this._navigator.data.roomEventData != null;
        let _loc8_: boolean = this._navigator.data.currentRoomOwner || this._navigator.data.eventMod;
        let _loc10_: number = this._navigator.data.currentRoomId;
        let _loc11_: IRoomSession = this._navigator.roomSessionManager.getSession(_loc10_);
        if (!_loc11_) {
            return;
        }
        if (_loc11_.roomControllerLevel == 1) {
            _loc8_ = true;
        }
        let _loc2_: boolean = this._navigator.data.currentRoomOwner;
        if (!_loc5_ && !_loc2_ && !_loc8_) {
            this._navigator.toolbar.extensionView.detachExtension("room_event_info");
            return;
        }
        this.prepareWindow();
        let _loc7_: boolean = !!(this._expanded && _loc5_ && _loc2_);
        this._window.findChildByName("event_bg_owner").visible = _loc7_;
        let _loc1_: boolean = !!(this._expanded && _loc5_ && !_loc2_);
        this._window.findChildByName("event_bg_visitor").visible = _loc1_;
        let _loc3_: boolean = !this._expanded || !_loc5_;
        this._window.findChildByName("event_bg_contracted").visible = _loc3_;
        let _loc4_: boolean = !!(this._expanded && _loc5_ && _loc8_);
        this._window.findChildByName("modify_link_region").visible = _loc4_;
        this._window.findChildByName("extend_event_region").visible = _loc4_ && this.canExtend();
        let _loc12_: boolean = !_loc5_ && _loc8_;
        this._window.findChildByName("get_event").visible = _loc12_;
        this._window.findChildByName("create_link").visible = false;
        let _loc6_: boolean = !!(this._expanded && _loc5_ && !_loc8_);
        this._window.findChildByName("in_progress_txt").visible = _loc6_;
        let _loc9_: boolean = !!(this._expanded && _loc5_);
        this._window.findChildByName("desc_txt").visible = _loc9_;
        this._window.findChildByName("header_txt").visible = _loc5_;
        this._window.visible = !!(_loc5_ && (_loc7_ || _loc1_ || _loc3_ || _loc4_ || _loc6_ || _loc9_) || _loc12_);
        if (_loc5_) {
            this._window.findChildByName("header_txt").caption = this._navigator.data.roomEventData.eventName;
            this._window.findChildByName("desc_txt").caption = this._navigator.data.roomEventData.eventDescription;
        }
        this._navigator.toolbar.extensionView.attachExtension("room_event_info", this._window, -1, ["next_quest_timer", "quest_tracker"]);
        this._window.x = 0;
        this._window.y = 0;
        this._window.height = this._expanded && _loc5_ ? this._window.findChildByName("event_bg_visitor").height : this._window.findChildByName("event_bg_contracted").height;
    }

    public close(): void {
        if (this._window != null && Boolean(this._window.visible)) {
            this._window.visible = false;
            this._navigator.toolbar.extensionView.detachExtension("room_event_info");
        }
    }

    private canExtend(): boolean {
        let _loc2_: RoomEventData = this._navigator.data.roomEventData;
        if (_loc2_ == null) {
            return false;
        }
        if (!this._navigator.getBoolean("roomad.limit_total_time")) {
            return true;
        }
        let _loc5_: Date = new Date();
        let _loc1_: number = Number(_loc5_.getTime());
        let _loc6_: Date = _loc2_.expirationDate;
        let _loc3_: number = this._navigator.getInteger("room_ad.duration.minutes", 120);
        let _loc4_: number = this._navigator.getInteger("room_ad.maximum_total_time.minutes", 10080);
        return _loc6_.getTime() + _loc3_ * 60 * 1000 < _loc1_ + _loc4_ * 60 * 1000;
    }

    private onGetEventClick = (param1: WindowEvent): void => {
        if (this._navigator.data.roomEventData != null) {
            this._expanded = !this._expanded;
            this.refresh();
        } else {
            this._navigator.openCatalogRoomAdsPage();
        }
    };

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._navigator.getXmlWindow("iro_event_info"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._window.findChildByName("modify_link_region").procedure = this.onModify;
        this._window.findChildByName("extend_event_region").procedure = this.onExtend;
        this._window.findChildByName("bg_region").addEventListener("WME_CLICK", this.onGetEventClick);
    }

    private onModify = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._navigator.roomEventViewCtrl.show();
        }
    };

    private onExtend = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: RoomEventData = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = this._navigator.data.roomEventData;
            this._navigator.openCatalogRoomAdsExtendPage(_loc3_.eventName, _loc3_.eventDescription, _loc3_.expirationDate, _loc3_.categoryId);
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
