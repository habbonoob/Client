import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class ControlClock extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::ControlClock'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4540: RadioGroupPreset;

    public override get code(): number {
        return ActionTypeCodes.CONTROL_CLOCK;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4540 = param1.createRadioGroup([new RadioButtonParam(0, this.l("clock_control.0")), new RadioButtonParam(1, this.l("clock_control.1")), new RadioButtonParam(2, this.l("clock_control.2")), new RadioButtonParam(3, this.l("clock_control.3")), new RadioButtonParam(4, this.l("clock_control.4"))]);
        this._SafeStr_4540.selected = 0;
        let _loc4_: SectionPreset = param1.createSection(this.l("clock_control"), this._SafeStr_4540);
        param3.addElements(_loc4_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4540.selected = param1.intParams[0] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4540.selected];
    }
}
