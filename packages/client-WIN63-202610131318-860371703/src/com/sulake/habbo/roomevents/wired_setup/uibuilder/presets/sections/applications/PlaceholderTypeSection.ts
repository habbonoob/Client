import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NamedTextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedTextInputPreset';
import type { RadioButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioButtonPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class PlaceholderTypeSection extends AbstractSectionPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections.applications::PlaceholderTypeSection'); }

    declare private _options: RadioGroupPreset;

    declare private _SafeStr_4086: NamedTextInputPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string = null) {
        super(param1, param2, param3);
        this._SafeStr_4086 = param2.createNamedTextInput(new TextInputParam("", 5, null, 55), this.l("texts.select_delimiter"));
        param4 = param4 == null ? "" : param4 + ".";
        this._options = param2.createRadioGroup([new RadioButtonParam(0, this.l("texts.placeholder_type." + param4 + "1")), new RadioButtonParam(1, this.l("texts.placeholder_type." + param4 + "2"), null, this._SafeStr_4086)]);
        this.initializeSection(this.l("texts.placeholder_type"), this._options);
    }

    public get isShowMultiple(): boolean {
        return this._options.selected == 1;
    }

    public set isShowMultiple(param1: boolean) {
        this._options.selected = param1 ? 1 : 0;
    }

    public get delimiter(): string {
        return this.isShowMultiple ? this._SafeStr_4086.text : "";
    }

    public set delimiter(param1: string) {
        this._SafeStr_4086.text = param1;
    }

    public _SafeStr_2119(param1: number): RadioButtonPreset {
        return this._options._SafeStr_2119(param1);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._options = null;
        this._SafeStr_4086 = null;
    }
}
