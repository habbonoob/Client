import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { VariableNameSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/VariableNameSection';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { VariableTarget } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/VariableTarget';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { NewDefaultVariableType } from '@/com/sulake/habbo/roomevents/wired_setup/variables/NewDefaultVariableType';
import { VariableCodes } from '@/com/sulake/habbo/roomevents/wired_setup/variables/VariableCodes';

export class DailyTaskVariable extends NewDefaultVariableType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.variables::DailyTaskVariable'); }

    public static STRING_PARAM_SPLITTER: string = "\t";

    declare private _variableName: VariableNameSection;

    declare private _SafeStr_5270: TextInputPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return VariableCodes._SafeStr_7455;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._variableName = param1.createVariableNameSection();
        this._SafeStr_5270 = param1.createTextInput(new TextInputParam("", 100, "1234.."));
        let _loc4_: SectionPreset = param1.createSection("${wiredfurni.params.variables.daily_task_name}", this._SafeStr_5270);
        param3.addElements(this._variableName, _loc4_);
    }

    public override readStringParamFromForm(): string {
        return this._variableName.variableName + DailyTaskVariable.STRING_PARAM_SPLITTER + this._SafeStr_5270.text;
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: any[] = param1.stringParam.split(DailyTaskVariable.STRING_PARAM_SPLITTER);
        this.initialVariableName = stringOrNull(_loc2_.length > 0 ? _loc2_[0] : "");
        this._SafeStr_5270.text = stringOrNull(_loc2_.length > 1 ? _loc2_[1] : "");
    }

    protected override get variableNameSection(): VariableNameSection {
        return this._variableName;
    }

    public override variableType(): number {
        return VariableTarget.USER;
    }
}
