import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';

export class UserClicksUser extends DefaultTriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::UserClicksUser'); }

    declare private options: CheckboxGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return TriggerConfCodes.USER_CLICKS_USER;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc6_: any[] = [new CheckboxOptionParam(this.loc("wiredfurni.params.click_user.block_menu_open")), new CheckboxOptionParam(this.loc("wiredfurni.params.click_user.do_not_rotate"))];
        let _loc4_: CheckboxGroupPreset = param1.createCheckboxGroup(_loc6_);
        let _loc5_: SectionPreset = param1.createSection(this.loc("wiredfurni.params.click_user.settings"), _loc4_);
        param3.addElements(_loc5_);
        this.options = _loc4_;
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this.options.numCheckboxes) {
            this.options._SafeStr_2119(_loc2_).selected = param1.getBoolean(_loc2_);
            _loc2_ += 1;
        }
    }

    public override readIntParamsFromForm(): any[] {
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        _loc2_ = 0;
        while (_loc2_ < this.options.numCheckboxes) {
            _loc1_.push(this.options._SafeStr_2119(_loc2_).selected ? 1 : 0);
            _loc2_ += 1;
        }
        return _loc1_;
    }
}
