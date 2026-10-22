import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class StringUtil {
    static { registerClassName(this, 'mx.utils::StringUtil'); }

    public static readonly VERSION: string = "4.6.0.23201";

    constructor() {
    }

    public static trim(param1: string): string {
        if (param1 == null) {
            return "";
        }
        let _loc2_: number = 0;
        while (StringUtil.isWhitespace(param1.charAt(_loc2_))) {
            _loc2_++;
        }
        let _loc3_: number = param1.length - 1;
        while (StringUtil.isWhitespace(param1.charAt(_loc3_))) {
            _loc3_--;
        }
        if (_loc3_ >= _loc2_) {
            return param1.slice(_loc2_, _loc3_ + 1);
        }
        return "";
    }

    public static trimArrayElements(param1: string, param2: string): string {
        let _loc3_: any[] = null;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        if (param1 != "" && param1 != null) {
            _loc3_ = param1.split(param2);
            _loc4_ = _loc3_.length | 0;
            _loc5_ = 0;
            while (_loc5_ < _loc4_) {
                _loc3_[_loc5_] = StringUtil.trim(stringOrNull(_loc3_[_loc5_]));
                _loc5_++;
            }
            if (_loc4_ > 0) {
                param1 = _loc3_.join(param2);
            }
        }
        return param1;
    }

    public static isWhitespace(param1: string): boolean {
        switch (param1) {
            case " ":
            case "\t":
            case "\r":
            case "\n":
            case "\f":
                return true;
            default:
                return false;
        }
    }

    public static substitute(param1: string, ...rest: any[]): string {
        let _loc4_: any[] = null;
        if (param1 == null) {
            return "";
        }
        let _loc3_: number = rest.length;
        if (_loc3_ == 1 && Array.isArray(rest[0])) {
            _loc4_ = asGuarded(rest[0], Array.isArray);
            _loc3_ = _loc4_.length;
        } else {
            _loc4_ = rest;
        }
        let _loc5_: number = 0;
        while (_loc5_ < _loc3_) {
            param1 = param1.replace(new RegExp("\\{" + _loc5_ + "\\}", "g"), _loc4_[_loc5_]);
            _loc5_++;
        }
        return param1;
    }

    public static repeat(param1: string, param2: number): string {
        if (param2 == 0) {
            return "";
        }
        let _loc3_: string = param1;
        let _loc4_: number = 1;
        while (_loc4_ < param2) {
            _loc3_ += param1;
            _loc4_++;
        }
        return _loc3_;
    }

    public static restrict(param1: string, param2: string): string {
        let _loc6_: number = 0;
        if (param2 == null) {
            return param1;
        }
        if (param2 == "") {
            return "";
        }
        let _loc3_: any[] = [];
        let _loc4_: number = param1.length;
        let _loc5_: number = 0;
        while (_loc5_ < _loc4_) {
            _loc6_ = param1.charCodeAt(_loc5_) >>> 0;
            if (StringUtil.testCharacter(_loc6_, param2)) {
                _loc3_.push(_loc6_);
            }
            _loc5_++;
        }
        return stringOrNull(Reflect.apply(String.fromCharCode, null, _loc3_));
    }

    private static testCharacter(param1: number, param2: string): boolean {
        let _loc9_: number = 0;
        let _loc11_: boolean = false;
        let _loc3_: boolean = false;
        let _loc4_: boolean = false;
        let _loc5_: boolean = false;
        let _loc6_: any = true;
        let _loc7_: number = 0;
        let _loc8_: number = param2.length;
        if (_loc8_ > 0) {
            _loc9_ = param2.charCodeAt(0) >>> 0;
            if (_loc9_ == 94) {
                _loc3_ = true;
            }
        }
        let _loc10_: number = 0;
        while (_loc10_ < _loc8_) {
            _loc9_ = param2.charCodeAt(_loc10_) >>> 0;
            _loc11_ = false;
            if (!_loc4_) {
                if (_loc9_ == 45) {
                    _loc5_ = true;
                } else if (_loc9_ == 94) {
                    _loc6_ = !_loc6_;
                } else if (_loc9_ == 92) {
                    _loc4_ = true;
                } else {
                    _loc11_ = true;
                }
            } else {
                _loc11_ = true;
                _loc4_ = false;
            }
            if (_loc11_) {
                if (_loc5_) {
                    if (_loc7_ <= param1 && param1 <= _loc9_) {
                        _loc3_ = _loc6_;
                    }
                    _loc5_ = false;
                    _loc7_ = 0;
                } else {
                    if (param1 == _loc9_) {
                        _loc3_ = _loc6_;
                    }
                    _loc7_ = _loc9_;
                }
            }
            _loc10_++;
        }
        return _loc3_;
    }
}
