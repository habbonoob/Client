import { asGuarded, asInstanceOf, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { ScrollBarLiftController, WindowController } from '@/com/sulake/core/window/Classes.group';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIGraphicContextHost } from '@/com/sulake/core/window/graphics/IGraphicContextHost';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { ScaledWindowRegion } from '@/com/sulake/core/window/utils/ScaledWindowRegion';

export class ScaledWindow implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.window.utils::ScaledWindow'); }

    declare private _content: IWindowContainer;

    declare private _window: IRegionWindow;

    declare private _SafeStr_15102: IDisplayObjectWrapper;

    declare private _display: Sprite;

    private _scale: number = 1;

    declare private _SafeStr_15103: IWindow;

    declare private _SafeStr_15104: IWindow;

    declare private _SafeStr_15105: IWindow;

    declare private _SafeStr_15106: boolean;
    static { (this.prototype as any)._SafeStr_15106 = false; }

    declare private _SafeStr_15107: boolean;
    static { (this.prototype as any)._SafeStr_15107 = false; }

    declare private _SafeStr_15108: ScrollBarLiftController;

    declare private _scrollbarDragPoint: Point;

    declare private _SafeStr_15109: Stage;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer) {
        this._content = param1;
        this._content.parent = null;
        this._content.setParamFlag((0x0C0000 | 0x300000) >>> 0, false);
        this._content.position = new Point();
        this._content.setParamFlag(16, false);
        this._window = new ScaledWindowRegion(this._content, this.onWindowEvent, this.acceptsInput);
        this._window.parent = null;
        this._window.clipping = false;
        this._window.mouseThreshold = 0;
        this._window.interactiveCursorDisabled = true;
        this._SafeStr_15102 = asGuarded(this._content.context.create("scaled_content", "", 20, 0, 0, this._content.rectangle, null, this._window, 0), isIDisplayObjectWrapper);
        this._SafeStr_15102.ignoreMouseEvents = true;
        this._SafeStr_15102.clipping = false;
        this._display = new Sprite();
        this._display.mouseEnabled = false;
        this._display.mouseChildren = false;
        this._display.addChild(asInstanceOf(castGuarded(this._content, isIGraphicContextHost, "com.sulake.core.window.graphics.IGraphicContextHost").getGraphicContext(true), DisplayObject));
        this._SafeStr_15102.setDisplayObject(this._display);
        this._content.addEventListener("WE_RESIZED", this.onContentResized);
        this._content.invalidate();
    }

    private static preventNativeOperation(param1: WindowEvent): void {
        param1.preventWindowOperation();
    }

    private static setPressed(param1: IWindow, param2: boolean): void {
        if (param1 != null && !param1.disposed) {
            param1.setStateFlag(16, param2);
        }
    }

    public get window(): IWindow {
        return this._window;
    }

    public set nativeMouseInput(param1: boolean) {
        this._display.mouseChildren = param1;
    }

    public get scale(): number {
        return this._scale;
    }

    public set scale(param1: number) {
        if (this._scale != param1) {
            this._scale = param1;
            this.updateSize();
        }
    }

    public get dragging(): boolean {
        return this._SafeStr_15107;
    }

    public set draggable(param1: boolean) {
        if (this._SafeStr_15106 == param1) {
            return;
        }
        this._SafeStr_15106 = param1;
        this._SafeStr_15107 = false;
        this.clearPressedTarget();
        this._SafeStr_15105 = null;
        if (!this._window.disposed) {
            this._window.context.getWindowServices().getMouseDraggingService().end(this._window);
        }
    }

    private onContentResized = (param1: WindowEvent): void => {
        this.updateSize();
    };

    private acceptsInput = (param1: Point): boolean => {
        return !this._disposed && (this._SafeStr_15106 || this._SafeStr_15104 != null || this.findTarget(new Point(param1.x / this._scale, param1.y / this._scale)) != null);
    };

    private updateSize(): void {
        this._display.scaleX = this._display.scaleY = this._scale;
        this._window.width = Math.ceil(this._content.width * this._scale) | 0;
        this._window.height = Math.ceil(this._content.height * this._scale) | 0;
        this._SafeStr_15102.width = this._window.width;
        this._SafeStr_15102.height = this._window.height;
    }

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: IWindow = null;
        let _loc5_: IWindow = null;
        let _loc3_: WindowMouseEvent = param1 instanceof WindowMouseEvent ? param1 : null;
        if (_loc3_ == null || this._disposed) {
            return;
        }
        _loc3_.preventWindowOperation();
        if (_loc3_.type == "WME_WHEEL" && _loc3_.ctrlKey) {
            this.forward(this._window.desktop.findChildByName("room_canvas_wrapper"), _loc3_.type, new Point(_loc3_.stageX, _loc3_.stageY), _loc3_);
            return;
        }
        let _loc6_: Point = new Point(_loc3_.localX / this._scale, _loc3_.localY / this._scale);
        let _loc7_: IWindow = this._SafeStr_15106 ? null : this.findTarget(_loc6_);
        if (_loc3_.type == "WME_OUT" || _loc3_.type == "WME_UP_OUTSIDE") {
            _loc7_ = null;
        }
        this.updateHover(_loc7_, _loc6_, _loc3_);
        switch (_loc3_.type) {
            case "WME_DOWN":
                this._SafeStr_15107 = this._SafeStr_15106;
                if (this._SafeStr_15107) {
                    this._window.context.getWindowServices().getMouseDraggingService().begin(this._window);
                }
                this._SafeStr_15105 = null;
                this.clearPressedTarget();
                this._SafeStr_15104 = _loc7_;
                ScaledWindow.setPressed(_loc7_, true);
                this.forward(_loc7_, _loc3_.type, _loc6_, _loc3_);
                if (_loc7_ instanceof ScrollBarLiftController) {
                    this.beginScrollbarDrag(castTo(_loc7_, ScrollBarLiftController), _loc3_);
                }
                break;
            case "WME_UP":
            case "WME_UP_OUTSIDE":
                this.endScrollbarDrag();
                this._SafeStr_15107 = false;
                this._window.context.getWindowServices().getMouseDraggingService().end(this._window);
                _loc4_ = this._SafeStr_15104;
                this._SafeStr_15105 = _loc4_ == _loc7_ ? _loc7_ : null;
                this.clearPressedTarget();
                this.forward(_loc4_, _loc4_ == _loc7_ ? "WME_UP" : "WME_UP_OUTSIDE", _loc6_, _loc3_);
                break;
            case "WME_CLICK":
                _loc5_ = this._SafeStr_15105;
                this._SafeStr_15105 = null;
                if (_loc5_ == _loc7_) {
                    this.forward(_loc5_, "WME_CLICK", _loc6_, _loc3_);
                }
                break;
            case "WME_MOVE":
            case "WME_WHEEL":
            case "WME_WHEEL_HORIZONTAL":
                this.forward(_loc7_, _loc3_.type, _loc6_, _loc3_);
        }
    };

    private beginScrollbarDrag(param1: ScrollBarLiftController, param2: WindowMouseEvent): void {
        this.endScrollbarDrag();
        this._SafeStr_15108 = param1;
        this._scrollbarDragPoint = this._display.globalToLocal(new Point(param2.stageX, param2.stageY));
        this._SafeStr_15109 = this._display.stage;
        this._SafeStr_15109.addEventListener("mouseMove", this.onScrollbarDragged);
        this._SafeStr_15109.addEventListener("mouseUp", this.onScrollbarReleased);
    }

    private onScrollbarDragged = (param1: MouseEvent): void => {
        let _loc2_: Point = this._display.globalToLocal(new Point(param1.stageX, param1.stageY));
        this._SafeStr_15108.offset(_loc2_.x - this._scrollbarDragPoint.x, _loc2_.y - this._scrollbarDragPoint.y);
        this._scrollbarDragPoint = _loc2_;
    };

    private onScrollbarReleased = (param1: MouseEvent): void => {
        this.endScrollbarDrag();
    };

    private endScrollbarDrag(): void {
        if (this._SafeStr_15109 != null) {
            this._SafeStr_15109.removeEventListener("mouseMove", this.onScrollbarDragged);
            this._SafeStr_15109.removeEventListener("mouseUp", this.onScrollbarReleased);
        }
        this._SafeStr_15109 = null;
        this._SafeStr_15108 = null;
        this._scrollbarDragPoint = null;
    }

    private findTarget(param1: Point): IWindow {
        let _loc3_: number = 0;
        let _loc4_: IWindow = null;
        let _loc2_: any[] = [];
        this._content.groupChildrenUnderPoint(param1, _loc2_);
        _loc3_ = _loc2_.length - 1;
        while (_loc3_ >= 0) {
            _loc4_ = asGuarded(_loc2_[_loc3_], isIWindow);
            if (_loc4_.getParamFlag(1) && !_loc4_.ignoreMouseEvents && _loc4_.isEnabled()) {
                while (_loc4_.testParamFlag(3) && _loc4_.parent != null) {
                    _loc4_ = _loc4_.parent;
                }
                return _loc4_;
            }
            _loc3_--;
        }
        return null;
    }

    private updateHover(param1: IWindow, param2: Point, param3: WindowMouseEvent): void {
        let _loc4_: IWindow = null;
        if (this._SafeStr_15103 != param1) {
            _loc4_ = this._SafeStr_15103;
            this._SafeStr_15103 = param1;
            if (_loc4_ != null && !_loc4_.disposed) {
                _loc4_.setStateFlag(4, false);
                ScaledWindow.setPressed(_loc4_, false);
                this.forward(_loc4_, "WME_OUT", param2, param3);
            }
            if (param1 != null && !param1.disposed) {
                param1.setStateFlag(4, true);
                this.forward(param1, "WME_OVER", param2, param3);
            }
        }
        ScaledWindow.setPressed(param1, param1 != null && param1 == this._SafeStr_15104 && param3.buttonDown);
        let _loc5_: IInteractiveWindow = isIInteractiveWindow(param1) ? param1 : null;
        this._window.interactiveCursorDisabled = !this._SafeStr_15106 && (_loc5_ == null || _loc5_.interactiveCursorDisabled);
        this._window.setStateFlag(4, param1 != null || this._SafeStr_15106 && param3.type != "WME_OUT" && param3.type != "WME_UP_OUTSIDE");
    }

    private forward(param1: IWindow, param2: string, param3: Point, param4: WindowMouseEvent): void {
        if (param1 == null || Boolean(param1.disposed)) {
            return;
        }
        let _loc5_: Point = new Point();
        param1.getGlobalPosition(_loc5_);
        let _loc6_: WindowMouseEvent = WindowMouseEvent.allocate_WindowMouseEvent(param2, param1, null, param3.x - _loc5_.x, param3.y - _loc5_.y, param4.stageX, param4.stageY, param4.altKey, param4.ctrlKey, param4.shiftKey, param4.buttonDown, param4.delta);
        param1.addEventListener(param2, ScaledWindow.preventNativeOperation, -2147483648);
        try {
            castTo(param1, WindowController).update(castTo(param1, WindowController), _loc6_);
        } finally {
            param1.removeEventListener(param2, ScaledWindow.preventNativeOperation);
            _loc6_.recycle();
        }
    }

    private clearPressedTarget(): void {
        ScaledWindow.setPressed(this._SafeStr_15104, false);
        this._SafeStr_15104 = null;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.endScrollbarDrag();
        if (!this._window.disposed) {
            this._window.context.getWindowServices().getMouseDraggingService().end(this._window);
        }
        this._content.removeEventListener("WE_RESIZED", this.onContentResized);
        this._content.dispose();
        this._window.dispose();
        this._content = null;
        this._window = null;
        this._SafeStr_15102 = null;
        this._display = null;
        this._SafeStr_15103 = null;
        this._SafeStr_15104 = null;
        this._SafeStr_15105 = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
