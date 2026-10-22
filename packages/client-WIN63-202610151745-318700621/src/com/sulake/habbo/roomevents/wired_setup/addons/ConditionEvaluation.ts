import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { UsageInfoSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageInfoSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class ConditionEvaluation extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::ConditionEvaluation'); }

    private static _compareTypeOffset: number = 4;
    private static _compareTypes: number = 3;

    declare private _noteText: UsageInfoSection;

    declare private _SafeStr_4971: RadioGroupPreset;

    declare private _SafeStr_3224: NumberInputPreset[];

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.CONDITION_EVALUATION;
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        let _loc5_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < ConditionEvaluation._compareTypes) {
            this._SafeStr_3224[_loc3_].value = 0;
            _loc3_++;
        }
        let _loc4_: number = param1.intParams[0] | 0;
        if (_loc4_ == -1) {
            _loc2_ = param1.intParams[1] | 0;
            _loc5_ = param1.intParams[2] | 0;
            _loc4_ = ConditionEvaluation._compareTypeOffset + _loc2_;
            if (_loc2_ >= 0 && _loc2_ < this._SafeStr_3224.length) {
                this._SafeStr_3224[_loc2_].value = _loc5_;
            }
        }
        this._SafeStr_4971.selected = _loc4_;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        let _loc3_: number = this._SafeStr_4971.selected;
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        if (_loc3_ >= ConditionEvaluation._compareTypeOffset) {
            _loc2_ = _loc3_ - ConditionEvaluation._compareTypeOffset;
            _loc4_ = this._SafeStr_3224[_loc2_].value;
            _loc3_ = -1;
        }
        _loc1_.push(_loc3_);
        _loc1_.push(_loc2_);
        _loc1_.push(_loc4_);
        return _loc1_;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: number = 0;
        this._noteText = param1.createUsageInfoSection(this.l("cond_eval.note"));
        this._SafeStr_3224 = [];
        _loc4_ = 0;
        while (_loc4_ < ConditionEvaluation._compareTypes) {
            this._SafeStr_3224.push(param1.createNumberInput(new NumberInputParam(0, 0, 1000, 35, 0, false, false)));
            _loc4_++;
        }
        this._SafeStr_4971 = param1.createRadioGroup([new RadioButtonParam(0, this.l("eval_mode.0")), new RadioButtonParam(1, this.l("eval_mode.1")), new RadioButtonParam(2, this.l("eval_mode.2")), new RadioButtonParam(3, this.l("eval_mode.3")), new RadioButtonParam(4, this.l("eval_mode.cmp.0"), this._SafeStr_3224[0]), new RadioButtonParam(5, this.l("eval_mode.cmp.1"), this._SafeStr_3224[1]), new RadioButtonParam(6, this.l("eval_mode.cmp.2"), this._SafeStr_3224[2])]);
        let _loc5_: SectionPreset = param1.createSection(this.l("eval_mode"), this._SafeStr_4971);
        param3.addElements(this._noteText, _loc5_);
    }
}
