import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IToolTipWindow } from '@/com/sulake/core/window/components/IToolTipWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IToolTipAgentService } from '@/com/sulake/core/window/services/IToolTipAgentService';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { WindowMouseOperator } from '@/com/sulake/core/window/Classes.group';
import { isIInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import { isIToolTipWindow } from '@/com/sulake/core/window/components/IToolTipWindow';

export class WindowToolTipAgent extends WindowMouseOperator implements IToolTipAgentService {
    static { registerClassName(this, 'com.sulake.core.window.services::WindowToolTipAgent'); }

    constructor(param1: DisplayObject) {
        super(param1);
    }

    declare protected _toolTipCaption: string;

    declare protected _SafeStr_2315: IToolTipWindow;

    declare protected _SafeStr_2785: Timer;

    protected _toolTipOffset: Point = new Point(20, 20);
    protected _pointerOffset: Point = new Point();
    protected _toolTipDelay: number = 500;

    public override begin(param1: IWindow, param2: number = 0): IWindow {
        if (param1 && !param1.disposed) {
            if (isIInteractiveWindow(param1)) {
                this._toolTipCaption = castGuarded(param1, isIInteractiveWindow, "com.sulake.core.window.components.IInteractiveWindow").toolTipCaption;
                this._toolTipDelay = castGuarded(param1, isIInteractiveWindow, "com.sulake.core.window.components.IInteractiveWindow").toolTipDelay;
            } else {
                this._toolTipCaption = param1.caption;
                this._toolTipDelay = 500;
            }
            this._mouse.x = this._root.mouseX;
            this._mouse.y = this._root.mouseY;
            this.getMousePositionRelativeTo(param1, this._mouse, this._pointerOffset);
            if (this._SafeStr_2785 == null) {
                this._SafeStr_2785 = new Timer(this._toolTipDelay, 1);
                this._SafeStr_2785.addEventListener("timer", this.showToolTip);
            }
            this._SafeStr_2785.reset();
            this._SafeStr_2785.start();
        }
        return super.begin(param1, param2);
    }

    public override end(param1: IWindow): IWindow {
        if (this._SafeStr_2785 != null) {
            this._SafeStr_2785.stop();
            this._SafeStr_2785.removeEventListener("timer", this.showToolTip);
            this._SafeStr_2785 = null;
        }
        this.hideToolTip();
        return super.end(param1);
    }

    public override operate(param1: number, param2: number): void {
        if (this._window && !this._window.disposed) {
            this._mouse.x = param1;
            this._mouse.y = param2;
            this.getMousePositionRelativeTo(this._window, this._mouse, this._pointerOffset);
            if (this._SafeStr_2315 != null && !this._SafeStr_2315.disposed) {
                this._SafeStr_2315.x = param1 + this._toolTipOffset.x | 0;
                this._SafeStr_2315.y = param2 + this._toolTipOffset.y | 0;
            }
        }
    }

    public updateCaption(param1: IWindow): void {
        let _loc2_: string = null;
        if (param1 == null || Boolean(param1.disposed) || this._SafeStr_2315 == null || Boolean(this._SafeStr_2315.disposed)) {
            return;
        }
        if (isIInteractiveWindow(param1)) {
            _loc2_ = castGuarded(param1, isIInteractiveWindow, "com.sulake.core.window.components.IInteractiveWindow").toolTipCaption;
        } else {
            _loc2_ = param1.caption;
        }
        if (_loc2_ != this._toolTipCaption) {
            this._toolTipCaption = _loc2_;
            if (_loc2_ == null || _loc2_.length == 0) {
                this._SafeStr_2315.visible = false;
            } else {
                this._SafeStr_2315.caption = _loc2_;
                this._SafeStr_2315.visible = true;
            }
        }
    }

    protected hideToolTip(): void {
        if (this._SafeStr_2315 != null && !this._SafeStr_2315.disposed) {
            this._SafeStr_2315.destroy();
            this._SafeStr_2315 = null;
        }
    }

    protected showToolTip = (param1: TimerEvent): void => {
        let _loc2_: Point = null;
        if (this._SafeStr_2785 != null) {
            this._SafeStr_2785.reset();
        }
        if (this._window && !this._window.disposed) {
            if (isIInteractiveWindow(this._window)) {
                this._toolTipCaption = castGuarded(this._window, isIInteractiveWindow, "com.sulake.core.window.components.IInteractiveWindow").toolTipCaption;
            } else {
                this._toolTipCaption = this._window.caption;
            }
            if (this._SafeStr_2315 == null || Boolean(this._SafeStr_2315.disposed)) {
                this._SafeStr_2315 = asGuarded(this._window.context.create(this._window.name + "::ToolTip", this._toolTipCaption, 8, this._window.style, (0x20 | 0) >>> 0, null, null, null, 0, null, null), isIToolTipWindow);
            }
            _loc2_ = new Point();
            this._window.getGlobalPosition(_loc2_);
            this._SafeStr_2315.x = _loc2_.x + this._pointerOffset.x + this._toolTipOffset.x | 0;
            this._SafeStr_2315.y = _loc2_.y + this._pointerOffset.y + this._toolTipOffset.y | 0;
            this._SafeStr_2315.visible = this._SafeStr_2315.caption.length > 0;
        }
    };
}
