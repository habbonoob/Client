import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';

export class _SafeCls_6108 extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::_SafeCls_6108'); }

    declare private _payloadTypes: CheckboxGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.LINK_SPEAKER;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._payloadTypes = param1.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.link_speaker.message}", 0), new CheckboxOptionParam("${wiredfurni.params.link_speaker.dataframe}", 1)]);
        param3.addElements(param1.createSection("${wiredfurni.params.link_speaker.speak_for}", this._payloadTypes));
    }

    public override onEditStart(param1: Triggerable): void {
        this._payloadTypes._SafeStr_2119(0).selected = param1.getBoolean(0);
        this._payloadTypes._SafeStr_2119(1).selected = param1.getBoolean(1);
    }

    public override readIntParamsFromForm(): any[] {
        return [this._payloadTypes._SafeStr_2119(0).selected ? 1 : 0, this._payloadTypes._SafeStr_2119(1).selected ? 1 : 0];
    }

    public override get forceFurniSelection(): boolean {
        return true;
    }
}
