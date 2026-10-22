import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class WindowWrapperPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::WindowWrapperPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: IWindow, param5: boolean) {
        super(param1, param2, param3);
        this._window = param4;
        this._staticWidth = param5;
    }

    declare private _window: IWindow;

    public override get window(): IWindow {
        return this._window;
    }

    declare private _staticWidth: boolean;
    static { (this.prototype as any)._staticWidth = false; }

    public override get staticWidth(): number {
        if (!this._staticWidth) {
            return -1;
        }
        return this._window.width;
    }

    public override hasStaticWidth(): boolean {
        return this._staticWidth;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._window.width = param1;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._window.dispose();
        this._window = null;
    }
}
