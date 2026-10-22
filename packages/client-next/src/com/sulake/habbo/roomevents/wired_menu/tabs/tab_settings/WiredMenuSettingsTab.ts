import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { WiredRoomSettingsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/WiredRoomSettingsMessageParser';
import type { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredRoomSettingsEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredRoomSettingsEvent';
import { WiredGetRoomSettingsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredGetRoomSettingsMessageComposer';
import { WiredSetRoomSettingsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredSetRoomSettingsMessageComposer';
import { WiredUpdateRoomComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredUpdateRoomComposer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { WiredMenuDefaultTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/WiredMenuDefaultTab';
import { UserDefinedRoomEventsCtrl } from '@/com/sulake/habbo/roomevents/wired_setup/UserDefinedRoomEventsCtrl';

export class WiredMenuSettingsTab extends WiredMenuDefaultTab {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_settings::WiredMenuSettingsTab'); }

    declare private MODIFY_PERMISSION_OPTIONS: any[];

    declare private READ_PERMISSION_OPTIONS: any[];

    private _modifyPermissionMask: number = -1;
    private _readPermissionMask: number = -1;
    private _timezone: string = null;
    private _ignoringCheckboxEvents: boolean = false;
    private _ignoringTimezoneEvents: boolean = false;
    private _ignoringUiStyleEvents: boolean = false;

    constructor(param1: WiredMenuController, param2: IWindowContainer) {
        let _loc4_: number = 0;
        let _loc3_: ICheckBoxWindow = null;
        super(param1, param2);
        this.MODIFY_PERMISSION_OPTIONS = [1, 2, 3];
        this.READ_PERMISSION_OPTIONS = [0, 1, 2, 3];
        this.addMessageEvent(new WiredRoomSettingsEvent(this.onWiredSettings));
        this.updateLoadingState();
        this.requestData();
        for (_loc4_ of this.MODIFY_PERMISSION_OPTIONS ?? []) {
            _loc3_ = this.getModifyCheckbox(_loc4_);
            _loc3_.addEventListener("WE_SELECTED", this.onPermissionsChanged);
            _loc3_.addEventListener("WE_UNSELECTED", this.onPermissionsChanged);
        }
        for (_loc4_ of this.READ_PERMISSION_OPTIONS ?? []) {
            _loc3_ = this.getReadCheckbox(_loc4_);
            _loc3_.addEventListener("WE_SELECTED", this.onPermissionsChanged);
            _loc3_.addEventListener("WE_UNSELECTED", this.onPermissionsChanged);
        }
        this.toolbarCheckbox.addEventListener("WE_SELECTED", this.onPreferencesChanged);
        this.toolbarCheckbox.addEventListener("WE_UNSELECTED", this.onPreferencesChanged);
        this.wiredInspectButton.addEventListener("WE_SELECTED", this.onPreferencesChanged);
        this.wiredInspectButton.addEventListener("WE_UNSELECTED", this.onPreferencesChanged);
        this.playtestCheckbox.addEventListener("WE_SELECTED", this.onPreferencesChanged);
        this.playtestCheckbox.addEventListener("WE_UNSELECTED", this.onPreferencesChanged);
        this.allNotificationsCheckbox.addEventListener("WE_SELECTED", this.onPreferencesChanged);
        this.allNotificationsCheckbox.addEventListener("WE_UNSELECTED", this.onPreferencesChanged);
        this.uiStyleDropdown.addEventListener("WE_SELECTED", this.onPreferencesChanged);
        this.saveReloadButton.addEventListener("WME_CLICK", this.onClickReload);
        this.rollbackButton.addEventListener("WME_CLICK", this.onClickRollback);
        this.timezoneDropdown.addEventListener("WE_SELECTED", this.onSelectTimezone);
        this.wiredStyleBorder.visible = param1.getBoolean("wired.ui_picker_enabled");
    }

    private onClickRollback = (param1: WindowMouseEvent): void => {
        this.controller.windowManager.confirm("${wiredmenu.settings.room_state.roll_back}", "${wiredmenu.settings.room_state.roll_back.warning}", 0, this.onRollbackConfirmed).titleBarColor = 13909337;
    };

    private onRollbackConfirmed = (param1: IAlertDialog, param2: WindowEvent): void => {
        if (param2.type == "WE_OK") {
            this.controller.send(new WiredUpdateRoomComposer(true));
        }
        param1.dispose();
    };

    private onClickReload = (param1: WindowMouseEvent): void => {
        this.controller.send(new WiredUpdateRoomComposer(false));
    };

    private onWiredSettings = (param1: WiredRoomSettingsEvent): void => {
        let _loc2_: WiredRoomSettingsMessageParser = param1.getParser();
        this._modifyPermissionMask = _loc2_.modifyPermissionMask;
        this._readPermissionMask = _loc2_.readPermissionMask;
        this._timezone = _loc2_.timezone;
        this.updateLoadingState();
    };

    protected override isDataReady(): boolean {
        return this._modifyPermissionMask != -1 && this._readPermissionMask != -1 && this._timezone != null;
    }

    private requestData(): void {
        this.controller.send(new WiredGetRoomSettingsMessageComposer());
    }

    public override permissionsUpdated(): void {
        this.updateButtonsUI();
    }

    protected override initializeInterface(): void {
        this.updatePermissionsUI();
        this.updatePreferencesUI();
        this.updateTimezoneUI();
        this.updateButtonsUI();
        this.updateUiStyleUI();
    }

    private onPermissionsChanged = (param1: WindowEvent): void => {
        if (this._ignoringCheckboxEvents) {
            return;
        }
        let _loc3_: ICheckBoxWindow = asGuarded(param1.target, isICheckBoxWindow);
        let _loc2_: number = _loc3_.id;
        let _loc5_: boolean = _loc3_.name.indexOf("modify_") == 0;
        let _loc4_: boolean = param1.type == "WE_SELECTED";
        if (_loc5_) {
            if (_loc4_) {
                this._modifyPermissionMask |= 1 << _loc2_;
            } else {
                this._modifyPermissionMask &= ~(1 << _loc2_);
            }
        } else if (_loc4_) {
            this._readPermissionMask |= 1 << _loc2_;
        } else {
            this._readPermissionMask &= ~(1 << _loc2_);
        }
        this.updatePermissionsUI();
        this.updateTimezoneUI();
        this.controller.send(new WiredSetRoomSettingsMessageComposer(this._modifyPermissionMask, this._readPermissionMask, this._timezone));
    };

    private onSelectTimezone = (param1: WindowEvent): void => {
        if (this._ignoringTimezoneEvents) {
            return;
        }
        let _loc2_: number = this.timezoneDropdown.selection;
        if (_loc2_ < 0 || _loc2_ >= this.timezoneDropdown.numMenuItems) {
            this._timezone = "";
        } else {
            this._timezone = stringOrNull(this.timezoneDropdown.enumerateSelection()[_loc2_]);
        }
        this.controller.send(new WiredSetRoomSettingsMessageComposer(this._modifyPermissionMask, this._readPermissionMask, this._timezone));
    };

    private updateButtonsUI(): void {
        let _loc1_: boolean = this.controller.isRoomOwnerOrStaff();
        let _loc2_: boolean = this.controller.hasWritePermission;
        Util.disableSection(this.saveReloadButton, !_loc2_);
        Util.disableSection(this.rollbackButton, !_loc1_);
    }

    private updateTimezoneUI(): void {
        let _loc5_: number = 0;
        let _loc4_: string = null;
        this._ignoringTimezoneEvents = true;
        let _loc2_: IDropMenuWindow = this.timezoneDropdown;
        let _loc3_: string = this.controller.getProperty("wired.timezones");
        let _loc1_: any[] = _loc3_ == null || _loc3_ == "" ? ["UTC"] : _loc3_.split(",");
        let _loc6_: string[] = [];
        if (this._timezone != "") {
            _loc6_.push(this._timezone);
        }
        _loc5_ = 0;
        while (_loc5_ < _loc1_.length) {
            _loc4_ = stringOrNull(_loc1_[_loc5_]);
            if (_loc4_ != this._timezone) {
                _loc6_.push(_loc4_);
            }
            _loc5_++;
        }
        _loc2_.populateWithVector(_loc6_);
        if (_loc6_.length > 0) {
            _loc2_.selection = 0;
        }
        Util.disableSection(_loc2_, _loc6_.length < 2 || !this.timezoneContainer.isEnabled());
        this._ignoringTimezoneEvents = false;
    }

    private updateUiStyleUI(): void {
        this._ignoringUiStyleEvents = true;
        let _loc1_: IDropMenuWindow = this.uiStyleDropdown;
        let _loc4_: string = "illumina";
        let _loc3_: string = this.localization.getLocalizationWithParams("wiredmenu.settings.preferences.wired_style.default", "", "name", Util.snakeToTitle(_loc4_));
        let _loc2_: any[] = [_loc3_];
        for (const _loc5_ of UserDefinedRoomEventsCtrl.STYLE_OPTIONS ?? []) {
            _loc2_.push(Util.snakeToTitle(stringOrNull(_loc5_)));
        }
        _loc1_.populate(_loc2_);
        this.pickedWiredStyleName = this.controller.uiStyle;
        this._ignoringUiStyleEvents = false;
    }

    private updatePermissionsUI(): void {
        let _loc4_: number = 0;
        let _loc3_: ICheckBoxWindow = null;
        let _loc1_: ICheckBoxWindow = null;
        this._ignoringCheckboxEvents = true;
        this.selectedModifyMask = this._modifyPermissionMask;
        this.selectedReadMask = this._readPermissionMask;
        let _loc2_: boolean = this.controller.isRoomOwnerOrStaff();
        Util.disableSection(this.modifySettingsContainer, !_loc2_);
        Util.disableSection(this.readSettingsContainer, !_loc2_);
        Util.disableSection(this.timezoneContainer, !_loc2_);
        if (this.getModifyCheckbox(2).isSelected) {
            this.getModifyCheckbox(3).select();
            Util.disableSection(this.getModifyCheckbox(3));
        }
        if (this.getReadCheckbox(2).isSelected) {
            this.getReadCheckbox(3).select();
            Util.disableSection(this.getReadCheckbox(3));
        }
        if (this.getReadCheckbox(0).isSelected) {
            for (_loc4_ of this.READ_PERMISSION_OPTIONS ?? []) {
                if (_loc4_ != 0) {
                    _loc3_ = this.getReadCheckbox(_loc4_);
                    _loc3_.select();
                    Util.disableSection(_loc3_);
                }
            }
        }
        for (_loc4_ of this.MODIFY_PERMISSION_OPTIONS ?? []) {
            _loc3_ = this.getModifyCheckbox(_loc4_);
            if (_loc3_.isSelected) {
                _loc1_ = this.getReadCheckbox(_loc4_);
                _loc1_.select();
                Util.disableSection(_loc1_);
            }
        }
        this._ignoringCheckboxEvents = false;
    }

    public updatePreferencesUI(): void {
        this._ignoringCheckboxEvents = true;
        Util.select(this.toolbarCheckbox, this.controller.wiredMenuButton);
        Util.select(this.wiredInspectButton, this.controller.wiredInspectButton);
        Util.select(this.playtestCheckbox, this.controller.playTestMode);
        Util.select(this.allNotificationsCheckbox, this.controller.showAllNotifications);
        this._ignoringCheckboxEvents = false;
    }

    private onPreferencesChanged = (param1: WindowEvent): void => {
        if (this._ignoringCheckboxEvents || this._ignoringUiStyleEvents) {
            return;
        }
        this.controller.wiredMenuButton = this.toolbarCheckbox.isSelected;
        this.controller.wiredInspectButton = this.wiredInspectButton.isSelected;
        this.controller.setPlayTestMode(this.playtestCheckbox.isSelected, true);
        this.controller.showAllNotifications = this.allNotificationsCheckbox.isSelected;
        this.controller.uiStyle = this.pickedWiredStyleName;
        this.controller.sendPreferences();
    };

    private set pickedWiredStyleName(param1: string) {
        this._ignoringUiStyleEvents = true;
        if (param1 == "") {
            this.uiStyleDropdown.selection = 0;
            return;
        }
        let _loc2_: number = UserDefinedRoomEventsCtrl.STYLE_OPTIONS.indexOf(param1) + 1;
        this.uiStyleDropdown.selection = _loc2_;
        this._ignoringUiStyleEvents = false;
    }

    private get pickedWiredStyleName(): string {
        if (this.uiStyleDropdown.selection <= 0) {
            return "";
        }
        return stringOrNull(UserDefinedRoomEventsCtrl.STYLE_OPTIONS[this.uiStyleDropdown.selection - 1]);
    }

    private get modifySettingsContainer(): IWindowContainer {
        return asGuarded(this.container.findChildByName("modify_settings_container"), isIWindowContainer);
    }

    private get readSettingsContainer(): IWindowContainer {
        return asGuarded(this.container.findChildByName("read_settings_container"), isIWindowContainer);
    }

    private get timezoneContainer(): IWindowContainer {
        return asGuarded(this.container.findChildByName("timezone_container"), isIWindowContainer);
    }

    private get toolbarCheckbox(): ICheckBoxWindow {
        return asGuarded(this.container.findChildByName("preference_toolbar_checkbox"), isICheckBoxWindow);
    }

    private get wiredInspectButton(): ICheckBoxWindow {
        return asGuarded(this.container.findChildByName("preference_inspect_button_checkbox"), isICheckBoxWindow);
    }

    private get playtestCheckbox(): ICheckBoxWindow {
        return asGuarded(this.container.findChildByName("preference_playtest_checkbox"), isICheckBoxWindow);
    }

    private get allNotificationsCheckbox(): ICheckBoxWindow {
        return asGuarded(this.container.findChildByName("preference_all_notifications_checkbox"), isICheckBoxWindow);
    }

    private getModifyCheckbox(param1: number): ICheckBoxWindow {
        return asGuarded(this.container.findChildByName("modify_" + param1 + "_checkbox"), isICheckBoxWindow);
    }

    private getReadCheckbox(param1: number): ICheckBoxWindow {
        return asGuarded(this.container.findChildByName("read_" + param1 + "_checkbox"), isICheckBoxWindow);
    }

    private get timezoneDropdown(): IDropMenuWindow {
        return asGuarded(this.container.findChildByName("timezone_picker"), isIDropMenuWindow);
    }

    private get uiStyleDropdown(): IDropMenuWindow {
        return asGuarded(this.container.findChildByName("wired_style_picker"), isIDropMenuWindow);
    }

    private get wiredStyleBorder(): IBorderWindow {
        return asGuarded(this.container.findChildByName("wired_style_border"), isIBorderWindow);
    }

    private get saveReloadButton(): IButtonWindow {
        return asGuarded(this.container.findChildByName("reload_room_btn"), isIButtonWindow);
    }

    private get rollbackButton(): IButtonWindow {
        return asGuarded(this.container.findChildByName("roll_back_btn"), isIButtonWindow);
    }

    private get selectedModifyMask(): number {
        let _loc1_: ICheckBoxWindow = null;
        let _loc3_: number = 0;
        for (const _loc2_ of this.MODIFY_PERMISSION_OPTIONS ?? []) {
            _loc1_ = this.getModifyCheckbox(_loc2_ | 0);
            if (_loc1_.isSelected) {
                _loc3_ |= 1 << _loc2_;
            }
        }
        return _loc3_;
    }

    private get selectedReadMask(): number {
        let _loc1_: ICheckBoxWindow = null;
        let _loc3_: number = 0;
        for (const _loc2_ of this.READ_PERMISSION_OPTIONS ?? []) {
            _loc1_ = this.getReadCheckbox(_loc2_ | 0);
            if (_loc1_.isSelected) {
                _loc3_ |= 1 << _loc2_;
            }
        }
        return _loc3_;
    }

    private set selectedModifyMask(param1: number) {
        let _loc2_: ICheckBoxWindow = null;
        for (const _loc3_ of this.MODIFY_PERMISSION_OPTIONS ?? []) {
            _loc2_ = this.getModifyCheckbox(_loc3_ | 0);
            Util.select(_loc2_, (param1 & 1 << _loc3_) != 0);
        }
    }

    private set selectedReadMask(param1: number) {
        let _loc2_: ICheckBoxWindow = null;
        for (const _loc3_ of this.READ_PERMISSION_OPTIONS ?? []) {
            _loc2_ = this.getReadCheckbox(_loc3_ | 0);
            Util.select(_loc2_, (param1 & 1 << _loc3_) != 0);
        }
    }
}
