import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ChatMarkup {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.enum::ChatMarkup'); }

    static #staticsReady = false;

    public static readonly TABLE_TAB_MARKER: string = "<chat-table-tab/>";
    private static readonly ESCAPED_TABLE_TAB_MARKER: string = "&lt;chat-table-tab/&gt;";
    private static readonly TABLE_TAB_TAG: string = "a";
    private static readonly _SafeStr_15034: RegExp = /[ \t]+$/;
    private static readonly _SafeStr_15035: RegExp = /^[ \t]+/;
    public static readonly COLOUR_ARRAY: any[] = [["red", 9115929], ["orange", 10238720], ["yellow", 7297792], ["green", 32768], ["cyan", 32639], ["blue", 19609], ["purple", 4980812], ["pink", 10228827]];
    public static readonly _SafeStr_6325: any[] = [["red", 16745861], ["orange", 16751445], ["yellow", 16769126], ["green", 6738794], ["cyan", 5233370], ["blue", 7057151], ["purple", 12688127], ["pink", 16745919]];

    public static get COLOUR_NAMES(): any[] {
        ChatMarkup.#initStatics();
        return ChatMarkup.COLOUR_NAMES;
    }

    constructor() {
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

    public static hasTableTabMarkup(param1: string): boolean {
        let _loc2_: any[] = ChatMarkup.tokenize(param1);
        for (const _loc3_ of _loc2_ ?? []) {
            if (ChatMarkup.isOpeningTableTabToken(stringOrNull(_loc3_))) {
                return true;
            }
        }
        return false;
    }

    public static escapeTableTabMarker(param1: string): string {
        if (param1 == null) {
            return null;
        }
        return param1.split("<chat-table-tab/>").join("&lt;chat-table-tab/&gt;");
    }

    public static applyToElements(param1: string, param2: number, param3: boolean): string {
        let _loc8_: number = 0;
        let _loc11_: string = null;
        let _loc9_: string = null;
        let _loc10_: boolean = false;
        let _loc5_: any = null;
        let _loc4_: string = null;
        if (param1.length == 0) {
            return "";
        }
        if (param3) {
            param1 = ChatMarkup.escapeTableTabMarker(param1);
        }
        let _loc6_: any[] = ChatMarkup.tokenize(param1);
        let _loc7_: any[] = [];
        _loc8_ = 0;
        while (_loc8_ < _loc6_.length) {
            _loc11_ = stringOrNull(_loc6_[_loc8_]);
            if (ChatMarkup.isMarkupToken(_loc11_)) {
                _loc9_ = _loc11_.substring(1, _loc11_.length - 1).toLowerCase();
                _loc10_ = _loc9_.charAt(0) == "/";
                if (param3 && ChatMarkup.isOpeningTableTabToken(_loc11_)) {
                    ChatMarkup.trimHorizontalWhitespaceAroundTab(_loc6_, _loc8_);
                    _loc6_[_loc8_] = "<chat-table-tab/>";
                } else if (_loc10_) {
                    _loc9_ = _loc9_.substr(1);
                    if (_loc7_.length > 0 && _loc7_[_loc7_.length - 1].tag == _loc9_) {
                        _loc5_ = _loc7_.pop();
                        if (_loc9_ == "b" || _loc9_ == "i" || _loc9_ == "u") {
                            _loc6_[_loc5_.index] = "<" + _loc9_ + ">";
                            _loc6_[_loc8_] = "</" + _loc9_ + ">";
                        } else {
                            _loc4_ = ChatMarkup.getHexColorForTag(_loc9_, param2);
                            if (_loc4_ != null) {
                                _loc6_[_loc5_.index] = "<font color=\"" + _loc4_ + "\">";
                                _loc6_[_loc8_] = "</font>";
                            }
                        }
                    }
                } else if (_loc9_ == "b" || _loc9_ == "i" || _loc9_ == "u" || ChatMarkup.COLOUR_NAMES.indexOf(_loc9_) != -1) {
                    _loc7_.push({ "tag": _loc9_, "index": _loc8_ });
                }
            }
            _loc8_++;
        }
        return _loc6_.join("");
    }

    private static isMarkupToken(param1: string): boolean {
        return param1.charAt(0) == "[" && param1.charAt(param1.length - 1) == "]" && (param1.charAt(1) == "/" || param1.length > 2 && param1.length <= 10);
    }

    private static isOpeningTableTabToken(param1: string): boolean {
        return ChatMarkup.isMarkupToken(param1) && param1.charAt(1) != "/" && param1.substring(1, param1.length - 1).toLowerCase() == "a";
    }

    private static trimHorizontalWhitespaceAroundTab(param1: any[], param2: number): void {
        if (param2 > 0) {
            param1[param2 - 1] = String(param1[param2 - 1]).replace(ChatMarkup._SafeStr_15034, "");
        }
        if (param2 + 1 < param1.length) {
            param1[param2 + 1] = String(param1[param2 + 1]).replace(ChatMarkup._SafeStr_15035, "");
        }
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
