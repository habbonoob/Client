import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioButtonPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class VariablePlaceholderModeSection extends AbstractSectionPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections::VariablePlaceholderModeSection'); }

    declare private _options: RadioGroupPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string) {
        super(param1, param2, param3);
        this._options = param2.createRadioGroup([new RadioButtonParam(0, this.l("texts.variable_display_type.1")), new RadioButtonParam(1, this.l("texts.variable_display_type.2"), null, param2.createText(this.l("texts.variable_display_type.2.info")).halfBlend().noDisable())]);
        this.initializeSection(param4, this._options);
    }

    public get isTextMode(): boolean {
        return this._options.selected == 1;
    }

    public set isTextMode(param1: boolean) {
        this._options.selected = param1 ? 1 : 0;
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
    }
}
