import { asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import type { RaidProtectionSettingsController } from '@/com/sulake/habbo/navigator/raidprotection/RaidProtectionSettingsController';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AddFavouriteRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/AddFavouriteRoomMessageComposer';
import { DeleteFavouriteRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/DeleteFavouriteRoomMessageComposer';
import { ToggleStaffPickMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/ToggleStaffPickMessageComposer';
import { UpdateHomeRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/UpdateHomeRoomMessageComposer';
import { MuteAllInRoomComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/action/MuteAllInRoomComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { GuildInfoCtrl } from '@/com/sulake/habbo/navigator/GuildInfoCtrl';
import { SimpleAlertView } from '@/com/sulake/habbo/navigator/SimpleAlertView';
import { TagRenderer } from '@/com/sulake/habbo/navigator/TagRenderer';
import { Util } from '@/com/sulake/habbo/navigator/Util';
import { ExtendedProfileIcon } from '@/com/sulake/habbo/utils/ExtendedProfileIcon';

export class RoomInfoViewCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator.inroom::RoomInfoViewCtrl'); }

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _SafeStr_3888: GuildInfoCtrl;

    declare private _window: IFrameWindow;

    declare private _SafeStr_3603: TagRenderer;

    private _embedExpanded: boolean = false;
    private _visible: boolean = false;

    declare private _SafeStr_14330: RaidProtectionSettingsController;

    constructor(param1: IHabboTransitionalNavigator) {
        this._navigator = param1;
        this._SafeStr_3888 = new GuildInfoCtrl(this._navigator);
        this._SafeStr_3603 = new TagRenderer(this._navigator);
    }

    public dispose(): void {
        if (this._SafeStr_14330) {
            this._SafeStr_14330.removeEventListener("RPSE_STATE_CHANGED", this.onRaidProtectionStateChanged);
            this._SafeStr_14330 = null;
        }
        this._navigator = null;
        this._visible = false;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_3603) {
            this._SafeStr_3603.dispose();
            this._SafeStr_3603 = null;
        }
        if (this._SafeStr_3888) {
            this._SafeStr_3888.dispose();
            this._SafeStr_3888 = null;
        }
    }

    public close(): void {
        if (this._window == null) {
            return;
        }
        this._visible = false;
        this._window.dispose();
        this._window = null;
        this._navigator.events.dispatchEvent(new Event("HABBO_ROOM_SETTINGS_TRACKING_EVENT_CLOSED"));
    }

    public reload(): void {
        if (this._visible) {
            this.refresh();
        }
    }

    public toggle(): void {
        if (this._visible) {
            this._visible = false;
            if (this._window) {
                this._window.dispose();
                this._window = null;
            }
        } else {
            this._visible = true;
            this.refresh();
            if (this._window != null) {
                this._window.activate();
            }
        }
    }

    private refresh(): void {
        if (this._navigator.data.enteredGuestRoom == null) {
            return;
        }
        this._SafeStr_3603.useHashTags = true;
        this.prepareWindow();
        Util.hideChildren(this._window.content);
        this.refreshRoomDetails(this._navigator.data.enteredGuestRoom);
        this.refreshEmbed();
        this._SafeStr_3888.refresh(this._window.content, this._navigator.data.enteredGuestRoom);
        this.refreshButtons(this._navigator.data.enteredGuestRoom);
        this.layoutContent();
    }

    private isHome(param1: GuestRoomData): boolean {
        return param1 != null && param1.flatId == this._navigator.data.homeRoomId;
    }

    private refreshEmbed(): void {
        let _loc6_: ITextWindow = null;
        let _loc4_: ITextFieldWindow = null;
        let _loc3_: IWindow = null;
        let _loc1_: IWindowContainer = castGuarded(this.find("embed_info"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc2_: boolean = this._navigator.getBoolean("embed.showInRoomInfo");
        let _loc5_: boolean = this._navigator.data.enteredGuestRoom != null;
        if (_loc5_ && _loc2_) {
            _loc6_ = castGuarded(_loc1_.findChildByName("embed_info_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc4_ = castGuarded(_loc1_.findChildByName("embed_src_txt"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow");
            _loc3_ = _loc1_.findChildByName("embed_info_region");
            _loc1_.visible = true;
            if (this._embedExpanded) {
                _loc4_.text = this.getEmbedData();
            }
            _loc6_.visible = this._embedExpanded;
            _loc4_.visible = this._embedExpanded;
            _loc3_.visible = false;
            _loc1_.height = Util.getLowestPoint(_loc1_) + 5;
            _loc3_.visible = true;
            _loc3_.height = this._embedExpanded ? _loc4_.y : _loc1_.height;
        } else {
            _loc1_.visible = false;
        }
    }

    private refreshRoomDetails(param1: GuestRoomData): void {
        if (param1 == null) {
            return;
        }
        let _loc4_: IWindowContainer = castGuarded(this.find("room_details"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc6_: ITextWindow = castGuarded(this.find("room_name"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc6_.text = param1.roomName;
        _loc6_.height = _loc6_.textHeight + 5 | 0;
        let _loc2_: ITextWindow = castGuarded(this.find("owner_name"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (param1.showOwner && param1.ownerId > 0) {
            this.find("owner_name_cont").visible = true;
            _loc2_.visible = true;
            _loc2_.text = param1.ownerName;
            ExtendedProfileIcon.setUserInfoState(false, _loc4_);
        } else {
            this.find("owner_name_cont").visible = false;
        }
        let _loc3_: ITextWindow = castGuarded(this.find("room_desc"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc3_.text = param1.description;
        this._SafeStr_3603.refreshTags(_loc4_, param1.tags);
        _loc3_.visible = false;
        if (param1.description != "") {
            _loc3_.height = _loc3_.textHeight + 5 | 0;
            _loc3_.visible = true;
        }
        this.find("rating_region").visible = this._navigator.data.canRate;
        castGuarded(this.find("rating_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text = "" + this._navigator.data.currentRoomRating;
        let _loc5_: IWindow = this._window.findChildByName("rating_txt");
        this._window.findChildByName("rating_region").x = _loc5_.x + _loc5_.width + 5;
        this.find("ranking_cont").visible = param1.ranking > 0;
        castGuarded(this.find("ranking_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text = "" + param1.ranking;
        this._navigator.refreshButton(_loc4_, "home", this.isHome(param1), null, 0);
        this._window.findChildByName("make_home_region").visible = !this.isHome(param1);
        this._window.findChildByName("make_favourite_region").visible = !this._navigator.data.currentRoomOwner && !this._navigator.data.isCurrentRoomFavourite();
        this._window.findChildByName("favourite_region").visible = !this._navigator.data.currentRoomOwner && this._navigator.data.isCurrentRoomFavourite();
        this._window.findChildByName("floor_plan_editor_button").visible = this._navigator.data.canEditRoomSettings;
        Util.moveChildrenToColumn(_loc4_, ["room_name", "owner_name_cont", "rating_cont", "ranking_cont", "padding_cont", "tags", "room_desc", "thumbnail_container"], _loc6_.y, 0);
        _loc4_.visible = true;
        _loc4_.height = Util.getLowestPoint(_loc4_);
    }

    private refreshStaffPick(param1: boolean = false): void {
        let _loc2_: IWindow = null;
        if (this._window) {
            _loc2_ = this._window.findChildByName("staff_pick_button");
            if (!this._navigator.data.roomPicker) {
                _loc2_.visible = false;
                return;
            }
            _loc2_.visible = true;
            if (param1) {
                _loc2_.caption = this._navigator.getText(!this._navigator.data.currentRoomIsStaffPick ? "navigator.staffpicks.unpick" : "navigator.staffpicks.pick");
            } else {
                _loc2_.caption = this._navigator.getText(this._navigator.data.currentRoomIsStaffPick ? "navigator.staffpicks.unpick" : "navigator.staffpicks.pick");
            }
        }
    }

    public refreshButtons(param1: GuestRoomData): void {
        let _loc2_: IWindowContainer = null;
        if (this._navigator.data.enteredGuestRoom == null || this._window == null) {
            return;
        }
        this.find("room_settings_button").visible = this._navigator.data.canEditRoomSettings;
        this.refreshRaidProtectionButton(param1);
        this.find("room_filter_button").visible = this._navigator.data.canEditRoomSettings && this._navigator.getBoolean("room.custom.filter.enabled");
        if (!this._navigator.getBoolean("room.report.enabled")) {
            _loc2_ = castGuarded(this.find("room_report_button"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            if (_loc2_) {
                _loc2_.visible = false;
            }
        }
        this.refreshStaffPick();
        let _loc4_: IWindow = this.find("room_muteall_button");
        _loc4_.visible = this._navigator.data.enteredGuestRoom.canMute && this._navigator.getBoolean("room_moderation.mute_all.enabled");
        let _loc3_: boolean = this._navigator.data.enteredGuestRoom.allInRoomMuted;
        _loc4_.caption = _loc3_ ? "${navigator.muteall_on}" : "${navigator.muteall_off}";
        let _loc5_: IRoomSession = this._navigator.roomSessionManager.getSession(this._navigator.data.enteredGuestRoom.flatId);
        this.find("floor_plan_editor_button").visible = _loc5_.roomControllerLevel >= 1;
        this.layoutButtons();
    }

    private refreshRaidProtectionButton(param1: GuestRoomData): void {
        this.find("raid_protection_settings_button").visible = this._SafeStr_14330 != null && this._SafeStr_14330.isFeatureEnabled && this._SafeStr_14330.canManage(param1.flatId);
    }

    private layoutButtons(): void {
        let _loc2_: IWindowContainer = castGuarded(this._window.findChildByName("buttons_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc1_: any[] = ["room_settings_button", "raid_protection_settings_button", "room_filter_button", "floor_plan_editor_button", "staff_pick_button", "room_report_button", "room_muteall_button"];
        Util.moveChildrenToColumn(_loc2_, _loc1_, 0, 3);
        _loc2_.visible = Util.hasVisibleChildren(_loc2_);
        _loc2_.height = Util.getLowestPoint(_loc2_);
    }

    private onRaidProtectionStateChanged = (param1: Event): void => {
        if (this._window == null || this._navigator.data.enteredGuestRoom == null) {
            return;
        }
        this.refreshRaidProtectionButton(this._navigator.data.enteredGuestRoom);
        this.layoutButtons();
        this.layoutContent();
    };

    private layoutContent(): void {
        Util.moveChildrenToColumn(this._window.content, ["room_details", "public_space_details", "guild_info", "embed_info", "buttons_cont"], 0, 3);
        this._window.findChildByName("guild_info").x = 11;
        this._window.height = Util.getLowestPoint(this._window.content) + 45;
    }

    private prepareWindow(): void {
        let _loc1_: string = null;
        let _loc3_: string = null;
        this._visible = true;
        if (this._SafeStr_14330 == null) {
            this._SafeStr_14330 = this._navigator.raidProtectionSettingsController;
            if (this._SafeStr_14330 != null) {
                this._SafeStr_14330.addEventListener("RPSE_STATE_CHANGED", this.onRaidProtectionStateChanged);
            }
        }
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._navigator.getXmlWindow("iro_room_details_framed"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.center();
        this.addMouseClickListener(this.find("make_favourite_region"), this.onAddFavouriteClick);
        this.addMouseClickListener(this.find("favourite_region"), this.onRemoveFavouriteClick);
        this.addMouseClickListener(this.find("room_settings_button"), this.onRoomSettingsClick);
        this.addMouseClickListener(this.find("raid_protection_settings_button"), this.onRaidProtectionSettingsClick);
        this.addMouseClickListener(this.find("room_filter_button"), this.onRoomFilterButtonClick);
        this.addMouseClickListener(this.find("floor_plan_editor_button"), this.onFloorPlanEditorButtonClick);
        this.addMouseClickListener(this.find("room_muteall_button"), this.onMuteAllClick);
        this.addMouseClickListener(this.find("make_home_region"), this.onMakeHomeClick);
        this.addMouseClickListener(this.find("remove_rights_region"), this.onRemoveRights);
        this.addMouseClickListener(this.find("embed_src_txt"), this.onEmbedSrcClick);
        this.addMouseClickListener(this.find("staff_pick_button"), this.onStaffPick);
        this.addMouseClickListener(this.find("room_report_button"), this.onRoomReport);
        this._navigator.refreshButton(castGuarded(this.find("remove_rights_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow"), "remove_rights", this._navigator.hasRoomRightsButIsNotOwner(this._navigator.data.enteredGuestRoom.flatId), null, 0);
        this._navigator.refreshButton(castGuarded(this.find("make_home_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow"), "make_home", true, null, 0);
        this._navigator.refreshButton(castGuarded(this.find("favourite_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow"), "favourite", true, null, 0);
        this._navigator.refreshButton(castGuarded(this.find("make_favourite_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow"), "make_favourite", true, null, 0);
        this._navigator.refreshButton(castGuarded(this.find("embed_info"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"), "icon_weblink", true, null, 0);
        this.addMouseClickListener(this._window.findChildByTag("close"), this.onCloseButtonClick);
        let _loc2_: IWindowContainer = castGuarded(this._window.findChildByName("owner_name_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc2_.procedure = this.onOwnerName;
        Util.layoutChildrenInArea(_loc2_, 1000, 10, 2, 5);
        this.setupLabelAndValue("rating_cont", "rating_caption", "rating_txt");
        this.setupLabelAndValue("ranking_cont", "ranking_caption", "ranking_txt");
        let _loc4_: IWindowContainer = castGuarded(this.find("embed_info"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc5_: ITextWindow = castGuarded(this.find("embed_info_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc5_.height = _loc5_.textHeight + 5 | 0;
        Util.moveChildrenToColumn(_loc4_, ["embed_info_txt", "embed_src_txt"], _loc5_.y, 2);
        _loc4_.height = Util.getLowestPoint(_loc4_) + 5;
        _loc4_.findChildByName("embed_info_region").procedure = this.onEmbedInfo;
        if (this._navigator.sessionData.isPerkAllowed("NAVIGATOR_ROOM_THUMBNAIL_CAMERA")) {
            this._window.findChildByName("add_thumbnail_region").visible = this._navigator.data.canEditRoomSettings;
            if (this._navigator.data.canEditRoomSettings) {
                this.addMouseClickListener(this.find("add_thumbnail_region"), this.onAddRoomThumbnail);
            }
            _loc3_ = "";
            if (this._navigator.data.enteredGuestRoom.officialRoomPicRef != null) {
                if (this._navigator.getBoolean("new.navigator.official.room.thumbnails.in.amazon")) {
                    _loc1_ = this._navigator.getProperty("navigator.thumbnail.url_base");
                    _loc3_ = _loc1_ + this._navigator.data.enteredGuestRoom.flatId + ".png";
                } else {
                    _loc3_ = this._navigator.getProperty("image.library.url") + this._navigator.data.enteredGuestRoom.officialRoomPicRef;
                }
            } else {
                _loc1_ = this._navigator.getProperty("navigator.thumbnail.url_base");
                _loc3_ = _loc1_ + this._navigator.data.enteredGuestRoom.flatId + ".png";
            }
            castGuarded(this._window.findChildByName("thumbnail_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = _loc3_;
        } else {
            this._window.findChildByName("thumbnail_container").visible = false;
        }
    }

    private setupLabelAndValue(param1: string, param2: string, param3: string): void {
        let _loc4_: IWindowContainer = castGuarded(this.find(param1), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc5_: ITextWindow = castGuarded(_loc4_.findChildByName(param2), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc5_.width = _loc5_.textWidth | 0;
        Util.moveChildrenToRow(_loc4_, [param2, param3], _loc5_.x, _loc5_.y, 3);
    }

    private addMouseClickListener(param1: IWindow, param2: (...args: any[]) => any): void {
        if (param1 != null) {
            param1.addEventListener("WME_CLICK", param2);
        }
    }

    private find(param1: string): IWindow {
        let _loc2_: IWindow = this._window.findChildByName(param1);
        if (_loc2_ == null) {
            throw new Error("Window element with name: " + param1 + " cannot be found!");
        }
        return _loc2_;
    }

    public onAddFavouriteClick = (param1: WindowEvent): void => {
        let _loc2_: SimpleAlertView = null;
        if (this._navigator.data.enteredGuestRoom == null) {
            return;
        }
        if (this._navigator.data.isFavouritesFull()) {
            _loc2_ = new SimpleAlertView(this._navigator, "${navigator.favouritesfull.title}", "${navigator.favouritesfull.body}");
            _loc2_.show();
        } else {
            this._navigator.trackGoogle("roomInfo", "addFavourite");
            this._navigator.send(new AddFavouriteRoomMessageComposer(this._navigator.data.enteredGuestRoom.flatId));
        }
    };

    public onRemoveFavouriteClick = (param1: WindowEvent): void => {
        if (this._navigator.data.enteredGuestRoom == null) {
            return;
        }
        this._navigator.trackGoogle("roomInfo", "removeFavourite");
        this._navigator.send(new DeleteFavouriteRoomMessageComposer(this._navigator.data.enteredGuestRoom.flatId));
    };

    private onRoomSettingsClick = (param1: WindowEvent): void => {
        let _loc2_: GuestRoomData = this._navigator.data.enteredGuestRoom;
        if (_loc2_ == null) {
            Logger.log("No entered room data?!");
            return;
        }
        this._navigator.trackGoogle("roomInfo", "editRoomSettings");
        this._navigator.roomSettingsCtrl.startRoomSettingsEdit(_loc2_.flatId);
        this.close();
    };

    private onRoomFilterButtonClick = (param1: WindowEvent): void => {
        let _loc2_: GuestRoomData = this._navigator.data.enteredGuestRoom;
        if (_loc2_ == null) {
            Logger.log("No entered room data?!");
            return;
        }
        this._navigator.trackGoogle("roomInfo", "editRoomFilter");
        this._navigator.roomFilterCtrl.startRoomFilterEdit(_loc2_.flatId);
        this.close();
    };

    private onFloorPlanEditorButtonClick = (param1: WindowEvent): void => {
        this._navigator.trackGoogle("roomInfo", "floorPlanEditor");
        this._navigator.windowManager.displayFloorPlanEditor();
        this.close();
    };

    private onMuteAllClick = (param1: WindowEvent): void => {
        this._navigator.send(new MuteAllInRoomComposer());
    };

    private onMakeHomeClick = (param1: WindowEvent): void => {
        let _loc2_: GuestRoomData = this._navigator.data.enteredGuestRoom;
        if (_loc2_ == null) {
            Logger.log("No entered room data?!");
            return;
        }
        Logger.log("SETTING HOME ROOM TO: " + _loc2_.flatId);
        this._navigator.trackGoogle("roomInfo", "makeHome");
        this._navigator.send(new UpdateHomeRoomMessageComposer(_loc2_.flatId));
    };

    private onRaidProtectionSettingsClick = (param1: WindowEvent): void => {
        let _loc2_: GuestRoomData = this._navigator.data.enteredGuestRoom;
        if (_loc2_ == null) {
            return;
        }
        (asInstanceOf(this._navigator.windowManager, Component)).context.createLinkEvent("navigator/raidprotection/" + _loc2_.flatId);
        this.close();
    };

    private onCloseButtonClick = (param1: WindowEvent): void => {
        this.hideInfo(null);
    };

    private onRemoveRights = (param1: WindowEvent): void => {
        this._navigator.removeRoomRights(this._navigator.enteredGuestRoomData.flatId);
        this.find("remove_rights_region").visible = false;
    };

    private onStaffPick = (param1: WindowEvent): void => {
        this.refreshStaffPick(true);
        this._navigator.send(new ToggleStaffPickMessageComposer(this._navigator.data.enteredGuestRoom.flatId, this._navigator.data.currentRoomIsStaffPick));
    };

    private onRoomReport = (param1: WindowEvent): void => {
        this._navigator.trackGoogle("roomInfo", "reportRoom");
        let _loc2_: GuestRoomData = this._navigator.data.enteredGuestRoom;
        this._navigator.habboHelp.reportRoom(_loc2_.flatId, _loc2_.roomName, _loc2_.description);
        this.close();
    };

    private onEmbedSrcClick = (param1: WindowEvent): void => {
        let _loc2_: ITextFieldWindow = castGuarded(this.find("embed_src_txt"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow");
        _loc2_.setSelection(0, _loc2_.text.length);
        this._navigator.trackGoogle("roomInfo", "embedSrc");
    };

    private onAddRoomThumbnail = (param1: WindowEvent): void => {
        (asInstanceOf(this._navigator.windowManager, Component)).context.createLinkEvent("roomThumbnailCamera/open");
        this.close();
        let _loc2_: string = this._navigator.getProperty("navigator.thumbnail.url_base") + this._navigator.data.enteredGuestRoom.flatId + ".png";
        this._navigator.windowManager.resourceManager.removeAsset(_loc2_);
        this._navigator.trackGoogle("roomInfo", "addThumbnail");
    };

    private hideInfo(param1: Event): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._visible = false;
    }

    private getEmbedData(): string {
        let _loc2_: string = null;
        let _loc3_: string = null;
        if (this._navigator.data.enteredGuestRoom != null) {
            _loc2_ = "private";
            _loc3_ = "" + this._navigator.data.enteredGuestRoom.flatId;
        }
        let _loc1_: string = this._navigator.getProperty("user.hash");
        this._navigator.registerParameter("navigator.embed.src", "roomType", _loc2_);
        this._navigator.registerParameter("navigator.embed.src", "embedCode", _loc1_);
        this._navigator.registerParameter("navigator.embed.src", "roomId", _loc3_);
        return this._navigator.getText("navigator.embed.src");
    }

    private onEmbedInfo = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._embedExpanded = !this._embedExpanded;
        this.refresh();
    };

    private onOwnerName = (param1: WindowEvent, param2: IWindow): void => {
        ExtendedProfileIcon.onEntry(param1, param2);
        if (param1.type == "WME_CLICK") {
            this._navigator.trackGoogle("roomInfo", "extendedProfile");
            this._navigator.trackGoogle("extendedProfile", "navigator_roomInfo");
            this._navigator.send(new GetExtendedProfileMessageComposer(this._navigator.data.enteredGuestRoom.ownerId));
        }
    };
}
