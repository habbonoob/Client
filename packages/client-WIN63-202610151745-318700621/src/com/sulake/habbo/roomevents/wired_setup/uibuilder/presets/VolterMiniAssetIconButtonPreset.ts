import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBackgroundWindow } from '@/com/sulake/core/window/components/IBackgroundWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIBackgroundWindow } from '@/com/sulake/core/window/components/IBackgroundWindow';
import { MiniAssetIconButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/MiniAssetIconButtonPreset';

export class VolterMiniAssetIconButtonPreset extends MiniAssetIconButtonPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::VolterMiniAssetIconButtonPreset'); }

    private static readonly COLOR_INACTIVE: number = 2236962;
    private static readonly COLOR_YELLOW_HOVERED: number = 5527335;
    private static readonly COLOR_BLUE_HOVERED: number = 3356769;
    private static readonly COLOR_NEUTRAL_HOVERED: number = 16777215;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: string, param6: (...args: any[]) => any) {
        super(param1, param2, param3, param4, param5, param6);
    }

    protected get hoverColor(): number {
        if (MiniAssetIconButtonPreset.YELLOW_ASSETS.indexOf(this._assetName) != -1) {
            return 5527335;
        }
        if (MiniAssetIconButtonPreset.BLUE_ASSETS.indexOf(this._assetName) != -1) {
            return 3356769;
        }
        return 16777215;
    }

    protected override updateUI(): void {
        let _loc1_: any = 2236962;
        if (this._hovered) {
            _loc1_ = this.hoverColor;
        } else if (this._selected) {
            _loc1_ = this.selectedColor;
        }
        _loc1_ |= 4278190080;
        this.clickArea.color = _loc1_ >>> 0;
        this.marginLeftBg.color = _loc1_ >>> 0;
        this.marginRightBg.color = _loc1_ >>> 0;
    }

    private get marginLeftBg(): IBackgroundWindow {
        return asGuarded(this._container.findChildByName("margin_item_color_left"), isIBackgroundWindow);
    }

    private get marginRightBg(): IBackgroundWindow {
        return asGuarded(this._container.findChildByName("margin_item_color_right"), isIBackgroundWindow);
    }
}
