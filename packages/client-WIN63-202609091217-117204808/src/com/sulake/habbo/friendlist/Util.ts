import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Logger } from '@/com/sulake/habbo/Logger';

export class Util {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::Util'); }

    constructor() {
    }

    public static remove(param1: any[], param2: any): void {
        let _loc3_: number = param1.indexOf(param2);
        if (_loc3_ >= 0) {
            param1.splice(_loc3_, 1);
        }
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

    public static getRightmostPoint(param1: IWindowContainer): number {
        let _loc2_: number = 0;
        let _loc4_: IWindow = null;
        let _loc3_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            _loc4_ = param1.getChildAt(_loc2_);
            if (_loc4_.visible) {
                _loc3_ = Math.max(_loc3_, _loc4_.x + _loc4_.width) | 0;
            }
            _loc2_++;
        }
        return _loc3_;
    }

    public static arrayToString(param1: any[], param2: string = ", ", param3: string = ""): string {
        let _loc4_: string = "";
        for (const _loc5_ of param1 ?? []) {
            if (_loc4_ != "") {
                _loc4_ += param2;
            }
            _loc4_ += param3 + _loc5_ + param3;
        }
        return _loc4_;
    }

    public static print(param1: string, param2: IWindow): void {
        let _loc3_: number = 0;
        Logger.log(param1 + param2 + " (" + param2.width + ", " + param2.height + "), " + param2.getParamFlag(16));
        let _loc4_: IWindowContainer = isIWindowContainer(param2) ? param2 : null;
        if (_loc4_ != null) {
            _loc3_ = 0;
            while (_loc3_ < _loc4_.numChildren) {
                Util.print(param1 + "-", _loc4_.getChildAt(_loc3_));
                _loc3_++;
            }
        }
    }

    public static hideChildren(param1: IWindowContainer): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            param1.getChildAt(_loc2_).visible = false;
            _loc2_++;
        }
    }

    public static getLocationRelativeTo(param1: IWindow, param2: number, param3: number): Rectangle {
        if (param1 == null) {
            return new Rectangle(300, 200, param2, param3);
        }
        let _loc4_: number = param1.width - param2;
        let _loc5_: number = param1.height - param3;
        return new Rectangle(param1.x + 0.5 * _loc4_, param1.y + 0.5 * _loc5_, param2, param3);
    }

    public static layoutChildrenInArea(param1: IWindowContainer, param2: number, param3: number): void {
        let _loc6_: number = 0;
        let _loc7_: IWindow = null;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        _loc6_ = 0;
        while (_loc6_ < param1.numChildren) {
            _loc7_ = param1.getChildAt(_loc6_);
            if (_loc7_.visible) {
                if (_loc4_ > 0 && _loc4_ + _loc7_.width > param2) {
                    _loc4_ = 0;
                    _loc5_ += param3;
                }
                _loc7_.x = _loc4_;
                _loc7_.y = _loc5_;
                _loc4_ += _loc7_.width;
            }
            _loc6_++;
        }
    }
}
