import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import type { ISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { FlatCategory } from '@/com/sulake/habbo/communication/messages/incoming/navigator/FlatCategory';
import type { GuestRoomSearchResultData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomSearchResultData';
import type { FlatControllerData } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/FlatControllerData';
import type { RoomSettingsData } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomSettingsData';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import { isISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { isITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RemoveAllRightsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/action/RemoveAllRightsMessageComposer';
import { UnbanUserFromRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/action/UnbanUserFromRoomMessageComposer';
import { DeleteRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/roomsettings/DeleteRoomMessageComposer';
import { GetBannedUsersFromRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/roomsettings/GetBannedUsersFromRoomMessageComposer';
import { GetFlatControllersMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/roomsettings/GetFlatControllersMessageComposer';
import { GetRoomSettingsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/roomsettings/GetRoomSettingsMessageComposer';
import { SaveableRoomSettingsData } from '@/com/sulake/habbo/communication/messages/outgoing/roomsettings/SaveableRoomSettingsData';
import { SaveRoomSettingsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/roomsettings/SaveRoomSettingsMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { BanListCtrl } from '@/com/sulake/habbo/navigator/roomsettings/BanListCtrl';
import { ConfirmDialogView } from '@/com/sulake/habbo/navigator/roomsettings/ConfirmDialogView';
import { UserListCtrl } from '@/com/sulake/habbo/navigator/roomsettings/UserListCtrl';
import { TextFieldManager } from '@/com/sulake/habbo/navigator/TextFieldManager';
import { Util } from '@/com/sulake/habbo/navigator/Util';

export class RoomSettingsCtrl implements IDisposable, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.navigator.roomsettings::RoomSettingsCtrl'); }

    private static readonly TAB_BASIC: number = 1;
    private static readonly TAB_ACCESS_RIGHTS: number = 2;
    private static readonly TAB_ROOM_RIGHTS: number = 3;
    private static readonly TAB_CLUB_AND_CHAT: number = 4;
    private static readonly TAB_MODERATION: number = 5;
    private static readonly MIN_IDLE_SLEEP_TIMEOUT_SECONDS: number = 30;
    private static readonly MAX_IDLE_SLEEP_TIMEOUT_SECONDS: number = 3600;
    private static readonly MIN_IDLE_AUTOKICK_TIMEOUT_SECONDS: number = 60;
    private static readonly MAX_IDLE_AUTOKICK_TIMEOUT_SECONDS: number = 36000;
    private static readonly MIN_IDLE_AUTOKICK_OFFSET_SECONDS: number = 30;
    private static readonly HC_MAXIMUM_ROOM_VISITORS: number = 75;
    private static readonly MAXIMUM_ROOM_VISITORS: number = 50;

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _originalData: RoomSettingsData;

    declare private _savedFlatId: number;
    static { (this.prototype as any)._savedFlatId = 0; }

    declare private _window: IFrameWindow;

    private _currentTab: number = 1;

    declare private _populating: boolean;
    static { (this.prototype as any)._populating = false; }

    declare private _usersWithRightsListCtrl: UserListCtrl;

    declare private _friendsListCtrl: UserListCtrl;

    declare private _confirmDialog: ConfirmDialogView;

    declare private _nameInput: TextFieldManager;

    declare private _descInput: TextFieldManager;

    declare private _tag1Input: TextFieldManager;

    declare private _tag2Input: TextFieldManager;

    declare private _passwordInput: TextFieldManager;

    declare private _passwordConfirmInput: TextFieldManager;

    declare private _allowPetsCheckBox: ICheckBoxWindow;

    declare private _allowFoodConsumeCheckBox: ICheckBoxWindow;

    declare private _muteAllPetsCheckBox: ICheckBoxWindow;

    declare private _allowWalkThroughCheckBox: ICheckBoxWindow;

    declare private _hideWallsCheckBox: ICheckBoxWindow;

    declare private _hideWallsText: ITextWindow;

    declare private _doNotLeaveOnDoorTileCheckBox: ICheckBoxWindow;

    declare private _doNotLeaveOnDoorTileText: ITextWindow;

    declare private _idleSleepCheckBox: ICheckBoxWindow;

    declare private _idleSleepText: ITextWindow;

    declare private _idleSleepTimeoutInput: TextFieldManager;

    declare private _idleSleepTimeoutLabel: ITextWindow;

    declare private _idleAutokickCheckBox: ICheckBoxWindow;

    declare private _idleAutokickText: ITextWindow;

    declare private _idleAutokickTimeoutInput: TextFieldManager;

    declare private _idleAutokickTimeoutLabel: ITextWindow;

    declare private _wallThicknessDropMenu: IDropMenuWindow;

    declare private _floorThicknessDropMenu: IDropMenuWindow;

    declare private _tabContext: ITabContextWindow;

    declare private _floodFilterDropMenu: IDropMenuWindow;

    declare private _bannedUsersListCtrl: BanListCtrl;

    declare private _useUnifiedWindow: boolean;
    static { (this.prototype as any)._useUnifiedWindow = false; }

    private _removeTabsForNavigatorView: boolean = false;

    declare private roomModerationMuteSettings: any[];

    declare private roomModerationBanSettings: any[];

    declare private roomModerationKickSettings: any[];

    constructor(param1: IHabboTransitionalNavigator) {
        this._navigator = param1;
        this._usersWithRightsListCtrl = new UserListCtrl(this._navigator, false);
        this._friendsListCtrl = new UserListCtrl(this._navigator, true);
        this._bannedUsersListCtrl = new BanListCtrl(this._navigator);
    }

    private static get useHashTags(): boolean {
        return true;
    }

    private static setTag(param1: TextFieldManager, param2: string): void {
        param1.setText(param2 == null ? "" : (RoomSettingsCtrl.useHashTags ? "#" : "") + param2);
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._originalData = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._usersWithRightsListCtrl) {
            this._usersWithRightsListCtrl.dispose();
            this._usersWithRightsListCtrl = null;
        }
        if (this._friendsListCtrl) {
            this._friendsListCtrl.dispose();
            this._friendsListCtrl = null;
        }
        if (this._bannedUsersListCtrl) {
            this._bannedUsersListCtrl.dispose();
            this._bannedUsersListCtrl = null;
        }
        if (this._confirmDialog) {
            this._confirmDialog.dispose();
            this._confirmDialog = null;
        }
        this._nameInput = null;
        this._descInput = null;
        this._tag1Input = null;
        this._tag2Input = null;
        this._passwordInput = null;
        this._passwordConfirmInput = null;
        this._allowPetsCheckBox = null;
        this._allowFoodConsumeCheckBox = null;
        this._muteAllPetsCheckBox = null;
        if (this._allowWalkThroughCheckBox) {
            this._allowWalkThroughCheckBox.removeEventListener("WME_OVER", this.onWalkThroughMouseOver);
            this._allowWalkThroughCheckBox = null;
        }
        if (this._floodFilterDropMenu) {
            this._floodFilterDropMenu.removeEventListener("WME_OVER", this.onFloodFilterMouseOver);
            this._floodFilterDropMenu = null;
        }
        this._hideWallsCheckBox = null;
        this._hideWallsText = null;
        this._doNotLeaveOnDoorTileCheckBox = null;
        this._doNotLeaveOnDoorTileText = null;
        this._idleSleepCheckBox = null;
        this._idleSleepText = null;
        this._idleSleepTimeoutInput = null;
        this._idleSleepTimeoutLabel = null;
        this._idleAutokickCheckBox = null;
        this._idleAutokickText = null;
        this._idleAutokickTimeoutInput = null;
        this._idleAutokickTimeoutLabel = null;
        this._wallThicknessDropMenu = null;
        this._floorThicknessDropMenu = null;
        this._navigator = null;
    }

    public get disposed(): boolean {
        return this._navigator == null;
    }

    public startRoomSettingsEdit(param1: number): void {
        this.close();
        this._flatId = param1;
        this._groupId = this._navigator.data.enteredGuestRoom.habboGroupId;
        this._navigator.send(new GetRoomSettingsMessageComposer(this._flatId));
        this._navigator.tracking.trackEventLogOncePerSession("Tutorial", "interaction", "viewed.room.settings");
        this._navigator.events.dispatchEvent(new Event("HABBO_ROOM_SETTINGS_TRACKING_EVENT_DEFAULT"));
    }

    public startRoomSettingsEditFromNavigator(param1: number, param2: number): void {
        this.close();
        this._flatId = param1;
        this._groupId = param2;
        this._navigator.send(new GetRoomSettingsMessageComposer(this._flatId));
        this._navigator.tracking.trackEventLogOncePerSession("Tutorial", "interaction", "viewed.room.settings");
        this._navigator.events.dispatchEvent(new Event("HABBO_ROOM_SETTINGS_TRACKING_EVENT_DEFAULT"));
    }

    public onRoomSettings(param1: RoomSettingsData): void {
        if (param1.roomId != this._flatId) {
            return;
        }
        this._originalData = param1;
        this.refresh();
        this.populateForm();
        this._window.visible = true;
        this._window.invalidate();
        this._window.activate();
    }

    public onFlatControllers(param1: number, param2: any[]): void {
        if (this.isAcceptFlatControllerUpdate(param1)) {
            for (const _loc3_ of param2 ?? []) {
                this._originalData.setFlatController(_loc3_.userId | 0, _loc3_);
            }
            this.checkFlatControllerRefresh();
        }
    }

    public onFlatControllerAdded(param1: number, param2: FlatControllerData): void {
        if (this.isAcceptFlatControllerUpdate(param1)) {
            this._originalData.setFlatController(param2.userId, param2);
            this.checkFlatControllerRefresh();
        }
    }

    public onFlatControllerRemoved(param1: number, param2: number): void {
        if (this.isAcceptFlatControllerUpdate(param1)) {
            this._originalData.setFlatController(param2, null);
            this.checkFlatControllerRefresh();
        }
    }

    public onBannedUsersFromRoom(param1: number, param2: any[]): void {
        if (this.isAcceptBannedUsersFromRoomUpdate(param1)) {
            for (const _loc3_ of param2 ?? []) {
                this._originalData.setBannedUser(_loc3_.userId | 0, _loc3_);
            }
            this.checkBannedUsersFromRoomRefresh();
        }
    }

    public onUserUnbannedFromRoom(param1: number, param2: number): void {
        if (this.isAcceptBannedUsersFromRoomUpdate(param1)) {
            this._originalData.setBannedUser(param2, null);
            this.checkBannedUsersFromRoomRefresh();
        }
    }

    public onFriendListUpdate(): void {
        this.checkFlatControllerRefresh();
    }

    private isAcceptFlatControllerUpdate(param1: number): boolean {
        return param1 == this._flatId && this._originalData != null;
    }

    private isAcceptBannedUsersFromRoomUpdate(param1: number): boolean {
        return param1 == this._flatId && this._originalData != null;
    }

    private checkFlatControllerRefresh(): void {
        if (this._window != null && Boolean(this._window.visible) && this.isContentVisible(3)) {
            this.refresh();
        }
    }

    private checkBannedUsersFromRoomRefresh(): void {
        if (this._window != null && Boolean(this._window.visible) && this.isContentVisible(5)) {
            this.refresh();
        }
    }

    public onRoomSettingsSaveError(param1: number, param2: number, param3: string): void {
        if (param1 != this._flatId || this._savedFlatId < 1) {
            return;
        }
        this._savedFlatId = 0;
        if (param2 == 7) {
            this.switchToTab(1);
            this._nameInput.displayError("${navigator.roomsettings.roomnameismandatory}");
        } else if (param2 == 8) {
            this.switchToTab(1);
            this._nameInput.displayError("${navigator.roomsettings.unacceptablewords}");
        } else if (param2 == 10) {
            this.switchToTab(1);
            this._descInput.displayError("${navigator.roomsettings.unacceptablewords}");
        } else if (param2 == 11) {
            this.switchToTab(1);
            this.setTagError(this._tag1Input, param3, "${navigator.roomsettings.unacceptablewords}");
            this.setTagError(this._tag2Input, param3, "${navigator.roomsettings.unacceptablewords}");
        } else if (param2 == 12) {
            this.switchToTab(1);
            this.setTagError(this._tag1Input, param3, "${navigator.roomsettings.nonuserchoosabletag}");
            this.setTagError(this._tag2Input, param3, "${navigator.roomsettings.nonuserchoosabletag}");
        } else if (param2 == 5) {
            this.switchToTab(2);
            this._passwordInput.displayError("${navigator.roomsettings.passwordismandatory}");
        } else if (param2 == 13) {
            this.switchToTab(1);
            this.setTagError(this._tag1Input, param3, "${navigator.roomsettings.toomanycharacters}");
            this.setTagError(this._tag2Input, param3, "${navigator.roomsettings.toomanycharacters}");
        } else if (param2 == 16) {
            if (!this.handleCustomRoomSettingSaveError(param3)) {
                this.switchToTab(1);
                this._nameInput.displayError("Update failed: error " + param2);
            }
        } else {
            this.switchToTab(1);
            this._nameInput.displayError("Update failed: error " + param2);
        }
        this.refresh();
    }

    private switchToTab(param1: number): void {
        this._currentTab = param1;
        this._tabContext.selector.setSelected(castGuarded(this._window.findChildByName("tab_" + param1), isISelectableWindow, "com.sulake.core.window.components.ISelectableWindow"));
        this._window.helpPage = this.getHelpPageWithTab(this._currentTab);
    }

    private isContentVisible(param1: number): boolean {
        return this._useUnifiedWindow || this._currentTab == param1;
    }

    private setTagError(param1: TextFieldManager, param2: string, param3: string): void {
        if (param2 == param1.getText().toLowerCase()) {
            param1.displayError(param3);
        }
    }

    public close(): void {
        this._flatId = 0;
        this._groupId = 0;
        this._originalData = null;
        this._savedFlatId = 0;
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        if (this._confirmDialog != null) {
            this._confirmDialog.dispose();
            this._confirmDialog = null;
        }
    }

    private clearErrors(): void {
        this._nameInput.clearErrors();
        this._descInput.clearErrors();
        this._tag1Input.clearErrors();
        this._tag2Input.clearErrors();
        this._passwordInput.clearErrors();
        this._passwordConfirmInput.clearErrors();
        if (this._idleSleepTimeoutInput) {
            this._idleSleepTimeoutInput.clearErrors();
        }
        if (this._idleAutokickTimeoutInput) {
            this._idleAutokickTimeoutInput.clearErrors();
        }
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        if (this._window == null) {
            this._window = castGuarded(this._navigator.getXmlWindow("ros_room_settings"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        }
        if (!this._useUnifiedWindow) {
            this._window.findChildByName("tab_1").procedure = this.onTab;
            this._window.findChildByName("tab_2").procedure = this.onTab;
            this._window.findChildByName("tab_3").procedure = this.onTab;
            this._window.findChildByName("tab_4").procedure = this.onTab;
            this._window.findChildByName("tab_5").procedure = this.onTab;
        }
        this._window.findChildByName("builders_faq_button").procedure = this.onBuildersClubFaqButtonClick;
        this.showDeleteButton();
        let _loc3_: IRadioButtonWindow = asGuarded(this._window.findChildByName("doormode_password"), isIRadioButtonWindow);
        _loc3_.addEventListener("WE_SELECT", this.onDoorModePasswordSelect);
        _loc3_.addEventListener("WE_UNSELECT", this.onDoorModePasswordUnselect);
        this._window.findChildByTag("close").addEventListener("WME_CLICK", this.onClose);
        this.getRemoveAllFlatCtrlsButton().addEventListener("WME_CLICK", this.onRemoveAllFlatCtrlsClick);
        this._window.findChildByName("filter_users_input").addEventListener("WE_CHANGE", this.onUserFilterChange);
        this._removeTabsForNavigatorView = !this._navigator.data.enteredGuestRoom || this._navigator.data.enteredGuestRoom.flatId != this._originalData.roomId;
        if (this._removeTabsForNavigatorView) {
            this._window.findChildByName("remove_link_region").visible = false;
        } else {
            this._window.findChildByName("remove_link_region").procedure = this.onDeleteButtonClick;
        }
        this._nameInput = new TextFieldManager(this._navigator, castGuarded(this._window.findChildByName("room_name"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow"), 60);
        this._descInput = new TextFieldManager(this._navigator, castGuarded(this._window.findChildByName("description"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow"), 255);
        this._tag1Input = new TextFieldManager(this._navigator, castGuarded(this._window.findChildByName("tag1"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow"), 30);
        this._tag2Input = new TextFieldManager(this._navigator, castGuarded(this._window.findChildByName("tag2"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow"), 30);
        this._passwordInput = new TextFieldManager(this._navigator, castGuarded(this._window.findChildByName("password"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow"), 30);
        this._passwordConfirmInput = new TextFieldManager(this._navigator, castGuarded(this._window.findChildByName("password_confirm"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow"), 30);
        this._allowPetsCheckBox = castGuarded(this._window.findChildByName("allow_pets_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        this._allowFoodConsumeCheckBox = castGuarded(this._window.findChildByName("allow_foodconsume_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        this._muteAllPetsCheckBox = castGuarded(this._window.findChildByName("mute_all_pets_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        this._allowWalkThroughCheckBox = castGuarded(this._window.findChildByName("allow_walk_through_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        this._allowWalkThroughCheckBox.addEventListener("WME_OVER", this.onWalkThroughMouseOver);
        this._hideWallsCheckBox = castGuarded(this._window.findChildByName("hide_walls_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        this._hideWallsText = asGuarded(this._window.findChildByName("hide_walls_text"), isITextWindow);
        this._doNotLeaveOnDoorTileCheckBox = castGuarded(this._window.findChildByName("do_not_leave_on_door_tile_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        this._doNotLeaveOnDoorTileText = asGuarded(this._window.findChildByName("do_not_leave_on_door_tile_text"), isITextWindow);
        this._idleSleepCheckBox = castGuarded(this._window.findChildByName("idle_sleep_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        this._idleSleepText = asGuarded(this._window.findChildByName("idle_sleep_text"), isITextWindow);
        this._idleSleepTimeoutInput = new TextFieldManager(this._navigator, castGuarded(this._window.findChildByName("idle_sleep_timeout"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow"), 5);
        this._idleSleepTimeoutInput.input.restrict = "0-9";
        this._idleSleepTimeoutLabel = asGuarded(this._window.findChildByName("idle_sleep_timeout_label"), isITextWindow);
        this._idleAutokickCheckBox = castGuarded(this._window.findChildByName("idle_autokick_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        this._idleAutokickText = asGuarded(this._window.findChildByName("idle_autokick_text"), isITextWindow);
        this._idleAutokickTimeoutInput = new TextFieldManager(this._navigator, castGuarded(this._window.findChildByName("idle_autokick_timeout"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow"), 5);
        this._idleAutokickTimeoutInput.input.restrict = "0-9";
        this._idleAutokickTimeoutLabel = asGuarded(this._window.findChildByName("idle_autokick_timeout_label"), isITextWindow);
        this._wallThicknessDropMenu = castGuarded(this._window.findChildByName("wall_thickness"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        this._floorThicknessDropMenu = castGuarded(this._window.findChildByName("floor_thickness"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        this._tabContext = castGuarded(this._window.findChildByName("tab_context"), isITabContextWindow, "com.sulake.core.window.components.ITabContextWindow");
        this._floodFilterDropMenu = castGuarded(this._window.findChildByName("chat_flood_sensitivity"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        this._floodFilterDropMenu.addEventListener("WME_OVER", this.onFloodFilterMouseOver);
        let _loc6_: any[] = [this._nameInput, this._descInput, this._tag1Input, this._tag2Input, this._passwordInput, this._passwordConfirmInput, this._idleSleepTimeoutInput, this._idleAutokickTimeoutInput];
        for (const _loc5_ of _loc6_ ?? []) {
            _loc5_.input.addEventListener("WE_UNFOCUSED", this.onUnfocus);
        }
        let _loc9_: any[] = [this._window.findChildByName("categories"), this._window.findChildByName("maxvisitors"), this._window.findChildByName("tradesettings"), this._allowPetsCheckBox, this._allowFoodConsumeCheckBox, this._muteAllPetsCheckBox, this._allowWalkThroughCheckBox, this._hideWallsCheckBox, this._wallThicknessDropMenu, this._floorThicknessDropMenu, this._floodFilterDropMenu];
        for (const _loc7_ of _loc9_ ?? []) {
            _loc7_.addEventListener("WE_SELECTED", this.onUnfocus);
            _loc7_.addEventListener("WE_UNSELECTED", this.onUnfocus);
        }
        let _loc1_: any[] = [this._doNotLeaveOnDoorTileCheckBox, this._idleSleepCheckBox, this._idleAutokickCheckBox];
        for (const _loc8_ of _loc1_ ?? []) {
            _loc8_.addEventListener("WE_SELECTED", this.onRoomBehaviorSettingsChanged);
            _loc8_.addEventListener("WE_UNSELECTED", this.onRoomBehaviorSettingsChanged);
        }
        this._window.findChildByName("doormode_open").addEventListener("WE_SELECTED", this.onUnfocus);
        this._window.findChildByName("doormode_doorbell").addEventListener("WE_SELECTED", this.onUnfocus);
        this._window.findChildByName("doormode_password").addEventListener("WE_SELECTED", this.onUnfocus);
        this._window.findChildByName("doormode_invisible").addEventListener("WE_SELECTED", this.onUnfocus);
        let _loc2_: any[] = [this._window.findChildByName("moderation_mute_none"), this._window.findChildByName("moderation_mute_rights"), this._window.findChildByName("moderation_kick_none"), this._window.findChildByName("moderation_kick_rights"), this._window.findChildByName("moderation_kick_all"), this._window.findChildByName("moderation_ban_none"), this._window.findChildByName("moderation_ban_rights")];
        for (const _loc4_ of _loc2_ ?? []) {
            _loc4_.addEventListener("WE_SELECT", this.onUnfocus);
        }
        this.getPasswordContainer().visible = false;
        this._window.findChildByName("remove_icon").x = this._window.findChildByName("remove_link").x - 15;
        this._window.findChildByName("tradesettings_label").visible = true;
        this._window.findChildByName("tradesettings").visible = true;
        this._window.findChildByName("moderation_unban_btn").addEventListener("WME_CLICK", this.onUnbanClick);
        this._window.center();
        this.switchToTab(1);
    }

    private refreshNavigatorTabs(): void {
        let _loc3_: number = 0;
        let _loc1_: ITabButtonWindow = null;
        let _loc2_: boolean = false;
        this._tabContext = castGuarded(this._window.findChildByName("tab_context"), isITabContextWindow, "com.sulake.core.window.components.ITabContextWindow");
        _loc3_ = 0;
        while (_loc3_ < this._tabContext.numTabItems) {
            _loc1_ = this._tabContext.getTabItemAt(_loc3_ >>> 0);
            _loc2_ = this._removeTabsForNavigatorView && (_loc1_.id == 2 || _loc1_.id == 3);
            _loc1_.visible = !_loc2_;
            _loc3_++;
        }
        this._tabContext.selector.setSelected(castGuarded(this._window.findChildByName("tab_" + this._currentTab), isISelectableWindow, "com.sulake.core.window.components.ISelectableWindow"));
    }

    private resizeTabs(): void {
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: ITabButtonWindow = null;
        let _loc3_: boolean = false;
        let _loc6_: number = 0;
        _loc5_ = 0;
        while (_loc5_ < this._tabContext.numTabItems) {
            if (this._tabContext.getTabItemAt(_loc5_ >>> 0).visible) {
                _loc6_++;
            }
            _loc5_++;
        }
        let _loc1_: number = this._window.width / _loc6_ | 0;
        _loc1_ -= 1;
        _loc4_ = 0;
        while (_loc4_ < this._tabContext.numTabItems) {
            _loc2_ = this._tabContext.getTabItemAt(_loc4_ >>> 0);
            _loc3_ = this._removeTabsForNavigatorView && (_loc2_.id == 2 || _loc2_.id == 3);
            _loc2_.width = _loc3_ ? 0 : _loc1_;
            _loc4_++;
        }
    }

    private showDeleteButton(): void {
        if (this._navigator.sessionData.isAccountSafetyLocked()) {
            this._window.findChildByName("remove_link_region").disable();
            this._window.findChildByName("remove_link").blend = 0.5;
            this._window.findChildByName("remove_icon").blend = 0.5;
        } else {
            this._window.findChildByName("remove_link_region").enable();
            this._window.findChildByName("remove_link").blend = 1;
            this._window.findChildByName("remove_icon").blend = 1;
        }
    }

    private getPasswordContainer(): IWindowContainer {
        return castGuarded(this._window.findChildByName("password_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private getRemoveAllFlatCtrlsButton(): IButtonWindow {
        return castGuarded(this._window.findChildByName("remove_all_flat_ctrls"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
    }

    private getRemoveFlatCtrlsButton(): IButtonWindow {
        return castGuarded(this._window.findChildByName("remove_flat_ctrl"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
    }

    public refresh(): void {
        this.prepareWindow();
        if (!this._useUnifiedWindow) {
            Util.hideChildren(castGuarded(this._window.findChildByName("content_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"));
            this.getTabContainer(this._currentTab).visible = true;
        }
        this.refreshNavigatorTabs();
        this.resizeTabs();
        this._window.helpPage = this.getHelpPageWithTab(this._currentTab);
        this.refreshFlatControllers();
        this.refreshBannedUsers();
        this.refreshGroupMemberDisclaimer();
        this.showDeleteButton();
        this._window.invalidate();
    }

    private getTabContainer(param1: number): IWindowContainer {
        return castGuarded(this._window.findChildByName("tab_container_" + param1), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private disableWindow(param1: IWindow): void {
        if (param1 != null) {
            param1.disable();
            param1.blend = 0.5;
        }
    }

    private enableWindow(param1: IWindow): void {
        if (param1 != null) {
            param1.enable();
            param1.blend = 1;
        }
    }

    private getThicknessSelectionIndex(param1: number): number {
        switch (param1 - -2) {
            case 0:
                return 0;
            case 1:
                return 1;
            case 3:
                return 3;
            default:
                return 2;
        }
    }

    private populateForm(): void {
        let _loc3_: IRadioButtonWindow = null;
        let _loc1_: IRadioButtonWindow = null;
        let _loc5_: IRadioButtonWindow = null;
        let _loc6_: IRadioButtonWindow = null;
        this._populating = true;
        let _loc2_: RoomSettingsData = this._originalData;
        this._nameInput.setText(_loc2_.name);
        this._descInput.setText(_loc2_.description);
        this._passwordInput.setText("");
        this._passwordConfirmInput.setText("");
        let _loc4_: ISelectorWindow = asGuarded(this._window.findChildByName("doormode"), isISelectorWindow);
        if (this._navigator.data.enteredGuestRoom) {
            this._window.findChildByName("doormode_override_info").visible = _loc2_.hiddenByBc && !this._navigator.sessionData.hasSecurity(4);
            switch (_loc2_.doorMode - 1) {
                case 0:
                    _loc3_ = asGuarded(this._window.findChildByName("doormode_doorbell"), isIRadioButtonWindow);
                    _loc4_.setSelected(_loc3_);
                    break;
                case 1:
                    _loc1_ = asGuarded(this._window.findChildByName("doormode_password"), isIRadioButtonWindow);
                    _loc4_.setSelected(_loc1_);
                    break;
                case 2:
                    _loc5_ = asGuarded(this._window.findChildByName("doormode_invisible"), isIRadioButtonWindow);
                    _loc4_.setSelected(_loc5_);
                    break;
                case 3:
                    break;
                default:
                    _loc6_ = asGuarded(this._window.findChildByName("doormode_open"), isIRadioButtonWindow);
                    _loc4_.setSelected(_loc6_);
            }
            this.changePasswordField(_loc2_.doorMode == 2);
        }
        Logger.log("CATEGORY ID: " + _loc2_.categoryId);
        this.setCategorySelection(_loc2_.categoryId);
        this.setTradeModeSelection(_loc2_.tradeMode);
        this.refreshMaxVisitors(_loc2_);
        RoomSettingsCtrl.setTag(this._tag1Input, stringOrNull(_loc2_.tags[0]));
        RoomSettingsCtrl.setTag(this._tag2Input, stringOrNull(_loc2_.tags[1]));
        if (this._allowPetsCheckBox) {
            if (_loc2_.allowPets) {
                this._allowPetsCheckBox.select();
            } else {
                this._allowPetsCheckBox.unselect();
            }
        }
        if (this._allowFoodConsumeCheckBox) {
            if (_loc2_.allowFoodConsume) {
                this._allowFoodConsumeCheckBox.select();
            } else {
                this._allowFoodConsumeCheckBox.unselect();
            }
        }
        if (this._muteAllPetsCheckBox) {
            if (_loc2_.muteAllPets) {
                this._muteAllPetsCheckBox.select();
            } else {
                this._muteAllPetsCheckBox.unselect();
            }
        }
        if (this._allowWalkThroughCheckBox) {
            if (_loc2_.allowWalkThrough) {
                this._allowWalkThroughCheckBox.select();
            } else {
                this._allowWalkThroughCheckBox.unselect();
            }
        }
        if (this._hideWallsCheckBox) {
            if (_loc2_.hideWalls) {
                this._hideWallsCheckBox.select();
            } else {
                this._hideWallsCheckBox.unselect();
            }
        }
        if (this._doNotLeaveOnDoorTileCheckBox) {
            if (!_loc2_.leaveOnDoorTileEnabled) {
                this._doNotLeaveOnDoorTileCheckBox.select();
            } else {
                this._doNotLeaveOnDoorTileCheckBox.unselect();
            }
        }
        if (this._idleSleepCheckBox) {
            if (_loc2_.idleSleepEnabled) {
                this._idleSleepCheckBox.select();
            } else {
                this._idleSleepCheckBox.unselect();
            }
        }
        if (this._idleSleepTimeoutInput) {
            this._idleSleepTimeoutInput.setText(_loc2_.idleSleepTimeoutSeconds > 0 ? "" + _loc2_.idleSleepTimeoutSeconds : "");
        }
        if (this._idleAutokickCheckBox) {
            if (_loc2_.idleAutokickEnabled) {
                this._idleAutokickCheckBox.select();
            } else {
                this._idleAutokickCheckBox.unselect();
            }
        }
        if (this._idleAutokickTimeoutInput) {
            this._idleAutokickTimeoutInput.setText(_loc2_.idleAutokickTimeoutSeconds > 0 ? "" + _loc2_.idleAutokickTimeoutSeconds : "");
        }
        this._floodFilterDropMenu.selection = _loc2_.chatSettings.floodSensitivity;
        if (this._wallThicknessDropMenu) {
            this._wallThicknessDropMenu.selection = this.getThicknessSelectionIndex(_loc2_.wallThickness);
        }
        if (this._floorThicknessDropMenu) {
            this._floorThicknessDropMenu.selection = this.getThicknessSelectionIndex(_loc2_.floorThickness);
        }
        this.refreshRoomBehaviorSettingsState();
        this.populateRoomModerationSettings(_loc2_);
        this.clearErrors();
        this._populating = false;
    }

    private populateRoomModerationSettings(param1: RoomSettingsData): void {
        let _loc4_: boolean = this._groupId > 0;
        this.roomModerationMuteSettings = _loc4_ ? [0, 1, 4, 5] : [0, 1];
        this.roomModerationBanSettings = _loc4_ ? [0, 1, 4, 5] : [0, 1];
        this.roomModerationKickSettings = _loc4_ ? [0, 1, 2, 4, 5] : [0, 1, 2];
        let _loc2_: IDropMenuWindow = castGuarded(this._window.findChildByName("moderation_mute_dropdown"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        _loc2_.populate(this.localizeItems(this.roomModerationMuteSettings));
        _loc2_.selection = this.normalizeSelection(this.roomModerationMuteSettings, param1.roomModerationSettings.whoCanMute);
        let _loc3_: IDropMenuWindow = castGuarded(this._window.findChildByName("moderation_ban_dropdown"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        _loc3_.populate(this.localizeItems(this.roomModerationBanSettings));
        _loc3_.selection = this.normalizeSelection(this.roomModerationBanSettings, param1.roomModerationSettings.whoCanBan);
        let _loc6_: IDropMenuWindow = castGuarded(this._window.findChildByName("moderation_kick_dropdown"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        _loc6_.populate(this.localizeItems(this.roomModerationKickSettings));
        _loc6_.selection = this.normalizeSelection(this.roomModerationKickSettings, param1.roomModerationSettings.whoCanKick);
        for (const _loc5_ of [_loc2_, _loc3_, _loc6_]) {
            _loc5_.addEventListener("WE_SELECTED", this.onUnfocus);
            _loc5_.addEventListener("WE_UNSELECTED", this.onUnfocus);
        }
    }

    private normalizeSelection(param1: any[], param2: number): number {
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            if (param1[_loc3_] == param2) {
                return _loc3_;
            }
            _loc3_++;
        }
        return 0;
    }

    private localizeItems(param1: any[]): any {
        let _loc2_: any[] = [];
        for (const _loc3_ of param1 ?? []) {
            switch (_loc3_) {
                case 0:
                    _loc2_.push("${navigator.roomsettings.moderation.none}");
                    break;
                case 1:
                    _loc2_.push("${navigator.roomsettings.moderation.rights}");
                    break;
                case 2:
                    _loc2_.push("${navigator.roomsettings.moderation.all}");
                    break;
                case 4:
                    _loc2_.push("${navigator.roomsettings.moderation.group_admins}");
                    break;
                case 5:
                    _loc2_.push("${navigator.roomsettings.moderation.group_admins_and_rights}");
            }
        }
        return _loc2_;
    }

    private VIPFeaturesAllowed(): boolean {
        return this._navigator.sessionData.hasVip;
    }

    private refreshMaxVisitors(param1: RoomSettingsData): void {
        let _loc3_: number = 0;
        let _loc5_: any[] = [];
        let _loc6_: any = -1;
        let _loc4_: number = 0;
        let _loc2_: number = this.VIPFeaturesAllowed() ? 75 : 50;
        _loc3_ = 10;
        while (_loc3_ <= _loc2_) {
            _loc5_.push("" + _loc3_);
            if (_loc3_ == param1.maximumVisitors) {
                _loc6_ = _loc4_;
            }
            _loc4_++;
            _loc3_ += 5;
        }
        if (param1.maximumVisitors > _loc2_) {
            _loc5_.push("" + _loc2_);
            _loc6_ = _loc4_;
        }
        let _loc7_: IDropMenuWindow = asGuarded(this._window.findChildByName("maxvisitors"), isIDropMenuWindow);
        _loc7_.populate(_loc5_);
        _loc7_.selection = Number(_loc6_ > -1 ? _loc6_ : 0) | 0;
    }

    private setCategorySelection(param1: number): void {
        let _loc2_: IDropMenuWindow = asGuarded(this._window.findChildByName("categories"), isIDropMenuWindow);
        let _loc4_: any[] = [];
        let _loc6_: number = 0;
        let _loc3_: number = 0;
        for (const _loc5_ of this._navigator.data.allCategories ?? []) {
            if ((_loc5_.visible || param1 == _loc5_.nodeId) && !_loc5_.automatic) {
                _loc4_.push(_loc5_.visibleName);
                if (param1 == _loc5_.nodeId) {
                    _loc6_ = _loc3_;
                }
                _loc3_++;
            }
        }
        _loc2_.populate(_loc4_);
        _loc2_.selection = _loc6_;
    }

    private setTradeModeSelection(param1: number): void {
        let _loc2_: IDropMenuWindow = asGuarded(this._window.findChildByName("tradesettings"), isIDropMenuWindow);
        let _loc3_: any[] = [];
        _loc3_.push("${navigator.roomsettings.trade_not_allowed}");
        _loc3_.push("${navigator.roomsettings.trade_not_with_Controller}");
        _loc3_.push("${navigator.roomsettings.trade_allowed}");
        _loc2_.populate(_loc3_);
        _loc2_.selection = param1;
    }

    private getFlatCategoryByIndex(param1: number, param2: number): FlatCategory {
        let _loc3_: number = 0;
        for (const _loc4_ of this._navigator.data.allCategories ?? []) {
            if ((_loc4_.visible || param1 == _loc4_.nodeId) && !_loc4_.automatic) {
                if (param2 == _loc3_) {
                    return _loc4_;
                }
                _loc3_++;
            }
        }
        return null;
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this.close();
    };

    private onUnfocus = (param1: WindowEvent): void => {
        if (!this._populating) {
            this.save();
        }
    };

    private onRoomBehaviorSettingsChanged = (param1: WindowEvent): void => {
        this.refreshRoomBehaviorSettingsState();
        if (this._populating) {
            return;
        }
        if (this.isRoomBehaviorSettingsReadyForSave()) {
            this.save();
        }
    };

    private save(): void {
        let _loc2_: string = null;
        let _loc4_: string = null;
        let _loc9_: number = 0;
        let _loc6_: number = 0;
        if (this._originalData == null || this._window == null || Boolean(this._window.disposed)) {
            return;
        }
        this.clearErrors();
        let _loc3_: SaveableRoomSettingsData = new SaveableRoomSettingsData();
        _loc3_.roomId = this._originalData.roomId;
        _loc3_.name = this._nameInput.getText();
        _loc3_.description = this._descInput.getText();
        let _loc7_: ISelectorWindow = asGuarded(this._window.findChildByName("doormode"), isISelectorWindow);
        let _loc5_: IWindow = _loc7_.getSelected();
        if (_loc5_ == null) {
            _loc3_.doorMode = this._originalData.doorMode;
        } else {
            switch (_loc5_.name) {
                case "doormode_doorbell":
                    _loc3_.doorMode = 1;
                    break;
                case "doormode_password":
                    _loc3_.doorMode = 2;
                    break;
                case "doormode_invisible":
                    _loc3_.doorMode = 3;
                    break;
                default:
                    _loc3_.doorMode = 0;
            }
        }
        if (_loc3_.doorMode == 2) {
            _loc2_ = this._passwordInput.getText();
            _loc4_ = this._passwordConfirmInput.getText();
            if (_loc2_ != _loc4_) {
                this._passwordInput.clearErrors();
                this.switchToTab(2);
                this._passwordConfirmInput.displayError("${navigator.roomsettings.invalidconfirm}");
                return;
            }
            if (_loc2_ != "") {
                _loc3_.password = _loc2_;
            }
        }
        let _loc8_: IDropMenuWindow = asGuarded(this._window.findChildByName("categories"), isIDropMenuWindow);
        let _loc10_: FlatCategory = this.getFlatCategoryByIndex(this._originalData.categoryId, _loc8_.selection);
        _loc3_.categoryId = _loc10_.nodeId;
        let _loc1_: IDropMenuWindow = asGuarded(this._window.findChildByName("tradesettings"), isIDropMenuWindow);
        _loc3_.tradeMode = _loc1_.selection;
        let _loc11_: IDropMenuWindow = asGuarded(this._window.findChildByName("maxvisitors"), isIDropMenuWindow);
        _loc3_.maximumVisitors = _loc11_.enumerateSelection()[_loc11_.selection] | 0;
        _loc3_.allowPets = this._allowPetsCheckBox.isSelected;
        _loc3_.allowFoodConsume = this._allowFoodConsumeCheckBox.isSelected;
        _loc3_.muteAllPets = this._muteAllPetsCheckBox.isSelected;
        _loc3_.allowWalkThrough = this._allowWalkThroughCheckBox.isSelected;
        _loc3_.hideWalls = this._hideWallsCheckBox.isSelected;
        _loc3_.wallThickness = this._wallThicknessDropMenu.selection - 2;
        _loc3_.floorThickness = this._floorThicknessDropMenu.selection - 2;
        _loc3_.tags = [];
        this.addTag(this._tag1Input, _loc3_.tags);
        this.addTag(this._tag2Input, _loc3_.tags);
        this.setModeratorSettings(_loc3_);
        _loc3_.chatFloodSensitivity = this._floodFilterDropMenu.selection;
        if (this.VIPFeaturesAllowed()) {
            _loc9_ = 0;
            _loc6_ = 0;
            if (this._idleSleepCheckBox.isSelected) {
                _loc9_ = this.parsePositiveTimeout(this._idleSleepTimeoutInput);
                if (!this.isIdleSleepTimeoutValid(_loc9_)) {
                    this.switchToTab(4);
                    this._idleSleepTimeoutInput.displayError("${navigator.roomsettings.idle_sleep_timeout.invalid}");
                    return;
                }
            }
            if (this._idleAutokickCheckBox.isSelected) {
                _loc6_ = this.parsePositiveTimeout(this._idleAutokickTimeoutInput);
                if (!this.isIdleAutokickTimeoutValid(_loc6_)) {
                    this.switchToTab(4);
                    this.displayIdleAutokickTimeoutError();
                    return;
                }
            }
            if (this._idleSleepCheckBox.isSelected && Boolean(this._idleAutokickCheckBox.isSelected) && !this.isIdleAutokickOffsetValid(_loc9_, _loc6_)) {
                this.switchToTab(4);
                this.displayIdleAutokickTimeoutError();
                return;
            }
            _loc3_.leaveOnDoorTileEnabled = !this._doNotLeaveOnDoorTileCheckBox.isSelected;
            _loc3_.idleSleepEnabled = this._idleSleepCheckBox.isSelected;
            _loc3_.idleSleepTimeoutSeconds = this._idleSleepCheckBox.isSelected ? _loc9_ : 0;
            _loc3_.idleAutokickEnabled = this._idleAutokickCheckBox.isSelected;
            _loc3_.idleAutokickTimeoutSeconds = this._idleAutokickCheckBox.isSelected ? _loc6_ : 0;
        } else {
            _loc3_.leaveOnDoorTileEnabled = this._originalData.leaveOnDoorTileEnabled;
            _loc3_.idleSleepEnabled = this._originalData.idleSleepEnabled;
            _loc3_.idleSleepTimeoutSeconds = this._originalData.idleSleepTimeoutSeconds;
            _loc3_.idleAutokickEnabled = this._originalData.idleAutokickEnabled;
            _loc3_.idleAutokickTimeoutSeconds = this._originalData.idleAutokickTimeoutSeconds;
        }
        this.clearErrors();
        this._savedFlatId = _loc3_.roomId;
        this._navigator.send(new SaveRoomSettingsMessageComposer(_loc3_));
    }

    private refreshRoomBehaviorSettingsState(): void {
        let _loc1_: boolean = this.VIPFeaturesAllowed();
        if (!_loc1_) {
            this.disableWindow(this._hideWallsCheckBox);
            this.disableWindow(this._wallThicknessDropMenu);
            this.disableWindow(this._floorThicknessDropMenu);
            this.disableWindow(this._hideWallsText);
            this.disableWindow(this._doNotLeaveOnDoorTileCheckBox);
            this.disableWindow(this._doNotLeaveOnDoorTileText);
        } else {
            this.enableWindow(this._hideWallsCheckBox);
            this.enableWindow(this._wallThicknessDropMenu);
            this.enableWindow(this._floorThicknessDropMenu);
            this.enableWindow(this._hideWallsText);
            this.enableWindow(this._doNotLeaveOnDoorTileCheckBox);
            this.enableWindow(this._doNotLeaveOnDoorTileText);
        }
        this.refreshTimeoutFieldState(this._idleSleepCheckBox, this._idleSleepText, this._idleSleepTimeoutInput, this._idleSleepTimeoutLabel, _loc1_);
        this.refreshTimeoutFieldState(this._idleAutokickCheckBox, this._idleAutokickText, this._idleAutokickTimeoutInput, this._idleAutokickTimeoutLabel, _loc1_);
    }

    private refreshTimeoutFieldState(param1: ICheckBoxWindow, param2: ITextWindow, param3: TextFieldManager, param4: ITextWindow, param5: boolean): void {
        if (param5) {
            this.enableWindow(param1);
            this.enableWindow(param2);
        } else {
            this.disableWindow(param1);
            this.disableWindow(param2);
        }
        if (param5 && Boolean(param1.isSelected)) {
            this.enableWindow(param3.input);
            this.enableWindow(param4);
        } else {
            param3.clearErrors();
            this.disableWindow(param3.input);
            this.disableWindow(param4);
        }
    }

    private isRoomBehaviorSettingsReadyForSave(): boolean {
        if (!this.VIPFeaturesAllowed()) {
            return true;
        }
        let _loc2_: number = this._idleSleepCheckBox.isSelected ? this.parsePositiveTimeout(this._idleSleepTimeoutInput) : 0;
        if (this._idleSleepCheckBox.isSelected && !this.isIdleSleepTimeoutValid(_loc2_)) {
            return false;
        }
        let _loc1_: number = this._idleAutokickCheckBox.isSelected ? this.parsePositiveTimeout(this._idleAutokickTimeoutInput) : 0;
        if (this._idleAutokickCheckBox.isSelected && !this.isIdleAutokickTimeoutValid(_loc1_)) {
            return false;
        }
        if (this._idleSleepCheckBox.isSelected && Boolean(this._idleAutokickCheckBox.isSelected) && !this.isIdleAutokickOffsetValid(_loc2_, _loc1_)) {
            return false;
        }
        return true;
    }

    private parsePositiveTimeout(param1: TextFieldManager): number {
        let _loc4_: string = Util.trim(param1.getText());
        let _loc3_: RegExp = /^\d+$/;
        if (_loc4_.length < 1 || !_loc3_.test(_loc4_)) {
            return -1;
        }
        let _loc2_: number = Number(_loc4_) | 0;
        return _loc2_ > 0 ? _loc2_ : -1;
    }

    private isIdleSleepTimeoutValid(param1: number): boolean {
        return param1 >= 30 && param1 <= 3600;
    }

    private isIdleAutokickTimeoutValid(param1: number): boolean {
        return param1 >= 60 && param1 <= 36000;
    }

    private isIdleAutokickOffsetValid(param1: number, param2: number): boolean {
        return param2 >= param1 + 30;
    }

    private displayIdleAutokickTimeoutError(): void {
        let _loc1_: string = "${navigator.roomsettings.idle_autokick_timeout.invalid}";
        let _loc3_: number = this._idleSleepCheckBox.isSelected ? this.parsePositiveTimeout(this._idleSleepTimeoutInput) : 0;
        let _loc2_: number = this._idleAutokickCheckBox.isSelected ? this.parsePositiveTimeout(this._idleAutokickTimeoutInput) : 0;
        if (this._idleSleepCheckBox.isSelected && Boolean(this._idleAutokickCheckBox.isSelected) && this.isIdleSleepTimeoutValid(_loc3_) && this.isIdleAutokickTimeoutValid(_loc2_) && !this.isIdleAutokickOffsetValid(_loc3_, _loc2_)) {
            _loc1_ = "${navigator.roomsettings.idle_autokick_timeout.offset.invalid}";
        }
        this._idleAutokickTimeoutInput.displayError(_loc1_);
    }

    private handleCustomRoomSettingSaveError(param1: string): boolean {
        switch (param1) {
            case "idleSleepTimeoutSeconds":
                this.switchToTab(4);
                this._idleSleepTimeoutInput.displayError("${navigator.roomsettings.idle_sleep_timeout.invalid}");
                return true;
            case "idleAutokickTimeoutSeconds":
                this.switchToTab(4);
                this.displayIdleAutokickTimeoutError();
                return true;
            default:
                return false;
        }
    }

    private addTag(param1: TextFieldManager, param2: any[]): void {
        let _loc3_: string = null;
        if (param1.getText() != "") {
            _loc3_ = param1.getText();
            if (RoomSettingsCtrl.useHashTags && _loc3_.charAt(0) == "#") {
                _loc3_ = _loc3_.substr(1, _loc3_.length - 1);
            }
            param2.push(_loc3_);
        }
    }

    private setModeratorSettings(param1: SaveableRoomSettingsData): void {
        let _loc2_: IDropMenuWindow = castGuarded(this._window.findChildByName("moderation_mute_dropdown"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        param1.whoCanMute = this.roomModerationMuteSettings[_loc2_.selection] | 0;
        let _loc3_: IDropMenuWindow = castGuarded(this._window.findChildByName("moderation_ban_dropdown"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        param1.whoCanBan = this.roomModerationBanSettings[_loc3_.selection] | 0;
        let _loc4_: IDropMenuWindow = castGuarded(this._window.findChildByName("moderation_kick_dropdown"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        param1.whoCanKick = this.roomModerationKickSettings[_loc4_.selection] | 0;
    }

    private onDeleteButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (this._flatId == this._navigator.homeRoomId) {
            this._navigator.windowManager.alert("${navigator.delete.homeroom.title}", "${navigator.delete.homeroom.body}", 0, this.onAlertClose);
            return;
        }
        if (this._groupId > 0) {
            this._navigator.windowManager.alert("${group.deletebase.title}", "${group.deletebase.body}", 0, this.onAlertClose);
            return;
        }
        Logger.log("[RoomSettingsCtrl.onDeleteButtonClick] " + this._flatId);
        if (this._originalData == null) {
            return;
        }
        if (this._confirmDialog != null) {
            this._confirmDialog.dispose();
        }
        this._navigator.registerParameter("navigator.roomsettings.deleteroom.confirm.message", "room_name", this._originalData.name);
        this._confirmDialog = new ConfirmDialogView(this._navigator, this.onConfirmRoomDelete, "${navigator.roomsettings}", "${navigator.roomsettings.deleteroom.confirm.message}");
    };

    private onBuildersClubFaqButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (this._navigator.windowManager != null) {
            (asInstanceOf(this._navigator.windowManager, Component)).context.createLinkEvent("habbopages/builders-club/faq");
        }
    };

    private onAlertClose = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
    };

    private onConfirmRoomDelete = (): void => {
        let _loc1_: GuestRoomSearchResultData = null;
        this._navigator.send(new DeleteRoomMessageComposer(this._originalData.roomId));
        this.close();
        if (this._navigator.data.guestRoomSearchResults != null) {
            _loc1_ = this._navigator.data.guestRoomSearchResults;
            this._navigator.mainViewCtrl.startSearch(this._navigator.tabs.getSelected().id, _loc1_.searchType, _loc1_.searchParam);
        }
    };

    private onDoorModePasswordSelect = (param1: WindowEvent): void => {
        this.changePasswordField(true);
    };

    private onDoorModePasswordUnselect = (param1: WindowEvent): void => {
        this.changePasswordField(false);
    };

    private changePasswordField(param1: boolean): void {
        this.getPasswordContainer().visible = param1;
    }

    private refreshGroupMemberDisclaimer(): void {
        if (!this.isContentVisible(2)) {
            return;
        }
        if (!this._navigator.data.enteredGuestRoom) {
            return;
        }
        let _loc1_: boolean = this._navigator.data.enteredGuestRoom.habboGroupId > 0;
        this._window.findChildByName("guild_access_disclaimer").visible = _loc1_;
    }

    private refreshFlatControllers(): void {
        let _loc2_: any[] = null;
        if (!this.isContentVisible(3)) {
            return;
        }
        if (!this._navigator.data.enteredGuestRoom) {
            return;
        }
        if (this._originalData.controllersById == null) {
            this._originalData.controllersById = new Dictionary();
            this._navigator.send(new GetFlatControllersMessageComposer(this._originalData.roomId));
            _loc2_ = [];
        } else {
            _loc2_ = this._originalData.controllerList;
        }
        let _loc1_: string = castGuarded(this._window.findChildByName("filter_users_input"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text.toLowerCase();
        let _loc3_: any[] = this.getFriendsWithNoRights();
        this._usersWithRightsListCtrl.refresh(castGuarded(this._window.findChildByName("users_with_rights_item_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow"), _loc2_, _loc1_, this._originalData.highlightedUserId);
        this._friendsListCtrl.refresh(castGuarded(this._window.findChildByName("friends_item_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow"), _loc3_, _loc1_, this._originalData.highlightedUserId);
        this._navigator.registerParameter("navigator.flatctrls.userswithrights", "displayed", "" + this._usersWithRightsListCtrl.userCount);
        this._navigator.registerParameter("navigator.flatctrls.friends", "displayed", "" + this._friendsListCtrl.userCount);
        this._navigator.registerParameter("navigator.flatctrls.userswithrights", "total", "" + _loc2_.length);
        this._navigator.registerParameter("navigator.flatctrls.friends", "total", "" + _loc3_.length);
    }

    private refreshBannedUsers(): void {
        let _loc1_: any[] = null;
        if (this._currentTab != 5) {
            return;
        }
        if (this._originalData.bannedUsersById == null) {
            this._navigator.send(new GetBannedUsersFromRoomMessageComposer(this._originalData.roomId));
            _loc1_ = [];
        } else {
            _loc1_ = this._originalData.bannedUsersList;
        }
        this._bannedUsersListCtrl.refresh(castGuarded(this._window.findChildByName("moderation_banned_users"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow"), _loc1_, "", 0);
    }

    private getFriendsWithNoRights(): any[] {
        let _loc1_: Map<any, any> = this._originalData.controllersById;
        let _loc3_: any[] = [];
        if (_loc1_.get("length") == 0) {
            return _loc3_;
        }
        for (const _loc2_ of this._navigator.data.friendList.list ?? []) {
            if (_loc1_.get(_loc2_.userId) == null) {
                _loc3_.push(_loc2_);
            }
        }
        return _loc3_;
    }

    private onRemoveAllFlatCtrlsClick = (param1: WindowEvent): void => {
        Logger.log("Remove all clicked: ");
        if (this._confirmDialog != null) {
            this._confirmDialog.dispose();
        }
        this._confirmDialog = new ConfirmDialogView(this._navigator, this.onRemoveAllFlatCtrlsConfirm, "${navigator.flatctrls.removeconfirm.title}", "${navigator.flatctrls.removeconfirm.info}");
    };

    private onRemoveAllFlatCtrlsConfirm = (): void => {
        this._navigator.send(new RemoveAllRightsMessageComposer(this._flatId));
    };

    private onTab = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._currentTab = param2.id;
        this.refresh();
        if (this._currentTab == 2) {
            this._navigator.tracking.trackEventLogOncePerSession("InterfaceExplorer", "select", "room.settings.doormode.seen");
        }
    };

    private onUserFilterChange = (param1: WindowEvent): void => {
        this.refreshFlatControllers();
    };

    private onUnbanClick = (param1: WindowMouseEvent): void => {
        if (this._bannedUsersListCtrl.selectedRow < 0) {
            return;
        }
        let _loc3_: IItemListWindow = asGuarded(this._window.findChildByName("moderation_banned_users"), isIItemListWindow);
        let _loc2_: IWindow = castGuarded(_loc3_.getListItemAt(this._bannedUsersListCtrl.selectedRow >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("user_info_region");
        let _loc4_: number = _loc2_.id;
        this._navigator.send(new UnbanUserFromRoomMessageComposer(_loc4_, this._flatId));
    };

    private getHelpPageWithTab(param1: number): string {
        if (param1 == 4) {
            return "chat/options";
        }
        return "";
    }

    public get linkPattern(): string {
        return "roomsettings/";
    }

    public linkReceived(param1: string): void {
    }

    private onWalkThroughMouseOver = (param1: WindowMouseEvent): void => {
        this._navigator.tracking.trackEventLogOncePerSession("InterfaceExplorer", "hover", "room.settings.walkthrough.seen");
    };

    private onFloodFilterMouseOver = (param1: WindowMouseEvent): void => {
        this._navigator.tracking.trackEventLogOncePerSession("InterfaceExplorer", "hover", "room.settings.chat.floodfilter.seen");
    };

    get [IDisposable](): true {
        return true;
    }
}
