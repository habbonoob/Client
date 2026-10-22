import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AnimatedColor {
    static { registerClassName(this, 'com.sulake.habbo.window.utils::AnimatedColor'); }

    declare private _durationMs: number;
    static { (this.prototype as any)._durationMs = NaN; }

    declare private _SafeStr_6282: number;
    static { (this.prototype as any)._SafeStr_6282 = 0; }

    private _SafeStr_6328: number = 0;

    declare private _target: number;
    static { (this.prototype as any)._target = 0; }

    declare private _value: number;
    static { (this.prototype as any)._value = 0; }

    constructor(param1: number) {
        this._durationMs = Math.max(0, param1);
    }

    public get value(): number {
        return this._value;
    }

    public snapTo(param1: number, param2: number): void {
        let _loc3_: number = this.normalizeColor(param1);
        this._SafeStr_6282 = _loc3_;
        this._SafeStr_6328 = param2;
        this._target = _loc3_;
        this._value = _loc3_;
    }

    public setTarget(param1: number, param2: number): void {
        let _loc3_: number = this.normalizeColor(param1);
        if (_loc3_ == this._target) {
            return;
        }
        this.update(param2);
        this._SafeStr_6282 = this._value;
        this._SafeStr_6328 = param2;
        this._target = _loc3_;
    }

    public needsUpdate(param1: number): boolean {
        return this._value != this._target;
    }

    public update(param1: number): boolean {
        let _loc3_: number = this._value;
        if (this._durationMs == 0 || param1 >= this._SafeStr_6328 + this._durationMs) {
            this._value = this._target;
            return _loc3_ != this._value;
        }
        let _loc2_: number = Number(Math.max(0, (param1 - this._SafeStr_6328) / this._durationMs));
        this._value = this.fromRgb(this.interpolateChannel((this._SafeStr_6282 >> 16 & 0xFF) >>> 0, (this._target >> 16 & 0xFF) >>> 0, _loc2_), this.interpolateChannel((this._SafeStr_6282 >> 8 & 0xFF) >>> 0, (this._target >> 8 & 0xFF) >>> 0, _loc2_), this.interpolateChannel((this._SafeStr_6282 & 0xFF) >>> 0, (this._target & 0xFF) >>> 0, _loc2_));
        return _loc3_ != this._value;
    }

    private fromRgb(param1: number, param2: number, param3: number): number {
        return (param1 << 16 | param2 << 8 | param3) >>> 0;
    }

    private interpolateChannel(param1: number, param2: number, param3: number): number {
        return Math.round(param1 + (param2 - param1) * param3) >>> 0;
    }

    private normalizeColor(param1: number): number {
        return (param1 & 0xFFFFFF) >>> 0;
    }
}
