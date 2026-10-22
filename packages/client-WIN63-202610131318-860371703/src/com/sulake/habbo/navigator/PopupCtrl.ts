import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Util } from '@/com/sulake/habbo/navigator/Util';

export class PopupCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator::PopupCtrl'); }

    declare private _navigator: HabboNavigator;

    declare private _xmlFileName: string;

    declare private _SafeStr_6431: number;
    static { (this.prototype as any)._SafeStr_6431 = 0; }

    declare private _SafeStr_6255: number;
    static { (this.prototype as any)._SafeStr_6255 = 0; }

    private _SafeStr_2853: Timer = new Timer(500, 1);
    private _hideTimer: Timer = new Timer(100, 1);

    declare private _popup: IWindowContainer;

    constructor(param1: HabboNavigator, param2: number, param3: number, param4: string) {
        this._navigator = param1;
        this._xmlFileName = param4;
        this._SafeStr_6431 = param2;
        this._SafeStr_6255 = param3;
        this._SafeStr_2853.addEventListener("timer", this.onDisplayTimer);
        this._hideTimer.addEventListener("timer", this.onHideTimer);
    }

    public get navigator(): HabboNavigator {
        return this._navigator;
    }

    public dispose(): void {
        this._navigator = null;
        if (this._SafeStr_2853) {
            this._SafeStr_2853.removeEventListener("timer", this.onDisplayTimer);
            this._SafeStr_2853.reset();
            this._SafeStr_2853 = null;
        }
        if (this._hideTimer) {
            this._hideTimer.removeEventListener("timer", this.onHideTimer);
            this._hideTimer.reset();
            this._hideTimer = null;
        }
    }

    public showPopup(param1: IWindow): void {
        if (this._popup == null) {
            this._popup = castGuarded(this._navigator.getXmlWindow(this._xmlFileName), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            this._popup.visible = false;
            this._popup.setParamFlag(1, true);
            this._popup.procedure = this.onPopup;
        }
        Util.hideChildren(this._popup);
        this.refreshContent(this._popup);
        this._popup.height = Util.getLowestPoint(this._popup) + 5;
        let _loc2_: Point = new Point();
        param1.getGlobalPosition(_loc2_);
        this._popup.x = _loc2_.x + this._SafeStr_6431 + param1.width | 0;
        this._popup.y = _loc2_.y - this._popup.height * 0.5 + param1.height * 0.5 | 0;
        let _loc3_: Point = new Point();
        this._popup.getGlobalPosition(_loc3_);
        if (_loc3_.x + this._popup.width > this._popup.desktop.width) {
            this._popup.x = -this._popup.width + _loc2_.x + this._SafeStr_6255 | 0;
            this.refreshPopupArrows(this._popup, false);
        } else {
            this.refreshPopupArrows(this._popup, true);
        }
        if (!this._popup.visible) {
            this._SafeStr_2853.reset();
            this._SafeStr_2853.start();
        }
        this._hideTimer.reset();
        this._popup.activate();
    }

    public closePopup(): void {
        this._hideTimer.reset();
        this._SafeStr_2853.reset();
        this._hideTimer.start();
    }

    private refreshPopupArrows(param1: IWindowContainer, param2: boolean): void {
        this.refreshPopupArrow(param1, true, param2);
        this.refreshPopupArrow(param1, false, !param2);
    }

    private refreshPopupArrow(param1: IWindowContainer, param2: boolean, param3: boolean): void {
        let _loc4_: string = "popup_arrow_" + (param2 ? "left" : "right");
        let _loc5_: IBitmapWrapperWindow = castGuarded(param1.findChildByName(_loc4_), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        if (!param3) {
            if (_loc5_ != null) {
                _loc5_.visible = false;
            }
        } else {
            if (_loc5_ == null) {
                _loc5_ = this._navigator.getButton(_loc4_, _loc4_, null);
                _loc5_.setParamFlag(16, false);
                param1.addChild(_loc5_);
            }
            _loc5_.visible = true;
            _loc5_.y = param1.height * 0.5 - _loc5_.height * 0.5 | 0;
            _loc5_.x = param2 ? 1 - _loc5_.width : param1.width - 1;
        }
    }

    private onDisplayTimer = (param1: TimerEvent): void => {
        this._popup.visible = true;
        this._popup.activate();
    };

    private onHideTimer = (param1: TimerEvent): void => {
        if (this._popup != null) {
            this._popup.visible = false;
        }
    };

    public hideInstantly = (): void => {
        if (this._popup != null) {
            this._popup.visible = false;
        }
        this._SafeStr_2853.reset();
        this._hideTimer.reset();
    };

    public get visible(): boolean {
        return this._popup != null && Boolean(this._popup.visible);
    }

    public refreshContent(param1: IWindowContainer): void {
    }

    private onPopup = (param1: WindowEvent, param2: IWindow): void => {
        if ((param1 instanceof WindowMouseEvent ? param1 : null) == null) {
            return;
        }
        if (param1.type == "WME_OVER") {
            this._hideTimer.reset();
        } else if (param1.type == "WME_OUT") {
            if (!Util.containsMouse(this._popup)) {
                this.closePopup();
            }
        }
    };
}
