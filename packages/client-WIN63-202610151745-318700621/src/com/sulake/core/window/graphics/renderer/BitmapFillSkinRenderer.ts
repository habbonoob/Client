import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Graphics } from '@habbo-pixi/runtime/display/Graphics';
import { Shape } from '@habbo-pixi/runtime/display/Shape';
import { ColorMatrixFilter } from '@habbo-pixi/runtime/filters/ColorMatrixFilter';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { BitmapFillController } from '@/com/sulake/core/window/Classes.group';
import { SkinRenderer } from '@/com/sulake/core/window/graphics/renderer/SkinRenderer';

export class BitmapFillSkinRenderer extends SkinRenderer {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::BitmapFillSkinRenderer'); }

    private static readonly _SafeStr_8425: number = 0.212671;
    private static readonly _SafeStr_8153: number = 0.71516;
    private static readonly B: number = 0.072169;
    private static readonly SHAPE: Shape = new Shape();
    private static readonly MATRIX: Matrix = new Matrix();
    private static readonly COLOR_TRANSFORM: ColorTransform = new ColorTransform();
    private static readonly GREYSCALE_FILTER: ColorMatrixFilter = new ColorMatrixFilter();
    private static readonly ZERO_POINT: Point = new Point();

    declare private _SafeStr_15106: BitmapData;

    declare private _SafeStr_15107: BitmapData;

    declare private _SafeStr_15108: boolean;
    static { (this.prototype as any)._SafeStr_15108 = false; }

    declare private _preparedTint: boolean;
    static { (this.prototype as any)._preparedTint = false; }

    declare private _preparedColor: number;
    static { (this.prototype as any)._preparedColor = 0; }

    declare private _SafeStr_15109: BitmapData;

    declare private _SafeStr_15110: BitmapData;

    declare private _SafeStr_15111: number;
    static { (this.prototype as any)._SafeStr_15111 = NaN; }

    declare private _SafeStr_15112: number;
    static { (this.prototype as any)._SafeStr_15112 = NaN; }

    declare private _SafeStr_15113: number;
    static { (this.prototype as any)._SafeStr_15113 = NaN; }

    constructor(param1: string) {
        super(param1);
    }

    public static scaleForMode(param1: string, param2: number, param3: number, param4: number, param5: number): number {
        if (param2 <= 0 || param3 <= 0 || param4 <= 0 || param5 <= 0) {
            return 1;
        }
        let _loc6_: number = param4 / param2;
        let _loc7_: number = param5 / param3;
        if (BitmapFillController.normalizeFillMode(param1) == "contain") {
            return Math.min(_loc6_, _loc7_);
        }
        return Math.max(_loc6_, _loc7_);
    }

    public static tileStep(param1: number, param2: number, param3: number): number {
        if (isNaN(param1) || param1 <= 0) {
            param1 = 1;
        }
        if (isNaN(param2) || param2 == 0) {
            param2 = 1;
        }
        return Math.max(1, param1 * Math.abs(param2) + BitmapFillController.normalizeSpacing(param3));
    }

    private static drawStretch(param1: BitmapFillController, param2: BitmapData, param3: Rectangle, param4: BitmapData): void {
        let _loc5_: boolean = BitmapFillSkinRenderer.isFlippedX(param1);
        let _loc6_: boolean = BitmapFillSkinRenderer.isFlippedY(param1);
        BitmapFillSkinRenderer.MATRIX.identity();
        BitmapFillSkinRenderer.MATRIX.a = param3.width / param4.width * (_loc5_ ? -1 : 1);
        BitmapFillSkinRenderer.MATRIX.d = param3.height / param4.height * (_loc6_ ? -1 : 1);
        BitmapFillSkinRenderer.MATRIX.tx = _loc5_ ? param3.right : Number(param3.x);
        BitmapFillSkinRenderer.MATRIX.ty = _loc6_ ? param3.bottom : Number(param3.y);
        param2.draw(param4, BitmapFillSkinRenderer.MATRIX, null, null, param3, false);
    }

