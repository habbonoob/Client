import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class ChecksumUtil {
    static { registerClassName(this, 'deng.utils::ChecksumUtil'); }

    static #staticsReady = false;

    private static get _SafeStr_5657(): any[] {
        ChecksumUtil.#initStatics();
        return ChecksumUtil._SafeStr_5657;
    }
    private static set _SafeStr_5657(value: any[]) {
        ChecksumUtil.#initStatics();
        ChecksumUtil._SafeStr_5657 = value;
    }

    constructor() {
    }

    private static makeCRCTable(): any[] {
        let _loc2_: any = 0;
        let _loc3_: any = 0;
        let _loc1_: any = 0;
        let _loc4_: any[] = [];
        _loc2_ = 0;
        while (_loc2_ < 256) {
            _loc1_ = _loc2_;
            _loc3_ = 0;
            while (_loc3_ < 8) {
                if (_loc1_ & 1) {
                    _loc1_ = (0xEDB88320 ^ _loc1_ >>> 1) >>> 0;
                } else {
                    _loc1_ >>>= 1;
                }
                _loc3_++;
            }
            _loc4_.push(_loc1_);
            _loc2_++;
        }
        return _loc4_;
    }

    public static CRC32(param1: ByteArray, param2: number = 0, param3: number = 0): number {
        let _loc5_: any = 0;
        if (param2 >= param1.length) {
            param2 = param1.length;
        }
        if (param3 == 0) {
            param3 = param1.length - param2 >>> 0;
        }
        if (param3 + param2 > param1.length) {
            param3 = param1.length - param2 >>> 0;
        }
        let _loc4_: any = 4294967295;
        _loc5_ = param2;
        while (_loc5_ < param3) {
            _loc4_ = (ChecksumUtil._SafeStr_5657[(_loc4_ ^ param1.byteAt(_loc5_)) & 0xFF] >>> 0 ^ _loc4_ >>> 8) >>> 0;
            _loc5_++;
        }
        return (_loc4_ ^ 0xFFFFFFFF) >>> 0;
    }

    public static Adler32(param1: ByteArray, param2: number = 0, param3: number = 0): number {
        if (param2 >= param1.length) {
            param2 = param1.length;
        }
        if (param3 == 0) {
            param3 = param1.length - param2 >>> 0;
        }
        if (param3 + param2 > param1.length) {
            param3 = param1.length - param2 >>> 0;
        }
        let _loc6_: any = param2;
        let _loc4_: number = 1;
        let _loc5_: number = 0;
        while (_loc6_ < param2 + param3) {
            _loc4_ = (_loc4_ + param1.byteAt(_loc6_)) % 65521 >>> 0;
            _loc5_ = (_loc4_ + _loc5_) % 65521 >>> 0;
            _loc6_++;
        }
        return (_loc5_ << 16 | _loc4_) >>> 0;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ChecksumUtil.#staticsReady) return;
        ChecksumUtil.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ChecksumUtil, name, { value, writable: true, configurable: true, enumerable: true });
        set("_SafeStr_5657", null);
        set("_SafeStr_5657", ChecksumUtil.makeCRCTable());
    }
}
