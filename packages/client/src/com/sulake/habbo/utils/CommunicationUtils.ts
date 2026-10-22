import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { SharedObject } from '@habbo-pixi/runtime/net/SharedObject';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import { Font } from '@habbo-pixi/runtime/text/Font';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { MD5 } from '@/com/hurlant/crypto/hash/MD5';
import { Hex } from '@/com/hurlant/util/Hex';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class CommunicationUtils {
    static { registerClassName(this, 'com.sulake.habbo.utils::CommunicationUtils'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        CommunicationUtils.#initStatics();
        return CommunicationUtils._log;
    }

    public static readonly SOL_PROPERTY_ENVIRONMENT: string = "environment";
    public static readonly SOL_PROPERTY_LOGIN_NAME: string = "login";
    public static readonly SOL_PROPERTY_CHARACTER_ID: string = "userid";
    public static readonly SOL_PROPERTY_CHARACTER_UNIQUE_ID: string = "useruniqueid";
    public static readonly SOL_PROPERTY_REMEMBER_LOGIN: string = "autologin";
    public static readonly SOL_PROPERTY_LOGIN_METHOD: string = "loginmethod";
    public static readonly SOL_PROPERTY_MACHINE_ID: string = "machineid";
    public static readonly SOL_PROPERTY_APP_RATER_STATUS: string = "ratingstatus";
    public static readonly SOL_PROPERTY_APP_RATER_TIMESTAMP: string = "ratingstatustime";
    public static readonly LOGIN_METHOD_HABBO: string = "habbo";
    public static readonly _SafeStr_8104: string = "facebook";
    private static readonly SOL_ID: string = "fuselogin";
    private static readonly SOL_PROPERTY_PASSWORD: string = "password";
    private static _forcedAutoLoginEnabled: boolean = false;

    public static get forcedAutoLoginEnabled(): boolean {
        return CommunicationUtils._forcedAutoLoginEnabled;
    }

    public static set forcedAutoLoginEnabled(param1: boolean) {
        CommunicationUtils._forcedAutoLoginEnabled = param1;
    }

    public static clearAllLoginData(): void {
        CommunicationUtils.writeSOLProperty("loginmethod", null);
        CommunicationUtils.writeSOLProperty("environment", null);
        CommunicationUtils.writeSOLProperty("userid", null);
        CommunicationUtils.writeSOLProperty("autologin", null);
        CommunicationUtils.forcedAutoLoginEnabled = false;
    }

    public static resetPassword(): void {
        CommunicationUtils.writeSOLProperty("password", "");
    }

    public static restorePassword(): string {
        let _loc1_: string = null;
        if (!_loc1_) {
            _loc1_ = CommunicationUtils.readSOLString("password", "");
        }
        return _loc1_;
    }

    public static propertyExists(param1: string): boolean {
        let _loc3_: SharedObject = null;
        let _loc2_: any = null;
        try {
            _loc3_ = SharedObject.getLocal("fuselogin", "/");
            _loc2_ = _loc3_.data[param1];
            if (_loc2_ == null) {
                return false;
            }
            return true;
        } catch (e) {
        }
        return false;
    }

    public static writeSOLProperty(param1: string, param2: any): void {
        let _loc3_: SharedObject = null;
        try {
            _loc3_ = SharedObject.getLocal("fuselogin", "/");
            _loc3_.data[param1] = param2;
            _loc3_.flush();
        } catch (e) {
            CommunicationUtils._log.error("Error writing SOL propert \'" + param1 + "\' with value \'" + param2 + "\'");
        }
    }

    public static readSOLProperty(param1: string, param2: any = null): any {
        let _loc4_: SharedObject = null;
        let _loc3_: any = null;
        try {
            _loc4_ = SharedObject.getLocal("fuselogin", "/");
            _loc3_ = _loc4_.data[param1];
            if (_loc3_ == null) {
                _loc3_ = param2;
            }
            if (param1 == "environment" && _loc3_) {
                _loc3_ = _loc3_.replace("hh", "");
                _loc3_ = _loc3_.replace("br", "pt");
                _loc3_ = _loc3_.replace("us", "en");
            }
            return _loc3_;
        } catch (e) {
            CommunicationUtils._log.error("Error reading SOL property \'" + param1 + "\'");
        }
        return param2;
    }

    public static readSOLString(param1: string, param2: string = null): string {
        let _loc3_: any = CommunicationUtils.readSOLProperty(param1, param2);
        if (!_loc3_) {
            return null;
        }
        return String(_loc3_);
    }

    public static readSOLBoolean(param1: string, param2: string = null): boolean {
        let _loc3_: string = String(CommunicationUtils.readSOLProperty(param1, param2));
        return _loc3_ != null && (_loc3_.toLowerCase() == "true" || _loc3_ == "1");
    }

    public static readSOLInteger(param1: string, param2: string = null): number {
        let _loc3_: any = CommunicationUtils.readSOLProperty(param1, param2);
        return parseInt(String(_loc3_)) | 0;
    }

    public static readSOLFloat(param1: string, param2: string = null): number {
        let _loc3_: any = CommunicationUtils.readSOLProperty(param1, param2);
        return parseFloat(String(_loc3_));
    }

    public static decodeFromBitmap(param1: BitmapData): string {
        let _loc18_: number = 0;
        let _loc17_: number = 0;
        let _loc5_: any = 0;
        let _loc6_: number = 0;
        let _loc3_: any = 0;
        let _loc9_: any = 0;
        let _loc15_: number = 4;
        let _loc4_: Point = new Point(4, 39);
        let _loc2_: Point = new Point(80, 30);
        let _loc14_: ByteArray = param1.getPixels(param1.rect);
        let _loc16_: number = param1.width;
        let _loc7_: string = "";
        let _loc12_: number = 0;
        let _loc19_: number = 0;
        let _loc13_: number = 0;
        let _loc8_: number = 0;
        if (_loc15_ == 4) {
            _loc8_ = 1;
        }
        let _loc10_: number = _loc4_.y + _loc2_.y | 0;
        let _loc11_: number = _loc4_.x + _loc2_.x | 0;
        _loc18_ = _loc4_.y | 0;
        while (_loc18_ < _loc10_) {
            _loc17_ = _loc4_.x | 0;
            while (_loc17_ < _loc11_) {
                _loc5_ = ((_loc18_ + _loc13_) * _loc16_ + _loc17_) * _loc15_ >>> 0;
                _loc6_ = _loc8_ | 0;
                while (_loc6_ < _loc15_) {
                    _loc14_.position = _loc5_ + _loc6_ >>> 0;
                    _loc3_ = _loc14_.readUnsignedByte();
                    _loc9_ = (_loc3_ & 1) >>> 0;
                    _loc19_ |= _loc9_ << 7 - _loc12_;
                    if (_loc12_ == 7) {
                        _loc7_ += String.fromCharCode(_loc19_);
                        _loc19_ = 0;
                        _loc12_ = 0;
                    } else {
                        _loc12_++;
                    }
                    _loc6_++;
                }
                if (_loc17_ % 2 == 0) {
                    _loc13_++;
                }
                _loc17_++;
            }
            _loc13_ = 0;
            _loc18_++;
        }
        return _loc7_;
    }

    public static xor(param1: string, param2: string): string {
        let _loc7_: number = 0;
        let _loc5_: any = 0;
        let _loc3_: string = "";
        let _loc6_: number = 0;
        let _loc4_: number = param1.length;
        _loc7_ = 0;
        while (_loc7_ < _loc4_) {
            _loc5_ = param1.charCodeAt(_loc7_) >>> 0;
            _loc3_ += String.fromCharCode(_loc5_ ^ param2.charCodeAt(_loc6_));
            if (++_loc6_ == param2.length) {
                _loc6_ = 0;
            }
            _loc7_++;
        }
        return _loc3_;
    }

    public static generateFingerprint(): string {
        let _loc8_: string = null;
        let _loc4_: string = null;
        let _loc2_: string = null;
        let _loc5_: string = null;
        let _loc9_: any[] = null;
        let _loc1_: any[] = null;
        let _loc3_: string = null;
        let _loc6_: string = null;
        let _loc11_: ByteArray = null;
        let _loc12_: MD5 = null;
        let _loc7_: string = null;
        try {
            if (ExternalInterface.available) {
                _loc8_ = stringOrNull(ExternalInterface.call("window.navigator.userAgent.toString"));
                _loc4_ = stringOrNull(ExternalInterface.call("FlashExternalInterface.listPlugins"));
            }
            _loc2_ = Capabilities.serverString;
            _loc5_ = String(new Date().getTimezoneOffset());
            _loc9_ = Font.enumerateFonts(true);
            _loc1_ = [];
            for (const _loc10_ of _loc9_ ?? []) {
                if (!(_loc10_.fontType == "embedded" || _loc10_.fontStyle != "regular")) {
                    _loc1_.push(_loc10_.fontName);
                }
            }
            _loc3_ = _loc1_.join(",");
            _loc6_ = _loc8_ + "#" + _loc2_ + "#" + _loc5_ + "#" + _loc4_ + "#" + _loc3_;
            _loc11_ = new ByteArray();
            _loc11_.writeUTFBytes(_loc6_);
            _loc12_ = new MD5();
            _loc7_ = Hex.fromArray(_loc12_.hash(_loc11_), false);
            if (!_loc4_ || _loc4_.length == 0) {
                return "~" + _loc7_;
            }
            return _loc7_;
        } catch (e) {
        }
        return "";
    }

    public static generateRandomHexString(param1: number = 16): string {
        let _loc4_: number = 0;
        let _loc3_: any = 0;
        let _loc2_: string = "";
        _loc4_ = 0;
        while (_loc4_ < param1) {
            _loc3_ = Math.random() * 255;
            _loc2_ += _loc3_.toString(16);
            _loc4_++;
        }
        return _loc2_;
    }

    public static removeProtocol(param1: string): string {
        param1 = param1.replace("http://", "");
        return param1.replace("https://", "");
    }

    constructor() {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (CommunicationUtils.#staticsReady) return;
        CommunicationUtils.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(CommunicationUtils, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.utils.CommunicationUtils"));
    }
}
