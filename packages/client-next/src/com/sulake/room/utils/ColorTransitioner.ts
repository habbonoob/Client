import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ColorConverter } from '@/com/sulake/room/utils/ColorConverter';

export class ColorTransitioner {
    static { registerClassName(this, 'com.sulake.room.utils::ColorTransitioner'); }

    private _color: number = 16777215;
    private _light: number = 255;
    private _originalColor: number = 16777215;
    private _SafeStr_4634: number = 255;
    private _targetColor: number = 16777215;
    private _SafeStr_4621: number = 255;
    private _colorChangedTime: number = 0;
    private _colorTransitionLength: number = 0;

    constructor(param1: number = 16777215, param2: number = 255) {
        this._color = param1;
        this._light = param2;
        this._originalColor = param1;
        this._SafeStr_4634 = param2;
        this._targetColor = param1;
        this._SafeStr_4621 = param2;
    }

    public startTransition(param1: number, param2: number, param3: number, param4: number = 1500): void {
        this._originalColor = this._color;
        this._SafeStr_4634 = this._light;
        this._targetColor = param1 >>> 0;
        this._SafeStr_4621 = param2;
        this._colorChangedTime = param3;
        this._colorTransitionLength = param4;
    }

    public updateColor(param1: number): boolean {
        let _loc6_: number = 0;
        let _loc8_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc7_: number = 0;
        let _loc4_: number = 0;
        let _loc10_: number = 0;
        let _loc5_: number = 0;
        let _loc11_: number = NaN;
        if (!this._colorChangedTime) {
            return false;
        }
        let _loc9_: number = param1;
        if (_loc9_ - this._colorChangedTime >= this._colorTransitionLength) {
            this._color = this._targetColor;
            this._light = this._SafeStr_4621;
            this._colorChangedTime = 0;
        } else {
            _loc2_ = this._originalColor >> 16 & 0xFF;
            _loc3_ = this._originalColor >> 8 & 0xFF;
            _loc7_ = this._originalColor & 0xFF;
            _loc4_ = this._targetColor >> 16 & 0xFF;
            _loc10_ = this._targetColor >> 8 & 0xFF;
            _loc5_ = this._targetColor & 0xFF;
            _loc11_ = (_loc9_ - this._colorChangedTime) / this._colorTransitionLength;
            _loc2_ = _loc2_ + (_loc4_ - _loc2_) * _loc11_ | 0;
            _loc3_ = _loc3_ + (_loc10_ - _loc3_) * _loc11_ | 0;
            _loc7_ = _loc7_ + (_loc5_ - _loc7_) * _loc11_ | 0;
            _loc6_ = (_loc2_ << 16) + (_loc3_ << 8) + _loc7_;
            _loc8_ = this._SafeStr_4634 + (this._SafeStr_4621 - this._SafeStr_4634) * _loc11_ | 0;
            this._color = _loc6_ >>> 0;
            this._light = _loc8_;
        }
        return true;
    }

    public get color(): number {
        let _loc1_: number = ColorConverter.rgbToHSL(this._color) | 0;
        _loc1_ = (_loc1_ & 0xFFFF00) + this._light;
        return ColorConverter.hslToRGB(_loc1_ >>> 0) | 0;
    }
}
