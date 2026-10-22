import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableListBase } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableListBase';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SourceTypeSelectorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SourceTypeSelectorPreset';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class ValueOrVariableSection extends AbstractSectionPreset implements SourceTypePickedListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections::ValueOrVariableSection'); }

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return param1.hasValue;
    }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number, param5: any[], param6: string, param7: number, param8: number) {
        super(param1, param2, param3);
        this._SafeStr_5623 = param4;
        this._SafeStr_3132 = param2.createNumberInput(new NumberInputParam(0, param7, param8, 45, 0, false, true));
        this._sourcePreset = param2.createSourceTypeSelector(new SourceTypeSelectorParam(param5, this));
        this._picker = param2.createVariablePicker(ValueOrVariableSection.variableSelectionFilter);
        this._option = param2.createRadioGroup([new RadioButtonParam(0, this.l("variables.reference_value.set_value"), this._SafeStr_3132), new RadioButtonParam(1, this.l("variables.reference_value.from_variable"), this._sourcePreset.alignRight(), this._picker)], this.onChangeRadioOption);
        this.initializeSection(param6, this._option);
    }

    declare private _option: RadioGroupPreset;

    declare private _SafeStr_3132: NumberInputPreset;

    declare private _picker: VariablePickerPreset;

    declare private _sourcePreset: SourceTypeSelectorPreset;

    declare private _SafeStr_5623: number;
    static { (this.prototype as any)._SafeStr_5623 = 0; }

    declare private _variableTarget: number;
    static { (this.prototype as any)._variableTarget = 0; }

    public get target(): number {
        return this._variableTarget;
    }

    public set target(param1: number) {
        this._variableTarget = param1;
        this._picker.variableTarget = this._variableTarget;
    }

    public get option(): number {
        return this._option.selected;
    }

    public get numberValue(): number {
        return this._SafeStr_3132.value;
    }

    public get finalizeSelection(): string {
        return this._picker.finalizeSelection;
    }

    public set sourceType(param1: number) {
        this._roomEvents.wiredCtrl.setMergedSourceType(this._SafeStr_5623, param1);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._option = null;
        this._SafeStr_3132 = null;
        this._picker = null;
        this._sourcePreset = null;
    }

    public init(param1: VariableListBase, param2: string, param3: number, param4: number, param5: number): void {
        this._picker.init(param1, param2, param3);
        this._variableTarget = param3;
        this._option.selected = param4;
        this._SafeStr_3132.value = param5;
    }

    public onEditInitialized(): void {
        this._sourcePreset.select(this._variableTarget);
    }

    public isSourcePickingDisabled(): boolean {
        return this._option.selected == 0;
    }

    private onChangeRadioOption = (param1: number): void => {
        this._roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, this._SafeStr_5623);
    };
}
