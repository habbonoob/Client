import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';

export class Teleport extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::Teleport'); }

    constructor() {
        super();
    }

    declare private _SafeStr_5767: CheckboxGroupPreset;

    public override get code(): number {
        return ActionTypeCodes._SafeStr_7550;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc6_: any[] = [new CheckboxOptionParam(this.loc("wiredfurni.params.teleport.options.0"))];
        let _loc4_: CheckboxGroupPreset = param1.createCheckboxGroup(_loc6_);
        let _loc5_: SectionPreset = param1.createSection(this.loc("wiredfurni.params.teleport.options"), _loc4_);
        param3.addElements(_loc5_);
        this._SafeStr_5767 = _loc4_;
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_5767._SafeStr_2119(0).selected = param1.getBoolean(0);
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_5767._SafeStr_2119(0).selected ? 1 : 0];
    }
}
