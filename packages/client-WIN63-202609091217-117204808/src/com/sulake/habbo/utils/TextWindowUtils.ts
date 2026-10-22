import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';

export class TextWindowUtils {
    static { registerClassName(this, 'com.sulake.habbo.utils::TextWindowUtils'); }

    constructor() {
    }

    public static setHTMLLinkStyle(param1: ITextWindow, param2: number, param3: number, param4: number, param5: boolean = true): void {
        if (!param1) {
            return;
        }
        let _loc10_: StyleSheet = new StyleSheet();
        let _loc6_: any = {};
        _loc6_.color = TextWindowUtils.toHexString(param2);
        let _loc7_: any = {};
        if (param5) {
            _loc7_.textDecoration = "underline";
        }
        _loc7_.color = TextWindowUtils.toHexString(param3);
        let _loc9_: any = {};
        _loc9_.color = TextWindowUtils.toHexString(param4);
        let _loc8_: any = {};
        _loc8_.textDecoration = "underline";
        _loc10_.setStyle("a:link", _loc7_);
        _loc10_.setStyle("a:hover", _loc6_);
        _loc10_.setStyle("a:active", _loc9_);
        _loc10_.setStyle(".visited", _loc8_);
        param1.styleSheet = _loc10_;
    }

    public static toHexString(param1: number): string {
        let _loc2_: string = param1.toString(16);
        while (_loc2_.length < 6) {
            _loc2_ = "0" + _loc2_;
        }
        return "#" + _loc2_;
    }
}
