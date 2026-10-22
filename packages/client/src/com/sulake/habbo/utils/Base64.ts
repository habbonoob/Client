import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class Base64 {
    static { registerClassName(this, 'com.sulake.habbo.utils::Base64'); }

    static #staticsReady = false;

    private static get _decodeChars(): number[] {
        Base64.#initStatics();
        return Base64._decodeChars;
    }

    public static decode(param1: string): string {
        let _loc2_: ByteArray = Base64.decodeToByteArray(param1);
        return _loc2_.readUTFBytes(_loc2_.length);
    }

    public static decodeToByteArray(param1: string): ByteArray {
        let _loc8_: number = 0;
        let _loc9_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc7_: number = 0;
        let _loc4_: number = param1.length;
        let _loc5_: ByteArray = new ByteArray();
        _loc5_.writeUTFBytes(param1);
        let _loc6_: number = 0;
        while (_loc7_ < _loc4_) {
            _loc8_ = Base64._decodeChars[_loc5_.byteAt(_loc7_++) | 0];
            if (_loc8_ == -1) {
                break;
            }
            _loc9_ = Base64._decodeChars[_loc5_.byteAt(_loc7_++) | 0];
            if (_loc9_ == -1) {
                break;
            }
            _loc5_.setByteAt(_loc6_++, _loc8_ << 2 | (_loc9_ & 0x30) >> 4);
            _loc2_ = _loc5_.byteAt(_loc7_++) | 0;
            if (_loc2_ == 61) {
                break;
            }
            _loc2_ = Base64._decodeChars[_loc2_];
            if (_loc2_ == -1) {
                break;
            }
            _loc5_.setByteAt(_loc6_++, (_loc9_ & 0x0F) << 4 | (_loc2_ & 0x3C) >> 2);
            _loc3_ = _loc5_.byteAt(_loc7_++) | 0;
            if (_loc3_ == 61) {
                break;
            }
            _loc3_ = Base64._decodeChars[_loc3_];
            if (_loc3_ == -1) {
                break;
            }
            _loc5_.setByteAt(_loc6_++, (_loc2_ & 3) << 6 | _loc3_);
        }
        _loc5_.length = _loc6_ >>> 0;
        _loc5_.position = 0;
        return _loc5_;
    }

    private static _initEncoreChar(): number[] {
        let _loc1_: number = 0;
        let _loc2_: number[] = new Array<number>(64).fill(0);
        let _loc3_: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        _loc1_ = 0;
        while (_loc1_ < 64) {
            _loc2_[_loc1_] = _loc3_.charCodeAt(_loc1_) | 0;
            _loc1_++;
        }
        return _loc2_;
    }

    private static _initDecodeChar(): number[] {
        return [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    }

    constructor() {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (Base64.#staticsReady) return;
        Base64.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(Base64, name, { value, writable: true, configurable: true, enumerable: true });
        set("_decodeChars", null);
        set("_decodeChars", Base64._initDecodeChar());
    }
}
