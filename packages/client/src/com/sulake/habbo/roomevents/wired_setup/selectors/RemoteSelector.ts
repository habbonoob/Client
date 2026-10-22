import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class RemoteSelector extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::RemoteSelector'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4444: RadioGroupPreset;

    declare private _SafeStr_4917: RadioGroupPreset;

    declare private _SafeStr_4627: NumberInputPreset;

    public override get code(): number {
        return SelectorCodes.REMOTE_SELECTOR;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4444 = param1.createRadioGroup([new RadioButtonParam(0, this.l("remote_selection.type.0")), new RadioButtonParam(1, this.l("remote_selection.type.1"))]);
        let _loc5_: SectionPreset = param1.createSection(this.l("remote_selection.type"), this._SafeStr_4444);
        this._SafeStr_4627 = param1.createNumberInput(new NumberInputParam(0, 0, 2147483647, 40, 0, false));
        this._SafeStr_4917 = param1.createRadioGroup([new RadioButtonParam(0, this.l("remote_selection.filter.0")), new RadioButtonParam(1, this.l("remote_selection.filter.1"), this._SafeStr_4627)]);
        let _loc4_: SectionPreset = param1.createSection(this.l("remote_selection.filter"), this._SafeStr_4917);
        param3.addElements(_loc5_, _loc4_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4444.selected = param1.intParams[0] | 0;
        let _loc2_: number = param1.intParams[1] | 0;
        this._SafeStr_4917.selected = _loc2_ > 0 ? 1 : 0;
        this._SafeStr_4627.value = _loc2_;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: number = this._SafeStr_4917.selected == 1 ? this._SafeStr_4627.value : 0;
        return [this._SafeStr_4444.selected, _loc1_];
    }
}
