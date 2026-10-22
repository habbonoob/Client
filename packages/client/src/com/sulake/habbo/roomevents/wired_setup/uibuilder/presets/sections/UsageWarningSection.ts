import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class UsageWarningSection extends AbstractSectionPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections::UsageWarningSection'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string) {
        super(param1, param2, param3);
        let _loc5_: TextParam = new TextParam(1);
        _loc5_.textColor = param3.redTextColor;
        this._SafeStr_5459 = param2.createText(param4, _loc5_);
        this.initializeSection(this.l("general_box_warning"), this._SafeStr_5459, SectionParam.EXPANDED);
    }

    declare private _SafeStr_5459: TextPreset;

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_5459 = null;
    }
}
