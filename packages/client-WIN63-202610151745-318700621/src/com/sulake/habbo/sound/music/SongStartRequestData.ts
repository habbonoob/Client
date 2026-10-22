import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';

export class SongStartRequestData {
    static { registerClassName(this, 'com.sulake.habbo.sound.music::SongStartRequestData'); }

    declare private _SafeStr_4873: number;
    static { (this.prototype as any)._SafeStr_4873 = 0; }

    declare private _SafeStr_5901: number;
    static { (this.prototype as any)._SafeStr_5901 = NaN; }

    declare private _playLength: number;
    static { (this.prototype as any)._playLength = NaN; }

    declare private _playRequestTime: number;
    static { (this.prototype as any)._playRequestTime = 0; }

    declare private _fadeInSeconds: number;
    static { (this.prototype as any)._fadeInSeconds = NaN; }

    declare private _fadeOutSeconds: number;
    static { (this.prototype as any)._fadeOutSeconds = NaN; }

    constructor(param1: number, param2: number, param3: number, param4: number = 2, param5: number = 1) {
        this._SafeStr_4873 = param1;
        this._SafeStr_5901 = param2;
        this._playLength = param3;
        this._fadeInSeconds = param4;
        this._fadeOutSeconds = param5;
        this._playRequestTime = getTimer();
    }

    public get songId(): number {
        return this._SafeStr_4873;
    }

    public get startPos(): number {
        if (this._SafeStr_5901 < 0) {
            return 0;
        }
        return this._SafeStr_5901 + (getTimer() - this._playRequestTime) / 1000;
    }

    public get playLength(): number {
        return this._playLength;
    }

    public get fadeInSeconds(): number {
        return this._fadeInSeconds;
    }

    public get fadeOutSeconds(): number {
        return this._fadeOutSeconds;
    }
}
