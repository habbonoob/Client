import { asGuarded, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { GuildInfoCtrl } from '@/com/sulake/habbo/navigator/GuildInfoCtrl';
import { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator.group';
import { PopupCtrl } from '@/com/sulake/habbo/navigator/PopupCtrl';
import { TagRenderer } from '@/com/sulake/habbo/navigator/TagRenderer';
import { Util } from '@/com/sulake/habbo/navigator/Util';
import { ExtendedProfileIcon } from '@/com/sulake/habbo/utils/ExtendedProfileIcon';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';

export class RoomPopupCtrl extends PopupCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator::RoomPopupCtrl'); }

    declare private _details: IWindowContainer;

    declare private _room: GuestRoomData;

    declare private _SafeStr_3603: TagRenderer;

    declare private _navigator_RoomPopupCtrl: IHabboTransitionalNavigator;

    declare private _SafeStr_3888: GuildInfoCtrl;

    constructor(param1: IHabboTransitionalNavigator, param2: number, param3: number) {
        super(castTo(param1, HabboNavigator), param2, param3, "grs_guest_room_details_long");
        this._navigator_RoomPopupCtrl = param1;
        this._SafeStr_3603 = new TagRenderer(param1, this.hideInstantly);
        this._SafeStr_3888 = new GuildInfoCtrl(this._navigator_RoomPopupCtrl);
    }

    public set room(param1: GuestRoomData) {
        this._room = param1;
    }

    public override refreshContent(param1: IWindowContainer): void {
        if (this._details == null) {
            this._details = castGuarded(param1.findChildByName("details_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        }
        this._details.visible = true;
        this._SafeStr_3603.useHashTags = true;
        Util.hideChildren(this._details);
        this._SafeStr_3888.refresh(this._details, this._room);
        this.refreshRoomName(this._details, this._room);
        this.refreshOwnerName();
        this.refreshTextWithCaption("roomctg", this._details, this.getRoomCtg(this._room.categoryId));
        this.refreshRoomDesc(this._details, this._room);
        this.refreshExtraCont();
        this.refreshEventInfo(this._room);
        this.refreshRoomSettings();
        this.refreshInfo(this._details, "trading_allowed", this._room.tradeMode == 2);
        this.refreshInfo(this._details, "doormode_doorbell", this._room.doorMode == 1);
        this.refreshInfo(this._details, "doormode_password", this._room.doorMode == 2);
        this.refreshInfo(this._details, "doormode_invisible", this._room.doorMode == 3);
        Util.moveChildrenToColumn(this._details, ["guild_info", "roomname", "roomctg_cont", "roomowner_cont", "roomdesc", "extra_cont", "doormode_doorbell", "doormode_password", "doormode_invisible", "trading_allowed", "eventinfo_cont", "roomsettings_cont"], 0, 0);
        this._details.findChildByName("guild_info").x = 2;
        this._details.height = Util.getLowestPoint(this._details);
    }

    private refreshOwnerName(): void {
        let _loc1_: ITextWindow = castGuarded(this._details.findChildByName("roomowner"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        let _loc2_: IRegionWindow = castGuarded(this._details.findChildByName("roomowner_cont"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc2_.procedure = this.onOwnerName;
        _loc1_.caption = this._room.showOwner ? this._room.ownerName : "";
        _loc2_.visible = this._room.showOwner && this._room.ownerName != "" && this._room.ownerName != "-";
        ExtendedProfileIcon.setUserInfoState(false, _loc2_);
        Util.layoutChildrenInArea(_loc2_, 1000, 10, 2);
    }

    private refreshRoomSettings(): void {
        let _loc2_: IRegionWindow = null;
        let _loc1_: ITextWindow = null;
        let _loc3_: boolean = true;
        if (_loc3_) {
            _loc2_ = castGuarded(this._details.findChildByName("roomsettings_cont"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
            _loc1_ = castGuarded(this._details.findChildByName("roomsettings"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc2_.procedure = this.onRoomSettings;
            _loc2_.visible = _loc3_ && this._navigator_RoomPopupCtrl.sessionData.userId == this._room.ownerId;
            Util.layoutChildrenInArea(_loc2_, 1000, 10, 2);
        }
    }

    private refreshExtraCont(): void {
        let _loc1_: IWindowContainer = castGuarded(this._details.findChildByName("extra_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        Util.hideChildren(_loc1_);
        this._SafeStr_3603.refreshTags(_loc1_, this._room.tags);
        if (this._room.score > 0) {
            this.refreshTextWithCaption("rating", _loc1_, "" + this._room.score);
            _loc1_.findChildByName("rating_cont").visible = true;
        }
        if (Util.hasVisibleChildren(_loc1_)) {
            Util.moveChildrenToColumn(_loc1_, ["tags", "startedat_cont", "rating_cont"], 0, 3);
            _loc1_.height = Util.getLowestPoint(_loc1_) + 4;
            _loc1_.visible = true;
        }
    }

    private refreshEventInfo(param1: GuestRoomData): void {
        if (param1.roomAdName == null || param1.roomAdName.length == 0) {
            return;
        }
        let _loc2_: IWindowContainer = castGuarded(this._details.findChildByName("eventinfo_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        Util.hideChildren(_loc2_);
        let _loc4_: ITextWindow = castGuarded(_loc2_.findChildByName("eventinfo_name"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        let _loc7_: ITextWindow = castGuarded(_loc2_.findChildByName("eventinfo_desc"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        let _loc3_: ITextWindow = castGuarded(_loc2_.findChildByName("eventinfo_expirationtime"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        let _loc6_: ITextWindow = castGuarded(_loc2_.findChildByName("eventinfo.caption"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc4_.caption = param1.roomAdName;
        _loc7_.caption = param1.roomAdDescription;
        _loc3_.caption = FriendlyTime.getFriendlyTime(this._navigator_RoomPopupCtrl.localization, param1.roomAdExpiresInMin * 60);
        _loc7_.height = _loc7_.textHeight + 10 | 0;
        _loc3_.y = _loc7_.y + _loc7_.height;
        _loc2_.height = _loc4_.height + _loc7_.height + _loc3_.height + 20;
        let _loc5_: IWindowContainer = asGuarded(_loc2_.findChildByName("eventinfo_child_container"), isIWindowContainer);
        _loc5_.x = _loc6_.textWidth + 5 | 0;
        _loc5_.height = Util.getLowestPoint(_loc5_) + 5;
        _loc2_.visible = true;
        _loc6_.visible = true;
        _loc5_.visible = true;
    }

    private refreshRoomName(param1: IWindowContainer, param2: GuestRoomData): void {
        let _loc3_: ITextWindow = castGuarded(param1.getChildByName("roomname"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc3_.visible = true;
        _loc3_.text = param2.roomName;
        _loc3_.height = _loc3_.textHeight + 3 | 0;
    }

    private refreshRoomDesc(param1: IWindowContainer, param2: GuestRoomData): void {
        if (param2.description == "") {
            return;
        }
        let _loc3_: string = "roomdesc";
        let _loc4_: ITextWindow = castGuarded(param1.getChildByName(_loc3_), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc4_.text = param2.description;
        _loc4_.height = _loc4_.textHeight + 10 | 0;
        _loc4_.y = Util.getLowestPoint(param1);
        _loc4_.visible = true;
    }

    private refreshTextWithCaption(param1: string, param2: IWindowContainer, param3: string): void {
        let _loc5_: IWindowContainer = castGuarded(param2.findChildByName(param1 + "_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc5_.visible = true;
        let _loc6_: ITextWindow = castGuarded(_loc5_.getChildByName(param1), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        let _loc4_: ITextWindow = castGuarded(_loc5_.getChildByName(param1 + ".caption"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc6_.text = param3;
        Util.moveChildrenToRow(_loc5_, [param1 + ".caption", param1], _loc4_.x, 0, 2);
    }

    private refreshInfo(param1: IWindowContainer, param2: string, param3: boolean): void {
        if (!param3) {
            return;
        }
        let _loc4_: IWindowContainer = castGuarded(param1.findChildByName(param2), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc4_.visible = true;
        this.navigator.refreshButton(_loc4_, param2, true, null, 0);
    }

    private getEventCtg(param1: number): string {
        let _loc3_: string = "roomevent_type_" + param1;
        let _loc2_: string = this.navigator.getText(_loc3_);
        return _loc2_ == null ? "" : _loc2_;
    }

    private getRoomCtg(param1: number): string {
        for (const _loc2_ of this.navigator.data.allCategories ?? []) {
            if (_loc2_.nodeId == param1) {
                return stringOrNull(_loc2_.nodeName);
            }
        }
        return "";
    }

    private onOwnerName = (param1: WindowEvent, param2: IWindow): void => {
        ExtendedProfileIcon.onEntry(param1, param2);
        if (param1.type == "WME_CLICK") {
            this._navigator_RoomPopupCtrl.trackGoogle("extendedProfile", "navigator_roomPopup");
            this._navigator_RoomPopupCtrl.send(new GetExtendedProfileMessageComposer(this._room.ownerId));
            this.hideInstantly();
        }
    };

    private onRoomSettings = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._navigator_RoomPopupCtrl.trackGoogle("roomInfo", "editRoomSettings");
            this._navigator_RoomPopupCtrl.roomSettingsCtrl.startRoomSettingsEditFromNavigator(this._room.flatId, this._room.habboGroupId);
            this.hideInstantly();
        }
    };
}
