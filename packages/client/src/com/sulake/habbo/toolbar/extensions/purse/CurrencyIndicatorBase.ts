import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ICurrencyIndicator } from '@/com/sulake/habbo/toolbar/extensions/purse/ICurrencyIndicator';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { MathUtils } from '@/com/sulake/habbo/utils/MathUtils';

export class CurrencyIndicatorBase implements ICurrencyIndicator {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions.purse::CurrencyIndicatorBase'); }

    protected static readonly _SafeStr_8772: number = 0;
    protected static readonly _SafeStr_8746: number = 1;
    private static readonly _SafeStr_8199: number = 0.025;

    constructor(param1: IHabboWindowManager, param2: IAssetLibrary) {
        this.onContainerClick = this.onContainerClick.bind(this);
        this.initInstanceFields();
        this._window = null;
        this._windowManager = param1;
        this._assets = param2;
        this._SafeStr_3045 = null;
        this._overlayTimer = new Timer(40);
        this._overlayTimer.addEventListener("timer", this.onOverlayTimer);
    }

    declare protected _windowManager: IHabboWindowManager;

    declare protected _assets: IAssetLibrary;

    private _disposed: boolean = false;

    declare private _SafeStr_4505: IStaticBitmapWrapperWindow;

    declare private _bgColorLight: number;
    static { (this.prototype as any)._bgColorLight = 0; }

    declare private _bgColorDark: number;
    static { (this.prototype as any)._bgColorDark = 0; }

    private _SafeStr_2554: string[] = [];

    declare private _iconAnimationDelay: number;
    static { (this.prototype as any)._iconAnimationDelay = 0; }

    private _amountZeroText: string = null;
    private _SafeStr_5885: number = 0;

    declare private _animOffset: number;
    static { (this.prototype as any)._animOffset = 0; }

    declare private _SafeStr_3045: Timer;

    declare private _overlayTimer: Timer;

    declare private _overlayPhase: number;
    static { (this.prototype as any)._overlayPhase = NaN; }

    declare private _overlayStartValue: number;
    static { (this.prototype as any)._overlayStartValue = 0; }

    declare private _overlayEndValue: number;
    static { (this.prototype as any)._overlayEndValue = 0; }

    declare protected _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    declare private _textElementName: string;

    protected set textElementName(param1: string) {
        this._textElementName = param1;
    }

    protected set bgColorLight(param1: number) {
        this._bgColorLight = param1;
    }

    protected set bgColorDark(param1: number) {
        this._bgColorDark = param1;
    }

    protected set iconAnimationDelay(param1: number) {
        this._iconAnimationDelay = param1;
    }

    protected get amountZeroText(): string {
        return this._amountZeroText;
    }

    protected set amountZeroText(param1: string) {
        this._amountZeroText = param1;
    }

    protected set iconAnimationSequence(param1: any[]) {
        let _loc2_: any = null;
        for (_loc2_ of param1 ?? []) {
            this._SafeStr_2554.push(stringOrNull(_loc2_));
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._overlayTimer != null) {
            this._overlayTimer.stop();
            this._overlayTimer = null;
        }
        if (this._SafeStr_3045) {
            this._SafeStr_3045.stop();
            this._SafeStr_3045 = null;
        }
        if (this._SafeStr_2554) {
            this._SafeStr_2554 = null;
        }
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._disposed = true;
    }

    public registerUpdateEvents(param1: IEventDispatcher): void {
    }

    public unregisterUpdateEvents(param1: IEventDispatcher): void {
    }

    protected onContainerClick(param1: WindowMouseEvent): void {
    }

