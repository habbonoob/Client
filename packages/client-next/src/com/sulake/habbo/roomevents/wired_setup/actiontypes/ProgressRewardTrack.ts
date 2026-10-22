import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxOptionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxOptionPreset';
import type { NamedTextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedTextInputPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';

export class ProgressRewardTrack extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::ProgressRewardTrack'); }

    private static readonly _SafeStr_14593: string = "a-zA-Z0-9_";

    declare private _SafeStr_14594: NamedTextInputPreset;

    declare private _SafeStr_14595: NamedTextInputPreset;

    declare private _addToExistingScore: CheckboxOptionPreset;

    declare private _SafeStr_14592: ValueOrVariableSection;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.PROGRESS_REWARD_TRACK;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_14594 = param1.createNamedTextInput(new TextInputParam("", 100, null, -1, "a-zA-Z0-9_"), "${wiredfurni.params.reward_track.track_id}");
        this._SafeStr_14595 = param1.createNamedTextInput(new TextInputParam("", 100, null, -1, "a-zA-Z0-9_"), "${wiredfurni.params.reward_track.task_id}");
        let _loc6_: SimpleListViewPreset = param1.createSimpleListView(true, [this._SafeStr_14594, this._SafeStr_14595]);
        let _loc5_: SectionPreset = param1.createSection("${wiredfurni.params.reward_track.progress.ids}", _loc6_);
        this._addToExistingScore = param1.createCheckboxOption(new CheckboxOptionParam("${wiredfurni.params.reward_track.add_to_existing_score}"));
        let _loc4_: SectionPreset = param1.createSection("${wiredfurni.params.reward_track.progress.mode}", this._addToExistingScore);
        this._SafeStr_14592 = param1.createValueOrVariableSection(0, this.mergedSourceOptions(0), "${wiredfurni.params.reward_track.score}", 1, 2147483647);
        param3.addElements(_loc5_, _loc4_, this._SafeStr_14592);
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._addToExistingScore.selected ? 1 : 0);
        _loc1_.push(this._SafeStr_14592.option);
        _loc1_.push(this._SafeStr_14592.numberValue);
        _loc1_.push(this._SafeStr_14592.target);
        return _loc1_;
    }

    public override readStringParamFromForm(): string {
        return this._SafeStr_14594.text + "\t" + this._SafeStr_14595.text;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._SafeStr_14592.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_14594.text = param1.getString(0);
        this._SafeStr_14595.text = param1.getString(1);
        this._addToExistingScore.selected = param1.getBoolean(0);
        let _loc3_: string = stringOrNull(param1.variableIds[0]);
        let _loc2_: number = param1.getInt(1);
        let _loc5_: number = param1.getInt(2);
        let _loc4_: number = param1.getInt(3);
        if (_loc2_ == 0) {
            _loc3_ = WiredVariable._SafeStr_2375;
        }
        this._SafeStr_14592.init(param1.wiredContext.roomVariablesList, _loc3_, _loc4_, _loc2_, _loc5_);
    }

    public override onEditInitialized(): void {
        this._SafeStr_14592.onEditInitialized();
    }

    public override mergedSelections(): any[] {
        return [[0, 1]];
    }

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.variables_reference";
    }

    public override setMergedType(param1: number, param2: number): void {
        this._SafeStr_14592.target = param2;
    }

    public override getMergedType(param1: number): number {
        return this._SafeStr_14592.target;
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        return [VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE];
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 == WiredInputSourcePicker.MERGED_SOURCE) {
            return this._SafeStr_14592.isSourcePickingDisabled();
        }
        return false;
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
