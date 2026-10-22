import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { AbstractGiveFromChest } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/chests/AbstractGiveFromChest';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';

export class GiveCurrencyFromChest extends AbstractGiveFromChest {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes.chests::GiveCurrencyFromChest'); }

    constructor() {
        super();
    }

    declare private _SafeStr_5067: DropdownPreset;

    declare private _SafeStr_5851: SectionPreset;

    public override get code(): number {
        return ActionTypeCodes.GIVE_CURRENCY_FROM_CHEST;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = super.readIntParamsFromForm();
        _loc1_.push(this._SafeStr_5067.selectedId);
        return _loc1_;
    }

    public override onEditStart(param1: Triggerable): void {
        super.onEditStart(param1);
        let _loc2_: number = param1.intParams[5] | 0;
        this._SafeStr_5067.selectedId = _loc2_;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: ExpandableDropdownOption[] = [new ExpandableDropdownOption(11, "${wiredfurni.params.earnings_category.11}"), new ExpandableDropdownOption(13, "${wiredfurni.params.earnings_category.13}")];
        this._SafeStr_5067 = param1.createDropdown(new DropdownParam("${wiredfurni.params.earnings_category}", _loc4_));
        this._SafeStr_5851 = param1.createSection("${wiredfurni.params.earnings_category}", this._SafeStr_5067, SectionParam.COLLAPSED);
        super.buildInputs(param1, param2, param3);
    }

    protected override finalizeBuilding(param1: WiredUIBuilder): void {
        super.finalizeBuilding(param1);
        param1.addElements(this._SafeStr_5851);
    }
}
