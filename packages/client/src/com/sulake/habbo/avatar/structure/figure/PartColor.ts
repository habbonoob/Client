import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class PartColor implements IPartColor {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure.figure::PartColor'); }

    constructor(param1: XML) {
        this._id = parseInt(param1.attribute("id").toString()) | 0;
        this._index = parseInt(param1.attribute("index").toString()) | 0;
        this._clubLevel = parseInt(param1.attribute("club").toString()) | 0;
        this._isSelectable = Boolean(parseInt(param1.attribute("selectable").toString()));
        let _loc2_: string = param1.text().toString();
        this._rgb = parseInt(_loc2_, 16) >>> 0;
        this._r = (this._rgb >> 16 & 0xFF) >>> 0;
        this._g = (this._rgb >> 8 & 0xFF) >>> 0;
        this._b = (this._rgb >> 0 & 0xFF) >>> 0;
        this._redMultiplier = this._r / 255 * 1;
        this._greenMultiplier = this._g / 255 * 1;
        this._blueMultiplier = this._b / 255 * 1;
        this._colorTransform = new ColorTransform(this._redMultiplier, this._greenMultiplier, this._blueMultiplier);
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _clubLevel: number;
    static { (this.prototype as any)._clubLevel = 0; }

    private _isSelectable: boolean = false;

    declare private _rgb: number;
    static { (this.prototype as any)._rgb = 0; }

    declare private _redMultiplier: number;
    static { (this.prototype as any)._redMultiplier = NaN; }

    declare private _greenMultiplier: number;
    static { (this.prototype as any)._greenMultiplier = NaN; }

    declare private _blueMultiplier: number;
    static { (this.prototype as any)._blueMultiplier = NaN; }

    declare private _colorTransform: ColorTransform;

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    public get index(): number {
        return this._index;
    }

    declare private _r: number;
    static { (this.prototype as any)._r = 0; }

    public get r(): number {
        return this._r;
    }

    declare private _g: number;
    static { (this.prototype as any)._g = 0; }

    public get g(): number {
        return this._g;
    }

    declare private _b: number;
    static { (this.prototype as any)._b = 0; }

    public get b(): number {
        return this._b;
    }

    public get colorTransform(): ColorTransform {
        return this._colorTransform;
    }

    public get redMultiplier(): number {
        return this._redMultiplier;
    }

    public get greenMultiplier(): number {
        return this._greenMultiplier;
    }

    public get blueMultiplier(): number {
        return this._blueMultiplier;
    }

    public get rgb(): number {
        return this._rgb;
    }

    public get id(): number {
        return this._id;
    }

    public get clubLevel(): number {
        return this._clubLevel;
    }

    public get isSelectable(): boolean {
        return this._isSelectable;
    }
}
