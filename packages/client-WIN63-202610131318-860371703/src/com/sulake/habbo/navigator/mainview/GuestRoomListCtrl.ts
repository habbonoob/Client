import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { IViewCtrl } from '@/com/sulake/habbo/navigator/IViewCtrl';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AddFavouriteRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/AddFavouriteRoomMessageComposer';
import { DeleteFavouriteRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/DeleteFavouriteRoomMessageComposer';
import { MainViewCtrl, RoomPopupCtrl } from '@/com/sulake/habbo/navigator/HabboNavigator.group';
import { UserCountRenderer } from '@/com/sulake/habbo/navigator/UserCountRenderer';
import { Util } from '@/com/sulake/habbo/navigator/Util';

export class GuestRoomListCtrl implements IViewCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview::GuestRoomListCtrl'); }

    declare protected _navigator: HabboNavigator;

    declare private _content: IWindowContainer;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _roomPopupCtrl: RoomPopupCtrl;

    declare private _SafeStr_2928: IScrollbarWindow;

    declare protected _SafeStr_3810: UserCountRenderer;

    declare private _SafeStr_4360: IWindowContainer;

    declare private _SafeStr_6195: number;
    static { (this.prototype as any)._SafeStr_6195 = 0; }

    declare private _SafeStr_7166: boolean;
    static { (this.prototype as any)._SafeStr_7166 = false; }

    declare private _SafeStr_6723: number;
    static { (this.prototype as any)._SafeStr_6723 = 0; }

    declare private _showRoomNumbers: boolean;
    static { (this.prototype as any)._showRoomNumbers = false; }

    constructor(param1: HabboNavigator, param2: number, param3: boolean) {
        this.onMouseClick = this.onMouseClick.bind(this);
        this._navigator = param1;
        this._SafeStr_6723 = param2;
        this._showRoomNumbers = param3;
        this._roomPopupCtrl = new RoomPopupCtrl(this._navigator, 5, -5);
        this._SafeStr_3810 = new UserCountRenderer(this._navigator);
    }

    public dispose(): void {
        if (this._roomPopupCtrl) {
            this._roomPopupCtrl.dispose();
            this._roomPopupCtrl = null;
        }
        if (this._SafeStr_3810) {
            this._SafeStr_3810.dispose();
            this._SafeStr_3810 = null;
        }
    }

    public set content(param1: IWindowContainer) {
        this._content = param1;
        this._SafeStr_2221 = this._content ? castGuarded(this._content.findChildByName("item_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow") : null;
        this._SafeStr_2928 = this._content ? castGuarded(this._content.findChildByName("scroller"), isIScrollbarWindow, "com.sulake.core.window.components.IScrollbarWindow") : null;
        if (param1 == null && this._roomPopupCtrl) {
            this._roomPopupCtrl.closePopup();
        }
    }

    public get content(): IWindowContainer {
        return this._content;
    }

    public refresh(): void {
        let _loc4_: number = 0;
        let _loc2_: boolean = false;
        let _loc3_: any[] = this.getRooms();
        let _loc1_: number = this.getVisibleEntryCount();
        this._SafeStr_2221.autoArrangeItems = false;
        _loc4_ = 0;
        while (true) {
            if (_loc4_ < _loc3_.length) {
                this.refreshEntry(true, _loc4_, _loc3_[_loc4_]);
            } else {
                _loc2_ = this.refreshEntry(false, _loc4_, null);
                if (_loc2_) {
                    break;
                }
            }
            _loc4_++;
        }
        this._SafeStr_2221.autoArrangeItems = true;
        if (this._SafeStr_2928 != null && this.getVisibleEntryCount() != _loc1_) {
            this._SafeStr_2928.scrollV = 0;
        }
        if (this._content.findChildByName("no_rooms_found")) {
            this._content.findChildByName("no_rooms_found").visible = _loc3_.length < 1;
        }
    }

    private getVisibleEntryCount(): number {
        let _loc2_: number = 0;
        let _loc1_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_2221.numListItems) {
            if (this._SafeStr_2221.getListItemAt(_loc2_ >>> 0).visible) {
                _loc1_++;
            }
            _loc2_++;
        }
        return _loc1_;
    }

    protected getListEntry(param1: number): IWindowContainer {
        let _loc3_: number = 0;
        let _loc2_: IWindowContainer = castGuarded(this._navigator.getXmlWindow("grs_guest_room_details_phase_one"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc2_.background = true;
        _loc2_.addEventListener("WME_MOVE", this.onMouseMove);
        _loc2_.addEventListener("WME_OVER", this.onMouseOver);
        _loc2_.addEventListener("WME_OUT", this.onMouseOut);
        _loc2_.addEventListener("WME_CLICK", this.onMouseClick);
        _loc2_.setParamFlag(1, true);
        _loc2_.setParamFlag(128, true);
        _loc2_.color = this.getBgColor(param1);
        _loc2_.tags.push(param1);
        if (this._showRoomNumbers) {
            _loc3_ = 20;
            _loc2_.findChildByName("roomname").x = _loc2_.findChildByName("roomname").x + _loc3_;
            _loc2_.findChildByName("roomname").width = _loc2_.findChildByName("roomname").width - _loc3_;
        }
        return _loc2_;
    }

    protected getBgColor(param1: number): number {
        return param1 % 2 != 0 ? 4294967295 : 4292797682;
    }

    private refreshEntry(param1: boolean, param2: number, param3: GuestRoomData): boolean {
        let _loc4_: IWindowContainer = castGuarded(this._SafeStr_2221.getListItemAt(param2 >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc5_: boolean = false;
        if (_loc4_ == null) {
            if (!param1) {
                return true;
            }
            _loc4_ = this.getListEntry(param2);
            this._SafeStr_2221.addListItem(_loc4_);
            _loc5_ = true;
        }
        Util.hideChildren(_loc4_);
        if (param1) {
            this.refreshEntryDetails(_loc4_, param3);
            _loc4_.visible = true;
            _loc4_.height = 17;
        } else {
            _loc4_.height = 0;
            _loc4_.visible = false;
        }
        if (_loc5_) {
            _loc4_.width += this._SafeStr_6723;
            MainViewCtrl.stretchNewEntryIfNeeded(this, _loc4_);
        }
        return false;
    }

    protected refreshEntryDetails(param1: IWindowContainer, param2: GuestRoomData): void {
        param1.visible = true;
        Util.hideChildren(param1);
        this.refreshFavouriteIcon(param1, param2);
        let _loc3_: string = param2.doorMode == 1 || param2.doorMode == 2 || param2.doorMode == 3 ? "group_base_icon" : "group_base_icon_no_doormode";
        this._navigator.refreshButton(param1, _loc3_, param2.habboGroupId > 0, null, 0, "group_base_icon");
        this._navigator.refreshButton(param1, "home", this.isHome(param2), null, 0);
        this._navigator.refreshButton(param1, "doormode_doorbell_small", param2.doorMode == 1, null, 0);
        this._navigator.refreshButton(param1, "doormode_password_small", param2.doorMode == 2, null, 0);
        this._navigator.refreshButton(param1, "doormode_invisible_small", param2.doorMode == 3, null, 0);
        if (this._showRoomNumbers) {
            param1.findChildByName("room_number").visible = true;
            param1.findChildByName("room_number").caption = param1.tags[0] + 2 + ".";
        }
        this.refreshRoomName(param1, param2);
        this._SafeStr_3810.refreshUserCount(param2.maxUserCount, param1, param2.userCount, "${navigator.usercounttooltip.users}", 308, 2);
        param1.name = "guestroom_" + param2.ownerName + "_" + param2.roomName;
    }

    private refreshRoomName(param1: IWindowContainer, param2: GuestRoomData): void {
        let _loc4_: ITextWindow = castGuarded(param1.getChildByName("roomname"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc4_.visible = true;
        let _loc3_: boolean = param1.findChildByName("home").visible || Boolean(param1.findChildByName("favourite").visible) || Boolean(param1.findChildByName("make_favourite").visible);
        Util.cutTextToWidth(_loc4_, param2.roomName, _loc3_ ? _loc4_.width - 20 : _loc4_.width);
    }

    protected onMouseMove = (param1: WindowEvent): void => {
        this.checkFastHorizontalMove(param1);
    };

    protected onMouseOver = (param1: WindowEvent): void => {
        let _loc3_: IWindow = param1.target;
        if (this._roomPopupCtrl.visible && this._SafeStr_7166) {
            return;
        }
        this.hilite(castGuarded(_loc3_, isIWindowContainer, "com.sulake.core.window.IWindowContainer"));
        let _loc2_: number = _loc3_.tags[0] | 0;
        let _loc4_: GuestRoomData = this.getRoomAt(_loc2_);
        if (_loc4_ == null) {
            return;
        }
        this._roomPopupCtrl.room = _loc4_;
        this._roomPopupCtrl.showPopup(_loc3_);
    };

    public getRooms(): any[] {
        return this._navigator == null || this._navigator.data == null || this._navigator.data.guestRoomSearchResults == null || this._navigator.data.guestRoomSearchResults.rooms == null ? [] : this._navigator.data.guestRoomSearchResults.rooms;
    }

    private getRoomAt(param1: number): GuestRoomData {
        return this.getRooms()[param1];
    }

    protected onMouseOut = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.target;
        if (Util.containsMouse(_loc2_)) {
            return;
        }
        let _loc3_: number = _loc2_.tags[0] | 0;
        _loc2_.color = this.getBgColor(_loc3_);
        this._roomPopupCtrl.closePopup();
    };

    protected onMouseClick(param1: WindowEvent): void {
        let _loc3_: Point = null;
        let _loc5_: IWindow = param1.target;
        let _loc4_: number = _loc5_.tags[0] | 0;
        let _loc2_: GuestRoomData = this.getRoomAt(_loc4_);
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.ownerName != this._navigator.sessionData.userName) {
            if (_loc2_.habboGroupId != 0) {
                this._navigator.goToPrivateRoom(_loc2_.flatId);
                return;
            }
            _loc3_ = new Point((param1 instanceof WindowMouseEvent ? param1 : null).stageX, (param1 instanceof WindowMouseEvent ? param1 : null).stageY);
            switch (_loc2_.doorMode - 1) {
                case 0:
                    this._navigator.doorbell.show(_loc2_, _loc3_);
                    return;
                case 1:
                    this._navigator.passwordInput.show(_loc2_, _loc3_);
                    return;
            }
        }
        this.beforeEnterRoom(_loc4_);
        this._navigator.goToRoom(_loc2_.flatId, true, "", _loc4_);
        this._roomPopupCtrl.hideInstantly();
    }

    public beforeEnterRoom(param1: number): void {
    }

    private refreshFavouriteIcon(param1: IWindowContainer, param2: GuestRoomData): void {
        let _loc4_: boolean = this._navigator.data.isRoomFavourite(param2.flatId);
        let _loc3_: boolean = this.isHome(param2);
        this.refreshRegion(param1, "make_favourite", !_loc4_ && !_loc3_, this.onAddFavouriteClick);
        this.refreshRegion(param1, "favourite", _loc4_ && !_loc3_, this.onRemoveFavouriteClick);
    }

    private isHome(param1: GuestRoomData): boolean {
        return param1.flatId == this._navigator.data.homeRoomId;
    }

    private refreshRegion(param1: IWindowContainer, param2: string, param3: boolean, param4: (...args: any[]) => any): void {
        let _loc5_: IRegionWindow = asGuarded(param1.findChildByName(param2), isIRegionWindow);
        if (!_loc5_) {
            return;
        }
        if (!param3) {
            _loc5_.visible = false;
            if (_loc5_.hasEventListener("WME_CLICK")) {
                _loc5_.removeEventListener("WME_CLICK", param4);
            }
        } else {
            _loc5_.addEventListener("WME_CLICK", param4);
            _loc5_.visible = true;
            this._navigator.refreshButton(_loc5_, param2, param3, null, 0);
        }
    }

    private onRemoveFavouriteClick = (param1: WindowMouseEvent): void => {
        let _loc3_: IWindow = param1.target;
        if (_loc3_ == null || _loc3_.parent == null) {
            return;
        }
        let _loc2_: GuestRoomData = this.getRoomAt(_loc3_.parent.tags[0] | 0);
        if (_loc2_ == null) {
            return;
        }
        this._navigator.send(new DeleteFavouriteRoomMessageComposer(_loc2_.flatId));
    };

    private onAddFavouriteClick = (param1: WindowMouseEvent): void => {
        let _loc3_: IWindow = param1.target;
        if (_loc3_ == null || _loc3_.parent == null) {
            return;
        }
        let _loc2_: GuestRoomData = this.getRoomAt(_loc3_.parent.tags[0] | 0);
        if (_loc2_ == null) {
            return;
        }
        this._navigator.send(new AddFavouriteRoomMessageComposer(_loc2_.flatId));
    };

    private hilite(param1: IWindowContainer): void {
        let _loc2_: number = 0;
        if (this._SafeStr_4360 != null && !this._SafeStr_4360.disposed) {
            _loc2_ = this._SafeStr_4360.tags[0] | 0;
            this._SafeStr_4360.color = this.getBgColor(_loc2_);
        }
        this._SafeStr_4360 = param1;
        param1.color = 4288861930;
    }

    private checkFastHorizontalMove(param1: WindowEvent): void {
        let _loc3_: WindowMouseEvent = castTo(param1, WindowMouseEvent);
        let _loc2_: number = Math.abs(this._SafeStr_6195 - _loc3_.stageX) | 0;
        this._SafeStr_6195 = _loc3_.stageX | 0;
        this._SafeStr_7166 = _loc2_ > 2;
    }

    public get roomPopupCtrl(): RoomPopupCtrl {
        return this._roomPopupCtrl;
    }

    public get navigator(): HabboNavigator {
        return this._navigator;
    }
}
