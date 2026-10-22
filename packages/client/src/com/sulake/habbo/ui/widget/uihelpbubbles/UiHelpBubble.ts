import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HelpBubbleItem } from '@/com/sulake/habbo/ui/widget/uihelpbubbles/HelpBubbleItem';
import type { UiHelpBubblesWidget } from '@/com/sulake/habbo/ui/widget/uihelpbubbles/UiHelpBubblesWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class UiHelpBubble {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.uihelpbubbles::UiHelpBubble'); }

    constructor(param1: UiHelpBubblesWidget, param2: HelpBubbleItem, param3: boolean) {
        this._widget = param1;
        this._id = param2.name;
        this._SafeStr_6711 = param2.text;
        this._SafeStr_5169 = param3;
        this._SafeStr_7090 = param2.modal;
        this.createWindow();
    }

    declare private _window: IWindowContainer;

    declare private _widget: UiHelpBubblesWidget;

    declare private _id: string;

    declare private _pos: Point;

    declare private _SafeStr_6711: string;

    declare private _SafeStr_5169: boolean;
    static { (this.prototype as any)._SafeStr_5169 = false; }

    declare private _bubble: IBubbleWindow;

    declare private _SafeStr_4468: IButtonWindow;

    declare private _modal: IWindowContainer;

    declare private _SafeStr_7090: boolean;
    static { (this.prototype as any)._SafeStr_7090 = false; }

    declare private _SafeStr_4626: IBitmapWrapperWindow;

    declare private _SafeStr_4925: IWindow;

    declare private _SafeStr_7044: IWindow;

    declare private _iconListener: (...args: any[]) => any;

    public dispose(): void {
        this._widget = null;
        if (this._SafeStr_4925 != null && this._iconListener != null) {
            this._SafeStr_4925.removeEventListener("WME_CLICK", this._iconListener);
        }
        if (this._modal) {
            this._modal.dispose();
            this._modal = null;
        }
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public show(): void {
        if (this._window != null) {
            this._window.visible = true;
            this._window.activate();
        }
    }

    public setModal(param1: Rectangle): void {
        if (!this._SafeStr_4626) {
            return;
        }
        let _loc3_: BitmapData = new BitmapData(this._modal.width, this._modal.height, true, 4292870144);
        let _loc2_: BitmapData = new BitmapData(param1.width | 0, param1.height | 0, true, 16777215);
        _loc3_.copyPixels(_loc2_, _loc2_.rect, new Point(param1.x, param1.y));
        this._SafeStr_4626.bitmap = _loc3_;
        this._SafeStr_4626.invalidate();
    }

    public setPosition(param1: Point): void {
        this._pos = param1;
        this._window.y = this._pos.y | 0;
        this._window.x = this._pos.x - this._window.width / 2 | 0;
    }

    public setArrowPos(param1: string, param2: number): void {
        this._bubble.direction = param1;
        this._bubble.pointerOffset = param2 - 8;
    }

    public setCallback(param1: IWindow): void {
        if (this._iconListener != null) {
            return;
        }
        this._SafeStr_4925 = param1;
        if (!this._SafeStr_5169) {
            this._iconListener = this.onLastBubble;
        } else {
            this._iconListener = this.onNext;
        }
        this._SafeStr_4925.addEventListener("WME_CLICK", this._iconListener);
    }

    public setChatFieldCallback(param1: ITextFieldWindow): void {
        if (this._iconListener != null) {
            return;
        }
        this._SafeStr_7044 = param1;
        if (!this._SafeStr_5169) {
            this._iconListener = this.onLastBubble;
        } else {
            this._iconListener = this.onNext;
        }
        this._SafeStr_7044.addEventListener("WME_CLICK", this._iconListener);
    }

    public getWindow(): IWindowContainer {
        return this._window;
    }

    public getName(): string {
        return this._id;
    }

    private addMouseClickListener(param1: IWindow, param2: (...args: any[]) => any): void {
        if (param1 != null) {
            param1.setParamFlag(1, true);
            param1.addEventListener("WME_CLICK", param2);
        }
    }

    private createWindow(): void {
        let _loc4_: XmlAsset = null;
        let _loc1_: number = 0;
        if (!this._widget || !this._widget.assets || !this._widget.windowManager) {
            return;
        }
        if (this._SafeStr_7090) {
            _loc4_ = asInstanceOf(this._widget.assets.getAssetByName("ui_help_modal"), XmlAsset);
            this._modal = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc4_.content, XML), 3), isIWindowContainer);
        }
        if (this._modal) {
            this._modal.width = this._modal.desktop.width;
            this._modal.height = this._modal.desktop.height;
            this._SafeStr_4626 = asGuarded(this._modal.findChildByName("bitmap"), isIBitmapWrapperWindow);
            this.addMouseClickListener(this._SafeStr_4626, this.onActivateBubble);
        }
        let _loc2_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("ui_help_bubble"), XmlAsset);
        if (!_loc2_) {
            return;
        }
        this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML), 3), isIWindowContainer);
        if (!this._window) {
            return;
        }
        this._SafeStr_4468 = asGuarded(this._window.findChildByName("help_bubble_btn_ok"), isIButtonWindow);
        this._bubble = asGuarded(this._window.findChildByName("bubble"), isIBubbleWindow);
        let _loc3_: ITextWindow = asGuarded(this._window.findChildByName("help_bubble_text"), isITextWindow);
        if (_loc3_) {
            _loc3_.text = this._SafeStr_6711;
            _loc1_ = _loc3_.textHeight | 0;
            this._window.height = _loc1_ + 90;
            this._SafeStr_4468.y = _loc1_ + 30;
        }
        if (!this._SafeStr_5169) {
            this._SafeStr_4468.caption = this._widget.localizations.getLocalization("alert.close.button", "alert.close.button");
            this.addMouseClickListener(this._SafeStr_4468, this.onLastBubble);
        } else {
            this.addMouseClickListener(this._SafeStr_4468, this.onNext);
        }
        this._window.visible = true;
    }

    private onActivateBubble = (param1: WindowMouseEvent): void => {
        this._modal.deactivate();
        this._window.activate();
    };

    private onNext = (param1: WindowMouseEvent): void => {
        if (!this._widget) {
            return;
        }
        if (this._modal) {
            this._modal.visible = false;
        }
        this._widget.removeHelpBubble(this._id);
    };

    private onLastBubble = (param1: WindowMouseEvent): void => {
        if (!this._widget) {
            return;
        }
        this._widget.sendScriptProceedMessage();
        if (this._modal) {
            this._modal.visible = false;
        }
        this._widget.removeHelpBubble(this._id);
    };
}
