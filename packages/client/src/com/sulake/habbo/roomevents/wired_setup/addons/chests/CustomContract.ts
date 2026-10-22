import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { UsageWarningSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageWarningSection';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { TradeRequirementNode } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/nodes/TradeRequirementNode';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { WindowWrapperPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class CustomContract extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.chests::CustomContract'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4156: CheckboxGroupPreset;

    declare private _SafeStr_4419: RadioGroupPreset;

    declare private _SafeStr_2927: ValueOrVariableSection;

    declare private _SafeStr_3868: CheckboxGroupPreset;

    declare private _rewardType: RadioGroupPreset;

    declare private _SafeStr_2945: ValueOrVariableSection;

    public override get code(): number {
        return AddonCodes.CUSTOM_CONTRACT;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override get widthModifier(): number {
        return 1.2;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4156._SafeStr_2119(0).selected, this._SafeStr_4419.selected, this._SafeStr_2927.option, this._SafeStr_2927.numberValue, this._SafeStr_2927.target, this._SafeStr_3868._SafeStr_2119(0).selected, this._rewardType.selected, this._SafeStr_2945.option, this._SafeStr_2945.numberValue, this._SafeStr_2945.target];
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._SafeStr_2927.finalizeSelection, this._SafeStr_2945.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: string = stringOrNull(param1.variableIds[0]);
        let _loc4_: boolean = param1.getBoolean(0);
        let _loc13_: number = param1.getInt(1);
        let _loc12_: number = param1.getInt(2);
        let _loc5_: number = param1.getInt(3);
        let _loc11_: number = param1.getInt(4);
        if (_loc4_) {
            if (_loc12_ == 0) {
                _loc2_ = WiredVariable._SafeStr_2375;
            } else {
                _loc5_ = 1;
            }
        } else {
            _loc2_ = WiredVariable._SafeStr_2375;
            _loc5_ = 1;
        }
        this._SafeStr_4156._SafeStr_2119(0).selected = _loc4_;
        this._SafeStr_4419.selected = _loc13_;
        this._SafeStr_2927.init(param1.wiredContext.roomVariablesList, _loc2_, _loc11_, _loc12_, _loc5_);
        let _loc8_: string = stringOrNull(param1.variableIds[1]);
        let _loc9_: boolean = param1.getBoolean(5);
        let _loc3_: number = param1.getInt(6);
        let _loc7_: number = param1.getInt(7);
        let _loc10_: number = param1.getInt(8);
        let _loc6_: number = param1.getInt(9);
        if (_loc9_) {
            if (_loc7_ == 0) {
                _loc8_ = WiredVariable._SafeStr_2375;
            } else {
                _loc10_ = 1;
            }
        } else {
            _loc8_ = WiredVariable._SafeStr_2375;
            _loc10_ = 1;
        }
        this._SafeStr_3868._SafeStr_2119(0).selected = _loc9_;
        this._rewardType.selected = _loc3_;
        this._SafeStr_2945.init(param1.wiredContext.roomVariablesList, _loc8_, _loc6_, _loc7_, _loc10_);
        this.onPaymentSelectedChanged(0, _loc4_);
        this.onRewardSelectedChanged(0, _loc9_);
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc8_: UsageWarningSection = param1.createUsageWarningSection("${wiredfurni.params.custom_contract.usage_warning}");
        this._SafeStr_4419 = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.custom_contract.element_type_selection.0}"), new RadioButtonParam(1, "${wiredfurni.params.custom_contract.element_type_selection.1}")], this.onPaymentTypeChanged, 2);
        let _loc9_: SectionPreset = param1.createSection("${wiredfurni.params.custom_contract.element_type_selection}", this._SafeStr_4419);
        this._SafeStr_2927 = param1.createValueOrVariableSection(0, this.mergedSourceOptions(0), "${wiredfurni.params.custom_contract.amount_selection}", 1, 100000);
        let _loc5_: SimpleListViewPreset = param1.createSimpleListView(true, [_loc9_, param1.createSpacer(param2.sectionSpacing), this._SafeStr_2927]);
        _loc5_.spacing = 0;
        let _loc7_: CheckboxOptionParam = new CheckboxOptionParam("${wiredfurni.params.custom_contract.enable_payment}");
        _loc7_.extra2 = _loc5_;
        this._SafeStr_4156 = param1.createCheckboxGroup([_loc7_], this.onPaymentSelectedChanged);
        let _loc4_: SectionPreset = param1.createSection("${wiredfurni.params.custom_contract.payment}", this._SafeStr_4156, SectionParam.COLLAPSED);
        this._rewardType = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.custom_contract.element_type_selection.0}"), new RadioButtonParam(1, "${wiredfurni.params.custom_contract.element_type_selection.1}")], this.onRewardTypeChanged, 2);
        let _loc6_: SectionPreset = param1.createSection("${wiredfurni.params.custom_contract.element_type_selection}", this._rewardType);
        this._SafeStr_2945 = param1.createValueOrVariableSection(1, this.mergedSourceOptions(1), "${wiredfurni.params.custom_contract.amount_selection}", 1, 100000);
        let _loc10_: SimpleListViewPreset = param1.createSimpleListView(true, [_loc6_, param1.createSpacer(param2.sectionSpacing), this._SafeStr_2945]);
        _loc10_.spacing = 0;
        let _loc11_: CheckboxOptionParam = new CheckboxOptionParam("${wiredfurni.params.custom_contract.enable_reward}");
        _loc11_.extra2 = _loc10_;
        this._SafeStr_3868 = param1.createCheckboxGroup([_loc11_], this.onRewardSelectedChanged);
        let _loc12_: SectionPreset = param1.createSection("${wiredfurni.params.custom_contract.reward}", this._SafeStr_3868, SectionParam.COLLAPSED);
        param3.addElements(_loc8_, _loc4_, _loc12_, new WindowWrapperPreset(this.roomEvents, param1, param2, param2.createSplitterView(), false));
    }

    public override onEditInitialized(): void {
        this._SafeStr_2927.onEditInitialized();
        this._SafeStr_2945.onEditInitialized();
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 == WiredInputSourcePicker.MERGED_SOURCE && param1 == 0) {
            return !this._SafeStr_4156._SafeStr_2119(0).selected || this._SafeStr_2927.isSourcePickingDisabled();
        }
        if (param2 == WiredInputSourcePicker.MERGED_SOURCE && param1 == 1) {
            return !this._SafeStr_3868._SafeStr_2119(0).selected || this._SafeStr_2945.isSourcePickingDisabled();
        }
        if (param2 == WiredInputSourcePicker._SafeStr_2178 && param1 == 0) {
            return !this._SafeStr_4156._SafeStr_2119(0).selected || this._SafeStr_4419.selected != TradeRequirementNode.TYPE_FURNI;
        }
        if (param2 == WiredInputSourcePicker._SafeStr_2178 && param1 == 1) {
            return !this._SafeStr_3868._SafeStr_2119(0).selected || this._rewardType.selected != TradeRequirementNode.TYPE_FURNI;
        }
        return false;
    }

    public override mergedSelectionTitle(param1: number): string {
        if (param1 == 0) {
            return "wiredfurni.params.sources.merged.title.variables_reference_payment";
        }
        return "wiredfurni.params.sources.merged.title.variables_reference_reward";
    }

    public override furniSelectionTitle(param1: number): string {
        if (param1 == 0) {
            return "wiredfurni.params.sources.furni.title.payment";
        }
        return "wiredfurni.params.sources.furni.title.reward";
    }

    public override mergedSelections(): any[] {
        return [[2, 0], [3, 1]];
    }

    public override setMergedType(param1: number, param2: number): void {
        if (param1 == 0) {
            this._SafeStr_2927.target = param2;
        } else {
            this._SafeStr_2945.target = param2;
        }
    }

    public override getMergedType(param1: number): number {
        if (param1 == 0) {
            return this._SafeStr_2927.target;
        }
        return this._SafeStr_2945.target;
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        return [VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE];
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return true;
    }

    private onPaymentSelectedChanged = (param1: number, param2: boolean): void => {
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker._SafeStr_2178, 0);
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, 0);
    };

    private onRewardSelectedChanged = (param1: number, param2: boolean): void => {
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker._SafeStr_2178, 1);
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, 1);
    };

    private onPaymentTypeChanged = (param1: number): void => {
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker._SafeStr_2178, 0);
    };

    private onRewardTypeChanged = (param1: number): void => {
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker._SafeStr_2178, 1);
    };
}
