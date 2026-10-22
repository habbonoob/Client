import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class PNGEncoder {
    static { registerClassName(this, 'com.sulake.core.utils.images::PNGEncoder'); }

    private static _SafeStr_5657: any[];
    private static _SafeStr_7008: boolean = false;

    constructor() {
    }

    public static encode(param1: BitmapData): ByteArray {
        let _loc4_: number = 0;
        let _loc2_: any = 0;
        let _loc5_: number = 0;
        let _loc3_: ByteArray = new ByteArray();
        _loc3_.writeUnsignedInt(2303741511);
        _loc3_.writeUnsignedInt(218765834);
        let _loc7_: ByteArray = new ByteArray();
        _loc7_.writeInt(param1.width);
        _loc7_.writeInt(param1.height);
        _loc7_.writeUnsignedInt(134610944);
        _loc7_.writeByte(0);
        PNGEncoder.writeChunk(_loc3_, 1229472850, _loc7_);
        let _loc6_: ByteArray = new ByteArray();
        _loc4_ = 0;
        while (_loc4_ < param1.height) {
            _loc6_.writeByte(0);
            if (!param1.transparent) {
                _loc5_ = 0;
                while (_loc5_ < param1.width) {
                    _loc2_ = param1.getPixel(_loc5_, _loc4_);
                    _loc6_.writeUnsignedInt(((_loc2_ & 0xFFFFFF) << 8 | 0xFF) >>> 0);
                    _loc5_++;
                }
            } else {
                _loc5_ = 0;
                while (_loc5_ < param1.width) {
                    _loc2_ = param1.getPixel32(_loc5_, _loc4_);
                    _loc6_.writeUnsignedInt(((_loc2_ & 0xFFFFFF) << 8 | _loc2_ >>> 24) >>> 0);
                    _loc5_++;
                }
            }
            _loc4_++;
        }
        _loc6_.compress();
        PNGEncoder.writeChunk(_loc3_, 1229209940, _loc6_);
        PNGEncoder.writeChunk(_loc3_, 1229278788, null);
        return _loc3_;
    }

    private static writeChunk(param1: ByteArray, param2: number, param3: ByteArray): void {
        let _loc5_: any = 0;
        let _loc10_: any = 0;
        let _loc9_: any = 0;
        let _loc8_: number = 0;
        if (!PNGEncoder._SafeStr_7008) {
            PNGEncoder._SafeStr_7008 = true;
            PNGEncoder._SafeStr_5657 = [];
            _loc10_ = 0;
            while (_loc10_ < 256) {
                _loc5_ = _loc10_;
                _loc9_ = 0;
                while (_loc9_ < 8) {
                    if (_loc5_ & 1) {
                        _loc5_ = (0xEDB88320 ^ _loc5_ >>> 1) >>> 0;
                    } else {
                        _loc5_ >>>= 1;
                    }
                    _loc9_++;
                }
                PNGEncoder._SafeStr_5657[_loc10_] = _loc5_;
                _loc10_++;
            }
        }
        let _loc6_: number = 0;
        if (param3 != null) {
            _loc6_ = param3.length;
        }
        param1.writeUnsignedInt(_loc6_);
        let _loc4_: number = param1.position;
        param1.writeUnsignedInt(param2);
        if (param3 != null) {
            param1.writeBytes(param3);
        }
        let _loc7_: number = param1.position;
        param1.position = _loc4_;
        _loc5_ = 4294967295;
        _loc8_ = 0;
        while (_loc8_ < _loc7_ - _loc4_) {
            _loc5_ = (PNGEncoder._SafeStr_5657[(_loc5_ ^ param1.readUnsignedByte()) & 0xFF] ^ _loc5_ >>> 8) >>> 0;
            _loc8_++;
        }
        _loc5_ ^= 4294967295;
        param1.position = _loc7_;
        param1.writeUnsignedInt(_loc5_ >>> 0);
    }
}
