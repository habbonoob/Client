import { castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { HabboGroupDetailsData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsData';
import type { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator';
import type { RoomSettingsCtrl } from '@/com/sulake/habbo/navigator/roomsettings/RoomSettingsCtrl';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AddFavouriteRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/AddFavouriteRoomMessageComposer';
import { DeleteFavouriteRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/DeleteFavouriteRoomMessageComposer';
import { UpdateHomeRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/UpdateHomeRoomMessageComposer';
import { LegacyNavigator } from '@/com/sulake/habbo/navigator/transitional/LegacyNavigator';
import { RoomTradingLevelEnum } from '@/com/sulake/habbo/session/enum/RoomTradingLevelEnum';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class RoomInfoPopup {
    static { registerClassName(this, 'com.sulake.habbo.navigator.view::RoomInfoPopup'); }

    constructor(param1: HabboNewNavigator) {
        this._navigator = param1;
    }

    declare private _window: IWindowContainer;

    declare private _navigator: HabboNewNavigator;

    private _SafeStr_4326: string[] = new Array<string>(0).fill(null);
    private _guestRoomData: GuestRoomData = null;
    private _SafeStr_4781: Point = new Point(-1, -1);
    private _SafeStr_4982: boolean = false;

    declare private _SafeStr_6237: boolean;
    static { (this.prototype as any)._SafeStr_6237 = false; }

    private _SafeStr_5106: boolean = false;

    declare private _SafeStr_6807: boolean;
    static { (this.prototype as any)._SafeStr_6807 = false; }

    public get visible(): boolean {
        if (!this._window) {
            return false;
        }
        return this._window.visible;
    }

    private set position(param1: Point) {
        this._window.position = param1;
        this._SafeStr_4781 = param1;
    }

    private get roomIsHome(): boolean {
        if (this._SafeStr_4982) {
            return this._SafeStr_6237;
        }
        return this._navigator.legacyNavigator.isRoomHome(this._guestRoomData.flatId);
    }

    private set roomIsHome(param1: boolean) {
        this._SafeStr_4982 = true;
        this._SafeStr_6237 = param1;
    }

    private get roomIsFavorite(): boolean {
        if (this._SafeStr_5106) {
            return this._SafeStr_6807;
        }
        return this._navigator.legacyNavigator.isRoomFavorite(this._guestRoomData.flatId);
    }

    private set roomIsFavorite(param1: boolean) {
        this._SafeStr_5106 = true;
        this._SafeStr_6807 = param1;
    }

    public show(param1: boolean): void {
        if (param1) {
            if (!this._window) {
                this.createWindow();
            }
            this.populate();
            this._window.visible = true;
            this._SafeStr_4982 = false;
            this._SafeStr_5106 = false;
        } else if (this._window) {
            this._window.visible = false;
        }
    }

    public showAt(param1: boolean, param2: number, param3: number): void {
        let _loc5_: Point = null;
        let _loc4_: any = !this.visible;
        this.show(param1);
        if (param1) {
            _loc5_ = new Point(param2, param3 - this._window.height / 2);
            if (this._SafeStr_4781 != _loc5_) {
                if (_loc4_ && param1 && this._guestRoomData) {
                    this._navigator.trackEventLog("browse.openroominfo", "Results", this._guestRoomData.roomName, this._guestRoomData.flatId);
                }
            }
            this.position = _loc5_;
            this._window.activate();
        }
    }

    public setData(param1: GuestRoomData): void {
        this._guestRoomData = param1;
    }

    public getGlobalRectangle(param1: Rectangle): void {
        this._window.getGlobalRectangle(param1);
    }

    private populate(): void {
        let _loc7_: HabboGroupDetailsData = null;
        let _loc5_: string = null;
        let _loc1_: string = null;
        let _loc10_: number = 0;
        if (this._guestRoomData == null) {
            return;
        }
        let _loc4_: IItemListWindow = castGuarded(this._window.findChildByName("main_content"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        let _loc9_: IItemListWindow = castGuarded(this._window.findChildByName("header_content"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        let _loc6_: IItemListWindow = castGuarded(this._window.findChildByName("bottom_itemlist"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._window.findChildByName("room_owner_region").visible = this._guestRoomData.showOwner;
        this._window.findChildByName("room_group_region").visible = this._guestRoomData.groupBadgeCode != "";
        this._window.findChildByName("room_name").caption = this._guestRoomData.roomName;
        this._window.findChildByName("room_desc").caption = this._guestRoomData.description;
        this._window.findChildByName("owner_name").caption = this._guestRoomData.ownerName;
        this._window.findChildByName("room_owner_region").id = this._guestRoomData.ownerId;
        this._window.findChildByName("room_owner_region").procedure = this.ownerLinkProcedure;
        this._window.findChildByName("favorite_region").procedure = this.roomFavoriteRegionProcedure;
        this._window.findChildByName("home_region").procedure = this.homeRoomRegionProcedure;
        this._window.findChildByName("settings_region").procedure = this.settingsRegionProcedure;
        this._window.findChildByName("settings_container").visible = this._guestRoomData.ownerName == this._navigator.sessionData.userName;
        if (this._navigator.context.configuration.getBoolean("room.report.enabled") && this._guestRoomData.ownerName != this._navigator.sessionData.userName) {
            this._window.findChildByName("report_region").id = this._guestRoomData.ownerId;
            this._window.findChildByName("report_region").procedure = this.reportRegionProcedure;
            this._window.findChildByName("report_region").visible = true;
            this._window.findChildByName("report_container").visible = true;
        } else {
            this._window.findChildByName("report_region").visible = false;
            this._window.findChildByName("report_container").visible = false;
        }
        castGuarded(this._window.findChildByName("midBottom_itemlist"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").arrangeListItems();
        castGuarded(this._window.findChildByName("favorite_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "newnavigator_icon_fav_" + (this.roomIsFavorite ? "yes" : "no");
        castGuarded(this._window.findChildByName("home_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "newnavigator_icon_home_" + (this.roomIsHome ? "yes" : "no");
        let _loc8_: any = this._guestRoomData.groupBadgeCode != "";
        this._window.findChildByName("room_group_badge").visible = _loc8_;
        this._window.findChildByName("room_owner_region").visible = this._guestRoomData.showOwner;
        this._window.findChildByName("room_group_region").visible = _loc8_;
        this._window.findChildByName("room_group_owner_container").visible = !!(_loc8_ || this._guestRoomData.showOwner);
        if (_loc8_) {
            castGuarded(castGuarded(this._window.findChildByName("room_group_badge"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget").badgeId = this._guestRoomData.groupBadgeCode;
            this._window.findChildByName("group_name").caption = this._guestRoomData.groupName;
            this._window.findChildByName("group_name").id = this._guestRoomData.habboGroupId;
            this._window.findChildByName("room_group_region").id = this._guestRoomData.habboGroupId;
            this._window.findChildByName("room_group_region").procedure = this.groupLinkProcedure;
            _loc7_ = this._navigator.getCachedGroupDetails(this._guestRoomData.habboGroupId);
            if (_loc7_) {
                if (_loc7_.isOwner) {
                    castGuarded(this._window.findChildByName("group_mode_admin"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "newnavigator_icon_group_owner";
                } else if (_loc7_.isAdmin) {
                    castGuarded(this._window.findChildByName("group_mode_admin"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "newnavigator_icon_group_admin";
                } else {
                    castGuarded(this._window.findChildByName("group_mode_admin"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = null;
                }
                castGuarded(this._window.findChildByName("group_mode_size"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}guilds/grouptype_icon_" + _loc7_.type + ".png";
                castGuarded(this._window.findChildByName("group_mode_furnish"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = !_loc7_.membersCanDecorate ? null : "${image.library.url}guilds/group_decorate_icon.png";
            }
        } else {
            castGuarded(this._window.findChildByName("group_mode_admin"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = null;
            castGuarded(this._window.findChildByName("group_mode_size"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = null;
            castGuarded(this._window.findChildByName("group_mode_furnish"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = null;
        }
        let _loc3_: any = this._guestRoomData.roomAdExpiresInMin > 0;
        if (_loc3_) {
            _loc5_ = this._navigator.localization.getLocalizationWithParams("navigator.eventsettings.name") + ": " + this._guestRoomData.roomAdName;
            _loc1_ = this._navigator.localization.getLocalizationWithParams("navigator.eventsettings.desc") + ": " + this._guestRoomData.roomAdDescription + "\n";
            _loc1_ += this._navigator.localization.getLocalizationWithParams("roomad.event.expiration_time") + FriendlyTime.getFriendlyTime(this._navigator.localization, this._guestRoomData.roomAdExpiresInMin * 60);
            this._window.findChildByName("event_name").caption = _loc5_;
            this._window.findChildByName("event_desc").caption = _loc1_;
        }
        _loc6_.getListItemByName("event_info").visible = _loc3_;
        _loc9_.arrangeListItems();
        this._SafeStr_4326 = new Array<string>(0).fill(null);
        let _loc2_: IItemListWindow = castGuarded(this._window.findChildByName("tag_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        _loc2_.destroyListItems();
        _loc10_ = 0;
        while (_loc10_ < this._guestRoomData.tags.length) {
            this._SafeStr_4326.push(stringOrNull(this._guestRoomData.tags[_loc10_]));
            _loc2_.addListItem(this.getNewTagItem(stringOrNull(this._guestRoomData.tags[_loc10_]), _loc10_));
            _loc10_++;
        }
        this.clearProperties();
        this.addProperty("properties", "${navigator.roompopup.property.trading}", RoomTradingLevelEnum.getLocalizationKey(this._guestRoomData.tradeMode));
        if (this._navigator.context.configuration.getBoolean("room.ranking.enabled")) {
            this.addProperty("properties", "${navigator.roompopup.property.ranking}", this._guestRoomData.ranking.toString());
        }
        this.addProperty("properties", "${navigator.roompopup.property.max_users}", this._guestRoomData.maxUserCount.toString());
        castGuarded(this._window.findChildByName("room_thumbnail"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "newnavigator_default_room";
        if (this._navigator.sessionData.isPerkAllowed("NAVIGATOR_ROOM_THUMBNAIL_CAMERA")) {
            if (this._guestRoomData.officialRoomPicRef != null) {
                if (this._navigator.getBoolean("new.navigator.official.room.thumbnails.in.amazon")) {
                    castGuarded(this._window.findChildByName("room_thumbnail"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = this._navigator.getProperty("navigator.thumbnail.url_base") + this._guestRoomData.flatId + ".png";
                } else {
                    castGuarded(this._window.findChildByName("room_thumbnail"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = this._navigator.getProperty("image.library.url") + this._guestRoomData.officialRoomPicRef;
                }
            } else {
                castGuarded(this._window.findChildByName("room_thumbnail"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = this._navigator.getProperty("navigator.thumbnail.url_base") + this._guestRoomData.flatId + ".png";
            }
        }
        _loc6_.arrangeListItems();
        _loc4_.arrangeListItems();
    }

    private clearProperties(): void {
        castGuarded(this._window.findChildByName("properties"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").destroyListItems();
    }

    private addProperty(param1: string, param2: string, param3: string): void {
        let _loc5_: IItemListWindow = castGuarded(this._window.findChildByName(param1), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        let _loc4_: IWindowContainer = castGuarded(this._navigator.windowManager.buildFromXML(XML.from(this._navigator.assets.getAssetByName("property_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc4_.findChildByName("property_name").caption = param2;
        _loc4_.findChildByName("property_value").caption = param3;
        _loc5_.addListItem(_loc4_);
    }

    private getNewTagItem(param1: string, param2: number): IWindow {
        let _loc3_: IWindowContainer = castGuarded(this._navigator.windowManager.buildFromXML(XML.from(this._navigator.assets.getAssetByName("tag_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc4_: IRegionWindow = castGuarded(_loc3_.findChildByName("tag_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc4_.id = param2;
        _loc4_.procedure = this.tagRegionProcedure;
        _loc4_.findChildByName("tag_text").caption = "#" + param1;
        return _loc4_;
    }

    private createWindow(): void {
        this._window = castGuarded(this._navigator.windowManager.buildFromXML(XML.from(this._navigator.assets.getAssetByName("room_info_popup_bubble_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private ownerLinkProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._navigator.getExtendedProfile(param2.id);
            this.destroy();
        }
    };

    private groupLinkProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._navigator.getGuildInfo(param2.id);
            this.destroy();
        }
    };

    private reportRegionProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._navigator.habboHelp.reportRoom(this._guestRoomData.flatId, this._guestRoomData.roomName, this._guestRoomData.description);
            this.destroy();
        }
    };

    private tagRegionProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._navigator.performTagSearch(this._SafeStr_4326[param2.id]);
            this.destroy();
        }
    };

    private settingsRegionProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: RoomSettingsCtrl = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = castTo(this._navigator.legacyNavigator, LegacyNavigator).roomSettingsCtrl;
            _loc3_.startRoomSettingsEditFromNavigator(this._guestRoomData.flatId, this._guestRoomData.habboGroupId);
            this.destroy();
        }
    };

    private roomFavoriteRegionProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            if (!this.roomIsFavorite) {
                this._navigator.communication.connection.send(new AddFavouriteRoomMessageComposer(this._guestRoomData.flatId));
                this.roomIsFavorite = true;
            } else {
                this._navigator.communication.connection.send(new DeleteFavouriteRoomMessageComposer(this._guestRoomData.flatId));
                this.roomIsFavorite = false;
            }
            castGuarded(this._window.findChildByName("favorite_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "newnavigator_icon_fav_" + (this.roomIsFavorite ? "yes" : "no");
        }
    };

    private homeRoomRegionProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            if (!this.roomIsHome) {
                this._navigator.communication.connection.send(new UpdateHomeRoomMessageComposer(this._guestRoomData.flatId));
                this.roomIsHome = true;
            }
            castGuarded(this._window.findChildByName("home_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "newnavigator_icon_home_" + (this.roomIsHome ? "yes" : "no");
        }
    };

    private destroy(): void {
        if (this._window) {
            this._window.destroy();
        }
        this._window = null;
    }
}
