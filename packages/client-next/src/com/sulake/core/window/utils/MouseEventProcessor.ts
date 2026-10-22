import { asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindowRenderer } from '@/com/sulake/core/window/graphics/IWindowRenderer';
import type { IInputEventTracker } from '@/com/sulake/core/window/IInputEventTracker';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { EventProcessorState } from '@/com/sulake/core/window/utils/EventProcessorState';
import type { IEventProcessor } from '@/com/sulake/core/window/utils/IEventProcessor';
import type { IEventQueue } from '@/com/sulake/core/window/utils/IEventQueue';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RegionController, WindowController } from '@/com/sulake/core/window/Classes.group';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIInputProcessorRoot } from '@/com/sulake/core/window/utils/IInputProcessorRoot';
import { MouseCursorControl } from '@/com/sulake/core/window/utils/MouseCursorControl';

export class MouseEventProcessor implements IEventProcessor, IDisposable {
    static { registerClassName(this, 'com.sulake.core.window.utils::MouseEventProcessor'); }

    protected static _mouseCursorTypes: any[];
    protected static _mouseCursorStates: any[];
    protected static GLOBAL_POINT: Point = new Point();

    declare protected _SafeStr_3426: Point;

    declare protected _SafeStr_2320: WindowController;

    declare protected _SafeStr_2471: WindowController;

    declare protected _SafeStr_3012: WindowController;

    declare protected _SafeStr_2262: WindowController;

    declare protected _renderer: IWindowRenderer;

    declare protected _SafeStr_2264: IDesktopWindow;

    declare protected _eventTrackers: IInputEventTracker[];

    private _disposed: boolean = false;

    constructor() {
        this._SafeStr_3426 = new Point();
        if (MouseEventProcessor._mouseCursorTypes == null) {
            MouseEventProcessor._mouseCursorTypes = [];
            MouseEventProcessor._mouseCursorTypes[0] = 2;
            MouseEventProcessor._mouseCursorTypes[1] = 0;
            MouseEventProcessor._mouseCursorTypes[2] = 2;
            MouseEventProcessor._mouseCursorTypes[3] = 2;
            MouseEventProcessor._mouseCursorTypes[4] = 2;
            MouseEventProcessor._mouseCursorTypes[5] = 0;
            MouseEventProcessor._mouseCursorTypes[6] = 2;
        }
        if (MouseEventProcessor._mouseCursorStates == null) {
            MouseEventProcessor._mouseCursorStates = [];
            MouseEventProcessor._mouseCursorStates[0] = 1;
            MouseEventProcessor._mouseCursorStates[1] = 2;
            MouseEventProcessor._mouseCursorStates[2] = 4;
            MouseEventProcessor._mouseCursorStates[3] = 64;
            MouseEventProcessor._mouseCursorStates[4] = 8;
            MouseEventProcessor._mouseCursorStates[5] = 16;
            MouseEventProcessor._mouseCursorStates[6] = 32;
        }
    }

    public static setMouseCursorByState(param1: number, param2: number): void {
        let _loc3_: number = MouseEventProcessor._mouseCursorStates.indexOf(param1);
        if (_loc3_ > -1) {
            MouseEventProcessor._mouseCursorTypes[_loc3_] = param2;
        }
    }

    public static getMouseCursorByState(param1: number): number {
        let _loc2_: number = MouseEventProcessor._mouseCursorStates.length;
        while (_loc2_-- > 0) {
            if ((param1 & MouseEventProcessor._mouseCursorStates[_loc2_]) > 0) {
                return MouseEventProcessor._mouseCursorTypes[_loc2_] >>> 0;
            }
        }
        return 0;
    }

