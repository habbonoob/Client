import { asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { DynamicStyle } from '@/com/sulake/core/window/dynamicstyle/DynamicStyle';
import type { IGraphicContext } from '@/com/sulake/core/window/graphics/IGraphicContext';
import type { IMouseListenerService } from '@/com/sulake/core/window/services/IMouseListenerService';
import type { IPropertyMap } from '@/com/sulake/core/window/theme/IPropertyMap';
import type { DefaultAttStruct } from '@/com/sulake/core/window/utils/DefaultAttStruct';
import type { IRectLimiter } from '@/com/sulake/core/window/utils/IRectLimiter';
import type { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IBitmapDrawable } from '@habbo-pixi/runtime/display/IBitmapDrawable';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import type { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { WindowContext } from '@/com/sulake/core/window/Classes.group';
import { DynamicStyleManager } from '@/com/sulake/core/window/dynamicstyle/DynamicStyleManager';
import { WindowDisposeEvent } from '@/com/sulake/core/window/events/WindowDisposeEvent';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import { WindowEventDispatcher } from '@/com/sulake/core/window/events/WindowEventDispatcher';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { GraphicContext } from '@/com/sulake/core/window/graphics/GraphicContext';
import { IGraphicContextHost, isIGraphicContextHost } from '@/com/sulake/core/window/graphics/IGraphicContextHost';
import { IWindow, isIWindow } from '@/com/sulake/core/window/IWindow';
import { IChildWindowHost } from '@/com/sulake/core/window/utils/IChildWindowHost';
import { WindowRectLimits } from '@/com/sulake/core/window/utils/WindowRectLimits';
import { WindowModel } from '@/com/sulake/core/window/WindowModel';

export class WindowController extends WindowModel implements IWindow, IGraphicContextHost, IChildWindowHost {
    static { registerClassName(this, 'com.sulake.core.window::WindowController'); }

    private static _SafeStr_6101: number = 0;
    public static readonly TAG_EXCLUDE: string = "_EXCLUDE";
    public static readonly TAG_INTERNAL: string = "_INTERNAL";
    public static readonly TAG_COLORIZE: string = "_COLORIZE";
    public static readonly TAG_IGNORE_INHERITED_STYLE: string = "_IGNORE_INHERITED_STYLE";
    private static readonly _SafeStr_2701: Rectangle = new Rectangle();
    private static readonly _POINT_ZERO: Point = new Point();

    declare protected _events: WindowEventDispatcher;

    declare protected _SafeStr_2145: IGraphicContext;

    declare protected _procedure: (...args: any[]) => any;

    protected _SafeStr_2451: boolean = true;

    declare protected _parent: WindowController;

    declare protected _children: IWindow[];

    protected _debug: boolean = false;

    declare protected _SafeStr_2867: WindowRectLimits;

    protected _immediateClickMode: boolean = false;

    declare private _SafeStr_4079: DynamicStyle;

    private _SafeStr_4048: boolean = false;

    declare private _SafeStr_2764: Rectangle;

    private _hCenterRem2: number = 0;
    private _SafeStr_15105: boolean = false;

    declare private _SafeStr_6921: number;
    static { (this.prototype as any)._SafeStr_6921 = 0; }

    declare private _propertyDefaults: IPropertyMap;

    declare private _lookupCache: Map<any, any>;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0, param12: string = "") {
        let _loc13_: any = 0;
        let _loc14_: XML = param5.getWindowFactory().getLayoutByTypeAndStyle(param2, param3);
        if (param6 == null) {
            param6 = new Rectangle(0, 0, _loc14_ ? Number(_loc14_.attribute("width")) | 0 : 10, _loc14_ ? Number(_loc14_.attribute("height")) | 0 : 10);
        }
        super(param11, param1, param2, param3, param4, param5, param6, param10, param12);
        this.immediateClickHandler = this.immediateClickHandler.bind(this);
        this._SafeStr_6921 = WindowController._SafeStr_6101++;
        this._propertyDefaults = param5.getWindowFactory().getThemeManager().getPropertyDefaults(param3);
        if (!this._SafeStr_2145) {
            this._SafeStr_2145 = this.getGraphicContext(!this.testParamFlag(16));
        }
        this._SafeStr_2764 = new Rectangle();
        if (_loc14_ != null) {
            this._SafeStr_2619 = new Rectangle(0, 0, Number(_loc14_.attribute("width")) | 0, Number(_loc14_.attribute("height")) | 0);
            this._SafeStr_2167 = this._SafeStr_2619.clone();
            this._SafeStr_2126 = this._SafeStr_2619.x | 0;
            this._y = this._SafeStr_2619.y | 0;
            this._SafeStr_2132 = this._SafeStr_2619.width | 0;
            this._height = this._SafeStr_2619.height | 0;
            param5.getWindowParser().parseAndConstruct(_loc14_, this, null);
            _loc13_ = this._SafeStr_2147;
            this._SafeStr_2147 &= ~12582912;
            this.setRectangle(param6.x | 0, param6.y | 0, param6.width | 0, param6.height | 0);
            this._SafeStr_2147 = _loc13_ >>> 0;
            this._SafeStr_2167.x = param6.x;
            this._SafeStr_2167.y = param6.y;
            this._SafeStr_2167.width = param6.width;
            this._SafeStr_2167.height = param6.height;
        }
        let _loc15_: DefaultAttStruct = param5.getWindowFactory().getDefaultsByTypeAndStyle(param2, param3);
        if (_loc15_) {
            this._blend = _loc15_.blend;
            this._mouseThreshold = _loc15_.threshold;
            if (this._background != _loc15_.background) {
                this.background = _loc15_.background;
            }
            if (this._fillColor != _loc15_.color) {
                this.color = _loc15_.color;
            }
            if (_loc15_.hasRectLimits()) {
                castTo(this.limits, WindowRectLimits).assign(_loc15_.width_min, _loc15_.width_max, _loc15_.height_min, _loc15_.height_max);
            }
        }
        if (param9) {
            this.properties = param9;
        }
        this._procedure = param8;
        if (param7 != null) {
            this._parent = param7 instanceof WindowController ? param7 : null;
            castTo(param7, WindowController).addChild(this);
            if (this._SafeStr_2145) {
                this._context.invalidate(this, null, 1);
            }
        }
    }

    private static calculateMouseRegion(param1: WindowController, param2: Rectangle): void {
        let _loc7_: number = 0;
        let _loc3_: Rectangle = new Rectangle();
        param1.getGlobalRectangle(_loc3_);
        let _loc5_: number = param1.numChildren;
        let _loc4_: number = _loc3_.x | 0;
        let _loc6_: number = _loc3_.y | 0;
        param2.left = _loc4_ < param2.left ? _loc4_ : param2.left;
        param2.top = _loc6_ < param2.top ? _loc6_ : param2.top;
        param2.right = _loc3_.right > param2.right ? _loc3_.right : Number(param2.right);
        param2.bottom = _loc3_.bottom > param2.bottom ? _loc3_.bottom : Number(param2.bottom);
        _loc7_ = 0;
        while (_loc7_ < _loc5_) {
            WindowController.calculateMouseRegion(asInstanceOf(param1.getChildAt(_loc7_), WindowController), param2);
            _loc7_++;
        }
    }

    public static expandToAccommodateChild(param1: WindowController, param2: IWindow): void {
        let _loc6_: any = 0;
        let _loc9_: any = 0;
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc10_: number = param1.width;
        let _loc5_: number = param1.height;
        let _loc8_: boolean = false;
        if (param2.x < 0) {
            _loc4_ = param2.x;
            _loc10_ -= _loc4_;
            param2.x = 0;
            _loc8_ = true;
        }
        if (param2.right > _loc10_) {
            _loc10_ = param2.x + param2.width;
            _loc8_ = true;
        }
        if (param2.y < 0) {
            _loc3_ = param2.y;
            _loc5_ -= _loc3_;
            param2.y = 0;
            _loc8_ = true;
        }
        if (param2.bottom > _loc5_) {
            _loc5_ = param2.y + param2.height;
            _loc8_ = true;
        }
        if (_loc8_) {
            _loc6_ = (param1.param & (0x020000 | 0x024000)) >>> 0;
            if (_loc6_) {
                param1.setParamFlag(_loc6_ >>> 0, false);
            }
            param1.setRectangle(param1.x + _loc4_, param1.y + _loc3_, _loc10_, _loc5_);
            if (_loc3_ != 0 || _loc4_ != 0) {
                let _loc7_: number = param1.numChildren >>> 0;
                _loc9_ = 0;
                while (_loc9_ < _loc7_) {
                    param1.getChildAt(_loc9_ | 0).offset(-_loc4_, -_loc3_);
                    _loc9_++;
                }
            }
            if (_loc6_) {
                param1.setParamFlag(_loc6_ >>> 0, true);
            }
        }
    }

    public static resizeToAccommodateChildren(param1: WindowController): void {
        let _loc11_: IWindow = null;
        let _loc9_: any = 0;
        let _loc7_: any = 0;
        let _loc4_: boolean = false;
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        let _loc5_: number = -2147483648;
        let _loc10_: number = -2147483648;
        let _loc8_: boolean = false;
        let _loc6_: number = param1.numChildren >>> 0;
        _loc9_ = 0;
        while (_loc9_ < _loc6_) {
            _loc11_ = param1.getChildAt(_loc9_ | 0);
            if (_loc11_.visible && _loc11_.x + _loc11_.width > _loc5_) {
                _loc5_ = _loc11_.x + _loc11_.width;
                _loc8_ = true;
            }
            if (_loc11_.visible && _loc11_.y + _loc11_.height > _loc10_) {
                _loc10_ = _loc11_.y + _loc11_.height;
                _loc8_ = true;
            }
            _loc9_++;
        }
        if (_loc8_) {
            _loc7_ = (param1.param & (0x020000 | 0x024000)) >>> 0;
            if (_loc7_) {
                param1.setParamFlag(_loc7_ >>> 0, false);
            }
            if (_loc3_ != 0 || _loc2_ != 0) {
                _loc9_ = 0;
                while (_loc9_ < _loc6_) {
                    _loc11_ = param1.getChildAt(_loc9_ | 0);
                    _loc4_ = _loc11_.testParamFlag(32);
                    if (_loc4_) {
                        _loc11_.setParamFlag(32, false);
                    }
                    _loc11_.offset(-_loc3_, -_loc2_);
                    if (_loc4_) {
                        _loc11_.setParamFlag(32, true);
                    }
                    _loc9_++;
                }
            }
            param1.width = _loc5_;
            param1.height = _loc10_;
            if (_loc7_) {
                param1.setParamFlag(_loc7_ >>> 0, true);
            }
        }
    }

    public get properties(): any[] {
        return [];
    }

    public get procedure(): (...args: any[]) => any {
        return this._procedure ?? (this._parent != null ? this._parent.procedure : this.nullEventProc);
    }

    public get filters(): any[] {
        return this.hasGraphicsContext() ? this.getGraphicContext(true).filters : [];
    }

    public get parent(): IWindow {
        return this._parent;
    }

    public get debug(): boolean {
        return this._debug;
    }

    public get limits(): IRectLimiter {
        return this._SafeStr_2867 ? this._SafeStr_2867 : (this._SafeStr_2867 = new WindowRectLimits(this));
    }

    public get immediateClickMode(): boolean {
        return this._immediateClickMode;
    }

    public set x(param1: number) {
        if (param1 != this._SafeStr_2126) {
            this.setRectangle(param1, this._y, this._SafeStr_2132, this._height);
        }
    }

    public set y(param1: number) {
        if (param1 != this._y) {
            this.setRectangle(this._SafeStr_2126, param1, this._SafeStr_2132, this._height);
        }
    }

    public set id(param1: number) {
        this._id = param1 >>> 0;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    public set width(param1: number) {
        if (param1 != this._SafeStr_2132) {
            this.setRectangle(this._SafeStr_2126, this._y, param1, this._height);
        }
    }

    public set height(param1: number) {
        if (param1 != this._height) {
            this.setRectangle(this._SafeStr_2126, this._y, this._SafeStr_2132, param1);
        }
    }

    public set position(param1: Point) {
        this.setRectangle(param1.x | 0, param1.y | 0, this._SafeStr_2132, this._height);
    }

    public set rectangle(param1: Rectangle) {
        this.setRectangle(param1.x | 0, param1.y | 0, param1.width | 0, param1.height | 0);
    }

    public set background(param1: boolean) {
        this._background = param1;
        this._fillColor = (this._background ? this._fillColor | this._alphaColor : this._fillColor & 0xFFFFFF) >>> 0;
        this._SafeStr_2451 ||= param1;
        this._context.invalidate(this, null, 1);
    }

    public set color(param1: number) {
        this._alphaColor = (param1 & 0xFF000000) >>> 0;
        this._fillColor = (this._background ? param1 : param1 & 0xFFFFFF) >>> 0;
        this._context.invalidate(this, null, 1);
    }

    public set alpha(param1: number) {
        this._alphaColor = (param1 << 24) >>> 0;
        this._fillColor = (this._background ? this._alphaColor | this._fillColor : 0xFFFFFF & this._fillColor) >>> 0;
        this._context.invalidate(this, null, 1);
    }

    public set blend(param1: number) {
        param1 = param1 > 1 ? 1 : (param1 < 0 ? 0 : param1);
        if (param1 != this._blend) {
            this._blend = param1;
            this._context.invalidate(this, null, 16);
        }
    }

    public set visible(param1: boolean) {
        let _loc2_: WindowEvent = null;
        if (param1 != this._visible) {
            this._visible = param1;
            if (this._SafeStr_2145 && !param1) {
                this._SafeStr_2145.visible = false;
            }
            this._context.invalidate(this, null, 1);
            _loc2_ = WindowEvent.allocate("WE_CHILD_VISIBILITY", this, this);
            this.update(this, _loc2_);
            _loc2_.recycle();
        }
    }

    public set type(param1: number) {
        if (param1 != this._type) {
            this._type = param1;
            this._context.invalidate(this, null, 1);
        }
    }

    public set caption(param1: string) {
        param1 = param1 ? param1 : "";
        if (param1 != this.caption) {
            this._caption = param1;
            this._context.invalidate(this, null, 1);
        }
    }

    public set tags(param1: any[]) {
        if (param1 != null) {
            this._tags = param1;
        }
    }

    public set mouseThreshold(param1: number) {
        this._mouseThreshold = (param1 > 255 ? 255 : param1) >>> 0;
    }

    public set ignoreMouseEvents(param1: boolean) {
        this._ignoreMouseEvents = param1;
    }

    public set procedure(param1: (...args: any[]) => any) {
        this._procedure = param1;
    }

    public set filters(param1: any[]) {
        if (this.hasGraphicsContext()) {
            this.getGraphicContext(true).filters = param1;
        }
    }

    public set debug(param1: boolean) {
        this._debug = param1;
    }

    public set properties(param1: any[]) {
    }

    public set offsetX(param1: number) {
        this._offsetX = param1;
    }

    public set offsetY(param1: number) {
        this._offsetY = param1;
    }

    public set etching(param1: any[]) {
    }

    public set state(param1: number) {
        if (param1 != this._state) {
            this._state = param1;
            this._context.invalidate(this, null, 8);
        }
    }

    public set dynamicStyleColor(param1: ColorTransform) {
        this._SafeStr_5701 = param1;
    }

    public get dynamicStyleColor(): ColorTransform {
        return this._SafeStr_5701;
    }

    public set style(param1: number) {
        let _loc2_: any[] = null;
        let _loc3_: WindowController = null;
        let _loc4_: any = 0;
        if (param1 != this._style) {
            this._style = param1;
            _loc2_ = [];
            this.groupChildrenWithTag("_INTERNAL", _loc2_);
            _loc4_ = _loc2_.length;
            while (--_loc4_ > -1) {
                _loc3_ = asInstanceOf(_loc2_[_loc4_], WindowController);
                if (_loc3_.tags.indexOf("_IGNORE_INHERITED_STYLE") == -1) {
                    _loc3_.style = this._style;
                }
            }
            this._context.invalidate(this, null, 1);
            this._propertyDefaults = this._context.getWindowFactory().getThemeManager().getPropertyDefaults(this._style);
        }
    }

    public set dynamicStyle(param1: string) {
        this._dynamicStyle = param1;
        this._context.invalidate(this, null, 1);
    }

    public set clipping(param1: boolean) {
        if (param1 != this._clipping) {
            this._clipping = param1;
            this._context.invalidate(this, null, 1);
        }
    }

    public get host(): IWindow {
        return (this._parent as unknown) == this.desktop ? this : this._parent.host;
    }

    public get desktop(): IDesktopWindow {
        return this._context.getDesktopWindow();
    }

    public set parent(param1: IWindow) {
        let _loc3_: WindowEvent = null;
        if (param1 == this) {
            throw new Error("Attempted to assign self as parent!");
        }
        if (param1 != null && param1.context != this._context) {
            this._context = castTo(param1.context, WindowContext);
            if (this._children) {
                for (const _loc4_ of this._children ?? []) {
                    _loc4_.parent = this;
                }
            }
        }
        let _loc2_: IWindow = this._parent;
        if (this._parent != param1) {
            if (this._parent != null) {
                this._parent.removeChild(this);
            }
            this._parent = castTo(param1, WindowController);
            if (this._parent != null) {
                this._SafeStr_2764 = this._parent.rectangle;
                this._SafeStr_2167.x = this._SafeStr_2126;
                this._SafeStr_2167.y = this._y;
                this._SafeStr_2167.width = this._SafeStr_2132;
                this._SafeStr_2167.height = this._height;
                _loc3_ = WindowEvent.allocate("WE_PARENT_ADDED", this, this._parent);
                this.update(this, _loc3_);
            } else {
                this._SafeStr_2764.x = 0;
                this._SafeStr_2764.y = 0;
                this._SafeStr_2764.width = 0;
                this._SafeStr_2764.height = 0;
                _loc3_ = WindowEvent.allocate("WE_PARENT_REMOVED", this, _loc2_);
                this.update(this, _loc3_);
            }
            _loc3_.recycle();
        }
    }

    public hasGraphicsContext(): boolean {
        return this._SafeStr_2145 != null || !this.testParamFlag(16);
    }

    public getGraphicContext(param1: boolean): IGraphicContext {
        if (param1 && !this._SafeStr_2145) {
            this._SafeStr_2145 = new GraphicContext("GC {" + this._name + "}", 1, new Rectangle(this._SafeStr_2126, this._y, this._SafeStr_2132, this._height));
            this._SafeStr_2145.visible = this._visible;
        }
        return this._SafeStr_2145;
    }

    public setupGraphicsContext(): IGraphicContext {
        let _loc1_: number = 0;
        this._SafeStr_2145 = this.getGraphicContext(true);
        if (this._parent) {
            this._parent.setupGraphicsContext();
        }
        if (this._children && this._children.length > 0) {
            if (this._SafeStr_2145.numChildContexts != this.numChildren) {
                _loc1_ = 0;
                // (an untyped loop variable in AS3: the children are WindowControllers)
                for (const _loc2_ of (this._children ?? []) as any[]) {
                    this._SafeStr_2145.addChildContextAt(_loc2_.getGraphicContext(true), _loc1_++);
                }
            }
        }
        this._SafeStr_4048 = true;
        return this._SafeStr_2145;
    }

    public releaseGraphicsContext(): void {
        this._SafeStr_4048 = false;
        if (!this._SafeStr_2145) {
        }
    }

    public clone(): IWindow {
        let _loc2_: any = this.constructor;
        let _loc1_: WindowController = asInstanceOf(new _loc2_(this._name, this._type, this._style, this._SafeStr_2147, this._context, new Rectangle(this._SafeStr_2126, this._y, this._SafeStr_2132, this._height), null, this._procedure, this.properties, this._tags ? this._tags.concat() : null, this._id), WindowController);
        _loc1_.dynamicStyle = this._dynamicStyle;
        _loc1_._mouseThreshold = this._mouseThreshold;
        _loc1_._ignoreMouseEvents = this._ignoreMouseEvents;
        _loc1_._SafeStr_2451 = this._SafeStr_2451;
        _loc1_._debug = this._debug;
        _loc1_._SafeStr_2764 = this._SafeStr_2764.clone();
        _loc1_._hCenterRem2 = this._hCenterRem2;
        _loc1_._SafeStr_2126 = this._SafeStr_2126;
        _loc1_._y = this._y;
        _loc1_._SafeStr_2132 = this._SafeStr_2132;
        _loc1_._height = this._height;
        _loc1_._SafeStr_2619 = this._SafeStr_2619.clone();
        _loc1_._SafeStr_2167 = this._SafeStr_2167.clone();
        _loc1_._SafeStr_2380 = this._SafeStr_2380 ? this._SafeStr_2380.clone() : null;
        _loc1_._SafeStr_2391 = this._SafeStr_2391 ? this._SafeStr_2391.clone() : null;
        _loc1_._SafeStr_2867 = this._SafeStr_2867 ? this._SafeStr_2867.clone(_loc1_) : null;
        _loc1_._context = this._context;
        _loc1_._fillColor = this._fillColor;
        _loc1_._alphaColor = this._alphaColor;
        _loc1_.clipping = this._clipping;
        _loc1_._visible = this._visible;
        _loc1_._blend = this._blend;
        if (_loc1_._SafeStr_2145 && !_loc1_.testParamFlag(16)) {
            _loc1_._SafeStr_2145.blend = this._blend;
        }
        _loc1_._SafeStr_2147 = this._SafeStr_2147;
        _loc1_._state = this._state;
        _loc1_._name = this._name;
        _loc1_._id = this._id;
        _loc1_.caption = this._caption;
        _loc1_.background = this._background;
        this.cloneChildWindows(_loc1_);
        return _loc1_;
    }

    protected cloneChildWindows(param1: WindowController): void {
        let _loc2_: any = null;
        if (this._children) {
            for (_loc2_ of this._children ?? []) {
                if (_loc2_.tags.indexOf("_EXCLUDE") == -1) {
                    param1.addChild(_loc2_.clone());
                }
            }
        }
    }

    public override dispose(): void {
        let _loc1_: WindowDisposeEvent = null;
        if (!this._disposed) {
            this._lookupCache = null;
            this.immediateClickMode = false;
            this._procedure = null;
            if (!this._context.disposed) {
                if (!this.isChildWindow()) {
                    if (this.getStateFlag(1)) {
                        this.deactivate();
                    }
                }
            }
            if (this._children) {
                while (this._children.length > 0) {
                    castGuarded(this._children.pop(), isIDisposable, "com.sulake.core.runtime.IDisposable").dispose();
                }
            }
            this._children = null;
            if (this.parent) {
                this.parent = null;
            }
            if (this._events) {
                _loc1_ = WindowDisposeEvent.allocate_WindowDisposeEvent(this);
                this._events.dispatchEvent(_loc1_);
                _loc1_.recycle();
                if (isIDisposable(this._events)) {
                    this._events.dispose();
                    this._events = null;
                }
            }
            if (this._SafeStr_2145 != null) {
                this._SafeStr_2145.dispose();
                this._SafeStr_2145 = null;
            }
            super.dispose();
        }
    }

    public toString(): string {
        return "[Window " + getQualifiedClassName(this) + " " + this._name + " " + this._SafeStr_6921 + "]";
    }

    public override invalidate(param1: Rectangle = null): void {
        this._context.invalidate(this, param1, 1);
    }

    public resolve(): number {
        return 0;
    }

    public center(): void {
        if (this._parent != null) {
            this.x = this._parent.width / 2 - this._SafeStr_2132 / 2 | 0;
            this.y = this._parent.height / 2 - this._height / 2 | 0;
        }
    }

    public setRectangle(param1: number, param2: number, param3: number, param4: number): void {
        let _loc13_: any = 0;
        let _loc14_: number = 0;
        let _loc7_: number = 0;
        let _loc15_: WindowEvent = null;
        if (this._SafeStr_2867) {
            param4 = Math.max(this._SafeStr_2867.minHeight, param4) | 0;
            param4 = Math.min(this._SafeStr_2867.maxHeight, param4) | 0;
            param3 = Math.max(this._SafeStr_2867.minWidth, param3) | 0;
            param3 = Math.min(this._SafeStr_2867.maxWidth, param3) | 0;
        }
        let _loc8_: boolean = param1 != this._SafeStr_2126;
        let _loc11_: boolean = param3 != this._SafeStr_2132;
        let _loc5_: boolean = param1 != this._SafeStr_2126 || param2 != this._y;
        let _loc12_: boolean = _loc11_ || param4 != this._height;
        let _loc10_: number = this._hCenterRem2;
        let _loc9_: boolean = false;
        let _loc6_: number = param1;
        if (_loc12_ && !_loc5_) {
            _loc13_ = (this._SafeStr_2147 & 0x0C0000) >>> 0;
            if (_loc11_) {
                if (_loc13_ == 786432) {
                    _loc14_ = _loc10_ - (param3 - this._SafeStr_2132);
                    _loc7_ = _loc14_ / 2 | 0;
                    param1 += _loc7_;
                    _loc10_ = _loc14_ - _loc7_ * 2;
                    _loc9_ = true;
                    _loc6_ = param1;
                    _loc5_ = param1 != this._SafeStr_2126 || param2 != this._y;
                } else if (_loc13_ == 262144) {
                    param1 -= param3 - this._SafeStr_2132;
                    _loc5_ = true;
                }
            }
            _loc13_ = (this._SafeStr_2147 & 0x300000) >>> 0;
            if (_loc13_ == 3145728) {
                param2 = param2 - (param4 - this._height) / 2 | 0;
                _loc5_ = true;
            } else if (_loc13_ == 1048576) {
                param2 -= param4 - this._height;
                _loc5_ = true;
            }
        }
        if (this.testParamFlag(32)) {
            if (this._parent != null && this._parent.name != "_CONTEXT_SUBSTITUTE_PARENT") {
                param1 = param1 < 0 ? 0 : param1;
                param2 = param2 < 0 ? 0 : param2;
                if (_loc5_) {
                    param1 -= param1 + param3 > this._parent.width ? param1 + param3 - this._parent.width : 0;
                    param2 -= param2 + param4 > this._parent.height ? param2 + param4 - this._parent.height : 0;
                    _loc5_ = param1 != this._SafeStr_2126 || param2 != this._y;
                } else {
                    param3 -= param1 + param3 > this._parent.width ? param1 + param3 - this._parent.width : 0;
                    param4 -= param2 + param4 > this._parent.height ? param2 + param4 - this._parent.height : 0;
                    _loc12_ = param3 != this._SafeStr_2132 || param4 != this._height;
                }
            }
        }
        if (_loc5_ || _loc12_) {
            if (_loc5_) {
                _loc15_ = WindowEvent.allocate("WE_RELOCATE", this, null, true);
                this.update(this, _loc15_);
                if (_loc15_.isWindowOperationPrevented()) {
                    _loc5_ = false;
                }
                _loc15_.recycle();
            }
            if (_loc12_) {
                _loc15_ = WindowEvent.allocate("WE_RESIZE", this, null, true);
                this.update(this, _loc15_);
                if (_loc15_.isWindowOperationPrevented()) {
                    _loc12_ = false;
                }
                _loc15_.recycle();
            }
            if (_loc8_ && (_loc5_ || _loc12_)) {
                this._hCenterRem2 = 0;
            } else if (_loc11_ && _loc12_) {
                this._hCenterRem2 = _loc9_ && (!_loc5_ || param1 == _loc6_) ? _loc10_ : 0;
            }
            if (_loc5_) {
                this._SafeStr_2167.x = this._SafeStr_2126;
                this._SafeStr_2167.y = this._y;
                this._SafeStr_2167.width = this._SafeStr_2132;
                this._SafeStr_2167.height = this._height;
                this._SafeStr_2126 = param1;
                this._y = param2;
            }
            if (_loc12_) {
                this._SafeStr_2167.width = this._SafeStr_2132;
                this._SafeStr_2167.height = this._height;
                this._SafeStr_2132 = param3;
                this._height = param4;
            }
            if (_loc5_) {
                _loc15_ = WindowEvent.allocate("WE_RELOCATED", this, null);
                this.update(this, _loc15_);
                _loc15_.recycle();
            }
            if (_loc12_) {
                _loc15_ = WindowEvent.allocate("WE_RESIZED", this, null);
                this.update(this, _loc15_);
                _loc15_.recycle();
            }
        }
    }

    public getRegionProperties(param1: Rectangle = null, param2: Rectangle = null, param3: Rectangle = null, param4: Rectangle = null): void {
        if (param1 != null) {
            param1.x = this._SafeStr_2126;
            param1.y = this._y;
            param1.width = this._SafeStr_2132;
            param1.height = this._height;
        }
        if (param2 != null) {
            param2.x = this._SafeStr_2167.x;
            param2.y = this._SafeStr_2167.y;
            param2.width = this._SafeStr_2167.width;
            param2.height = this._SafeStr_2167.height;
        }
        if (param3 != null && this._SafeStr_2380 != null) {
            param3.x = this._SafeStr_2380.x;
            param3.y = this._SafeStr_2380.y;
            param3.width = this._SafeStr_2380.width;
            param3.height = this._SafeStr_2380.height;
        }
        if (param4 != null && this._SafeStr_2391 != null) {
            param4.x = this._SafeStr_2391.x;
            param4.y = this._SafeStr_2391.y;
            param4.width = this._SafeStr_2391.width;
            param4.height = this._SafeStr_2391.height;
        }
    }

    public setRegionProperties(param1: Rectangle = null, param2: Rectangle = null, param3: Rectangle = null): void {
        if (param3 != null) {
            if (param3.width < 0 || param3.height < 0) {
                throw new Error("Invalid rectangle; maximized size can\'t be less than zero!");
            }
            if (this._SafeStr_2391 == null) {
                this._SafeStr_2391 = new Rectangle();
            }
            this._SafeStr_2391.x = param3.x;
            this._SafeStr_2391.y = param3.y;
            this._SafeStr_2391.width = param3.width;
            this._SafeStr_2391.height = param3.height;
        }
        if (param2 != null) {
            if (param2.width < 0 || param2.height < 0) {
                throw new Error("Invalid rectangle; minimized size can\'t be less than zero!");
            }
            if (this._SafeStr_2380 == null) {
                this._SafeStr_2380 = new Rectangle();
            }
            this._SafeStr_2380.x = param2.x;
            this._SafeStr_2380.y = param2.y;
            this._SafeStr_2380.width = param2.width;
            this._SafeStr_2380.height = param2.height;
        }
        if (param3.width < param2.width || param3.height < param2.height) {
            param3.width = param2.width;
            param3.height = param2.height;
            throw new Error("Maximized rectangle can\'t be smaller than minimized rectangle!");
        }
        if (param1 != null) {
            this.setRectangle(param1.x | 0, param1.y | 0, param1.width | 0, param1.height | 0);
        }
    }

    public buildFromXML(param1: XML, param2: UtilsMap = null): boolean {
        return this._context.getWindowParser().parseAndConstruct(param1, this, param2) != null;
    }

    public fetchDrawBuffer(): IBitmapDrawable {
        return !this.testParamFlag(16) ? this.getGraphicContext(true).fetchDrawBuffer() : (this._parent != null ? this._parent.fetchDrawBuffer() : null);
    }

    public getDrawRegion(param1: Rectangle): void {
        if (!this.testParamFlag(16)) {
            param1.x = 0;
            param1.y = 0;
            param1.width = this._SafeStr_2132;
            param1.height = this._height;
        } else if (this._parent != null) {
            this._parent.getDrawRegion(param1);
            param1.x += this._SafeStr_2126;
            param1.y += this._y;
            param1.width = this._SafeStr_2132;
            param1.height = this._height;
        } else {
            param1.x = 0;
            param1.y = 0;
            param1.width = 0;
            param1.height = 0;
        }
    }

    public update(param1: WindowController, param2: WindowEvent): boolean {
        let _loc5_: IMouseListenerService = null;
        let _loc6_: IWindow = null;
        let _loc4_: WindowEvent = null;
        let _loc3_: any = 0;
        if (!this.testParamFlag(9)) {
            this.procedure(param2, this);
            if (this._disposed) {
                return true;
            }
            if (!param2.isWindowOperationPrevented()) {
                if (this.hasEventListener(param2.type)) {
                    this._events.dispatchEvent(param2);
                    if (this._disposed) {
                        return true;
                    }
                }
            }
            if (param2.cancelable) {
                if (param2.isWindowOperationPrevented()) {
                    return true;
                }
            }
        }
        if (param2 instanceof WindowMouseEvent) {
            switch (param2.type) {
                case "WME_DOWN":
                    if (this.activate()) {
                        if (param2.cancelable) {
                            param2.preventDefault();
                        }
                    }
                    if (this.disposed) {
                        return true;
                    }
                    this.setStateFlag(16, true);
                    _loc5_ = this._context.getWindowServices().getMouseListenerService();
                    _loc5_.begin(this);
                    _loc5_.eventTypes.push("WME_UP");
                    _loc5_.areaLimit = 3;
                    if (this.testParamFlag(257)) {
                        _loc6_ = this;
                        while (_loc6_ != null) {
                            if (_loc6_.testParamFlag(32768)) {
                                this._context.getWindowServices().getMouseDraggingService().begin(_loc6_);
                                break;
                            }
                            _loc6_ = _loc6_.parent;
                        }
                    }
                    if ((this._SafeStr_2147 & 0x3000) > 0) {
                        _loc6_ = this;
                        while (_loc6_ != null) {
                            if (_loc6_.testParamFlag(65536)) {
                                this._context.getWindowServices().getMouseScalingService().begin(_loc6_, (this._SafeStr_2147 & 0x3000) >>> 0);
                                break;
                            }
                            _loc6_ = _loc6_.parent;
                        }
                    }
                    break;
                case "WME_UP":
                    if (this.testStateFlag(16)) {
                        this.setStateFlag(16, false);
                    }
                    this._context.getWindowServices().getMouseListenerService().end(this);
                    if (this.testParamFlag(32768)) {
                        this._context.getWindowServices().getMouseDraggingService().end(this);
                    }
                    if (this.testParamFlag(65536)) {
                        this._context.getWindowServices().getMouseScalingService().end(this);
                    }
                    break;
                case "WME_OUT":
                    if (this.testStateFlag(4)) {
                        this.setStateFlag(4, false);
                    }
                    if (this.testStateFlag(16)) {
                        this.setStateFlag(16, false);
                    }
                    break;
                case "WME_OVER":
                    if (!this.testStateFlag(4)) {
                        this.setStateFlag(4, true);
                    }
                    break;
                case "WME_WHEEL":
                case "WME_WHEEL_HORIZONTAL":
                    return false;
            }
        } else if (param2 instanceof WindowEvent) {
            switch (param2.type) {
                case "WE_RESIZED":
                    if (param1 == this) {
                        WindowController._SafeStr_2701.x = this._SafeStr_2126 < this._SafeStr_2167.x ? this._SafeStr_2126 : this._SafeStr_2167.x;
                        WindowController._SafeStr_2701.y = this._y < this._SafeStr_2167.y ? this._y : this._SafeStr_2167.y;
                        WindowController._SafeStr_2701.right = this._SafeStr_2126 + this._SafeStr_2132 > this._SafeStr_2167.right ? this._SafeStr_2126 + this._SafeStr_2132 : Number(this._SafeStr_2167.right);
                        WindowController._SafeStr_2701.bottom = this._y + this._height > this._SafeStr_2167.bottom ? this._y + this._height : Number(this._SafeStr_2167.bottom);
                        WindowController._SafeStr_2701.offset(-this._SafeStr_2126, -this._y);
                        this._context.invalidate(this, WindowController._SafeStr_2701, 2);
                        _loc4_ = WindowEvent.allocate("WE_PARENT_RESIZED", this, null);
                        this.notifyChildren(_loc4_);
                        _loc4_.recycle();
                        if (this.testParamFlag(192, 192)) {
                            this.updateScaleRelativeToParent();
                        } else if (this.testParamFlag(3072, 3072)) {
                            this.updateScaleRelativeToParent();
                        }
                        if (this._parent != null) {
                            _loc3_ = this._SafeStr_2147;
                            this._SafeStr_2147 &= -3265;
                            if (this.testParamFlag(4194304)) {
                                this._parent.width += this._SafeStr_2132 - this._SafeStr_2167.width;
                            }
                            if (this.testParamFlag(8388608)) {
                                this._parent.height += this._height - this._SafeStr_2167.height;
                            }
                            this._SafeStr_2147 = _loc3_ >>> 0;
                            _loc4_ = WindowEvent.allocate("WE_CHILD_RESIZED", this._parent, this);
                            this._parent.update(this, _loc4_);
                            _loc4_.recycle();
                        }
                    }
                    break;
                case "WE_RELOCATED":
                    if (param1 == this) {
                        WindowController._SafeStr_2701.x = this._SafeStr_2126 < this._SafeStr_2167.x ? this._SafeStr_2126 : this._SafeStr_2167.x;
                        WindowController._SafeStr_2701.y = this._y < this._SafeStr_2167.y ? this._y : this._SafeStr_2167.y;
                        WindowController._SafeStr_2701.right = this._SafeStr_2126 + this._SafeStr_2132 > this._SafeStr_2167.right ? this._SafeStr_2126 + this._SafeStr_2132 : Number(this._SafeStr_2167.right);
                        WindowController._SafeStr_2701.bottom = this._y + this._height > this._SafeStr_2167.bottom ? this._y + this._height : Number(this._SafeStr_2167.bottom);
                        WindowController._SafeStr_2701.offset(-this._SafeStr_2126, -this._y);
                        this._context.invalidate(this, WindowController._SafeStr_2701, 4);
                        _loc4_ = WindowEvent.allocate("WE_PARENT_RELOCATED", this, null);
                        this.notifyChildren(_loc4_);
                        _loc4_.recycle();
                        if (this._parent != null) {
                            _loc4_ = WindowEvent.allocate("WE_CHILD_RELOCATED", this._parent, this);
                            this._parent.update(this, _loc4_);
                            _loc4_.recycle();
                        }
                    }
                    break;
                case "WE_ACTIVATED":
                    if (param1 == this) {
                        _loc4_ = WindowEvent.allocate("WE_PARENT_ACTIVATED", this, null);
                        this.notifyChildren(_loc4_);
                        _loc4_.recycle();
                        if (this._parent != null) {
                            _loc4_ = WindowEvent.allocate("WE_CHILD_ACTIVATED", this._parent, this);
                            this._parent.update(this, _loc4_);
                            _loc4_.recycle();
                        }
                    }
                    break;
                case "WE_PARENT_ADDED":
                    if (this.testParamFlag(192, 192)) {
                        this.updateScaleRelativeToParent();
                    } else if (this.testParamFlag(3072, 3072)) {
                        this.updateScaleRelativeToParent();
                    }
                    this._context.invalidate(this, null, 1);
                    if (this._SafeStr_15105) {
                        this.invalidateOwnGraphicContextDescendants();
                    }
                    this._SafeStr_15105 = true;
                    break;
                case "WE_PARENT_RESIZED":
                    this._parent.getRegionProperties(null, this._SafeStr_2764);
                    this.updateScaleRelativeToParent();
                    break;
                case "WE_CHILD_ADDED":
                    if (this.testParamFlag(147456)) {
                        this.scaleToAccommodateChildren();
                    } else if (this.testParamFlag(131072)) {
                        WindowController.expandToAccommodateChild(this, param2.related);
                    }
                    this.renderDynamicStyle();
                    break;
                case "WE_CHILD_REMOVED":
                    if (this.testParamFlag(147456)) {
                        this.scaleToAccommodateChildren();
                    }
                    break;
                case "WE_CHILD_ACTIVATED":
                    this.activate();
                    break;
                case "WE_CHILD_RESIZED":
                    if (this.testParamFlag(147456)) {
                        this.scaleToAccommodateChildren();
                    } else if (this.testParamFlag(131072)) {
                        WindowController.expandToAccommodateChild(this, param2.related);
                    }
                    break;
                case "WE_CHILD_RELOCATED":
                    if (this.testParamFlag(147456)) {
                        this.scaleToAccommodateChildren();
                    } else if (this.testParamFlag(131072)) {
                        WindowController.expandToAccommodateChild(this, param2.related);
                    }
                    break;
                case "WE_CHILD_VISIBILITY":
                    if (param1 == this) {
                        if (this._parent != null) {
                            _loc4_ = WindowEvent.allocate("WE_CHILD_VISIBILITY", this._parent, this);
                            this._parent.update(this, _loc4_);
                            _loc4_.recycle();
                        }
                    }
            }
        }
        return true;
    }

    private renderDynamicStyle(): void {
        let _loc1_: any = 0;
        if (this._dynamicStyle == "") {
            return;
        }
        if (!this._SafeStr_4079 || this._SafeStr_4079.name != this._dynamicStyle) {
            this._SafeStr_4079 = DynamicStyleManager.getStyle(this._dynamicStyle);
        }
        if (this.getStateFlag(32)) {
            _loc1_ = 32;
        } else if (this.getStateFlag(16)) {
            _loc1_ = 16;
        } else if (this.getStateFlag(4)) {
            _loc1_ = 4;
        } else {
            _loc1_ = 0;
        }
        this.applyDynamicStyleByState(this, this._SafeStr_4079, _loc1_ >>> 0);
        if (this._children) {
            this.recursivelyUpdateChildrensDynamicStyles(this._children, _loc1_ >>> 0);
        }
    }

    private applyDynamicStyleByState(param1: WindowController, param2: DynamicStyle, param3: number): void {
        let _loc5_: any[] = null;
        let _loc4_: any = param2.getStyleByWindowState(param3);
        param1.offsetX = Number(_loc4_.offsetX ? _loc4_.offsetX : 0) | 0;
        param1.offsetY = Number(_loc4_.offsetY ? _loc4_.offsetY : 0) | 0;
        if (param1.hasGraphicsContext()) {
            param1._SafeStr_2145.getDisplayObject().transform.colorTransform = param2.getColorTransform(param3);
        } else {
            param1._SafeStr_5701 = param2.getColorTransform(param3);
            param1.invalidate();
        }
        if (_loc4_.etchingPoint) {
            _loc5_ = [_loc4_.etchingColor, _loc4_.etchingPoint[0], _loc4_.etchingPoint[1]];
            param1.etching = _loc5_;
            param1.invalidate();
        } else {
            param1.etching = [0, 0, 1];
            param1.invalidate();
        }
    }

    private recursivelyUpdateChildrensDynamicStyles(param1: IWindow[], param2: number): void {
        for (const _loc3_ of param1 ?? []) {
            if (this._SafeStr_4079.getChildStyle(castTo(_loc3_, WindowController))) {
                this.applyDynamicStyleByState(castTo(_loc3_, WindowController), this._SafeStr_4079.getChildStyle(castTo(_loc3_, WindowController)), param2);
            }
            // (AS3 reached the private children through the IWindow-typed variable: they are WindowControllers)
            if (castTo(_loc3_, WindowController)._children) {
                this.recursivelyUpdateChildrensDynamicStyles(castTo(_loc3_, WindowController)._children, param2);
            }
        }
    }

    private invalidateOwnGraphicContextDescendants(): void {
        if (this._children == null) {
            return;
        }
        for (const _loc1_ of this._children ?? []) {
            if (!_loc1_.testParamFlag(16)) {
                _loc1_.invalidate();
            }
            castTo(_loc1_, WindowController).invalidateOwnGraphicContextDescendants();
        }
    }

    protected notifyEventListeners(param1: WindowEvent): void {
        this.procedure(param1, this);
        if (!param1.isWindowOperationPrevented()) {
            if (this.hasEventListener(param1.type)) {
                this._events.dispatchEvent(param1);
            }
        }
    }

    private nullEventProc = (param1: WindowEvent, param2: IWindow): void => {
    };

    private notifyChildren(param1: WindowEvent): void {
        if (this._children) {
            // (an untyped loop variable in AS3: the children are WindowControllers)
            for (const _loc2_ of (this._children ?? []) as any[]) {
                _loc2_.update(this, param1);
            }
        }
    }

    public convertPointFromGlobalToLocalSpace(param1: Point): void {
        let _loc2_: number = Number(param1.x);
        let _loc3_: number = Number(param1.y);
        if (this._parent == null) {
            param1.x = this._SafeStr_2126;
            param1.y = this._y;
        } else {
            this._parent.getGlobalPosition(param1);
            param1.x += this._SafeStr_2126;
            param1.y += this._y;
        }
        param1.x = _loc2_ - param1.x;
        param1.y = _loc3_ - param1.y;
    }

    public convertPointFromLocalToGlobalSpace(param1: Point): void {
        let _loc2_: number = Number(param1.x);
        let _loc3_: number = Number(param1.y);
        if (this._parent == null) {
            param1.x = this._SafeStr_2126;
            param1.y = this._y;
        } else {
            this._parent.getGlobalPosition(param1);
            param1.x += this._SafeStr_2126;
            param1.y += this._y;
        }
        param1.x += _loc2_;
        param1.y += _loc3_;
    }

    public getRelativeMousePosition(param1: Point): void {
        this.getGlobalPosition(param1);
        param1.x = this._context.getDesktopWindow().mouseX - param1.x;
        param1.y = this._context.getDesktopWindow().mouseY - param1.y;
    }

    public getAbsoluteMousePosition(param1: Point): void {
        param1.x = this._context.getDesktopWindow().mouseX;
        param1.y = this._context.getDesktopWindow().mouseY;
    }

    public getLocalPosition(param1: Point): void {
        param1.x = this._SafeStr_2126;
        param1.y = this._y;
    }

    public getLocalRectangle(param1: Rectangle): void {
        param1.x = this._SafeStr_2126;
        param1.y = this._y;
        param1.width = this._SafeStr_2132;
        param1.height = this._height;
    }

    public hitTestLocalPoint(param1: Point): boolean {
        return param1.x >= this._SafeStr_2126 && param1.x < this._SafeStr_2126 + this._SafeStr_2132 && param1.y >= this._y && param1.y < this._y + this._height;
    }

    public hitTestLocalRectangle(param1: Rectangle): boolean {
        return this.rectangle.intersects(param1);
    }

    public validateLocalPointIntersection(param1: Point, param2: BitmapData): boolean {
        return this.testLocalPointHitAgainstAlpha(param1, param2, this._mouseThreshold);
    }

    public get ignoreMouseEvents(): boolean {
        return this._ignoreMouseEvents;
    }

    public getGlobalPosition(param1: Point): void {
        if (this._parent != null) {
            this._parent.getGlobalPosition(param1);
            param1.x += this._SafeStr_2126;
            param1.y += this._y;
        } else {
            param1.x = this._SafeStr_2126;
            param1.y = this._y;
        }
    }

    public setGlobalPosition(param1: Point): void {
        let _loc2_: Point = new Point();
        if (this._parent != null) {
            this._parent.getGlobalPosition(_loc2_);
            _loc2_.x += this._SafeStr_2126;
            _loc2_.y += this._y;
        } else {
            _loc2_.x = this._SafeStr_2126;
            _loc2_.y = this._y;
        }
        this.x += param1.x - _loc2_.x;
        this.y += param1.y - _loc2_.y;
    }

    public getGlobalRectangle(param1: Rectangle): void {
        if (this._parent != null) {
            this._parent.getGlobalRectangle(param1);
            param1.x += this._SafeStr_2126;
            param1.y += this._y;
        } else {
            param1.x = this._SafeStr_2126;
            param1.y = this._y;
        }
        param1.width = this._SafeStr_2132;
        param1.height = this._height;
    }

    public setGlobalRectangle(param1: Rectangle): void {
        let _loc2_: Point = new Point();
        if (this._parent != null) {
            this._parent.getGlobalPosition(_loc2_);
            _loc2_.x += this._SafeStr_2126;
            _loc2_.y += this._y;
        } else {
            _loc2_.x = this._SafeStr_2126;
            _loc2_.y = this._y;
        }
        this.setRectangle(this.x + (param1.x - _loc2_.x) | 0, this.y + (param1.y - _loc2_.y) | 0, param1.width | 0, param1.height | 0);
    }

    public hitTestGlobalPoint(param1: Point): boolean {
        let _loc2_: Rectangle = new Rectangle();
        this.getGlobalRectangle(_loc2_);
        return _loc2_.containsPoint(param1);
    }

    public hitTestGlobalRectangle(param1: Rectangle): boolean {
        let _loc2_: Rectangle = new Rectangle();
        this.getGlobalRectangle(_loc2_);
        return _loc2_.intersects(param1);
    }

    public validateGlobalPointIntersection(param1: Point, param2: BitmapData): boolean {
        let _loc3_: Point = new Point();
        this.getGlobalPosition(_loc3_);
        _loc3_.x = param1.x - _loc3_.x;
        _loc3_.y = param1.y - _loc3_.y;
        return this.testLocalPointHitAgainstAlpha(_loc3_, param2, this._mouseThreshold);
    }

    public getMouseRegion(param1: Rectangle): void {
        let _loc2_: Rectangle = null;
        this.getGlobalRectangle(param1);
        if (param1.width < 0) {
            param1.width = 0;
        }
        if (param1.height < 0) {
            param1.height = 0;
        }
        if (this.testParamFlag(16)) {
            _loc2_ = new Rectangle();
            this._parent.getMouseRegion(_loc2_);
            if (param1.left < _loc2_.left) {
                param1.left = _loc2_.left;
            }
            if (param1.top < _loc2_.top) {
                param1.top = _loc2_.top;
            }
            if (param1.right > _loc2_.right) {
                param1.right = _loc2_.right;
            }
            if (param1.bottom > _loc2_.bottom) {
                param1.bottom = _loc2_.bottom;
            }
        }
    }

    protected testLocalPointHitAgainstAlpha(param1: Point, param2: BitmapData, param3: number): boolean {
        let _loc4_: BitmapData = null;
        let _loc5_: boolean = false;
        if (this._SafeStr_2132 < 1 || this._height < 1) {
            return false;
        }
        if (this._SafeStr_2451 && this._mouseThreshold > 0) {
            if (!this.testParamFlag(16)) {
                if (param1.x <= this._SafeStr_2132 && param1.y <= this._height) {
                    _loc4_ = asInstanceOf(this.getGraphicContext(true).fetchDrawBuffer(), BitmapData);
                    if (_loc4_ != null) {
                        _loc5_ = Boolean(_loc4_.hitTest(WindowController._POINT_ZERO, param3, param1));
                    }
                }
            } else {
                _loc5_ = Boolean(param2 != null ? param2.hitTest(WindowController._POINT_ZERO, param3, param1) : false);
            }
            return _loc5_;
        }
        return this.isInWindowBounds(param1);
    }

    public isInWindowBounds(param1: Point): boolean {
        return param1.x >= 0 && param1.x < this._SafeStr_2132 && param1.y >= 0 && param1.y < this._height;
    }

    public isCapableOfUsingSharedGraphicContext(): boolean {
        return true;
    }

    public resolveVerticalScale(): number {
        return this._height / this._SafeStr_2619.height;
    }

    public resolveHorizontalScale(): number {
        return this._SafeStr_2132 / this._SafeStr_2619.width;
    }

    public offset(param1: number, param2: number): void {
        this.setRectangle(this._SafeStr_2126 + param1 | 0, this._y + param2 | 0, this._SafeStr_2132, this._height);
    }

    public scale(param1: number, param2: number): void {
        this.setRectangle(this._SafeStr_2126, this._y, this._SafeStr_2132 + param1 | 0, this._height + param2 | 0);
    }

    public scaleToAccommodateChildren(): void {
        let _loc9_: any = null;
        let _loc8_: any[] = null;
        let _loc6_: any = 0;
        if (!this._children) {
            return;
        }
        let _loc2_: number = 0;
        let _loc1_: number = 0;
        let _loc7_: number = 0;
        let _loc3_: number = 0;
        let _loc5_: boolean = false;
        let _loc4_: number = (this.param & (0x020000 | 0x024000)) >>> 0;
        for (_loc9_ of this._children ?? []) {
            if (_loc9_.visible && _loc9_.x < _loc2_) {
                _loc7_ -= _loc9_.x - _loc2_;
                _loc2_ = _loc9_.x;
                _loc5_ = true;
            }
            if (_loc9_.visible && _loc9_.x + _loc9_.width > _loc7_) {
                _loc7_ = _loc9_.x + _loc9_.width;
                _loc5_ = true;
            }
            if (_loc9_.visible && _loc9_.y < _loc1_) {
                _loc3_ -= _loc9_.y - _loc1_;
                _loc1_ = _loc9_.y;
                _loc5_ = true;
            }
            if (_loc9_.visible && _loc9_.y + _loc9_.height > _loc3_) {
                _loc3_ = _loc9_.y + _loc9_.height;
                _loc5_ = true;
            }
        }
        if (_loc5_) {
            _loc8_ = [];
            for (_loc9_ of this._children ?? []) {
                _loc6_ = (_loc9_.param & (0xC0 | 0x0C00)) >>> 0;
                _loc9_.setParamFlag(_loc6_ >>> 0, false);
                _loc8_.push(_loc6_);
            }
            if (_loc4_) {
                this.setParamFlag(_loc4_, false);
            }
            this.setRectangle(this._SafeStr_2126 + _loc2_, this._y + _loc1_, _loc7_, _loc3_);
            for (_loc9_ of this._children ?? []) {
                _loc9_.offset(-_loc2_, -_loc1_);
                _loc9_.setParamFlag(_loc8_.shift() >>> 0, true);
            }
            if (_loc4_) {
                this.setParamFlag(_loc4_, true);
            }
        }
    }

    public getStateFlag(param1: number): boolean {
        return (this._state & param1) != 0;
    }

    public setStateFlag(param1: number, param2: boolean = true): void {
        let _loc3_: number = this._state;
        let _temp_1: any;
        let _temp_3: any;
        this._state = (param2 ? this._state | param1 : (this._state & ~param1) >>> 0) >>> 0;
        if (this._state != _loc3_) {
            this.renderDynamicStyle();
            this._context.invalidate(this, null, 8);
        }
    }

    public getStyleFlag(param1: number): boolean {
        return (this._style & param1) != 0;
    }

    public setStyleFlag(param1: number, param2: boolean = true): void {
        let _loc3_: any[] = null;
        let _loc4_: WindowController = null;
        let _loc6_: any = 0;
        let _loc5_: number = this._style;
        let _temp_1: any;
        let _temp_3: any;
        this._style = (param2 ? this._style | param1 : (this._style & ~param1) >>> 0) >>> 0;
        if (this._style != _loc5_) {
            _loc3_ = [];
            this.groupChildrenWithTag("_INTERNAL", _loc3_);
            _loc6_ = _loc3_.length;
            while (--_loc6_ > -1) {
                _loc4_ = asInstanceOf(_loc3_[_loc6_], WindowController);
                if (_loc4_.tags.indexOf("_IGNORE_INHERITED_STYLE") == -1) {
                    _loc4_.style = this._style;
                }
            }
            this._context.invalidate(this, null, 1);
        }
    }

    public getParamFlag(param1: number): boolean {
        return (this._SafeStr_2147 & param1) != 0;
    }

    public setParamFlag(param1: number, param2: boolean = true): void {
        let _loc3_: number = this._SafeStr_2147;
        let _temp_1: any;
        let _temp_3: any;
        this._SafeStr_2147 = (param2 ? this._SafeStr_2147 | param1 : (this._SafeStr_2147 & ~param1) >>> 0) >>> 0;
        if (this._SafeStr_2147 != _loc3_) {
            if (!(this._SafeStr_2147 & 0x10)) {
                if (!this._SafeStr_2145) {
                    this.setupGraphicsContext();
                    this._context.invalidate(this, null, 1);
                }
            } else if (this._SafeStr_2147 & 0x10) {
                if (this._SafeStr_2145) {
                    this._context.invalidate(this, null, 1);
                }
            }
        }
    }

    protected updateScaleRelativeToParent(): void {
        let _loc9_: any = 0;
        let _loc2_: any = 0;
        let _loc6_: number = 0;
        if (this._parent == null) {
            return;
        }
        let _loc1_: boolean = !this.testParamFlag(0, 192);
        let _loc8_: boolean = !this.testParamFlag(0, 3072);
        let _loc4_: number = this._SafeStr_2126;
        let _loc7_: number = this._y;
        let _loc3_: number = this._SafeStr_2132;
        let _loc5_: number = this._height;
        if (_loc1_ || _loc8_) {
            if (_loc1_) {
                _loc6_ = this._parent.width - this._SafeStr_2764.width | 0;
                _loc9_ = (this._SafeStr_2147 & 0xC0) >>> 0;
                if (_loc9_ == 128) {
                    _loc3_ += _loc6_;
                } else if (_loc9_ == 64) {
                    _loc4_ += _loc6_;
                } else if (_loc9_ == 192) {
                    if (this._parent.width < _loc3_ && this.getParamFlag(16)) {
                        _loc4_ = 0;
                    } else {
                        _loc4_ = Math.floor(this._parent.width / 2) - Math.floor(_loc3_ / 2) | 0;
                    }
                }
            }
            if (_loc8_) {
                _loc6_ = this._parent.height - this._SafeStr_2764.height | 0;
                _loc9_ = (this._SafeStr_2147 & 0x0C00) >>> 0;
                if (_loc9_ == 2048) {
                    _loc5_ += _loc6_;
                } else if (_loc9_ == 1024) {
                    _loc7_ += _loc6_;
                } else if (_loc9_ == 3072) {
                    if (this._parent.height < _loc5_ && this.getParamFlag(16)) {
                        _loc7_ = 0;
                    } else {
                        _loc7_ = Math.floor(this._parent.height / 2) - Math.floor(_loc5_ / 2) | 0;
                    }
                }
            }
            _loc2_ = this._SafeStr_2147;
            this._SafeStr_2147 &= -12586177;
            this.setRectangle(_loc4_, _loc7_, _loc3_, _loc5_);
            this._SafeStr_2147 = _loc2_ >>> 0;
        } else if (this.testParamFlag(32)) {
            if (this._parent != null) {
                _loc4_ = _loc4_ < 0 ? 0 : _loc4_;
                _loc7_ = _loc7_ < 0 ? 0 : _loc7_;
                _loc4_ -= _loc4_ + _loc3_ > this._parent.width ? _loc4_ + _loc3_ - this._parent.width : 0;
                _loc7_ -= _loc7_ + _loc5_ > this._parent.height ? _loc7_ + _loc5_ - this._parent.height : 0;
                _loc3_ -= _loc4_ + _loc3_ > this._parent.width ? _loc4_ + _loc3_ - this._parent.width : 0;
                _loc5_ -= _loc7_ + _loc5_ > this._parent.height ? _loc7_ + _loc5_ - this._parent.height : 0;
                if (_loc4_ != this._SafeStr_2126 || _loc7_ != this._y || _loc3_ != this._SafeStr_2132 || _loc5_ != this._height) {
                    _loc2_ = this._SafeStr_2147;
                    this._SafeStr_2147 &= -12586177;
                    this.setRectangle(_loc4_, _loc7_, _loc3_, _loc5_);
                    this._SafeStr_2147 = _loc2_ >>> 0;
                }
            }
        }
    }

    protected isChildWindow(): boolean {
        return (this._parent as unknown) != this.context.getDesktopWindow();
    }

    public destroy(): boolean {
        if (this._state == 1073741824) {
            return true;
        }
        this._state = 1073741824;
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_DESTROY", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        _loc1_ = WindowEvent.allocate("WE_DESTROYED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        this.dispose();
        return true;
    }

    public minimize(): boolean {
        if (this._state & 0x40) {
            return false;
        }
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_MINIMIZE", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.setStateFlag(64, true);
        _loc1_ = WindowEvent.allocate("WE_MINIMIZED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    public maximize(): boolean {
        if (this._state & 0x40) {
            return false;
        }
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_MAXIMIZE", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.setStateFlag(64, true);
        _loc1_ = WindowEvent.allocate("WE_MAXIMIZED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    public restore(): boolean {
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_RESTORE", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.setStateFlag(64, false);
        _loc1_ = WindowEvent.allocate("WE_RESTORED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    public activate(): boolean {
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_ACTIVATE", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.setStateFlag(1, true);
        _loc1_ = WindowEvent.allocate("WE_ACTIVATED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    public deactivate(): boolean {
        if (!this.getStateFlag(1)) {
            return true;
        }
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_DEACTIVATE", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.setStateFlag(1, false);
        _loc1_ = WindowEvent.allocate("WE_DEACTIVATED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    public lock(): boolean {
        if (this.getStateFlag(64)) {
            return true;
        }
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_LOCK", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.setStateFlag(64, true);
        _loc1_ = WindowEvent.allocate("WE_LOCKED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    public unlock(): boolean {
        if (!this.getStateFlag(64)) {
            return true;
        }
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_UNLOCK", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.setStateFlag(64, false);
        _loc1_ = WindowEvent.allocate("WE_UNLOCKED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    public enable(): boolean {
        if (!this.getStateFlag(32)) {
            return true;
        }
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_ENABLE", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.setStateFlag(32, false);
        _loc1_ = WindowEvent.allocate("WE_ENABLED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    public disable(): boolean {
        if (this.getStateFlag(32)) {
            return true;
        }
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_DISABLE", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.setStateFlag(32, true);
        _loc1_ = WindowEvent.allocate("WE_DISABLED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    public focus(): boolean {
        if (this.getStateFlag(2)) {
            return true;
        }
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_FOCUS", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.setStateFlag(2, true);
        _loc1_ = WindowEvent.allocate("WE_FOCUSED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    public unfocus(): boolean {
        if (!this.getStateFlag(2)) {
            return true;
        }
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_UNFOCUS", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.setStateFlag(2, false);
        _loc1_ = WindowEvent.allocate("WE_UNFOCUSED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    public getChildUnderPoint(param1: Point): IWindow {
        let _loc3_: Rectangle = null;
        let _loc5_: IWindow = null;
        let _loc4_: boolean = false;
        if (this._visible) {
            _loc3_ = new Rectangle();
            this.getMouseRegion(_loc3_);
            _loc4_ = Boolean(_loc3_.containsPoint(param1));
            let _loc2_: number = this.numChildren >>> 0;
            if (_loc4_) {
                while (_loc2_ > 0) {
                    _loc5_ = castTo(this._children[_loc2_ - 1], WindowController).getChildUnderPoint(param1);
                    if (_loc5_ != null) {
                        return _loc5_;
                    }
                    _loc2_--;
                }
            }
            if (this.validateGlobalPointIntersection(param1, null)) {
                return this;
            }
        }
        return null;
    }

    public groupChildrenUnderPoint(param1: Point, param2: any[]): void {
        let _loc3_: any = null;
        if (this._visible) {
            if (param1.x >= this._SafeStr_2126 && param1.x < this._SafeStr_2126 + this._SafeStr_2132 && param1.y >= this._y && param1.y < this._y + this._height) {
                param2.push(this);
                if (this._children) {
                    param1.offset(-this._SafeStr_2126, -this._y);
                    for (_loc3_ of this._children ?? []) {
                        _loc3_.groupChildrenUnderPoint(param1, param2);
                    }
                    param1.offset(this._SafeStr_2126, this._y);
                }
            } else if (!this._clipping) {
                if (this._children) {
                    param1.offset(-this._SafeStr_2126, -this._y);
                    for (_loc3_ of this._children ?? []) {
                        _loc3_.groupChildrenUnderPoint(param1, param2);
                    }
                    param1.offset(this._SafeStr_2126, this._y);
                }
            }
        }
    }

    public groupParameterFilteredChildrenUnderPoint(param1: Point, param2: any[], param3: number = 0): void {
        let _loc4_: any = null;
        if (this._visible) {
            if (param1.x >= this._SafeStr_2126 && param1.x < this._SafeStr_2126 + this._SafeStr_2132 && param1.y >= this._y && param1.y < this._y + this._height) {
                if ((this._SafeStr_2147 & param3) == param3) {
                    param2.push(this);
                }
                if (this._children) {
                    param1.offset(-this._SafeStr_2126, -this._y);
                    for (_loc4_ of this._children ?? []) {
                        _loc4_.groupParameterFilteredChildrenUnderPoint(param1, param2, param3);
                    }
                    param1.offset(this._SafeStr_2126, this._y);
                }
            } else if (!this._clipping) {
                if (this._children) {
                    param1.offset(-this._SafeStr_2126, -this._y);
                    for (_loc4_ of this._children ?? []) {
                        _loc4_.groupParameterFilteredChildrenUnderPoint(param1, param2, param3);
                    }
                    param1.offset(this._SafeStr_2126, this._y);
                }
            }
        }
    }

    public addEventListener(param1: string, param2: (...args: any[]) => any, param3: number = 0): void {
        if (!this._disposed) {
            if (!this._events) {
                this._events = new WindowEventDispatcher(this);
            }
            this._events.addEventListener(param1, param2, param3);
        }
    }

    public hasEventListener(param1: string): boolean {
        return this._disposed || !this._events ? false : this._events.hasEventListener(param1);
    }

    public removeEventListener(param1: string, param2: (...args: any[]) => any): void {
        if (!this._disposed && this._events) {
            this._events.removeEventListener(param1, param2);
        }
    }

    public get children(): IWindow[] {
        return this._children;
    }

    public get numChildren(): number {
        return (this._children ? this._children.length : 0) | 0;
    }

    public populate(param1: any[]): void {
        let _loc2_: boolean = false;
        if (!this._children) {
            this._children = [];
        }
        for (const _loc3_ of param1 ?? []) {
            if (_loc3_ && _loc3_.parent != this) {
                this._children.push(_loc3_);
                _loc3_.parent = this;
                _loc2_ ||= _loc3_.hasGraphicsContext();
            }
        }
        if (this._SafeStr_4048 || _loc2_) {
            this.setupGraphicsContext();
        }
    }

    public addChild(param1: IWindow): IWindow {
        let _loc2_: WindowController = castTo(param1, WindowController);
        if (_loc2_.parent != null) {
            castTo(_loc2_.parent, WindowController).removeChild(_loc2_);
        }
        if (!this._children) {
            this._children = [];
        }
        this._children.push(_loc2_);
        _loc2_.parent = this;
        if (this._SafeStr_4048 || _loc2_.hasGraphicsContext()) {
            this.setupGraphicsContext();
            if ((_loc2_.getGraphicContext(true).parent as unknown) != this._SafeStr_2145) {
                this._SafeStr_2145.addChildContext(_loc2_.getGraphicContext(true));
            }
        }
        let _loc3_: WindowEvent = WindowEvent.allocate("WE_CHILD_ADDED", this, param1);
        this.update(this, _loc3_);
        _loc3_.recycle();
        return param1;
    }

    public addChildAt(param1: IWindow, param2: number): IWindow {
        let _loc3_: WindowController = castTo(param1, WindowController);
        if (_loc3_.parent != null) {
            castTo(_loc3_.parent, WindowController).removeChild(_loc3_);
        }
        if (!this._children) {
            this._children = [];
        }
        this._children.splice(param2, 0, _loc3_);
        _loc3_.parent = this;
        if (this._SafeStr_4048 || _loc3_.hasGraphicsContext()) {
            this.setupGraphicsContext();
            if ((_loc3_.getGraphicContext(true).parent as unknown) != this._SafeStr_2145) {
                this._SafeStr_2145.addChildContextAt(_loc3_.getGraphicContext(true), param2);
            }
        }
        let _loc4_: WindowEvent = WindowEvent.allocate("WE_CHILD_ADDED", this, param1);
        this.update(this, _loc4_);
        _loc4_.recycle();
        return param1;
    }

    public getChildAt(param1: number): IWindow {
        return this._children ? (param1 < this._children.length && param1 > -1 ? this._children[param1] : null) : null;
    }

    public getChildByID(param1: number): IWindow {
        if (this._children) {
            for (const _loc2_ of this._children ?? []) {
                if (_loc2_.id == param1) {
                    return _loc2_;
                }
            }
        }
        return null;
    }

    public getChildByName(param1: string): IWindow {
        if (this._lookupCache != null && this._lookupCache.has(param1)) {
            return this._lookupCache.get(param1);
        }
        if (this._children) {
            for (const _loc2_ of this._children ?? []) {
                if (_loc2_.name == param1) {
                    if (this._lookupCache != null) {
                        this._lookupCache.set(param1, _loc2_);
                    }
                    return _loc2_;
                }
            }
        }
        return null;
    }

    public enableLookupCache(): void {
        if (this._lookupCache == null) {
            this._lookupCache = new Dictionary();
        }
    }

    public findChildByName(param1: string): IWindow {
        let _loc2_: WindowController = null;
        if (this._lookupCache != null && this._lookupCache.has(param1)) {
            return this._lookupCache.get(param1);
        }
        if (this._children) {
            for (const $e of this._children ?? []) {
                _loc2_ = castTo($e, WindowController);
                if (_loc2_.name == param1) {
                    if (this._lookupCache != null) {
                        this._lookupCache.set(param1, _loc2_);
                    }
                    return _loc2_;
                }
            }
            for (const $e of this._children ?? []) {
                _loc2_ = castTo($e, WindowController);
                _loc2_ = asInstanceOf(_loc2_.findChildByName(param1), WindowController);
                if (_loc2_) {
                    if (this._lookupCache != null) {
                        this._lookupCache.set(param1, _loc2_);
                    }
                    return isIWindow(_loc2_) ? _loc2_ : null;
                }
            }
        }
        return null;
    }

    public getChildByTag(param1: string): IWindow {
        if (this._children) {
            for (const _loc2_ of this._children ?? []) {
                if (_loc2_.tags.indexOf(param1) > -1) {
                    return _loc2_;
                }
            }
        }
        return null;
    }

    public findChildByTag(param1: string): IWindow {
        if (this._tags && this._tags.indexOf(param1) > -1) {
            return this;
        }
        let _loc2_: WindowController = castTo(this.getChildByTag(param1), WindowController);
        if (_loc2_ == null && this._children) {
            for (const $e of this._children ?? []) {
                _loc2_ = castTo($e, WindowController);
                _loc2_ = asInstanceOf(_loc2_.findChildByTag(param1), WindowController);
                if (_loc2_ != null) {
                    break;
                }
            }
        }
        return isIWindow(_loc2_) ? _loc2_ : null;
    }

    public windowIsChild(param1: IWindow): boolean {
        if (this == param1) {
            return true;
        }
        if (this._children) {
            for (const _loc2_ of this._children ?? []) {
                if (_loc2_.windowIsChild(param1)) {
                    return true;
                }
            }
        }
        return false;
    }

    public getChildIndex(param1: IWindow): number {
        return this._children ? this._children.indexOf(param1) : -1;
    }

    public removeChild(param1: IWindow): IWindow {
        if (!this._children) {
            return null;
        }
        let _loc3_: number = this._children.indexOf(param1);
        if (_loc3_ < 0) {
            return null;
        }
        this._children.splice(_loc3_, 1);
        param1.parent = null;
        let _loc2_: IGraphicContextHost = isIGraphicContextHost(param1) ? param1 : null;
        if (_loc2_ && _loc2_.hasGraphicsContext()) {
            this._SafeStr_2145.removeChildContext(_loc2_.getGraphicContext(true));
        }
        let _loc4_: WindowEvent = WindowEvent.allocate("WE_CHILD_REMOVED", this, param1);
        this.update(this, _loc4_);
        _loc4_.recycle();
        return param1;
    }

    public removeChildAt(param1: number): IWindow {
        return this.removeChild(this.getChildAt(param1));
    }

    public setChildIndex(param1: IWindow, param2: number): void {
        let _loc4_: WindowController = null;
        if (!this._children) {
            return;
        }
        let _loc3_: number = this._children.indexOf(param1);
        if (_loc3_ > -1 && param2 != _loc3_) {
            this._children.splice(_loc3_, 1);
            this._children.splice(param2, 0, param1);
            _loc4_ = castTo(param1, WindowController);
            if (_loc4_.hasGraphicsContext()) {
                this._SafeStr_2145.setChildContextIndex(_loc4_.getGraphicContext(true), this.getChildIndex(_loc4_));
            }
        }
    }

    public swapChildren(param1: IWindow, param2: IWindow): void {
        let _loc3_: number = 0;
        let _loc6_: number = 0;
        let _loc5_: IWindow = null;
        let _loc4_: number = 0;
        if (!this._children) {
            return;
        }
        if (param1 != null && param2 != null && param1 != param2) {
            _loc3_ = this._children.indexOf(param1);
            if (_loc3_ < 0) {
                return;
            }
            _loc6_ = this._children.indexOf(param2);
            if (_loc6_ < 0) {
                return;
            }
            if (_loc6_ < _loc3_) {
                _loc5_ = param1;
                param1 = param2;
                param2 = _loc5_;
                _loc4_ = _loc3_;
                _loc3_ = _loc6_;
                _loc6_ = _loc4_;
            }
            this._children.splice(_loc6_, 1);
            this._children.splice(_loc3_, 1);
            this._children.splice(_loc3_, 0, param2);
            this._children.splice(_loc6_, 0, param1);
            if (castTo(param1, WindowController).hasGraphicsContext() || Boolean(castTo(param2, WindowController).hasGraphicsContext())) {
                this._SafeStr_2145.swapChildContexts(castTo(param1, WindowController).getGraphicContext(true), castTo(param2, WindowController).getGraphicContext(true));
            }
        }
    }

    public swapChildrenAt(param1: number, param2: number): void {
        if (!this._children) {
            return;
        }
        this.swapChildren(this._children[param1], this._children[param2]);
        this._SafeStr_2145.swapChildContextsAt(param1, param2);
    }

    public groupChildrenWithID(param1: number, param2: any[], param3: number = 0): number {
        let _loc5_: any = null;
        if (!this._children) {
            return 0;
        }
        let _loc4_: number = 0;
        for (_loc5_ of this._children ?? []) {
            if (_loc5_.id == param1) {
                param2.push(_loc5_);
                _loc4_++;
            }
            if (param3 > 0 || param3 < 0) {
                param3--;
                _loc4_ = _loc4_ + _loc5_.groupChildrenWithID(param1, param2, param3) >>> 0;
            }
        }
        return _loc4_;
    }

    public groupChildrenWithTag(param1: string, param2: any[], param3: number = 0): number {
        let _loc5_: any = null;
        if (!this._children) {
            return 0;
        }
        let _loc4_: number = 0;
        for (_loc5_ of this._children ?? []) {
            if (_loc5_.tags.indexOf(param1) > -1) {
                param2.push(_loc5_);
                _loc4_++;
            }
            if (param3 > 0 || param3 < 0) {
                _loc4_ = _loc4_ + _loc5_.groupChildrenWithTag(param1, param2, param3 - 1) >>> 0;
            }
        }
        return _loc4_;
    }

    public findParentByName(param1: string): IWindow {
        if (this._name == param1) {
            return this;
        }
        if (this._parent != null) {
            if (this._parent.name == param1) {
                return this._parent;
            }
            return this._parent.findParentByName(param1);
        }
        return null;
    }

    protected requiresOwnGraphicContext(): boolean {
        let _loc1_: any = null;
        if (this.testParamFlag(16)) {
            if (this._children) {
                for (_loc1_ of this._children ?? []) {
                    if (_loc1_.requiresOwnGraphicContext()) {
                        return true;
                    }
                }
            }
            return false;
        }
        return true;
    }

    public createProperty(param1: string, param2: any): PropertyStruct {
        return this._propertyDefaults._SafeStr_2119(param1).withValue(param2);
    }

    public getDefaultProperty(param1: string): PropertyStruct {
        return this._propertyDefaults._SafeStr_2119(param1);
    }

    public isEnabled(): boolean {
        return !this.getStateFlag(32);
    }

    public enableChildren(param1: boolean, param2: any[]): void {
        let _loc4_: IWindow = null;
        for (const _loc3_ of param2 ?? []) {
            _loc4_ = this.findChildByName(stringOrNull(_loc3_));
            if (_loc4_ != null) {
                if (param1) {
                    _loc4_.enable();
                } else {
                    _loc4_.disable();
                }
            }
        }
    }

    public activateChildren(param1: boolean, param2: any[]): void {
        let _loc4_: IWindow = null;
        for (const _loc3_ of param2 ?? []) {
            _loc4_ = this.findChildByName(stringOrNull(_loc3_));
            if (_loc4_ != null) {
                if (param1) {
                    _loc4_.activate();
                } else {
                    _loc4_.deactivate();
                }
            }
        }
    }

    public setVisibleChildren(param1: boolean, param2: any[]): void {
        let _loc4_: IWindow = null;
        for (const _loc3_ of param2 ?? []) {
            _loc4_ = this.findChildByName(stringOrNull(_loc3_));
            if (_loc4_ != null) {
                _loc4_.visible = param1;
            }
        }
    }

    public set immediateClickMode(param1: boolean) {
        let _loc2_: IGraphicContext = null;
        if (param1 != this._immediateClickMode) {
            this._immediateClickMode = param1;
            _loc2_ = this.getGraphicContext(false);
            if (_loc2_) {
                if (this._immediateClickMode) {
                    _loc2_.mouse = true;
                    _loc2_.addEventListener("click", this.immediateClickHandler);
                } else {
                    _loc2_.mouse = false;
                    _loc2_.removeEventListener("click", this.immediateClickHandler);
                }
            }
        }
    }

    protected immediateClickHandler(param1: Event): void {
        let _loc5_: IWindow = null;
        let _loc2_: MouseEvent = param1 instanceof MouseEvent ? param1 : null;
        let _loc6_: Point = new Point(_loc2_.stageX, _loc2_.stageY);
        let _loc3_: any[] = [];
        this.desktop.groupChildrenUnderPoint(_loc6_, _loc3_);
        while (_loc3_.length > 0) {
            _loc5_ = _loc3_.pop();
            if (_loc5_ == this) {
                break;
            }
            if (_loc5_.getParamFlag(1)) {
                return;
            }
        }
        this.getRelativeMousePosition(_loc6_);
        let _loc4_: WindowEvent = WindowMouseEvent.allocate_WindowMouseEvent("WME_CLICK", this, null, _loc6_.x, _loc6_.y, _loc2_.stageX, _loc2_.stageY, _loc2_.altKey, _loc2_.ctrlKey, _loc2_.shiftKey, _loc2_.buttonDown, _loc2_.delta);
        if (this._events) {
            this._events.dispatchEvent(_loc4_);
        }
        if (!_loc4_.isWindowOperationPrevented()) {
            if (this.procedure != null) {
                this.procedure(_loc4_, this);
            }
        }
        param1.stopImmediatePropagation();
        _loc4_.recycle();
    }

    public override get x(): number {
        return super.x;
    }

    public override get y(): number {
        return super.y;
    }

    public override get id(): number {
        return super.id;
    }

    public override get name(): string {
        return super.name;
    }

    public override get width(): number {
        return super.width;
    }

    public override get height(): number {
        return super.height;
    }

    public override get position(): Point {
        return super.position;
    }

    public override get rectangle(): Rectangle {
        return super.rectangle;
    }

    public override get background(): boolean {
        return super.background;
    }

    public override get color(): number {
        return super.color;
    }

    public override get alpha(): number {
        return super.alpha;
    }

    public override get blend(): number {
        return super.blend;
    }

    public override get visible(): boolean {
        return super.visible;
    }

    public override get type(): number {
        return super.type;
    }

    public override get caption(): string {
        return super.caption;
    }

    public override get tags(): any[] {
        return super.tags;
    }

    public override get mouseThreshold(): number {
        return super.mouseThreshold;
    }

    public override get state(): number {
        return super.state;
    }

    public override get style(): number {
        return super.style;
    }

    public override get dynamicStyle(): string {
        return super.dynamicStyle;
    }

    public override get clipping(): boolean {
        return super.clipping;
    }

    get [IWindow](): true {
        return true;
    }

    get [IGraphicContextHost](): true {
        return true;
    }

    get [IChildWindowHost](): true {
        return true;
    }
}
