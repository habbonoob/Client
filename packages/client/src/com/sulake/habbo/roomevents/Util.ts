import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { isIBackgroundWindow } from '@/com/sulake/core/window/components/IBackgroundWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIChildWindowHost } from '@/com/sulake/core/window/utils/IChildWindowHost';
import { WiredVariableType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariableType';
import { ColorConverter } from '@/com/sulake/room/utils/ColorConverter';

export class Util {
    static { registerClassName(this, 'com.sulake.habbo.roomevents::Util'); }

    public static readonly VARIABLE_SYNTAX_MODE_PRETTIFY: number = 0;
    public static readonly VARIABLE_SYNTAX_MODE_NONE: number = 1;

    public static setProcDirectly(param1: IWindow, param2: (...args: any[]) => any): void {
        param1.setParamFlag(1, true);
        param1.procedure = param2;
    }

    public static getLowestPoint(param1: IWindowContainer): number {
        let _loc2_: number = 0;
        let _loc4_: IWindow = null;
        let _loc3_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            _loc4_ = param1.getChildAt(_loc2_);
            if (_loc4_.visible && _loc4_.height > 0) {
                _loc3_ = Math.max(_loc3_, _loc4_.y + _loc4_.height) | 0;
            }
            _loc2_++;
        }
        return _loc3_;
    }

    public static getLowestPointList(param1: IItemListWindow): number {
        let _loc2_: number = 0;
        let _loc4_: IWindow = null;
        let _loc3_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.numListItems) {
            _loc4_ = param1.getListItemAt(_loc2_ >>> 0);
            if (_loc4_.visible && _loc4_.height > 0) {
                _loc3_ = Math.max(_loc3_, _loc4_.y + _loc4_.height) | 0;
            }
            _loc2_++;
        }
        return _loc3_;
    }

    public static hideChildren(param1: IWindowContainer, param2: boolean = false): void {
        let _loc3_: number = 0;
        let _loc4_: IWindow = null;
        _loc3_ = 0;
        while (_loc3_ < param1.numChildren) {
            _loc4_ = param1.getChildAt(_loc3_);
            if (!(param2 && _loc4_.name == "ruler")) {
                _loc4_.visible = false;
            }
            _loc3_++;
        }
    }

    public static showChildren(param1: IWindowContainer): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            param1.getChildAt(_loc2_).visible = true;
            _loc2_++;
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

    public static moveAllChildrenToColumn(param1: IWindowContainer, param2: number, param3: number): void {
        let _loc4_: number = 0;
        let _loc5_: IWindow = null;
        _loc4_ = 0;
        while (_loc4_ < param1.numChildren) {
            _loc5_ = param1.getChildAt(_loc4_);
            if (_loc5_ != null && _loc5_.visible && _loc5_.height > 0) {
                _loc5_.y = param2;
                param2 += _loc5_.height + param3;
            }
            _loc4_++;
        }
    }

    public static select(param1: ICheckBoxWindow, param2: boolean): void {
        if (param2) {
            param1.select();
        } else {
            param1.unselect();
        }
    }

    public static flatVariableName(param1: WiredVariable): string {
        return param1.variableName.replace("@", "").replace("~", "").replace(/\./g, "_");
    }

    public static splitName(param1: WiredVariable): any[] {
        let _loc3_: any[] = param1.variableName.split(".");
        let _loc2_: any[] = [];
        for (const _loc4_ of _loc3_ ?? []) {
            _loc2_.push(_loc4_);
        }
        return _loc2_;
    }

    public static variableValueWithString(param1: WiredVariable, param2: number): string {
        if (!param1.hasValue) {
            return null;
        }
        let _loc4_: boolean = param2 == 2147483647 || param2 == -2147483648;
        if (_loc4_) {
            return "Hidden";
        }
        let _loc3_: string = Util.getConnectedText(param1, param2);
        return String(param2) + (_loc3_ == null ? "" : " (" + _loc3_ + ")");
    }

    public static getConnectedText(param1: WiredVariable, param2: number): string {
        let _loc3_: UtilsMap = param1.textConnector;
        if (_loc3_ == null) {
            return null;
        }
        return stringOrNull(_loc3_.getValue(param2));
    }

    public static getIntFromInput(param1: ITextFieldWindow, param2: number, param3: boolean = false): number {
        return Util.getIntFromString(param1.text, param2, param3);
    }

    public static getIntFromString(param1: string, param2: number, param3: boolean = false): number {
        if (param3 && param1.indexOf("0b") == 0) {
            return parseInt(param1.substr(2), 2) | 0;
        }
        if (param3 && param1.indexOf("0x") == 0) {
            return parseInt(param1.substr(2), 16) | 0;
        }
        if (isNaN(Number(param1))) {
            return param2;
        }
        return Number(param1) | 0;
    }

    public static pushIntAsLong(param1: any[], param2: number): void {
        param1.push(param2 < 0 ? -1 : 0);
        param1.push(param2);
    }

    public static disableSection(param1: IWindow, param2: boolean = true): void {
        let _loc7_: string = null;
        let _loc8_: number = NaN;
        let _loc4_: IWindowContainer = null;
        let _loc6_: number = 0;
        if (param1.tags.indexOf("DO_NOT_DISABLE") != -1) {
            return;
        }
        let _loc3_: number = -1;
        if (param1.isEnabled() && param2) {
            _loc3_ = Util.getBlend(param1);
            _loc7_ = "BLEND=" + _loc3_;
            if (param1.tags.indexOf(_loc7_) == -1) {
                param1.tags.push(_loc7_);
            }
        } else if (!param1.isEnabled() && !param2) {
            for (_loc7_ of param1.tags ?? []) {
                if (_loc7_.indexOf("BLEND=") == 0) {
                    _loc3_ = Number(_loc7_.substring(6, _loc7_.length));
                }
            }
        }
        if (_loc3_ == -1) {
            _loc8_ = Util.getBlend(param1);
        } else {
            _loc8_ = param2 ? _loc3_ / 2 : _loc3_;
        }
        let _loc5_: any = param1.tags.indexOf("#icon") != -1;
        if (!(isIButtonWindow(param1))) {
            if (isIWindowContainer(param1) || isIItemListWindow(param1) || isISelectorWindow(param1)) {
                if (isIChildWindowHost(param1)) {
                    for (const _loc9_ of (isIChildWindowHost(param1) ? param1 : null).children ?? []) {
                        Util.disableSection(_loc9_, param2);
                    }
                } else if (isIWindowContainer(param1)) {
                    _loc4_ = isIWindowContainer(param1) ? param1 : null;
                    _loc6_ = 0;
                    while (_loc6_ < _loc4_.numChildren) {
                        Util.disableSection(_loc4_.getChildAt(_loc6_), param2);
                        _loc6_++;
                    }
                }
                if (isIBorderWindow(param1) || isIBackgroundWindow(param1)) {
                    Util.setBlend(param1, _loc8_);
                }
            } else if (!_loc5_) {
                Util.setBlend(param1, _loc8_);
            }
        }
        if (param2) {
            param1.disable();
        } else {
            param1.enable();
        }
    }

    public static sortVariables(param1: any): void {
        param1.sort(Util.variableCompare);
    }

    public static compareIntArrays(param1: any[], param2: any[]): boolean {
        let _loc3_: number = 0;
        if (param1.length != param2.length) {
            return false;
        }
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            if (param1[_loc3_] != param2[_loc3_]) {
                return false;
            }
            _loc3_++;
        }
        return true;
    }

    public static findVariableById(param1: any[], param2: string): WiredVariable {
        for (const _loc3_ of param1 ?? []) {
            if (_loc3_.variableId == param2) {
                return _loc3_;
            }
        }
        return null;
    }

    public static uintToHexColor(param1: number): string {
        let _loc2_: string = param1.toString(16);
        while (_loc2_.length < 6) {
            _loc2_ = "0" + _loc2_;
        }
        return "#" + _loc2_;
    }

    public static snakeToTitle(param1: string): string {
        let text: string = param1;
        if (!text) {
            return "";
        }
        text = text.toLowerCase().replace(/_/g, " ");
        return text.replace(/\b\w/g, function (): string {
                return stringOrNull(arguments[0].toUpperCase());
            });
    }

    public static lightenColor(param1: number, param2: number): number {
        let _loc3_: number = ColorConverter.rgbToHSL(param1);
        let _loc4_: number = (_loc3_ & 0xFF) >>> 0;
        _loc4_ = Math.min(255, _loc4_ * param2) >>> 0;
        _loc3_ = (_loc3_ & -256 | _loc4_) >>> 0;
        return ColorConverter.hslToRGB(_loc3_);
    }

    private static getBlend(param1: IWindow): number {
        if (isIBackgroundWindow(param1)) {
            return (param1.color >>> 24 & 0xFF) / 255;
        }
        return param1.blend;
    }

    private static setBlend(param1: IWindow, param2: number): void {
        let _loc3_: any = 0;
        if (isIBackgroundWindow(param1)) {
            _loc3_ = Math.max(0, Math.min(255, param2 * 255 | 0));
            param1.color = (param1.color & 0xFFFFFF | _loc3_ << 24) >>> 0;
        } else {
            param1.blend = param2;
        }
    }

    private static variableCompare(param1: WiredVariable, param2: WiredVariable): number {
        let _loc4_: any = param1.variableType == WiredVariableType.INTERNAL;
        let _loc3_: any = param2.variableType == WiredVariableType.INTERNAL;
        if (_loc4_ && !_loc3_) {
            return 1;
        }
        if (_loc3_ && !_loc4_) {
            return -1;
        }
        if (_loc4_) {
            if (Number(param1.variableId) > Number(param2.variableId)) {
                return -1;
            }
            if (Number(param1.variableId) == Number(param2.variableId)) {
                return 0;
            }
            return 1;
        }
        return param1.variableName.localeCompare(param2.variableName);
    }

    constructor() {
    }
}
