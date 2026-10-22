import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextAreaPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextAreaPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';

export class AbstractGiveFromChest extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes.chests::AbstractGiveFromChest'); }

    protected static readonly MODE_AMOUNT: number = 0;
    protected static readonly MODE_ALL: number = 1;

    declare private _SafeStr_7033: SectionPreset;

    declare private _SafeStr_2580: ValueOrVariableSection;

    declare private _SafeStr_7108: SectionPreset;

    declare private _rewardingModeRadioGroup: RadioGroupPreset;

    declare private _rewardText: TextAreaPreset;

    declare private _showByDefault: CheckboxGroupPreset;

    constructor() {
        super();
        this.onModeChange = this.onModeChange.bind(this);
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._rewardingModeRadioGroup.selected);
        _loc1_.push(this._SafeStr_2580.numberValue);
        _loc1_.push(this._SafeStr_2580.option);
        _loc1_.push(this._SafeStr_2580.target);
        _loc1_.push(this._showByDefault._SafeStr_2119(0).selected);
        return _loc1_;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._SafeStr_2580.finalizeSelection];
    }

    public override readStringParamFromForm(): string {
        return this._rewardText.text;
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc5_: any[] = param1.intParams;
        let _loc7_: string = stringOrNull(param1.variableIds[0]);
        let _loc2_: number = _loc5_[0] | 0;
        this._rewardingModeRadioGroup.selected = _loc2_;
        let _loc4_: number = _loc5_[1] | 0;
        let _loc3_: number = _loc5_[2] | 0;
        let _loc6_: number = _loc5_[3] | 0;
        if (_loc2_ == 0) {
            if (_loc3_ == 0) {
                _loc7_ = WiredVariable._SafeStr_2375;
            } else {
                _loc4_ = 1;
            }
        } else {
            _loc7_ = WiredVariable._SafeStr_2375;
            _loc4_ = 1;
        }
        this._SafeStr_2580.disabled = _loc2_ == 1;
        this._SafeStr_2580.init(param1.wiredContext.roomVariablesList, _loc7_, _loc6_, _loc3_, _loc4_);
        this._showByDefault._SafeStr_2119(0).selected = param1.getBoolean(4);
        this._rewardText.text = param1.stringParam;
    }

    protected get rewardingMode(): number {
        return this._rewardingModeRadioGroup.selected;
    }

    public override onEditInitialized(): void {
        this._SafeStr_2580.onEditInitialized();
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 == WiredInputSourcePicker.MERGED_SOURCE && param1 == 0) {
            return this._SafeStr_2580.disabled;
        }
        return false;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: any[] = [new RadioButtonParam(0, this.l("rewarding_mode.0")), new RadioButtonParam(1, this.l("rewarding_mode.1"))];
        this._rewardingModeRadioGroup = param1.createRadioGroup(_loc4_, this.onModeChange);
        this._SafeStr_7033 = param1.createSection(this.l("rewarding_mode"), this._rewardingModeRadioGroup);
        this._SafeStr_2580 = param1.createValueOrVariableSection(0, this.mergedSourceOptions(0), this.l("amount_to_give"), 1, 2147483647);
        this._rewardText = param1.createTextArea(new TextAreaParam(45, -1, 3, -1, 200, "", "${wiredfurni.reward_contract.reward_popup.text.tooltip}"));
        this._showByDefault = param1.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.reward_contract.reward_popup.show_by_default}")]);
        let _loc5_: SimpleListViewPreset = param1.createSimpleListView(true, [this._rewardText, this._showByDefault]);
        this._SafeStr_7108 = param1.createSection("${wiredfurni.reward_contract.reward_popup}", _loc5_);
        this.finalizeBuilding(param3);
    }

    protected finalizeBuilding(param1: WiredUIBuilder): void {
        param1.addElements(this._SafeStr_7033, this._SafeStr_2580, this._SafeStr_7108);
    }

    protected onModeChange(param1: number): void {
        this._SafeStr_2580.disabled = param1 == 1;
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, 0);
    }

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.variables_reference";
    }

    public override furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title.chests";
    }

    public override userSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.users.title.reward_user";
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }

    public override mergedSelections(): any[] {
        return [[1, 1]];
    }

    public override setMergedType(param1: number, param2: number): void {
        this._SafeStr_2580.target = param2;
    }

    public override getMergedType(param1: number): number {
        return this._SafeStr_2580.target;
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
}
