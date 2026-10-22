import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';

export class RemoveVariable extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::RemoveVariable'); }

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return param1.canCreateAndDelete;
    }

    constructor() {
        super();
    }

    declare private _picker: VariablePickerPreset;

    declare private _section1: SectionPreset;

    private _variableTarget: number = 0;

    public override get code(): number {
        return ActionTypeCodes.REMOVE_VARIABLE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._variableTarget);
        return _loc1_;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._picker.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: string = stringOrNull(param1.variableIds[0]);
        this._variableTarget = param1.intParams[0] | 0;
        this._picker.init(param1.wiredContext.roomVariablesList, _loc2_, this._variableTarget);
    }

    public override onEditInitialized(): void {
        this._section1.getSourceTypeSelector().select(this._variableTarget);
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc5_: SourceTypeSelectorParam = new SourceTypeSelectorParam(this.mergedSourceOptions(0), this.createSourceTypeListener(0));
        this._picker = param1.createVariablePicker(RemoveVariable.variableSelectionFilter);
        let _loc4_: SectionParam = new SectionParam(_loc5_);
        this._section1 = param1.createSection(this.loc("wiredfurni.params.variables.variable_selection"), this._picker, _loc4_);
        param3.addElements(this._section1);
    }

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.variables";
    }

    public override mergedSelections(): any[] {
        return [[0, 0]];
    }

    public override setMergedType(param1: number, param2: number): void {
        this._variableTarget = param2;
        this._picker.variableTarget = this._variableTarget;
    }

    public override getMergedType(param1: number): number {
        return this._variableTarget;
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return true;
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        return [VariableExtraSourceTypes.CONTEXT_SOURCE];
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }
}
