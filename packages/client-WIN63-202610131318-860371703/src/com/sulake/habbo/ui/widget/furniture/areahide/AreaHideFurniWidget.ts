import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomAreaSelectionManager } from '@/com/sulake/habbo/room/IRoomAreaSelectionManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { UseFurnitureMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/UseFurnitureMessageComposer';
import { SetAreaHideDataComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/SetAreaHideDataComposer';
import { FurnitureAreaHideWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureAreaHideWidgetHandler';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class AreaHideFurniWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.areahide::AreaHideFurniWidget'); }

    private static AUTO_SAVE: boolean = true;
    private static _textNames: any[] = ["hidearea_info", "areaselection_title", "areaselection_info", "options_title", "invisibility_txt", "invisibility_info", "wallitems_txt", "invert_txt", "invert_info"];

    declare private _areaSelectionManager: IRoomAreaSelectionManager;

    declare private _window: IFrameWindow;

    declare private _SafeStr_3915: number;
    static { (this.prototype as any)._SafeStr_3915 = 0; }

    declare private _isOn: boolean;
    static { (this.prototype as any)._isOn = false; }

    declare private _rootX: number;
    static { (this.prototype as any)._rootX = 0; }

    declare private _rootY: number;
    static { (this.prototype as any)._rootY = 0; }

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _length: number;
    static { (this.prototype as any)._length = 0; }

    private _SafeStr_3720: boolean = false;
    private _SafeStr_4134: boolean = false;
    private _SafeStr_2910: boolean = false;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: IRoomEngine) {
        super(param1, param2, param3, param4);
        this.handler.widget = this;
        this._areaSelectionManager = param5.areaSelectionManager;
    }

    private static disableElement(param1: boolean, param2: IWindow): void {
        if (param1) {
            param2.disable();
        } else {
            param2.enable();
        }
    }

    public get handler(): FurnitureAreaHideWidgetHandler {
        return this._SafeStr_2143 instanceof FurnitureAreaHideWidgetHandler ? this._SafeStr_2143 : null;
    }

    public override dispose(): void {
        this.destroyWindow();
        super.dispose();
    }

    public open(param1: number, param2: boolean, param3: number, param4: number, param5: number, param6: number, param7: boolean, param8: boolean, param9: boolean): void {
        this._SafeStr_3915 = param1;
        this._isOn = param2;
        this._rootX = param3;
        this._rootY = param4;
        this._width = param5;
        this._length = param6;
        this.createWindow();
        this.invisibilityCheckbox.isSelected = param7;
        this.wallItemsEnabledCheckbox.isSelected = param8;
        this.invertEnabledCheckbox.isSelected = param9;
        this._SafeStr_3720 = false;
        this._SafeStr_4134 = false;
        this.updateAreaSelecting();
        this.refreshUI();
    }

    private get isActive(): boolean {
        return this._window != null && Boolean(this._window.visible);
    }

    public updateStatus(param1: number, param2: boolean): void {
        if (this.isActive && param1 == this._SafeStr_3915 && param2 != this._isOn) {
            this._isOn = param2;
            this.updateAreaSelecting();
            this.refreshUI();
        }
    }

    private updateAreaSelecting(): void {
        if (!this._isOn) {
            if (!this._SafeStr_2910) {
                this._SafeStr_2910 = this._areaSelectionManager.activate(this.onAreaSelected, "highlight_darken");
            }
            if (this._SafeStr_2910) {
                this._areaSelectionManager.setHighlight(this._rootX, this._rootY, this._width, this._length);
            }
        } else if (this._SafeStr_2910) {
            this._areaSelectionManager.deactivate();
            this._SafeStr_2910 = false;
        }
    }

    private createWindow(): void {
        if (!this._window) {
            this._window = castGuarded(this.windowManager.buildFromXML(asInstanceOf(this.assets.getAssetByName("area_hide_ui_xml").content, XML)), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
            this._window.procedure = this.windowProcedure;
            this.invisibilityCheckbox.addEventListener("WE_SELECTED", this.onSettingsChanged);
            this.invisibilityCheckbox.addEventListener("WE_UNSELECTED", this.onSettingsChanged);
            this.wallItemsEnabledCheckbox.addEventListener("WE_SELECTED", this.onSettingsChanged);
            this.wallItemsEnabledCheckbox.addEventListener("WE_UNSELECTED", this.onSettingsChanged);
            this.invertEnabledCheckbox.addEventListener("WE_SELECTED", this.onSettingsChanged);
            this.invertEnabledCheckbox.addEventListener("WE_UNSELECTED", this.onSettingsChanged);
            this.applyButton.visible = !AreaHideFurniWidget.AUTO_SAVE;
            this._window.center();
        } else {
            this._window.visible = true;
        }
    }

    private hideWindow(): void {
        if (this._window) {
            this._window.visible = false;
            if (this._SafeStr_2910) {
                this._areaSelectionManager.deactivate();
                this._SafeStr_2910 = false;
            }
            this._SafeStr_3915 = -1;
            this._isOn = false;
            this._rootX = 0;
            this._rootY = 0;
            this._width = 0;
            this._length = 0;
        }
    }

    private destroyWindow(): void {
        this.hideWindow();
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    private refreshUI(): void {
        if (this._isOn) {
            this.onOffButton.caption = this.localizations.getLocalization("widget.areahide.button.off");
            this.disableContents(true);
        } else {
            this.onOffButton.caption = this.localizations.getLocalization("widget.areahide.button.on");
            this.disableContents(false);
            AreaHideFurniWidget.disableElement(!this._SafeStr_3720, this.applyButton);
            AreaHideFurniWidget.disableElement(this._SafeStr_4134 || !this._SafeStr_2910, this.selectButton);
            AreaHideFurniWidget.disableElement(!this._SafeStr_2910, this.clearButton);
        }
    }

    private disableContents(param1: boolean): void {
        let _loc3_: ITextWindow = null;
        AreaHideFurniWidget.disableElement(param1, this.selectButton);
        AreaHideFurniWidget.disableElement(param1, this.clearButton);
        AreaHideFurniWidget.disableElement(param1, this.applyButton);
        AreaHideFurniWidget.disableElement(param1, this.invisibilityCheckbox);
        this.invisibilityCheckbox.blend = param1 ? 0.5 : 1;
        AreaHideFurniWidget.disableElement(param1, this.wallItemsEnabledCheckbox);
        this.wallItemsEnabledCheckbox.blend = param1 ? 0.5 : 1;
        AreaHideFurniWidget.disableElement(param1, this.invertEnabledCheckbox);
        this.invertEnabledCheckbox.blend = param1 ? 0.5 : 1;
        for (const _loc2_ of AreaHideFurniWidget._textNames ?? []) {
            _loc3_ = asGuarded(this._window.findChildByName(stringOrNull(_loc2_)), isITextWindow);
            _loc3_.blend = param1 ? 0.5 : 1;
        }
    }

    private onAreaSelected = (param1: number, param2: number, param3: number, param4: number): void => {
        this._rootX = param1;
        this._rootY = param2;
        this._width = param3;
        this._length = param4;
        this._SafeStr_4134 = false;
        this.onSettingsChanged(null);
    };

    private onClickSelect(): void {
        this._SafeStr_4134 = true;
        this._areaSelectionManager.startSelecting();
        this.refreshUI();
    }

    private onClickClear(): void {
        this._areaSelectionManager.clearHighlight();
    }

    private onClickOnOff(): void {
        this.handler.container.connection.send(new UseFurnitureMessageComposer(this._SafeStr_3915));
    }

    private onClickApply(): void {
        if (!this._SafeStr_3720 || AreaHideFurniWidget.AUTO_SAVE) {
            return;
        }
        this.updateData();
        this.applyButton.disable();
    }

    private updateData(): void {
        this.handler.container.connection.send(new SetAreaHideDataComposer(this._SafeStr_3915, this._rootX, this._rootY, this._width, this._length, this.invisibilityCheckbox.isSelected, this.wallItemsEnabledCheckbox.isSelected, this.invertEnabledCheckbox.isSelected));
        this._SafeStr_3720 = false;
    }

    private onSettingsChanged = (param1: WindowEvent): void => {
        this._SafeStr_3720 = true;
        if (AreaHideFurniWidget.AUTO_SAVE) {
            this.updateData();
        }
        this.refreshUI();
    };

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param2 != null && param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "apply_button":
                    this.onClickApply();
                    break;
                case "on_off_button":
                    this.onClickOnOff();
                    break;
                case "select_button":
                    this.onClickSelect();
                    break;
                case "clear_button":
                    this.onClickClear();
                    break;
                case "header_button_close":
                    this.hideWindow();
            }
        }
    };

    private get selectButton(): IButtonWindow {
        this._window.deactivate();
        return asGuarded(this._window.findChildByName("select_button"), isIButtonWindow);
    }

    private get clearButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("clear_button"), isIButtonWindow);
    }

    private get applyButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("apply_button"), isIButtonWindow);
    }

    private get onOffButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("on_off_button"), isIButtonWindow);
    }

    private get invisibilityCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("invisiblity_checkbox"), isICheckBoxWindow);
    }

    private get wallItemsEnabledCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("wallitems_checkbox"), isICheckBoxWindow);
    }

    private get invertEnabledCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("invert_checkbox"), isICheckBoxWindow);
    }
}
