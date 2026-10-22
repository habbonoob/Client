import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FurnitureLabelData } from '@/com/sulake/habbo/room/object/data/FurnitureLabelData';
import type { _SafeCls_6113 } from '@/com/sulake/habbo/ui/handler/_SafeCls_6113';
import type { FurnitureLabelWidget } from '@/com/sulake/habbo/ui/widget/furniture/label/FurnitureLabelWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WindowUtils } from '@/com/sulake/core/window/utils/WindowUtils';

export class FurnitureLabelSettingsView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.label::FurnitureLabelSettingsView'); }

    private static readonly COLORS: any[] = [4278912, 2651759, 4157508, 8416562, 8409402, 8404554, 6834048, 5592405];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _widget: FurnitureLabelWidget;

    declare private _SafeStr_2143: _SafeCls_6113;

    declare private _window: IFrameWindow;

    declare private _SafeStr_14603: number;
    static { (this.prototype as any)._SafeStr_14603 = 0; }

    constructor(param1: FurnitureLabelWidget, param2: _SafeCls_6113) {
        this._widget = param1;
        this._SafeStr_2143 = param2;
        this._window = asGuarded(this._widget.windowManager.buildFromXML(XML.from(this._widget.assets.getAssetByName("furniture_label_settings_xml").content)), isIFrameWindow);
        this._window.procedure = this.windowProcedure;
        this.colorDropdown.populate([this.localize("widget.furniture_label.settings.color.blue", "Blue"), this.localize("widget.furniture_label.settings.color.teal", "Teal"), this.localize("widget.furniture_label.settings.color.green", "Green"), this.localize("widget.furniture_label.settings.color.gold", "Gold"), this.localize("widget.furniture_label.settings.color.orange", "Orange"), this.localize("widget.furniture_label.settings.color.red", "Red"), this.localize("widget.furniture_label.settings.color.purple", "Purple"), this.localize("widget.furniture_label.settings.color.charcoal", "Charcoal")]);
        this.visibilityDropdown.populate([this.localize("widget.furniture_label.settings.visibility.everyone", "Everyone"), this.localize("widget.furniture_label.settings.visibility.wired", "Users with Wired inspection rights")]);
        this.colorDropdown.addEventListener("WE_SELECTED", this.onColorSelected);
        this.visibilityDropdown.addEventListener("WE_SELECTED", this.onVisibilitySelected);
        this._window.center();
        this._window.visible = false;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public open(param1: number, param2: FurnitureLabelData): void {
        this._SafeStr_14603 = param1;
        let _loc3_: number = FurnitureLabelSettingsView.COLORS.indexOf(param2.bubbleColor);
        this.colorDropdown.selection = _loc3_ < 0 ? 0 : _loc3_;
        this.visibilityDropdown.selection = param2.visibility == 0 ? 0 : 1;
        this.alwaysOpenCheckbox.isSelected = param2.alwaysOpen;
        this.updateColorPreview();
        this.updateAlwaysOpenAvailability();
        this._window.visible = true;
        this._window.activate();
    }

    public close(): void {
        this._window.visible = false;
    }

    private save(): void {
        let _loc2_: number = this.colorDropdown.selection;
        if (_loc2_ < 0 || _loc2_ >= FurnitureLabelSettingsView.COLORS.length) {
            _loc2_ = 0;
        }
        let _loc1_: number = this.visibilityDropdown.selection == 0 ? 0 : 1;
        this._SafeStr_2143.saveLabelSettings(this._SafeStr_14603, FurnitureLabelSettingsView.COLORS[_loc2_] | 0, _loc1_, _loc1_ == 0 && Boolean(this.alwaysOpenCheckbox.isSelected));
        this.close();
    }

    private updateColorPreview(): void {
        let _loc1_: number = this.colorDropdown.selection;
        this.colorPreview.color = FurnitureLabelSettingsView.COLORS[_loc1_ < 0 || _loc1_ >= FurnitureLabelSettingsView.COLORS.length ? 0 : _loc1_] >>> 0;
    }

    private updateAlwaysOpenAvailability(): void {
        WindowUtils.disableSection(this.alwaysOpenSection, this.visibilityDropdown.selection != 0);
    }

    private onColorSelected = (param1: WindowEvent): void => {
        this.updateColorPreview();
    };

    private onVisibilitySelected = (param1: WindowEvent): void => {
        this.updateAlwaysOpenAvailability();
    };

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
            case "cancel_button":
                this.close();
                break;
            case "save_button":
                this.save();
        }
    };

    private localize(param1: string, param2: string): string {
        return this._widget.localizations.getLocalization(param1, param2);
    }

    private get colorDropdown(): IDropMenuWindow {
        return asGuarded(this._window.findChildByName("color_dropdown"), isIDropMenuWindow);
    }

    private get colorPreview(): IWindow {
        return this._window.findChildByName("color_preview");
    }

    private get visibilityDropdown(): IDropMenuWindow {
        return asGuarded(this._window.findChildByName("visibility_dropdown"), isIDropMenuWindow);
    }

    private get alwaysOpenSection(): IWindowContainer {
        return asGuarded(this._window.findChildByName("always_open_section"), isIWindowContainer);
    }

    private get alwaysOpenCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("always_open_checkbox"), isICheckBoxWindow);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.colorDropdown.removeEventListener("WE_SELECTED", this.onColorSelected);
        this.visibilityDropdown.removeEventListener("WE_SELECTED", this.onVisibilitySelected);
        this._window.procedure = null;
        this._window.dispose();
        this._window = null;
        this._SafeStr_2143 = null;
        this._widget = null;
        this._disposed = true;
    }

    get [IDisposable](): true {
        return true;
    }
}
