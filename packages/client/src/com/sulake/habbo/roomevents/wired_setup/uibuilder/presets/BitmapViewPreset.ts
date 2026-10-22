import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class BitmapViewPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::BitmapViewPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        super(param1, param2, param3);
        this._window = asGuarded(param2.createLayout("bitmap_wrapper_view"), isIBitmapWrapperWindow);
    }

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    declare private _window: IBitmapWrapperWindow;

    public override get window(): IWindow {
        return this._window;
    }

    public override get staticWidth(): number {
        return this._width;
    }

    public get bitmapWindow(): IBitmapWrapperWindow {
        return this._window;
    }

    public override hasStaticWidth(): boolean {
        return true;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._window.width = this._width;
        this._window.height = this._height;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._window.dispose();
        this._window = null;
    }

    public setBitmapSize(param1: number, param2: number): void {
        this._width = param1;
        this._height = param2;
    }
}
