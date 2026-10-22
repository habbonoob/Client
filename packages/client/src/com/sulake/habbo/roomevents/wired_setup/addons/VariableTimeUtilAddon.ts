import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { VariableList } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableList';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SubVariableCreatorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/SubVariableCreatorPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { SubVariableParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/applications/SubVariableParam';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';

export class VariableTimeUtilAddon extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::VariableTimeUtilAddon'); }

    private static _SafeStr_7178: number = 0;
    private static TYPE_CREATION_TIME: number = 1;
    private static TYPE_LAST_UPDATE_TIME: number = 2;

    constructor() {
        super();
    }

    declare private _modeDropdown: DropdownPreset;

    declare private _subVariableCreatorPreset: SubVariableCreatorPreset;

    declare private _advancedSubVariableCreatorPreset: SubVariableCreatorPreset;

    public override get code(): number {
        return AddonCodes.VARIABLE_TIME_UTIL;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._modeDropdown = param1.createDropdown(new DropdownParam(this.l("choose_type"), Array.from([new ExpandableDropdownOption(VariableTimeUtilAddon._SafeStr_7178, this.l("time_util.mode.0")), new ExpandableDropdownOption(VariableTimeUtilAddon.TYPE_CREATION_TIME, this.l("time_util.mode.1")), new ExpandableDropdownOption(VariableTimeUtilAddon.TYPE_LAST_UPDATE_TIME, this.l("time_util.mode.2"))])));
        let _loc5_: SectionPreset = param1.createSection(this.l("choose_type"), this._modeDropdown);
        let _loc4_: any[] = [new SubVariableParam(1, "milliseconds_of_seconds"), new SubVariableParam(2, "seconds_of_minute"), new SubVariableParam(3, "minute_of_hour"), new SubVariableParam(4, "hour_of_day"), new SubVariableParam(5, "day_of_week"), new SubVariableParam(6, "day_of_month"), new SubVariableParam(7, "day_of_year"), new SubVariableParam(8, "week_of_year"), new SubVariableParam(9, "month_of_year"), new SubVariableParam(10, "year")];
        this._subVariableCreatorPreset = param1.createSubVariableCreator("wiredfurni.params.time_util.subvariable.", _loc4_);
        let _loc7_: SectionPreset = param1.createSection(this.loc("wiredfurni.params.create_subvariables"), this._subVariableCreatorPreset, SectionParam.EXPANDED);
        let _loc6_: any[] = [new SubVariableParam(20, "millisecond"), new SubVariableParam(21, "second"), new SubVariableParam(22, "minute"), new SubVariableParam(23, "hour"), new SubVariableParam(24, "day"), new SubVariableParam(25, "week"), new SubVariableParam(26, "month")];
        this._advancedSubVariableCreatorPreset = param1.createSubVariableCreator("wiredfurni.params.time_util.subvariable.", _loc6_);
        let _loc8_: SectionPreset = param1.createSection(this.l("create_subvariables.advanced"), param1.createSimpleListView(true, [param1.createText(this.l("time_util.advanced_info")), this._advancedSubVariableCreatorPreset]), SectionParam.COLLAPSED);
        param3.addElements(_loc5_, _loc7_, _loc8_);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: number = param1.getInt(0);
        let _loc5_: number = param1.getInt(1);
        this._subVariableCreatorPreset.mask = _loc2_ & 0xFFFF;
        this._advancedSubVariableCreatorPreset.mask = _loc2_ & 0xFFFF0000;
        let _loc4_: VariableList = param1.wiredContext.rulesetVariables;
        let _loc3_: ExpandableDropdownOption[] = [];
        if (this.showValue(_loc4_.variables, _loc5_)) {
            _loc3_.push(new ExpandableDropdownOption(VariableTimeUtilAddon._SafeStr_7178, this.l("time_util.mode.0")));
        }
        if (this.showCreationTime(_loc4_.variables, _loc5_)) {
            _loc3_.push(new ExpandableDropdownOption(VariableTimeUtilAddon.TYPE_CREATION_TIME, this.l("time_util.mode.1")));
        }
        if (this.showLastUpdateTime(_loc4_.variables, _loc5_)) {
            _loc3_.push(new ExpandableDropdownOption(VariableTimeUtilAddon.TYPE_LAST_UPDATE_TIME, this.l("time_util.mode.2")));
        }
        this._modeDropdown.reinit(_loc3_, _loc5_);
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._subVariableCreatorPreset.mask | this._advancedSubVariableCreatorPreset.mask);
        _loc1_.push(this._modeDropdown.selectedId);
        return _loc1_;
    }

    public showCreationTime(param1: any[], param2: number): boolean {
        if (param2 == VariableTimeUtilAddon.TYPE_CREATION_TIME || param1.length == 0) {
            return true;
        }
        for (const _loc3_ of param1 ?? []) {
            if (_loc3_.canReadCreationTime) {
                return true;
            }
        }
        return false;
    }

    public showLastUpdateTime(param1: any[], param2: number): boolean {
        if (param2 == VariableTimeUtilAddon.TYPE_LAST_UPDATE_TIME || param1.length == 0) {
            return true;
        }
        for (const _loc3_ of param1 ?? []) {
            if (_loc3_.canReadLastUpdateTime) {
                return true;
            }
        }
        return false;
    }

    public showValue(param1: any[], param2: number): boolean {
        if (param2 == VariableTimeUtilAddon._SafeStr_7178 || param1.length == 0) {
            return true;
        }
        for (const _loc3_ of param1 ?? []) {
            if (_loc3_.hasValue) {
                return true;
            }
        }
        return false;
    }
}
