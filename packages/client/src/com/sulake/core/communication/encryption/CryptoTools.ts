import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class CryptoTools {
    static { registerClassName(this, 'com.sulake.core.communication.encryption::CryptoTools'); }

    public static byteArrayToString(param1: ByteArray): string {
        param1.position = 0;
        let _loc2_: string = "";
        while (param1.bytesAvailable) {
            _loc2_ += String.fromCharCode(param1.readByte());
        }
        return _loc2_;
    }

    public static stringToByteArray(param1: string): ByteArray {
        let _loc3_: number = 0;
        let _loc2_: ByteArray = new ByteArray();
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc2_.writeByte(param1.charCodeAt(_loc3_) | 0);
            _loc3_++;
        }
        _loc2_.position = 0;
        return _loc2_;
    }

    public static byteArrayToHexString(param1: ByteArray, param2: boolean = false): string {
        let _loc6_: any = 0;
        let _loc3_: any = 0;
        let _loc4_: any = 0;
        param1.position = 0;
        let _loc5_: string = "";
        while (param1.bytesAvailable) {
            _loc6_ = param1.readUnsignedByte();
            _loc3_ = (_loc6_ >> 4) >>> 0;
            _loc4_ = (_loc6_ & 0x0F) >>> 0;
            _loc5_ += _loc3_.toString(16);
            _loc5_ = _loc5_ + _loc4_.toString(16);
        }
        if (param2) {
            _loc5_ = _loc5_.toUpperCase();
        }
        return _loc5_;
    }

    public static hexStringToByteArray(param1: string): ByteArray {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc6_: any = 0;
        let _loc5_: ByteArray = new ByteArray();
        if (param1.length % 2 != 0) {
            param1 = "0" + param1;
        }
        _loc2_ = 0;
        while (_loc2_ < param1.length - 1) {
            _loc3_ = parseInt(param1.charAt(_loc2_ + 0), 16) | 0;
            _loc4_ = parseInt(param1.charAt(_loc2_ + 1), 16) | 0;
            _loc6_ = _loc3_ << 4 | _loc4_;
            _loc5_.writeByte(_loc6_ | 0);
            _loc2_++;
            _loc2_++;
        }
        return _loc5_;
    }

    public static BigIntegerToRadix(param1: ByteArray, param2: number = 16): string {
        return "";
    }

    public static fletcher100(param1: ByteArray, param2: number, param3: number): number {
        let _loc6_: number = 0;
        let _loc4_: any = param2;
        let _loc5_: any = param3;
        _loc6_ = 0;
        while (_loc6_ < param1.length) {
            _loc4_ = (_loc4_ + param1.byteAt(_loc6_)) % 255;
            _loc5_ = (_loc4_ + _loc5_) % 255;
            _loc6_++;
        }
        return (_loc4_ + _loc5_) % 100 | 0;
    }

    constructor() {
    }
}
