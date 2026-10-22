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

export class SetFurniStateTo extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::SetFurniStateTo'); }

    declare private _SafeStr_5186: CheckboxGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes._SafeStr_7567;
    }

    public override get hasStateSnapshot(): boolean {
        return true;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc5_: any[] = [new CheckboxOptionParam(this.loc("wiredfurni.params.condition.state")), new CheckboxOptionParam(this.loc("wiredfurni.params.condition.direction")), new CheckboxOptionParam(this.loc("wiredfurni.params.condition.position")), new CheckboxOptionParam(this.loc("wiredfurni.params.condition.altitude"))];
        this._SafeStr_5186 = param1.createCheckboxGroup(_loc5_);
        let _loc4_: SectionPreset = param1.createSection(this.loc("wiredfurni.params.conditions"), this._SafeStr_5186);
        param3.addElements(_loc4_);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < 4) {
            this._SafeStr_5186._SafeStr_2119(_loc2_).selected = param1.getBoolean(_loc2_);
            _loc2_ += 1;
        }
    }

    public override readIntParamsFromForm(): any[] {
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        _loc2_ = 0;
        while (_loc2_ < 4) {
            _loc1_.push(this._SafeStr_5186._SafeStr_2119(_loc2_).selected ? 1 : 0);
            _loc2_ += 1;
        }
        return _loc1_;
    }
}
