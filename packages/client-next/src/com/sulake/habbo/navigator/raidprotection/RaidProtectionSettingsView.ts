import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import type { RaidProtectionSettingsController } from '@/com/sulake/habbo/navigator/raidprotection/RaidProtectionSettingsController';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WindowUtils } from '@/com/sulake/core/window/utils/WindowUtils';
import { RaidProtectionSettingsData } from '@/com/sulake/habbo/navigator/raidprotection/RaidProtectionSettingsData';

export class RaidProtectionSettingsView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.navigator.raidprotection::RaidProtectionSettingsView'); }

    private static readonly SENSITIVITY_VALUES: number[] = Array.from([0, 1, 2]);
    private static readonly ACTION_VALUES: number[] = Array.from([0, 1]);
    private static readonly BAN_DURATION_VALUES: number[] = Array.from([300, 900, 1800, 3600, 10800, 21600, 43200, 86400, 259200, 604800]);
    private static readonly GUARD_DURATION_VALUES: number[] = Array.from([300, 900, 1800, 3600, 10800]);

    declare private _controller: RaidProtectionSettingsController;

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _window: IFrameWindow;

    declare private _data: RaidProtectionSettingsData;

    declare private _updatingControls: boolean;
    static { (this.prototype as any)._updatingControls = false; }

    declare private _SafeStr_14344: boolean;
    static { (this.prototype as any)._SafeStr_14344 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: RaidProtectionSettingsController, param2: IHabboTransitionalNavigator) {
        this._controller = param1;
        this._navigator = param2;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get visible(): boolean {
        return this._window != null && Boolean(this._window.visible);
    }

    public isShowingRoom(param1: number): boolean {
        return this.visible && this._data != null && this._data.roomId == param1;
    }

    public update(param1: RaidProtectionSettingsData): void {
        this.ensureWindow();
        this._data = param1;
        this._updatingControls = true;
        this.setChecked(this.enabledCheckbox, param1.enabled);
        this.setChecked(this.guardEnabledCheckbox, param1.guardEnabled);
        this.detectionDropdown.selection = RaidProtectionSettingsView.SENSITIVITY_VALUES.indexOf(param1.detectionSensitivity);
        this.actionDropdown.selection = RaidProtectionSettingsView.ACTION_VALUES.indexOf(param1.actionType);
        this.banDurationDropdown.selection = RaidProtectionSettingsView.BAN_DURATION_VALUES.indexOf(param1.banDurationSeconds);
        this.guardDurationDropdown.selection = RaidProtectionSettingsView.GUARD_DURATION_VALUES.indexOf(param1.guardDurationSeconds);
        this.guardSensitivityDropdown.selection = RaidProtectionSettingsView.SENSITIVITY_VALUES.indexOf(param1.guardSensitivity);
        this.incidentInactiveText.text = param1.lastRaidAtEpochSeconds > 0 ? this._navigator.localization.getLocalizationWithParams("raid.protection.settings.status.inactive.last", "", "timestamp", new Date(param1.lastRaidAtEpochSeconds * 1000).toLocaleString()) : "${raid.protection.settings.status.inactive}";
        this.incidentActiveText.visible = param1.incidentActive;
        this.incidentInactiveText.visible = !param1.incidentActive;
        this._updatingControls = false;
        this.refreshState();
    }

    public show(): void {
        this._window.visible = true;
        this._window.activate();
    }

    public hide(): void {
        if (this._window) {
            this._window.visible = false;
        }
    }

    public setSaveOutstanding(param1: boolean): void {
        this._SafeStr_14344 = param1;
        if (this.visible) {
            this.refreshState();
        }
    }

    private ensureWindow(): void {
        if (this._window) {
            return;
        }
        this._window = castGuarded(this._navigator.getXmlWindow("raid_protection_settings"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.center();
        this.detectionDropdown.populate(["${raid.protection.settings.sensitivity.low}", "${raid.protection.settings.sensitivity.medium}", "${raid.protection.settings.sensitivity.high}"]);
        this.actionDropdown.populate(["${raid.protection.settings.action.kick}", "${raid.protection.settings.action.temporary_ban}"]);
        this.banDurationDropdown.populate(this.durationLabels(RaidProtectionSettingsView.BAN_DURATION_VALUES));
        this.guardDurationDropdown.populate(this.durationLabels(RaidProtectionSettingsView.GUARD_DURATION_VALUES));
        this.guardSensitivityDropdown.populate(["${raid.protection.settings.sensitivity.low}", "${raid.protection.settings.sensitivity.medium}", "${raid.protection.settings.sensitivity.high}"]);
        for (const _loc1_ of this.controls ?? []) {
            _loc1_.addEventListener("WE_SELECTED", this.onControlChanged);
            _loc1_.addEventListener("WE_UNSELECTED", this.onControlChanged);
        }
        this.saveButton.addEventListener("WME_CLICK", this.onSave);
        this.cancelButton.addEventListener("WME_CLICK", this.onCancel);
        this._window.findChildByTag("close").addEventListener("WME_CLICK", this.onCancel);
    }

    private durationLabels(param1: number[]): any[] {
        let _loc3_: any[] = [];
        for (const _loc2_ of param1 ?? []) {
            _loc3_.push("${raid.protection.settings.duration." + _loc2_ + "}");
        }
        return _loc3_;
    }

    private onControlChanged = (param1: WindowEvent): void => {
        if (!this._updatingControls) {
            this.refreshState();
        }
    };

    private onSave = (param1: WindowEvent): void => {
        if (this._data == null) {
            return;
        }
        let _loc2_: RaidProtectionSettingsData = this.collectDraft();
        if (_loc2_ == null) {
            return;
        }
        this._controller.requestSave(_loc2_);
    };

    private onCancel = (param1: WindowEvent): void => {
        this._controller.close();
    };

    private collectDraft(): RaidProtectionSettingsData {
        if (this.detectionDropdown.selection < 0 || this.detectionDropdown.selection >= RaidProtectionSettingsView.SENSITIVITY_VALUES.length || this.actionDropdown.selection < 0 || this.actionDropdown.selection >= RaidProtectionSettingsView.ACTION_VALUES.length || this.banDurationDropdown.selection < 0 || this.banDurationDropdown.selection >= RaidProtectionSettingsView.BAN_DURATION_VALUES.length || this.guardDurationDropdown.selection < 0 || this.guardDurationDropdown.selection >= RaidProtectionSettingsView.GUARD_DURATION_VALUES.length || this.guardSensitivityDropdown.selection < 0 || this.guardSensitivityDropdown.selection >= RaidProtectionSettingsView.SENSITIVITY_VALUES.length) {
            return null;
        }
        return new RaidProtectionSettingsData(this._data.roomId, this.enabledCheckbox.isSelected, RaidProtectionSettingsView.SENSITIVITY_VALUES[this.detectionDropdown.selection], RaidProtectionSettingsView.ACTION_VALUES[this.actionDropdown.selection], RaidProtectionSettingsView.BAN_DURATION_VALUES[this.banDurationDropdown.selection], this.guardEnabledCheckbox.isSelected, RaidProtectionSettingsView.GUARD_DURATION_VALUES[this.guardDurationDropdown.selection], RaidProtectionSettingsView.SENSITIVITY_VALUES[this.guardSensitivityDropdown.selection], this._data.incidentActive, this._data.lastRaidAtEpochSeconds);
    }

    private refreshState(): void {
        if (this._window == null) {
            return;
        }
        let _loc2_: boolean = Boolean(this.enabledCheckbox.isSelected);
        let _loc1_: boolean = this.actionDropdown.selection == RaidProtectionSettingsView.ACTION_VALUES.indexOf(0);
        WindowUtils.disableSection(this.protectionControls, !_loc2_);
        WindowUtils.disableSection(this.banDurationSection, !_loc2_ || _loc1_);
        WindowUtils.disableSection(this.guardControls, !_loc2_ || !this.guardEnabledCheckbox.isSelected);
        WindowUtils.disableSection(this.saveButton, this._SafeStr_14344);
    }

    private setChecked(param1: ICheckBoxWindow, param2: boolean): void {
        if (param2) {
            param1.select();
        } else {
            param1.unselect();
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._window) {
            for (const _loc1_ of this.controls ?? []) {
                _loc1_.removeEventListener("WE_SELECTED", this.onControlChanged);
                _loc1_.removeEventListener("WE_UNSELECTED", this.onControlChanged);
            }
            this.saveButton.removeEventListener("WME_CLICK", this.onSave);
            this.cancelButton.removeEventListener("WME_CLICK", this.onCancel);
            this._window.findChildByTag("close").removeEventListener("WME_CLICK", this.onCancel);
            this._window.dispose();
            this._window = null;
        }
        this._controller = null;
        this._navigator = null;
        this._data = null;
    }

    private get controls(): any[] {
        return [this.enabledCheckbox, this.guardEnabledCheckbox, this.detectionDropdown, this.actionDropdown, this.banDurationDropdown, this.guardDurationDropdown, this.guardSensitivityDropdown];
    }

    private get enabledCheckbox(): ICheckBoxWindow {
        return castGuarded(this._window.findChildByName("enabled_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
    }

    private get protectionControls(): IWindowContainer {
        return castGuarded(this._window.findChildByName("protection_controls"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private get detectionDropdown(): IDropMenuWindow {
        return castGuarded(this._window.findChildByName("detection_sensitivity_dropdown"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
    }

    private get actionDropdown(): IDropMenuWindow {
        return castGuarded(this._window.findChildByName("action_type_dropdown"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
    }

    private get banDurationSection(): IWindowContainer {
        return castGuarded(this._window.findChildByName("ban_duration_section"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private get banDurationDropdown(): IDropMenuWindow {
        return castGuarded(this._window.findChildByName("ban_duration_dropdown"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
    }

    private get guardEnabledCheckbox(): ICheckBoxWindow {
        return castGuarded(this._window.findChildByName("guard_enabled_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
    }

    private get guardControls(): IWindowContainer {
        return castGuarded(this._window.findChildByName("guard_controls"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private get guardDurationDropdown(): IDropMenuWindow {
        return castGuarded(this._window.findChildByName("guard_duration_dropdown"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
    }

    private get guardSensitivityDropdown(): IDropMenuWindow {
        return castGuarded(this._window.findChildByName("guard_sensitivity_dropdown"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
    }

    private get incidentActiveText(): ITextWindow {
        return castGuarded(this._window.findChildByName("incident_active_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
    }

    private get incidentInactiveText(): ITextWindow {
        return castGuarded(this._window.findChildByName("incident_inactive_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
    }

    private get saveButton(): IButtonWindow {
        return castGuarded(this._window.findChildByName("save_button"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
    }

    private get cancelButton(): IButtonWindow {
        return castGuarded(this._window.findChildByName("cancel_button"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
    }

    get [IDisposable](): true {
        return true;
    }
}
