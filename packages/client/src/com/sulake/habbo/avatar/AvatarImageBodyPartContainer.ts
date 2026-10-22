import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';

export class AvatarImageBodyPartContainer {
    static { registerClassName(this, 'com.sulake.habbo.avatar::AvatarImageBodyPartContainer'); }

    constructor(param1: BitmapData, param2: Point, param3: boolean, param4: Point = null) {
        this._image = param1;
        this._regPoint = param2;
        this._isCacheable = param3;
        this._faceOffset = param4;
        this.cleanPoints();
    }

    declare private _image: BitmapData;

    declare private _isCacheable: boolean;
    static { (this.prototype as any)._isCacheable = false; }

    declare private _regPoint: Point;

    public get regPoint(): Point {
        return this._regPoint.add(this._offset);
    }

    private _offset: Point = new Point(0, 0);

    public set offset(param1: Point) {
        this._offset = param1;
        this.cleanPoints();
    }

    declare private _faceOffset: Point;

    public get faceOffset(): Point {
        return this._faceOffset;
    }

    public get isCacheable(): boolean {
        return this._isCacheable;
    }

    public get image(): BitmapData {
        return this._image;
    }

    public dispose(): void {
        if (this._image) {
            this._image.dispose();
        }
        this._image = null;
        this._regPoint = null;
        this._offset = null;
    }

    private cleanPoints(): void {
        this._regPoint.x = this._regPoint.x | 0;
        this._regPoint.y = this._regPoint.y | 0;
        this._offset.x = this._offset.x | 0;
        this._offset.y = this._offset.y | 0;
    }
}