    private static drawFitted(param1: BitmapFillController, param2: BitmapData, param3: Rectangle, param4: BitmapData, param5: string): void {
        let _loc8_: number = BitmapFillSkinRenderer.normalizedZoom(param1.zoomX);
        let _loc7_: number = BitmapFillSkinRenderer.normalizedZoom(param1.zoomY);
        let _loc6_: number = BitmapFillSkinRenderer.scaleForMode(param5, param4.width * _loc8_, param4.height * _loc7_, param3.width, param3.height);
        BitmapFillSkinRenderer.drawScaled(param1, param2, param3, param4, BitmapFillSkinRenderer.scaleXForController(param1) * _loc6_, BitmapFillSkinRenderer.scaleYForController(param1) * _loc6_);
    }

    private static drawScaled(param1: BitmapFillController, param2: BitmapData, param3: Rectangle, param4: BitmapData, param5: number, param6: number): void {
        let _loc10_: number = param4.width * Math.abs(param5);
        let _loc9_: number = param4.height * Math.abs(param6);
        let _loc7_: number = BitmapFillSkinRenderer.xForPivot(param3, _loc10_, param1.pivotPoint);
        let _loc8_: number = BitmapFillSkinRenderer.yForPivot(param3, _loc9_, param1.pivotPoint);
        BitmapFillSkinRenderer.MATRIX.identity();
        BitmapFillSkinRenderer.MATRIX.a = param5;
        BitmapFillSkinRenderer.MATRIX.d = param6;
        BitmapFillSkinRenderer.MATRIX.tx = param5 < 0 ? _loc7_ + _loc10_ : _loc7_;
        BitmapFillSkinRenderer.MATRIX.ty = param6 < 0 ? _loc8_ + _loc9_ : _loc8_;
        param2.draw(param4, BitmapFillSkinRenderer.MATRIX, null, null, param3, false);
    }

    private static scaleXForController(param1: BitmapFillController): number {
        return BitmapFillSkinRenderer.normalizedZoom(param1.zoomX) * (BitmapFillSkinRenderer.isFlippedX(param1) ? -1 : 1);
    }

    private static scaleYForController(param1: BitmapFillController): number {
        return BitmapFillSkinRenderer.normalizedZoom(param1.zoomY) * (BitmapFillSkinRenderer.isFlippedY(param1) ? -1 : 1);
    }

    private static normalizedZoom(param1: number): number {
        return isNaN(param1) || param1 == 0 ? 1 : Number(Math.abs(param1));
    }

    private static isFlippedX(param1: BitmapFillController): boolean {
        return param1.zoomX < 0 != param1.flipX;
    }

    private static isFlippedY(param1: BitmapFillController): boolean {
        return param1.zoomY < 0 != param1.flipY;
    }

    private static xForPivot(param1: Rectangle, param2: number, param3: number): number {
        switch ((param3 | 0) - 1) {
            case 0:
            case 3:
            case 6:
                return param1.x + (param1.width - param2) / 2;
            case 1:
            case 4:
            case 7:
                return param1.right - param2;
            default:
                return param1.x;
        }
    }

    private static yForPivot(param1: Rectangle, param2: number, param3: number): number {
        switch ((param3 | 0) - 3) {
            case 0:
            case 1:
            case 2:
                return param1.y + (param1.height - param2) / 2;
            case 3:
            case 4:
            case 5:
                return param1.bottom - param2;
            default:
                return param1.y;
        }
    }

    private static colorTransformFor(param1: BitmapFillController): ColorTransform {
        if (param1.tint) {
            BitmapFillSkinRenderer.COLOR_TRANSFORM.redMultiplier = ((param1.color & 0xFF0000) >> 16) / 255;
            BitmapFillSkinRenderer.COLOR_TRANSFORM.greenMultiplier = ((param1.color & 0xFF00) >> 8) / 255;
            BitmapFillSkinRenderer.COLOR_TRANSFORM.blueMultiplier = (param1.color & 0xFF) / 255;
        } else {
            BitmapFillSkinRenderer.COLOR_TRANSFORM.redMultiplier = 1;
            BitmapFillSkinRenderer.COLOR_TRANSFORM.greenMultiplier = 1;
            BitmapFillSkinRenderer.COLOR_TRANSFORM.blueMultiplier = 1;
        }
        BitmapFillSkinRenderer.COLOR_TRANSFORM.alphaMultiplier = 1;
        BitmapFillSkinRenderer.COLOR_TRANSFORM.redOffset = 0;
        BitmapFillSkinRenderer.COLOR_TRANSFORM.greenOffset = 0;
        BitmapFillSkinRenderer.COLOR_TRANSFORM.blueOffset = 0;
        BitmapFillSkinRenderer.COLOR_TRANSFORM.alphaOffset = 0;
        return BitmapFillSkinRenderer.COLOR_TRANSFORM;
    }

