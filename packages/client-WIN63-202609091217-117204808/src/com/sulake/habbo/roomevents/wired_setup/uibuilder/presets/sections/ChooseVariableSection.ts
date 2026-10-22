import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_1969 } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/_SafeCls_1969';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SourceTypeSelectorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SourceTypeSelectorPreset';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class ChooseVariableSection extends AbstractSectionPreset implements SourceTypePickedListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections::ChooseVariableSection'); }

    declare private _picker: VariablePickerPreset;

    declare private _SafeStr_5623: number;
    static { (this.prototype as any)._SafeStr_5623 = 0; }

    declare private _variableTarget: number;
    static { (this.prototype as any)._variableTarget = 0; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number, param5: any[], param6: (...args: any[]) => any, param7: (...args: any[]) => any, param8: string = null) {
        super(param1, param2, param3);
        this._SafeStr_5623 = param4;
        let _loc9_: SectionParam = null;
        if (param5 != null) {
            _loc9_ = new SectionParam(new SourceTypeSelectorParam(param5, this));
        }
        this._picker = param2.createVariablePicker(param6, param7);
        this.initializeSection(param8 == null ? this.l("variables.variable_selection") : param8, this._picker, _loc9_);
    }

    public init(param1: _SafeCls_1969, param2: string, param3: number): void {
        this._picker.init(param1, param2, param3);
        this._variableTarget = param3;
    }

    public onEditInitialized(): void {
        let _loc1_: SourceTypeSelectorPreset = this._SafeStr_2848.getSourceTypeSelector();
        if (_loc1_ != null) {
            _loc1_.select(this._variableTarget);
        }
    }

    public set target(param1: number) {
        this._variableTarget = param1;
        this._picker.variableTarget = this._variableTarget;
    }

    public get target(): number {
        return this._variableTarget;
    }

    public get finalizeSelection(): string {
        return this._picker.finalizeSelection;
    }

    public get selected(): WiredVariable {
        return this._picker.selected;
    }

    public set sourceType(param1: number) {
        if (this._SafeStr_5623 != -1) {
            this._roomEvents.wiredCtrl.setMergedSourceType(this._SafeStr_5623, param1);
        } else {
            this.target = param1;
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._picker = null;
    }
}
