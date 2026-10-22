import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { VariableListBase } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableListBase';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { VariableFxEditorState } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxEditorState';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { SourceTypeSelectorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SourceTypeSelectorPreset';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VariableFxVariableOverrideRowPreset extends WiredUIPreset implements SourceTypePickedListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.presets::VariableFxVariableOverrideRowPreset'); }

    public static readonly _SafeStr_8643: number = 0;
    public static readonly MAXIMUM: number = 1;

    declare private _SafeStr_14391: number;
    static { (this.prototype as any)._SafeStr_14391 = 0; }

    declare private _SafeStr_4407: (...args: any[]) => any;

    declare private _sourceType: number;
    static { (this.prototype as any)._sourceType = 0; }

    declare private _SafeStr_4202: boolean;
    static { (this.prototype as any)._SafeStr_4202 = false; }

    declare private _SafeStr_14510: CheckboxGroupPreset;

    declare private _SafeStr_14511: VariablePickerPreset;

    declare private _SafeStr_14512: SourceTypeSelectorPreset;

    declare private _SafeStr_14513: SimpleListViewPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number, param5: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._SafeStr_14391 = param4;
        this._SafeStr_4407 = param5;
        this._sourceType = WiredInputSourcePicker.USER_SOURCE;
        this._SafeStr_14511 = param2.createVariablePicker(VariableFxVariableOverrideRowPreset.variableSelectionFilter, this.onVariableChange);
        this._SafeStr_14512 = param2.createSourceTypeSelector(new SourceTypeSelectorParam(VariableFxVariableOverrideRowPreset.sourceOptionsForType(this._sourceType), this, this._sourceType));
        this._SafeStr_14513 = param2.createSimpleListView(false, [this._SafeStr_14511, this._SafeStr_14512], true);
        this._SafeStr_14510 = param2.createCheckboxGroup([new CheckboxOptionParam(VariableFxVariableOverrideRowPreset.labelForKind(param4), 0, null, this._SafeStr_14513)], this.onCheckboxChange);
    }

    private static sourceOptionsForType(param1: number): any[] {
        return param1 == WiredInputSourcePicker._SafeStr_2178 ? [WiredInputSourcePicker._SafeStr_2178, VariableExtraSourceTypes.GLOBAL_SOURCE] : [WiredInputSourcePicker.USER_SOURCE, VariableExtraSourceTypes.GLOBAL_SOURCE];
    }

    private static labelForKind(param1: number): string {
        return param1 == 0 ? "${wiredfurni.params.variablefx.advanced.override_min}" : "${wiredfurni.params.variablefx.advanced.override_max}";
    }

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return param1.hasValue && !param1.requiresExecutionContext;
    }

    public init(param1: VariableListBase, param2: VariableFxEditorState): void {
        this._SafeStr_4202 = true;
        this._sourceType = this.overrideTarget(param2);
        this._SafeStr_14511.init(param1, this.variableId(param2), this._sourceType);
        this._SafeStr_14512.reinit(VariableFxVariableOverrideRowPreset.sourceOptionsForType(param2.sourceType), this._sourceType);
        this._SafeStr_14510._SafeStr_2119(0).selected = this.enabled(param2);
        this._SafeStr_14510._SafeStr_2119(0).updateDisabledState();
        this._SafeStr_4202 = false;
    }

    public applyToState(param1: VariableFxEditorState, param2: boolean = false): void {
        if (this._SafeStr_14391 == 0) {
            param1.overrideMinEnabled = this._SafeStr_14510._SafeStr_2119(0).selected;
            param1.overrideMinTarget = this._sourceType;
            param1.overrideMinVariableId = this.selectedVariableId(param2);
        } else {
            param1.overrideMaxEnabled = this._SafeStr_14510._SafeStr_2119(0).selected;
            param1.overrideMaxTarget = this._sourceType;
            param1.overrideMaxVariableId = this.selectedVariableId(param2);
        }
    }

    public get sourceTypeValue(): number {
        return this._sourceType;
    }

    public set sourceType(param1: number) {
        this._sourceType = param1;
        this._SafeStr_14511.variableTarget = this._sourceType;
        this.notifyChanged();
    }

    private selectedVariableId(param1: boolean): string {
        let _loc2_: WiredVariable = null;
        if (param1) {
            return this._SafeStr_14511.finalizeSelection;
        }
        _loc2_ = this._SafeStr_14511.selected;
        return _loc2_?.variableId;
    }

    private onVariableChange = (param1: WiredVariable): void => {
        this.notifyChanged();
    };

    private onCheckboxChange = (param1: number, param2: boolean): void => {
        this.notifyChanged();
    };

    private notifyChanged(): void {
        if (this._SafeStr_4202) {
            return;
        }
        if (this._SafeStr_4407 != null) {
            this._SafeStr_4407();
        }
    }

    private enabled(param1: VariableFxEditorState): boolean {
        return this._SafeStr_14391 == 0 ? param1.overrideMinEnabled : param1.overrideMaxEnabled;
    }

    private overrideTarget(param1: VariableFxEditorState): number {
        return this._SafeStr_14391 == 0 ? param1.overrideMinTarget : param1.overrideMaxTarget;
    }

    private variableId(param1: VariableFxEditorState): string {
        return this._SafeStr_14391 == 0 ? param1.overrideMinVariableId : param1.overrideMaxVariableId;
    }

    public override get window(): IWindow {
        return this._SafeStr_14510.window;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_14510.resizeToWidth(param1);
    }

    protected override get childPresets(): any[] {
        return [this._SafeStr_14510];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_4407 = null;
        this._SafeStr_14510 = null;
        this._SafeStr_14511 = null;
        this._SafeStr_14512 = null;
        this._SafeStr_14513 = null;
    }
}
