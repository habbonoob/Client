import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { InteractiveController } from '@/com/sulake/core/window/Classes.group';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { MiniAssetIconButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/MiniAssetIconButtonPreset';

export class PressedButtonMiniAssetIconButtonPreset extends MiniAssetIconButtonPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::PressedButtonMiniAssetIconButtonPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: string, param6: (...args: any[]) => any) {
        super(param1, param2, param3, param4, param5, param6);
        this.clickArea.addEventListener("WME_OUT", this.maybeCancelEvent);
        this.clickArea.addEventListener("WME_UP", this.maybeCancelEvent);
        this.updateUI();
    }

    protected override updateUI(): void {
        let _loc1_: InteractiveController = castTo(this.clickArea, InteractiveController);
        _loc1_.setStateFlag(16, this._selected);
        _loc1_.setStateFlag(4, this._hovered);
        if (!this._hovered && !this._selected) {
            this.clickArea.color = 16777215;
            return;
        }
        let _loc2_: number = this.selectedColor;
        let _loc3_: number = 1.38;
        if (this._hovered && !this._selected) {
            _loc3_ = 1.6;
        }
        _loc2_ = Util.lightenColor(_loc2_, _loc3_);
        this.clickArea.color = _loc2_;
    }

    private maybeCancelEvent(param1: WindowMouseEvent): void {
        if (param1.type == "WME_OUT" && this._selected) {
            param1.preventWindowOperation();
        }
        if (param1.type == "WME_UP") {
            this.iconClicked(null);
            param1.preventWindowOperation();
        }
    }

    protected override initInstanceFields(): void {
        this.maybeCancelEvent = this.maybeCancelEvent.bind(this);
        super.initInstanceFields();
    }
}
