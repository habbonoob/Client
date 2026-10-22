import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { ExtendedBitmapData } from '@/com/sulake/room/renderer/utils/ExtendedBitmapData';

export class ExtendedSprite extends Bitmap {
    static { registerClassName(this, 'com.sulake.room.renderer.utils::ExtendedSprite'); }

    private _SafeStr_5233: number = 128;

    declare private _basePoint: Point;

    private _tag: string = "";
    private _identifier: string = "";
    private _clickHandling: boolean = false;
    private _skipMouseHandling: boolean = false;
    private _varyingDepth: boolean = false;
    private _bitmapData: ExtendedBitmapData = null;
    private _width: number = 0;
    private _height: number = 0;
    private _updateID1: number = -1;
    private _updateID2: number = -1;
    private _offsetRefX: number = 0;
    private _offsetRefY: number = 0;

    constructor() {
        super();
        this._basePoint = new Point();
        this.cacheAsBitmap = false;
    }

    public get alphaTolerance(): number {
        return this._SafeStr_5233;
    }

    public set alphaTolerance(param1: number) {
        this._SafeStr_5233 = param1;
    }

    public get tag(): string {
        return this._tag;
    }

    public set tag(param1: string) {
        this._tag = param1;
    }

    public get identifier(): string {
        return this._identifier;
    }

    public set identifier(param1: string) {
        this._identifier = param1;
    }

    public get varyingDepth(): boolean {
        return this._varyingDepth;
    }

    public set varyingDepth(param1: boolean) {
        this._varyingDepth = param1;
    }

    public get clickHandling(): boolean {
        return this._clickHandling;
    }

    public set clickHandling(param1: boolean) {
        this._clickHandling = param1;
    }

    public get skipMouseHandling(): boolean {
        return this._skipMouseHandling;
    }

    public set skipMouseHandling(param1: boolean) {
        this._skipMouseHandling = param1;
    }

    public get offsetRefX(): number {
        return this._offsetRefX;
    }

    public set offsetRefX(param1: number) {
        this._offsetRefX = param1;
    }

    public get offsetRefY(): number {
        return this._offsetRefY;
    }

    public set offsetRefY(param1: number) {
        this._offsetRefY = param1;
    }

    public dispose(): void {
        if (this._bitmapData != null) {
            this._bitmapData.dispose();
            this._bitmapData = null;
        }
    }

    public override set bitmapData(param1: BitmapData) {
        let _loc2_: ExtendedBitmapData = null;
        if (param1 == this.bitmapData) {
            return;
        }
        if (this._bitmapData != null) {
            this._bitmapData.dispose();
            this._bitmapData = null;
        }
        if (param1 != null) {
            this._width = param1.width;
            this._height = param1.height;
            _loc2_ = param1 instanceof ExtendedBitmapData ? param1 : null;
            if (_loc2_ != null) {
                _loc2_.addReference();
                this._bitmapData = _loc2_;
            }
        } else {
            this._width = 0;
            this._height = 0;
            this._updateID1 = -1;
            this._updateID2 = -1;
        }
        super.bitmapData = param1;
    }

    public needsUpdate(param1: number, param2: number): boolean {
        if (param1 != this._updateID1 || param2 != this._updateID2) {
            this._updateID1 = param1;
            this._updateID2 = param2;
            return true;
        }
        if (this._bitmapData != null && this._bitmapData.disposed) {
            return true;
        }
        return false;
    }

    public override hitTestPoint(param1: number, param2: number, param3: boolean = false): boolean {
        return this.hitTest(param1, param2);
    }

    public hitTest(param1: number, param2: number): boolean {
        if (this._SafeStr_5233 > 255 || this.bitmapData == null) {
            return false;
        }
        if (param1 < 0 || param2 < 0 || param1 >= this._width || param2 >= this._height) {
            return false;
        }
        return this.hitTestBitmapData(param1 | 0, param2 | 0);
    }

    private hitTestBitmapData(param1: number, param2: number): boolean {
        let _loc4_: any = 0;
        let _loc3_: boolean = false;
        try {
            _loc4_ = this.bitmapData.getPixel32(param1, param2);
            _loc4_ = (_loc4_ >> 24) >>> 0;
            _loc3_ = _loc4_ > this._SafeStr_5233;
        } catch (e) {
        }
        return _loc3_;
    }

    public override get bitmapData(): BitmapData {
        return super.bitmapData;
    }
}
