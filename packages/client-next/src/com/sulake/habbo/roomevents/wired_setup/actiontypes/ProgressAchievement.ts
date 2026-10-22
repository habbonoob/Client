import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class ProgressAchievement extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::ProgressAchievement'); }

    declare private _achievementDropdown: DropdownPreset;

    declare private _progressionMode: RadioGroupPreset;

    declare private _SafeStr_14592: ValueOrVariableSection;

    constructor() {
        super();
    }

    public override get negativeCode(): number {
        return ActionTypeCodes.PROGRESS_ACHIEVEMENT;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._progressionMode.selected);
        _loc1_.push(this._SafeStr_14592.option);
        _loc1_.push(this._SafeStr_14592.numberValue);
        _loc1_.push(this._SafeStr_14592.target);
        return _loc1_;
    }

    public override readStringParamFromForm(): string {
        return this.achievementName;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._SafeStr_14592.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        this.initializeDropdownOptions();
        this.achievementName = param1.stringParam;
        this._progressionMode.selected = param1.getInt(0);
        let _loc3_: string = stringOrNull(param1.variableIds[0]);
        let _loc2_: number = param1.getInt(1);
        let _loc5_: number = param1.getInt(2);
        let _loc4_: number = param1.getInt(3);
        this._SafeStr_14592.init(param1.wiredContext.roomVariablesList, _loc3_, _loc4_, _loc2_, _loc5_);
    }

    public override onEditInitialized(): void {
        this._SafeStr_14592.onEditInitialized();
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._achievementDropdown = param1.createDropdown(new DropdownParam("${wiredfurni.params.progress_achievement.name}"));
        let _loc4_: SectionPreset = param1.createSection("${wiredfurni.params.progress_achievement.name}", this._achievementDropdown);
        this._progressionMode = param1.createRadioGroup([new RadioButtonParam(1, "${wiredfurni.params.progress_achievement.mode.1}"), new RadioButtonParam(0, "${wiredfurni.params.progress_achievement.mode.0}")]);
        let _loc5_: SectionPreset = param1.createSection("${wiredfurni.params.progress_achievement.mode}", this._progressionMode);
        this._SafeStr_14592 = param1.createValueOrVariableSection(0, this.mergedSourceOptions(0), "${wiredfurni.params.progress_achievement.score}", 0, 2147483647);
        param3.addElements(_loc4_, _loc5_, this._SafeStr_14592);
    }

    private initializeDropdownOptions(): void {
        let _loc3_: number = 0;
        let _loc2_: ExpandableDropdownOption[] = [];
        let _loc1_: string[] = this.roomEvents.achievementsInRoom;
        _loc3_ = 0;
        while (_loc3_ < _loc1_.length) {
            _loc2_.push(new ExpandableDropdownOption(_loc3_, _loc1_[_loc3_]));
            _loc3_ += 1;
        }
        this._achievementDropdown.reinit(_loc2_, -1);
    }

    private set achievementName(param1: string) {
        for (const _loc2_ of this._achievementDropdown.dropdownOptions ?? []) {
            if (_loc2_.displayString == param1) {
                this._achievementDropdown.selectedId = _loc2_.id;
                return;
            }
        }
        this._achievementDropdown.selectedId = -1;
    }

    private get achievementName(): string {
        return this._achievementDropdown.selected?.displayString;
    }

    public override mergedSelections(): any[] {
        return [[0, 1]];
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

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
