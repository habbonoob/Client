import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { BitmapViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/BitmapViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class ClickableBitmapViewPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::ClickableBitmapViewPreset'); }

    declare private _bitmapPreset: BitmapViewPreset;

    declare private _SafeStr_2394: IRegionWindow;

    declare private _onClick: (...args: any[]) => any;

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._onClick = param4;
        this._bitmapPreset = param2.createBitmapViewPreset();
        this._bitmapPreset.window.setParamFlag(1, false);
        this._SafeStr_2394 = asGuarded(param1.windowManager.create("clickable_bitmap_view", 5, 0, (1 | 0x10) >>> 0, new Rectangle(0, 0, 1, 1)), isIRegionWindow);
        this._SafeStr_2394.mouseThreshold = 0;
        this._SafeStr_2394.addChild(this._bitmapPreset.window);
        this._SafeStr_2394.addEventListener("WME_CLICK", this.onClicked);
    }

    public get bitmapWindow(): IBitmapWrapperWindow {
        return this._bitmapPreset.bitmapWindow;
    }

    public setBitmapSize(param1: number, param2: number): void {
        this._width = param1;
        this._height = param2;
        this._bitmapPreset.setBitmapSize(param1, param2);
        this.resizeToWidth(param1);
    }

    private onClicked = (param1: WindowMouseEvent): void => {
        if (this._onClick != null) {
            this._onClick(param1);
        }
    };

    public override get window(): IWindow {
        return this._SafeStr_2394;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._bitmapPreset.resizeToWidth(this._width);
        this._SafeStr_2394.width = this._width;
        this._SafeStr_2394.height = this._height;
    }

    public override hasStaticWidth(): boolean {
        return true;
    }

    public override get staticWidth(): number {
        return this._width;
    }

    protected override get childPresets(): any[] {
        return [this._bitmapPreset];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._SafeStr_2394.removeEventListener("WME_CLICK", this.onClicked);
        super.dispose();
        this._SafeStr_2394.dispose();
        this._bitmapPreset = null;
        this._SafeStr_2394 = null;
        this._onClick = null;
    }
}
