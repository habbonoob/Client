import { asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { WindowDisposeEvent } from '@/com/sulake/core/window/events/WindowDisposeEvent';
import type { IGraphicContext } from '@/com/sulake/core/window/graphics/IGraphicContext';
import type { IGraphicContextHost } from '@/com/sulake/core/window/graphics/IGraphicContextHost';
import type { ISkinContainer } from '@/com/sulake/core/window/graphics/ISkinContainer';
import type { IWindowRenderer } from '@/com/sulake/core/window/graphics/IWindowRenderer';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContext } from '@/com/sulake/core/window/IWindowContext';
import type { IChildWindowHost } from '@/com/sulake/core/window/utils/IChildWindowHost';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { TrackedBitmapData } from '@/com/sulake/core/utils/profiler/tracking/TrackedBitmapData';
import { isIDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import { isIGraphicContextHost } from '@/com/sulake/core/window/graphics/IGraphicContextHost';
import { WindowRendererItem } from '@/com/sulake/core/window/graphics/WindowRendererItem';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIChildWindowHost } from '@/com/sulake/core/window/utils/IChildWindowHost';

export class WindowRenderer implements IWindowRenderer {
    static { registerClassName(this, 'com.sulake.core.window.graphics::WindowRenderer'); }

    protected static readonly MAX_DIRTY_REGIONS_PER_WINDOW: number = 3;
    protected static readonly MAX_DISTANCE_BEFORE_COMBINE: number = 10;
    protected static readonly RECT: Rectangle = new Rectangle();
    private static readonly POINT_ZERO: Point = new Point();

    private static areRectanglesCloseEnough(param1: Rectangle, param2: Rectangle, param3: number): boolean {
        if (param1.intersects(param2)) {
            return true;
        }
        return (param1.left > param2.left ? param1.left - param2.right : param2.left - param1.right) <= param3 && (param1.top > param2.top ? param1.top - param2.bottom : param2.top - param1.bottom) <= param3;
    }

    private static getDrawLocationAndClipRegion(param1: IWindow, param2: Rectangle, param3: Point, param4: Rectangle): boolean {
        let _loc6_: number = 0;
        let _loc5_: boolean = true;
        param4.x = 0;
        param4.y = 0;
        param4.width = param1.renderingWidth;
        param4.height = param1.renderingHeight;
        if (!param1.testParamFlag(16)) {
            if (param1.parent && param1.testParamFlag(1073741824)) {
                _loc5_ = WindowRenderer.childRectToClippedDrawRegion(param1.parent, param3, param4);
                param3.x = param4.x;
                param3.y = param4.y;
            } else {
                param3.x = 0;
                param3.y = 0;
            }
        } else if (param1.parent) {
            _loc5_ = WindowRenderer.childRectToClippedDrawRegion(param1.parent, param3, param4);
        } else {
            param3.x = 0;
            param3.y = 0;
        }
        if (param2.x > param4.x) {
            _loc6_ = param2.x - param4.x | 0;
            param3.x += _loc6_;
            param4.x += _loc6_;
            param4.width -= _loc6_;
        }
        if (param2.y > param4.y) {
            _loc6_ = param2.y - param4.y | 0;
            param3.y += _loc6_;
            param4.y += _loc6_;
            param4.height -= _loc6_;
        }
        if (param2.right < param4.right) {
            _loc6_ = param4.right - param2.right | 0;
            param4.width -= _loc6_;
        }
        if (param2.bottom < param4.bottom) {
            _loc6_ = param4.bottom - param2.bottom | 0;
            param4.height -= _loc6_;
        }
        return _loc5_ && param4.width > 0 && param4.height > 0;
    }

