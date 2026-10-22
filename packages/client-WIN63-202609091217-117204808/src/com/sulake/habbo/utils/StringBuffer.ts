import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class StringBuffer {
    static { registerClassName(this, 'com.sulake.habbo.utils::StringBuffer'); }

    protected buffer: ByteArray = new ByteArray();
    protected backBuffer: ByteArray = new ByteArray();

    constructor(param1: number = 0, param2: string = null) {
        this.buffer.endian = "bigEndian";
        this.buffer.length = param1;
        if (param2) {
            this.buffer.writeUTFBytes(param2);
        }
    }

    public appendByteArray(param1: ByteArray, param2: number = 0, param3: number = 0): StringBuffer {
        let _loc5_: number = param2 + param3 >>> 0;
        let _loc4_: number = param1.length;
        if (_loc5_ > _loc4_) {
            _loc5_ = _loc4_;
        }
        if (param2 >= _loc5_) {
            return this;
        }
        this.buffer.writeBytes(param1, param2, _loc5_ - param2 >>> 0);
        return this;
    }

    public appendChar(param1: number): StringBuffer {
        this.buffer.writeByte(param1);
        return this;
    }

    public appendChars(...rest: any[]): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        for (const _loc2_ of rest ?? []) {
            _loc3_.writeByte(_loc2_ | 0);
        }
        return this;
    }

    public appendCharArray(param1: any[]): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        for (const _loc2_ of param1 ?? []) {
            _loc3_.writeByte(_loc2_ | 0);
        }
        return this;
    }

    public appendCharVectorI(param1: number[]): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        for (const _loc2_ of param1 ?? []) {
            _loc3_.writeByte(_loc2_);
        }
        return this;
    }

    public appendCharVectorU(param1: number[]): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        for (const _loc2_ of param1 ?? []) {
            _loc3_.writeByte(_loc2_ | 0);
        }
        return this;
    }

    public appendInt(param1: number): StringBuffer {
        this.buffer.writeInt(param1);
        return this;
    }

    public appendInts(...rest: any[]): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        for (const _loc2_ of rest ?? []) {
            _loc3_.writeInt(_loc2_ | 0);
        }
        return this;
    }

    public appendIntArray(param1: any[]): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        for (const _loc2_ of param1 ?? []) {
            _loc3_.writeInt(_loc2_ | 0);
        }
        return this;
    }

    public appendIntVector(param1: number[]): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        for (const _loc2_ of param1 ?? []) {
            _loc3_.writeInt(_loc2_);
        }
        return this;
    }

    public appendString(param1: any): StringBuffer {
        this.buffer.writeUTFBytes(String(param1));
        return this;
    }

    public appendStrings(...rest: any[]): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        for (const _loc2_ of rest ?? []) {
            _loc3_.writeUTFBytes(String(_loc2_));
        }
        return this;
    }

    public appendStringArray(param1: any[]): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        for (const _loc2_ of param1 ?? []) {
            _loc3_.writeUTFBytes(String(_loc2_));
        }
        return this;
    }

    public appendStringBuffer(param1: StringBuffer, param2: number = 0, param3: number = 0): StringBuffer {
        let _loc4_: ByteArray = null;
        _loc4_ = param1.buffer;
        let _loc5_: number = _loc4_.length;
        let _loc6_: number = param2 + param3 >>> 0;
        if (_loc6_ > _loc5_) {
            _loc6_ = _loc5_;
        }
        if (param2 >= _loc6_) {
            return this;
        }
        this.buffer.writeBytes(_loc4_, param2, _loc6_ - param2 >>> 0);
        return this;
    }

    public appendStringVector(param1: string[]): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        for (const _loc2_ of param1 ?? []) {
            _loc3_.writeUTFBytes(_loc2_);
        }
        return this;
    }

    public appendUintVector(param1: number[]): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        for (const _loc2_ of param1 ?? []) {
            _loc3_.writeInt(_loc2_ | 0);
        }
        return this;
    }

    public byteAt(param1: number): number {
        if (param1 < this.buffer.length) {
            return this.buffer.byteAt(param1) | 0;
        }
        return 0;
    }

    public charAt(param1: number): string {
        return this.toString().charAt(param1);
    }

    public clear(): void {
        if (this.buffer.length > 0) {
            this.buffer.clear();
        }
        if (this.backBuffer.length > 0) {
            this.backBuffer.clear();
        }
    }

    public count(param1: string): number {
        let _loc7_: any = 0;
        let _loc5_: any = 0;
        if (!param1) {
            return 0;
        }
        let _loc3_: ByteArray = this.buffer;
        let _loc4_: ByteArray = this.backBuffer;
        let _loc2_: number = _loc3_.position;
        let _loc6_: number = _loc3_.length;
        _loc4_.clear();
        _loc4_.writeUTFBytes(param1);
        _loc3_.position = 0;
        while (_loc6_--) {
            if (_loc3_.readByte() == _loc4_.byteAt(_loc7_)) {
                if (++_loc7_ == _loc4_.length) {
                    _loc5_++;
                    _loc7_ = 0;
                }
            } else {
                _loc7_ = 0;
            }
        }
        _loc7_ = _loc3_.position - _loc7_ >>> 0;
        _loc3_.position = _loc2_;
        return _loc5_ >>> 0;
    }

    public countChar(param1: number): number {
        let _loc5_: any = 0;
        let _loc3_: any = 0;
        let _loc2_: ByteArray = null;
        _loc2_ = this.buffer;
        let _loc4_: number = _loc2_.length;
        while (_loc5_ < _loc4_) {
            _loc3_ += Number(_loc2_.byteAt(_loc5_) == param1) >>> 0;
            ++_loc5_;
        }
        return _loc3_ >>> 0;
    }

    public deleteCharAt(param1: number): void {
        let _loc3_: ByteArray = null;
        _loc3_ = this.buffer;
        let _loc4_: number = _loc3_.length - 1 >>> 0;
        if (Number(!this.length) | 0 | (Number(param1 >= _loc4_) | 0)) {
            return;
        }
        let _loc2_: number = _loc3_.position;
        _loc3_.position = param1;
        _loc3_.writeBytes(_loc3_, param1 + 1 >>> 0, _loc4_ - param1 >>> 0);
        _loc3_.position = _loc2_ - 1 >>> 0;
    }

    public deleteCharsAt(param1: number, param2: number): void {
        let _loc4_: ByteArray = null;
        _loc4_ = this.buffer;
        let _loc5_: number = _loc4_.length - param2 >>> 0;
        if (Number(!this.length) | 0 | (Number(param1 >= _loc5_) | 0)) {
            return;
        }
        let _loc3_: number = _loc4_.position;
        _loc4_.position = param1;
        _loc4_.writeBytes(_loc4_, param1 + param2 >>> 0, _loc5_ - param1 >>> 0);
        _loc4_.position = _loc3_ - param2 >>> 0;
    }

    public empty(): boolean {
        return !this.buffer.position;
    }

    public getBytesAt(param1: number, param2: number, param3: ByteArray = null, param4: number = 0): ByteArray {
        if (!param3) {
            param3 = new ByteArray();
        }
        if (param4 < param3.length) {
            param4 = param3.length;
        }
        param3.writeBytes(this.buffer, param1, param2);
        return param3;
    }

    public insertByteArray(param1: number, param2: ByteArray, param3: number = 0, param4: number = 0): StringBuffer {
        let _loc6_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendByteArray(param2, param3 >>> 0, param4 >>> 0);
            return this;
        }
        let _loc7_: number = _loc6_.position;
        if (param1 < _loc6_.position) {
            _loc6_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc6_, param1, 0);
        let _loc5_: number = param2.length;
        if (param4 > _loc5_) {
            param4 = _loc5_ | 0;
        }
        if (param3 > param4) {
            return this;
        }
        _loc6_.writeBytes(param2, param3 >>> 0, param4 >>> 0);
        _loc6_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertChar(param1: number, param2: number): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendChar(param2);
            return this;
        }
        let _loc4_: number = _loc3_.position;
        if (param1 < _loc3_.position) {
            _loc3_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc3_, param1, 0);
        _loc3_.writeByte(param2);
        _loc3_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertChars(param1: number, ...rest: any[]): StringBuffer {
        let _loc4_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendCharArray(rest);
            return this;
        }
        let _loc5_: number = _loc4_.position;
        if (param1 < _loc4_.position) {
            _loc4_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc4_, param1, 0);
        for (const _loc3_ of rest ?? []) {
            _loc4_.writeByte(_loc3_ | 0);
        }
        _loc4_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertCharArray(param1: number, param2: any[]): StringBuffer {
        let _loc4_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendCharArray(param2);
            return this;
        }
        let _loc5_: number = _loc4_.position;
        if (param1 < _loc4_.position) {
            _loc4_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc4_, param1, 0);
        for (const _loc3_ of param2 ?? []) {
            _loc4_.writeByte(_loc3_ | 0);
        }
        _loc4_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertCharVectorI(param1: number, param2: number[]): StringBuffer {
        let _loc4_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendCharVectorI(param2);
            return this;
        }
        let _loc5_: number = _loc4_.position;
        if (param1 < _loc4_.position) {
            _loc4_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc4_, param1, 0);
        for (const _loc3_ of param2 ?? []) {
            _loc4_.writeByte(_loc3_);
        }
        _loc4_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertCharVectorU(param1: number, param2: number[]): StringBuffer {
        let _loc4_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendCharVectorU(param2);
            return this;
        }
        let _loc5_: number = _loc4_.position;
        if (param1 < _loc4_.position) {
            _loc4_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc4_, param1, 0);
        for (const _loc3_ of param2 ?? []) {
            _loc4_.writeByte(_loc3_ | 0);
        }
        _loc4_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertInt(param1: number, param2: number): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendInt(param2);
            return this;
        }
        let _loc4_: number = _loc3_.position;
        if (param1 < _loc3_.position) {
            _loc3_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc3_, param1, 0);
        _loc3_.writeInt(param2);
        _loc3_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertInts(param1: number, ...rest: any[]): StringBuffer {
        let _loc4_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendIntArray(rest);
            return this;
        }
        let _loc5_: number = _loc4_.position;
        if (param1 < _loc4_.position) {
            _loc4_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc4_, param1, 0);
        for (const _loc3_ of rest ?? []) {
            _loc4_.writeInt(_loc3_ | 0);
        }
        _loc4_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertIntArray(param1: number, param2: any[]): StringBuffer {
        let _loc4_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendIntArray(param2);
            return this;
        }
        let _loc5_: number = _loc4_.position;
        if (param1 < _loc4_.position) {
            _loc4_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc4_, param1, 0);
        for (const _loc3_ of param2 ?? []) {
            _loc4_.writeInt(_loc3_ | 0);
        }
        _loc4_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertIntVector(param1: number, param2: number[]): StringBuffer {
        let _loc4_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendIntVector(param2);
            return this;
        }
        let _loc5_: number = _loc4_.position;
        if (param1 < _loc4_.position) {
            _loc4_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc4_, param1, 0);
        for (const _loc3_ of param2 ?? []) {
            _loc4_.writeInt(_loc3_);
        }
        _loc4_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertString(param1: number, param2: any): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendString(param2);
            return this;
        }
        let _loc4_: number = _loc3_.position;
        if (param1 < _loc3_.position) {
            _loc3_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc3_, param1, 0);
        _loc3_.writeUTFBytes(String(param2));
        _loc3_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertStrings(param1: number, ...rest: any[]): StringBuffer {
        let _loc4_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendStringArray(rest);
            return this;
        }
        let _loc5_: number = _loc4_.position;
        if (param1 < _loc4_.position) {
            _loc4_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc4_, param1, 0);
        for (const _loc3_ of rest ?? []) {
            _loc4_.writeUTFBytes(String(_loc3_));
        }
        _loc4_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertStringArray(param1: number, param2: any[]): StringBuffer {
        let _loc4_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendStringArray(param2);
            return this;
        }
        let _loc5_: number = _loc4_.position;
        if (param1 < _loc4_.position) {
            _loc4_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc4_, param1, 0);
        for (const _loc3_ of param2 ?? []) {
            _loc4_.writeUTFBytes(String(_loc3_));
        }
        _loc4_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertStringBuffer(param1: number, param2: StringBuffer, param3: number = 0, param4: number = 0): StringBuffer {
        let _loc5_: ByteArray = null;
        let _loc7_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendStringBuffer(param2, param3 >>> 0, param4 >>> 0);
            return this;
        }
        let _loc8_: number = _loc7_.position;
        if (param1 < _loc7_.position) {
            _loc7_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc7_, param1, 0);
        _loc5_ = param2.buffer;
        let _loc6_: number = _loc5_.length;
        if (param4 > _loc6_) {
            param4 = _loc6_ | 0;
        }
        if (param3 > param4) {
            return this;
        }
        _loc7_.writeBytes(_loc5_, param3 >>> 0, param4 >>> 0);
        _loc7_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertStringVector(param1: number, param2: string[]): StringBuffer {
        let _loc4_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendStringVector(param2);
            return this;
        }
        let _loc5_: number = _loc4_.position;
        if (param1 < _loc4_.position) {
            _loc4_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc4_, param1, 0);
        for (const _loc3_ of param2 ?? []) {
            _loc4_.writeUTFBytes(_loc3_);
        }
        _loc4_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public insertUintVector(param1: number, param2: number[]): StringBuffer {
        let _loc4_: ByteArray = this.buffer;
        if (param1 > this.length) {
            this.appendUintVector(param2);
            return this;
        }
        let _loc5_: number = _loc4_.position;
        if (param1 < _loc4_.position) {
            _loc4_.position = param1;
        }
        this.backBuffer.clear();
        this.backBuffer.writeBytes(_loc4_, param1, 0);
        for (const _loc3_ of param2 ?? []) {
            _loc4_.writeInt(_loc3_ | 0);
        }
        _loc4_.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        return this;
    }

    public indexOf(param1: string, param2: number = 0): number {
        let _loc7_: any = 0;
        if (!param1 || param2 >= this.length) {
            return -1;
        }
        let _loc4_: ByteArray = this.buffer;
        let _loc5_: ByteArray = this.backBuffer;
        let _loc3_: number = _loc4_.position;
        let _loc6_: number = _loc4_.length;
        _loc5_.clear();
        _loc5_.writeUTFBytes(param1);
        _loc4_.position = 0;
        while (_loc6_--) {
            if (_loc4_.readByte() == _loc5_.byteAt(_loc7_)) {
                if (++_loc7_ == _loc5_.length) {
                    break;
                }
            } else {
                _loc7_ = 0;
            }
        }
        _loc7_ = _loc4_.position - _loc7_ >>> 0;
        _loc4_.position = _loc3_;
        if (~_loc6_) {
            return Number(_loc7_);
        }
        return -1;
    }

    public indexOfChar(param1: number, param2: number = 0): number {
        if (param2 >= this.length) {
            return -1;
        }
        let _loc4_: ByteArray = this.buffer;
        let _loc3_: number = _loc4_.position;
        let _loc5_: number = _loc4_.length;
        _loc4_.position = 0;
        let _loc6_: number = 0;
        while (_loc5_--) {
            if (_loc4_.readByte() == param1) {
                break;
            }
        }
        _loc6_ = _loc4_.position - _loc6_ >>> 0;
        _loc4_.position = _loc3_;
        if (~_loc5_) {
            return _loc6_;
        }
        return -1;
    }

    public lastIndexOf(param1: string, param2: number = 4294967295): number {
        let _loc7_: any = 0;
        let _loc8_: any = 0;
        if (!param1 || param2 >= this.length) {
            return -1;
        }
        let _loc4_: ByteArray = this.buffer;
        let _loc5_: ByteArray = this.backBuffer;
        let _loc3_: number = _loc4_.position;
        let _loc6_: number = _loc4_.length;
        _loc5_.clear();
        _loc5_.writeUTFBytes(param1);
        _loc4_.position = 0;
        if (param2 < _loc6_) {
            _loc6_ = param2;
        }
        while (_loc6_--) {
            if (_loc4_.readByte() == _loc5_.byteAt(_loc7_)) {
                if (++_loc7_ == _loc5_.length) {
                    _loc8_ = _loc4_.position - _loc7_ >>> 0;
                    _loc7_ = 0;
                }
            } else {
                _loc7_ = 0;
            }
        }
        _loc4_.position = _loc3_;
        if (~_loc6_) {
            return Number(_loc8_);
        }
        return -1;
    }

    public lastIndexOfChar(param1: number, param2: number = 4294967295): number {
        let _loc3_: ByteArray = null;
        if (param2 >= this.length) {
            return -1;
        }
        _loc3_ = this.buffer;
        let _loc4_: number = _loc3_.length;
        if (param2 < _loc4_) {
            _loc4_ = param2;
        }
        while (_loc4_--) {
            if (_loc3_.byteAt(_loc4_) == param1) {
                return _loc4_;
            }
        }
        return -1;
    }

    public get length(): number {
        return this.buffer.length;
    }

    public set length(param1: number) {
        this.buffer.length = param1;
        if (param1 < this.buffer.position) {
            this.buffer.position = param1;
        }
    }

    public replace(param1: number, param2: string): StringBuffer {
        let _loc3_: number = this.buffer.position;
        this.buffer.position = param1;
        this.buffer.writeUTFBytes(param2);
        if (this.buffer.position < _loc3_) {
            this.buffer.position = _loc3_;
        }
        return this;
    }

    public replaceBytes(param1: number, param2: number, param3: ByteArray, param4: number = 0): StringBuffer {
        let _loc5_: ByteArray = this.buffer;
        let _loc7_: number = param4;
        let _loc6_: number = param3.length;
        if (param2 > _loc5_.length) {
            param2 = _loc5_.length;
        }
        while ((Number(param1 < param2) | 0) & (Number(_loc7_ < _loc6_) | 0)) {
            _loc5_.setByteAt(param1++, param3.byteAt(_loc7_++));
        }
        return this;
    }

    public replaceChar(param1: number, param2: number): number {
        let _loc6_: any = 0;
        let _loc4_: number = 0;
        let _loc3_: ByteArray = this.buffer;
        let _loc5_: number = this.buffer.length;
        while (_loc6_ < _loc5_) {
            if (_loc3_.byteAt(_loc6_) == param1) {
                _loc4_++;
                _loc3_.setByteAt(_loc6_, param2);
            }
            _loc6_++;
        }
        return _loc4_ >>> 0;
    }

    public replaceCharVoid(param1: number, param2: number): StringBuffer {
        let _loc5_: any = 0;
        let _loc3_: ByteArray = this.buffer;
        let _loc4_: number = this.buffer.length;
        while (_loc5_ < _loc4_) {
            if (_loc3_.byteAt(_loc5_) == param1) {
                _loc3_.setByteAt(_loc5_, param2);
            }
            _loc5_++;
        }
        return this;
    }

    public replaceFirstChar(param1: number, param2: number): StringBuffer {
        let _loc5_: any = 0;
        let _loc3_: ByteArray = this.buffer;
        let _loc4_: number = this.buffer.length;
        while (_loc5_ < _loc4_) {
            if (_loc3_.byteAt(_loc5_) == param1) {
                _loc3_.setByteAt(_loc5_, param2);
                return this;
            }
            _loc5_++;
        }
        return this;
    }

    public replaceLastChar(param1: number, param2: number): StringBuffer {
        let _loc3_: ByteArray = this.buffer;
        let _loc4_: number = this.buffer.length;
        while (_loc4_--) {
            if (_loc3_.byteAt(_loc4_) == param1) {
                _loc3_.setByteAt(_loc4_, param2);
                return this;
            }
        }
        return this;
    }

    public replaceNthChar(param1: number, param2: number, param3: number): StringBuffer {
        let _loc7_: any = 0;
        let _loc5_: any = 0;
        let _loc4_: ByteArray = this.buffer;
        let _loc6_: number = this.buffer.length;
        while (_loc7_ < _loc6_) {
            if (_loc4_.byteAt(_loc7_) == param1) {
                if (_loc5_++ == param3) {
                    _loc4_.setByteAt(_loc7_, param2);
                    return this;
                }
            }
            _loc7_++;
        }
        return this;
    }

    public replaceRange(param1: number, param2: number, param3: string, param4: number = 0): StringBuffer {
        let _loc5_: ByteArray = this.buffer;
        let _loc7_: number = param4;
        let _loc6_: number = param3.length >>> 0;
        if (param2 > _loc5_.length) {
            param2 = _loc5_.length;
        }
        while ((Number(param1 < param2) | 0) & (Number(_loc7_ < _loc6_) | 0)) {
            _loc5_.setByteAt(param1++, param3.charCodeAt(_loc7_++));
        }
        return this;
    }

    public reset(param1: number = 0): ByteArray {
        let _loc2_: ByteArray = this.buffer;
        this.buffer = new ByteArray();
        this.backBuffer = new ByteArray();
        this.buffer.length = param1;
        return _loc2_;
    }

    public reverse(): StringBuffer {
        let _loc3_: any = 0;
        let _loc2_: number = 0;
        let _loc1_: ByteArray = null;
        _loc1_ = this.buffer;
        let _loc4_: number = _loc1_.length;
        while (_loc3_ < _loc4_) {
            _loc2_ = _loc1_.byteAt(_loc3_) | 0;
            _loc1_.setByteAt(_loc3_, _loc1_.byteAt(_loc4_));
            _loc1_.setByteAt(_loc4_, _loc2_);
            _loc3_++;
            --_loc4_;
        }
        return this;
    }

    public setByteAt(param1: number, param2: number): StringBuffer {
        if (param1 < this.buffer.length) {
            this.buffer.setByteAt(param1, param2);
        }
        return this;
    }

    public setCharAt(param1: number, param2: string): StringBuffer {
        if (!param2 || param2.length !== 1) {
            throw new ArgumentError("Char length must be 1.");
        }
        if (param1 >= this.length) {
            throw new ArgumentError("Index " + param1 + " outside range " + this.length + ".");
        }
        this.backBuffer.clear();
        if (param1) {
            this.backBuffer.writeUTFBytes(this.toString(0, param1 - 1 >>> 0));
        }
        this.backBuffer.writeUTFBytes(param2);
        this.backBuffer.writeUTFBytes(this.toString(param1 + 1 >>> 0));
        this.buffer.clear();
        this.buffer.writeBytes(this.backBuffer, 0, this.backBuffer.length);
        this.backBuffer = new ByteArray();
        return this;
    }

    public size(): number {
        let _loc2_: ByteArray = this.buffer;
        if (!_loc2_.length) {
            return 0;
        }
        let _loc1_: number = _loc2_.position;
        let _loc3_: number = _loc2_.length;
        _loc2_.position = 0;
        while (_loc3_ && _loc2_.readByte()) {
            _loc3_--;
        }
        let _loc4_: number = _loc2_.position;
        _loc2_.position = _loc1_;
        return _loc4_ - 1 * (Number(_loc3_ != 0) | 0) >>> 0;
    }

    public subbuf(param1: number = 0, param2: number = 4294967295): StringBuffer {
        let _loc3_: StringBuffer = new StringBuffer();
        _loc3_.appendStringBuffer(this, param1, param2);
        return _loc3_;
    }

    public subbuffer(param1: number, param2: number = 4294967295): StringBuffer {
        let _loc3_: StringBuffer = new StringBuffer();
        let _loc4_: number = this.length;
        if (param2 > _loc4_) {
            param2 = _loc4_;
        }
        _loc3_.appendStringBuffer(this, param1, param2 - param1 >>> 0);
        return _loc3_;
    }

    public substr(param1: number = 0, param2: number = 4294967295): string {
        if (param2) {
            return this.toString(param1, Math.min(param1 + param2, 4294967295) >>> 0);
        }
        return "";
    }

    public substring(param1: number, param2: number = 4294967295): string {
        if (param2 > param1) {
            return this.toString(param1, param2);
        }
        return "";
    }

    public toString(param1: number = 0, param2: number = 0): string {
        let _loc3_: ByteArray = null;
        _loc3_ = this.buffer;
        let _loc5_: number = _loc3_.position | 0;
        if (Number(!param2) | 0 | (Number(param2 > _loc5_) | 0)) {
            param2 = _loc5_ >>> 0;
        }
        if (param1 >= param2) {
            return "";
        }
        _loc3_.position = param1;
        let _loc4_: string = _loc3_.readUTFBytes(param2 - param1 >>> 0);
        _loc3_.position = _loc5_ >>> 0;
        return _loc4_;
    }

    public trimToSize(param1: number = 0): number {
        let _loc2_: number = param1 || this.size();
        if (_loc2_ >= this.buffer.length) {
            return this.buffer.length;
        }
        this.buffer.position = _loc2_;
        this.buffer.length = _loc2_;
        return _loc2_;
    }

    public trimToSizeVoid(param1: number = 0): StringBuffer {
        let _loc2_: number = param1 || this.size();
        if (_loc2_ >= this.buffer.length) {
            return this;
        }
        this.buffer.position = _loc2_;
        this.buffer.length = _loc2_;
        return this;
    }
}
