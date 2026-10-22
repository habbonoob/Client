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

export class MoveUser extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::MoveUser'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4636: RadioGroupPreset;

    declare private _SafeStr_4523: RadioGroupPreset;

    public override get code(): number {
        return ActionTypeCodes.MOVE_USER;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4636.selected = param1.intParams[0] | 0;
        this._SafeStr_4523.selected = param1.intParams[1] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4636.selected, this._SafeStr_4523.selected];
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc6_: number = 0;
        let _loc4_: RadioButtonParam = null;
        let _loc7_: number = 0;
        let _loc11_: RadioButtonParam = null;
        let _loc13_: RadioButtonParam = new RadioButtonParam(-1, this.l("movefurni.0"), null, null, true);
        let _loc9_: any[] = [_loc13_];
        _loc6_ = 0;
        while (_loc6_ < 8) {
            _loc4_ = new RadioButtonParam(_loc6_, null);
            _loc4_.iconAssetName = "move_" + _loc6_;
            _loc9_.push(_loc4_);
            _loc6_++;
        }
        this._SafeStr_4636 = param1.createRadioGroup(_loc9_, null, 4);
        this._SafeStr_4636.selected = -1;
        let _loc10_: SectionPreset = param1.createSection(this.l("moveuser"), this._SafeStr_4636);
        let _loc5_: RadioButtonParam = new RadioButtonParam(-1, this.l("rotatefurni.0"), null, null, true);
        let _loc8_: any[] = [_loc5_];
        _loc7_ = 0;
        while (_loc7_ < 8) {
            _loc11_ = new RadioButtonParam(_loc7_, null);
            _loc11_.iconAssetName = "move_" + _loc7_;
            _loc8_.push(_loc11_);
            _loc7_++;
        }
        let _loc12_: RadioButtonParam = new RadioButtonParam(9, null);
        _loc12_.iconAssetName = "rotate_cw";
        _loc8_.push(_loc12_);
        let _loc14_: RadioButtonParam = new RadioButtonParam(10, null);
        _loc14_.iconAssetName = "rotate_ccw";
        _loc8_.push(_loc14_);
        this._SafeStr_4523 = param1.createRadioGroup(_loc8_, null, 4);
        this._SafeStr_4523.selected = -1;
        let _loc15_: SectionPreset = param1.createSection(this.l("rotateuser"), this._SafeStr_4523);
        param3.addElements(_loc10_, _loc15_);
    }
}
