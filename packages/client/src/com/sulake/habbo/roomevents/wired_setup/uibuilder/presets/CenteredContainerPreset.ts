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

export class CenteredContainerPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::CenteredContainerPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: WiredUIPreset, param5: number, param6: IWindowContainer = null) {
        super(param1, param2, param3);
        this._window = param6;
        if (this._window == null) {
            this._window = asGuarded(param2.createLayout("container_view"), isIWindowContainer);
        }
        this._window.addChild(param4.window);
        this._SafeStr_2702 = param4;
        this._SafeStr_2702.window.y = param5;
        this._topBottomMargin = param5;
        this._SafeStr_2702.window.addEventListener("WE_RESIZED", this.onResizeListener);
        if (!this._SafeStr_2702.hasStaticWidth()) {
            throw new Error("CenteredContainerPreset only works with static with children");
        }
    }

    declare private _SafeStr_2702: WiredUIPreset;

    declare private _topBottomMargin: number;
    static { (this.prototype as any)._topBottomMargin = 0; }

    private _ignoreListeners: boolean = false;

    declare private _window: IWindowContainer;

    public override get window(): IWindow {
        return this._window;
    }

    protected override get childPresets(): any[] {
        return [this._SafeStr_2702];
    }

    public override resizeToWidth(param1: number): void {
        this._ignoreListeners = true;
        super.resizeToWidth(param1);
        this._window.width = param1;
        this._SafeStr_2702.resizeToWidth(this._SafeStr_2702.staticWidth);
        this._window.height = this._SafeStr_2702.window.height + this._topBottomMargin * 2;
        this._SafeStr_2702.window.x = param1 / 2 - this._SafeStr_2702.staticWidth / 2 | 0;
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

    private onResizeListener = (param1: WindowEvent): void => {
        if (this._ignoreListeners) {
            return;
        }
        this.resizeToWidth(this._window.width);
    };
}
