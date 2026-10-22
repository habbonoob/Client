import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxOptionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxOptionPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';

export class GiveVariable extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::GiveVariable'); }

    declare private _picker: VariablePickerPreset;

    declare private _overrideVariable: CheckboxOptionPreset;

    declare private _initialValue: ValueOrVariableSection;

    declare private _section1: SectionPreset;

    private _variableTarget: number = 0;

    constructor() {
        super();
    }

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return param1.canCreateAndDelete;
    }

    public override get code(): number {
        return ActionTypeCodes.GIVE_VARIABLE;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._variableTarget);
        Util.pushIntAsLong(_loc1_, this._initialValue.numberValue);
        _loc1_.push(this._overrideVariable.selected ? 1 : 0);
        _loc1_.push(this._initialValue.option);
        _loc1_.push(this._initialValue.target);
        _loc1_.push(this._initialValue.option == 1 && this._initialValue.referenceVariableOnTarget ? 1 : 0);
        return _loc1_;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._picker.finalizeSelection, this._initialValue.option == 1 ? this._initialValue.finalizeSelection : WiredVariable._SafeStr_2375];
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: any[] = param1.intParams;
        let _loc6_: string = stringOrNull(param1.variableIds[0]);
        let _loc3_: string = stringOrNull(param1.variableIds[1]);
        this._variableTarget = _loc2_[0] | 0;
        let _loc7_: number = _loc2_[2] | 0;
        let _loc8_: boolean = _loc2_[3] != 0;
        let _loc4_: number = _loc2_[4] | 0;
        let _loc10_: number = _loc2_[5] | 0;
        let _loc5_: boolean = _loc2_[6] != 0;
        this._picker.init(param1.wiredContext.roomVariablesList, _loc6_, this._variableTarget);
        if (_loc4_ == 0) {
            _loc3_ = WiredVariable._SafeStr_2375;
        } else {
            _loc7_ = 0;
        }
        let _loc9_: WiredVariable = this._picker.selected;
        if (_loc9_ == null || !_loc9_.canWriteValue) {
            _loc7_ = 0;
        }
        this.onVariableSelected(_loc9_);
        this._overrideVariable.selected = _loc8_;
        this._initialValue.init(param1.wiredContext.roomVariablesList, _loc3_, _loc10_, _loc4_, _loc7_, this._variableTarget, _loc5_);
    }

    public override onEditInitialized(): void {
        this._section1.getSourceTypeSelector().select(this._variableTarget);
        this._initialValue.onEditInitialized();
    }

    private onVariableSelected = (param1: WiredVariable): void => {
        this._initialValue.disabled = param1 == null || !param1.hasValue;
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, 1);
    };

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc5_: SourceTypeSelectorParam = new SourceTypeSelectorParam(this.mergedSourceOptions(0), this.createSourceTypeListener(0));
        this._picker = param1.createVariablePicker(GiveVariable.variableSelectionFilter, this.onVariableSelected);
        this._overrideVariable = param1.createCheckboxOption(new CheckboxOptionParam(this.l("variables.value_settings.override_existing")));
        let _loc6_: SimpleListViewPreset = param1.createSimpleListView(true, [this._picker, this._overrideVariable]);
        let _loc4_: SectionParam = new SectionParam(_loc5_);
        this._section1 = param1.createSection(this.l("variables.variable_selection"), _loc6_, _loc4_);
        this._initialValue = param1.createValueOrVariableSection(1, this.mergedSourceOptions(1), this.l("variables.value_settings.initial_value"), -2147483648, 2147483647, true);
        param3.addElements(this._section1, this._initialValue);
    }

    public override mergedSelectionTitle(param1: number): string {
        return param1 == 0 ? "wiredfurni.params.sources.merged.title.variables_destination" : "wiredfurni.params.sources.merged.title.variables_reference";
    }

    public override mergedSelections(): any[] {
        return [[0, 0], [1, 1]];
    }

    public override setMergedType(param1: number, param2: number): void {
        if (param1 == 0) {
            this._variableTarget = param2;
            this._picker.variableTarget = param2;
            this._initialValue.primaryTarget = param2;
        } else {
            this._initialValue.target = param2;
        }
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        return param1 == 0 ? [VariableExtraSourceTypes.CONTEXT_SOURCE] : [VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE];
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return true;
    }

    public override getMergedType(param1: number): number {
        return param1 == 0 ? this._variableTarget : this._initialValue.target;
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 == WiredInputSourcePicker.MERGED_SOURCE && param1 == 1) {
            return this._initialValue.disabled || this._initialValue.referenceVariableOnTarget;
        }
        return false;
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
