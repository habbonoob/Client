import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarDataContainer } from '@/com/sulake/habbo/avatar/animation/IAvatarDataContainer';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class AvatarDataContainer implements IAvatarDataContainer {
    static { registerClassName(this, 'com.sulake.habbo.avatar.animation::AvatarDataContainer'); }

    declare private _ink: number;
    static { (this.prototype as any)._ink = 0; }

    declare private _SafeStr_6917: number;
    static { (this.prototype as any)._SafeStr_6917 = 0; }

    declare private _SafeStr_5987: number;
    static { (this.prototype as any)._SafeStr_5987 = 0; }

    declare private _colorTransform: ColorTransform;

    declare private _rgb: number;
    static { (this.prototype as any)._rgb = 0; }

    declare private _r: number;
    static { (this.prototype as any)._r = 0; }

    declare private _g: number;
    static { (this.prototype as any)._g = 0; }

    declare private _b: number;
    static { (this.prototype as any)._b = 0; }

    private _redMultiplier: number = 1;
    private _greenMultiplier: number = 1;
    private _blueMultiplier: number = 1;
    private _alphaMultiplier: number = 1;

    declare private _SafeStr_4704: UtilsMap;

    private _paletteIsGrayscale: boolean = true;

    constructor(param1: XML) {
        this._ink = parseInt(param1.attribute("ink").toString()) | 0;
        let _loc2_: string = String(param1.attribute("foreground"));
        _loc2_ = _loc2_.replace("#", "");
        let _loc3_: string = String(param1.attribute("background"));
        _loc3_ = _loc3_.replace("#", "");
        this._SafeStr_6917 = parseInt(_loc2_, 16) >>> 0;
        this._SafeStr_5987 = parseInt(_loc3_, 16) >>> 0;
        this._rgb = parseInt(_loc2_, 16) >>> 0;
        this._r = (this._rgb >> 16 & 0xFF) >>> 0;
        this._g = (this._rgb >> 8 & 0xFF) >>> 0;
        this._b = (this._rgb >> 0 & 0xFF) >>> 0;
        this._redMultiplier = this._r / 255 * 1;
        this._greenMultiplier = this._g / 255 * 1;
        this._blueMultiplier = this._b / 255 * 1;
        if (this._ink == 37) {
            this._alphaMultiplier = 0.5;
            this._paletteIsGrayscale = false;
        }
        this._colorTransform = new ColorTransform(this._redMultiplier, this._greenMultiplier, this._blueMultiplier, this._alphaMultiplier);
        this._SafeStr_4704 = this.generatePaletteMapForGrayscale(this._SafeStr_5987, this._SafeStr_6917);
    }

    public get ink(): number {
        return this._ink;
    }

    public get colorTransform(): ColorTransform {
        return this._colorTransform;
    }

    public get reds(): any[] {
        return asGuarded(this._SafeStr_4704.getValue("reds"), Array.isArray);
    }

    public get greens(): any[] {
        return asGuarded(this._SafeStr_4704.getValue("greens"), Array.isArray);
    }

    public get blues(): any[] {
        return asGuarded(this._SafeStr_4704.getValue("blues"), Array.isArray);
    }

    public get alphas(): any[] {
        return asGuarded(this._SafeStr_4704.getValue("alphas"), Array.isArray);
    }

    public get paletteIsGrayscale(): boolean {
        return this._paletteIsGrayscale;
    }

    private generatePaletteMapForGrayscale(param1: number, param2: number): UtilsMap {
        let _loc9_: number = 0;
        let _loc15_: number = param1 >> 24 & 0xFF;
        let _loc24_: number = param1 >> 16 & 0xFF;
        let _loc10_: number = param1 >> 8 & 0xFF;
        let _loc14_: number = param1 >> 0 & 0xFF;
        let _loc17_: number = param2 >> 24 & 0xFF;
        let _loc3_: number = param2 >> 16 & 0xFF;
        let _loc11_: number = param2 >> 8 & 0xFF;
        let _loc16_: number = param2 >> 0 & 0xFF;
        let _loc21_: number = (_loc17_ - _loc15_) / 255;
        let _loc12_: number = (_loc3_ - _loc24_) / 255;
        let _loc6_: number = (_loc11_ - _loc10_) / 255;
        let _loc23_: number = (_loc16_ - _loc14_) / 255;
        let _loc22_: UtilsMap = new UtilsMap();
        let _loc19_: any[] = [];
        let _loc8_: any[] = [];
        let _loc13_: any[] = [];
        let _loc20_: any[] = [];
        let _loc4_: number = _loc15_;
        let _loc18_: number = _loc24_;
        let _loc7_: number = _loc10_;
        let _loc5_: number = _loc14_;
        _loc9_ = 0;
        while (_loc9_ < 256) {
            if (_loc18_ == _loc24_ && _loc7_ == _loc10_ && _loc5_ == _loc14_) {
                _loc4_ = 0;
            }
            _loc4_ += _loc21_;
            _loc18_ += _loc12_;
            _loc7_ += _loc6_;
            _loc5_ += _loc23_;
            _loc20_.push(_loc4_ << 24);
            _loc19_.push(_loc4_ << 24 | _loc18_ << 16 | _loc7_ << 8 | _loc5_);
            _loc8_.push(_loc4_ << 24 | _loc18_ << 16 | _loc7_ << 8 | _loc5_);
            _loc13_.push(_loc4_ << 24 | _loc18_ << 16 | _loc7_ << 8 | _loc5_);
            _loc9_++;
        }
        _loc22_.add("alphas", _loc19_);
        _loc22_.add("reds", _loc19_);
        _loc22_.add("greens", _loc8_);
        _loc22_.add("blues", _loc13_);
        return _loc22_;
    }
}
