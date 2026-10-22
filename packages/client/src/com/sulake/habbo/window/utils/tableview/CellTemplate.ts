import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';

export class CellTemplate {
    static { registerClassName(this, 'com.sulake.habbo.window.utils.tableview::CellTemplate'); }

    constructor(param1: IRegionWindow) {
        this._template = param1;
        this._highlightBorderTemplate = asGuarded(param1.findChildByName("highlight_border"), isIBorderWindow);
        this._SafeStr_5698 = asGuarded(param1.findChildByName("element_text"), isITextWindow);
        this._SafeStr_5935 = asGuarded(param1.findChildByName("element_input"), isITextFieldWindow);
        this._SafeStr_5747 = asGuarded(param1.findChildByName("link_container"), isIRegionWindow);
        this._SafeStr_5850 = asGuarded(param1.findChildByName("extra_button"), isIRegionWindow);
        this._template.removeChild(this._SafeStr_5850);
        this._template.removeChild(this._SafeStr_5747);
        this._template.removeChild(this._SafeStr_5935);
        this._template.removeChild(this._SafeStr_5698);
        this._template.removeChild(this._highlightBorderTemplate);
    }

    declare private _template: IRegionWindow;

    declare private _highlightBorderTemplate: IBorderWindow;

    declare private _SafeStr_5698: ITextWindow;

    declare private _SafeStr_5935: ITextFieldWindow;

    declare private _SafeStr_5747: IRegionWindow;

    declare private _SafeStr_5850: IRegionWindow;

    public clone(): IRegionWindow {
        return asGuarded(this._template.clone(), isIRegionWindow);
    }

    public createHighlightBorder(param1: IWindowContainer): IBorderWindow {
        return asGuarded(this.fixAlignmentsAndAdd(this._highlightBorderTemplate, param1), isIBorderWindow);
    }

    public createElementText(param1: IWindowContainer): ITextWindow {
        return asGuarded(this.fixAlignmentsAndAdd(this._SafeStr_5698, param1), isITextWindow);
    }

    public createElementInput(param1: IWindowContainer): ITextFieldWindow {
        return asGuarded(this.fixAlignmentsAndAdd(this._SafeStr_5935, param1), isITextFieldWindow);
    }

    public createLinkContainer(param1: IWindowContainer): IRegionWindow {
        return asGuarded(this.fixAlignmentsAndAdd(this._SafeStr_5747, param1), isIRegionWindow);
    }

    public createExtraButton(param1: IWindowContainer): IRegionWindow {
        return asGuarded(this.fixAlignmentsAndAdd(this._SafeStr_5850, param1), isIRegionWindow);
    }

    private fixAlignmentsAndAdd(param1: IWindow, param2: IWindowContainer): IWindow {
        let _loc3_: number = param2.width - this._template.width;
        let _loc4_: IWindow = param1.clone();
        let _loc5_: number = param1.param;
        let _loc6_: number = param1.x;
        let _loc8_: number = param1.width;
        let _loc7_: number = (_loc5_ & 0xC0) >>> 0;
        if (_loc7_ == 128) {
            _loc8_ += _loc3_;
        } else if (_loc7_ == 64) {
            _loc6_ += _loc3_;
        } else if (_loc7_ == 192) {
            if (param2.width < param1.width && param1.getParamFlag(16)) {
                _loc6_ = 0;
            } else {
                _loc6_ = Math.floor(param2.width / 2) - Math.floor(_loc8_ / 2) | 0;
            }
        }
        _loc4_.x = _loc6_;
        _loc4_.width = _loc8_;
        param2.addChild(_loc4_);
        return _loc4_;
    }
}