    public override dispose(): void {
        if (this._SafeStr_15106 != null) {
            this._SafeStr_15106.dispose();
            this._SafeStr_15106 = null;
        }
        this.disposeTileBitmap();
        this._SafeStr_15107 = null;
        this._SafeStr_15110 = null;
        super.dispose();
    }

    public override draw(param1: IWindow, param2: BitmapData, param3: Rectangle, param4: number, param5: boolean): void {
        let _loc6_: BitmapFillController = param1 instanceof BitmapFillController ? param1 : null;
        if (_loc6_ == null || param2 == null || param3 == null || param3.width <= 0 || param3.height <= 0) {
            return;
        }
        param2.fillRect(param3, 0);
        let _loc7_: BitmapData = _loc6_.bitmapData;
        if (_loc7_ == null || _loc7_.width <= 0 || _loc7_.height <= 0) {
            return;
        }
        _loc7_ = this.prepareBitmapData(_loc7_, _loc6_);
        switch (_loc6_.fillMode) {
            case "tile":
                this.drawTile(_loc6_, param2, param3, _loc7_);
                break;
            case "center":
                BitmapFillSkinRenderer.drawScaled(_loc6_, param2, param3, _loc7_, BitmapFillSkinRenderer.scaleXForController(_loc6_), BitmapFillSkinRenderer.scaleYForController(_loc6_));
                break;
            case "cover":
                BitmapFillSkinRenderer.drawFitted(_loc6_, param2, param3, _loc7_, "cover");
                break;
            case "contain":
                BitmapFillSkinRenderer.drawFitted(_loc6_, param2, param3, _loc7_, "contain");
                break;
            default:
                BitmapFillSkinRenderer.drawStretch(_loc6_, param2, param3, _loc7_);
        }
    }

    private prepareBitmapData(param1: BitmapData, param2: BitmapFillController): BitmapData {
        if (!param2.greyscale && !param2.tint) {
            if (this._SafeStr_15106 != null) {
                this._SafeStr_15106.dispose();
                this._SafeStr_15106 = null;
            }
            this._SafeStr_15107 = null;
            this.disposeTileBitmap();
            return param1;
        }
        let _loc3_: number = (param2.tint ? param2.color : 0) >>> 0;
        if (this._SafeStr_15106 != null && this._SafeStr_15107 == param1 && this._SafeStr_15108 == param2.greyscale && this._preparedTint == param2.tint && this._preparedColor == _loc3_) {
            return this._SafeStr_15106;
        }
        if (this._SafeStr_15106 == null || this._SafeStr_15106.width != param1.width || this._SafeStr_15106.height != param1.height) {
            if (this._SafeStr_15106 != null) {
                this._SafeStr_15106.dispose();
            }
            this._SafeStr_15106 = new BitmapData(param1.width, param1.height, true, 0);
        } else {
            this._SafeStr_15106.fillRect(this._SafeStr_15106.rect, 0);
        }
        this._SafeStr_15106.copyPixels(param1, param1.rect, BitmapFillSkinRenderer.ZERO_POINT, null, null, true);
        if (param2.greyscale) {
            BitmapFillSkinRenderer.GREYSCALE_FILTER.matrix = [0.212671, 0.71516, 0.072169, 0, 0, 0.212671, 0.71516, 0.072169, 0, 0, 0.212671, 0.71516, 0.072169, 0, 0, 0, 0, 0, 1, 0];
            this._SafeStr_15106.applyFilter(this._SafeStr_15106, this._SafeStr_15106.rect, BitmapFillSkinRenderer.ZERO_POINT, BitmapFillSkinRenderer.GREYSCALE_FILTER);
        }
        if (param2.tint) {
            this._SafeStr_15106.colorTransform(this._SafeStr_15106.rect, BitmapFillSkinRenderer.colorTransformFor(param2));
        }
        this.disposeTileBitmap();
        this._SafeStr_15107 = param1;
        this._SafeStr_15108 = param2.greyscale;
        this._preparedTint = param2.tint;
        this._preparedColor = _loc3_;
        return this._SafeStr_15106;
    }

