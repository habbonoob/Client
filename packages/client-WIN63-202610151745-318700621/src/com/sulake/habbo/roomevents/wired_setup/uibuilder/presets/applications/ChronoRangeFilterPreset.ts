import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { ChronoFieldRangeFilter } from '@/com/sulake/habbo/roomevents/wired_setup/common/utils/ChronoFieldRangeFilter';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class ChronoRangeFilterPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::ChronoRangeFilterPreset'); }

    public static readonly MODE_SKIP: number = 0;
    public static readonly MODE_EXACT: number = 1;
    public static readonly MODE_RANGE: number = 2;

    declare private _radioGroup: RadioGroupPreset;

    declare private _SafeStr_3137: NumberInputPreset;

    declare private _SafeStr_3421: NumberInputPreset;

    declare private _SafeStr_3380: NumberInputPreset;

    declare private _defaultValue: number;
    static { (this.prototype as any)._defaultValue = 0; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: string, param6: string, param7: number, param8: number, param9: number, param10: number) {
        super(param1, param2, param3);
        this._defaultValue = param7;
        this._SafeStr_3137 = param2.createNumberInput(new NumberInputParam(param7, param8, param9, param10));
        this._SafeStr_3421 = param2.createNumberInput(new NumberInputParam(param7, param8, param9, param10));
        this._SafeStr_3380 = param2.createNumberInput(new NumberInputParam(param7, param8, param9, param10));
        let _loc11_: TextPreset = param2.createText("-", new TextParam(0));
        let _loc12_: SimpleListViewPreset = param2.createSimpleListView(false, [this._SafeStr_3421, _loc11_, this._SafeStr_3380], true);
        let _loc13_: any[] = [new RadioButtonParam(0, param4), new RadioButtonParam(1, param5, this._SafeStr_3137), new RadioButtonParam(2, param6, _loc12_)];
        this._radioGroup = param2.createRadioGroup(_loc13_);
        this._radioGroup.selected = 0;
    }

    public applyFilter(param1: ChronoFieldRangeFilter): void {
        if (!param1.useFilter) {
            this._radioGroup.selected = 0;
            this._SafeStr_3137.value = this._defaultValue;
            this._SafeStr_3421.value = this._defaultValue;
            this._SafeStr_3380.value = this._defaultValue;
            return;
        }
        if (param1.min == param1.max) {
            this._radioGroup.selected = 1;
            this._SafeStr_3137.value = param1.min;
            this._SafeStr_3421.value = this._defaultValue;
            this._SafeStr_3380.value = this._defaultValue;
            return;
        }
        this._radioGroup.selected = 2;
        this._SafeStr_3421.value = param1.min;
        this._SafeStr_3380.value = param1.max;
        this._SafeStr_3137.value = this._defaultValue;
    }

    public getFilter(param1: string): ChronoFieldRangeFilter {
        if (this._radioGroup.selected == 0) {
            return new ChronoFieldRangeFilter(param1, false, this._defaultValue, this._defaultValue, this._defaultValue);
        }
        if (this._radioGroup.selected == 1) {
            return new ChronoFieldRangeFilter(param1, true, this._SafeStr_3137.value, this._SafeStr_3137.value, this._defaultValue);
        }
        return new ChronoFieldRangeFilter(param1, true, this._SafeStr_3421.value, this._SafeStr_3380.value, this._defaultValue);
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._radioGroup.resizeToWidth(param1);
    }

    public override get window(): IWindow {
        return this._radioGroup.window;
    }

    protected override get childPresets(): any[] {
        return [this._radioGroup];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._radioGroup = null;
        this._SafeStr_3137 = null;
        this._SafeStr_3421 = null;
        this._SafeStr_3380 = null;
    }
}
