import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextAreaPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextAreaPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';

export class _SafeCls_6104 extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::_SafeCls_6104'); }

    declare private _SafeStr_14620: TextAreaPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.ACHIEVEMENT_ENABLER;
    }

    public override readStringParamFromForm(): string {
        return this._SafeStr_14620.text;
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_14620.text = param1.stringParam;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_14620 = param1.createTextArea(new TextAreaParam(60, -1, -1, 100, 2000, "", "${wiredfurni.params.achievement_enabler.placeholder}"));
        let _loc4_: SectionPreset = param1.createSection("${wiredfurni.params.achievement_enabler}", this._SafeStr_14620);
        param3.addElements(_loc4_);
    }
}
