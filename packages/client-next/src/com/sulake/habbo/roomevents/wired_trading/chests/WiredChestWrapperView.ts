import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IIconButtonWindow } from '@/com/sulake/core/window/components/IIconButtonWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { IWiredChestSubController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/IWiredChestSubController';
import type { WiredChestController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/WiredChestController';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIIconButtonWindow } from '@/com/sulake/core/window/components/IIconButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SetChestOptionsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/chests/SetChestOptionsMessageComposer';
import { StartAddingToChestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/chests/StartAddingToChestMessageComposer';
import { WithdrawAllFromChestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/chests/WithdrawAllFromChestMessageComposer';
import { WiredTransactionGetChestLogsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/transactions/WiredTransactionGetChestLogsMessageComposer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { ChestType } from '@/com/sulake/habbo/roomevents/wired_trading/chests/ChestType';
import { ChestNotificationSettingsUI } from '@/com/sulake/habbo/roomevents/wired_trading/chests/settings/ChestNotificationSettingsUI';
import { ChestSettingsUI } from '@/com/sulake/habbo/roomevents/wired_trading/chests/settings/ChestSettingsUI';
import { WiredChestUpgradeConfirmationView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/upgrade_confirmation/WiredChestUpgradeConfirmationView';
import { TransactionConfig } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/overview/TransactionConfig';
import { UbuntuPresetManager } from '@/com/sulake/habbo/roomevents/wired_trading/UbuntuPresetManager';

export class WiredChestWrapperView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.chests::WiredChestWrapperView'); }

    public static readonly _SafeStr_8708: string = "locked";
    public static readonly AUTO_LOCK_KEY: string = "auto_lock";
    public static readonly CAPACITY_KEY: string = "capacity";
    public static readonly CONTENTS_COUNT_KEY: string = "contents_count";
    public static readonly CAPACITY_LEVEL_KEY: string = "capacity_level";
    public static readonly CHEST_NAME_KEY: string = "chest_name";
    public static readonly CHEST_DESC_KEY: string = "chest_desc";
    public static readonly _SafeStr_8714: string = "everyone_can_open";
    public static readonly _SafeStr_8045: string = "everyone_can_donate";
    public static readonly STATE_CONTROL_MODE: string = "state_control_mode";
    public static readonly IS_WIRED_ENABLED: string = "is_wired_enabled";
    public static readonly NOTIFY_MODE: string = "notify_mode";
    public static readonly PREVIEW_MODE_KEY: string = "preview_mode";
    public static readonly PREVIEW_AMOUNT_KEY: string = "preview_amount";
    public static readonly DESKTOP_WINDOW_LAYER: number = 1;
    private _disposed: boolean = false;

    declare private _controller: WiredChestController;

    declare private _windowManager: IHabboWindowManager;

    declare private _window: IFrameWindow;

    declare private _SafeStr_2686: IBubbleWindow;

    private _SafeStr_3331: WiredChestUpgradeConfirmationView = null;

    declare private _SafeStr_2494: number;
    static { (this.prototype as any)._SafeStr_2494 = 0; }

    declare private _viewingChestFurni: IRoomObject;

    declare private _SafeStr_2747: boolean;
    static { (this.prototype as any)._SafeStr_2747 = false; }

    declare private _isRoomOwner: boolean;
    static { (this.prototype as any)._isRoomOwner = false; }

    declare private _SafeStr_2280: IWiredChestSubController;

    private _maxCapacityCache: number = -1;

    declare private _ignoreCheckboxSelectedEvents: boolean;
    static { (this.prototype as any)._ignoreCheckboxSelectedEvents = false; }

    declare private _ignoreCapacityChangeEvents: boolean;
    static { (this.prototype as any)._ignoreCapacityChangeEvents = false; }

    declare private _ignoreCheckboxSelectEvents: boolean;
    static { (this.prototype as any)._ignoreCheckboxSelectEvents = false; }

    declare private _ignoreResizeEvents: boolean;
    static { (this.prototype as any)._ignoreResizeEvents = false; }

    private _lastResizableWidth: number = -1;
    private _SafeStr_5808: number = -1;

    declare private _contentWidthOffset: number;
    static { (this.prototype as any)._contentWidthOffset = 0; }

    declare private _contentHeightOffset: number;
    static { (this.prototype as any)._contentHeightOffset = 0; }

    declare private _chestSettings: ChestSettingsUI;

    declare private _chestNotificationSettings: ChestNotificationSettingsUI;

    declare private _presetManager: PresetManager;

    constructor(param1: WiredChestController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(this._controller.assets.getAssetByName("chest_generic_xml").content), 1), isIFrameWindow);
        this._window.enableLookupCache();
        this._contentWidthOffset = this._window.width - this.chestContents.width;
        this._contentHeightOffset = this._window.height - this.chestContents.height - this.footer.height - this.header.height;
        this.closeButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.lockInfoButton.addEventListener("WME_CLICK", this.onInfoButtonClick);
        this.withdrawAllButton.addEventListener("WME_CLICK", this.onWithdrawAllClick);
        this.startDepositButton.addEventListener("WME_CLICK", this.onDepositClick);
        this.viewLogsButton.addEventListener("WME_CLICK", this.onViewLogsClick);
        this.lockChestCheckbox.addEventListener("WE_SELECT", this.onAttemptLockChest);
        this.lockChestCheckbox.addEventListener("WE_UNSELECT", this.onAttemptUnlockChest);
        let _loc4_: any[] = [this.lockChestCheckbox, this.autoLockChestCheckbox];
        for (const _loc3_ of _loc4_ ?? []) {
            _loc3_.addEventListener("WE_SELECTED", this.onOptionsChanged);
            _loc3_.addEventListener("WE_UNSELECTED", this.onOptionsChanged);
        }
        this.capacityInput.addEventListener("WME_CLICK_AWAY", this.onOptionsChanged);
        this.capacityInput.addEventListener("WKE_KEY_DOWN", this.onCapacityKeyDown);
        this.capacityInput.addEventListener("WE_CHANGE", this.onCapacityChange);
        this.maxCapacityUpgradeButton.addEventListener("WME_CLICK", this.onUpgradeCapacityClick);
        this.settingsButton.addEventListener("WME_CLICK", this.onClickSettings);
        this.notificationSettingsButton.addEventListener("WME_CLICK", this.onClickNotificationSettings);
        this._SafeStr_2686 = asGuarded(this._window.findChildByName("lock_info_bubble"), isIBubbleWindow);
        this._window.desktop.addChild(this._SafeStr_2686);
        this._SafeStr_2686.visible = false;
        this._SafeStr_2686.addEventListener("WE_DEACTIVATED", this.onLockInfoBubbleDeactivates);
        this._window.addEventListener("WE_RESIZED", this.onResizeWindow);
        this.show(null, null, 0, false, false);
        this.hide();
    }

    public static relocateBubbleFocus(param1: IBubbleWindow, param2: IWindowContainer): void {
        let _loc3_: Rectangle = new Rectangle();
        param2.getGlobalRectangle(_loc3_);
        param1.position = new Point(_loc3_.x + _loc3_.width + 3, _loc3_.y + 1 + _loc3_.height / 2 - param1.height / 2);
        param1.activate();
    }

    private onResizeWindow = (param1: WindowEvent): void => {
        if (this._ignoreResizeEvents) {
            return;
        }
        this.chestContents.height = this._window.height - this._contentHeightOffset - this.footer.height - this.header.height;
    };

    private onClickSettings = (param1: WindowMouseEvent): void => {
        let _loc2_: UtilsMap = this.getStuffDataMap();
        if (_loc2_ == null || this._SafeStr_2494 == 0 || this._SafeStr_2280 == null) {
            return;
        }
        this.chestSettingsUI.onEdit(this._SafeStr_2494, this._SafeStr_2280.type, this._viewingChestFurni.getModel().getNumber("furniture_type_id") | 0, this.isStarterChest, _loc2_);
    };

    private onClickNotificationSettings = (param1: WindowMouseEvent): void => {
        let _loc2_: UtilsMap = this.getStuffDataMap();
        if (_loc2_ == null || this._SafeStr_2494 == 0 || this._SafeStr_2280 == null) {
            return;
        }
        this.chestNotificationSettingsUI.onEdit(this._SafeStr_2494, this._SafeStr_2280.type, _loc2_);
    };

    private get isStarterChest(): boolean {
        let _loc2_: number = this._viewingChestFurni.getModel().getNumber("furniture_type_id") | 0;
        let _loc1_: IFurnitureData = this._controller.sessionDataManager.getFloorItemData(_loc2_);
        if (_loc1_ == null) {
            return false;
        }
        let _loc3_: string = this._controller.getProperty("wired.chests_starter_infix");
        return _loc3_ != "" && _loc1_.className.indexOf(_loc3_) != -1;
    }

    private onUpgradeCapacityClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2494 == 0 || this._viewingChestFurni == null) {
            return;
        }
        if (this._SafeStr_3331 == null) {
            this._SafeStr_3331 = new WiredChestUpgradeConfirmationView(this._controller);
        }
        this._SafeStr_3331.initialize(this._SafeStr_2494, this._SafeStr_2280.type, this._viewingChestFurni.getModel().getNumber("furniture_type_id") | 0, this.currentCapacityLevel);
        this._SafeStr_3331.show();
    };

    public get viewingChestFurni(): IRoomObject {
        return this._viewingChestFurni;
    }

    private onViewLogsClick = (param1: WindowMouseEvent): void => {
        this._controller.send(new WiredTransactionGetChestLogsMessageComposer(this._SafeStr_2494, TransactionConfig.PAGE_SIZE, 1));
    };

    private onDepositClick = (param1: WindowMouseEvent): void => {
        this._controller.send(new StartAddingToChestMessageComposer(this._SafeStr_2494));
    };

    private onWithdrawAllClick = (param1: WindowMouseEvent): void => {
        this._controller.roomEvents.windowManager.confirm("${wiredchests.withdraw_all.confirm.title}", "${wiredchests.withdraw_all.confirm.desc}", 0, this.onWithdrawAllConfirmed);
    };

    private onWithdrawAllConfirmed = (param1: IConfirmDialog, param2: WindowEvent): void => {
        param1.dispose();
        if (param2.type == "WE_OK") {
            this._controller.send(new WithdrawAllFromChestMessageComposer(this._SafeStr_2494));
        }
    };

    private onLockInfoBubbleDeactivates = (param1: WindowEvent): void => {
        this._SafeStr_2686.visible = false;
    };

    private onInfoButtonClick = (param1: WindowMouseEvent): void => {
        this._SafeStr_2686.visible = true;
        this.relocateBubbleAndFocus();
    };

    private relocateBubbleAndFocus(): void {
        WiredChestWrapperView.relocateBubbleFocus(this._SafeStr_2686, this.lockInfoButton);
    }

    private onWindowClose = (param1: WindowEvent): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.hide();
    };

    public isShowing(): boolean {
        return this._window != null && this._window.parent != null;
    }

    public get viewingChestId(): number {
        return this._SafeStr_2494;
    }

    public show(param1: IWiredChestSubController, param2: IRoomObject, param3: number, param4: boolean, param5: boolean): void {
        let _loc6_: IDesktopWindow = null;
        this._viewingChestFurni = param2;
        this._SafeStr_2494 = param3;
        this._SafeStr_2747 = param4;
        this._isRoomOwner = param5;
        if (this._SafeStr_2280 != null && this._SafeStr_2280 != param1) {
            this._SafeStr_2280.clear();
            if (this._SafeStr_2280.allowResizing) {
                this._lastResizableWidth = this.chestContents.width;
                this._SafeStr_5808 = this.chestContents.height;
            }
            if (this._chestSettings != null && this._chestSettings.isShowing()) {
                this._chestSettings.hide();
            }
            if (this._chestNotificationSettings != null && this._chestNotificationSettings.isShowing()) {
                this._chestNotificationSettings.hide();
            }
        }
        this._SafeStr_2280 = param1;
        if (this._window.parent == null) {
            _loc6_ = this._windowManager.getDesktop(1);
            if (_loc6_ != null) {
                _loc6_.addChild(this._window);
            }
        }
        if (param1 != null) {
            this.resetChestCaches();
            this.setSubController(param1);
            this.updateLayout();
            this.updateUIOptions();
            this.updateUI();
            this._SafeStr_2686.visible = false;
            this._window.activate();
        } else {
            this.setSubController(null);
        }
    }

    private resetChestCaches(): void {
        this._maxCapacityCache = -1;
    }

    public viewingChestUpdated(): void {
        this.resetChestCaches();
        if (this.isShowing() && !this.canRead && !this.isVisibleForEveryone) {
            this.hide();
        } else {
            this.updateLayout();
            this.updateUIOptions();
            this.updateUI();
        }
    }

    private get currentCapacityLevel(): number {
        let _loc1_: UtilsMap = this.getStuffDataMap();
        if (_loc1_ == null) {
            return 0;
        }
        return _loc1_.getValue("capacity_level") | 0;
    }

    private get maxCapacity(): number {
        if (this._maxCapacityCache != -1) {
            return this._maxCapacityCache;
        }
        let _loc2_: string = this._SafeStr_2280 != null && this._SafeStr_2280.type == ChestType.TYPE_COIN ? "coins" : "furni";
        if (this.isStarterChest) {
            this._maxCapacityCache = this._controller.getInteger("wired." + _loc2_ + "_chest.starter_capacity", 0);
            return this._maxCapacityCache;
        }
        let _loc1_: number = this._controller.getInteger("wired." + _loc2_ + "_chest.initial_capacity", 0);
        let _loc3_: number = this._controller.getInteger("wired." + _loc2_ + "_chest.upgrade_capacity", 0);
        this._maxCapacityCache = _loc1_ + _loc3_ * this.currentCapacityLevel;
        return this._maxCapacityCache;
    }

    private getStuffDataMap(): UtilsMap {
        if (this._viewingChestFurni == null || this._viewingChestFurni.getModel() == null) {
            return null;
        }
        return this._viewingChestFurni.getModel().getStringToStringMap("furniture_data");
    }

    public hide(): void {
        let _loc1_: IDesktopWindow = null;
        if (this.isShowing()) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
            this._SafeStr_2686.visible = false;
        }
        this.setSubController(null);
        this._controller.setClosedStatus();
        this._SafeStr_2494 = 0;
        this._viewingChestFurni = null;
        if (this._SafeStr_2280 != null) {
            this._SafeStr_2280.clear();
            this._SafeStr_2280 = null;
        }
        this.resetChestCaches();
        if (this._chestSettings != null && this._chestSettings.isShowing()) {
            this._chestSettings.hide();
        }
        if (this._chestNotificationSettings != null && this._chestNotificationSettings.isShowing()) {
            this._chestNotificationSettings.hide();
        }
    }

    public get isVisibleForEveryone(): boolean {
        let _loc1_: UtilsMap = this.getStuffDataMap();
        return _loc1_ != null && _loc1_.getValue("everyone_can_open") == "1";
    }

    public updateLayout(): void {
        if (this._SafeStr_2280 == null || this._viewingChestFurni == null) {
            return;
        }
        let _loc1_: UtilsMap = this.getStuffDataMap();
        if (_loc1_ == null) {
            return;
        }
        let _loc2_: boolean = _loc1_.getValue("is_wired_enabled") == "1";
        this._ignoreResizeEvents = true;
        if (!this.canRead) {
            this.settingsButton.visible = false;
            this.notificationSettingsButton.visible = false;
            this.lockingOptions.visible = false;
            this.capacityOptions.visible = false;
            this.upgradeCapacityContainer.visible = false;
            this.itemCountText.visible = false;
            this.itemCountTextBottom.visible = true;
            this.lockInfoButton.visible = false;
            this.viewLogsButton.visible = false;
            this.withdrawAllButton.visible = false;
            this.startDepositButton.caption = "${wiredchests.donate}";
        } else if (!_loc2_) {
            this.settingsButton.visible = true;
            this.notificationSettingsButton.visible = true;
            this.lockingOptions.visible = false;
            this.capacityOptions.visible = true;
            this.capacityOverrideContainer.visible = false;
            this.upgradeCapacityContainer.visible = true;
            this.itemCountText.visible = true;
            this.itemCountTextBottom.visible = false;
            this.lockInfoButton.visible = false;
            this.viewLogsButton.visible = true;
            this.withdrawAllButton.visible = true;
            this.startDepositButton.caption = "${wiredchests.start_deposit}";
        } else {
            this.settingsButton.visible = true;
            this.notificationSettingsButton.visible = true;
            this.lockingOptions.visible = true;
            this.capacityOptions.visible = true;
            this.capacityOverrideContainer.visible = true;
            this.upgradeCapacityContainer.visible = true;
            this.itemCountText.visible = false;
            this.itemCountTextBottom.visible = false;
            this.lockInfoButton.visible = true;
            this.viewLogsButton.visible = true;
            this.withdrawAllButton.visible = true;
            this.startDepositButton.caption = "${wiredchests.start_deposit}";
        }
        this._window.height = this.mainList.height + this._contentHeightOffset;
        this._ignoreResizeEvents = false;
    }

    public updateUIOptions(): void {
        this._ignoreCheckboxSelectedEvents = true;
        this._ignoreCapacityChangeEvents = true;
        let _loc1_: UtilsMap = this.getStuffDataMap();
        if (_loc1_ == null) {
            this._ignoreCheckboxSelectedEvents = false;
            this._ignoreCapacityChangeEvents = false;
            return;
        }
        Util.select(this.lockChestCheckbox, _loc1_.getValue("locked") != "0");
        Util.select(this.autoLockChestCheckbox, _loc1_.getValue("auto_lock") != "0");
        this.capacityInput.text = stringOrNull(_loc1_.getValue("capacity"));
        this._ignoreCheckboxSelectedEvents = false;
        this._ignoreCapacityChangeEvents = false;
        this.maxCapacityText.text = this._controller.localization.getLocalizationWithParams("wiredchests.max_capacity", "", "max_capacity", String(this.maxCapacity));
    }

    public updateUI(): void {
        if (this._SafeStr_2280 == null || this._viewingChestFurni == null) {
            return;
        }
        let _loc2_: UtilsMap = this.getStuffDataMap();
        if (_loc2_ == null) {
            return;
        }
        this._ignoreResizeEvents = true;
        let _loc3_: boolean = _loc2_.getValue("everyone_can_donate") == "1";
        let _loc1_: string = stringOrNull(_loc2_.getValue("chest_name"));
        let _loc4_: string = stringOrNull(_loc2_.getValue("chest_desc"));
        if (_loc4_ == null || _loc4_ == "") {
            _loc4_ = "${wiredchests.description_placeholder}";
        }
        let _loc5_: number = _loc2_.getValue("capacity") | 0;
        this.itemCountText.caption = this._controller.localization.getLocalizationWithParams("wiredchests.space_used2", "", "count", this._SafeStr_2280.itemCount, "total", _loc5_);
        this.itemCountTextBottom.caption = this._controller.localization.getLocalizationWithParams("wiredchests.space_used", "", "count", this._SafeStr_2280.itemCount, "total", _loc5_);
        if (_loc1_ != null && _loc1_.length > 0) {
            this._window.caption = _loc1_;
        } else {
            this._window.caption = this._SafeStr_2280.title;
        }
        this.description.text = _loc4_;
        Util.disableSection(this.lockChestCheckbox, !this._SafeStr_2747 && (!this._isRoomOwner || Boolean(this.lockChestCheckbox.isSelected)));
        Util.disableSection(this.autoLockChestCheckbox, !this._SafeStr_2747);
        Util.disableSection(this.capacityInputBorder, !this._SafeStr_2747);
        Util.disableSection(this.withdrawAllButton, !this.canWithdraw);
        Util.disableSection(this.startDepositButton, !_loc3_ && (!this.canEdit || this.lockChestCheckbox.isSelected && !this._SafeStr_2747));
        Util.disableSection(this.viewLogsButton, !this.canRead);
        Util.disableSection(this.settingsButton, !this._SafeStr_2747);
        Util.disableSection(this.notificationSettingsButton, !this._SafeStr_2747);
        if (this.isStarterChest) {
            Util.disableSection(this.maxCapacityUpgradeButton, true);
            this.upgradeCapacityRegion.toolTipCaption = "${wiredchests.upgrade.result.error.10}";
        } else if (!this._SafeStr_2747) {
            Util.disableSection(this.maxCapacityUpgradeButton, true);
            this.upgradeCapacityRegion.toolTipCaption = "${wiredchests.upgrade.error.reason.not_owner}";
        } else {
            Util.disableSection(this.maxCapacityUpgradeButton, false);
            this.upgradeCapacityRegion.toolTipCaption = "";
        }
        this._SafeStr_2280.updateUI();
        this._window.height = this.mainList.height + this._contentHeightOffset;
        this._ignoreResizeEvents = false;
    }

    private onOptionsChanged = (param1: WindowEvent): void => {
        if (this._ignoreCheckboxSelectedEvents) {
            return;
        }
        this._controller.send(new SetChestOptionsMessageComposer(this._SafeStr_2494, this.lockChestCheckbox.isSelected, this.autoLockChestCheckbox.isSelected, Number(this.capacityInput.text) | 0));
    };

    private onCapacityChange = (param1: WindowEvent): void => {
        if (this._ignoreCapacityChangeEvents) {
            return;
        }
        if ((Number(this.capacityInput.text) | 0) > this.maxCapacity) {
            this._ignoreCapacityChangeEvents = true;
            this.capacityInput.text = String(this.maxCapacity);
            this._ignoreCapacityChangeEvents = false;
        }
    };

    private onCapacityKeyDown = (param1: WindowKeyboardEvent): void => {
        if (param1.keyCode == 13) {
            this.onOptionsChanged(null);
        }
    };

    private onAttemptLockChest = (param1: WindowEvent): void => {
        if (this._ignoreCheckboxSelectedEvents || this._ignoreCheckboxSelectEvents) {
            return;
        }
        if (!this._SafeStr_2747) {
            param1.preventWindowOperation();
            this._controller.roomEvents.windowManager.confirm("${wiredchests.lock.confirm.title}", "${wiredchests.lock.confirm.desc}", 0, this.onConfirmLockChest);
        }
    };

    private onAttemptUnlockChest = (param1: WindowEvent): void => {
        if (this._ignoreCheckboxSelectedEvents || this._ignoreCheckboxSelectEvents) {
            return;
        }
        param1.preventWindowOperation();
        this._controller.roomEvents.windowManager.confirm("${wiredchests.unlock.confirm.title}", "${wiredchests.unlock.confirm.desc}", 0, this.onConfirmUnlockChest);
    };

    private onConfirmLockChest = (param1: IConfirmDialog, param2: WindowEvent): void => {
        param1.dispose();
        if (param2.type == "WE_OK") {
            this._ignoreCheckboxSelectEvents = true;
            this.lockChestCheckbox.select();
            this._ignoreCheckboxSelectEvents = false;
        }
    };

    private onConfirmUnlockChest = (param1: IConfirmDialog, param2: WindowEvent): void => {
        param1.dispose();
        if (param2.type == "WE_OK") {
            this._ignoreCheckboxSelectEvents = true;
            this.lockChestCheckbox.unselect();
            this._ignoreCheckboxSelectEvents = false;
        }
    };

    public get canWithdraw(): boolean {
        return this._SafeStr_2280 != null && !this._SafeStr_2280.isEmpty && this.canEdit && (!this.lockChestCheckbox.isSelected || this._SafeStr_2747);
    }

    public get canEdit(): boolean {
        return this._SafeStr_2747 || this._controller.roomEvents.wiredMenu.hasWritePermission;
    }

    public get canRead(): boolean {
        return this._SafeStr_2747 || this._controller.roomEvents.wiredMenu.hasReadPermission;
    }

    private setSubController(param1: IWiredChestSubController): any {
        let _loc3_: IWindowContainer = null;
        this._ignoreResizeEvents = true;
        let _loc2_: IWindowContainer = null;
        if (param1 != null) {
            _loc2_ = param1.view;
        }
        if (this.chestContents.numChildren > 0) {
            _loc3_ = asGuarded(this.chestContents.getChildAt(0), isIWindowContainer);
            if (_loc2_ == _loc3_) {
                this._ignoreResizeEvents = false;
                return;
            }
            _loc3_.setParamFlag(128, false);
            _loc3_.setParamFlag(2048, false);
            this.chestContents.removeChild(_loc3_);
        }
        if (_loc2_ != null) {
            _loc2_.setParamFlag(128, false);
            _loc2_.setParamFlag(2048, false);
            if (!param1.allowResizing || this._SafeStr_5808 == -1) {
                this._window.width = _loc2_.width + this._contentWidthOffset;
                this.chestContents.height = _loc2_.height;
                this._window.height = this.mainList.height + this._contentHeightOffset;
            } else {
                this._window.width = this._lastResizableWidth + this._contentWidthOffset;
                this.chestContents.height = this._SafeStr_5808;
            }
            this._window.setParamFlag(65536, param1.allowResizing);
            this._window.height = this.mainList.height + this._contentHeightOffset;
            this.chestContents.addChild(_loc2_);
            if (param1.allowResizing) {
                _loc2_.width = this.chestContents.width;
                _loc2_.height = this.chestContents.height;
                _loc2_.setParamFlag(128, true);
                _loc2_.setParamFlag(2048, true);
            }
        }
        this._ignoreResizeEvents = false;
    }

    public get chestSettingsUI(): ChestSettingsUI {
        if (this._presetManager == null) {
            this._presetManager = new UbuntuPresetManager(this._controller.roomEvents);
        }
        if (this._chestSettings == null) {
            this._chestSettings = new ChestSettingsUI(this._controller, this._presetManager);
        }
        return this._chestSettings;
    }

    public get chestNotificationSettingsUI(): ChestNotificationSettingsUI {
        if (this._presetManager == null) {
            this._presetManager = new UbuntuPresetManager(this._controller.roomEvents);
        }
        if (this._chestNotificationSettings == null) {
            this._chestNotificationSettings = new ChestNotificationSettingsUI(this._controller, this._presetManager);
        }
        return this._chestNotificationSettings;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._chestSettings != null) {
            this._chestSettings.dispose();
            this._chestSettings = null;
        }
        if (this._chestNotificationSettings != null) {
            this._chestNotificationSettings.dispose();
            this._chestNotificationSettings = null;
        }
        if (this._SafeStr_3331 != null) {
            this._SafeStr_3331.dispose();
            this._SafeStr_3331 = null;
        }
        this.hide();
        this.setSubController(null);
        this._window.dispose();
        this._window = null;
        this._SafeStr_2686.dispose();
        this._SafeStr_2686 = null;
        this._controller = null;
        this._windowManager = null;
        this._presetManager = null;
        this._SafeStr_2494 = 0;
        this._viewingChestFurni = null;
        this.resetChestCaches();
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get mainList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("main_list"), isIItemListWindow);
    }

    private get chestContents(): IWindowContainer {
        return asGuarded(this._window.findChildByName("chest_contents"), isIWindowContainer);
    }

    private get lockInfoButton(): IRegionWindow {
        return asGuarded(this._window.findChildByName("lock_info_button"), isIRegionWindow);
    }

    private get description(): ITextWindow {
        return asGuarded(this._window.findChildByName("desc"), isITextWindow);
    }

    private get lockInfoBubbleTexts(): IItemListWindow {
        return asGuarded(this._SafeStr_2686.findChildByName("lock_info_bubble_texts"), isIItemListWindow);
    }

    private get settingsButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("settings_button"), isIContainerButtonWindow);
    }

    private get notificationSettingsButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("notification_settings_button"), isIContainerButtonWindow);
    }

    private get lockingOptions(): IItemListWindow {
        return asGuarded(this._window.findChildByName("locking_options"), isIItemListWindow);
    }

    private get capacityOptions(): IWindowContainer {
        return asGuarded(this._window.findChildByName("capacity_options"), isIWindowContainer);
    }

    private get capacityOverrideContainer(): IItemListWindow {
        return asGuarded(this._window.findChildByName("capacity_override_container"), isIItemListWindow);
    }

    private get upgradeCapacityContainer(): IItemListWindow {
        return asGuarded(this._window.findChildByName("upgrade_capacity_container"), isIItemListWindow);
    }

    private get itemCountText(): ITextWindow {
        return asGuarded(this._window.findChildByName("item_count_text"), isITextWindow);
    }

    private get itemCountTextBottom(): ITextWindow {
        return asGuarded(this._window.findChildByName("item_count_text_bottom"), isITextWindow);
    }

    private get header(): IWindowContainer {
        return asGuarded(this._window.findChildByName("header"), isIWindowContainer);
    }

    private get footer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("footer"), isIWindowContainer);
    }

    private get lockChestCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("lock_chest_cbx"), isICheckBoxWindow);
    }

    private get autoLockChestCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("auto_lock_chest_cbx"), isICheckBoxWindow);
    }

    private get capacityInput(): ITextFieldWindow {
        return asGuarded(this._window.findChildByName("capacity_input"), isITextFieldWindow);
    }

    private get capacityInputBorder(): IBorderWindow {
        return asGuarded(this._window.findChildByName("capacity_input_border"), isIBorderWindow);
    }

    private get maxCapacityText(): ITextWindow {
        return asGuarded(this._window.findChildByName("max_capacity_txt"), isITextWindow);
    }

    private get maxCapacityUpgradeButton(): IIconButtonWindow {
        return asGuarded(this._window.findChildByName("upgrade_capacity_btn"), isIIconButtonWindow);
    }

    private get upgradeCapacityRegion(): IRegionWindow {
        return asGuarded(this._window.findChildByName("upgrade_capacity_region"), isIRegionWindow);
    }

    private get withdrawAllButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("withdraw_all_btn"), isIButtonWindow);
    }

    private get startDepositButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("start_deposit_btn"), isIButtonWindow);
    }

    private get viewLogsButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("view_logs_btn"), isIButtonWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
