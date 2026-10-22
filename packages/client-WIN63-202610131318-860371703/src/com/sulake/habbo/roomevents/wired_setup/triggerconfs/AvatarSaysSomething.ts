import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';

export class AvatarSaysSomething extends DefaultTriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::AvatarSaysSomething'); }

    declare private _chatInput: TextInputPreset;

    declare private _SafeStr_4644: RadioGroupPreset;

    declare private _options: CheckboxGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return TriggerConfCodes.AVATAR_SAYS_SOMETHING;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._chatInput = param1.createTextInput(new TextInputParam("", 1000, null, -1, null, true, this.loc("wiredfurni.tooltip.chatinput")));
        this._SafeStr_4644 = param1.createRadioGroup([new RadioButtonParam(0, this.l("chatcontains")), new RadioButtonParam(1, this.l("exactmatch")), new RadioButtonParam(2, this.l("allmatch"))], this.onTriggerTypeChange);
        this._options = param1.createCheckboxGroup([new CheckboxOptionParam(this.l("chat.hide"), 1), new CheckboxOptionParam(this.l("chat.onlyowner"), 0)]);
        param3.addElements(param1.createSection(this.l("whatissaid"), this._chatInput), param1.createSection(this.l("chattriggertype"), this._SafeStr_4644), param1.createSection(this.l("select_options"), this._options));
    }

    public override readIntParamsFromForm(): any[] {
        return [this._options._SafeStr_2119(0).selected ? 1 : 0, this._SafeStr_4644.selected, this._options._SafeStr_2119(1).selected ? 1 : 0];
    }

    public override readStringParamFromForm(): string {
        return this._chatInput.text;
    }

    public override onEditStart(param1: Triggerable): void {
        this._chatInput.text = param1.stringParam;
        let _loc2_: any[] = param1.intParams;
        this._options._SafeStr_2119(0).selected = _loc2_[0] != 0;
        this._options._SafeStr_2119(1).selected = _loc2_[2] != 0;
        this._SafeStr_4644.selected = _loc2_[1] | 0;
        this.onTriggerTypeChange(this._SafeStr_4644.selected);
    }

    private onTriggerTypeChange = (param1: number): void => {
        Util.disableSection(this._chatInput.window, param1 == 2);
    };
}