    protected static convertMouseEventType(param1: MouseEvent, param2: IWindow, param3: IWindow, param4: string = null): WindowMouseEvent {
        let _loc6_: string = null;
        let _loc7_: boolean = false;
        let _loc8_: Point = new Point(param1.stageX, param1.stageY);
        param2.convertPointFromGlobalToLocalSpace(_loc8_);
        let _loc5_: string;
        switch (_loc5_ = param4 == null ? param1.type : param4) {
            case "mouseMove":
                _loc6_ = "WME_MOVE";
                break;
            case "mouseOver":
                _loc6_ = "WME_OVER";
                break;
            case "mouseOut":
                _loc6_ = "WME_OUT";
                break;
            case "rollOut":
                _loc6_ = "WME_ROLL_OUT";
                break;
            case "rollOver":
                _loc6_ = "WME_ROLL_OVER";
                break;
            case "click":
                _loc6_ = "WME_CLICK";
                break;
            case "doubleClick":
                _loc6_ = "WME_DOUBLE_CLICK";
                break;
            case "mouseDown":
                _loc6_ = "WME_DOWN";
                break;
            case "mouseUp":
                _loc7_ = _loc8_.x > -1 && _loc8_.y > -1 && _loc8_.x < param2.width && _loc8_.y < param2.height;
                _loc6_ = _loc7_ ? "WME_UP" : "WME_UP_OUTSIDE";
                break;
            case "mouseWheel":
                _loc6_ = "WME_WHEEL";
                break;
            case "mouseWheelHorizontal":
                _loc6_ = "WME_WHEEL_HORIZONTAL";
                break;
            default:
                _loc6_ = "";
        }
        return WindowMouseEvent.allocate_WindowMouseEvent(_loc6_, param2, param3, _loc8_.x, _loc8_.y, param1.stageX, param1.stageY, param1.altKey, param1.ctrlKey, param1.shiftKey, param1.buttonDown, param1.delta);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._disposed = true;
        }
    }

    public process(param1: EventProcessorState, param2: IEventQueue): void {
        let _loc5_: number = 0;
        let _loc12_: WindowController = null;
        let _loc7_: any[] = null;
        let _loc11_: MouseEvent = null;
        let _loc9_: WindowEvent = null;
        let _loc10_: IWindow = null;
        let _loc6_: boolean = false;
        let _loc8_: WindowMouseEvent = null;
        let _loc3_: IWindow = null;
        let _loc4_: IInteractiveWindow = null;
        if (param2.length == 0) {
            return;
        }
        this._SafeStr_2264 = param1.desktop;
        this._SafeStr_2262 = param1.hoverTarget instanceof WindowController ? param1.hoverTarget : null;
        this._SafeStr_2320 = param1.lastClickTarget instanceof WindowController ? param1.lastClickTarget : null;
        this._SafeStr_2471 = param1.lastMouseDownTarget instanceof WindowController ? param1.lastMouseDownTarget : null;
        this._SafeStr_3012 = param1.lastClickAwayTarget instanceof WindowController ? param1.lastClickAwayTarget : null;
        this._renderer = param1.renderer;
        this._eventTrackers = param1.eventTrackers;
        param2.begin();
        this._SafeStr_3426.x = -1;
        this._SafeStr_3426.y = -1;
        let _loc13_: number = 0;
        while (true) {
            _loc11_ = asInstanceOf(param2.next(), MouseEvent);
            if (_loc11_ == null) {
                break;
            }
            if (_loc11_.stageX != this._SafeStr_3426.x || _loc11_.stageY != this._SafeStr_3426.y) {
                this._SafeStr_3426.x = _loc11_.stageX;
                this._SafeStr_3426.y = _loc11_.stageY;
                _loc7_ = [];
                this._SafeStr_2264.groupParameterFilteredChildrenUnderPoint(this._SafeStr_3426, _loc7_, 1);
            }
            _loc5_ = (_loc7_ != null ? _loc7_.length : 0) | 0;
            if (_loc5_ == 0) {
                switch (_loc11_.type) {
                    case "mouseMove":
                        if ((this._SafeStr_2262 as unknown) != this._SafeStr_2264 && !this._SafeStr_2262.disposed) {
                            this._SafeStr_2262.getGlobalPosition(MouseEventProcessor.GLOBAL_POINT);
                            _loc9_ = WindowMouseEvent.allocate_WindowMouseEvent("WME_OUT", this._SafeStr_2262, null, _loc11_.stageX - MouseEventProcessor.GLOBAL_POINT.x, _loc11_.stageY - MouseEventProcessor.GLOBAL_POINT.y, _loc11_.stageX, _loc11_.stageY, _loc11_.altKey, _loc11_.ctrlKey, _loc11_.shiftKey, _loc11_.buttonDown, _loc11_.delta);
                            this._SafeStr_2262.update(this._SafeStr_2262, _loc9_);
                            this._SafeStr_2262 = castTo(this._SafeStr_2264, WindowController);
                            _loc9_.recycle();
                        }
                        break;
                    case "mouseDown":
                        _loc10_ = this._SafeStr_2264.getActiveWindow();
                        if (_loc10_) {
                            _loc10_.deactivate();
                        }
                }
            }
            if (_loc11_.type == "mouseUp" && this._SafeStr_2471 != null && _loc7_.indexOf(this._SafeStr_2471) == -1) {
                if (_loc7_ == null) {
                    _loc7_ = [];
                }
                _loc7_.push(this._SafeStr_2471);
                _loc5_++;
            }
            _loc6_ = false;
            while (--_loc5_ > -1) {
                _loc12_ = this.passMouseEvent(castTo(_loc7_[_loc5_], WindowController), _loc11_);
                if (!(_loc12_ != null && _loc12_.visible)) {
                    continue;
                }
                if (_loc11_.type == "mouseMove") {
                    if (_loc12_ != this._SafeStr_2262) {
                        if (!this._SafeStr_2262.disposed) {
                            this._SafeStr_2262.getGlobalPosition(MouseEventProcessor.GLOBAL_POINT);
                            _loc9_ = WindowMouseEvent.allocate_WindowMouseEvent("WME_OUT", this._SafeStr_2262, _loc12_, _loc11_.stageX - MouseEventProcessor.GLOBAL_POINT.x, _loc11_.stageY - MouseEventProcessor.GLOBAL_POINT.y, _loc11_.stageX, _loc11_.stageY, _loc11_.altKey, _loc11_.ctrlKey, _loc11_.shiftKey, _loc11_.buttonDown, _loc11_.delta);
                            this._SafeStr_2262.update(this._SafeStr_2262, _loc9_);
                            _loc9_.recycle();
                        }
                        if (!_loc12_.disposed) {
                            _loc12_.getGlobalPosition(MouseEventProcessor.GLOBAL_POINT);
                            _loc9_ = WindowMouseEvent.allocate_WindowMouseEvent("WME_OVER", _loc12_, null, _loc11_.stageX - MouseEventProcessor.GLOBAL_POINT.x, _loc11_.stageY - MouseEventProcessor.GLOBAL_POINT.y, _loc11_.stageX, _loc11_.stageY, _loc11_.altKey, _loc11_.ctrlKey, _loc11_.shiftKey, _loc11_.buttonDown, _loc11_.delta);
                            _loc12_.update(_loc12_, _loc9_);
                            _loc9_.recycle();
                        }
                        if (!_loc12_.disposed) {
                            this._SafeStr_2262 = _loc12_;
                        }
                    }
                }
                if (_loc11_.type == "mouseDown") {
                    if (this._SafeStr_3012 != null && !this._SafeStr_3012.disposed && _loc12_ != this._SafeStr_3012) {
                        _loc8_ = WindowMouseEvent.allocate_WindowMouseEvent("WME_CLICK_AWAY", this._SafeStr_3012, _loc12_, NaN, NaN, _loc11_.stageX, _loc11_.stageY, _loc11_.altKey, _loc11_.ctrlKey, _loc11_.shiftKey, _loc11_.buttonDown, _loc11_.delta);
                        this._SafeStr_3012.update(this._SafeStr_3012, _loc8_);
                        _loc8_.recycle();
                    }
                    this._SafeStr_3012 = _loc12_;
                }
                if (!_loc6_ && !(isIInputProcessorRoot(_loc12_)) && !(isIFrameWindow(_loc12_))) {
                    _loc3_ = _loc12_.parent;
                    while (!_loc6_ && _loc3_ && !_loc3_.disposed && !(isIFrameWindow(_loc3_))) {
                        if (isIInputProcessorRoot(_loc3_)) {
                            _loc9_ = MouseEventProcessor.convertMouseEventType(_loc11_, _loc3_, _loc12_);
                            _loc6_ = Boolean(castGuarded(_loc3_, isIInputProcessorRoot, "com.sulake.core.window.utils.IInputProcessorRoot").process(_loc9_));
                            _loc9_.recycle();
                        }
                        _loc3_ = _loc3_.parent;
                    }
                }
                if (isIInteractiveWindow(this._SafeStr_2262)) {
                    _loc4_ = castGuarded(this._SafeStr_2262, isIInteractiveWindow, "com.sulake.core.window.components.IInteractiveWindow");
                    if (_loc4_.interactiveCursorDisabled) {
                        _loc13_ = 0;
                    } else {
                        try {
                            _loc13_ = _loc4_.getMouseCursorByState(this._SafeStr_2262.state) | 0;
                            if (_loc13_ == 0) {
                                _loc13_ = MouseEventProcessor.getMouseCursorByState(this._SafeStr_2262.state) | 0;
                            }
                        } catch (e) {
                            _loc13_ = 0;
                        }
                    }
                }
                if ((_loc12_ as unknown) != this._SafeStr_2264) {
                    _loc11_.stopPropagation();
                    param2.remove();
                }
                break;
            }
        }
        param2.end();
        MouseCursorControl.type = _loc13_ >>> 0;
        param1.desktop = this._SafeStr_2264;
        param1.hoverTarget = this._SafeStr_2262;
        param1.lastClickTarget = this._SafeStr_2320;
        param1.lastMouseDownTarget = this._SafeStr_2471;
        param1.lastClickAwayTarget = this._SafeStr_3012;
        param1.renderer = this._renderer;
        param1.eventTrackers = this._eventTrackers;
    }

    private passMouseEvent(param1: WindowController, param2: MouseEvent, param3: boolean = false): WindowController {
        let _loc11_: any;
        let _loc12_: BitmapData = null;
        let _loc10_: WindowMouseEvent = null;
        let _loc13_: boolean = false;
        if (param1.disposed) {
            return null;
        }
        if (param1.testStateFlag(32) && param2.type == "mouseMove" && param1 instanceof RegionController) {
            return param1;
        }
        if (param1.testStateFlag(32)) {
            return null;
        }
        let _loc4_: boolean = false;
        let _loc7_: Point = new Point(param2.stageX, param2.stageY);
        param1.convertPointFromGlobalToLocalSpace(_loc7_);
        if (param2.type == "mouseUp") {
            if (this._SafeStr_2471 == null) {
                this._SafeStr_2320 = null;
                return null;
            }
            if (param1 != this._SafeStr_2471) {
                if (this._SafeStr_2471 && !this._SafeStr_2471.disposed) {
                    this._SafeStr_2471.update(this._SafeStr_2471, MouseEventProcessor.convertMouseEventType(new MouseEvent("mouseUp", false, true, param2.localX, param2.localY, null, param2.ctrlKey, param2.altKey, param2.shiftKey, param2.buttonDown, param2.delta), this._SafeStr_2471, param1));
                    this._SafeStr_2320 = null;
                    if (param1.disposed) {
                        return null;
                    }
                }
            } else {
                _loc4_ = !param1.hitTestLocalPoint(_loc7_);
            }
            this._SafeStr_2471 = null;
        }
        if (!_loc4_) {
            if (param1.ignoreMouseEvents) {
                return null;
            }
            _loc12_ = this._renderer.getDrawBufferForRenderable(param1);
            if (!param1.validateLocalPointIntersection(_loc7_, _loc12_)) {
                return null;
            }
        }
        if (param1.testParamFlag(3)) {
            if (param1.parent != null) {
                return this.passMouseEvent(castTo(param1.parent, WindowController), param2);
            }
        }
        if (!param3) {
            switch (param2.type) {
                case "mouseDown":
                    this._SafeStr_2320 = param1;
                    this._SafeStr_2471 = param1;
                    break;
                case "click":
                    if (this._SafeStr_2320 != param1) {
                        this._SafeStr_2320 = null;
                        return null;
                    }
                    this._SafeStr_2320 = null;
                    break;
                case "doubleClick":
                    if (this._SafeStr_2320 != param1) {
                        this._SafeStr_2320 = null;
                        return null;
                    }
                    this._SafeStr_2320 = null;
            }
        }
        let _loc9_: IWindow = null;
        let _loc6_: any[] = [];
        if (param2.type == "doubleClick") {
            _loc6_.push("click");
        }
        _loc6_.push(param2.type);
        let _loc8_: boolean = false;
        for (const _loc5_ of _loc6_ ?? []) {
            _loc10_ = MouseEventProcessor.convertMouseEventType(param2, param1, _loc9_, stringOrNull(_loc5_));
            if (param1.update(param1, _loc10_)) {
                _loc8_ = true;
            }
            for (_loc11_ of this._eventTrackers ?? []) {
                _loc11_.eventReceived(_loc10_, param1);
            }
            _loc10_.recycle();
        }
        if (!_loc8_ && !param3) {
            _loc13_ = param2.type == "mouseWheel" || param2.type == "mouseWheelHorizontal";
            if (param1.parent && (!_loc13_ || !(isIFrameWindow(param1)))) {
                return this.passMouseEvent(castTo(param1.parent, WindowController), param2);
            }
        }
        return param1;
    }

    get [IDisposable](): true {
        return true;
    }
}
