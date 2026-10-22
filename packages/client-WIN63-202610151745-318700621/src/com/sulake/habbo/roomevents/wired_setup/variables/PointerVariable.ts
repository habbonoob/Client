import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ChooseVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ChooseVariableSection';
import type { UsageInfoSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageInfoSection';
import type { VariableNameSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/VariableNameSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { VariableTarget } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/VariableTarget';
import { WiredVariableType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariableType';
import { _SafeCls_6087 } from '@/com/sulake/habbo/roomevents/wired_setup/_SafeCls_6087';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';
import { NewDefaultVariableType } from '@/com/sulake/habbo/roomevents/wired_setup/variables/NewDefaultVariableType';
import { VariableCodes } from '@/com/sulake/habbo/roomevents/wired_setup/variables/VariableCodes';

export class PointerVariable extends NewDefaultVariableType implements _SafeCls_6087, SourceTypePickedListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.variables::PointerVariable'); }

    private _SafeStr_14424: number = VariableTarget.FURNI;

    declare private _variableName: VariableNameSection;

    declare private _accessorVariable: ChooseVariableSection;

    constructor() {
        super();
    }

    private static accessorVariableFilter(param1: WiredVariable): boolean {
        return param1.variableType == WiredVariableType._SafeStr_7398 && param1.variableTarget == VariableTarget._SafeStr_7556 && param1.hasValue && !param1.requiresExecutionContext;
    }

    public override get code(): number {
        return VariableCodes._SafeStr_14423;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public getHeaderSourceTypeSelectorParam(param1: Triggerable): SourceTypeSelectorParam {
        return new SourceTypeSelectorParam([VariableTarget.FURNI, VariableTarget.USER, VariableTarget._SafeStr_7451, VariableTarget._SafeStr_7556], this, param1.getInt(0));
    }

    public get headerSourceType(): number {
        return this._SafeStr_14424;
    }

    public set sourceType(param1: number) {
        this._SafeStr_14424 = param1;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: UsageInfoSection = param1.createUsageInfoSection("${wiredfurni.params.variables.pointer.usage_info}");
        this._variableName = param1.createVariableNameSection();
        this._accessorVariable = param1.createChooseVariableSection(-1, null, PointerVariable.accessorVariableFilter, null, this.l("variables.pointer.accessor"));
        param3.addElements(_loc4_, this._variableName, this._accessorVariable);
    }

    public override onEditStart(param1: Triggerable): void {
        this._accessorVariable.init(param1.wiredContext.roomVariablesList, stringOrNull(param1.variableIds[0]), VariableTarget._SafeStr_7556);
        this._SafeStr_14424 = param1.getInt(0);
        this.initialVariableName = param1.stringParam;
    }

    public override onEditInitialized(): void {
        this._accessorVariable.onEditInitialized();
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_14424];
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._accessorVariable.finalizeSelection];
    }

    public override readStringParamFromForm(): string {
        return this._variableName.variableName;
    }

    public override variableType(): number {
        return this._SafeStr_14424;
    }

    protected override get variableNameSection(): VariableNameSection {
        return this._variableName;
    }

    get [_SafeCls_6087](): true {
        return true;
    }
}
