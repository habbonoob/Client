import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { SliderValueCountOrUnlimited } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueCountOrUnlimited';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';

export class GiveScore extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::GiveScore'); }

    static #staticsReady = false;

    private static _counterSliderMaxValue: number = 10;

    private static get _counterSliderUnlimitedValue(): number {
        GiveScore.#initStatics();
        return GiveScore._counterSliderUnlimitedValue;
    }
    private static set _counterSliderUnlimitedValue(value: number) {
        GiveScore.#initStatics();
        GiveScore._counterSliderUnlimitedValue = value;
    }

    declare private _SafeStr_4966: SliderSection;

    declare private _SafeStr_4159: SliderSection;

    declare private _SafeStr_4444: RadioGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.GIVE_SCORE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4966 = param1.createSliderSection("wiredfurni.params.setpoints2", "", SliderSection.CONVERTER_ECHO, 1, 1000, 1);
        this._SafeStr_4159 = param1.createSliderSection("wiredfurni.params.settimesingame", "times", new SliderValueCountOrUnlimited(GiveScore._counterSliderUnlimitedValue), 1, GiveScore._counterSliderUnlimitedValue, 1, false);
        this._SafeStr_4444 = param1.createRadioGroup([new RadioButtonParam(0, this.l("points_operation.0")), new RadioButtonParam(1, this.l("points_operation.1"))]);
        param3.addElements(this._SafeStr_4966, this._SafeStr_4159, param1.createSection(this.l("points_operation"), this._SafeStr_4444));
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: number = param1.intParams[0] | 0;
        let _loc3_: number = param1.intParams[1] | 0;
        let _loc4_: number = 0;
        if (_loc2_ < 0) {
            _loc2_ = -_loc2_;
            _loc4_ = 1;
        }
        this._SafeStr_4159.visible = _loc3_ != 0;
        this._SafeStr_4444.selected = _loc4_;
        this._SafeStr_4966.value = _loc2_;
        this._SafeStr_4159.value = _loc3_ == 0 ? GiveScore._counterSliderUnlimitedValue : _loc3_;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: number = this._SafeStr_4966.value;
        if (this._SafeStr_4444.selected == 1) {
            _loc1_ = -_loc1_;
        }
        let _loc2_: number = this._SafeStr_4159.value == GiveScore._counterSliderUnlimitedValue ? 0 : this._SafeStr_4159.value;
        return [_loc1_, _loc2_];
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (GiveScore.#staticsReady) return;
        GiveScore.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(GiveScore, name, { value, writable: true, configurable: true, enumerable: true });
        set("_counterSliderUnlimitedValue", 0);
        set("_counterSliderUnlimitedValue", GiveScore._counterSliderMaxValue + 1);
    }
}
