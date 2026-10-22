import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class HasStackedFurnis extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::HasStackedFurnis'); }

    declare private _SafeStr_4872: RadioGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ConditionCodes.HAS_STACKED_FURNIS;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4872 = param1.createRadioGroup([new RadioButtonParam(0, this.l("requireall.0")), new RadioButtonParam(1, this.l("requireall.1"))]);
        let _loc4_: SectionPreset = param1.createSection(this.l("requireall"), this._SafeStr_4872);
        param3.addElements(_loc4_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4872.selected = param1.intParams[0] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4872.selected];
    }
}