    private static childRectToClippedDrawRegion(param1: IWindow, param2: Point, param3: Rectangle): boolean {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        if (param1.testParamFlag(16)) {
            _loc5_ = param1.renderingX;
            _loc6_ = param1.renderingY;
            param2.offset(_loc5_, _loc6_);
            if (param1.clipping) {
                if (param2.x < _loc5_) {
                    _loc4_ = _loc5_ - param2.x | 0;
                    param3.x += _loc4_;
                    param3.width -= _loc4_;
                    param2.x = _loc5_;
                }
                if (param2.x < 0) {
                    param3.x -= param2.x;
                    param3.width += param2.x;
                    param2.x = 0;
                }
                if (param2.y < _loc6_) {
                    _loc4_ = _loc6_ - param2.y | 0;
                    param3.y += _loc4_;
                    param3.height -= _loc4_;
                    param2.y = _loc6_;
                }
                if (param2.y < 0) {
                    param3.y -= param2.y;
                    param3.height += param2.y;
                    param2.y = 0;
                }
                if (param2.x + param3.width > _loc5_ + param1.renderingWidth) {
                    param3.width -= param2.x + param3.width - (_loc5_ + param1.renderingWidth);
                }
                if (param2.y + param3.height > _loc6_ + param1.renderingHeight) {
                    param3.height -= param2.y + param3.height - (_loc6_ + param1.renderingHeight);
                }
            }
            if (param1.parent) {
                WindowRenderer.childRectToClippedDrawRegion(param1.parent, param2, param3);
            }
        } else if (param1.clipping) {
            if (param2.x < 0) {
                _loc4_ = param2.x | 0;
                param3.x -= _loc4_;
                param3.width += _loc4_;
                param2.x = 0;
            }
            if (param2.y < 0) {
                _loc4_ = param2.y | 0;
                param3.y -= _loc4_;
                param3.height += _loc4_;
                param2.y = 0;
            }
        }
        return param3.width > 0 && param3.height > 0;
    }

    constructor(param1: ISkinContainer) {
        this._disposed = false;
        this._SafeStr_2935 = param1;
        this._SafeStr_2545 = new Dictionary();
        this._SafeStr_3022 = [];
        this._SafeStr_3300 = [];
        this._SafeStr_4559 = new Point();
        this._SafeStr_5351 = new Rectangle();
        this._SafeStr_2200 = new Rectangle();
        this._SafeStr_3873 = new Rectangle();
    }

    protected _debug: boolean = false;

    declare protected _SafeStr_2935: ISkinContainer;

    declare protected _SafeStr_2545: Map<any, any>;

    declare protected _SafeStr_3022: IWindow[];

    declare protected _SafeStr_3300: any[][];

    declare protected _SafeStr_4559: Point;

    declare protected _SafeStr_5351: Rectangle;

    declare protected _SafeStr_2200: Rectangle;

    declare protected _SafeStr_3873: Rectangle;

    declare protected _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get debug(): boolean {
        return this._debug;
    }

    public set debug(param1: boolean) {
        this._debug = param1;
    }

    public dispose(): void {
        let _loc1_: WindowRendererItem = null;
        if (!this._disposed) {
            this._disposed = true;
            for (const _loc2_ of this._SafeStr_2545?.keys() ?? []) {
                _loc1_ = asInstanceOf(this._SafeStr_2545.get(_loc2_), WindowRendererItem);
                _loc1_.dispose();
                this._SafeStr_2545.delete(_loc2_);
            }
            this._SafeStr_2545 = null;
            this._SafeStr_3022 = null;
            this._SafeStr_3300 = null;
        }
    }

    public purge(param1: IWindow = null, param2: boolean = true): void {
        let _loc3_: WindowRendererItem = null;
        let _loc5_: IChildWindowHost = null;
        let _loc4_: any = undefined;
        if (param1) {
            if (!param1.visible || !param2) {
                _loc3_ = this._SafeStr_2545.get(param1);
                if (_loc3_) {
                    _loc3_.dispose();
                    this._SafeStr_2545.delete(param1);
                }
                param2 = false;
            }
            _loc5_ = isIChildWindowHost(param1) ? param1 : null;
            if (_loc5_) {
                for (param1 of _loc5_.children ?? []) {
                    this.purge(param1, param2);
                }
            }
        } else {
            _loc4_ = [];
            for (const _loc6_ of this._SafeStr_2545?.keys() ?? []) {
                param1 = isIWindow(_loc6_) ? _loc6_ : null;
                if (!param1.visible || !param2 || param1.parent == null && !(isIDesktopWindow(param1))) {
                    _loc4_.push(param1);
                }
            }
            while (_loc4_.length) {
                this.purge(_loc4_.pop(), param2);
            }
        }
    }

