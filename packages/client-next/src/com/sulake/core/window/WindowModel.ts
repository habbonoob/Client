import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContext } from '@/com/sulake/core/window/IWindowContext';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class WindowModel implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.window::WindowModel'); }

    private static POINT_ZERO: Point = new Point(0, 0);

    declare protected _offsetX: number;
    static { (this.prototype as any)._offsetX = 0; }

    declare protected _offsetY: number;
    static { (this.prototype as any)._offsetY = 0; }

    declare protected _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare protected _y: number;
    static { (this.prototype as any)._y = 0; }

    declare protected _SafeStr_2132: number;
    static { (this.prototype as any)._SafeStr_2132 = 0; }

    declare protected _height: number;
    static { (this.prototype as any)._height = 0; }

    declare protected _SafeStr_2619: Rectangle;

    declare protected _SafeStr_2167: Rectangle;

    declare protected _SafeStr_2380: Rectangle;

    declare protected _SafeStr_2391: Rectangle;

    declare protected _context: WindowContext;

    protected _background: boolean = false;
    protected _fillColor: number = 16777215;

    declare protected _SafeStr_5701: ColorTransform;

    declare protected _alphaColor: number;
    static { (this.prototype as any)._alphaColor = 0; }

    protected _mouseThreshold: number = 10;
    protected _ignoreMouseEvents: boolean = false;
    protected _clipping: boolean = true;
    protected _visible: boolean = true;
    protected _blend: number = 1;

    declare protected _SafeStr_2147: number;
    static { (this.prototype as any)._SafeStr_2147 = 0; }

    declare protected _state: number;
    static { (this.prototype as any)._state = 0; }

    declare protected _style: number;
    static { (this.prototype as any)._style = 0; }

    declare protected _type: number;
    static { (this.prototype as any)._type = 0; }

    protected _caption: string = "";

    declare protected _name: string;

    declare protected _id: number;
    static { (this.prototype as any)._id = 0; }

    declare protected _tags: any[];

    protected _disposed: boolean = false;
    protected _dynamicStyle: string = "";

    constructor(param1: number, param2: string, param3: number, param4: number, param5: number, param6: WindowContext, param7: Rectangle, param8: any[] = null, param9: string = "") {
        this.initInstanceFields();
        this._id = param1;
        this._name = param2;
        this._type = param3;
        this._SafeStr_2147 = param5;
        this._state = 0;
        this._style = param4;
        this._tags = param8;
        this._context = param6;
        this._dynamicStyle = param9;
        this._SafeStr_2126 = param7.x | 0;
        this._y = param7.y | 0;
        this._SafeStr_2132 = param7.width | 0;
        this._height = param7.height | 0;
        this._SafeStr_2619 = param7.clone();
        this._SafeStr_2167 = param7.clone();
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public get width(): number {
        return this._SafeStr_2132;
    }

    public get height(): number {
        return this._height;
    }

    public get position(): Point {
        return new Point(this._SafeStr_2126, this._y);
    }

    public get rectangle(): Rectangle {
        return new Rectangle(this._SafeStr_2126, this._y, this._SafeStr_2132, this._height);
    }

    public get context(): IWindowContext {
        return this._context;
    }

    public get mouseThreshold(): number {
        return this._mouseThreshold;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get background(): boolean {
        return this._background;
    }

    public get clipping(): boolean {
        return this._clipping;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public get color(): number {
        return this._fillColor;
    }

    public get alpha(): number {
        return this._alphaColor >>> 24;
    }

    public get blend(): number {
        return this._blend;
    }

    public get param(): number {
        return this._SafeStr_2147;
    }

    public get state(): number {
        return this._state;
    }

    public get style(): number {
        return this._style;
    }

    public get type(): number {
        return this._type;
    }

    public get caption(): string {
        return this._caption;
    }

    public get name(): string {
        return this._name;
    }

    public get id(): number {
        return this._id | 0;
    }

    public get tags(): any[] {
        return this._tags ? this._tags : (this._tags = []);
    }

    public get left(): number {
        return this._SafeStr_2126;
    }

    public get top(): number {
        return this._y;
    }

    public get right(): number {
        return this._SafeStr_2126 + this._SafeStr_2132;
    }

    public get bottom(): number {
        return this._y + this._height;
    }

    public get renderingX(): number {
        return this._offsetX + this._SafeStr_2126;
    }

    public get renderingY(): number {
        return this._offsetY + this._y;
    }

    public get renderingWidth(): number {
        return this._SafeStr_2132 + Math.abs(this.etchingPoint.x) | 0;
    }

    public get renderingHeight(): number {
        return this._height + Math.abs(this.etchingPoint.y) | 0;
    }

    public get renderingRectangle(): Rectangle {
        return new Rectangle(this.renderingX, this.renderingY, this.renderingWidth, this.renderingHeight);
    }

    public get etchingPoint(): Point {
        return WindowModel.POINT_ZERO;
    }

    public get dynamicStyle(): string {
        return this._dynamicStyle;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._disposed = true;
            this._context = null;
            this._state = 1073741824;
            this._tags = null;
            this._SafeStr_2126 = this._y = this._SafeStr_2132 = this._height = 0;
        }
    }

    public invalidate(param1: Rectangle = null): void {
    }

    public getInitialWidth(): number {
        return this._SafeStr_2619.width | 0;
    }

    public getInitialHeight(): number {
        return this._SafeStr_2619.height | 0;
    }

    public getPreviousWidth(): number {
        return this._SafeStr_2167.width | 0;
    }

    public getPreviousHeight(): number {
        return this._SafeStr_2167.height | 0;
    }

    public getMinimizedWidth(): number {
        return (this._SafeStr_2380 ? this._SafeStr_2380.width : 0) | 0;
    }

    public getMinimizedHeight(): number {
        return (this._SafeStr_2380 ? this._SafeStr_2380.height : 0) | 0;
    }

    public getMaximizedWidth(): number {
        return (this._SafeStr_2391 ? this._SafeStr_2391.width : 2147483647) | 0;
    }

    public getMaximizedHeight(): number {
        return (this._SafeStr_2391 ? this._SafeStr_2391.height : 2147483647) | 0;
    }

    public testTypeFlag(param1: number, param2: number = 0): boolean {
        if (param2 > 0) {
            return (this._type & param2 ^ param1) == 0;
        }
        return (this._type & param1) == param1;
    }

    public testStateFlag(param1: number, param2: number = 0): boolean {
        if (param2 > 0) {
            return (this._state & param2 ^ param1) == 0;
        }
        return (this._state & param1) == param1;
    }

    public testStyleFlag(param1: number, param2: number = 0): boolean {
        if (param2 > 0) {
            return (this._style & param2 ^ param1) == 0;
        }
        return (this._style & param1) == param1;
    }

    public testParamFlag(param1: number, param2: number = 0): boolean {
        if (param2 > 0) {
            return (this._SafeStr_2147 & param2 ^ param1) == 0;
        }
        return (this._SafeStr_2147 & param1) == param1;
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }

    get [IDisposable](): true {
        return true;
    }
}
