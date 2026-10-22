import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ChooseVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ChooseVariableSection';
import type { PlaceholderNameSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/PlaceholderNameSection';
import type { VariablePlaceholderModeSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/VariablePlaceholderModeSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';

export class VariableCapturerAddon extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::VariableCapturerAddon'); }

    public static prettifiedName(param1: WiredVariable): string {
        if (param1 == null) {
            return "";
        }
        return Util.flatVariableName(param1);
    }

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return param1.hasValue && param1.canCreateAndDelete && param1.canWriteValue;
    }

    constructor() {
        super();
    }

    declare private _SafeStr_3339: PlaceholderNameSection;

    declare private _SafeStr_2836: ChooseVariableSection;

    declare private _SafeStr_3977: VariablePlaceholderModeSection;

    declare private _SafeStr_4324: WiredVariable;

    public override get code(): number {
        return AddonCodes.VARIABLE_CAPTURER;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_3339 = param1.createPlaceholderNameSection(this.l("texts.capturer_name"), "#");
        this._SafeStr_2836 = param1.createChooseVariableSection(0, null, VariableCapturerAddon.variableSelectionFilter, this.onChangeVariable);
        this._SafeStr_3977 = param1.createVariablePlaceholderModeSection(this.l("texts.variable_input_type"));
        param3.addElements(this._SafeStr_3339, this._SafeStr_2836, this._SafeStr_3977);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: any[] = param1.stringParam.split("\t");
        let _loc3_: string = stringOrNull(_loc2_[0]);
        let _loc5_: string = stringOrNull(param1.variableIds[0]);
        let _loc4_: boolean = param1.getBoolean(0);
        this._SafeStr_3977.isTextMode = _loc4_;
        this._SafeStr_3339.placeholderName = _loc3_;
        this._SafeStr_2836.init(param1.wiredContext.roomVariablesList, _loc5_, VariableExtraSourceTypes.CONTEXT_SOURCE);
        this._SafeStr_4324 = this._SafeStr_2836.selected;
        this.onChangeVariable(this._SafeStr_2836.selected);
    }

    public override onEditInitialized(): void {
        this._SafeStr_2836.onEditInitialized();
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_3977.isTextMode ? 1 : 0];
    }

    public override readStringParamFromForm(): string {
        return this._SafeStr_3339.placeholderName;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._SafeStr_2836.finalizeSelection];
    }

    private onChangeVariable = (param1: WiredVariable): void => {
        let _loc2_: boolean = param1 == null || !param1.hasTextConnector;
        this._SafeStr_3977._SafeStr_2119(1).disabled = _loc2_;
        if (_loc2_) {
            this._SafeStr_3977.isTextMode = false;
        }
        if (this._SafeStr_3339.placeholderName == "" || this._SafeStr_4324 != null && VariableCapturerAddon.prettifiedName(this._SafeStr_4324) == this._SafeStr_3339.placeholderName) {
            this._SafeStr_3339.placeholderName = VariableCapturerAddon.prettifiedName(param1);
        }
        this._SafeStr_4324 = param1;
    };
}
