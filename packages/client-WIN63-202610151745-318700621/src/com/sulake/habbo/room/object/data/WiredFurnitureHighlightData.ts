import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class WiredFurnitureHighlightData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::WiredFurnitureHighlightData'); }

    declare private _highlightType: number;
    static { (this.prototype as any)._highlightType = 0; }

    declare private _strength: number;
    static { (this.prototype as any)._strength = 0; }

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    declare private _animationMode: number;
    static { (this.prototype as any)._animationMode = 0; }

    declare private _easingMode: number;
    static { (this.prototype as any)._easingMode = 0; }

    constructor(param1: number, param2: number, param3: number, param4: number, param5: number) {
        this._highlightType = param1;
        this._strength = param2;
        this._color = param3;
        this._animationMode = param4;
        this._easingMode = param5;
    }

    public get highlightType(): number {
        return this._highlightType;
    }

    public get strength(): number {
        return this._strength;
    }

    public get color(): number {
        return this._color;
    }

    public get animationMode(): number {
        return this._animationMode;
    }

    public get easingMode(): number {
        return this._easingMode;
    }
}
