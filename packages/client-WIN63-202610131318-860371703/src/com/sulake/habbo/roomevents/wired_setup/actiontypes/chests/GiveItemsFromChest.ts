import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { AbstractGiveFromChest } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/chests/AbstractGiveFromChest';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';

export class GiveItemsFromChest extends AbstractGiveFromChest {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes.chests::GiveItemsFromChest'); }

    declare private _SafeStr_5211: SectionPreset;

    declare private _iterationModeRadioGroup: RadioGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.GIVE_FURNI_FROM_CHEST;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = super.readIntParamsFromForm();
        _loc1_.push(this._iterationModeRadioGroup.selected);
        return _loc1_;
    }

    public override onEditStart(param1: Triggerable): void {
        super.onEditStart(param1);
        let _loc2_: number = param1.intParams[5] | 0;
        this._iterationModeRadioGroup.selected = _loc2_;
        this._SafeStr_5211.disabled = this.rewardingMode == 1;
    }

    protected override onModeChange(param1: number): void {
        super.onModeChange(param1);
        this._SafeStr_5211.disabled = param1 == 1;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: any[] = [new RadioButtonParam(0, this.l("chest_iteration_type.0")), new RadioButtonParam(1, this.l("chest_iteration_type.1")), new RadioButtonParam(2, this.l("chest_iteration_type.2"))];
        this._iterationModeRadioGroup = param1.createRadioGroup(_loc4_);
        this._SafeStr_5211 = param1.createSection(this.l("chest_iteration_type"), this._iterationModeRadioGroup, SectionParam.COLLAPSED);
        super.buildInputs(param1, param2, param3);
    }

    protected override finalizeBuilding(param1: WiredUIBuilder): void {
        super.finalizeBuilding(param1);
        param1.addElements(this._SafeStr_5211);
    }
}
