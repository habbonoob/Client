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

export class QuestChainVariable extends NewDefaultVariableType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.variables::QuestChainVariable'); }

    public static STRING_PARAM_SPLITTER: string = "\t";

    constructor() {
        super();
    }

    declare private _variableName: VariableNameSection;

    declare private _questChainName: TextInputPreset;

    public override get code(): number {
        return VariableCodes._SafeStr_7457;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    protected override get variableNameSection(): VariableNameSection {
        return this._variableName;
    }

    public override onEditStart(param1: Triggerable): void {
        super.onEditStart(param1);
        let _loc2_: any[] = param1.stringParam.split(QuestChainVariable.STRING_PARAM_SPLITTER);
        this.initialVariableName = stringOrNull(_loc2_.length > 0 ? _loc2_[0] : "");
        this._questChainName.text = stringOrNull(_loc2_.length > 1 ? _loc2_[1] : "");
    }

    public override readStringParamFromForm(): string {
        return this._variableName.variableName + QuestChainVariable.STRING_PARAM_SPLITTER + this._questChainName.text;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._variableName = param1.createVariableNameSection();
        this._questChainName = param1.createTextInput(new TextInputParam("", 500));
        let _loc4_: SectionPreset = param1.createSection(this.l("variables.quest_chain_name"), this._questChainName);
        param3.addElements(this._variableName, _loc4_);
    }

    public override variableType(): number {
        return VariableTarget.USER;
    }
}
