import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PlaneMaterial } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneMaterial';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class PlaneVisualizationLayer implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::PlaneVisualizationLayer'); }

    public static readonly DEFAULT_OFFSET: number = 0;
    public static readonly ALIGN_TOP: number = 1;
    public static readonly ALIGN_BOTTOM: number = 2;
    public static readonly ALIGN_DEFAULT: number = 1;
    private _SafeStr_3610: PlaneMaterial = null;
    private _color: number = 0;
    private _offset: number = 0;
    private _align: number = 1;
    private _bitmapData: BitmapData = null;
    private _disposed: boolean = false;

    constructor(param1: PlaneMaterial, param2: number, param3: number, param4: number = 0) {
        this._SafeStr_3610 = param1;
        this._offset = param4;
        this._align = param3;
        this._color = param2;
    }

    public get offset(): number {
        return this._offset;
    }

    public get align(): number {
        return this._align;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        this._disposed = true;
        this._SafeStr_3610 = null;
        if (this._bitmapData != null) {
            this._bitmapData.dispose();
            this._bitmapData = null;
        }
    }

    public clearCache(): void {
        if (this._bitmapData != null) {
            this._bitmapData.dispose();
            this._bitmapData = null;
        }
    }

    public render(param1: BitmapData, param2: number, param3: number, param4: IVector3d, param5: boolean, param6: number, param7: number): BitmapData {
        let _loc16_: number = NaN;
        let _loc13_: number = NaN;
        let _loc10_: number = NaN;
        let _loc14_: ColorTransform = null;
        let _loc12_: number = (this._color >> 16) >>> 0;
        let _loc9_: number = (this._color >> 8 & 0xFF) >>> 0;
        let _loc8_: number = (this._color & 0xFF) >>> 0;
        let _loc11_: boolean = false;
        if (_loc12_ < 255 || _loc9_ < 255 || _loc8_ < 255) {
            _loc11_ = true;
        }
        if (param1 == null || param1.width != param2 || param1.height != param3) {
            param1 = null;
        }
        let _loc15_: BitmapData = null;
        if (this._SafeStr_3610 != null) {
            if (_loc11_) {
                _loc15_ = this._SafeStr_3610.render(null, param2, param3, param4, param5, param6, param7 + this.offset, this.align == 1);
            } else {
                _loc15_ = this._SafeStr_3610.render(param1, param2, param3, param4, param5, param6, param7 + this.offset, this.align == 1);
            }
        } else if (param1 == null) {
            if (this._bitmapData != null && this._bitmapData.width == param2 && this._bitmapData.height == param3) {
                return this._bitmapData;
            }
            if (this._bitmapData != null) {
                this._bitmapData.dispose();
            }
            this._bitmapData = new BitmapData(param2, param3, true, 4294967295);
            _loc15_ = this._bitmapData;
        } else {
            param1.fillRect(param1.rect, 4294967295);
            _loc15_ = param1;
        }
        if (_loc15_ != null) {
            if (_loc11_) {
                _loc16_ = _loc12_ / 255;
                _loc13_ = _loc9_ / 255;
                _loc10_ = _loc8_ / 255;
                _loc14_ = new ColorTransform(_loc16_, _loc13_, _loc10_);
                _loc15_.colorTransform(_loc15_.rect, _loc14_);
                if (param1 != null && _loc15_ != param1) {
                    param1.copyPixels(_loc15_, _loc15_.rect, new Point(0, 0), null, null, true);
                    _loc15_ = param1;
                }
            }
        }
        return _loc15_;
    }

    public getMaterial(): PlaneMaterial {
        return this._SafeStr_3610;
    }

    public getColor(): number {
        return this._color;
    }

    get [IDisposable](): true {
        return true;
    }
}
