import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AddFavouriteRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/AddFavouriteRoomMessageComposer';
import { DeleteFavouriteRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/DeleteFavouriteRoomMessageComposer';
import { RoomEntryUtils } from '@/com/sulake/habbo/navigator/view/search/results/RoomEntryUtils';
import { ViewMode } from '@/com/sulake/habbo/navigator/view/search/ViewMode';
import { RoomEntryUserCountColorUtil } from '@/com/sulake/habbo/window/utils/RoomEntryUserCountColorUtil';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class RoomEntryElementFactory {
    static { registerClassName(this, 'com.sulake.habbo.navigator.view.search.results::RoomEntryElementFactory'); }

    public static readonly TILES_PER_CONTAINER: number = 3;

    constructor(param1: HabboNewNavigator) {
        this._navigator = param1;
        this._viewMode = ViewMode.getViewMode("hotel_view");
    }

    declare private _navigator: HabboNewNavigator;

    declare private _rowEntryTemplate: IWindowContainer;

    declare private _tileEntryTemplate: IWindowContainer;

    declare private _tileContainerTemplate: IItemListWindow;

    declare private _viewMode: number;
    static { (this.prototype as any)._viewMode = 0; }

    public set viewMode(param1: number) {
        this._viewMode = param1;
    }

    public set rowEntryTemplate(param1: IWindowContainer) {
        this._rowEntryTemplate = param1;
    }

    public set tileEntryTemplate(param1: IWindowContainer) {
        this._tileEntryTemplate = param1;
    }

    public set tileContainerTemplate(param1: IItemListWindow) {
        this._tileContainerTemplate = param1;
    }

    public get rowEntryTemplateHeight(): number {
        return this._rowEntryTemplate.height;
    }

    public getNewRowElement(param1: GuestRoomData, param2: number, param3: number = -1): IWindowContainer {
        let _loc4_: IWindowContainer = castGuarded(this._rowEntryTemplate.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (param3 != -1) {
            _loc4_.width = param3;
        }
        castGuarded(_loc4_, isIBorderWindow, "com.sulake.core.window.components.IBorderWindow").color = RoomEntryUtils.getModulatedBackgroundColor(param2, castGuarded(_loc4_, isIBorderWindow, "com.sulake.core.window.components.IBorderWindow").color);
        this.updateCommonEntryElements(_loc4_, param1, false);
        _loc4_.findChildByName("grouphome_icon").visible = param1.groupBadgeCode != "";
        return _loc4_;
    }

    public getNewTileElement(param1: GuestRoomData, param2: number): IWindowContainer {
        let _loc3_: IWindowContainer = castGuarded(this._tileEntryTemplate.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this.updateCommonEntryElements(_loc3_, param1, true);
        if (param1.groupBadgeCode != "") {
            _loc3_.findChildByName("room_group_badge").visible = true;
            castGuarded(castGuarded(_loc3_.findChildByName("room_group_badge"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget").badgeId = param1.groupBadgeCode;
        }
        if (param1.officialRoomPicRef != null) {
            if (this._navigator.getBoolean("new.navigator.official.room.thumbnails.in.amazon")) {
                castGuarded(_loc3_.findChildByName("room_pic_placeholder"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = this._navigator.getProperty("navigator.thumbnail.url_base") + param1.officialRoomPicRef;
            } else {
                castGuarded(_loc3_.findChildByName("room_pic_placeholder"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = this._navigator.getProperty("image.library.url") + param1.officialRoomPicRef;
            }
        } else {
            castGuarded(_loc3_.findChildByName("room_pic_placeholder"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = this._navigator.getProperty("navigator.thumbnail.url_base") + param1.flatId + ".png";
        }
        return _loc3_;
    }

    public getNewTileContainerElement(): IItemListWindow {
        return asGuarded(this._tileContainerTemplate.clone(), isIItemListWindow);
    }

    private updateCommonEntryElements(param1: IWindowContainer, param2: GuestRoomData, param3: boolean): void {
        param1.findChildByName("room_usercount").caption = param2.userCount.toString();
        param1.findChildByName("room_name").caption = ViewMode.isEventViewMode(this._viewMode) ? param2.roomAdName : param2.roomName;
        param1.findChildByName("go_to_room_region").id = param2.flatId;
        param1.findChildByName("go_to_room_region").addEventListener("WME_CLICK", this.onGoButtonClicked);
        param1.findChildByName("go_to_room_region").addEventListener("WME_OVER", param3 ? this.onTileGoToRoomMouseOver : this.onGoToRoomMouseOver);
        param1.findChildByName("info_popup_click_region").id = param2.flatId;
        param1.findChildByName("info_popup_click_region").addEventListener("WME_CLICK", this.onMouseClicked);
        param1.findChildByName("info_popup_click_region").addEventListener("WME_OVER", this.onRoomRoomInfoMouseOver);
        castGuarded(param1.findChildByName("room_info_usercount_border"), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow").color = RoomEntryUserCountColorUtil.getUserCountColor(param2.userCount, param2.maxUserCount);
        castGuarded(param1.findChildByName("doormode_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = RoomEntryUtils.getDoorModeIconAsset(param2.doorMode);
    }

    private onGoButtonClicked = (param1: WindowEvent): void => {
        this._navigator.goToRoom(param1.window.id);
    };

    private onMouseClicked = (param1: WindowEvent): void => {
        let _loc2_: Rectangle = new Rectangle();
        param1.window.getGlobalRectangle(_loc2_);
        this._navigator.view.showRoomInfoBubbleAt(this._navigator.currentResults.findGuestRoom(param1.window.id), _loc2_.right | 0, (_loc2_.bottom - _loc2_.top) / 2 + _loc2_.top | 0);
    };

    private onRoomRoomInfoMouseOver = (param1: WindowEvent): void => {
        let _loc2_: Rectangle = null;
        if (this._navigator.view.isRoomInfoBubbleVisible) {
            _loc2_ = new Rectangle();
            param1.window.getGlobalRectangle(_loc2_);
            this._navigator.view.showRoomInfoBubbleAt(this._navigator.currentResults.findGuestRoom(param1.window.id), _loc2_.right | 0, (_loc2_.bottom - _loc2_.top) / 2 + _loc2_.top | 0, true);
        }
    };

    private onTileGoToRoomMouseOver = (param1: WindowEvent): void => {
        let _loc2_: Rectangle = null;
        if (this._navigator.view.isRoomInfoBubbleVisible) {
            _loc2_ = new Rectangle();
            param1.window.getGlobalRectangle(_loc2_);
            this._navigator.view.showRoomInfoBubbleAt(this._navigator.currentResults.findGuestRoom(param1.window.id), _loc2_.right - 6 | 0, (_loc2_.bottom - _loc2_.top) / 2 + _loc2_.top + 56 | 0, true);
        }
    };

    private onGoToRoomMouseOver = (param1: WindowEvent): void => {
        let _loc2_: Rectangle = null;
        if (this._navigator.view.isRoomInfoBubbleVisible) {
            _loc2_ = new Rectangle();
            param1.window.getGlobalRectangle(_loc2_);
            this._navigator.view.showRoomInfoBubbleAt(this._navigator.currentResults.findGuestRoom(param1.window.id), _loc2_.right + 20 | 0, (_loc2_.bottom - _loc2_.top) / 2 + _loc2_.top | 0, true);
        }
    };

    private onOwnerLinkClicked(param1: WindowEvent): void {
        this._navigator.getExtendedProfile(param1.window.id);
    }

    private onGroupLinkClicked(param1: WindowEvent): void {
        this._navigator.getGuildInfo(param1.window.id);
    }

    private onFavoriteRegionClicked(param1: WindowEvent): void {
        let _loc2_: boolean = this._navigator.legacyNavigator.isRoomFavorite(param1.window.id);
        if (_loc2_) {
            this._navigator.communication.connection.send(new DeleteFavouriteRoomMessageComposer(param1.window.id));
        } else {
            this._navigator.communication.connection.send(new AddFavouriteRoomMessageComposer(param1.window.id));
        }
        castGuarded(castGuarded(param1.window, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").findChildByName("favourite_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = RoomEntryUtils.getFavoriteIcon(!_loc2_);
    }
}
