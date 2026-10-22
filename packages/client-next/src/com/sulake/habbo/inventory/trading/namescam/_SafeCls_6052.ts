import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { TradingNameScamDetectionResult } from '@/com/sulake/habbo/inventory/trading/namescam/TradingNameScamDetectionResult';

export class _SafeCls_6052 {
    static { registerClassName(this, 'com.sulake.habbo.inventory.trading.namescam::_SafeCls_6052'); }

    private static readonly MAX_CASE_CHANGES: number = 2;
    private static readonly MAX_SMALL_PUNCTUATION_DEVIATIONS: number = 2;
    private static readonly ALLOWED_PUNCTUATION: string = "_-=?!@:.,;";
    private static readonly SMALL_PUNCTUATION: string = ".,:";
    private static readonly EXTRA_ALLOWED_LETTERS: string = "ÅÄÖåäöŞÇÜĞşçıüğ";
    private static _SafeStr_14311: any;
    private static readonly CONFUSABLE_GROUPS: any[] = ["0OoÖö", "1lI!", ".,", ";:", "AÅÄaåä", "CÇcç", "GĞgğ", "SŞsş", "UÜuü"];

    constructor() {
    }

    public static detect(param1: string, param2: any[], param3: any[]): TradingNameScamDetectionResult {
        return new TradingNameScamDetectionResult(_SafeCls_6052.collectMatchingNames(param1, param2), _SafeCls_6052.collectMatchingNames(param1, param3));
    }

    public static isPotentialScamName(param1: string, param2: string): boolean {
        if (param1 == null || param2 == null) {
            return false;
        }
        if (param1.length == 0 || param2.length == 0 || param1 == param2) {
            return false;
        }
        if (!_SafeCls_6052.isAllowedName(param1) || !_SafeCls_6052.isAllowedName(param2)) {
            return false;
        }
        return _SafeCls_6052.compareNames(param1, param2, 0, 0, 0, 0, {});
    }

    private static collectMatchingNames(param1: string, param2: any[]): any[] {
        let _loc4_: string = null;
        let _loc5_: string = null;
        let _loc6_: any[] = [];
        if (param2 == null || param1 == null || param1.length == 0) {
            return _loc6_;
        }
        let _loc7_: any = {};
        for (const _loc3_ of param2 ?? []) {
            _loc4_ = typeof _loc3_ === "string" ? _loc3_ : null;
            if (!(_loc4_ == null || _loc4_.length == 0 || _loc4_ == param1)) {
                _loc5_ = "name:" + _loc4_;
                if (!_loc7_[_loc5_]) {
                    if (_SafeCls_6052.isPotentialScamName(param1, _loc4_)) {
                        _loc7_[_loc5_] = true;
                        _loc6_.push(_loc4_);
                    }
                }
            }
        }
        return _loc6_;
    }

    private static compareNames(param1: string, param2: string, param3: number, param4: number, param5: number, param6: number, param7: any): boolean {
        let _loc9_: string = null;
        let _loc11_: string = null;
        if (param5 > 2 || param6 > 2) {
            return false;
        }
        let _loc10_: string = param3 + "|" + param4 + "|" + param5 + "|" + param6;
        if (param7[_loc10_] !== undefined) {
            return param7[_loc10_];
        }
        let _loc8_: boolean = false;
        if (param3 == param1.length && param4 == param2.length) {
            _loc8_ = true;
        } else if (param3 < param1.length && param4 < param2.length) {
            _loc9_ = param1.charAt(param3);
            _loc11_ = param2.charAt(param4);
            if (_loc9_ == _loc11_) {
                _loc8_ = _SafeCls_6052.compareNames(param1, param2, param3 + 1, param4 + 1, param5, param6, param7);
            } else if (_SafeCls_6052.isCaseOnlyChange(_loc9_, _loc11_)) {
                _loc8_ = _SafeCls_6052.compareNames(param1, param2, param3 + 1, param4 + 1, param5, param6 + 1, param7);
            } else if (_SafeCls_6052.areConfusable(_loc9_, _loc11_)) {
                _loc8_ = _SafeCls_6052.compareNames(param1, param2, param3 + 1, param4 + 1, param5, param6, param7);
            }
        }
        if (!_loc8_ && param3 < param1.length && _SafeCls_6052.isSmallPunctuation(param1.charAt(param3))) {
            _loc8_ = _SafeCls_6052.compareNames(param1, param2, param3 + 1, param4, param5 + 1, param6, param7);
        }
        if (!_loc8_ && param4 < param2.length && _SafeCls_6052.isSmallPunctuation(param2.charAt(param4))) {
            _loc8_ = _SafeCls_6052.compareNames(param1, param2, param3, param4 + 1, param5 + 1, param6, param7);
        }
        param7[_loc10_] = _loc8_;
        return _loc8_;
    }

    private static isAllowedName(param1: string): boolean {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.length) {
            if (!_SafeCls_6052.isAllowedCharacter(param1.charAt(_loc2_))) {
                return false;
            }
            _loc2_++;
        }
        return true;
    }

    private static isAllowedCharacter(param1: string): boolean {
        if (param1 == null || param1.length != 1) {
            return false;
        }
        let _loc2_: number = param1.charCodeAt(0) | 0;
        if (_loc2_ >= 48 && _loc2_ <= 57 || _loc2_ >= 65 && _loc2_ <= 90 || _loc2_ >= 97 && _loc2_ <= 122) {
            return true;
        }
        return "_-=?!@:.,;".indexOf(param1) >= 0 || "ÅÄÖåäöŞÇÜĞşçıüğ".indexOf(param1) >= 0;
    }

    private static isLetter(param1: string): boolean {
        if (param1 == null || param1.length != 1) {
            return false;
        }
        let _loc2_: number = param1.charCodeAt(0) | 0;
        return _loc2_ >= 65 && _loc2_ <= 90 || _loc2_ >= 97 && _loc2_ <= 122 || "ÅÄÖåäöŞÇÜĞşçıüğ".indexOf(param1) >= 0;
    }

    private static isCaseOnlyChange(param1: string, param2: string): boolean {
        if (!_SafeCls_6052.isLetter(param1) || !_SafeCls_6052.isLetter(param2) || param1 == param2) {
            return false;
        }
        return param1.toLowerCase() == param2.toLowerCase() && param1.toUpperCase() == param2.toUpperCase();
    }

    private static isSmallPunctuation(param1: string): boolean {
        return ".,:".indexOf(param1) >= 0;
    }

    private static areConfusable(param1: string, param2: string): boolean {
        if (param1 == null || param2 == null || param1 == param2) {
            return false;
        }
        let _loc5_: any = _SafeCls_6052.getConfusableGroupByCharacter();
        let _loc4_: string = stringOrNull(_loc5_[param1]);
        let _loc3_: string = stringOrNull(_loc5_[param2]);
        return _loc4_ != null && _loc4_ == _loc3_;
    }

    private static getConfusableGroupByCharacter(): any {
        let _loc1_: number = 0;
        if (_SafeCls_6052._SafeStr_14311 == null) {
            _SafeCls_6052._SafeStr_14311 = {};
            for (const _loc2_ of _SafeCls_6052.CONFUSABLE_GROUPS ?? []) {
                _loc1_ = 0;
                while (_loc1_ < _loc2_.length) {
                    _SafeCls_6052._SafeStr_14311[_loc2_.charAt(_loc1_)] = _loc2_;
                    _loc1_++;
                }
            }
        }
        return _SafeCls_6052._SafeStr_14311;
    }
}
