import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';

export class _SafeCls_6092 extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::_SafeCls_6092'); }

    declare private _SafeStr_14605: DropdownPreset;

    declare private _SafeStr_14606: DropdownPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes._SafeStr_14589;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._SafeStr_14605.selectedId);
        _loc1_.push(this._SafeStr_14606.selectedId);
        return _loc1_;
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_14605.selectedId = param1.getInt(0);
        this._SafeStr_14606.selectedId = param1.getInt(1);
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: ExpandableDropdownOption[] = [];
        _loc4_.push(new ExpandableDropdownOption(0, "${wiredfurni.params.click_settings.user.0}"));
        _loc4_.push(new ExpandableDropdownOption(1, "${wiredfurni.params.click_settings.user.1}"));
        _loc4_.push(new ExpandableDropdownOption(2, "${wiredfurni.params.click_settings.user.2}"));
        this._SafeStr_14605 = param1.createDropdown(new DropdownParam("${wiredfurni.params.click_settings.user}", _loc4_));
        let _loc5_: SectionPreset = param1.createSection("${wiredfurni.params.click_settings.user}", this._SafeStr_14605);
        _loc4_ = [];
        _loc4_.push(new ExpandableDropdownOption(0, "${wiredfurni.params.click_settings.furni.0}"));
        _loc4_.push(new ExpandableDropdownOption(1, "${wiredfurni.params.click_settings.furni.1}"));
        this._SafeStr_14606 = param1.createDropdown(new DropdownParam("${wiredfurni.params.click_settings.furni}", _loc4_));
        let _loc6_: SectionPreset = param1.createSection("${wiredfurni.params.click_settings.furni}", this._SafeStr_14606);
        param3.addElements(_loc5_, _loc6_);
    }
}
