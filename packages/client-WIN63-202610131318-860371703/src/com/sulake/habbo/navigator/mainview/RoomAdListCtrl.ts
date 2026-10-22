import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomAdEventTabAdClickedComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/RoomAdEventTabAdClickedComposer';
import { GuestRoomListCtrl } from '@/com/sulake/habbo/navigator/HabboNavigator.group';
import { Util } from '@/com/sulake/habbo/navigator/Util';

export class RoomAdListCtrl extends GuestRoomListCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview::RoomAdListCtrl'); }

    constructor(param1: HabboNavigator, param2: number, param3: boolean) {
        super(param1, param2, param3);
    }

    protected override getListEntry(param1: number): IWindowContainer {
        let _loc2_: IWindowContainer = castGuarded(this._navigator.getXmlWindow("grs_room_ads_details_phase_one"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc2_.background = true;
        _loc2_.addEventListener("WME_MOVE", this.onMouseMove);
        _loc2_.addEventListener("WME_OVER", this.onMouseOver);
        _loc2_.addEventListener("WME_OUT", this.onMouseOut);
        _loc2_.addEventListener("WME_CLICK", this.onMouseClick);
        _loc2_.setParamFlag(1, true);
        _loc2_.setParamFlag(128, true);
        _loc2_.color = this.getBgColor(param1);
        _loc2_.tags.push(param1);
        return _loc2_;
    }

    protected override refreshEntryDetails(param1: IWindowContainer, param2: GuestRoomData): void {
        param1.visible = true;
        let _loc3_: ITextWindow = castGuarded(param1.getChildByName("adname"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc3_.visible = true;
        Util.cutTextToWidth(_loc3_, param2.roomAdName, param1.width);
        this._navigator.refreshButton(param1, "doormode_doorbell_small", param2.doorMode == 1, null, 0);
        this._navigator.refreshButton(param1, "doormode_password_small", param2.doorMode == 2, null, 0);
        this._navigator.refreshButton(param1, "doormode_invisible_small", param2.doorMode == 3, null, 0);
        this._SafeStr_3810.refreshUserCount(param2.maxUserCount, param1, param2.userCount, "${navigator.usercounttooltip.users}", 308, 2);
    }

    private getRoomAt_RoomAdListCtrl(param1: number): GuestRoomData {
        return this.getRooms()[param1];
    }

    protected override onMouseClick(param1: WindowEvent): void {
        let _loc4_: IWindow = param1.target;
        let _loc3_: number = _loc4_.tags[0] | 0;
        let _loc2_: GuestRoomData = this.getRoomAt_RoomAdListCtrl(_loc3_);
        if (this._navigator) {
            this._navigator.send(new RoomAdEventTabAdClickedComposer(_loc2_.flatId, _loc2_.roomAdName, _loc2_.roomAdExpiresInMin));
        }
        super.onMouseClick(param1);
    }
}
