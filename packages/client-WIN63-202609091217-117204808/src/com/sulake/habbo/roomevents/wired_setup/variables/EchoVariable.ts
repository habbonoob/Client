import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ChooseVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ChooseVariableSection';
import type { VariableNameSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/VariableNameSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariableType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariableType';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { NewDefaultVariableType } from '@/com/sulake/habbo/roomevents/wired_setup/variables/NewDefaultVariableType';
import { VariableCodes } from '@/com/sulake/habbo/roomevents/wired_setup/variables/VariableCodes';

export class EchoVariable extends NewDefaultVariableType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.variables::EchoVariable'); }

    declare private _variableName: VariableNameSection;

    declare private _SafeStr_2836: ChooseVariableSection;

    declare private _SafeStr_4324: WiredVariable;

    constructor() {
        super();
    }

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return param1.variableType != WiredVariableType._SafeStr_7398;
    }

    public override get code(): number {
        return VariableCodes.ECHO_VARIABLE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._variableName = param1.createVariableNameSection();
        this._SafeStr_2836 = param1.createChooseVariableSection(-1, [WiredInputSourcePicker._SafeStr_2178, WiredInputSourcePicker.USER_SOURCE, VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE], EchoVariable.variableSelectionFilter, this.onVariableSelected);
        param3.addElements(this._variableName, this._SafeStr_2836);
    }

    public override readStringParamFromForm(): string {
        return this._variableName.variableName;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._SafeStr_2836.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc3_: string = stringOrNull(param1.variableIds[0]);
        let _loc4_: number = WiredInputSourcePicker.USER_SOURCE;
        let _loc2_: WiredVariable = Util.findVariableById(param1.wiredContext.roomVariablesList.variables, _loc3_);
        if (_loc2_ != null) {
            _loc4_ = _loc2_.variableTarget;
        }
        this._SafeStr_2836.init(param1.wiredContext.roomVariablesList, _loc3_, _loc4_);
        this._SafeStr_4324 = this._SafeStr_2836.selected;
        this.initialVariableName = param1.stringParam;
    }

    public override onEditInitialized(): void {
        this._SafeStr_2836.onEditInitialized();
    }

    private onVariableSelected = (param1: WiredVariable): void => {
        if (this._variableName.variableName.length == 0 || this._SafeStr_4324 != null && this.defaultEchoVarName(this._SafeStr_4324) == this._variableName.variableName) {
            this._variableName.variableName = param1 == null ? "" : this.defaultEchoVarName(param1);
        }
        this._SafeStr_4324 = param1;
    };

    private defaultEchoVarName(param1: WiredVariable): string {
        return Util.flatVariableName(param1);
    }

    protected override get variableNameSection(): VariableNameSection {
        return this._variableName;
    }

    public override variableType(): number {
        return this._SafeStr_2836.target;
    }
}
