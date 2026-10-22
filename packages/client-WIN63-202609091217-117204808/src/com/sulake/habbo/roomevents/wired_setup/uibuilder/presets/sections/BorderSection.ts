import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class BorderSection extends AbstractSectionPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections::BorderSection'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: WiredUIPreset, param6: SectionParam = null) {
        super(param1, param2, param3);
        this.initializeSection(param4, param2.createPaddedContainerPreset(param5, param3.paddedSectionLeft, param3.paddedSectionTop, param3.paddedSectionLeft, param3.paddedSectionTop, param3.createBorder()));
    }
}
