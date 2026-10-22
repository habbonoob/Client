import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';

export class VariableFilter extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::VariableFilter'); }

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return param1.hasValue || param1.canReadCreationTime || param1.canReadLastUpdateTime;
    }

    constructor() {
        super();
    }

    declare private _section1: SectionPreset;

    declare private _SafeStr_4682: VariablePickerPreset;

    declare private _section2: SectionPreset;

    declare private _SafeStr_4374: DropdownPreset;

    declare private _section3: ValueOrVariableSection;

    public override get isFilter(): boolean {
        return true;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }

    protected get variableType(): number {
        return -1;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._section3.numberValue);
        _loc1_.push(this._SafeStr_4374.selectedId);
        _loc1_.push(this._section3.option);
        _loc1_.push(this._section3.target);
        return _loc1_;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._SafeStr_4682.finalizeSelection, this._section3.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc4_: any[] = param1.intParams;
        let _loc7_: string = stringOrNull(param1.variableIds[0]);
        let _loc5_: string = stringOrNull(param1.variableIds[1]);
        let _loc3_: number = _loc4_[0] | 0;
        let _loc2_: number = _loc4_[1] | 0;
        let _loc8_: number = _loc4_[2] | 0;
        let _loc6_: number = _loc4_[3] | 0;
        this._SafeStr_4682.init(param1.wiredContext.roomVariablesList, _loc7_, this.variableType);
        if (_loc8_ == 0) {
            _loc5_ = WiredVariable._SafeStr_2375;
        } else {
            _loc3_ = 1;
        }
        this._section3.init(param1.wiredContext.roomVariablesList, _loc5_, _loc6_, _loc8_, _loc3_);
        this.initSortingDropdown(this._SafeStr_4682.selected, _loc2_);
    }

    public override onEditInitialized(): void {
        this._section3.onEditInitialized();
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4682 = param1.createVariablePicker(VariableFilter.variableSelectionFilter, this.initSortingDropdown);
        this._section1 = param1.createSection(this.loc("wiredfurni.params.variables.variable_selection"), this._SafeStr_4682);
        this._SafeStr_4374 = param1.createDropdown(new DropdownParam(this.l("variables.sort_by.caption"), Array.from([])));
        this._section2 = param1.createSection(this.l("variables.sort_by"), this._SafeStr_4374);
        this._section3 = param1.createValueOrVariableSection(0, this.mergedSourceOptions(0), this.l("setfilter"), 1, 1000);
        param3.addElements(this._section1, this._section2, this._section3);
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 == WiredInputSourcePicker.MERGED_SOURCE) {
            return this._section3.isSourcePickingDisabled();
        }
        return false;
    }

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.variables_reference";
    }

    public override mergedSelections(): any[] {
        return [[0, 0]];
    }

    public override setMergedType(param1: number, param2: number): void {
        this._section3.target = param2;
    }

    public override getMergedType(param1: number): number {
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

    private initSortingDropdown = (param1: WiredVariable, param2: number = -1): void => {
        if (param2 == -1) {
            param2 = this._SafeStr_4374.selectedId;
        }
        let _loc4_: ExpandableDropdownOption[] = [];
        let _loc3_: string = "variables.sort_by.";
        if (param1 == null || param1.hasValue) {
            _loc4_.push(new ExpandableDropdownOption(0, this.l(_loc3_ + "0")));
            _loc4_.push(new ExpandableDropdownOption(1, this.l(_loc3_ + "1")));
        }
        if (param1 == null || param1.canReadCreationTime) {
            _loc4_.push(new ExpandableDropdownOption(2, this.l(_loc3_ + "2")));
            _loc4_.push(new ExpandableDropdownOption(3, this.l(_loc3_ + "3")));
        }
        if (param1 == null || param1.canReadLastUpdateTime) {
            _loc4_.push(new ExpandableDropdownOption(4, this.l(_loc3_ + "4")));
            _loc4_.push(new ExpandableDropdownOption(5, this.l(_loc3_ + "5")));
        }
        this._SafeStr_4374.reinit(_loc4_, param2);
    };
}
