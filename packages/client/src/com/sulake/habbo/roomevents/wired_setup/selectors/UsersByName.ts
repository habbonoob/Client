import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextAreaPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextAreaPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';
import { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';

export class UsersByName extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::UsersByName'); }

    constructor() {
        super();
    }

    declare private _SafeStr_5258: TextAreaPreset;

    public override get code(): number {
        return SelectorCodes.USERS_BY_NAME;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override readStringParamFromForm(): string {
        let _loc1_: string = this._SafeStr_5258.text;
        return _loc1_.replace(/\n\r/g, "\t").replace(/\r/g, "\t").replace(/\n/g, "\t");
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_5258.text = param1.stringParam.replace(/\t/g, "\r");
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_5258 = param1.createTextArea(new TextAreaParam(140, -1, 20, -1, 1000));
        let _loc4_: SectionPreset = param1.createSection("${wiredfurni.params.enter_names}", this._SafeStr_5258);
        param3.addElements(_loc4_);
    }
}
