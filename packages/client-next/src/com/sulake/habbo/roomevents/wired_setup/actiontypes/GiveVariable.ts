import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxOptionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxOptionPreset';
import type { NamedNumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedNumberInputPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';

export class GiveVariable extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::GiveVariable'); }

    declare private _picker: VariablePickerPreset;

    declare private _overrideVariable: CheckboxOptionPreset;

    declare private _initialValue: NamedNumberInputPreset;

    declare private _section1: SectionPreset;

    declare private _section2: SectionPreset;

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
        Util.pushIntAsLong(_loc1_, this._initialValue.value);
        _loc1_.push(this._overrideVariable.selected ? 1 : 0);
        return _loc1_;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._picker.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: string = stringOrNull(param1.variableIds[0]);
        this._variableTarget = param1.intParams[0] | 0;
        let _loc3_: number = param1.intParams[2] | 0;
        let _loc4_: boolean = param1.intParams[3] != 0;
        this._picker.init(param1.wiredContext.roomVariablesList, _loc2_, this._variableTarget);
        let _loc5_: WiredVariable = this._picker.selected;
        let _loc6_: boolean = _loc5_ != null && _loc5_.canWriteValue;
        if (!_loc6_) {
            _loc3_ = 0;
        }
        this.onVariableSelected(_loc5_);
        this._overrideVariable.selected = _loc4_;
        this._initialValue.value = _loc3_;
    }

    public override onEditInitialized(): void {
        this._section1.getSourceTypeSelector().select(this._variableTarget);
    }

    private onVariableSelected = (param1: WiredVariable): void => {
        this._section2.disabled = param1 == null || !param1.hasValue;
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
        this._initialValue = param1.createNamedNumberInput(new NumberInputParam(0, -2147483648, 2147483647), this.l("variables.value_settings.initial_value"));
        this._section2 = param1.createSection(this.l("variables.value_settings"), this._initialValue);
        param3.addElements(this._section1, this._section2);
    }

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.variables_destination";
    }

    public override mergedSelections(): any[] {
        return [[0, 0]];
    }

    public override setMergedType(param1: number, param2: number): void {
        this._variableTarget = param2;
        this._picker.variableTarget = this._variableTarget;
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        return [VariableExtraSourceTypes.CONTEXT_SOURCE];
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return true;
    }

    public override getMergedType(param1: number): number {
        return this._variableTarget;
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
