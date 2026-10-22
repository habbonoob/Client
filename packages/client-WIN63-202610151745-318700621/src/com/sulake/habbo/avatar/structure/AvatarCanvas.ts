import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class AvatarCanvas {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure::AvatarCanvas'); }

    declare private _id: string;

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    declare private _offset: Point;

    declare private _regPoint: Point;

    constructor(param1: XML, param2: string) {
        this._id = String(param1.attribute("id"));
        this._width = parseInt(param1.attribute("width").toString()) | 0;
        this._height = parseInt(param1.attribute("height").toString()) | 0;
        this._offset = new Point(parseInt(param1.attribute("dx").toString()), parseInt(param1.attribute("dy").toString()));
        if (param2 == "h") {
            this._regPoint = new Point((this._width - 64) / 2, 0);
        } else {
            this._regPoint = new Point((this._width - 32) / 2, 0);
        }
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get offset(): Point {
        return this._offset;
    }

    public get id(): string {
        return this._id;
    }

    public get regPoint(): Point {
        return this._regPoint;
    }
}
