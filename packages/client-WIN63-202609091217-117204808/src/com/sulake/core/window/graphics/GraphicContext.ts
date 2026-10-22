import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import type { IBitmapDrawable } from '@habbo-pixi/runtime/display/IBitmapDrawable';
import { MorphShape } from '@habbo-pixi/runtime/display/MorphShape';
import { Shape } from '@habbo-pixi/runtime/display/Shape';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { TrackedBitmapData } from '@/com/sulake/core/utils/profiler/tracking/TrackedBitmapData';
import { IGraphicContext, isIGraphicContext } from '@/com/sulake/core/window/graphics/IGraphicContext';

export class GraphicContext extends Sprite implements IGraphicContext {
    static { registerClassName(this, 'com.sulake.core.window.graphics::GraphicContext'); }

    public static readonly _SafeStr_8340: number = 0;
    public static readonly GC_TYPE_BITMAP: number = 1;
    public static readonly _SafeStr_8689: number = 2;
    public static readonly GC_TYPE_CONTAINER: number = 4;
    public static readonly GC_TYPE_SHAPE: number = 8;
    public static readonly GC_TYPE_MORPH_SHAPE: number = 16;
    public static readonly _SafeStr_7959: number = 64;
    public static readonly _SafeStr_8495: number = 128;
    public static readonly _SafeStr_8158: number = 256;
    protected static _counter: number = 0;
    protected static _SafeStr_3260: number = 0;

    declare protected _SafeStr_2450: DisplayObjectContainer;

    declare protected _useAlpha: boolean;
    static { (this.prototype as any)._useAlpha = false; }

    declare protected _SafeStr_3537: boolean;
    static { (this.prototype as any)._SafeStr_3537 = false; }

    protected _disposed: boolean = false;

    declare protected _rectangle: Rectangle;

    declare protected _mask: Shape;

    constructor(param1: string, param2: number, param3: Rectangle) {
        let _loc4_: TextField = null;
        super();
        GraphicContext._counter = GraphicContext._counter + 1 >>> 0;
        if (param3 == null) {
            param3 = new Rectangle(0, 0, 0, 0);
        }
        this.name = param1;
        this.mouseEnabled = false;
        this.doubleClickEnabled = false;
        this.x = param3.x;
        this.y = param3.y;
        this._rectangle = param3;
        this._useAlpha = true;
        this._SafeStr_3537 = false;
        switch (param2) {
            case 1:
                this._SafeStr_3537 = true;
                this.setDisplayObject(new Bitmap());
                this.allocateDrawBuffer(param3.width | 0, param3.height | 0);
                break;
            case 2:
                _loc4_ = new TextField();
                _loc4_.width = param3.width;
                _loc4_.height = param3.height;
                _loc4_.type = "input";
                this.setDisplayObject(_loc4_);
                break;
            case 8:
                this.setDisplayObject(new Shape());
                break;
            case 16:
                this.setDisplayObject(new MorphShape());
                break;
            case 4:
                this.setDisplayObject(new Sprite());
                break;
            case 256:
            case 0:
                break;
            default:
                throw new Error("Unsupported graphic context type: " + param2 + "!");
        }
    }

    public static get numGraphicContexts(): number {
        return GraphicContext._counter;
    }

    public static get allocatedByteCount(): number {
        return GraphicContext._SafeStr_3260;
    }

    public set parent(param1: DisplayObjectContainer) {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        if (param1 != null) {
            param1.addChild(this);
        }
    }

    public offSet(param1: Point): void {
        this.x = param1.x;
        this.y = param1.y;
    }

    public override get filters(): any[] {
        return this.getDisplayObject().filters;
    }

    public override set filters(param1: any[]) {
        this.getDisplayObject().filters = param1;
    }

    public get blend(): number {
        return this.alpha;
    }

    public set blend(param1: number) {
        this.alpha = param1;
    }

    public get mouse(): boolean {
        return this.mouseEnabled;
    }

