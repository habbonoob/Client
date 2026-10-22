import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IWindowContext } from '@/com/sulake/core/window/IWindowContext';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { SecurityError } from '@habbo-pixi/runtime/lang/SecurityError';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class ModalDialog implements IModalDialog {
    static { registerClassName(this, 'com.sulake.habbo.window.utils::ModalDialog'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        ModalDialog.#initStatics();
        return ModalDialog._log;
    }

    private static readonly MODAL_DIALOG_LAYER: number = 3;
    private static readonly COLOR_TRANSFORM: ColorTransform = new ColorTransform(0.25, 0.25, 0.25);
    private static _SafeStr_2427: Stage = null;
    private static _windowManager: HabboWindowManagerComponent;
    private static _container: IWindowContainer;
    private static _SafeStr_3881: number = 0;

    private static get modalContext(): IWindowContext {
        return ModalDialog._windowManager.getWindowContext(3);
    }

    private static initialiseStaticMembers(param1: HabboWindowManagerComponent): void {
        if (ModalDialog._SafeStr_2427 == null) {
            ModalDialog._windowManager = param1;
            ModalDialog._SafeStr_2427 = ModalDialog._windowManager.context.displayObjectContainer.stage;
            ModalDialog._container = asGuarded(ModalDialog.modalContext.create("", "", 4, 0, 0, new Rectangle(0, 0, 1, 1), null, null, 0), isIWindowContainer);
            ModalDialog._SafeStr_2427.addEventListener("resize", ModalDialog.onResize);
            ModalDialog._SafeStr_2427.addEventListener("enterFrame", ModalDialog.onEnterFrame);
        }
    }

    private static refresh(): void {
        let _loc4_: number = 0;
        let _loc2_: IDesktopWindow = null;
        let _loc9_: IWindow = null;
        let _loc3_: IWindowContext = null;
        let _loc6_: IBitmapWrapperWindow = null;
        let _loc7_: IWindow = null;
        if (ModalDialog._container == null) {
            return;
        }
        let _loc8_: any = ModalDialog._container.numChildren == 0;
        _loc4_ = 0;
        while (_loc4_ < 3) {
            _loc2_ = ModalDialog._windowManager.getWindowContext(_loc4_ >>> 0).getDesktopWindow();
            _loc2_.visible = _loc8_;
            if (_loc8_) {
                for (_loc9_ of valuesOf(_loc2_.iterator)) {
                    _loc9_.invalidate();
                }
            }
            _loc4_++;
        }
        if (_loc8_) {
            return;
        }
        let _loc5_: Rectangle = new Rectangle(0, 0, Math.max(1, ModalDialog._SafeStr_2427.stageWidth), Math.max(1, ModalDialog._SafeStr_2427.stageHeight));
        ModalDialog._container.rectangle = _loc5_;
        _loc4_ = 0;
        while (_loc4_ < ModalDialog._container.numChildren) {
            _loc9_ = ModalDialog._container.getChildAt(_loc4_);
            if (_loc4_ % 2 == 0) {
                _loc9_.rectangle = _loc5_;
                castGuarded(_loc9_, isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow").bitmap = null;
            } else {
                _loc9_.center();
            }
            _loc4_++;
        }
        let _loc1_: BitmapData = new BitmapData(_loc5_.width | 0, _loc5_.height | 0, false, 0);
        _loc4_ = 0;
        while (_loc4_ < 3) {
            _loc3_ = ModalDialog._windowManager.getWindowContext(_loc4_ >>> 0);
            if (_loc3_ != null) {
                try {
                    _loc1_.draw(_loc3_.getDesktopWindow().getDisplayObject());
                } catch ($e) {
                    if ($e instanceof SecurityError) {
                        let e: SecurityError = $e;
                        ModalDialog._log.warn("security error while drawing modal dialog:" + e.message);
                    } else {
                        throw $e;
                    }
                }
            }
            _loc4_++;
        }
        _loc1_.colorTransform(_loc1_.rect, ModalDialog.COLOR_TRANSFORM);
        _loc4_ = 0;
        while (_loc4_ < ModalDialog._container.numChildren) {
            _loc9_ = ModalDialog._container.getChildAt(_loc4_);
            if (_loc4_ % 2 == 0) {
                _loc6_ = isIBitmapWrapperWindow(_loc9_) ? _loc9_ : null;
                if (_loc4_ >= 2) {
                    _loc6_.bitmap = _loc1_.clone();
                    _loc1_ = _loc6_.bitmap;
                    _loc7_ = ModalDialog._container.getChildAt(_loc4_ - 1);
                    _loc1_.draw(castTo(_loc7_, WindowController).getGraphicContext(true), new Matrix(1, 0, 0, 1, _loc7_.x, _loc7_.y), ModalDialog.COLOR_TRANSFORM);
                } else {
                    _loc6_.bitmap = _loc1_;
                }
            }
            _loc9_.visible = _loc4_ >= ModalDialog._container.numChildren - 2;
            _loc9_.invalidate();
            _loc4_++;
        }
    }

    constructor(param1: HabboWindowManagerComponent, param2: XML) {
        ModalDialog.initialiseStaticMembers(param1);
        this._background = asGuarded(ModalDialog.modalContext.create("", "", 21, 0, 1, new Rectangle(0, 0, 1, 1), null, ModalDialog._container, 0), isIBitmapWrapperWindow);
        this._rootWindow = ModalDialog._windowManager.buildFromXML(param2, 3);
        ModalDialog._container.addChild(this._rootWindow);
        this._rootWindow.center();
        ModalDialog._container.visible = true;
        ModalDialog.refresh();
    }

    declare private _rootWindow: IWindow;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _background: IBitmapWrapperWindow;

    public get background(): IBitmapWrapperWindow {
        return this._background;
    }

    public get rootWindow(): IWindow {
        return this._rootWindow;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._background != null) {
                this._background.dispose();
                this._background = null;
            }
            if (this._rootWindow != null) {
                this._rootWindow.dispose();
                this._rootWindow = null;
            }
            ModalDialog.refresh();
            if (ModalDialog._container != null && ModalDialog._container.numChildren == 0) {
                ModalDialog._container.visible = false;
            }
            this._disposed = true;
        }
    }

    private static onResize(param1: Event): void {
        if (ModalDialog._container == null || ModalDialog._container.numChildren <= 0) {
            return;
        }
        ModalDialog._SafeStr_3881 = 2;
        ModalDialog._container.getChildAt(ModalDialog._container.numChildren - 1).center();
    }

    private static onEnterFrame(param1: Event): void {
        if (ModalDialog._container == null || ModalDialog._container.numChildren <= 0) {
            return;
        }
        if (ModalDialog._SafeStr_3881 > 0) {
            ModalDialog._SafeStr_3881 = ModalDialog._SafeStr_3881 - 1;
            if (ModalDialog._SafeStr_3881 == 0) {
                ModalDialog.refresh();
            }
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ModalDialog.#staticsReady) return;
        ModalDialog.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ModalDialog, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.window.utils.ModalDialog"));
    }

    get [IDisposable](): true {
        return true;
    }
}
