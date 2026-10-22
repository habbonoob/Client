import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHash } from '@/com/hurlant/crypto/hash/IHash';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class SHABase implements IHash {
    static { registerClassName(this, 'com.hurlant.crypto.hash::SHABase'); }

    public pad_size: number = 40;

    constructor() {
    }

    public getInputSize(): number {
        return 64;
    }

    public getHashSize(): number {
        return 0;
    }

    public getPadSize(): number {
        return this.pad_size;
    }

    public hash(param1: ByteArray): ByteArray {
        let _loc7_: any = 0;
        let _loc6_: number = param1.length;
        let _loc8_: string = param1.endian;
        param1.endian = "bigEndian";
        let _loc3_: number = _loc6_ * 8 >>> 0;
        while (param1.length % 4 != 0) {
            param1.setByteAt(param1.length, 0);
        }
        param1.position = 0;
        let _loc2_: any[] = [];
        _loc7_ = 0;
        while (_loc7_ < param1.length) {
            _loc2_.push(param1.readUnsignedInt());
            _loc7_ += 4;
        }
        let _loc4_: any[] = this.core(_loc2_, _loc3_);
        let _loc9_: ByteArray = new ByteArray();
        let _loc5_: number = this.getHashSize() / 4 >>> 0;
        _loc7_ = 0;
        while (_loc7_ < _loc5_) {
            _loc9_.writeUnsignedInt(_loc4_[_loc7_] >>> 0);
            _loc7_++;
        }
        param1.length = _loc6_;
        param1.endian = _loc8_;
        return _loc9_;
    }

    protected core(param1: any[], param2: number): any[] {
        return null;
    }

    public toString(): string {
        return "sha";
    }
}