    public set mouse(param1: boolean) {
        this.mouseEnabled = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this.parent != null) {
                this.parent.removeChild(this);
                this.parent = null;
            }
            while (this.numChildContexts > 0) {
                this.removeChildContextAt(0);
            }
            if (this._SafeStr_3537) {
                this.releaseDrawBuffer();
            }
            if (this._SafeStr_2450 != null) {
                while (this._SafeStr_2450.numChildren > 0) {
                    this._SafeStr_2450.removeChildAt(0);
                }
            }
            this._SafeStr_2450 = null;
            while (this.numChildren > 0) {
                this.removeChildAt(0);
            }
            this._mask = null;
            this._disposed = true;
            GraphicContext._counter = GraphicContext._counter - 1 >>> 0;
        }
    }

    public override toString(): string {
        return "[object GraphicContext name=\"" + this.name + "\"]";
    }

    public getDrawRegion(): Rectangle {
        return this._rectangle.clone();
    }

    public setDrawRegion(param1: Rectangle, param2: boolean, param3: Rectangle): BitmapData {
        let _loc4_: BitmapData = null;
        if (param1.width < 1 || param1.height < 1) {
            return null;
        }
        if (this._SafeStr_3537 && param2) {
            _loc4_ = this.allocateDrawBuffer(param1.width | 0, param1.height | 0);
        }
        this.x = param1.x;
        this.y = param1.y;
        this._rectangle.x = param1.x;
        this._rectangle.y = param1.y;
        this._rectangle.width = param1.width;
        this._rectangle.height = param1.height;
        if (param3) {
            if (!this._mask) {
                this._mask = new Shape();
                this._mask.visible = false;
                super.addChild(this._mask);
            }
            this._mask.graphics.clear();
            this._mask.graphics.beginFill(255);
            this._mask.graphics.drawRect(param3.x, param3.y, param3.width, param3.height);
            this._mask.graphics.endFill();
            this.getDisplayObject().mask = this._mask;
        } else if (this._mask) {
            super.removeChild(this._mask);
            this._mask.graphics.clear();
            this._mask = null;
            this.getDisplayObject().mask = null;
        }
        return _loc4_;
    }

    public getDisplayObject(): DisplayObject {
        return this.getChildAt(0);
    }

    public setDisplayObject(param1: DisplayObject): DisplayObject {
        let _loc2_: DisplayObject = null;
        if (this.numChildren > 0) {
            _loc2_ = this.removeChildAt(0);
        }
        this.addChildAt(param1, 0);
        param1.mask = this._mask;
        return _loc2_;
    }

    public getAbsoluteMousePosition(param1: Point): void {
        param1.x = this.stage.mouseX;
        param1.y = this.stage.mouseY;
    }

    public getRelativeMousePosition(param1: Point): void {
        let _loc2_: DisplayObject = this.getDisplayObject();
        param1.x = _loc2_.mouseX;
        param1.y = _loc2_.mouseY;
    }

    public fetchDrawBuffer(): IBitmapDrawable {
        let _loc1_: Bitmap = null;
        if (this._SafeStr_3537) {
            _loc1_ = asInstanceOf(this.getDisplayObject(), Bitmap);
            if (_loc1_) {
                return _loc1_.bitmapData;
            }
        }
        return null;
    }

    protected allocateDrawBuffer(param1: number, param2: number): BitmapData {
        let _loc3_: Bitmap = null;
        let _loc4_: BitmapData = null;
        if (this._SafeStr_3537) {
            _loc3_ = asInstanceOf(this.getDisplayObject(), Bitmap);
            if (_loc3_) {
                _loc4_ = _loc3_.bitmapData;
                if (_loc4_ != null) {
                    if (_loc4_.width != param1 || _loc4_.height != param2) {
                        _loc3_.bitmapData = null;
                        GraphicContext._SafeStr_3260 -= _loc4_.width * _loc4_.height * 4;
                        _loc4_.dispose();
                        _loc4_ = null;
                    }
                }
                if (_loc4_ == null && param1 > 0 && param2 > 0) {
                    _loc4_ = new TrackedBitmapData(this, param1, param2, this._useAlpha, 16777215);
                    GraphicContext._SafeStr_3260 += _loc4_.width * _loc4_.height * 4;
                    _loc3_.bitmapData = _loc4_;
                }
                return _loc4_;
            }
        }
        return null;
    }

    protected releaseDrawBuffer(): void {
        let _loc1_: Bitmap = null;
        let _loc2_: BitmapData = null;
        if (this._SafeStr_3537) {
            _loc1_ = asInstanceOf(this.getDisplayObject(), Bitmap);
            if (_loc1_) {
                _loc2_ = _loc1_.bitmapData;
                if (_loc2_ != null) {
                    _loc1_.bitmapData = null;
                    GraphicContext._SafeStr_3260 -= _loc2_.width * _loc2_.height * 4;
                    _loc2_.dispose();
                }
            }
        }
    }

    public showRedrawRegion(param1: Rectangle): void {
        this.graphics.clear();
        this.graphics.lineStyle(1, 4278255360);
        this.graphics.drawRect(0, 0, this.width, this.height);
        if (param1 != null) {
            this.graphics.lineStyle(1, 4278190335);
            this.graphics.drawRect(param1.x, param1.y, param1.width, param1.height);
        }
    }

    protected setupChildContainer(): DisplayObjectContainer {
        if (this._SafeStr_2450 == null) {
            this._SafeStr_2450 = new Sprite();
            this._SafeStr_2450.name = this.name + " - Child Container";
            this._SafeStr_2450.mouseEnabled = false;
            this.addChild(this._SafeStr_2450);
        }
        return this._SafeStr_2450;
    }

    protected removeChildContainer(): void {
        if (this._SafeStr_2450 != null) {
            this.removeChild(this._SafeStr_2450);
            this._SafeStr_2450 = null;
        }
    }

    public get numChildContexts(): number {
        return this._SafeStr_2450 != null ? this._SafeStr_2450.numChildren : 0;
    }

    public addChildContext(param1: IGraphicContext): IGraphicContext {
        return asGuarded(this.setupChildContainer().addChild(param1 instanceof DisplayObject ? param1 : null), isIGraphicContext);
    }

    public addChildContextAt(param1: IGraphicContext, param2: number): IGraphicContext {
        return asGuarded(this.setupChildContainer().addChildAt(param1 instanceof DisplayObject ? param1 : null, param2), isIGraphicContext);
    }

    public getChildContextAt(param1: number): IGraphicContext {
        return asGuarded(this.setupChildContainer().getChildAt(param1), isIGraphicContext);
    }

    public getChildContextByName(param1: string): IGraphicContext {
        return asGuarded(this.setupChildContainer().getChildByName(param1), isIGraphicContext);
    }

    public getChildContextIndex(param1: IGraphicContext): number {
        return this.setupChildContainer().getChildIndex(castTo(param1, DisplayObject));
    }

    public removeChildContext(param1: IGraphicContext): IGraphicContext {
        return asGuarded(this.setupChildContainer().removeChild(castTo(param1, DisplayObject)), isIGraphicContext);
    }

    public removeChildContextAt(param1: number): IGraphicContext {
        let _loc2_: IGraphicContext = asGuarded(this.setupChildContainer().getChildAt(param1), isIGraphicContext);
        return _loc2_ == null ? null : this.removeChildContext(_loc2_);
    }

    public setChildContextIndex(param1: IGraphicContext, param2: number): void {
        let _loc4_: number = 0;
        let _loc5_: any[] = null;
        let _loc6_: any = 0;
        let _loc3_: DisplayObject = param1 instanceof DisplayObject ? param1 : null;
        if (_loc3_ != null) {
            try {
                _loc4_ = this.setupChildContainer().getChildIndex(_loc3_);
            } catch ($e) {
                if ($e instanceof ArgumentError) {
                    let error: ArgumentError = $e;
                    _loc5_ = [];
                    _loc6_ = 0;
                    while (_loc6_ < this.numChildContexts) {
                        _loc5_.push(this.getChildContextAt(_loc6_ | 0));
                        _loc6_++;
                    }
                    throw new Error("Provided display object is not a child of this!");
                } else {
                    throw $e;
                }
            }
            if (param2 != _loc4_) {
                this.setupChildContainer().setChildIndex(_loc3_, param2);
            }
            return;
        }
        throw new Error("Provided child must implement IGraphicContext!");
    }

    public swapChildContexts(param1: IGraphicContext, param2: IGraphicContext): void {
        this.setupChildContainer().swapChildren(param1 instanceof DisplayObject ? param1 : null, param2 instanceof DisplayObject ? param2 : null);
    }

    public swapChildContextsAt(param1: number, param2: number): void {
        this.setupChildContainer().swapChildrenAt(param1, param2);
    }

    public override get parent(): DisplayObjectContainer {
        return super.parent;
    }

    get [IGraphicContext](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
