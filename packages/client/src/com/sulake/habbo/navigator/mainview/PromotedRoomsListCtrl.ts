import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { PromotedRoomCategoryData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/PromotedRoomCategoryData';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { RoomSessionTags } from '@/com/sulake/habbo/navigator/domain/RoomSessionTags';
import { PromotedRoomsGuestRoomListCtrl } from '@/com/sulake/habbo/navigator/HabboNavigator.group';
import { UserCountRenderer } from '@/com/sulake/habbo/navigator/UserCountRenderer';
import { Util } from '@/com/sulake/habbo/navigator/Util';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';

export class PromotedRoomsListCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview::PromotedRoomsListCtrl'); }

    private static readonly CATEGORY_SPACING: number = 5;

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
        this._SafeStr_3810 = new UserCountRenderer(this._navigator);
        this._SafeStr_3449 = new PromotedRoomsGuestRoomListCtrl(this._navigator);
    }

    declare private _navigator: HabboNavigator;

    declare private _SafeStr_3810: UserCountRenderer;

    declare private _SafeStr_3449: PromotedRoomsGuestRoomListCtrl;

    public get disposed(): boolean {
        return this._navigator == null;
    }

    public dispose(): void {
        this._navigator = null;
        if (this._SafeStr_3810) {
            this._SafeStr_3810.dispose();
            this._SafeStr_3810 = null;
        }
        if (this._SafeStr_3449) {
            this._SafeStr_3449.dispose();
            this._SafeStr_3449 = null;
        }
    }

    public refresh(param1: IWindowContainer, param2: any[]): void {
        let _loc4_: number = 0;
        let _loc5_: IWindowContainer = null;
        Util.hideChildren(param1);
        let _loc3_: number = 0;
        _loc4_ = 0;
        while (_loc4_ < param2.length) {
            _loc5_ = this.getCategoryContainer(param1, _loc4_);
            if (_loc5_ == null) {
                _loc5_ = this.createEntry(_loc4_);
                _loc5_.id = _loc4_;
                param1.addChild(_loc5_);
            }
            this.refreshEntry(_loc5_, param2[_loc4_]);
            _loc5_.y = _loc3_;
            _loc3_ += _loc5_.height + 5;
            _loc5_.visible = true;
            _loc4_++;
        }
        param1.height = Util.getLowestPoint(param1) > 0 ? Util.getLowestPoint(param1) + 5 : 0;
    }

    public createEntry(param1: number): IWindowContainer {
        let _loc2_: IWindowContainer = castGuarded(this._navigator.getXmlWindow("grs_promoted_room_category"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this.setProcedureAndId(_loc2_, param1, "enter_room_button", this.onEnterRoomButton);
        this.setProcedureAndId(_loc2_, param1, "leader_region", this.onLeaderRegion);
        this.setProcedureAndId(_loc2_, param1, "toggle_open_region", this.onToggleOpenRegion);
        this._navigator.refreshButton(_loc2_, "navi_room_icon", true, null, 0);
        return _loc2_;
    }

    public refreshEntry(param1: IWindowContainer, param2: PromotedRoomCategoryData): void {
        let _loc4_: string = this._navigator.getText("promotedroomcategory." + param2.code);
        param1.findChildByName("category_name_txt").caption = _loc4_;
        param1.findChildByName("category_header").width = param1.findChildByName("category_name_txt").width + 13;
        this._navigator.registerParameter("navigator.promotedrooms.hidetopten", "category", _loc4_);
        this._navigator.registerParameter("navigator.promotedrooms.viewtopten", "category", _loc4_);
        param1.findChildByName("open_txt").caption = this._navigator.getText("navigator.promotedrooms.viewtopten");
        param1.findChildByName("close_txt").caption = this._navigator.getText("navigator.promotedrooms.hidetopten");
        param1.findChildByName("room_name_txt").caption = param2.bestRoom.roomName;
        let _loc3_: IWindow = param1.findChildByName("leader_name_txt");
        _loc3_.caption = param2.bestRoom.showOwner ? param2.bestRoom.ownerName : "";
        _loc3_.x = this.getLocationAfter(param1, "leader_name_caption_txt", 0);
        param1.findChildByName("arrow_down_icon").visible = param2.open;
        param1.findChildByName("arrow_right_icon").visible = !param2.open;
        param1.findChildByName("close_txt").visible = param2.open;
        param1.findChildByName("open_txt").visible = !param2.open;
        param1.findChildByName("arrow_down_icon").x = this.getLocationAfter(param1, "close_txt");
        param1.findChildByName("arrow_right_icon").x = this.getLocationAfter(param1, "open_txt");
        this._SafeStr_3810.refreshUserCount(param2.bestRoom.maxUserCount, castGuarded(param1.findChildByName("enter_room_button"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"), param2.bestRoom.userCount, "${navigator.usercounttooltip.users}", 222, 35);
        this.refreshAvatarImage(param1, param2);
        param1.findChildByName("item_list").visible = param2.open;
        if (param2.open) {
            param1.findChildByName("item_list").height = param2.rooms.length * 17;
            this._SafeStr_3449.content = param1;
            this._SafeStr_3449.category = param2;
            this._SafeStr_3449.refresh();
        }
        param1.height = param2.open ? Util.getLowestPoint(param1) + 3 : 90;
    }

    private getCategoryContainer(param1: IWindowContainer, param2: number): IWindowContainer {
        return castGuarded(param1.getChildByID(param2), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private getLocationAfter(param1: IWindowContainer, param2: string, param3: number = 3): number {
        let _loc4_: IWindow = param1.findChildByName(param2);
        return _loc4_.x + _loc4_.width + param3;
    }

    private setProcedureAndId(param1: IWindowContainer, param2: number, param3: string, param4: (...args: any[]) => any): void {
        param1.findChildByName(param3).procedure = param4;
        param1.findChildByName(param3).id = param2;
    }

    private onEnterRoomButton = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: PromotedRoomCategoryData = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = this.findCategory(param2);
            this._navigator.data.roomSessionTags = new RoomSessionTags(_loc3_.code, "1");
            this._navigator.goToPrivateRoom(_loc3_.bestRoom.flatId);
            this._navigator.closeNavigator();
        }
    };

    private onLeaderRegion = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: PromotedRoomCategoryData = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = this.findCategory(param2);
            this._navigator.trackGoogle("extendedProfile", "navigator_promotedRoom");
            this._navigator.send(new GetExtendedProfileMessageComposer(_loc3_.bestRoom.ownerId));
        }
    };

    private onToggleOpenRegion = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: number = 0;
        let _loc5_: PromotedRoomCategoryData = null;
        let _loc3_: PromotedRoomCategoryData = null;
        if (param1.type == "WME_CLICK") {
            while (_loc4_ < this._navigator.data.promotedRooms.entries.length) {
                _loc5_ = this._navigator.data.promotedRooms.entries[_loc4_];
                if (param2.id != _loc4_) {
                    _loc5_.open = false;
                }
                _loc4_++;
            }
            _loc3_ = this.findCategory(param2);
            _loc3_.toggleOpen();
            this._navigator.mainViewCtrl.refresh();
        }
    };

    private findCategory(param1: IWindow): PromotedRoomCategoryData {
        return this._navigator.data.promotedRooms.entries[param1.id];
    }

    private refreshAvatarImage(param1: IWindowContainer, param2: PromotedRoomCategoryData): void {
        let _loc3_: IWidgetWindow = castGuarded(param1.findChildByName("avatar_image_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc4_: IAvatarImageWidget = castGuarded(_loc3_.widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget");
        _loc4_.figure = param2.leaderFigure;
    }

    get [IDisposable](): true {
        return true;
    }
}
