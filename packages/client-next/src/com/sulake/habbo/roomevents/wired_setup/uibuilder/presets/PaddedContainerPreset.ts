import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class PaddedContainerPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::PaddedContainerPreset'); }

    declare protected _window: IWindowContainer;

    declare private _SafeStr_2702: WiredUIPreset;

    declare private _left: number;
    static { (this.prototype as any)._left = 0; }

    declare private _top: number;
    static { (this.prototype as any)._top = 0; }

    declare private _right: number;
    static { (this.prototype as any)._right = 0; }

    declare private _bottom: number;
    static { (this.prototype as any)._bottom = 0; }

    declare private _stretchMode: boolean;
    static { (this.prototype as any)._stretchMode = false; }

    declare private _cachedWidth: number;
    static { (this.prototype as any)._cachedWidth = 0; }

    private _ignoreListeners: boolean = false;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: WiredUIPreset, param5: number, param6: number, param7: number, param8: number, param9: IWindowContainer = null, param10: boolean = false) {
        super(param1, param2, param3);
        this._left = param5;
        this._top = param6;
        this._right = param7;
        this._bottom = param8;
        this._stretchMode = param10;
        this._window = param9;
        if (this._window == null) {
            this._window = asGuarded(param2.createLayout("growing_container_view"), isIWindowContainer);
        }
        this._window.addChild(param4.window);
        this._SafeStr_2702 = param4;
        this._SafeStr_2702.window.x = this._left;
        this._SafeStr_2702.window.y = this._top;
        this._SafeStr_2702.window.addEventListener("WE_RESIZED", this.onResizeListener);
    }

    private onResizeListener = (param1: WindowEvent): void => {
        if (this._ignoreListeners) {
            return;
        }
        this.resizeToWidth(this._cachedWidth);
    };

    public override get window(): IWindow {
        return this._window;
    }

    protected override get childPresets(): any[] {
        return [this._SafeStr_2702];
    }

    public override hasStaticWidth(): boolean {
        return this._stretchMode;
    }

    public override get staticWidth(): number {
        if (this._stretchMode) {
            return this._SafeStr_2702.window.width + this._left + this._right;
        }
        return -1;
    }

    public override resizeToWidth(param1: number): void {
        this._cachedWidth = param1;
        this._ignoreListeners = true;
        if (this._stretchMode) {
            param1 = this.staticWidth;
        }
        super.resizeToWidth(param1);
        this._window.width = param1;
        this._SafeStr_2702.resizeToWidth(param1 - this._left - this._right);
        this._window.height = this._SafeStr_2702.window.height + this._top + this._bottom;
        this._ignoreListeners = false;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._SafeStr_2702.window.removeEventListener("WE_RESIZED", this.onResizeListener);
        super.dispose();
        this._window.dispose();
        this._window = null;
        this._SafeStr_2702 = null;
    }
}
