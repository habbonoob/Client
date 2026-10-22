import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class WindowToggle implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.utils::WindowToggle'); }

    public static readonly RESULT_SHOW: number = 0;
    public static readonly RESULT_ACTIVATE: number = 1;
    public static readonly RESULT_HIDE: number = 2;

    declare private _window: IWindow;

    declare private _desktop: IDesktopWindow;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_4677: (...args: any[]) => any;

    declare private _hideFunction: (...args: any[]) => any;

    constructor(param1: IWindow, param2: IDesktopWindow, param3: (...args: any[]) => any = null, param4: (...args: any[]) => any = null) {
        this._window = param1;
        this._desktop = param2;
        this._SafeStr_4677 = param3;
        this._hideFunction = param4;
    }

    public static isHiddenByOtherWindows(param1: IWindow): boolean {
        let _loc8_: IWindow = null;
        let _loc7_: number = 0;
        let _loc3_: IDesktopWindow = param1.desktop;
        let _loc5_: number = _loc3_.numChildren;
        let _loc6_: number = _loc3_.getChildIndex(param1);
        if (_loc6_ < 0) {
            throw new Error("Window must be contained by the desktop!");
        }
        let _loc2_: Rectangle = new Rectangle();
        param1.getGlobalRectangle(_loc2_);
        let _loc4_: Rectangle = new Rectangle();
        _loc7_ = _loc6_ + 1;
        while (_loc7_ < _loc5_) {
            _loc8_ = _loc3_.getChildAt(_loc7_);
            if (_loc8_.visible) {
                _loc8_.getGlobalRectangle(_loc4_);
                if (_loc2_.intersects(_loc4_)) {
                    return true;
                }
            }
            _loc7_++;
        }
        return false;
    }

    public get window(): IWindow {
        return this._window;
    }

    public get visible(): boolean {
        return !!(this._window && this._window.visible && this._window.parent);
    }

    public get active(): boolean {
        return this.visible && this._window.getStateFlag(1);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._window) {
                this._window.dispose();
                this._window = null;
            }
            this._desktop = null;
            this._disposed = true;
            this._SafeStr_4677 = null;
            this._hideFunction = null;
        }
    }

    public show(): void {
        if (!this._window.disposed) {
            if (this._window.parent != this._desktop) {
                this._desktop.addChild(this._window);
            }
            if (!this._window.visible) {
                this._window.visible = true;
            }
            this._window.activate();
        }
    }

    public hide(): void {
        if (!this._window.disposed) {
            if (this._window.parent == this._desktop) {
                this._desktop.removeChild(this._window);
            }
            if (this._window.visible) {
                this._window.visible = false;
            }
            this._window.deactivate();
        }
    }

    public toggle(): void {
        if (this.visible) {
            if (this.active) {
                this._hideFunction == null ? this.hide() : this._hideFunction();
            } else if (WindowToggle.isHiddenByOtherWindows(this._window)) {
                this._window.activate();
            } else {
                this._hideFunction == null ? this.hide() : this._hideFunction();
            }
        } else {
            this._SafeStr_4677 == null ? this.show() : this._SafeStr_4677();
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
