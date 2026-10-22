import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { NamedNumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedNumberInputPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { TradeRequirementRuleType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRuleType';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class InitiateTransaction extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes.chests::InitiateTransaction'); }

    declare private _transactionMode: RadioGroupPreset;

    declare private _SafeStr_2580: ValueOrVariableSection;

    declare private _SafeStr_5271: CheckboxGroupPreset;

    declare private _SafeStr_5084: NamedNumberInputPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.INITIATE_TRANSACTION;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._transactionMode.selected, this._SafeStr_2580.numberValue, this._SafeStr_2580.option, this._SafeStr_2580.target, this._SafeStr_5271._SafeStr_2119(0).selected ? 1 : 0, this._SafeStr_5084.value];
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._SafeStr_2580.finalizeSelection];
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc6_: string = stringOrNull(param1.variableIds[0]);
        let _loc2_: number = param1.getInt(0);
        this._transactionMode.selected = _loc2_;
        let _loc4_: number = param1.getInt(1);
        let _loc3_: number = param1.getInt(2);
        let _loc5_: number = param1.getInt(3);
        if (_loc3_ == 0) {
            _loc6_ = WiredVariable._SafeStr_2375;
        } else {
            _loc4_ = 1;
        }
        this._SafeStr_2580.init(param1.wiredContext.roomVariablesList, _loc6_, _loc5_, _loc3_, _loc4_);
        this._SafeStr_5271._SafeStr_2119(0).selected = param1.getBoolean(4);
        this._SafeStr_5084.value = param1.getInt(5);
        this.onModeChange(_loc2_);
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._transactionMode = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.contract.mode.0}"), new RadioButtonParam(1, "${wiredfurni.params.contract.mode.1}"), new RadioButtonParam(2, "${wiredfurni.params.contract.mode.2}")], this.onModeChange);
        let _loc5_: SectionPreset = param1.createSection("${wiredfurni.params.contract.mode}", this._transactionMode);
        this._SafeStr_2580 = param1.createValueOrVariableSection(0, this.mergedSourceOptions(0), "${wiredfurni.params.contract.multiplier_selection}", 1, 500);
        this._SafeStr_5084 = param1.createNamedNumberInput(new NumberInputParam(300, 30, 3600), "${wiredfurni.params.contract.timeout.selection}");
        let _loc4_: CheckboxOptionParam = new CheckboxOptionParam("${wiredfurni.params.contract.timeout.desc}");
        _loc4_.extra2 = this._SafeStr_5084;
        this._SafeStr_5271 = param1.createCheckboxGroup([_loc4_]);
        let _loc6_: SectionPreset = param1.createSection("${wiredfurni.params.contract.timeout}", this._SafeStr_5271);
        param3.addElements(_loc5_, this._SafeStr_2580, _loc6_);
    }

    public override onEditInitialized(): void {
        this._SafeStr_2580.onEditInitialized();
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 == WiredInputSourcePicker.MERGED_SOURCE && param1 == 0) {
            return this._SafeStr_2580.isSourcePickingDisabled();
        }
        return false;
    }

    private onModeChange = (param1: number): void => {
        let _loc3_: boolean = param1 == TradeRequirementRuleType._SafeStr_5683;
        let _loc2_: boolean = param1 == TradeRequirementRuleType._SafeStr_7565;
        this._SafeStr_2580.sectionTitle = _loc3_ ? "${wiredfurni.params.contract.multiplier_selection2}" : "${wiredfurni.params.contract.multiplier_selection}";
        this._SafeStr_2580.disabled = _loc2_;
    };

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.variables_reference";
    }

    public override furniSelectionTitle(param1: number): string {
        if (param1 == 0) {
            return "wiredfurni.params.sources.furni.title.chests";
        }
        return "wiredfurni.params.sources.furni.title.contracts";
    }

    public override mergedSelections(): any[] {
        return [[2, 1]];
    }

    public override setMergedType(param1: number, param2: number): void {
        this._SafeStr_2580.target = param2;
    }

    public override getMergedType(param1: number): number {
        return this._SafeStr_2580.target;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
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
