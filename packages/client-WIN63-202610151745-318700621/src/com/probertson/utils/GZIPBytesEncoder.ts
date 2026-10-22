import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IllegalOperationError } from '@habbo-pixi/runtime/errors/IllegalOperationError';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { CRC32Generator } from '@/com/probertson/utils/CRC32Generator';
import { GZIPFile } from '@/com/probertson/utils/GZIPFile';

export class GZIPBytesEncoder {
    static { registerClassName(this, 'com.probertson.utils::GZIPBytesEncoder'); }

    constructor() {
    }

    public compressToByteArray(param1: ByteArray, param2: Date = null): ByteArray {
        let _loc3_: any = 0;
        if (param1 == null) {
            throw new ArgumentError("src can\'t be null.");
        }
        let _loc12_: number = param1.position;
        let _loc14_: ByteArray = new ByteArray();
        _loc14_.writeBytes(param1);
        let _loc6_: ByteArray = new ByteArray();
        _loc6_.endian = "littleEndian";
        let _loc10_: number = 31;
        _loc6_.writeByte(_loc10_ | 0);
        let _loc9_: number = 139;
        _loc6_.writeByte(_loc9_ | 0);
        let _loc5_: number = 8;
        _loc6_.writeByte(_loc5_ | 0);
        let _loc4_: number = parseInt("00000000", 2) | 0;
        _loc6_.writeByte(_loc4_);
        let _loc7_: number = param2?.getTime() >>> 0;
        _loc6_.writeUnsignedInt(_loc7_);
        let _loc15_: number = parseInt("00000100", 2) >>> 0;
        _loc6_.writeByte(_loc15_ | 0);
        if (Capabilities.os.indexOf("Windows") >= 0) {
            _loc3_ = 11;
        } else if (Capabilities.os.indexOf("Mac OS") >= 0) {
            _loc3_ = 7;
        } else {
            _loc3_ = 3;
        }
        _loc6_.writeByte(_loc3_ | 0);
        let _loc8_: CRC32Generator = new CRC32Generator();
        let _loc13_: number = _loc8_.generateCRC32(_loc14_);
        let _loc11_: number = _loc14_.length % Math.pow(2, 32) >>> 0;
        _loc14_.deflate();
        _loc6_.writeBytes(_loc14_, 0, _loc14_.length);
        _loc6_.writeUnsignedInt(_loc13_);
        _loc6_.writeUnsignedInt(_loc11_);
        return _loc6_;
    }

    public uncompressToByteArray(param1: ByteArray): ByteArray {
        let _loc3_: GZIPFile = null;
        _loc3_ = this.parseGZIPData(param1);
        let _loc2_: ByteArray = _loc3_.getCompressedData();
        try {
            _loc2_.inflate();
        } catch (error) {
            throw new IllegalOperationError("The specified source is not a GZIP file format file or data.");
        }
        return _loc2_;
    }

    public parseGZIPData(param1: ByteArray, param2: string = ""): GZIPFile {
        let _loc9_: string = null;
        let _loc4_: ByteArray = null;
        let _loc17_: string = null;
        let _loc24_: ByteArray = null;
        let _loc12_: number = 0;
        if (param1 == null) {
            throw new ArgumentError("The srcBytes ByteArray can\'t be null.");
        }
        param1.endian = "littleEndian";
        let _loc23_: number = param1.readUnsignedByte();
        if (_loc23_ != 31) {
            throw new IllegalOperationError("The specified data is not in GZIP file format structure.");
        }
        let _loc21_: number = param1.readUnsignedByte();
        if (_loc21_ != 139) {
            throw new IllegalOperationError("The specified data is not in GZIP file format structure.");
        }
        let _loc20_: number = param1.readUnsignedByte();
        if (_loc20_ != 8) {
            throw new IllegalOperationError("The specified data is not in GZIP file format structure.");
        }
        let _loc6_: number = param1.readByte();
        let _loc13_: boolean = (_loc6_ >> 7 & 1) == 1;
        let _loc18_: boolean = (_loc6_ >> 6 & 1) == 1;
        let _loc15_: boolean = (_loc6_ >> 5 & 1) == 1;
        let _loc22_: boolean = (_loc6_ >> 4 & 1) == 1;
        let _loc3_: boolean = (_loc6_ >> 3 & 1) == 1;
        let _loc8_: boolean = false;
        _loc8_ = (_loc6_ >> 2 & 1) == 1 ? true : _loc8_;
        _loc8_ = (_loc6_ >> 1 & 1) == 1 ? true : _loc8_;
        _loc8_ = (_loc6_ & 1) == 1 ? true : _loc8_;
        if (_loc8_) {
            throw new IllegalOperationError("The specified data is not in GZIP file format structure.");
        }
        let _loc7_: number = param1.readUnsignedInt();
        let _loc25_: number = param1.readUnsignedByte();
        let _loc16_: number = param1.readUnsignedByte();
        if (_loc15_) {
            _loc9_ = param1.readUTF();
        }
        let _loc14_: string = null;
        if (_loc22_) {
            _loc4_ = new ByteArray();
            while (param1.readUnsignedByte() != 0) {
                param1.position -= 1;
                _loc4_.writeByte(param1.readByte());
            }
            _loc4_.position = 0;
            _loc14_ = _loc4_.readUTFBytes(_loc4_.length);
        }
        if (_loc3_) {
            _loc24_ = new ByteArray();
            while (param1.readUnsignedByte() != 0) {
                param1.position -= 1;
                _loc24_.writeByte(param1.readByte());
            }
            _loc24_.position = 0;
            _loc17_ = _loc24_.readUTFBytes(_loc24_.length);
        }
        if (_loc18_) {
            _loc12_ = param1.readUnsignedShort() | 0;
        }
        let _loc19_: number = param1.length - param1.position - 8;
        let _loc5_: ByteArray = new ByteArray();
        param1.readBytes(_loc5_, 0, _loc19_ >>> 0);
        let _loc11_: number = param1.readUnsignedInt();
        let _loc10_: number = param1.readUnsignedInt();
        return new GZIPFile(_loc5_, _loc10_, new Date(_loc7_), param2, _loc14_, _loc17_);
    }
}