    protected createWindow(param1: string, param2: string): void {
        let _loc4_: any[] = null;
        let _loc3_: XmlAsset = asInstanceOf(this._assets.getAssetByName(param1), XmlAsset);
        if (_loc3_) {
            this._window = asGuarded(this._windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML), 1), isIWindowContainer);
            if (this._window) {
                this._window.addEventListener("WME_CLICK", this.onContainerClick);
                this._window.addEventListener("WME_OVER", this.onContainerMouseOver);
                this._window.addEventListener("WME_OUT", this.onContainerMouseOut);
                _loc4_ = [];
                if (this._window.groupChildrenWithTag("ICON", _loc4_, -1) == 1) {
                    this._SafeStr_4505 = asGuarded(_loc4_[0], isIStaticBitmapWrapperWindow);
                    this.setIconBitmap(param2);
                }
            }
        }
    }

    protected animateIcon(param1: number): void {
        this._SafeStr_5885 = param1 >>> 0;
        if (this._SafeStr_4505 && this._SafeStr_2554.length > 0) {
            if (this._SafeStr_5885 == 0) {
                this._animOffset = 0;
            } else {
                this._animOffset = this._SafeStr_2554.length - 1;
            }
            this._SafeStr_3045 = new Timer(this._iconAnimationDelay, this._SafeStr_2554.length | 0);
            this._SafeStr_3045.addEventListener("timer", this.onAnimationTimer);
            this._SafeStr_3045.addEventListener("timerComplete", this.onAnimationTimerComplete);
            this._SafeStr_3045.start();
            this.onAnimationTimer(null);
        }
    }

    protected setAmount(param1: number, param2: number = -1): void {
        this.setText(param1.toString());
    }

    protected setText(param1: string): void {
        if (this._window) {
            this._window.findChildByName(this._textElementName).caption = param1;
        }
    }

    protected setTextUnderline(param1: boolean): void {
        if (this._window) {
            castGuarded(this._window.findChildByName(this._textElementName), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = param1;
        }
    }

    protected animateChange(param1: number, param2: number): void {
        let _loc3_: IWindow = null;
        this._overlayPhase = 0;
        this._overlayStartValue = param1;
        this._overlayEndValue = param2;
        if (this._window != null) {
            _loc3_ = this._window.findChildByName("change");
            if (_loc3_ != null) {
                _loc3_.caption = (param2 > param1 ? "+" : "") + (param2 - param1).toString();
            }
        }
        this._overlayTimer.start();
        this.onOverlayTimer(null);
    }

    private setIconBitmap(param1: string): void {
        if (this._SafeStr_4505) {
            this._SafeStr_4505.assetUri = param1;
        }
    }

    private onContainerMouseOver = (param1: WindowMouseEvent): void => {
        this._window.findChildByTag("BGCOLOR").color = this._bgColorLight;
    };

    private onContainerMouseOut = (param1: WindowMouseEvent): void => {
        this._window.findChildByTag("BGCOLOR").color = this._bgColorDark;
    };

    private onAnimationTimer = (param1: TimerEvent): void => {
        if (this._SafeStr_4505 && this._SafeStr_2554.length > 0) {
            this.setIconBitmap(this._SafeStr_2554[this._animOffset]);
            if (this._SafeStr_5885 == 0) {
                this._animOffset = this._animOffset + 1;
                this._animOffset = this._animOffset < this._SafeStr_2554.length ? this._animOffset : this._SafeStr_2554.length - 1;
            } else {
                this._animOffset = this._animOffset - 1;
                this._animOffset = this._animOffset >= 0 ? this._animOffset : 0;
            }
        }
    };

    private onAnimationTimerComplete = (param1: TimerEvent): void => {
        if (this._SafeStr_2554.length > 0) {
            this.setIconBitmap(this._SafeStr_2554[0]);
        }
    };

    private onOverlayTimer = (param1: TimerEvent): void => {
        let _loc3_: number = Math.pow(this._overlayPhase - 0.5, 3) * 4 + 0.5;
        this.setAmount(MathUtils.lerp(Math.max(0, this._overlayPhase * 2 - 1), this._overlayStartValue, this._overlayEndValue) | 0);
        let _loc2_: IWindowContainer = asGuarded(this._window.findChildByName("change_overlay"), isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.visible = true;
        _loc2_.blend = 1 - Math.abs(0.5 - _loc3_) * 2;
        _loc2_.x = MathUtils.lerp(_loc3_, 0, this._window.width - _loc2_.width) | 0;
        this._overlayPhase += 0.025;
        if (this._overlayPhase >= 1) {
            _loc2_.visible = false;
            this._overlayTimer.stop();
            this.setAmount(this._overlayEndValue);
        }
    };

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }
}
