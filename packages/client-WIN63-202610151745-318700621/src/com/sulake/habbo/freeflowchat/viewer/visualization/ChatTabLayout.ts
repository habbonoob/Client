import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import type { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import type { TextLineMetrics } from '@habbo-pixi/runtime/text/TextLineMetrics';

export class ChatTabLayout {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.visualization::ChatTabLayout'); }

    private static readonly COLUMN_GAP: number = 8;
    private static readonly LITERAL_TAB_SPACES: string = "    ";
    private static readonly MEASUREMENT_GUARD_BASE: string = "|";

    constructor() {
    }

    public static apply(param1: TextField, param2: string, param3: TextFormat, param4: StyleSheet, param5: number, param6: number, param7: boolean): void {
        if (!param7) {
            if (param3.tabStops == null) {
                param3.tabStops = [];
            }
            ChatTabLayout.configureTextField(param1, param3, param4, param5, true);
            param1.htmlText = param2;
            return;
        }
        let _loc9_: string = param2.split("\t").join("    ").replace(/\r\n?/g, "\n");
        let _loc8_: any = ChatTabLayout.calculateLayout(param1, _loc9_, param3, param4, param5, param6);
        param3.tabStops = _loc8_.tabStops;
        ChatTabLayout.configureTextField(param1, param3, param4, param5, true);
        param1.htmlText = ChatTabLayout.createRenderedHtml(_loc9_, _loc8_.terminalRows);
    }

    private static calculateLayout(param1: TextField, param2: string, param3: TextFormat, param4: StyleSheet, param5: number, param6: number): any {
        let _loc12_: any;
        let _loc16_: any[] = null;
        let _loc19_: number = 0;
        let _loc9_: number = 0;
        let _loc15_: number = NaN;
        let _loc10_: any[] = param2.split("\n");
        let _loc11_: any[] = [];
        let _loc18_: any[] = [];
        for (const _loc20_ of _loc10_ ?? []) {
            _loc16_ = _loc20_.split("<chat-table-tab/>");
            _loc11_.push(_loc16_);
            for (_loc12_ of _loc16_ ?? []) {
                _loc18_.push(_loc12_);
            }
        }
        let _loc7_: string = ChatTabLayout.createMeasurementGuard(param2);
        let _loc14_: string = _loc18_.join(_loc7_ + "\n") + _loc7_;
        param3.tabStops = [];
        ChatTabLayout.configureTextField(param1, param3, param4, param5, false);
        param1.htmlText = _loc14_;
        let _loc23_: any[] = [];
        let _loc13_: any[] = [];
        let _loc8_: number = 0;
        _loc19_ = 0;
        while (_loc19_ < _loc11_.length) {
            _loc16_ = _loc11_[_loc19_];
            _loc9_ = 0;
            while (_loc9_ < _loc16_.length) {
                _loc15_ = ChatTabLayout.getCellWidth(param1, _loc8_, _loc7_);
                if (_loc9_ < _loc16_.length - 1 && (_loc23_[_loc9_] == null || _loc15_ > Number(_loc23_[_loc9_]))) {
                    _loc23_[_loc9_] = _loc15_;
                }
                if (_loc9_ == _loc16_.length - 1 && _loc16_.length > 1) {
                    _loc13_[_loc19_] = !ChatTabLayout.hasVisibleContent(param1, _loc8_, _loc7_);
                }
                _loc8_++;
                _loc9_++;
            }
            _loc19_++;
        }
        let _loc17_: number = Math.max(1, Math.round(8 * param6)) | 0;
        let _loc21_: number = 0;
        let _loc22_: any[] = [];
        _loc9_ = 0;
        while (_loc9_ < _loc23_.length) {
            _loc21_ += (Math.ceil(Number(_loc23_[_loc9_])) | 0) + _loc17_;
            _loc22_.push(_loc21_);
            _loc9_++;
        }
        return { "tabStops": _loc22_, "terminalRows": _loc13_ };
    }

    private static createMeasurementGuard(param1: string): string {
        let _loc2_: string = "|";
        while (param1.indexOf(_loc2_) != -1) {
            _loc2_ += "|";
        }
        return _loc2_;
    }

    private static getCellWidth(param1: TextField, param2: number, param3: string): number {
        let _loc7_: number = param1.getLineOffset(param2);
        let _loc8_: string = param1.getLineText(param2);
        let _loc5_: number = _loc8_.lastIndexOf(param3);
        let _loc4_: Rectangle = param1.getCharBoundaries(_loc7_ + _loc5_);
        let _loc6_: TextLineMetrics = param1.getLineMetrics(param2);
        return _loc4_ != null ? Math.max(0, _loc4_.x - _loc6_.x) : Number(Math.max(0, _loc6_.width));
    }

    private static hasVisibleContent(param1: TextField, param2: number, param3: string): boolean {
        let _loc5_: string = param1.getLineText(param2);
        let _loc4_: number = _loc5_.lastIndexOf(param3);
        return _loc5_.substring(0, _loc4_).search(/[^ \t]/) != -1;
    }

    private static createRenderedHtml(param1: string, param2: any[]): string {
        let _loc4_: number = 0;
        let _loc5_: string = null;
        let _loc3_: number = 0;
        let _loc6_: any[] = param1.split("\n");
        _loc4_ = 0;
        while (_loc4_ < _loc6_.length) {
            _loc5_ = stringOrNull(_loc6_[_loc4_]);
            if (param2[_loc4_]) {
                _loc3_ = _loc5_.lastIndexOf("<chat-table-tab/>");
                _loc5_ = _loc5_.substring(0, _loc3_) + _loc5_.substring(_loc3_ + "<chat-table-tab/>".length);
            }
            _loc6_[_loc4_] = _loc5_.split("<chat-table-tab/>").join("\t");
            _loc4_++;
        }
        return _loc6_.join("\n");
    }

    private static configureTextField(param1: TextField, param2: TextFormat, param3: StyleSheet, param4: number, param5: boolean): void {
        param1.styleSheet = null;
        param1.defaultTextFormat = param2;
        param1.styleSheet = param3;
        param1.width = param4;
        param1.wordWrap = param5;
    }
}
