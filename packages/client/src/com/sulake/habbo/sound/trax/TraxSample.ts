import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class TraxSample implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.sound.trax::TraxSample'); }

    public static readonly SAMPLE_FREQUENCY_44KHZ: string = "sample_44khz";
    public static readonly SAMPLE_FREQUENCY_22KHZ: string = "sample_22khz";
    public static readonly SAMPLE_FREQUENCY_11KHZ: string = "sample_11khz";
    public static readonly SAMPLE_SCALE_16BIT: string = "sample_16bit";
    public static readonly SAMPLE_SCALE_8BIT: string = "sample_8bit";
    public static readonly SAMPLE_VALUE_MULTIPLIER: number = 0.000030517578125;
    private static readonly FADEOUT_LENGTH: number = 32;
    private static readonly MASK_8BIT: number = 255;
    private static readonly MASK_16BIT: number = 65535;
    private static readonly OFFSET_8BIT: number = 127;
    private static readonly OFFSET_16BIT: number = 32767;

    constructor(param1: ByteArray, param2: number, param3: string = "sample_44khz", param4: string = "sample_16bit") {
        let _loc8_: number = 0;
        let _loc16_: number = NaN;
        let _loc10_: number = 0;
        let _loc6_: number = NaN;
        let _loc5_: number = NaN;
        let _loc11_: number = 0;
        this._SafeStr_3198 = [];
        this._id = param2;
        let _loc12_: number = 65536;
        switch (param3) {
            case "sample_22khz":
                this._SafeStr_2243 = 2;
                break;
            case "sample_11khz":
                this._SafeStr_2243 = 4;
                break;
            default:
                this._SafeStr_2243 = 1;
        }
        let _loc17_: any = param4;
        if ("sample_8bit" !== _loc17_) {
            this._SafeStr_2399 = 2;
            _loc12_ = 65536;
        } else {
            this._SafeStr_2399 = 4;
            _loc12_ = 256;
        }
        let _loc15_: number = this._SafeStr_2399 * this._SafeStr_2243;
        let _loc14_: number = param1.length / 8 | 0;
        _loc14_ = (_loc14_ / _loc15_ | 0) * _loc15_;
        this._sampleData = new Array<number>(_loc14_ / _loc15_ >>> 0).fill(0);
        let _loc13_: number = 1 / (_loc12_ / 2);
        param1.position = 0;
        let _loc9_: number = 0;
        let _loc7_: number = _loc14_ / this._SafeStr_2243 | 0;
        _loc8_ = 0;
        while (_loc8_ < _loc7_) {
            _loc16_ = param1.readFloat();
            param1.readFloat();
            _loc10_ = 2;
            while (_loc10_ <= this._SafeStr_2243) {
                _loc6_ = param1.readFloat();
                param1.readFloat();
                _loc5_ = _loc10_;
                _loc16_ = _loc16_ * (_loc5_ - 1) / _loc5_ + _loc6_ / _loc5_;
                _loc10_++;
            }
            if (_loc8_ >= _loc7_ - 1 - 32) {
                _loc16_ *= (_loc7_ - _loc8_ - 1) / 32;
            }
            _loc11_ = (_loc16_ + 1) / _loc13_ | 0;
            if (_loc11_ < 0) {
                _loc11_ = 0;
            } else if (_loc11_ >= _loc12_) {
                _loc11_ = _loc12_ - 1;
            }
            _loc9_ *= _loc12_;
            _loc9_ = _loc9_ + _loc11_;
            if (_loc8_ % this._SafeStr_2399 == this._SafeStr_2399 - 1) {
                this._sampleData[_loc8_ / this._SafeStr_2399 | 0] = _loc9_;
                _loc9_ = 0;
            }
            _loc8_++;
        }
    }

    private _sampleData: number[] = null;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    private _SafeStr_2399: number = 2;
    private _SafeStr_2243: number = 1;

    declare private _SafeStr_3198: any[];

    declare private _usageTimeStamp: number;
    static { (this.prototype as any)._usageTimeStamp = 0; }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get id(): number {
        return this._id;
    }

    public get length(): number {
        return this._sampleData.length * this._SafeStr_2399 * this._SafeStr_2243 >>> 0;
    }

    public get usageCount(): number {
        return this._SafeStr_3198.length | 0;
    }

    public get usageTimeStamp(): number {
        return this._usageTimeStamp | 0;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._sampleData = null;
            this._SafeStr_3198 = null;
        }
    }

    public setSample(param1: number[], param2: number, param3: number, param4: number): number {
        let _loc10_: number = 0;
        let _loc9_: number = 0;
        let _loc6_: any = 0;
        if (param1 == null || this._sampleData == null) {
            return param4;
        }
        let _loc5_: number = this._SafeStr_2399 * this._SafeStr_2243;
        param4 = param4 / _loc5_ | 0;
        if (param2 < 0) {
            param3 += param2;
            param2 = 0;
        }
        if (param3 > param1.length - param2) {
            param3 = param1.length - param2;
        }
        let _loc8_: number = param3 / _loc5_ | 0;
        let _loc7_: number = 0;
        if (_loc8_ > this._sampleData.length - param4) {
            _loc7_ = (_loc8_ - (this._sampleData.length - param4)) * _loc5_;
            _loc8_ = this._sampleData.length - param4;
            if (_loc7_ > param1.length - param2) {
                _loc7_ = param1.length - param2;
            }
        }
        if (this._SafeStr_2243 == 1) {
            if (this._SafeStr_2399 == 2) {
                while (_loc8_-- > 0) {
                    _loc10_ = this._sampleData[param4++];
                    param1[param2++] = (_loc10_ >> 16 & 0xFFFF) - 32767;
                    param1[param2++] = (_loc10_ & 0xFFFF) - 32767;
                }
            } else if (this._SafeStr_2399 == 4) {
                while (_loc8_-- > 0) {
                    _loc10_ = this._sampleData[param4++];
                    param1[param2++] = (_loc10_ >> 24 & 0xFF) - 127 << 8;
                    param1[param2++] = (_loc10_ >> 16 & 0xFF) - 127 << 8;
                    param1[param2++] = (_loc10_ >> 8 & 0xFF) - 127 << 8;
                    param1[param2++] = (_loc10_ & 0xFF) - 127 << 8;
                }
            }
        } else if (this._SafeStr_2243 >= 2) {
            _loc9_ = 0;
            _loc6_ = 0;
            if (this._SafeStr_2399 == 2) {
                while (_loc8_-- > 0) {
                    _loc10_ = this._sampleData[param4++];
                    _loc6_ = (_loc10_ >> 16 & 0xFFFF) - 32767;
                    _loc9_ = this._SafeStr_2243;
                    while (_loc9_ > 0) {
                        param1[param2++] = _loc6_ | 0;
                        _loc9_--;
                    }
                    _loc6_ = (_loc10_ & 0xFFFF) - 32767;
                    _loc9_ = this._SafeStr_2243;
                    while (_loc9_ > 0) {
                        param1[param2++] = _loc6_ | 0;
                        _loc9_--;
                    }
                }
            } else if (this._SafeStr_2399 == 4) {
                while (_loc8_-- > 0) {
                    _loc10_ = this._sampleData[param4++];
                    _loc6_ = (_loc10_ >> 24 & 0xFF) - 127 << 8;
                    _loc9_ = this._SafeStr_2243;
                    while (_loc9_ > 0) {
                        param1[param2++] = _loc6_ | 0;
                        _loc9_--;
                    }
                    _loc6_ = (_loc10_ >> 16 & 0xFF) - 127 << 8;
                    _loc9_ = this._SafeStr_2243;
                    while (_loc9_ > 0) {
                        param1[param2++] = _loc6_ | 0;
                        _loc9_--;
                    }
                    _loc6_ = (_loc10_ >> 8 & 0xFF) - 127 << 8;
                    _loc9_ = this._SafeStr_2243;
                    while (_loc9_ > 0) {
                        param1[param2++] = _loc6_ | 0;
                        _loc9_--;
                    }
                    _loc6_ = (_loc10_ & 0xFF) - 127 << 8;
                    _loc9_ = this._SafeStr_2243;
                    while (_loc9_ > 0) {
                        param1[param2++] = _loc6_ | 0;
                        _loc9_--;
                    }
                }
            }
        }
        while (_loc7_-- > 0) {
            param1[param2++] = 0;
        }
        return param4 * _loc5_;
    }

    public addSample(param1: number[], param2: number, param3: number, param4: number): number {
        let _loc10_: any;
        let _loc11_: any;
        let _loc9_: number = 0;
        let _loc8_: number = 0;
        let _loc6_: any = 0;
        if (param1 == null || this._sampleData == null) {
            return param4;
        }
        let _loc5_: number = this._SafeStr_2399 * this._SafeStr_2243;
        param4 = param4 / _loc5_ | 0;
        if (param2 < 0) {
            param3 += param2;
            param2 = 0;
        }
        if (param3 > param1.length - param2) {
            param3 = param1.length - param2;
        }
        let _loc7_: number = param3 / _loc5_ | 0;
        if (_loc7_ > this._sampleData.length - param4) {
            _loc7_ = this._sampleData.length - param4;
        }
        if (this._SafeStr_2243 == 1) {
            if (this._SafeStr_2399 == 2) {
                while (_loc7_-- > 0) {
                    _loc9_ = this._sampleData[param4++];
                    param1[param2++] += (_loc9_ >> 16 & 0xFFFF) - 32767;
                    param1[param2++] += (_loc9_ & 0xFFFF) - 32767;
                }
            } else if (this._SafeStr_2399 == 4) {
                while (_loc7_-- > 0) {
                    _loc9_ = this._sampleData[param4++];
                    param1[param2++] += (_loc9_ >> 24 & 0xFF) - 127 << 8;
                    param1[param2++] += (_loc9_ >> 16 & 0xFF) - 127 << 8;
                    param1[param2++] += (_loc9_ >> 8 & 0xFF) - 127 << 8;
                    param1[param2++] += (_loc9_ & 0xFF) - 127 << 8;
                }
            }
        } else if (this._SafeStr_2243 >= 2) {
            _loc8_ = 0;
            _loc6_ = 0;
            if (this._SafeStr_2399 == 2) {
                while (_loc7_-- > 0) {
                    _loc9_ = this._sampleData[param4++];
                    _loc6_ = (_loc9_ >> 16 & 0xFFFF) - 32767;
                    _loc8_ = this._SafeStr_2243;
                    while (_loc8_ > 0) {
                        _loc10_ = param2++;
                        _loc11_ = param1[_loc10_] + _loc6_;
                        param1[_loc10_] = _loc11_ | 0;
                        _loc8_--;
                    }
                    _loc6_ = (_loc9_ & 0xFFFF) - 32767;
                    _loc8_ = this._SafeStr_2243;
                    while (_loc8_ > 0) {
                        _loc11_ = param2++;
                        _loc10_ = param1[_loc11_] + _loc6_;
                        param1[_loc11_] = _loc10_ | 0;
                        _loc8_--;
                    }
                }
            } else if (this._SafeStr_2399 == 4) {
                while (_loc7_-- > 0) {
                    _loc9_ = this._sampleData[param4++];
                    _loc6_ = (_loc9_ >> 24 & 0xFF) - 127 << 8;
                    _loc8_ = this._SafeStr_2243;
                    while (_loc8_ > 0) {
                        _loc10_ = param2++;
                        _loc11_ = param1[_loc10_] + _loc6_;
                        param1[_loc10_] = _loc11_ | 0;
                        _loc8_--;
                    }
                    _loc6_ = (_loc9_ >> 16 & 0xFF) - 127 << 8;
                    _loc8_ = this._SafeStr_2243;
                    while (_loc8_ > 0) {
                        _loc11_ = param2++;
                        _loc10_ = param1[_loc11_] + _loc6_;
                        param1[_loc11_] = _loc10_ | 0;
                        _loc8_--;
                    }
                    _loc6_ = (_loc9_ >> 8 & 0xFF) - 127 << 8;
                    _loc8_ = this._SafeStr_2243;
                    while (_loc8_ > 0) {
                        _loc10_ = param2++;
                        _loc11_ = param1[_loc10_] + _loc6_;
                        param1[_loc10_] = _loc11_ | 0;
                        _loc8_--;
                    }
                    _loc6_ = (_loc9_ & 0xFF) - 127 << 8;
                    _loc8_ = this._SafeStr_2243;
                    while (_loc8_ > 0) {
                        _loc11_ = param2++;
                        _loc10_ = param1[_loc11_] + _loc6_;
                        param1[_loc11_] = _loc10_ | 0;
                        _loc8_--;
                    }
                }
            }
        }
        return param4 * _loc5_;
    }

    public setUsageFromSong(param1: number, param2: number): void {
        if (this._SafeStr_3198 == null) {
            return;
        }
        if (this._SafeStr_3198.indexOf(param1) == -1) {
            this._SafeStr_3198.push(param1);
        }
        this._usageTimeStamp = param2;
    }

    public isUsedFromSong(param1: number): boolean {
        if (this._SafeStr_3198 == null) {
            return false;
        }
        return this._SafeStr_3198.indexOf(param1) != -1;
    }

    get [IDisposable](): true {
        return true;
    }
}
