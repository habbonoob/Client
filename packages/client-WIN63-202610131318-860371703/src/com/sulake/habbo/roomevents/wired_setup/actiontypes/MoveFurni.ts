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

export class MoveFurni extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::MoveFurni'); }

    declare private _SafeStr_4636: RadioGroupPreset;

    declare private _SafeStr_4523: RadioGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.MOVE_FURNI;
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4636.selected = param1.intParams[0] | 0;
        this._SafeStr_4523.selected = param1.intParams[1] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4636.selected, this._SafeStr_4523.selected];
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc17_: RadioButtonParam = new RadioButtonParam(0, this.l("movefurni.0"), null, null, true);
        let _loc6_: RadioButtonParam = new RadioButtonParam(4, null);
        _loc6_.iconAssetName = "move_0";
        let _loc10_: RadioButtonParam = new RadioButtonParam(8, null);
        _loc10_.iconAssetName = "move_1";
        let _loc11_: RadioButtonParam = new RadioButtonParam(5, null);
        _loc11_.iconAssetName = "move_2";
        let _loc13_: RadioButtonParam = new RadioButtonParam(9, null);
        _loc13_.iconAssetName = "move_3";
        let _loc15_: RadioButtonParam = new RadioButtonParam(6, null);
        _loc15_.iconAssetName = "move_4";
        let _loc7_: RadioButtonParam = new RadioButtonParam(10, null);
        _loc7_.iconAssetName = "move_5";
        let _loc8_: RadioButtonParam = new RadioButtonParam(7, null);
        _loc8_.iconAssetName = "move_6";
        let _loc9_: RadioButtonParam = new RadioButtonParam(11, null);
        _loc9_.iconAssetName = "move_7";
        let _loc4_: RadioButtonParam = new RadioButtonParam(2, null);
        _loc4_.iconAssetName = "move_diag";
        let _loc18_: RadioButtonParam = new RadioButtonParam(3, null);
        _loc18_.iconAssetName = "move_vrt";
        let _loc5_: RadioButtonParam = new RadioButtonParam(1, null);
        _loc5_.iconAssetName = "move_rnd";
        this._SafeStr_4636 = param1.createRadioGroup([_loc17_, _loc6_, _loc10_, _loc11_, _loc13_, _loc15_, _loc7_, _loc8_, _loc9_, _loc4_, _loc18_, _loc5_], null, 4);
        this._SafeStr_4636.selected = 0;
        let _loc14_: SectionPreset = param1.createSection(this.l("movefurni"), this._SafeStr_4636);
        let _loc12_: RadioButtonParam = new RadioButtonParam(0, this.l("rotatefurni.0"));
        let _loc16_: RadioButtonParam = new RadioButtonParam(1, this.l("rotatefurni.1"));
        _loc16_.iconAssetName = "rotate_cw";
        let _loc20_: RadioButtonParam = new RadioButtonParam(2, this.l("rotatefurni.2"));
        _loc20_.iconAssetName = "rotate_ccw";
        let _loc19_: RadioButtonParam = new RadioButtonParam(3, this.l("rotatefurni.3"));
        this._SafeStr_4523 = param1.createRadioGroup([_loc12_, _loc16_, _loc20_, _loc19_]);
        this._SafeStr_4523.selected = 0;
        let _loc21_: SectionPreset = param1.createSection(this.l("rotatefurni"), this._SafeStr_4523);
        param3.addElements(_loc14_, _loc21_);
    }
}