    public addToRenderQueue(param1: IWindow, param2: Rectangle, param3: number): void {
        let _loc8_: number = 0;
        let _loc12_: number = 0;
        let _loc4_: IWindow = null;
        let _loc5_: any[] = null;
        let _loc10_: number = 0;
        let _loc6_: Rectangle = null;
        let _loc11_: Rectangle = null;
        if (!param2) {
            param2 = this._SafeStr_2200;
            this._SafeStr_2200.x = 0;
            this._SafeStr_2200.y = 0;
            this._SafeStr_2200.width = param1.renderingWidth;
            this._SafeStr_2200.height = param1.renderingHeight;
        } else {
            this._SafeStr_2200.x = param2.x;
            this._SafeStr_2200.y = param2.y;
            this._SafeStr_2200.width = param2.width;
            this._SafeStr_2200.height = param2.height;
        }
        if (param2.isEmpty()) {
            return;
        }
        if (this.getWindowRendererItem(param1).invalidate(param1, param3)) {
            if (param1.testParamFlag(16) || param1.testParamFlag(1073741824)) {
                let _loc7_: IDesktopWindow = param1.context.getDesktopWindow();
                do {
                    _loc4_ = param1.parent;
                    if (_loc4_ == null) {
                        return;
                    }
                    if (_loc4_ == _loc7_) {
                        break;
                    }
                    if (!_loc4_.visible) {
                        return;
                    }
                    _loc8_ = _loc4_.renderingWidth;
                    _loc12_ = _loc4_.renderingHeight;
                    this._SafeStr_2200.offset(param1.renderingX, param1.renderingY);
                    if (_loc4_.clipping) {
                        if (this._SafeStr_2200.x > _loc8_ || this._SafeStr_2200.y > _loc12_ || this._SafeStr_2200.right < 0 || this._SafeStr_2200.bottom < 0) {
                            return;
                        }
                        if (this._SafeStr_2200.x < 0) {
                            this._SafeStr_2200.width += this._SafeStr_2200.x;
                            this._SafeStr_2200.x = 0;
                        }
                        if (this._SafeStr_2200.y < 0) {
                            this._SafeStr_2200.height += this._SafeStr_2200.y;
                            this._SafeStr_2200.y = 0;
                        }
                        if (this._SafeStr_2200.right > _loc8_) {
                            this._SafeStr_2200.right = _loc8_;
                        }
                        if (this._SafeStr_2200.bottom > _loc12_) {
                            this._SafeStr_2200.bottom = _loc12_;
                        }
                    }
                    if (this._SafeStr_2200.isEmpty()) {
                        return;
                    }
                    param1 = _loc4_;
                } while (!(!param1.testParamFlag(16) && !param1.testParamFlag(1073741824)));
            }
            this.getWindowRendererItem(param1).invalidate(param1, 32);
            _loc10_ = this._SafeStr_3022.indexOf(param1);
            if (_loc10_ > -1) {
                _loc5_ = this._SafeStr_3300[_loc10_];
                _loc11_ = this._SafeStr_2200;
                let _loc9_: number = _loc5_.length | 0;
                if (_loc9_ > 3) {
                    _loc11_ = _loc11_.union(_loc5_.pop());
                    _loc9_--;
                }
                _loc10_ = 0;
                while (_loc10_ < _loc9_) {
                    _loc6_ = _loc5_[_loc10_++];
                    if ((_loc6_.left > _loc11_.left ? _loc6_.left - _loc11_.right : _loc11_.left - _loc6_.right) <= 10 && (_loc6_.top > _loc11_.top ? _loc6_.top - _loc11_.bottom : _loc11_.top - _loc6_.bottom) <= 10) {
                        _loc5_.splice(_loc10_ - 1, 1);
                        _loc11_ = _loc11_.union(_loc6_);
                        _loc9_--;
                        _loc10_ = 0;
                    }
                }
                _loc5_.push(_loc11_ == this._SafeStr_2200 ? _loc11_.clone() : _loc11_);
            } else {
                this._SafeStr_3022.push(param1);
                this._SafeStr_3300.push([this._SafeStr_2200.clone()]);
            }
        }
    }

