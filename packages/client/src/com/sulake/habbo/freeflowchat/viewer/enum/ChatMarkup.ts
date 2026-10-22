import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ChatMarkup {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.enum::ChatMarkup'); }

    static #staticsReady = false;

    public static readonly COLOUR_ARRAY: any[] = [["red", 9115929], ["cyan", 32639], ["blue", 19609], ["green", 32768], ["purple", 4980812]];
    public static readonly _SafeStr_6325: any[] = [["red", 16738922], ["cyan", 5233370], ["blue", 6269183], ["green", 6738794], ["purple", 11767039]];

    public static get COLOUR_NAMES(): any[] {
        ChatMarkup.#initStatics();
        return ChatMarkup.COLOUR_NAMES;
    }

    public static applyColourToChat(param1: string, param2: number): string {
        let _loc3_: string = null;
        let _loc6_: string = null;
        let _loc5_: any[] = ChatMarkup.getColourArray(param2);
        for (const _loc4_ of _loc5_ ?? []) {
            if (param1.indexOf("@" + _loc4_[0] + "@") == 0) {
                _loc3_ = "#" + _loc4_[1].toString(16).toUpperCase();
                _loc6_ = param1.substring(Number(_loc4_[0].length + 2), param1.length);
                if (_loc6_.charAt(0) == " ") {
                    _loc6_ = _loc6_.substr(1);
                }
                return "<font color=\"" + _loc3_ + "\">" + _loc6_ + "</font>";
            }
        }
        return param1;
    }

    public static tokenize(param1: string): any[] {
        let _loc4_: number = 0;
        let _loc3_: string = null;
        let _loc2_: any[] = [];
        let _loc5_: string = "";
        let _loc6_: boolean = false;
        _loc4_ = 0;
        while (_loc4_ < param1.length) {
            _loc3_ = param1.charAt(_loc4_);
            if (_loc3_ == "[") {
                if (_loc5_.length > 0) {
                    _loc2_.push(_loc5_);
                    _loc5_ = "";
                }
                _loc6_ = true;
                _loc5_ += _loc3_;
            } else if (_loc3_ == "]" && _loc6_) {
                _loc5_ += _loc3_;
                _loc2_.push(_loc5_);
                _loc5_ = "";
                _loc6_ = false;
            } else {
                _loc5_ += _loc3_;
            }
            _loc4_++;
        }
        if (_loc5_.length > 0) {
            _loc2_.push(_loc5_);
        }
        return _loc2_;
    }

    public static applyToElements(param1: string, param2: number): string {
        let _loc7_: number = 0;
        let _loc10_: string = null;
        let _loc8_: string = null;
        let _loc9_: any = false;
        let _loc4_: any = null;
        let _loc3_: string = null;
        if (param1.length == 0) {
            return "";
        }
        let _loc5_: any[] = ChatMarkup.tokenize(param1);
        let _loc6_: any[] = [];
        _loc7_ = 0;
        while (_loc7_ < _loc5_.length) {
            _loc10_ = stringOrNull(_loc5_[_loc7_]);
            if (_loc10_.charAt(0) == "[" && _loc10_.charAt(_loc10_.length - 1) == "]" && (_loc10_.charAt(1) == "/" || _loc10_.length > 2 && _loc10_.length <= 10)) {
                _loc8_ = _loc10_.substring(1, _loc10_.length - 1).toLowerCase();
                _loc9_ = _loc8_.charAt(0) == "/";
                if (_loc9_) {
                    _loc8_ = _loc8_.substr(1);
                    if (_loc6_.length > 0 && _loc6_[_loc6_.length - 1].tag == _loc8_) {
                        _loc4_ = _loc6_.pop();
                        if (_loc8_ == "b" || _loc8_ == "i" || _loc8_ == "u") {
                            _loc5_[_loc4_.index] = "<" + _loc8_ + ">";
                            _loc5_[_loc7_] = "</" + _loc8_ + ">";
                        } else {
                            _loc3_ = ChatMarkup.getHexColorForTag(_loc8_, param2);
                            if (_loc3_ != null) {
                                _loc5_[_loc4_.index] = "<font color=\"" + _loc3_ + "\">";
                                _loc5_[_loc7_] = "</font>";
                            }
                        }
                    }
                } else if (_loc8_ == "b" || _loc8_ == "i" || _loc8_ == "u" || ChatMarkup.COLOUR_NAMES.indexOf(_loc8_) != -1) {
                    _loc6_.push({ "tag": _loc8_, "index": _loc7_ });
                }
            }
            _loc7_++;
        }
        return _loc5_.join("");
    }

    private static getColourArray(param1: number): any[] {
        return param1 == 16777215 ? ChatMarkup._SafeStr_6325 : ChatMarkup.COLOUR_ARRAY;
    }

    private static getHexColorForTag(param1: string, param2: number): string {
        let _loc3_: any[] = ChatMarkup.getColourArray(param2);
        for (const _loc4_ of _loc3_ ?? []) {
            if (_loc4_[0] == param1) {
                return "#" + _loc4_[1].toString(16).toUpperCase();
            }
        }
        return null;
    }

    constructor() {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ChatMarkup.#staticsReady) return;
        ChatMarkup.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ChatMarkup, name, { value, writable: true, configurable: true, enumerable: true });
        set("COLOUR_NAMES", null);
        set("COLOUR_NAMES", ((): any[] => {
            let _loc1_: any[] = [];
            for (const _loc2_ of ChatMarkup.COLOUR_ARRAY ?? []) {
                _loc1_.push(_loc2_[0]);
            }
            return _loc1_;
        })());
    }
}
