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

export class MoveUserToFurni extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::MoveUserToFurni'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4592: RadioGroupPreset;

    public override get code(): number {
        return ActionTypeCodes.MOVE_USER_TO_FURNI;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4592.selected];
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4592.selected = param1.intParams[0] | 0;
    }

    public override furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title.mv.1";
    }

    public override userSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title.mv_user2";
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4592 = param1.createRadioGroup([new RadioButtonParam(0, this.l("user_move.walkmode.0")), new RadioButtonParam(1, this.l("user_move.walkmode.1")), new RadioButtonParam(2, this.l("user_move.walkmode.2"))]);
        this._SafeStr_4592.selected = 0;
        let _loc4_: SectionPreset = param1.createSection(this.l("user_move.walkmode"), this._SafeStr_4592);
        param3.addElements(_loc4_);
    }
}
