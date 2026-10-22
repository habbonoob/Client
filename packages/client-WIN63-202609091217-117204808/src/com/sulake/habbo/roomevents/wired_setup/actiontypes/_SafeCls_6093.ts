import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ChooseVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ChooseVariableSection';
import type { UsageInfoSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageInfoSection';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { VariableTarget } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/VariableTarget';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { WiredVariableType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariableType';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';

export class _SafeCls_6093 extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::_SafeCls_6093'); }

    private static readonly TARGET_LOCATION_SOURCE: number = 0;
    private static readonly TARGET_LOCATION_CUSTOM: number = 1;
    private static readonly TARGET_ALTITUDE_ON_TOP: number = 0;
    private static readonly TARGET_ALTITUDE_SOURCE: number = 1;
    private static readonly TARGET_ALTITUDE_CUSTOM: number = 2;
    private static readonly OFFSET_MIN: number = -64;
    private static readonly _SafeStr_14590: number = 64;

    declare private _SafeStr_14597: RadioGroupPreset;

    declare private _SafeStr_14598: RadioGroupPreset;

    declare private _offsetCheckboxes: CheckboxGroupPreset;

    declare private _SafeStr_14591: NumberInputPreset;

    declare private _SafeStr_14592: NumberInputPreset;

    declare private _SafeStr_14599: NumberInputPreset;

    declare private _SafeStr_14600: CheckboxGroupPreset;

    declare private _SafeStr_14601: SectionPreset;

    declare private _SafeStr_14602: ChooseVariableSection;

    declare private _SafeStr_14603: ValueOrVariableSection;

    declare private _SafeStr_14604: boolean;
    static { (this.prototype as any)._SafeStr_14604 = false; }

    constructor() {
        super();
    }

    private static filterSpawnVariable(param1: WiredVariable): boolean {
        return param1.variableTarget == VariableTarget.FURNI && param1.canCreateAndDelete && param1.variableType == WiredVariableType._SafeStr_7398;
    }

    public override get code(): number {
        return ActionTypeCodes.PLACE_FURNI;
    }

    public override get hasStateSnapshot(): boolean {
        return true;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: UsageInfoSection = param1.createUsageInfoSection("${wiredfurni.params.place_furni.usage_info}");
        let _loc5_: TextParam = new TextParam(1);
        _loc5_.textColor = param2.softTextColor;
        this._SafeStr_14597 = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.place_furni.target_location.0}", null, param1.createText("${wiredfurni.params.place_furni.target_location.0.info}", _loc5_)), new RadioButtonParam(1, "${wiredfurni.params.place_furni.target_location.1}")], this.onTargetLocationChange);
        this._SafeStr_14597.selected = 0;
        let _loc7_: SectionPreset = param1.createSection("${wiredfurni.params.place_furni.target_location}", this._SafeStr_14597, SectionParam.EXPANDED);
        this._SafeStr_14598 = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.place_furni.target_altitude.0}"), new RadioButtonParam(1, "${wiredfurni.params.place_furni.target_altitude.1}"), new RadioButtonParam(2, "${wiredfurni.params.place_furni.target_altitude.2}")], this.onTargetAltitudeChange);
        this._SafeStr_14598.selected = 0;
        let _loc8_: SectionPreset = param1.createSection("${wiredfurni.params.place_furni.target_altitude}", this._SafeStr_14598, SectionParam.EXPANDED);
        this._SafeStr_14591 = param1.createNumberInput(new NumberInputParam(0, -64, 64));
        this._SafeStr_14592 = param1.createNumberInput(new NumberInputParam(0, -64, 64));
        this._SafeStr_14599 = param1.createNumberInput(new NumberInputParam(0, -8000, 8000));
        let _loc6_: any[] = [new CheckboxOptionParam("${wiredfurni.params.place_furni.offsets.x}", 0, this._SafeStr_14591), new CheckboxOptionParam("${wiredfurni.params.place_furni.offsets.y}", 1, this._SafeStr_14592), new CheckboxOptionParam("${wiredfurni.params.place_furni.offsets.altitude}", 2, this._SafeStr_14599)];
        this._offsetCheckboxes = param1.createCheckboxGroup(_loc6_);
        let _loc10_: SectionPreset = param1.createSection("${wiredfurni.params.place_furni.offsets}", this._offsetCheckboxes, SectionParam.COLLAPSED);
        this._SafeStr_14602 = param1.createChooseVariableSection(-1, null, _SafeCls_6093.filterSpawnVariable, this.onSpawnVariableSelected);
        this._SafeStr_14603 = param1.createValueOrVariableSection(1, this.mergedSourceOptions(1), "${wiredfurni.params.place_furni.spawn_with_value}", -2147483648, 2147483647);
        let _loc9_: SimpleListViewPreset = param1.createSimpleListView(true, [this._SafeStr_14602, this._SafeStr_14603]);
        this._SafeStr_14600 = param1.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.place_furni.spawn_with_variable}", 0, null, _loc9_)], this.onSpawnWithVariableChanged);
        this._SafeStr_14601 = param1.createSection("${wiredfurni.params.place_furni.spawn_with_variable}", this._SafeStr_14600, SectionParam.COLLAPSED);
        param3.addElements(_loc4_, _loc7_, _loc8_, _loc10_, this._SafeStr_14601);
        this.updateCustomReferenceSourceState();
        this.updateSpawnValueState();
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_14604 = param1.getBoolean(0);
        this._SafeStr_14597.selected = param1.getInt(1);
        this._SafeStr_14598.selected = param1.getInt(2);
        this.updateOffsetField(this._SafeStr_14591, this._offsetCheckboxes, 0, param1.getInt(3));
        this.updateOffsetField(this._SafeStr_14592, this._offsetCheckboxes, 1, param1.getInt(4));
        this.updateOffsetField(this._SafeStr_14599, this._offsetCheckboxes, 2, param1.getInt(5));
        let _loc6_: number = param1.getInt(7);
        let _loc3_: number = param1.getInt(8);
        let _loc4_: number = param1.getInt(9);
        let _loc2_: string = stringOrNull(param1.variableIds.length > 0 ? param1.variableIds[0] : WiredVariable._SafeStr_2375);
        let _loc5_: string = stringOrNull(param1.variableIds.length > 1 ? param1.variableIds[1] : WiredVariable._SafeStr_2375);
        this._SafeStr_14602.init(param1.wiredContext.roomVariablesList, _loc2_, VariableTarget.FURNI);
        this._SafeStr_14603.init(param1.wiredContext.roomVariablesList, _loc5_, _loc4_, _loc6_, _loc3_);
        this._SafeStr_14600._SafeStr_2119(0).selected = param1.getBoolean(6);
        this.updateCustomReferenceSourceState();
        this.updateSpawnValueState();
        this._SafeStr_14601.updateDisabledState();
    }

    public override onEditInitialized(): void {
        this._SafeStr_14602.onEditInitialized();
        this._SafeStr_14603.onEditInitialized();
    }

    public override readIntParamsFromForm(): any[] {
        let _loc3_: boolean = this._SafeStr_14600._SafeStr_2119(0).selected && !this._SafeStr_14603.disabled;
        let _loc2_: number = _loc3_ ? this._SafeStr_14603.option : 0;
        let _loc1_: number = _loc3_ ? this._SafeStr_14603.numberValue : 0;
        return [this._SafeStr_14604 ? 1 : 0, this._SafeStr_14597.selected, this._SafeStr_14598.selected, this.readOffsetValue(0, this._SafeStr_14591), this.readOffsetValue(1, this._SafeStr_14592), this.readOffsetValue(2, this._SafeStr_14599), this._SafeStr_14600._SafeStr_2119(0).selected ? 1 : 0, _loc2_, _loc1_, this._SafeStr_14603.target];
    }

    public override readVariableIdsFromForm(): any[] {
        let _loc1_: string = this._SafeStr_14600._SafeStr_2119(0).selected ? this._SafeStr_14602.finalizeSelection : WiredVariable._SafeStr_2375;
        let _loc3_: boolean = this._SafeStr_14600._SafeStr_2119(0).selected && !this._SafeStr_14603.disabled;
        let _loc2_: string = _loc3_ && this._SafeStr_14603.option == 1 ? this._SafeStr_14603.finalizeSelection : WiredVariable._SafeStr_2375;
        return [_loc1_, _loc2_];
    }

    public override mergedSelections(): any[] {
        return [[1, 0], [2, 1]];
    }

    public override setMergedType(param1: number, param2: number): void {
        if (param1 == 0) {
            this._SafeStr_14604 = param2 == WiredInputSourcePicker.USER_SOURCE;
        } else if (param1 == 1) {
            this._SafeStr_14603.target = param2;
        }
    }

    public override getMergedType(param1: number): number {
        if (param1 == 0) {
            return this._SafeStr_14604 ? WiredInputSourcePicker.USER_SOURCE : WiredInputSourcePicker._SafeStr_2178;
        }
        return this._SafeStr_14603.target;
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 != WiredInputSourcePicker.MERGED_SOURCE) {
            return false;
        }
        if (param1 == 0) {
            return !this.requiresCustomReferenceSource();
        }
        return this._SafeStr_14603.isSourcePickingDisabled() || !this._SafeStr_14600._SafeStr_2119(0).selected || this._SafeStr_14603.disabled;
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return param1 == 1;
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        if (param1 == 1) {
            return [VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE];
        }
        return [];
    }

    private onTargetLocationChange = (param1: number): void => {
        this.updateCustomReferenceSourceState();
    };

    private onTargetAltitudeChange = (param1: number): void => {
        this.updateCustomReferenceSourceState();
    };

    private onSpawnWithVariableChanged = (param1: number, param2: boolean): void => {
        if (param1 != 0) {
            return;
        }
        this.updateSpawnValueState();
    };

    private onSpawnVariableSelected = (param1: WiredVariable): void => {
        this.updateSpawnValueState();
    };

    private updateCustomReferenceSourceState(): void {
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, 0);
    }

    private updateSpawnValueState(): void {
        let _loc2_: WiredVariable = this._SafeStr_14602.selected;
        let _loc3_: boolean = _loc2_ != null && _loc2_.hasValue;
        let _loc1_: boolean = this._SafeStr_14600._SafeStr_2119(0).selected;
        this._SafeStr_14603.disabled = !_loc1_ || !_loc3_;
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, 1);
    }

    private requiresCustomReferenceSource(): boolean {
        return this._SafeStr_14597.selected == 1 || this._SafeStr_14598.selected == 2;
    }

    private readOffsetValue(param1: number, param2: NumberInputPreset): number {
        return this._offsetCheckboxes._SafeStr_2119(param1).selected ? param2.value : 0;
    }

    private updateOffsetField(param1: NumberInputPreset, param2: CheckboxGroupPreset, param3: number, param4: number): void {
        param1.value = param4;
        param2._SafeStr_2119(param3).selected = param4 != 0;
    }

    public override get widthModifier(): number {
        return 1.2;
    }

    public override furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title.place_furni";
    }

    public override mergedSelectionTitle(param1: number): string {
        if (param1 == 0) {
            return "wiredfurni.params.sources.merged.title.custom_target";
        }
        return "wiredfurni.params.sources.merged.title.variables_reference";
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
