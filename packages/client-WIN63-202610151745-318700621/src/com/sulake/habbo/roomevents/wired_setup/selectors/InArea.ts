import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { IRoomAreaSelectionManager } from '@/com/sulake/habbo/room/IRoomAreaSelectionManager';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonPreset';
import type { ButtonRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonRowPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';

export class InArea extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::InArea'); }

    declare private _areaSelectionManager: IRoomAreaSelectionManager;

    declare private _rootX: number;
    static { (this.prototype as any)._rootX = 0; }

    declare private _rootY: number;
    static { (this.prototype as any)._rootY = 0; }

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    private _SafeStr_2910: boolean = false;

    declare private _SafeStr_5288: ButtonPreset;

    declare private _SafeStr_5723: ButtonPreset;

    declare private _SafeStr_4351: IButtonWindow;

    declare private _SafeStr_5837: IButtonWindow;

    constructor() {
        super();
    }

    private static enableButton(param1: IButtonWindow, param2: boolean): void {
        if (param1 == null) {
            return;
        }
        if (param2) {
            param1.enable();
        } else {
            param1.disable();
        }
    }

    public override onInit(param1: HabboUserDefinedRoomEvents): void {
        super.onInit(param1);
        this._areaSelectionManager = param1.roomEngine.areaSelectionManager;
    }

    public override onEditStart(param1: Triggerable): void {
        if (!this._SafeStr_2910) {
            this._SafeStr_2910 = this._areaSelectionManager.activate(this.onAreaSelected, "highlight_brighten");
        }
        this._rootX = param1.intParams[0] | 0;
        this._rootY = param1.intParams[1] | 0;
        this._width = param1.intParams[2] | 0;
        this._height = param1.intParams[3] | 0;
        if (this._SafeStr_2910) {
            this._areaSelectionManager.setHighlight(this._rootX, this._rootY, this._width, this._height);
            InArea.enableButton(this._SafeStr_4351, true);
            InArea.enableButton(this._SafeStr_5837, true);
        } else {
            InArea.enableButton(this._SafeStr_4351, false);
            InArea.enableButton(this._SafeStr_5837, false);
        }
    }

    public override onEditEnd(): void {
        super.onEditEnd();
        if (this._SafeStr_2910) {
            this._areaSelectionManager.deactivate();
            this._SafeStr_2910 = false;
        }
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._rootX);
        _loc1_.push(this._rootY);
        _loc1_.push(this._width);
        _loc1_.push(this._height);
        return _loc1_;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc5_: TextParam = new TextParam(1);
        _loc5_.textColor = param2.softTextColor;
        let _loc4_: TextPreset = param1.createText(this.l("area_selection.info"), _loc5_);
        this._SafeStr_5288 = param1.createButton(this.l("area_selection.select"), this.onSelect);
        this._SafeStr_5723 = param1.createButton(this.l("area_selection.clear"), this.onClear);
        let _loc7_: ButtonRowPreset = param1.createButtonRow([this._SafeStr_5288, this._SafeStr_5723]);
        let _loc6_: SectionPreset = param1.createSection(this.l("area_selection"), param1.createSimpleListView(true, [_loc4_, _loc7_]));
        param3.addElements(_loc6_);
        this._SafeStr_4351 = asGuarded(this._SafeStr_5288.window, isIButtonWindow);
        this._SafeStr_5837 = asGuarded(this._SafeStr_5723.window, isIButtonWindow);
    }

    private onSelect = (): void => {
        InArea.enableButton(this._SafeStr_4351, false);
        this._areaSelectionManager.startSelecting();
    };

    private onClear = (): void => {
        this._areaSelectionManager.clearHighlight();
    };

    private onAreaSelected = (param1: number, param2: number, param3: number, param4: number): void => {
        InArea.enableButton(this._SafeStr_4351, true);
        this._rootX = param1;
        this._rootY = param2;
        this._width = param3;
        this._height = param4;
    };
}
