import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IContextMenuParentWidget } from '@/com/sulake/habbo/ui/widget/contextmenu/IContextMenuParentWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomWidgetUserActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUserActionMessage';
import { FixedSizeStack } from '@/com/sulake/habbo/utils/FixedSizeStack';

export class ContextInfoView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.contextmenu::ContextInfoView'); }

    protected static readonly CONTEXT_INFO_DELAY: number = 3000;
    protected static readonly BUTTON_COLOR_DEFAULT: number = 4281149991;
    protected static readonly BUTTON_COLOR_HOVER: number = 4282950861;
    protected static readonly _SafeStr_7999: number = 4288230144;
    protected static readonly LINK_COLOR_ACTIONS_DEFAULT: number = 16777215;
    protected static readonly LINK_COLOR_ACTIONS_HOVER: number = 9552639;
    protected static readonly _SafeStr_8222: number = 16777215;
    protected static readonly _SafeStr_8149: number = 5789011;
    protected static readonly ICON_COLOR_ENABLED: number = 13947341;
    protected static readonly ICON_COLOR_DISABLED: number = 5789011;
    private static readonly _SafeStr_7598: number = 25;
    public static readonly _SafeStr_7531: number = 3;
    private static readonly MAX_VERTICAL_LEAD_RATIO: number = 0.05;
    protected static _SafeStr_2596: boolean = false;

    declare protected _window: IWindowContainer;

    declare protected _SafeStr_2770: IWindowContainer;

    declare protected _SafeStr_2220: IWindowContainer;

    declare private _forcedPositionUpdate: boolean;
    static { (this.prototype as any)._forcedPositionUpdate = false; }

    declare protected _widget: IContextMenuParentWidget;

    declare protected _SafeStr_2283: boolean;
    static { (this.prototype as any)._SafeStr_2283 = false; }

    protected _SafeStr_3920: FixedSizeStack = new FixedSizeStack(25);
    protected _SafeStr_4471: number = -1000000;
    protected _disposed: boolean = false;
    private _forceActivateOnUpdate: boolean = true;

    declare protected _SafeStr_2962: Timer;

    protected _SafeStr_5779: number = 3000;

    declare protected _SafeStr_4435: boolean;
    static { (this.prototype as any)._SafeStr_4435 = false; }

    declare protected _SafeStr_4317: boolean;
    static { (this.prototype as any)._SafeStr_4317 = false; }

    declare protected _blend: number;
    static { (this.prototype as any)._blend = NaN; }

    declare protected _fadeTime: number;
    static { (this.prototype as any)._fadeTime = 0; }

    protected _fadeLength: number = 500;

    declare protected _SafeStr_2318: boolean;
    static { (this.prototype as any)._SafeStr_2318 = false; }

    constructor(param1: IContextMenuParentWidget) {
        this._widget = param1;
        this._SafeStr_2318 = true;
        this._SafeStr_4435 = false;
        this._SafeStr_4317 = false;
    }

    public static setupContext(param1: ContextInfoView): void {
        param1._SafeStr_4435 = false;
        param1._fadeLength = 500;
        param1._SafeStr_4317 = false;
        param1._blend = 1;
        param1._SafeStr_2283 = false;
        if (param1._SafeStr_2318) {
            if (!param1._SafeStr_2962) {
                param1._SafeStr_2962 = new Timer(param1._SafeStr_5779, 1);
                param1._SafeStr_2962.addEventListener("timerComplete", param1.onTimerComplete);
            }
            param1._SafeStr_2962.reset();
            param1._SafeStr_2962.start();
        }
        param1.updateWindow();
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get maximumBlend(): number {
        return 1;
    }

    public dispose(): void {
        this._widget = null;
        this._SafeStr_2220 = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2770) {
            this._SafeStr_2770.dispose();
            this._SafeStr_2770 = null;
        }
        if (this._SafeStr_2962) {
            this._SafeStr_2962.removeEventListener("timerComplete", this.onTimerComplete);
            this._SafeStr_2962.reset();
            this._SafeStr_2962 = null;
        }
        this._disposed = true;
    }

    private onTimerComplete = (param1: TimerEvent): void => {
        this._SafeStr_4317 = true;
        this._fadeTime = 0;
        this.hide(true);
    };

    protected addMouseClickListener(param1: IWindow, param2: (...args: any[]) => any): void {
        if (param1 != null) {
            param1.addEventListener("WME_CLICK", param2);
        }
    }

    protected updateWindow(): void {
    }

    protected clickHandler = (param1: WindowMouseEvent): void => {
        this._widget.messageListener.processWidgetMessage(new RoomWidgetUserActionMessage("RWUAM_START_NAME_CHANGE"));
        this._widget.removeView(this, false);
    };

    public setImageAsset(param1: IBitmapWrapperWindow, param2: string, param3: boolean = false): void {
        let _loc6_: Point = null;
        if (!param1 || !this._widget || !this._widget.assets) {
            return;
        }
        let _loc5_: BitmapDataAsset = asInstanceOf(this._widget.assets.getAssetByName(param2), BitmapDataAsset);
        if (!_loc5_) {
            return;
        }
        let _loc4_: BitmapData = asInstanceOf(_loc5_.content, BitmapData);
        if (!_loc4_) {
            return;
        }
        if (param1.bitmap) {
            param1.bitmap.fillRect(param1.bitmap.rect, 0);
        } else {
            param1.bitmap = new BitmapData(param1.width, param1.height, true, 0);
        }
        if (param3) {
            _loc6_ = new Point((param1.bitmap.width - _loc4_.width) / 2, (param1.bitmap.height - _loc4_.height) / 2);
        } else {
            _loc6_ = new Point(0, 0);
        }
        param1.bitmap.copyPixels(_loc4_, _loc4_.rect, _loc6_, null, null, true);
        param1.invalidate();
    }

    public show(): void {
        if (this._SafeStr_2220 != null) {
            this._SafeStr_2220.visible = true;
            if (!(isIDesktopWindow(this._SafeStr_2220.parent))) {
                this._widget.windowManager.getDesktop(0).addChild(this._SafeStr_2220);
            }
            if (this._forceActivateOnUpdate) {
                this._SafeStr_2220.activate();
            }
        }
    }

    public hide(param1: boolean): void {
        if (this._SafeStr_2220 != null) {
            if (!this._SafeStr_4435 && param1 && this._SafeStr_2962 != null) {
                this._SafeStr_4435 = true;
                this._SafeStr_2962.start();
            } else {
                this._SafeStr_2220.visible = false;
                this._SafeStr_2220.parent = null;
            }
        }
    }

    protected getOffset(param1: Rectangle): number {
        let _loc2_: number = -this._SafeStr_2220.height;
        return _loc2_ - 4;
    }

    protected getMaximumVerticalLead(param1: Rectangle): number {
        return param1.height * 0.05 | 0;
    }

    public update(param1: Rectangle, param2: Point, param3: number): void {
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc10_: number = 0;
        let _loc5_: number = 0;
        let _loc9_: number = 0;
        if (!param1) {
            return;
        }
        if (!this._SafeStr_2220) {
            this.updateWindow();
        }
        if (this._SafeStr_4317) {
            this._fadeTime += param3;
            this._blend = (1 - this._fadeTime / this._fadeLength) * this.maximumBlend;
        } else {
            this._blend = this.maximumBlend;
        }
        if (this._blend <= 0) {
            this._widget.removeView(this, false);
            return;
        }
        if (!this._SafeStr_2283 || this._forcedPositionUpdate) {
            _loc4_ = this.getOffset(param1);
            _loc6_ = param2.y - param1.top | 0;
            this._SafeStr_3920.addValue(_loc6_);
            _loc7_ = this._SafeStr_3920.getMax();
            if (_loc7_ < this._SafeStr_4471 - 3) {
                _loc7_ = this._SafeStr_4471 - 3;
            }
            _loc8_ = param2.y - _loc7_ | 0;
            this._SafeStr_4471 = _loc7_;
            _loc10_ = param1.top + _loc4_ | 0;
            _loc5_ = _loc10_ - this.getMaximumVerticalLead(param1);
            _loc9_ = _loc8_ + _loc4_;
            if (_loc9_ < _loc5_) {
                _loc9_ = _loc5_;
            }
            this._SafeStr_2220.x = param2.x - this._SafeStr_2220.width / 2 | 0;
            this._SafeStr_2220.y = _loc9_;
            this._forcedPositionUpdate = false;
        }
        this._SafeStr_2220.blend = this._blend;
        this.show();
    }

    protected onMouseHoverEvent = (param1: WindowMouseEvent): void => {
        if (param1.type == "WME_OVER") {
            this._SafeStr_2283 = true;
        } else if (param1.type == "WME_OUT") {
            if (!param1.window.hitTestGlobalPoint(new Point(param1.stageX, param1.stageY))) {
                this._SafeStr_2283 = false;
            }
        }
    };

    protected setMinimized(param1: boolean): void {
        ContextInfoView._SafeStr_2596 = param1;
        this._forcedPositionUpdate = true;
        this.updateWindow();
    }

    protected getMinimizedView(): IWindowContainer {
        let _loc1_: XML = null;
        if (!this._SafeStr_2770) {
            _loc1_ = asInstanceOf(castTo(this._widget.assets.getAssetByName("minimized_menu"), XmlAsset).content, XML);
            this._SafeStr_2770 = asGuarded(this._widget.windowManager.buildFromXML(_loc1_, 0), isIWindowContainer);
            this._SafeStr_2770.findChildByName("minimize").addEventListener("WME_CLICK", this.onMaximize);
            this._SafeStr_2770.findChildByName("minimize").addEventListener("WME_OVER", this.onMinimizeHover);
            this._SafeStr_2770.findChildByName("minimize").addEventListener("WME_OUT", this.onMinimizeHover);
            this._SafeStr_2770.addEventListener("WME_OVER", this.onMouseHoverEvent);
            this._SafeStr_2770.addEventListener("WME_OUT", this.onMouseHoverEvent);
        }
        return this._SafeStr_2770;
    }

    private onMaximize = (param1: WindowMouseEvent): void => {
        this.setMinimized(false);
    };

    protected set activeView(param1: IWindowContainer) {
        if (!param1) {
            return;
        }
        if (this._SafeStr_2220) {
            this._SafeStr_2220.parent = null;
        }
        this._SafeStr_2220 = param1;
    }

    protected onMinimize = (param1: WindowMouseEvent): void => {
        this.setMinimized(true);
    };

    protected onMinimizeHover = (param1: WindowMouseEvent): void => {
        let _loc3_: IWindow = null;
        let _loc2_: IWindowContainer = asGuarded(param1.window, isIWindowContainer);
        if (_loc2_) {
            _loc3_ = _loc2_.findChildByName("icon");
            if (_loc3_) {
                if (param1.type == "WME_OVER") {
                    _loc3_.color = 4282950861;
                } else {
                    _loc3_.color = 16777215;
                }
            }
        }
    };

    public set forceActivateOnUpdate(param1: boolean) {
        this._forceActivateOnUpdate = param1;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    get [IDisposable](): true {
        return true;
    }
}
