import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { BinarySearchTest } from '@/com/sulake/habbo/navigator/BinarySearchTest';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { CutToHeight } from '@/com/sulake/habbo/navigator/CutToHeight';
import { CutToWidth } from '@/com/sulake/habbo/navigator/CutToWidth';

export class Util {
    static { registerClassName(this, 'com.sulake.habbo.navigator::Util'); }

    static #staticsReady = false;

    private static get CUT_TO_WIDTH(): CutToWidth {
        Util.#initStatics();
        return Util.CUT_TO_WIDTH;
    }
    private static set CUT_TO_WIDTH(value: CutToWidth) {
        Util.#initStatics();
        Util.CUT_TO_WIDTH = value;
    }

    private static get CUT_TO_HEIGHT(): CutToHeight {
        Util.#initStatics();
        return Util.CUT_TO_HEIGHT;
    }
    private static set CUT_TO_HEIGHT(value: CutToHeight) {
        Util.#initStatics();
        Util.CUT_TO_HEIGHT = value;
    }

    constructor() {
    }

    public static remove(param1: any[], param2: any): number {
        let _loc3_: number = param1.indexOf(param2);
        if (_loc3_ >= 0) {
            param1.splice(_loc3_, 1);
        }
        return _loc3_;
    }

    public static getLocationRelativeTo(param1: IWindow, param2: number, param3: number): Rectangle {
        if (param1 == null) {
            return new Rectangle(300, 200, param2, param3);
        }
        let _loc4_: number = param1.width - param2;
        let _loc5_: number = param1.height - param3;
        return new Rectangle(param1.x + 0.5 * _loc4_, param1.y + 0.5 * _loc5_, param2, param3);
    }

    public static getLowestPoint(param1: IWindowContainer): number {
        let _loc2_: number = 0;
        let _loc4_: IWindow = null;
        let _loc3_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            _loc4_ = param1.getChildAt(_loc2_);
            if (_loc4_.visible) {
                _loc3_ = Math.max(_loc3_, _loc4_.y + _loc4_.height) | 0;
            }
            _loc2_++;
        }
        return _loc3_;
    }

    public static hasVisibleChildren(param1: IWindowContainer): boolean {
        let _loc2_: number = 0;
        let _loc3_: IWindow = null;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            _loc3_ = param1.getChildAt(_loc2_);
            if (_loc3_.visible) {
                return true;
            }
            _loc2_++;
        }
        return false;
    }

    public static hideChildren(param1: IWindowContainer): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            param1.getChildAt(_loc2_).visible = false;
            _loc2_++;
        }
    }

    public static moveChildrenToRow(param1: IWindowContainer, param2: any[], param3: number, param4: number, param5: number): void {
        let _loc7_: IWindow = null;
        for (const _loc6_ of param2 ?? []) {
            _loc7_ = param1.getChildByName(stringOrNull(_loc6_));
            if (_loc7_ != null && _loc7_.visible) {
                _loc7_.x = param3;
                _loc7_.y = param4;
                param3 += _loc7_.width + param5;
            }
        }
    }

    public static moveChildrenToColumn(param1: IWindowContainer, param2: any[], param3: number, param4: number): void {
        let _loc6_: IWindow = null;
        for (const _loc5_ of param2 ?? []) {
            _loc6_ = param1.getChildByName(stringOrNull(_loc5_));
            if (_loc6_ != null && _loc6_.visible && _loc6_.height > 0) {
                _loc6_.y = param3;
                param3 += _loc6_.height + param4;
            }
        }
    }

    public static layoutChildrenInArea(param1: IWindowContainer, param2: number, param3: number, param4: number = 0, param5: number = 0): void {
        let _loc8_: number = 0;
        let _loc9_: IWindow = null;
        let _loc6_: number = param5;
        let _loc7_: number = 0;
        _loc8_ = 0;
        while (_loc8_ < param1.numChildren) {
            _loc9_ = param1.getChildAt(_loc8_);
            if (_loc9_.visible) {
                if (_loc6_ > 0 && _loc6_ + _loc9_.width > param2) {
                    _loc6_ = 0;
                    _loc7_ += param3;
                }
                _loc9_.x = _loc6_;
                _loc9_.y = _loc7_;
                _loc6_ += _loc9_.width + param4;
            }
            _loc8_++;
        }
    }

    public static setProc(param1: IWindowContainer, param2: string, param3: (...args: any[]) => any): void {
        let _loc4_: IWindow = param1.findChildByName(param2);
        _loc4_.setParamFlag(1, true);
        _loc4_.procedure = param3;
    }

    public static setProcDirectly(param1: IWindow, param2: (...args: any[]) => any): void {
        param1.setParamFlag(1, true);
        param1.procedure = param2;
    }

    public static trim(param1: string): string {
        if (param1 == null || param1.length < 1) {
            return param1;
        }
        while (param1.charAt(0) == " ") {
            param1 = param1.substring(1);
        }
        while (param1.charAt(param1.length - 1) == " ") {
            param1 = param1.substring(0, param1.length - 1);
        }
        return param1;
    }

    public static cutTextToWidth(param1: ITextWindow, param2: string, param3: number): void {
        param1.text = param2;
        if (param1.textWidth <= param3) {
            return;
        }
        Util.CUT_TO_WIDTH.beforeSearch(param2, param1, param3);
        Util.binarySearch(Util.CUT_TO_WIDTH, param2.length - 1);
    }

    public static binarySearch(param1: BinarySearchTest, param2: number): void {
        let _loc5_: number = 0;
        let _loc4_: boolean = false;
        let _loc3_: number = 0;
        let _loc6_: number = 0;
        while (_loc3_ < param2) {
            _loc5_ = _loc3_ + Math.floor((param2 - _loc3_) / 2) | 0;
            _loc4_ = param1.test(_loc5_);
            if (_loc4_) {
                param2 = _loc5_ - 1;
            } else {
                _loc6_ = Math.max(_loc6_, _loc5_) | 0;
                _loc3_ = _loc5_ + 1;
            }
        }
        param1.test(_loc6_);
    }

    public static containsMouse(param1: IWindow): boolean {
        let _loc2_: Point = new Point();
        param1.getRelativeMousePosition(_loc2_);
        return _loc2_.x >= 0 && _loc2_.y >= 0 && _loc2_.x < param1.width && _loc2_.y < param1.height;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (Util.#staticsReady) return;
        Util.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(Util, name, { value, writable: true, configurable: true, enumerable: true });
        set("CUT_TO_WIDTH", null);
        set("CUT_TO_HEIGHT", null);
        set("CUT_TO_WIDTH", new CutToWidth());
        set("CUT_TO_HEIGHT", new CutToHeight());
    }
}
