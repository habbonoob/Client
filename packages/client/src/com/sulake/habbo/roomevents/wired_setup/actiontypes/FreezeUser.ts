import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';

export class FreezeUser extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::FreezeUser'); }

    constructor() {
        super();
    }

    declare private _effectDropdown: DropdownPreset;

    declare private _cancelCheckbox: CheckboxGroupPreset;

    public override get code(): number {
        return ActionTypeCodes.FREEZE_USER;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc5_: number = 0;
        let _loc4_: ExpandableDropdownOption[] = [];
        _loc5_ = 0;
        while (_loc5_ <= 4) {
            _loc4_.push(new ExpandableDropdownOption(_loc5_, this.l("freeze.effect." + _loc5_)));
            _loc5_++;
        }
        this._effectDropdown = param1.createDropdown(new DropdownParam("${wiredfurni.params.freeze.effect_selection}", _loc4_));
        this._cancelCheckbox = param1.createCheckboxGroup([new CheckboxOptionParam(this.l("freeze.cancel_on_teleport"), 0)]);
        let _loc7_: SimpleListViewPreset = param1.createSimpleListView(true, [this._effectDropdown, this._cancelCheckbox]);
        let _loc6_: SectionPreset = param1.createSection("${wiredfurni.params.freeze.effect_selection}", _loc7_);
        param3.addElements(_loc6_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._effectDropdown.selectedId = param1.intParams[0] | 0;
        this._cancelCheckbox._SafeStr_2119(0).selected = param1.getBoolean(1);
    }

    public override readIntParamsFromForm(): any[] {
        return [this._effectDropdown.selectedId, this._cancelCheckbox._SafeStr_2119(0).selected ? 1 : 0];
    }
}
