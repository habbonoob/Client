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

export class VariableTextConnectorAddon extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::VariableTextConnectorAddon'); }

    declare private _textInput: TextAreaPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.VARIABLE_TEXT_CONVERTER;
    }

    public override onEditStart(param1: Triggerable): void {
        this._textInput.text = param1.stringParam;
    }

    public override readStringParamFromForm(): string {
        return this._textInput.text;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._textInput = param1.createTextArea(new TextAreaParam(100, -1, 30, -1, 1000, "", this.l("variables.connect_text.caption")));
        let _loc4_: SectionPreset = param1.createSection(this.l("variables.connect_text.title"), this._textInput);
        param3.addElements(_loc4_);
    }
}
