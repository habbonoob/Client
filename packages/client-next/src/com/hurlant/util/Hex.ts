import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class Hex {
    static { registerClassName(this, 'com.hurlant.util::Hex'); }

    constructor() {
    }

    public static toArray(param1: string): ByteArray {
        let _loc3_: any = 0;
        param1 = param1.replace(/^0x|\s|:/gm, "");
        let _loc2_: ByteArray = new ByteArray();
        if ((param1.length & 1) == 1) {
            param1 = "0" + param1;
        }
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc2_.setByteAt(_loc3_ / 2, parseInt(param1.substr(Number(_loc3_), 2), 16));
            _loc3_ += 2;
        }
        return _loc2_;
    }

    public static fromArray(param1: ByteArray, param2: boolean = false): string {
        let _loc4_: any = 0;
        let _loc3_: string = "";
        _loc4_ = 0;
        while (_loc4_ < param1.length) {
            _loc3_ += ("0" + param1.byteAt(_loc4_).toString(16)).substr(-2, 2);
            if (param2) {
                if (_loc4_ < param1.length - 1) {
                    _loc3_ += ":";
                }
            }
            _loc4_++;
        }
        return _loc3_;
    }

    public static toString(param1: string, param2: string = "utf-8"): string {
        let _loc3_: ByteArray = Hex.toArray(param1);
        return _loc3_.readMultiByte(_loc3_.length, param2);
    }

    public static toRawString(param1: string): string {
        return Hex.toString(param1, "iso-8859-1");
    }

    public static fromString(param1: string, param2: boolean = false, param3: string = "utf-8"): string {
        let _loc4_: ByteArray = new ByteArray();
        _loc4_.writeMultiByte(param1, param3);
        return Hex.fromArray(_loc4_, param2);
    }

    public static fromRawString(param1: string, param2: boolean = false): string {
        return Hex.fromString(param1, param2, "iso-8859-1");
    }
}
