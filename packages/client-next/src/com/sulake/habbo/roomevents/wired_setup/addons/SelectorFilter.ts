import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';

export class SelectorFilter extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::SelectorFilter'); }

    declare private _section1: ValueOrVariableSection;

    constructor() {
        super();
    }

    public override get isFilter(): boolean {
        return true;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._section1.numberValue);
        _loc1_.push(this._section1.option);
        _loc1_.push(this._section1.target);
        return _loc1_;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._section1.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc3_: any[] = param1.intParams;
        let _loc4_: string = stringOrNull(param1.variableIds[0]);
        let _loc2_: number = _loc3_[0] | 0;
        let _loc6_: number = _loc3_[1] | 0;
        let _loc5_: number = _loc3_[2] | 0;
        if (_loc6_ == 0) {
            _loc4_ = WiredVariable._SafeStr_2375;
        } else {
            _loc2_ = 1;
        }
        this._section1.init(param1.wiredContext.roomVariablesList, _loc4_, _loc5_, _loc6_, _loc2_);
    }

    public override onEditInitialized(): void {
        this._section1.onEditInitialized();
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._section1 = param1.createValueOrVariableSection(0, this.mergedSourceOptions(0), this.l("setfilter"), 1, 1000);
        param3.addElements(this._section1);
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 == WiredInputSourcePicker.MERGED_SOURCE) {
            return this._section1.isSourcePickingDisabled();
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
        this._section1.target = param2;
    }

    public override getMergedType(param1: number): number {
        return this._section1.target;
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