    private disposeTileBitmap(): void {
        if (this._SafeStr_15109 != null) {
            this._SafeStr_15109.dispose();
            this._SafeStr_15109 = null;
        }
        this._SafeStr_15110 = null;
    }

    private drawTile(param1: BitmapFillController, param2: BitmapData, param3: Rectangle, param4: BitmapData): void {
        let _loc10_: number = BitmapFillSkinRenderer.scaleXForController(param1);
        let _loc11_: number = BitmapFillSkinRenderer.scaleYForController(param1);
        let _loc12_: number = BitmapFillController.normalizeSpacing(param1.spacing);
        let _loc9_: BitmapData = param4;
        let _loc7_: number = BitmapFillSkinRenderer.tileStep(param4.width, _loc10_, _loc12_);
        let _loc13_: number = BitmapFillSkinRenderer.tileStep(param4.height, _loc11_, _loc12_);
        let _loc5_: number = BitmapFillSkinRenderer.xForPivot(param3, _loc7_, param1.pivotPoint);
        let _loc6_: number = BitmapFillSkinRenderer.yForPivot(param3, _loc13_, param1.pivotPoint);
        if (_loc12_ > 0) {
            _loc9_ = this.tileBitmapFor(param4, _loc10_, _loc11_, _loc12_);
            BitmapFillSkinRenderer.MATRIX.identity();
            BitmapFillSkinRenderer.MATRIX.tx = _loc5_;
            BitmapFillSkinRenderer.MATRIX.ty = _loc6_;
        } else {
            BitmapFillSkinRenderer.MATRIX.identity();
            BitmapFillSkinRenderer.MATRIX.a = _loc10_;
            BitmapFillSkinRenderer.MATRIX.d = _loc11_;
            BitmapFillSkinRenderer.MATRIX.tx = _loc10_ < 0 ? _loc5_ + _loc7_ : _loc5_;
            BitmapFillSkinRenderer.MATRIX.ty = _loc11_ < 0 ? _loc6_ + _loc13_ : _loc6_;
        }
        let _loc8_: Graphics = BitmapFillSkinRenderer.SHAPE.graphics;
        _loc8_.clear();
        _loc8_.beginBitmapFill(_loc9_, BitmapFillSkinRenderer.MATRIX, true, false);
        _loc8_.drawRect(param3.x, param3.y, param3.width, param3.height);
        _loc8_.endFill();
        param2.draw(BitmapFillSkinRenderer.SHAPE, null, null, null, param3, false);
        _loc8_.clear();
    }

    private tileBitmapFor(param1: BitmapData, param2: number, param3: number, param4: number): BitmapData {
        let _loc5_: number = Math.ceil(BitmapFillSkinRenderer.tileStep(param1.width, param2, param4)) | 0;
        let _loc6_: number = Math.ceil(BitmapFillSkinRenderer.tileStep(param1.height, param3, param4)) | 0;
        if (this._SafeStr_15109 != null && this._SafeStr_15110 == param1 && this._SafeStr_15111 == param2 && this._SafeStr_15112 == param3 && this._SafeStr_15113 == param4 && this._SafeStr_15109.width == _loc5_ && this._SafeStr_15109.height == _loc6_) {
            return this._SafeStr_15109;
        }
        if (this._SafeStr_15109 != null) {
            this._SafeStr_15109.dispose();
        }
        this._SafeStr_15109 = new BitmapData(_loc5_, _loc6_, true, 0);
        this._SafeStr_15110 = param1;
        this._SafeStr_15111 = param2;
        this._SafeStr_15112 = param3;
        this._SafeStr_15113 = param4;
        BitmapFillSkinRenderer.MATRIX.identity();
        BitmapFillSkinRenderer.MATRIX.a = param2;
        BitmapFillSkinRenderer.MATRIX.d = param3;
        BitmapFillSkinRenderer.MATRIX.tx = param2 < 0 ? param1.width * Math.abs(param2) : 0;
        BitmapFillSkinRenderer.MATRIX.ty = param3 < 0 ? param1.height * Math.abs(param3) : 0;
        this._SafeStr_15109.draw(param1, BitmapFillSkinRenderer.MATRIX, null, null, null, false);
        return this._SafeStr_15109;
    }

    public override isStateDrawable(param1: number): boolean {
        return true;
    }
}
