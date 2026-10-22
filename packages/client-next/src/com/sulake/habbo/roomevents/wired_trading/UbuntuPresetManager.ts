import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';

export class UbuntuPresetManager extends PresetManager {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading::UbuntuPresetManager'); }

    declare private _SafeStr_6053: WiredStyle;

    constructor(param1: HabboUserDefinedRoomEvents) {
        super(param1);
        this._SafeStr_6053 = param1.wiredCtrl.getStyleByName("ubuntu");
    }

    public override get wiredStyle(): WiredStyle {
        return this._SafeStr_6053;
    }
}
