import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ChooseVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ChooseVariableSection';
import type { UsageInfoSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageInfoSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';

export class ChestItemTypeScanner extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.chests::ChestItemTypeScanner'); }

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return param1.hasValue && param1.canCreateAndDelete && param1.canWriteValue;
    }

    constructor() {
        super();
    }

    declare private _SafeStr_2836: ChooseVariableSection;

    declare private _scanningMode: RadioGroupPreset;

    public override get code(): number {
        return AddonCodes.CHEST_ITEM_TYPE_SCANNER;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: UsageInfoSection = param1.createUsageInfoSection("${wiredfurni.params.chest_item_type_scanner.info}");
        this._SafeStr_2836 = param1.createChooseVariableSection(0, null, ChestItemTypeScanner.variableSelectionFilter);
        this._scanningMode = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.chest_item_type_scanner.0}"), new RadioButtonParam(1, "${wiredfurni.params.chest_item_type_scanner.1}")]);
        let _loc5_: SectionPreset = param1.createSection("${wiredfurni.params.chest_item_type_scanner}", this._scanningMode, SectionParam.COLLAPSED);
        param3.addElements(_loc4_, this._SafeStr_2836, _loc5_);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc3_: string = stringOrNull(param1.variableIds[0]);
        this._SafeStr_2836.init(param1.wiredContext.roomVariablesList, _loc3_, VariableExtraSourceTypes.CONTEXT_SOURCE);
        let _loc2_: number = param1.getInt(0);
        this._scanningMode.selected = _loc2_;
    }

    public override onEditInitialized(): void {
        this._SafeStr_2836.onEditInitialized();
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._SafeStr_2836.finalizeSelection];
    }

    public override readIntParamsFromForm(): any[] {
        return [this._scanningMode.selected];
    }

    public override furniSelectionTitle(param1: number): string {
        if (param1 == 0) {
            return "wiredfurni.params.sources.furni.title.item_types";
        }
        return "wiredfurni.params.sources.furni.title.chests";
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }
}
