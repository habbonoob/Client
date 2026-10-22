import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { UsageInfoSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageInfoSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class CancelTransaction extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes.chests::CancelTransaction'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4422: RadioGroupPreset;

    public override get code(): number {
        return ActionTypeCodes.CANCEL_TRANSACTION;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4422.selected];
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4422.selected = param1.intParams[0] | 0;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: UsageInfoSection = param1.createUsageInfoSection("${wiredfurni.params.cancel_transaction.usage_info}");
        this._SafeStr_4422 = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.cancel_transaction.match_criteria.0}"), new RadioButtonParam(1, "${wiredfurni.params.cancel_transaction.match_criteria.1}")], this.onChangeCancelMode);
        let _loc5_: SectionPreset = param1.createSection("${wiredfurni.params.cancel_transaction.match_criteria}", this._SafeStr_4422);
        param3.addElements(_loc4_, _loc5_);
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 == WiredInputSourcePicker._SafeStr_2178 && param1 == 0) {
            return this._SafeStr_4422.selected == 1;
        }
        return false;
    }

    private onChangeCancelMode = (param1: number): void => {
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker._SafeStr_2178, 0);
    };
}