    public flushRenderQueue(): void {
        if (this._SafeStr_3022.length || this._SafeStr_3300.length) {
            this._SafeStr_3022.splice(0, this._SafeStr_3022.length);
            this._SafeStr_3300.splice(0, this._SafeStr_3300.length);
        }
    }

    public invalidate(param1: IWindowContext, param2: Rectangle): void {
        let _loc5_: IWindow = null;
        let _loc4_: IDesktopWindow = null;
        _loc4_ = param1.getDesktopWindow();
        let _loc3_: number = _loc4_.numChildren >>> 0;
        while (_loc3_-- > 0) {
            _loc5_ = _loc4_.getChildAt(_loc3_ | 0);
            this.addToRenderQueue(_loc5_, null, 1);
        }
    }

    public registerRenderable(param1: IWindow): WindowRendererItem {
        let _loc2_: WindowRendererItem = asInstanceOf(this._SafeStr_2545.get(param1), WindowRendererItem);
        if (_loc2_ == null) {
            _loc2_ = new WindowRendererItem(this._SafeStr_2935);
            this._SafeStr_2545.set(param1, _loc2_);
            _loc2_.invalidate(param1, 8);
        }
        if (!param1.hasEventListener("WINDOW_DISPOSE_EVENT")) {
            param1.addEventListener("WINDOW_DISPOSE_EVENT", this.windowDisposedCallback);
        }
        return _loc2_;
    }

    public removeRenderable(param1: IWindow): void {
        param1.removeEventListener("WINDOW_DISPOSE_EVENT", this.windowDisposedCallback);
        let _loc2_: WindowRendererItem = asInstanceOf(this._SafeStr_2545.get(param1), WindowRendererItem);
        if (_loc2_ != null) {
            _loc2_.dispose();
            this._SafeStr_2545.delete(param1);
        }
    }

    public getDrawBufferForRenderable(param1: IWindow): BitmapData {
        let _loc2_: Rectangle = null;
        let _loc4_: TrackedBitmapData = null;
        let _loc3_: WindowRendererItem = asInstanceOf(this._SafeStr_2545.get(param1), WindowRendererItem);
        if (!_loc3_) {
            _loc2_ = new Rectangle(0, 0, param1.renderingWidth, param1.renderingHeight);
            _loc4_ = new TrackedBitmapData(this, param1.renderingWidth, param1.renderingHeight);
            _loc3_ = this.registerRenderable(param1);
            _loc3_.invalidate(param1, 1);
            _loc3_.render(param1, WindowRenderer.POINT_ZERO, _loc2_, param1.renderingRectangle, _loc4_);
            _loc4_.dispose();
        }
        return _loc3_ != null ? _loc3_.buffer : null;
    }

    public render(): void {
        let _loc1_: any = null;
        let _loc2_: any[] = null;
        let _loc4_: BitmapData = null;
        let _loc5_: IWindow = null;
        let _loc3_: number = this._SafeStr_3022.length;
        while (_loc3_-- > 0) {
            _loc5_ = this._SafeStr_3022.pop();
            _loc2_ = this._SafeStr_3300.pop();
            if (!_loc5_.disposed) {
                _loc4_ = asInstanceOf(_loc5_.fetchDrawBuffer(), BitmapData);
                for (_loc1_ of _loc2_ ?? []) {
                    this._SafeStr_3873.x = _loc5_.renderingX;
                    this._SafeStr_3873.y = _loc5_.renderingY;
                    this._SafeStr_3873.width = _loc5_.renderingWidth;
                    this._SafeStr_3873.height = _loc5_.renderingHeight;
                    this.renderWindowBranch(_loc5_, _loc1_, this._SafeStr_3873, _loc4_);
                }
            }
        }
    }

    protected getWindowRendererItem(param1: IWindow): WindowRendererItem {
        let _loc2_: WindowRendererItem = asInstanceOf(this._SafeStr_2545.get(param1), WindowRendererItem);
        if (_loc2_ == null) {
            _loc2_ = this.registerRenderable(param1);
        }
        return _loc2_;
    }

