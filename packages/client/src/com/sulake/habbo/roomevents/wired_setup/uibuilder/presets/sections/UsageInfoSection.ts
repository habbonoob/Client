import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class UsageInfoSection extends AbstractSectionPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections::UsageInfoSection'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: boolean = false, param6: string = null) {
        super(param1, param2, param3);
        let _loc7_: TextParam = new TextParam(1);
        _loc7_.textColor = param3.softTextColor;
        this._SafeStr_5386 = param2.createText(param4, _loc7_);
        if (param6 == null) {
            param6 = this.l("general_box_info");
        }
        this.initializeSection(param6, this._SafeStr_5386, param5 ? SectionParam.COLLAPSED : SectionParam.EXPANDED);
    }

    declare private _SafeStr_5386: TextPreset;

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_5386 = null;
    }
}
