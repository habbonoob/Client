import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { PlaceholderNameSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/applications/PlaceholderNameSection';
import type { PlaceholderTypeSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/applications/PlaceholderTypeSection';
import type { ChooseVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ChooseVariableSection';
import type { VariablePlaceholderModeSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/VariablePlaceholderModeSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';

export class VariablePlaceholderAddon extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::VariablePlaceholderAddon'); }

    declare private _SafeStr_3339: PlaceholderNameSection;

    declare private _SafeStr_2836: ChooseVariableSection;

    declare private _SafeStr_3977: VariablePlaceholderModeSection;

    declare private _SafeStr_3208: PlaceholderTypeSection;

    declare private _SafeStr_4324: WiredVariable;

    constructor() {
        super();
    }

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return param1.hasValue;
    }

    public static prettifiedName(param1: WiredVariable): string {
        if (param1 == null) {
            return "";
        }
        return Util.flatVariableName(param1);
    }

    public override get code(): number {
        return AddonCodes.VARIABLE_PLACEHOLDER;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_3339 = param1.createPlaceholderNameSection(this.l("texts.placeholder_name"), "$");
        this._SafeStr_2836 = param1.createChooseVariableSection(0, this.mergedSourceOptions(0), VariablePlaceholderAddon.variableSelectionFilter, this.onChangeVariable);
        this._SafeStr_3977 = param1.createVariablePlaceholderModeSection(this.l("texts.variable_display_type"));
        this._SafeStr_3208 = param1.createPlaceholderTypeSection();
        param3.addElements(this._SafeStr_3339, this._SafeStr_2836, this._SafeStr_3977, this._SafeStr_3208);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc3_: any[] = param1.stringParam.split("\t");
        let _loc5_: string = stringOrNull(_loc3_[0]);
        let _loc4_: string = stringOrNull(_loc3_.length > 1 ? _loc3_[1] : "");
        let _loc7_: string = stringOrNull(param1.variableIds[0]);
        let _loc8_: boolean = param1.getBoolean(0);
        let _loc2_: number = param1.getInt(1);
        let _loc6_: boolean = param1.getBoolean(2);
        this._SafeStr_3977.isTextMode = _loc6_;
        this._SafeStr_3339.placeholderName = _loc5_;
        this._SafeStr_3208.isShowMultiple = _loc8_;
        this._SafeStr_3208.delimiter = _loc4_;
        this._SafeStr_2836.init(param1.wiredContext.roomVariablesList, _loc7_, _loc2_);
        this._SafeStr_4324 = this._SafeStr_2836.selected;
        this.onChangeVariable(this._SafeStr_2836.selected);
        this.updateMultipleOptionVisibility();
    }

    public override onEditInitialized(): void {
        this._SafeStr_2836.onEditInitialized();
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_3208.isShowMultiple ? 1 : 0, this._SafeStr_2836.target, this._SafeStr_3977.isTextMode ? 1 : 0];
    }

    public override readStringParamFromForm(): string {
        if (!this._SafeStr_3208.isShowMultiple) {
            return this._SafeStr_3339.placeholderName;
        }
        return this._SafeStr_3339.placeholderName + "\t" + this._SafeStr_3208.delimiter;
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
        if (this._SafeStr_3339.placeholderName == "" || this._SafeStr_4324 != null && VariablePlaceholderAddon.prettifiedName(this._SafeStr_4324) == this._SafeStr_3339.placeholderName) {
            this._SafeStr_3339.placeholderName = VariablePlaceholderAddon.prettifiedName(param1);
        }
        this._SafeStr_4324 = param1;
    };

    private updateMultipleOptionVisibility(): void {
        let _loc1_: boolean = this._SafeStr_2836.target == VariableExtraSourceTypes.CONTEXT_SOURCE || this._SafeStr_2836.target == VariableExtraSourceTypes.GLOBAL_SOURCE;
        this._SafeStr_3208._SafeStr_2119(1).disabled = _loc1_;
        if (_loc1_) {
            this._SafeStr_3208.isShowMultiple = false;
        }
    }

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.variables";
    }

    public override mergedSelections(): any[] {
        return [[0, 0]];
    }

    public override setMergedType(param1: number, param2: number): void {
        this._SafeStr_2836.target = param2;
        this.updateMultipleOptionVisibility();
    }

    public override getMergedType(param1: number): number {
        return this._SafeStr_2836.target;
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        return [VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE];
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return true;
    }
}
