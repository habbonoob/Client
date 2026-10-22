import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class Base64Encoder {
    static { registerClassName(this, 'mx.utils::Base64Encoder'); }

    public static readonly CHARSET_UTF_8: string = "UTF-8";
    public static newLine: number = 10;
    public static readonly MAX_BUFFER_SIZE: number = 32767;
    private static readonly ESCAPE_CHAR_CODE: number = 61;
    private static readonly ALPHABET_CHAR_CODES: any[] = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47];
    public insertNewLines: boolean = true;

    declare private _buffers: any[];

    declare private _count: number;
    static { (this.prototype as any)._count = 0; }

    declare private _line: number;
    static { (this.prototype as any)._line = 0; }

    private _work: any[] = [0, 0, 0];

    constructor() {
        this.reset();
    }

    public drain(): string {
        let _loc3_: any[] = null;
        let _loc1_: string = "";
        let _loc2_: number = 0;
        while (_loc2_ < this._buffers.length) {
            _loc3_ = asGuarded(this._buffers[_loc2_], Array.isArray);
            _loc1_ += Reflect.apply(String.fromCharCode, null, _loc3_);
            _loc2_++;
        }
        this._buffers = [];
        this._buffers.push([]);
        return _loc1_;
    }

    public encode(param1: string, param2: number = 0, param3: number = 0): void {
        if (param3 == 0) {
            param3 = param1.length >>> 0;
        }
        let _loc4_: number = param2;
        let _loc5_: number = param2 + param3 >>> 0;
        if (_loc5_ > param1.length) {
            _loc5_ = param1.length >>> 0;
        }
        while (_loc4_ < _loc5_) {
            this._work[this._count] = param1.charCodeAt(_loc4_);
            ++this._count;
            if (this._count == this._work.length || _loc5_ - _loc4_ == 1) {
                this.encodeBlock();
                this._count = 0;
                this._work[0] = 0;
                this._work[1] = 0;
                this._work[2] = 0;
            }
            _loc4_++;
        }
    }

    public encodeUTFBytes(param1: string): void {
        let _loc2_: ByteArray = new ByteArray();
        _loc2_.writeUTFBytes(param1);
        _loc2_.position = 0;
        this.encodeBytes(_loc2_);
    }

    public encodeBytes(param1: ByteArray, param2: number = 0, param3: number = 0): void {
        if (param3 == 0) {
            param3 = param1.length;
        }
        let _loc4_: number = param1.position;
        param1.position = param2;
        let _loc5_: number = param2;
        let _loc6_: number = param2 + param3 >>> 0;
        if (_loc6_ > param1.length) {
            _loc6_ = param1.length;
        }
        while (_loc5_ < _loc6_) {
            this._work[this._count] = param1.byteAt(_loc5_);
            ++this._count;
            if (this._count == this._work.length || _loc6_ - _loc5_ == 1) {
                this.encodeBlock();
                this._count = 0;
                this._work[0] = 0;
                this._work[1] = 0;
                this._work[2] = 0;
            }
            _loc5_++;
        }
        param1.position = _loc4_;
    }

    public flush(): string {
        if (this._count > 0) {
            this.encodeBlock();
        }
        let _loc1_: string = this.drain();
        this.reset();
        return _loc1_;
    }

    public reset(): void {
        this._buffers = [];
        this._buffers.push([]);
        this._count = 0;
        this._line = 0;
        this._work[0] = 0;
        this._work[1] = 0;
        this._work[2] = 0;
    }

    public toString(): string {
        return this.flush();
    }

    private encodeBlock(): void {
        let _loc1_: any[] = asGuarded(this._buffers[this._buffers.length - 1], Array.isArray);
        if (_loc1_.length >= Base64Encoder.MAX_BUFFER_SIZE) {
            _loc1_ = [];
            this._buffers.push(_loc1_);
        }
        _loc1_.push(Base64Encoder.ALPHABET_CHAR_CODES[(this._work[0] & 0xFF) >> 2]);
        _loc1_.push(Base64Encoder.ALPHABET_CHAR_CODES[(this._work[0] & 3) << 4 | (this._work[1] & 0xF0) >> 4]);
        if (this._count > 1) {
            _loc1_.push(Base64Encoder.ALPHABET_CHAR_CODES[(this._work[1] & 0x0F) << 2 | (this._work[2] & 0xC0) >> 6]);
        } else {
            _loc1_.push(Base64Encoder.ESCAPE_CHAR_CODE);
        }
        if (this._count > 2) {
            _loc1_.push(Base64Encoder.ALPHABET_CHAR_CODES[this._work[2] & 0x3F]);
        } else {
            _loc1_.push(Base64Encoder.ESCAPE_CHAR_CODE);
        }
        if (this.insertNewLines) {
            if ((this._line = this._line + 4 >>> 0) == 76) {
                _loc1_.push(Base64Encoder.newLine);
                this._line = 0;
            }
        }
    }
}
