import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';

export class ExtendedBitmapData extends BitmapData {
    static { registerClassName(this, 'com.sulake.room.renderer.utils::ExtendedBitmapData'); }

    private static readonly ZERO_POINT: Point = new Point(0, 0);

    constructor(param1: number, param2: number, param3: boolean = true, param4: number = 0) {
        super(param1, param2, param3, param4);
    }

    private _referenceCount: number = 0;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get referenceCount(): number {
        return this._referenceCount;
    }

    public override dispose(): void {
        if (this._disposed) {
            return;
        }
        if (--this._referenceCount <= 0) {
            super.dispose();
            this._disposed = true;
        }
    }

    public override clone(): BitmapData {
        let _loc1_: ExtendedBitmapData = null;
        try {
            _loc1_ = new ExtendedBitmapData(this.width, this.height, true, 16777215);
            _loc1_.copyPixels(this, this.rect, ExtendedBitmapData.ZERO_POINT, null, null, true);
        } catch (e) {
            _loc1_ = new ExtendedBitmapData(1, 1, true, 16777215);
        }
        return _loc1_;
    }

    public addReference(): void {
        this._referenceCount = this._referenceCount + 1;
    }
}
