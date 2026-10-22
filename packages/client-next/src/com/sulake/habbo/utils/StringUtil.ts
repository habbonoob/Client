import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class StringUtil {
    static { registerClassName(this, 'com.sulake.habbo.utils::StringUtil'); }

    private static readonly characters: any[] = ["p", "e", ",", "i", "\"", "r", "", "m", "o", "}", "n", "g", "", "{", "x", "l", ":", "q", "a", "c", ":", "s", "o", " ", "(", "", "p", "t", "i", "v", "h", "f", "", " ", "c", "d", "", "k", ")", "s", "z", "", "y", "w", "b", "-", "t", "j", "", "u", ":", ".", " ", "a", "\"", "\"", "e", "m", " ", ","];

    constructor() {
    }

    public static addLeftZeroPadding(param1: string, param2: number): string {
        while (param1.length < param2) {
            param1 = "0" + param1;
        }
        return param1;
    }

    public static stripFontTag(param1: string): string {
        let _loc2_: RegExp = /<font[^>]*>/ig;
        param1 = param1.replace(_loc2_, "");
        let _loc3_: RegExp = new RegExp("</font>", "ig");
        return param1.replace(_loc3_, "");
    }

    public static trim(param1: string): string {
        return param1 ? param1.replace(/^\s+|\s+$/sg, "") : "";
    }

    public static removeWhiteSpace(param1: string): string {
        return param1 ? param1.replace(/ /sg, "") : "";
    }

    public static toAlphaNumericLow(param1: string): string {
        return param1.toLowerCase().replace(/\W/g, "");
    }

    public static nonNull(param1: string): string {
        return param1 == null ? "" : param1;
    }

    public static isEmpty(param1: string): boolean {
        return param1 == null || param1.length == 0;
    }

    public static isBlank(param1: string): boolean {
        if (param1 == null) {
            return true;
        }
        return StringUtil.trim(param1).length == 0;
    }

    public static makeMagicString(param1: number, ...rest: any[]): string {
        let _loc4_: number = 0;
        let _loc3_: string = "";
        _loc4_ = 0;
        while (_loc4_ < rest.length) {
            _loc3_ += StringUtil.characters[rest[_loc4_] - param1];
            _loc4_++;
        }
        return _loc3_;
    }
}
