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

export class ToggleFurniState extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::ToggleFurniState'); }

    declare private toggleMode: RadioGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.TOGGLE_FURNI_STATE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: any[] = [new RadioButtonParam(0, this.loc("wiredfurni.params.toggletype.0")), new RadioButtonParam(1, this.loc("wiredfurni.params.toggletype.1"))];
        let _loc5_: RadioGroupPreset = param1.createRadioGroup(_loc4_);
        let _loc6_: SectionPreset = param1.createSection(this.loc("wiredfurni.params.toggletype_selection"), _loc5_);
        param3.addElements(_loc6_);
        this.toggleMode = _loc5_;
    }

    public override onEditStart(param1: Triggerable): void {
        this.toggleMode.selected = param1.intParams[0] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this.toggleMode.selected];
    }
}
