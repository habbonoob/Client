import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGraphicContext } from '@/com/sulake/core/window/graphics/IGraphicContext';
import type { ISkinContainer } from '@/com/sulake/core/window/graphics/ISkinContainer';
import type { ISkinRenderer } from '@/com/sulake/core/window/graphics/renderer/ISkinRenderer';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { TrackedBitmapData } from '@/com/sulake/core/utils/profiler/tracking/TrackedBitmapData';
import { isIGraphicContextHost } from '@/com/sulake/core/window/graphics/IGraphicContextHost';

export class WindowRendererItem implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.window.graphics::WindowRendererItem'); }

    protected static readonly RENDER_TYPE_NULL: number = 0;
    protected static readonly RENDER_TYPE_SKIN: number = 1;
    protected static readonly RENDER_TYPE_FILL: number = 2;
    protected static readonly MATRIX: Matrix = new Matrix();
    protected static readonly COLOR_TRANSFORM: ColorTransform = new ColorTransform();

    declare protected _buffer: TrackedBitmapData;

    declare protected _SafeStr_2935: ISkinContainer;

    declare protected _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare protected _refresh: boolean;
    static { (this.prototype as any)._refresh = false; }

    declare protected _SafeStr_4710: number;
    static { (this.prototype as any)._SafeStr_4710 = 0; }

    declare protected _SafeStr_3637: number;
    static { (this.prototype as any)._SafeStr_3637 = 0; }

    constructor(param1: ISkinContainer) {
        this._disposed = false;
        this._SafeStr_2935 = param1;
        this._SafeStr_4710 = 4294967295;
        this._SafeStr_3637 = 0;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get buffer(): BitmapData {
        return this._buffer;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._disposed = true;
            this._SafeStr_2935 = null;
            if (this._buffer != null) {
                this._buffer.dispose();
                this._buffer = null;
            }
        }
    }

    public purge(): void {
    }

    public render(param1: IWindow, param2: Point, param3: Rectangle, param4: Rectangle, param5: BitmapData): BitmapData {
        let _loc13_: boolean = false;
        let _loc6_: BitmapData = null;
        let _loc11_: string = null;
        let _loc15_: number = (param1.background ? 2 : 0) >>> 0;
        let _loc7_: ISkinRenderer = this._SafeStr_2935.getSkinRendererByTypeAndStyle(param1.type, param1.style);
        if (_loc7_ != null) {
            if (_loc7_.isStateDrawable(this._SafeStr_3637)) {
                _loc15_ = 1;
            }
        }
        let _loc12_: number = Math.max(param1.renderingWidth, 1) | 0;
        let _loc8_: number = Math.max(param1.renderingHeight, 1) | 0;
        let _loc9_: boolean = true;
        if (_loc15_ != 0) {
            if (!this._buffer || this._buffer.width != _loc12_ || this._buffer.height != _loc8_) {
                if (this._buffer) {
                    this._buffer.dispose();
                }
                this._buffer = new TrackedBitmapData(this, _loc12_, _loc8_, true, param1.color);
                this._refresh = true;
                _loc9_ = false;
            }
        }
        let _loc16_: IGraphicContext = castGuarded(param1, isIGraphicContextHost, "com.sulake.core.window.graphics.IGraphicContextHost").getGraphicContext(false);
        if (_loc16_) {
            if (!_loc16_.visible) {
                _loc16_.visible = true;
            }
            _loc13_ = param1.testParamFlag(1073741824);
            _loc6_ = _loc16_.setDrawRegion(param1.renderingRectangle, !param1.testParamFlag(16), _loc13_ ? param4 : null);
            if (_loc6_) {
                param5 = _loc6_;
                this._refresh = true;
            }
        }
        let _loc10_: boolean = !param1.testParamFlag(16);
        if (_loc15_ != 0) {
            if (param5 != null) {
                param5.lock();
                if (_loc15_ == 1) {
                    if (this._refresh) {
                        if (_loc10_) {
                            param5.fillRect(param3, 0);
                        }
                        this._refresh = false;
                        if (_loc9_) {
                            this._buffer.fillRect(this._buffer.rect, param1.color);
                        }
                        _loc7_.draw(param1, this._buffer, this._buffer.rect, this._SafeStr_3637, false);
                    }
                    _loc11_ = "normal";
                    if (param1.tags != null) {
                        for (const _loc14_ of param1.tags ?? []) {
                            if (_loc14_.indexOf("BLEND_") == 0) {
                                _loc11_ = stringOrNull(_loc14_.substring(6).toLowerCase());
                            }
                        }
                    }
                    if ((param1.blend < 1 || _loc11_ != "normal") && !_loc10_) {
                        WindowRendererItem.MATRIX.tx = param2.x - param3.x;
                        WindowRendererItem.MATRIX.ty = param2.y - param3.y;
                        WindowRendererItem.COLOR_TRANSFORM.alphaMultiplier = param1.blend;
                        param3.offset(WindowRendererItem.MATRIX.tx, WindowRendererItem.MATRIX.ty);
                        param5.draw(this._buffer, WindowRendererItem.MATRIX, WindowRendererItem.COLOR_TRANSFORM, _loc11_, param3, false);
                        param3.offset(-WindowRendererItem.MATRIX.tx, -WindowRendererItem.MATRIX.ty);
                    } else {
                        param5.copyPixels(this._buffer, param3, param2, null, null, true);
                    }
                } else if (_loc15_ == 2) {
                    if (!_loc10_) {
                        this._buffer.fillRect(this._buffer.rect, param1.color);
                        param5.copyPixels(this._buffer, param3, param2, null, null, true);
                    } else {
                        param5.fillRect(new Rectangle(param2.x, param2.y, param3.width, param3.height), param1.color);
                        _loc16_.blend = param1.blend;
                    }
                }
                param5.unlock();
            }
        } else {
            if (_loc10_ && param5 != null) {
                param5.fillRect(param3, 0);
            }
            this._refresh = false;
        }
        this._SafeStr_4710 = this._SafeStr_3637;
        return param5;
    }

    public testForStateChange(param1: IWindow): boolean {
        return this._SafeStr_2935.getTheActualState(param1.type, param1.style, param1.state) != this._SafeStr_4710;
    }

    public needsRedraw(param1: IWindow): boolean {
        return this._refresh || this.testForStateChange(param1);
    }

    public invalidate(param1: IWindow, param2: number): boolean {
        let _loc4_: IGraphicContext = null;
        let _loc3_: boolean = false;
        switch (param2) {
            case 1:
                this._refresh = true;
                _loc3_ = true;
                break;
            case 2:
                this._refresh = true;
                _loc3_ = true;
                break;
            case 4:
                if (param1.testParamFlag(16)) {
                    _loc3_ = true;
                } else {
                    _loc4_ = castGuarded(param1, isIGraphicContextHost, "com.sulake.core.window.graphics.IGraphicContextHost").getGraphicContext(true);
                    _loc4_.setDrawRegion(param1.renderingRectangle, false, null);
                    if (!_loc4_.visible) {
                        _loc3_ = true;
                    }
                }
                break;
            case 8:
                this._SafeStr_3637 = this._SafeStr_2935.getTheActualState(param1.type, param1.style, param1.state);
                if (this._SafeStr_3637 != this._SafeStr_4710) {
                    this._refresh = true;
                    _loc3_ = true;
                }
                break;
            case 16:
                if (param1.testParamFlag(16)) {
                    this._refresh = true;
                    _loc3_ = true;
                } else {
                    castGuarded(param1, isIGraphicContextHost, "com.sulake.core.window.graphics.IGraphicContextHost").getGraphicContext(true).blend = param1.blend;
                }
                break;
            case 32:
                _loc3_ = true;
        }
        return _loc3_;
    }

    private drawRect(param1: BitmapData, param2: Rectangle, param3: number): void {
        let _loc4_: number = 0;
        _loc4_ = param2.left | 0;
        while (_loc4_ < param2.right) {
            param1.setPixel32(_loc4_, param2.top | 0, param3);
            param1.setPixel32(_loc4_, param2.bottom - 1 | 0, param3);
            _loc4_++;
        }
        _loc4_ = param2.top | 0;
        while (_loc4_ < param2.bottom) {
            param1.setPixel32(param2.left | 0, _loc4_, param3);
            param1.setPixel32(param2.right - 1 | 0, _loc4_, param3);
            _loc4_++;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
