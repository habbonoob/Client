import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class CRC32Generator {
    static { registerClassName(this, 'com.probertson.utils::CRC32Generator'); }

    private static _SafeStr_5843: any[];
    private static _SafeStr_6760: boolean = false;

    constructor() {
    }

    private static makeCRCTable(): void {
        let _loc1_: any = 0;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        CRC32Generator._SafeStr_5843 = new Array(256);
        _loc2_ = 0;
        while (_loc2_ < 256) {
            _loc1_ = _loc2_ >>> 0;
            _loc3_ = 0;
            while (_loc3_ < 8) {
                if ((_loc1_ & 1) != 0) {
                    _loc1_ = (0xEDB88320 ^ _loc1_ >>> 1) >>> 0;
                } else {
                    _loc1_ >>>= 1;
                }
                _loc3_++;
            }
            CRC32Generator._SafeStr_5843[_loc2_] = _loc1_;
            _loc2_++;
        }
        CRC32Generator._SafeStr_6760 = true;
    }

    public generateCRC32(param1: ByteArray): number {
        let _loc4_: number = 0;
        if (!CRC32Generator._SafeStr_6760) {
            CRC32Generator.makeCRCTable();
        }
        let _loc2_: any = 4294967295;
        let _loc3_: number = param1.length | 0;
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = (CRC32Generator._SafeStr_5843[(_loc2_ ^ param1.byteAt(_loc4_)) & 0xFF] ^ _loc2_ >>> 8) >>> 0;
            _loc4_++;
        }
        _loc2_ = ~_loc2_ >>> 0;
        return (_loc2_ & 0xFFFFFFFF) >>> 0;
    }
}
