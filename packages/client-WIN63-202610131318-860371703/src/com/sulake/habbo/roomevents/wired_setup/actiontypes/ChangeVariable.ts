import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';

export class ChangeVariable extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::ChangeVariable'); }

    declare private _picker: VariablePickerPreset;

    declare private _SafeStr_4003: DropdownPreset;

    declare private _section1: SectionPreset;

    declare private _section2: SectionPreset;

    declare private _section3: ValueOrVariableSection;

    private _variableTarget: number = 0;

    constructor() {
        super();
    }

    private static operatorOptions(param1: IHabboLocalizationManager): ExpandableDropdownOption[] {
        let _loc4_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: ExpandableDropdownOption[] = [];
        _loc4_ = 0;
        while (_loc4_ < 7) {
            ChangeVariable.pushOption(_loc3_, _loc4_);
            _loc4_++;
        }
        ChangeVariable.pushOption(_loc3_, 40, true);
        ChangeVariable.pushOption(_loc3_, 41, true);
        ChangeVariable.pushOption(_loc3_, 50, true);
        ChangeVariable.pushOption(_loc3_, 60, true);
        _loc2_ = 100;
        while (_loc2_ < 106) {
            ChangeVariable.pushOption(_loc3_, _loc2_, true);
            _loc2_++;
        }
        ChangeVariable.pushOption(_loc3_, 110, true);
        ChangeVariable.pushOption(_loc3_, 115, true);
        ChangeVariable.pushOption(_loc3_, 116, true);
        ChangeVariable.pushOption(_loc3_, 117, true);
        ChangeVariable.pushOption(_loc3_, 118, true);
        _loc2_ = 111;
        while (_loc2_ <= 114) {
            ChangeVariable.pushOption(_loc3_, _loc2_, true);
            _loc2_++;
        }
        _loc2_ = 119;
        while (_loc2_ <= 122) {
            ChangeVariable.pushOption(_loc3_, _loc2_, true);
            _loc2_++;
        }
        return _loc3_;
    }

    private static pushOption(param1: ExpandableDropdownOption[], param2: number, param3: boolean = false): ExpandableDropdownOption[] {
        param1.push(new ExpandableDropdownOption(param2, "${wiredfurni.params.variables.operation." + param2 + "}", param3));
        return param1;
    }

    private static variableSelectionFilter1(param1: WiredVariable): boolean {
        return param1.canWriteValue;
    }

    public override get code(): number {
        return ActionTypeCodes.CHANGE_VARIABLE;
    }

    public requiresOperand(): boolean {
        return this._SafeStr_4003.selectedId != 103 && this._SafeStr_4003.selectedId != 60 && this._SafeStr_4003.selectedId != 110;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._variableTarget);
        _loc1_.push(this._SafeStr_4003.selectedId);
        _loc1_.push(this.requiresOperand() ? this._section3.option : 0);
        Util.pushIntAsLong(_loc1_, this._section3.numberValue);
        _loc1_.push(this._section3.target);
        _loc1_.push(this.requiresOperand() && this._section3.option == 1 && this._section3.referenceVariableOnTarget ? 1 : 0);
        return _loc1_;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._picker.finalizeSelection, this._section3.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc3_: any[] = param1.intParams;
        let _loc6_: string = stringOrNull(param1.variableIds[0]);
        let _loc2_: string = stringOrNull(param1.variableIds[1]);
        this._variableTarget = _loc3_[0] | 0;
        let _loc7_: number = _loc3_[1] | 0;
        let _loc4_: number = _loc3_[2] | 0;
        let _loc8_: number = _loc3_[4] | 0;
        let _loc9_: number = _loc3_[5] | 0;
        let _loc5_: boolean = _loc3_.length > 6 && _loc3_[6] != 0;
        this._picker.init(param1.wiredContext.roomVariablesList, _loc6_, this._variableTarget);
        if (_loc4_ == 0) {
            _loc2_ = WiredVariable._SafeStr_2375;
        } else {
            _loc8_ = 0;
        }
        this._section3.init(param1.wiredContext.roomVariablesList, _loc2_, _loc9_, _loc4_, _loc8_, this._variableTarget, _loc5_);
        this._SafeStr_4003.selectedId = _loc7_;
    }

    public override onEditInitialized(): void {
        this._section1.getSourceTypeSelector().select(this._variableTarget);
        this._section3.onEditInitialized();
    }

    public onChangeOperator = (param1: ExpandableDropdownOption): void => {
        let _loc2_: boolean = !this.requiresOperand();
        this._section3.disabled = _loc2_;
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, 1);
    };

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 == WiredInputSourcePicker.MERGED_SOURCE && param1 == 1) {
            return !this.requiresOperand() || this._section3.referenceVariableOnTarget;
        }
        return false;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: SourceTypeSelectorParam = new SourceTypeSelectorParam(this.mergedSourceOptions(0), this.createSourceTypeListener(0));
        this._picker = param1.createVariablePicker(ChangeVariable.variableSelectionFilter1);
        this._section1 = param1.createSection(this.l("variables.variable_selection"), this._picker, new SectionParam(_loc4_));
        this._SafeStr_4003 = param1.createDropdown(new DropdownParam(this.l("variables.operation.tooltip"), ChangeVariable.operatorOptions(this.roomEvents.localization), this.onChangeOperator, this.l("variables.operation.advanced")));
        this._section2 = param1.createSection(this.l("variables.operation"), this._SafeStr_4003);
        this._section3 = param1.createValueOrVariableSection(1, this.mergedSourceOptions(1), this.l("variables.reference_value"), -2147483648, 2147483647, true);
        param3.addElements(this._section1, this._section2, this._section3);
    }

    public override mergedSelectionTitle(param1: number): string {
        if (param1 == 0) {
            return "wiredfurni.params.sources.merged.title.variables_destination";
        }
        return "wiredfurni.params.sources.merged.title.variables_reference";
    }

    public override mergedSelections(): any[] {
        return [[0, 0], [1, 1]];
    }

    public override setMergedType(param1: number, param2: number): void {
        if (param1 == 0) {
            this._variableTarget = param2;
            this._picker.variableTarget = this._variableTarget;
            this._section3.primaryTarget = this._variableTarget;
        } else {
            this._section3.target = param2;
        }
    }

    public override getMergedType(param1: number): number {
        if (param1 == 0) {
            return this._variableTarget;
        }
        return this._section3.target;
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        return [VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE];
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return true;
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