    protected windowDisposedCallback = (param1: WindowDisposeEvent): void => {
        this.removeRenderable(param1.window);
    };

    private renderWindowBranch(param1: IWindow, param2: Rectangle, param3: Rectangle, param4: BitmapData): void {
        let _loc8_: any = null;
        let _loc6_: IGraphicContextHost = null;
        let _loc5_: any = undefined;
        let _loc7_: IGraphicContext = castGuarded(param1, isIGraphicContextHost, "com.sulake.core.window.graphics.IGraphicContextHost").getGraphicContext(false);
        if (_loc7_) {
            _loc7_.visible = param1.visible;
        }
        if (param1.visible) {
            this._SafeStr_4559.x = param1.renderingX;
            this._SafeStr_4559.y = param1.renderingY;
            if (WindowRenderer.getDrawLocationAndClipRegion(param1, param2, this._SafeStr_4559, this._SafeStr_5351)) {
                if (param1.clipping) {
                    param3 = param3.intersection(param1.renderingRectangle);
                }
                param3.offset(-param1.x, -param1.y);
                param4 = this.getWindowRendererItem(param1).render(param1, this._SafeStr_4559, this._SafeStr_5351, param3, param4);
                if (!(isIChildWindowHost(param1))) {
                    return;
                }
                _loc5_ = castGuarded(param1, isIChildWindowHost, "com.sulake.core.window.utils.IChildWindowHost").children;
                if (!_loc5_) {
                    return;
                }
                if (param1.clipping) {
                    param2 = param2.clone();
                    if (param2.x < 0) {
                        param2.width += param2.x;
                        param2.x = 0;
                    }
                    if (param2.y < 0) {
                        param2.height += param2.y;
                        param2.y = 0;
                    }
                    if (param2.width > param1.width) {
                        param2.width = param1.renderingWidth;
                    }
                    if (param2.height > param1.height) {
                        param2.height = param1.renderingHeight;
                    }
                }
                for (_loc8_ of valuesOf(_loc5_)) {
                    WindowRenderer.RECT.x = Number(_loc8_.x);
                    WindowRenderer.RECT.y = Number(_loc8_.y);
                    WindowRenderer.RECT.width = Number(_loc8_.width);
                    WindowRenderer.RECT.height = Number(_loc8_.height);
                    if (WindowRenderer.RECT.intersects(param2)) {
                        if (_loc8_.testParamFlag(16)) {
                            param2.offset(-_loc8_.x, -_loc8_.y);
                            this.renderWindowBranch(_loc8_, param2, param3, param4);
                            param2.offset(Number(_loc8_.x), Number(_loc8_.y));
                        } else if (_loc8_.testParamFlag(1073741824)) {
                            param2.offset(-_loc8_.x, -_loc8_.y);
                            this.renderWindowBranch(_loc8_, param2, param3, asInstanceOf(_loc8_.fetchDrawBuffer(), BitmapData));
                            param2.offset(Number(_loc8_.x), Number(_loc8_.y));
                        } else if (_loc8_.visible) {
                            _loc6_ = castGuarded(_loc8_, isIGraphicContextHost, "com.sulake.core.window.graphics.IGraphicContextHost");
                            if (_loc6_.hasGraphicsContext()) {
                                _loc6_.getGraphicContext(true).visible = true;
                            }
                        }
                    } else if (!WindowRenderer.RECT.intersects(param3)) {
                        _loc6_ = castGuarded(_loc8_, isIGraphicContextHost, "com.sulake.core.window.graphics.IGraphicContextHost");
                        if (_loc6_.hasGraphicsContext()) {
                            _loc6_.getGraphicContext(true).visible = false;
                        }
                    }
                }
                param3.offset(param1.renderingX, param1.renderingY);
            } else if (!param1.testParamFlag(16)) {
                if (param1.testParamFlag(1073741824)) {
                    if (!_loc7_) {
                        _loc7_ = castGuarded(param1, isIGraphicContextHost, "com.sulake.core.window.graphics.IGraphicContextHost").getGraphicContext(true);
                    }
                    _loc7_.setDrawRegion(param1.renderingRectangle, false, this._SafeStr_5351);
                    _loc7_.visible = false;
                }
            }
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
