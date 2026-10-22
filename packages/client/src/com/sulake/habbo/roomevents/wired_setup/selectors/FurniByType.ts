import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';

export class FurniByType extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::FurniByType'); }

    constructor() {
        super();
    }

    declare private _stateCheckbox: CheckboxGroupPreset;

    public override get code(): number {
        return SelectorCodes.FURNI_BY_TYPE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._stateCheckbox = param1.createCheckboxGroup([new CheckboxOptionParam(this.l("state_match"), 0)]);
        let _loc4_: SectionPreset = param1.createSection(this.l("select_options"), this._stateCheckbox);
        param3.addElements(_loc4_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._stateCheckbox._SafeStr_2119(0).selected = param1.getBoolean(0);
    }

    public override readIntParamsFromForm(): any[] {
        return [this._stateCheckbox._SafeStr_2119(0).selected ? 1 : 0];
    }
}
