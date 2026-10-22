import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { WindowController } from '@/com/sulake/core/window/Classes.group';

export class WindowMouseOperator implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.window.services::WindowMouseOperator'); }

    declare protected _root: DisplayObject;

    declare protected _window: WindowController;

    declare protected _working: boolean;
    static { (this.prototype as any)._working = false; }

    declare protected _offset: Point;

    declare protected _mouse: Point;

    declare protected _SafeStr_2472: Point;

    declare protected _flags: number;
    static { (this.prototype as any)._flags = 0; }

    private _disposed: boolean = false;

    constructor(param1: DisplayObject) {
        this.handler = this.handler.bind(this);
        this._root = param1;
        this._SafeStr_2472 = new Point();
        this._mouse = new Point();
        this._offset = new Point();
        this._working = false;
        this._flags = 0;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        this.end(this._window);
        this._offset = null;
        this._mouse = null;
        this._SafeStr_2472 = null;
        this._root = null;
        this._disposed = true;
    }

    public begin(param1: IWindow, param2: number = 0): IWindow {
        this._flags = param2;
        let _loc3_: IWindow = this._window;
        if (this._window != null) {
            this.end(this._window);
        }
        if (param1 && !param1.disposed) {
            this._root.addEventListener("mouseDown", this.handler, false);
            this._root.addEventListener("mouseUp", this.handler, false);
            this._root.addEventListener("enterFrame", this.handler);
            this._mouse.x = this._root.mouseX;
            this._mouse.y = this._root.mouseY;
            this._window = castTo(param1, WindowController);
            this.getMousePositionRelativeTo(param1, this._mouse, this._offset);
            this._window.addEventListener("WE_DESTROYED", this.clientWindowDestroyed);
            this._working = true;
        }
        return _loc3_;
    }

    public end(param1: IWindow): IWindow {
        let _loc2_: IWindow = this._window;
        if (this._working) {
            if (this._window == param1) {
                this._root.removeEventListener("mouseDown", this.handler, false);
                this._root.removeEventListener("mouseUp", this.handler, false);
                this._root.removeEventListener("enterFrame", this.handler);
                if (!this._window.disposed) {
                    this._window.removeEventListener("WE_DESTROYED", this.clientWindowDestroyed);
                }
                this._window = null;
                this._working = false;
            }
        }
        return _loc2_;
    }

    protected handler(param1: Event): void {
        let _loc2_: MouseEvent = null;
        if (this._working) {
            if (param1.type == "enterFrame") {
                if (this._window.disposed) {
                    this.end(this._window);
                } else if (this._mouse.x != this._root.mouseX || this._mouse.y != this._root.mouseY) {
                    this.operate(this._root.mouseX | 0, this._root.mouseY | 0);
                    this._mouse.x = this._root.mouseX;
                    this._mouse.y = this._root.mouseY;
                }
                return;
            }
            _loc2_ = param1 instanceof MouseEvent ? param1 : null;
            if (_loc2_ != null) {
                let _loc3_: string = _loc2_.type;
                if ("mouseUp" === _loc3_) {
                    this.end(this._window);
                }
            }
        }
    }

    public operate(param1: number, param2: number): void {
        this._mouse.x = param1;
        this._mouse.y = param2;
        this.getMousePositionRelativeTo(this._window, this._mouse, this._SafeStr_2472);
        this._window.offset(this._SafeStr_2472.x - this._offset.x, this._SafeStr_2472.y - this._offset.y);
    }

    private clientWindowDestroyed = (param1: WindowEvent): void => {
        this.end(this._window);
    };

    protected getMousePositionRelativeTo(param1: IWindow, param2: Point, param3: Point): void {
        param1.getGlobalPosition(param3);
        param3.x = param2.x - param3.x;
        param3.y = param2.y - param3.y;
    }

    get [IDisposable](): true {
        return true;
    }
}
