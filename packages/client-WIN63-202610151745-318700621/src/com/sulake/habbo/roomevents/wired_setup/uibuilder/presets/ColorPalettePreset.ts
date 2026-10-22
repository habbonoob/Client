import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ClickableBitmapViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ClickableBitmapViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class ColorPalettePreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::ColorPalettePreset'); }

    private static readonly COLUMNS: number = 10;
    private static readonly _SafeStr_14359: number = 18;
    private static readonly GAP: number = 3;

    declare private _colors: number[];

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    declare private _columns: number;
    static { (this.prototype as any)._columns = 0; }

    declare private _SafeStr_2959: number;
    static { (this.prototype as any)._SafeStr_2959 = 0; }

    declare private _palette: ClickableBitmapViewPreset;

    declare private _SafeStr_14360: (...args: any[]) => any;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number[], param5: (...args: any[]) => any = null) {
        super(param1, param2, param3);
        this._colors = param4;
        this._SafeStr_14360 = param5;
        this._columns = Math.min(10, param4.length) | 0;
        this._SafeStr_2959 = Math.ceil(param4.length / this._columns) | 0;
        this._palette = param2.createClickableBitmapViewPreset(this.onPaletteClicked);
        this._palette.setBitmapSize(this.paletteWidth, this.paletteHeight);
        this._palette.bitmapWindow.disposesBitmap = true;
        this.color = param4[0];
    }

    public get color(): number {
        return this._color;
    }

    public set color(param1: number) {
        this._color = this._colors.indexOf(param1) >= 0 ? param1 : this._colors[0];
        this._palette.bitmapWindow.bitmap = this.renderPalette();
    }

    private onPaletteClicked = (param1: WindowMouseEvent): void => {
        let _loc5_: number = 21;
        let _loc2_: number = param1.localX / _loc5_ | 0;
        let _loc4_: number = param1.localY / _loc5_ | 0;
        if (_loc2_ >= this._columns || _loc4_ >= this._SafeStr_2959 || param1.localX % _loc5_ >= 18 || param1.localY % _loc5_ >= 18) {
            return;
        }
        let _loc3_: number = _loc4_ * this._columns + _loc2_;
        if (_loc3_ < this._colors.length) {
            this.color = this._colors[_loc3_];
            if (this._SafeStr_14360 != null) {
                this._SafeStr_14360(this._color);
            }
        }
    };

    private renderPalette(): BitmapData {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc5_: number = 0;
        let _loc7_: boolean = false;
        let _loc1_: number = 0;
        let _loc2_: BitmapData = new BitmapData(this.paletteWidth, this.paletteHeight, true, 0);
        let _loc6_: number = 21;
        _loc4_ = 0;
        while (_loc4_ < this._colors.length) {
            _loc3_ = _loc4_ % this._columns * _loc6_;
            _loc5_ = (_loc4_ / this._columns | 0) * _loc6_;
            _loc7_ = this._colors[_loc4_] == this._color;
            _loc2_.fillRect(new Rectangle(_loc3_, _loc5_, 18, 18), _loc7_ ? 4294967295 : 4283782485);
            _loc1_ = _loc7_ ? 2 : 1;
            if (_loc7_) {
                _loc2_.fillRect(new Rectangle(_loc3_ + 1, _loc5_ + 1, 18 - 2, 18 - 2), 4278190080);
            }
            _loc2_.fillRect(new Rectangle(_loc3_ + _loc1_, _loc5_ + _loc1_, 18 - _loc1_ * 2, 18 - _loc1_ * 2), (0xFF000000 | this._colors[_loc4_]) >>> 0);
            _loc4_++;
        }
        return _loc2_;
    }

    private get paletteWidth(): number {
        return this._columns * 18 + (this._columns - 1) * 3;
    }

    private get paletteHeight(): number {
        return this._SafeStr_2959 * 18 + (this._SafeStr_2959 - 1) * 3;
    }

    public override get window(): IWindow {
        return this._palette.window;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._palette.resizeToWidth(param1);
    }

    public override hasStaticWidth(): boolean {
        return true;
    }

    public override get staticWidth(): number {
        return this.paletteWidth;
    }

    protected override get childPresets(): any[] {
        return [this._palette];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._palette = null;
        this._colors = null;
        this._SafeStr_14360 = null;
    }
}
