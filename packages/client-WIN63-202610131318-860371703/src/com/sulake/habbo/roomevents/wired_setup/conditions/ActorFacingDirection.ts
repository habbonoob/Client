import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';

export class ActorFacingDirection extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::ActorFacingDirection'); }

    declare private _directions: CheckboxGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ConditionCodes.USER_DIRECTION;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc5_: number = 0;
        let _loc7_: CheckboxOptionParam = null;
        let _loc4_: any[] = [];
        _loc5_ = 0;
        while (_loc5_ < 8) {
            _loc7_ = new CheckboxOptionParam(null);
            _loc7_.iconAssetName = "move_" + _loc5_;
            _loc4_.push(_loc7_);
            _loc5_++;
        }
        this._directions = param1.createCheckboxGroup(_loc4_, null, 4);
        let _loc6_: SectionPreset = param1.createSection(this.l("direction_selection"), this._directions);
        param3.addElements(_loc6_);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: number = 0;
        let _loc3_: number = param1.intParams[0] | 0;
        _loc2_ = 0;
        while (_loc2_ < 8) {
            this._directions._SafeStr_2119(_loc2_).selected = (_loc3_ & 1 << _loc2_) > 0;
            _loc2_++;
        }
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < this._directions.numCheckboxes) {
            if (this._directions._SafeStr_2119(_loc1_).selected) {
                _loc2_ |= 1 << _loc1_;
            }
            _loc1_++;
        }
        return [_loc2_];
    }
}
