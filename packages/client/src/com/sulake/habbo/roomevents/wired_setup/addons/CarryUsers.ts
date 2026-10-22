import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class CarryUsers extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::CarryUsers'); }

    constructor() {
        super();
    }

    declare private carryUsersMode: RadioGroupPreset;

    public override get code(): number {
        return AddonCodes.CARRY_USERS;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: any[] = [new RadioButtonParam(0, this.loc("wiredfurni.params.carry_mode.0")), new RadioButtonParam(1, this.loc("wiredfurni.params.carry_mode.1"))];
        let _loc5_: RadioGroupPreset = param1.createRadioGroup(_loc4_);
        let _loc6_: SectionPreset = param1.createSection(this.loc("wiredfurni.params.carry_mode"), _loc5_);
        param3.addElements(_loc6_);
        this.carryUsersMode = _loc5_;
    }

    public override readIntParamsFromForm(): any[] {
        return [this.carryUsersMode.selected];
    }

    public override onEditStart(param1: Triggerable): void {
        this.carryUsersMode.selected = param1.intParams[0] | 0;
    }

    public override userSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.users.title.carry";
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }
}
