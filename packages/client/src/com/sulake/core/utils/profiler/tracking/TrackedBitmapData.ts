import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';

export class TrackedBitmapData extends BitmapData {
    static { registerClassName(this, 'com.sulake.core.utils.profiler.tracking::TrackedBitmapData'); }

    private static readonly MAX_PIXELS: number = 16777215;
    private static readonly MAX_WIDTH: number = 8191;
    private static readonly MAX_HEIGHT: number = 8191;
    private static readonly MIN_WIDTH: number = 1;
    private static readonly MIN_HEIGHT: number = 1;
    public static readonly DEFAULT_SIZE: number = 4095;
    private static readonly ZERO_POINT: Point = new Point();
    private static _SafeStr_3912: number = 0;
    private static _numInstances: number = 0;

    public static get numInstances(): number {
        return TrackedBitmapData._numInstances;
    }

    public static get allocatedByteCount(): number {
        return TrackedBitmapData._SafeStr_3912;
    }

    constructor(param1: any, param2: number, param3: number, param4: boolean = true, param5: number = 4294967295) {
        if (param2 * param3 > 16777215) {
            param2 = 4095;
            param3 = 4095;
        } else {
            if (param2 > 8191) {
                param2 = 8191;
            } else if (param2 < 1) {
                param2 = 1;
            }
            if (param3 > 8191) {
                param3 = 8191;
            } else if (param3 < 1) {
                param3 = 1;
            }
        }
        super(param2, param3, param4, param5);
        TrackedBitmapData._numInstances = TrackedBitmapData._numInstances + 1 >>> 0;
        TrackedBitmapData._SafeStr_3912 += param2 * param3 * 4;
        this._owner = param1;
    }

    declare private _owner: any;

    private _disposed: boolean = false;

    public override dispose(): void {
        if (!this._disposed) {
            TrackedBitmapData._SafeStr_3912 -= this.width * this.height * 4;
            TrackedBitmapData._numInstances = TrackedBitmapData._numInstances - 1 >>> 0;
            this._disposed = true;
            this._owner = null;
            super.dispose();
        }
    }

    public override clone(): BitmapData {
        if (this._disposed) {
            return null;
        }
        let _loc1_: TrackedBitmapData = new TrackedBitmapData(this._owner, this.width, this.height, this.transparent);
        _loc1_.copyPixels(this, this.rect, TrackedBitmapData.ZERO_POINT);
        return _loc1_;
    }
}
