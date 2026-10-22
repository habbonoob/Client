import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class StateChange extends DefaultTriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::StateChange'); }

    declare private _SafeStr_4592: RadioGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return TriggerConfCodes.STATE_CHANGE;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4592.selected];
    }

    public override get hasStateSnapshot(): boolean {
        return true;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4592 = param1.createRadioGroup([new RadioButtonParam(1, this.l("state_trigger.1")), new RadioButtonParam(0, this.l("state_trigger.0"))]);
        let _loc4_: SectionPreset = param1.createSection(this.l("select_options"), this._SafeStr_4592);
        param3.addElements(_loc4_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4592.selected = param1.intParams[0] | 0;
    }
}
