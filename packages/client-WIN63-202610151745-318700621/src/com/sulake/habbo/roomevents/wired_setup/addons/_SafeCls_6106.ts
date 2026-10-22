import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { UsageInfoSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageInfoSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';

export class _SafeCls_6106 extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::_SafeCls_6106'); }

    declare private _categories: CheckboxGroupPreset;

    constructor() {
        super();
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    protected get usageInfoLocalization(): string {
        return null;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: UsageInfoSection = param1.createUsageInfoSection(this.usageInfoLocalization);
        this._categories = param1.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.variables.addon_sharing.text_connectors}", 0), new CheckboxOptionParam("${wiredfurni.params.variables.addon_sharing.subvariable_creators}", 1), new CheckboxOptionParam("${wiredfurni.params.variables.addon_sharing.variable_fx}", 2)]);
        let _loc5_: SectionPreset = param1.createSection("${wiredfurni.params.variables.addon_sharing.categories}", this._categories);
        param3.addElements(_loc4_, _loc5_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._categories._SafeStr_2119(0).selected = param1.getBoolean(0);
        this._categories._SafeStr_2119(1).selected = param1.getBoolean(1);
        this._categories._SafeStr_2119(2).selected = param1.getBoolean(2);
    }

    public override readIntParamsFromForm(): any[] {
        return [this._categories._SafeStr_2119(0).selected ? 1 : 0, this._categories._SafeStr_2119(1).selected ? 1 : 0, this._categories._SafeStr_2119(2).selected ? 1 : 0];
    }
}
