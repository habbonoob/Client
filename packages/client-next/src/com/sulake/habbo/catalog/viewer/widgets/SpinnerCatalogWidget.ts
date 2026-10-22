import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { CatalogWidgetSpinnerEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetSpinnerEvent';

export class SpinnerCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::SpinnerCatalogWidget'); }

    private static readonly SPIN_BUTTONDOWN_HOLD_VALUE_STEP_DELAY_MS: number = 75;
    private static readonly _SafeStr_8748: number = 35;

    declare private _catalog: HabboCatalog;

    private _value: number = 1;
    private _SafeStr_3464: number = 1;
    private _SafeStr_4059: number = 100;

    declare private _SafeStr_3026: Timer;

    private _SafeStr_5287: boolean = false;
    private _SafeStr_4798: boolean = false;
    private _SafeStr_3824: boolean = false;
    private _SafeStr_4288: number = 1;
    private _skipSteps: any[] = new Array(0);

    declare private _promoInfo: IWindow;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    public override dispose(): void {
        if (!this.disposed) {
            if (this._SafeStr_3026 != null) {
                this._SafeStr_3026.stop();
                this._SafeStr_3026 = null;
            }
            this.events.removeEventListener("CWSE_RESET", this.onRequestResetEvent);
            this.events.removeEventListener("CWSE_SHOW", this.onShowEvent);
            this.events.removeEventListener("CWSE_HIDE", this.onHideEvent);
            this.events.removeEventListener("CWSE_SET_MAX", this.onSetMaxEvent);
            this.events.removeEventListener("CWSE_SET_MIN", this.onSetMinEvent);
            super.dispose();
        }
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        if (this.page.isBuilderPage) {
            this.window.visible = false;
            return true;
        }
        this.attachWidgetView("spinnerWidget");
        this.window.visible = false;
        if (!this._catalog.multiplePurchaseEnabled) {
            return true;
        }
        this.window.procedure = this.spinnerWindowProcedure;
        let _loc1_: ITextFieldWindow = asGuarded(this.window.findChildByName("text_value"), isITextFieldWindow);
        if (_loc1_) {
            _loc1_.addEventListener("WKE_KEY_UP", this.onInputEvent);
        }
        this.events.addEventListener("CWSE_RESET", this.onRequestResetEvent);
        this.events.addEventListener("CWSE_SHOW", this.onShowEvent);
        this.events.addEventListener("CWSE_HIDE", this.onHideEvent);
        this.events.addEventListener("CWSE_SET_MAX", this.onSetMaxEvent);
        this.events.addEventListener("CWSE_SET_MIN", this.onSetMinEvent);
        this._SafeStr_3026 = new Timer(75);
        this._SafeStr_3026.addEventListener("timer", this.onSpinnerTimerEvent);
        this._promoInfo = this.window.findChildByName("promo.info");
        return true;
    }

    private refresh(): void {
        let _loc1_: number = 0;
        this._value = Math.max(this._value, this._SafeStr_3464) | 0;
        this._value = Math.min(this._value, this._SafeStr_4059) | 0;
        this.events.dispatchEvent(new CatalogWidgetSpinnerEvent("CWSE_VALUE_CHANGED", this._value));
        this.setValueText(this._value.toString());
        if (this._promoInfo && this._catalog.bundleDiscountEnabled) {
            _loc1_ = this._catalog.utils.getDiscountItemsCount(this._value);
            this.window.findChildByName("discountContainer").visible = _loc1_ > 0;
            this._catalog.localization.registerParameter("shop.bonus.items.count", "amount", _loc1_.toString());
        }
    }

    private onRequestResetEvent = (param1: CatalogWidgetSpinnerEvent): void => {
        this._value = param1.value;
        if (param1.skipSteps != null) {
            this._skipSteps = param1.skipSteps;
        }
        this.refresh();
    };

    private onShowEvent = (param1: CatalogWidgetSpinnerEvent): void => {
        this.window.visible = true;
    };

    private onHideEvent = (param1: CatalogWidgetSpinnerEvent): void => {
        this.window.visible = false;
    };

    private onSetMaxEvent = (param1: CatalogWidgetSpinnerEvent): void => {
        this._SafeStr_4059 = param1.value;
    };

    private onSetMinEvent = (param1: CatalogWidgetSpinnerEvent): void => {
        this._SafeStr_3464 = param1.value;
    };

    private onSpinnerTimerEvent = (param1: TimerEvent): void => {
        if (this.disposed) {
            return;
        }
        this._SafeStr_3824 = true;
        if (this._SafeStr_5287) {
            this.increaseValue();
            if (this._value - this._SafeStr_4288 > 35) {
                this.increaseValue();
            }
        }
        if (this._SafeStr_4798) {
            this.decreaseValue();
            if (this._SafeStr_4288 - this._value > 35) {
                this.decreaseValue();
            }
        }
        this.refresh();
    };

    private increaseValue(): void {
        let _loc1_: number = this._value + 1;
        while (this._skipSteps.indexOf(_loc1_) != -1) {
            _loc1_++;
        }
        this._value = _loc1_;
    }

    private decreaseValue(): void {
        let _loc1_: number = this._value - 1;
        while (this._skipSteps.indexOf(_loc1_) != -1) {
            _loc1_--;
        }
        this._value = _loc1_;
    }

    private setValueText(param1: string): void {
        if (this._window == null) {
            return;
        }
        if (isITextFieldWindow(this._window.findChildByName("text_value"))) {
            if (this._window.findChildByName("text_value").caption.length > 0) {
                this._window.findChildByName("text_value").caption = param1;
            }
        } else {
            this._window.findChildByName("text_value").caption = param1;
        }
    }

    private spinnerWindowProcedure = (param1: WindowEvent, param2: IWindow = null): void => {
        if (!param1) {
            return;
        }
        if (param1.type != "WME_CLICK" && param1.type != "WME_DOWN" && param1.type != "WME_UP" && param1.type != "WME_UP_OUTSIDE") {
            return;
        }
        switch (param1.target.name) {
            case "button_less":
                switch (param1.type) {
                    case "WME_DOWN":
                        this._SafeStr_4798 = true;
                        this._SafeStr_4288 = this._value;
                        this._SafeStr_3026.start();
                        break;
                    case "WME_UP":
                    case "WME_UP_OUTSIDE":
                        this._SafeStr_4798 = false;
                        this._SafeStr_3026.stop();
                        break;
                    case "WME_CLICK":
                        if (!this._SafeStr_3824) {
                            this.decreaseValue();
                        }
                        this.refresh();
                        this._SafeStr_3824 = false;
                }
                break;
            case "button_more":
                switch (param1.type) {
                    case "WME_DOWN":
                        this._SafeStr_5287 = true;
                        this._SafeStr_4288 = this._value;
                        this._SafeStr_3026.start();
                        break;
                    case "WME_UP":
                    case "WME_UP_OUTSIDE":
                        this._SafeStr_5287 = false;
                        this._SafeStr_3026.stop();
                        break;
                    case "WME_CLICK":
                        if (!this._SafeStr_3824) {
                            this.increaseValue();
                        }
                        this.refresh();
                        this._SafeStr_3824 = false;
                }
        }
    };

    private onInputEvent = (param1: WindowKeyboardEvent): void => {
        this._value = parseInt(param1.target.caption) | 0;
        this.refresh();
    };
}
