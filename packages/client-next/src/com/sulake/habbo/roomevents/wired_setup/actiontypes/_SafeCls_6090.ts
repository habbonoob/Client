import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class _SafeCls_6090 extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::_SafeCls_6090'); }

    declare private _effectId: NumberInputPreset;

    declare private _priority: NumberInputPreset;

    declare private _type: RadioGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.GIVE_EFFECT;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._effectId = param1.createNumberInput(new NumberInputParam(13, 0, 10000));
        let _loc4_: SectionPreset = param1.createSection("${wiredfurni.params.give_effect.id}", this._effectId);
        this._priority = param1.createNumberInput(new NumberInputParam(2, 0, 2));
        let _loc5_: SectionPreset = param1.createSection("${wiredfurni.params.give_effect.priority}", this._priority);
        this._type = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.give_effect.type.0}"), new RadioButtonParam(1, "${wiredfurni.params.give_effect.type.1}")], null, 2);
        let _loc6_: SectionPreset = param1.createSection("${wiredfurni.params.give_effect.type}", this._type);
        param3.addElements(_loc4_, _loc5_, _loc6_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._effectId.value = param1.getInt(0);
        this._priority.value = param1.getInt(1);
        this._type.selected = param1.getBoolean(2) ? 1 : 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._effectId.value, this._priority.value, this._type.selected];
    }
}
