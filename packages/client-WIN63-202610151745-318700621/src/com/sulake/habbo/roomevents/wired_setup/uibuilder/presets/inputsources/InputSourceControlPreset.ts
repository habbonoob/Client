import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { IconButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/IconButtonPreset';
import type { MiniAssetIconButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/MiniAssetIconButtonPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class InputSourceControlPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.inputsources::InputSourceControlPreset'); }

    declare private _preset: WiredUIPreset;

    declare private _listPreset: SimpleListViewPreset;

    declare private _textPreset: TextPreset;

    declare private _SafeStr_14414: WiredUIPreset;

    declare private _picker: WiredInputSourcePicker;

    declare private _SafeStr_14415: IconButtonPreset;

    declare private _SafeStr_14416: IconButtonPreset;

    declare private _layoutRefreshCallback: (...args: any[]) => any;

    declare private _furniPicking1Button: MiniAssetIconButtonPreset;

    declare private _furniPicking2Button: MiniAssetIconButtonPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number, param5: number, param6: boolean = false) {
        let roomEvents: HabboUserDefinedRoomEvents = param1;
        let presetManager: PresetManager = param2;
        let wiredStyle: WiredStyle = param3;
        let sourceType: number = param4;
        let id: number = param5;
        let dualFurniPickingMode: boolean = param6;
        super(roomEvents, presetManager, wiredStyle);
        this._picker = new WiredInputSourcePicker(roomEvents, sourceType, id);
        this._SafeStr_14415 = presetManager.createIconButtonPreset("left", (): void => {
             this._picker.onChangeInputSource(false);
             this.updateUI();
         });
        this._textPreset = presetManager.createText("", new TextParam(1, false, 0, false, "center"));
        this._SafeStr_14414 = this._textPreset.staticHeight(wiredStyle.inputSourceListMinHeight);
        this._SafeStr_14416 = presetManager.createIconButtonPreset("right", (): void => {
             this._picker.onChangeInputSource(true);
             this.updateUI();
         });
        this._listPreset = presetManager.createSimpleListView(false, [this._SafeStr_14415, this._SafeStr_14414, this._SafeStr_14416], true);
        this._listPreset.minHeight = wiredStyle.inputSourceListMinHeight;
        this._listPreset.spacing = wiredStyle.LRContainerSpacing;
        this._preset = presetManager.createPaddedContainerPreset(this._listPreset, wiredStyle.LRContainerMargin, wiredStyle.LRContainerTopBottomPadding, wiredStyle.LRContainerMargin, wiredStyle.LRContainerTopBottomPadding);
        this.centerTextVertically();
        if (dualFurniPickingMode) {
            this._furniPicking1Button = presetManager.createMiniAssetIconButtonPreset("furni_picks_1", "${wiredfurni.params.furni_picking.tooltip}", this.onFurniPicks1Clicked);
            this._furniPicking2Button = presetManager.createMiniAssetIconButtonPreset("furni_picks_2", "${wiredfurni.params.furni_picking.tooltip}", this.onFurniPicks2Clicked);
        }
    }

    private onFurniPicks1Clicked = (): void => {
        this._roomEvents.wiredCtrl.activeFurniPicks = 1;
    };

    private onFurniPicks2Clicked = (): void => {
        this._roomEvents.wiredCtrl.activeFurniPicks = 2;
    };

    public refresh(param1: Triggerable, param2: Element): void {
        this._picker.refreshContainer(param1, param2);
        this.updateUI();
    }

    public updateUI(): void {
        this.disabled = this._picker.disabled;
        this._SafeStr_14415.disabled = this._picker.isButtonsDisabled;
        this._SafeStr_14416.disabled = this._picker.isButtonsDisabled;
        this._textPreset.text = this._picker.selectedText;
        if (this._furniPicking1Button != null && this._furniPicking2Button != null) {
            this._furniPicking1Button.disabled = this._picker.disabled;
            this._furniPicking2Button.disabled = this._picker.disabled;
            switch (this._picker.stuffPickingSpecialMode) {
                case WiredInputSourcePicker.STUFF_PICKING_MODE_1:
                    this._furniPicking1Button.visible = true;
                    this._furniPicking2Button.visible = false;
                    this._furniPicking1Button.selected = this._roomEvents.wiredCtrl.activeFurniPicks == 1;
                    break;
                case WiredInputSourcePicker.STUFF_PICKING_MODE_2:
                    this._furniPicking1Button.visible = false;
                    this._furniPicking2Button.visible = true;
                    this._furniPicking2Button.selected = this._roomEvents.wiredCtrl.activeFurniPicks == 2;
                    break;
                default:
                    this._furniPicking1Button.visible = false;
                    this._furniPicking2Button.visible = false;
            }
        }
        if (this._layoutRefreshCallback != null) {
            this._layoutRefreshCallback();
        } else {
            this._listPreset.resize();
        }
        this.centerTextVertically();
    }

    private centerTextVertically(): void {
        this._textPreset.window.y = (this._SafeStr_14414.window.height - this._textPreset.window.height) / 2 | 0;
    }

    public activeFurniPicksChanged(): void {
        if (this._furniPicking1Button != null && this._furniPicking1Button.visible) {
            this._furniPicking1Button.selected = this._roomEvents.wiredCtrl.activeFurniPicks == 1;
        } else if (this._furniPicking2Button != null && this._furniPicking2Button.visible) {
            this._furniPicking2Button.selected = this._roomEvents.wiredCtrl.activeFurniPicks == 2;
        }
    }

    public changeMergedType(param1: number): void {
        this._picker.sourceType = param1;
        this.updateUI();
    }

    public get baseSourceType(): number {
        return this._picker.sourceType;
    }

    public get id(): number {
        return this._picker.id;
    }

    public get usesNonDefaultSelection(): boolean {
        return this._picker.usesNonDefaultSelection;
    }

    public get hasMeaningfulSelection(): boolean {
        return this._picker.hasMeaningfulSelection;
    }

    public get dualPickHeaderOptions(): any[] {
        if (this._furniPicking1Button == null || this._furniPicking2Button == null) {
            return [];
        }
        return [this._furniPicking1Button, this._furniPicking2Button];
    }

    public set layoutRefreshCallback(param1: (...args: any[]) => any) {
        this._layoutRefreshCallback = param1;
    }

    public override get window(): IWindow {
        return this._preset.window;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._preset.resizeToWidth(param1);
        this.centerTextVertically();
    }

    protected override get childPresets(): any[] {
        return [this._preset];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._picker.dispose();
        this._picker = null;
        this._preset = null;
        this._listPreset = null;
        this._textPreset = null;
        this._SafeStr_14414 = null;
        this._SafeStr_14415 = null;
        this._SafeStr_14416 = null;
        this._furniPicking1Button = null;
        this._furniPicking2Button = null;
        this._layoutRefreshCallback = null;
    }
}
