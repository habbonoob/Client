import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Util } from '@/com/sulake/habbo/navigator/Util';

export class TextFieldManager {
    static { registerClassName(this, 'com.sulake.habbo.navigator::TextFieldManager'); }

    constructor(param1: IHabboTransitionalNavigator, param2: ITextFieldWindow, param3: number = 1000, param4: (...args: any[]) => any = null, param5: string = null) {
        this._navigator = param1;
        this._input = param2;
        this._maxTextLen = param3;
        param2.maxChars = param3;
        this._SafeStr_5766 = param4;
        if (param5 != null) {
            this._includeInfo = true;
            this._SafeStr_5194 = param5;
            this._input.text = param5;
        }
        Util.setProcDirectly(this._input, this.onInputClick);
        this._input.addEventListener("WKE_KEY_DOWN", this.checkEnterPress);
        this._input.addEventListener("WE_CHANGE", this.checkMaxLen);
        this._SafeStr_7411 = this._input.textBackground;
        this._orgTextBackgroundColor = this._input.textBackgroundColor;
    }

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _input: ITextFieldWindow;

    declare private _includeInfo: boolean;
    static { (this.prototype as any)._includeInfo = false; }

    private _SafeStr_5194: string = "";

    declare private _maxTextLen: number;
    static { (this.prototype as any)._maxTextLen = 0; }

    declare private _SafeStr_5766: (...args: any[]) => any;

    private _SafeStr_7418: string = "";

    declare private _errorPopup: IWindowContainer;

    declare private _SafeStr_7411: boolean;
    static { (this.prototype as any)._SafeStr_7411 = false; }

    declare private _orgTextBackgroundColor: number;
    static { (this.prototype as any)._orgTextBackgroundColor = 0; }

    public get input(): ITextFieldWindow {
        return this._input;
    }

    public dispose(): void {
        if (this._input) {
            this._input.dispose();
            this._input = null;
        }
        if (this._errorPopup) {
            this._errorPopup.dispose();
            this._errorPopup = null;
        }
        this._navigator = null;
    }

    public checkMandatory(param1: string): boolean {
        if (!this.isInputValid()) {
            this.displayError(param1);
            return false;
        }
        this.restoreBackground();
        return true;
    }

    public restoreBackground(): void {
        this._input.textBackground = this._SafeStr_7411;
        this._input.textBackgroundColor = this._orgTextBackgroundColor;
    }

    public displayError(param1: string): void {
        this._input.textBackground = true;
        this._input.textBackgroundColor = 4294021019;
        if (this._errorPopup == null) {
            this._errorPopup = castGuarded(this._navigator.getXmlWindow("nav_error_popup"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            this._navigator.refreshButton(this._errorPopup, "popup_arrow_down", true, null, 0);
            castGuarded(this._input.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").addChild(this._errorPopup);
        }
        let _loc4_: ITextWindow = castGuarded(this._errorPopup.findChildByName("error_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc4_.text = param1;
        _loc4_.width = _loc4_.textWidth + 5 | 0;
        this._errorPopup.findChildByName("border").width = _loc4_.width + 15;
        this._errorPopup.width = _loc4_.width + 15;
        let _loc2_: Point = new Point();
        this._input.getLocalPosition(_loc2_);
        this._errorPopup.x = _loc2_.x | 0;
        this._errorPopup.y = _loc2_.y - this._errorPopup.height + 3 | 0;
        let _loc3_: IWindow = this._errorPopup.findChildByName("popup_arrow_down");
        _loc3_.x = this._errorPopup.width / 2 - _loc3_.width / 2 | 0;
        this._errorPopup.x += (this._input.width - this._errorPopup.width) / 2;
        this._errorPopup.visible = true;
    }

    public goBackToInitialState(): void {
        this.clearErrors();
        if (this._SafeStr_5194 != null) {
            this._input.text = this._SafeStr_5194;
            this._includeInfo = true;
        } else {
            this._input.text = "";
            this._includeInfo = false;
        }
    }

    public getText(): string {
        if (this._includeInfo) {
            return this._SafeStr_7418;
        }
        return this._input.text;
    }

    public setText(param1: string): void {
        this._includeInfo = false;
        this._input.text = param1;
    }

    public clearErrors(): void {
        this.restoreBackground();
        if (this._errorPopup != null) {
            this._errorPopup.visible = false;
        }
    }

    private isInputValid(): boolean {
        return !this._includeInfo && Util.trim(this.getText()).length > 2;
    }

    private onInputClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WE_FOCUSED") {
            return;
        }
        if (!this._includeInfo) {
            return;
        }
        this._input.text = this._SafeStr_7418;
        this._includeInfo = false;
        this.restoreBackground();
    };

    private checkEnterPress = (param1: WindowKeyboardEvent): void => {
        if (param1.charCode == 13) {
            if (this._SafeStr_5766 != null) {
                this._SafeStr_5766();
            }
        }
    };

    private checkMaxLen = (param1: WindowEvent): void => {
        let _loc2_: string = this._input.text;
        if (_loc2_.length > this._maxTextLen) {
            this._input.text = _loc2_.substring(0, this._maxTextLen);
        }
    };
}
