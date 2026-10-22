import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { _SafeCls_6106 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/_SafeCls_6106';
import type { _SafeCls_6107 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/_SafeCls_6107';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { VariableFxEditorMetadata } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxEditorMetadata';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VariableFxValueRangePreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.presets::VariableFxValueRangePreset'); }

    declare private _SafeStr_2333: _SafeCls_6107;

    declare private _state: _SafeCls_6106;

    declare private _SafeStr_4202: boolean;
    static { (this.prototype as any)._SafeStr_4202 = false; }

    declare private _SafeStr_2848: SectionPreset;

    declare private _SafeStr_14643: NumberInputPreset;

    declare private _SafeStr_14644: NumberInputPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: _SafeCls_6107) {
        super(param1, param2, param3);
        this._SafeStr_2333 = param4;
        this._SafeStr_14643 = param2.createNumberInput(new NumberInputParam(0, -2147483648, 2147483647, -1));
        this._SafeStr_14644 = param2.createNumberInput(new NumberInputParam(100, -2147483648, 2147483647, -1));
        this._SafeStr_14643.onValueChange = this.onNumberChange;
        this._SafeStr_14644.onValueChange = this.onNumberChange;
        let _loc8_: TextParam = new TextParam(1);
        _loc8_.textColor = param3.softTextColor;
        let _loc6_: TextPreset = param2.createText("${wiredfurni.params.variablefx.value_range.info}", _loc8_);
        let _loc9_: TextPreset = param2.createText("Min:", new TextParam(0, false));
        _loc9_.window.width = 26;
        let _loc5_: TextPreset = param2.createText("-", new TextParam(0, false));
        _loc5_.window.width = 8;
        let _loc7_: TextPreset = param2.createText("Max:", new TextParam(0, false));
        _loc7_.window.width = 30;
        let _loc10_: WiredUIPreset = param2.createSimpleListView(false, [_loc9_, this._SafeStr_14643, _loc5_, _loc7_, this._SafeStr_14644], true);
        this._SafeStr_2848 = param2.createSection("${wiredfurni.params.variablefx.value_range}", param2.createSimpleListView(true, [_loc6_, _loc10_]));
    }

    public init(param1: _SafeCls_6106): void {
        this._state = param1;
        this.refreshForState(param1);
    }

    public applyToState(param1: _SafeCls_6106): void {
        if (this.visible) {
            param1.defaultMinValue = this._SafeStr_14643.value;
            param1.defaultMaxValue = this._SafeStr_14644.value;
        }
    }

    public refreshForState(param1: _SafeCls_6106): void {
        this._SafeStr_4202 = true;
        this.visible = VariableFxEditorMetadata.categoryUsesValueRange(param1.categoryId);
        this._SafeStr_14643.value = param1.defaultMinValue;
        this._SafeStr_14644.value = param1.defaultMaxValue;
        this._SafeStr_4202 = false;
    }

    private onNumberChange = (param1: number): void => {
        if (this._SafeStr_4202) {
            return;
        }
        this.applyToState(this._state);
        this._state.sanitize();
        this._SafeStr_2333.variableFxStateChanged(this._state, true);
    };

    public override get window(): IWindow {
        return this._SafeStr_2848.window;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_2848.resizeToWidth(param1);
    }

    protected override get childPresets(): any[] {
        return [this._SafeStr_2848];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_2333 = null;
        this._state = null;
        this._SafeStr_2848 = null;
        this._SafeStr_14643 = null;
        this._SafeStr_14644 = null;
    }
}
