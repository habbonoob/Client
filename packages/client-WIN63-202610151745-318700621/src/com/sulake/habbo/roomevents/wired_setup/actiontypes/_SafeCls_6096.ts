import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';

export class _SafeCls_6096 extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::_SafeCls_6096'); }

    declare private _type: RadioGroupPreset;

    declare private _height: SliderSection;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.OVERRIDE_HEIGHT;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._type = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.override_height.type.0}"), new RadioButtonParam(1, "${wiredfurni.params.override_height.type.1}")], this.onChangeType);
        let _loc4_: SectionPreset = param1.createSection("${wiredfurni.params.override_height.type}", this._type);
        this._height = param1.createSliderSection("wiredfurni.params.override_height.height", "", SliderSection.CONVERTER_ECHO, 0, 8000, 1);
        param3.addElements(_loc4_, this._height);
    }

    private onChangeType = (param1: number): void => {
        this._height.disabled = param1 == 1;
    };

    public override onEditStart(param1: Triggerable): void {
        this._height.value = param1.getInt(0);
        this._type.selected = param1.getBoolean(1) ? 1 : 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._height.value, this._type.selected];
    }
}
