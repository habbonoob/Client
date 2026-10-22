import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class MoveToDirection extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::MoveToDirection'); }

    declare private _SafeStr_4624: RadioGroupPreset;

    declare private _SafeStr_4268: RadioGroupPreset;

    declare private _blockOnCollide: CheckboxGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.MOVE_TO_DIRECTION;
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4624.selected = param1.intParams[0] | 0;
        this._SafeStr_4268.selected = param1.intParams[1] | 0;
        this._blockOnCollide._SafeStr_2119(0).selected = param1.intParams[2] != 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4624.selected, this._SafeStr_4268.selected, this._blockOnCollide._SafeStr_2119(0).selected ? 1 : 0];
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc5_: number = 0;
        let _loc11_: RadioButtonParam = null;
        let _loc8_: number = 0;
        let _loc12_: any[] = [];
        _loc5_ = 0;
        while (_loc5_ < 8) {
            _loc11_ = new RadioButtonParam(_loc5_, null);
            _loc11_.iconAssetName = "move_" + _loc5_;
            _loc12_.push(_loc11_);
            _loc5_++;
        }
        this._SafeStr_4624 = param1.createRadioGroup(_loc12_, null, 4);
        this._SafeStr_4624.selected = 0;
        let _loc6_: SectionPreset = param1.createSection(this.l("startdir"), this._SafeStr_4624);
        let _loc7_: any[] = [];
        _loc8_ = 0;
        while (_loc8_ <= 6) {
            _loc7_.push(new RadioButtonParam(_loc8_, this.l("turn." + _loc8_)));
            _loc8_++;
        }
        this._SafeStr_4268 = param1.createRadioGroup(_loc7_);
        this._SafeStr_4268.selected = 0;
        let _loc9_: SectionPreset = param1.createSection(this.l("turn"), this._SafeStr_4268);
        let _loc4_: CheckboxOptionParam = new CheckboxOptionParam(this.l("user_collide.0"), 0);
        this._blockOnCollide = param1.createCheckboxGroup([_loc4_]);
        let _loc10_: SectionPreset = param1.createSection(this.l("user_collide"), this._blockOnCollide);
        param3.addElements(_loc6_, _loc9_, _loc10_);
    }
}
