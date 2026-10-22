import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { IPixelLimitWidget } from '@/com/sulake/habbo/window/widgets/IPixelLimitWidget';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';

export class PixelLimitWidget implements IPixelLimitWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::PixelLimitWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "pixel_limit";
    private static readonly LIMIT_KEY: string = "pixel_limit:limit";

    private static get LIMIT_DEFAULT(): PropertyStruct {
        PixelLimitWidget.#initStatics();
        return PixelLimitWidget.LIMIT_DEFAULT;
    }

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("badge_image_xml").content, XML)), isIWindowContainer);
        this._bitmap = asGuarded(this._root.findChildByName("bitmap"), isIStaticBitmapWrapperWindow);
        this._SafeStr_2293.rootWindow = this._root;
        this._root.width = this._SafeStr_2293.width;
        this._root.height = this._SafeStr_2293.height;
    }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _SafeStr_4202: boolean;
    static { (this.prototype as any)._SafeStr_4202 = false; }

    declare private _root: IWindowContainer;

    declare private _bitmap: IStaticBitmapWrapperWindow;

    declare private _SafeStr_2394: IRegionWindow;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private _limit: number = PixelLimitWidget.LIMIT_DEFAULT.value | 0;

    public get limit(): number {
        return this._limit;
    }

    public set limit(param1: number) {
        this._limit = Math.max(0, Math.min(100, param1)) | 0;
        this.refresh();
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public get properties(): any[] {
        let _loc2_: any[] = [];
        if (this._disposed) {
            return _loc2_;
        }
        _loc2_.push(PixelLimitWidget.LIMIT_DEFAULT.withValue(this._limit));
        for (const _loc1_ of this._bitmap.properties ?? []) {
            if (_loc1_.key != "asset_uri") {
                _loc2_.push(_loc1_.withNameSpace("pixel_limit"));
            }
        }
        return _loc2_;
    }

    public set properties(param1: any[]) {
        this._SafeStr_4202 = true;
        let _loc3_: any[] = [];
        for (const _loc2_ of param1 ?? []) {
            let _loc4_: any = _loc2_.key;
            if ("pixel_limit:limit" === _loc4_) {
                this.limit = _loc2_.value | 0;
            }
            if (_loc2_.key != "pixel_limit:asset_uri") {
                _loc3_.push(_loc2_.withoutNameSpace());
            }
        }
        this._bitmap.properties = _loc3_;
        this._SafeStr_4202 = false;
        this.refresh();
    }

    public get bitmapData(): BitmapData {
        return this._bitmap.bitmapData;
    }

    public get pivotPoint(): number {
        return this._bitmap.pivotPoint;
    }

    public set pivotPoint(param1: number) {
        this._bitmap.pivotPoint = param1;
        this._bitmap.invalidate();
    }

    public get stretchedX(): boolean {
        return this._bitmap.stretchedX;
    }

    public set stretchedX(param1: boolean) {
        this._bitmap.stretchedX = param1;
        this._bitmap.invalidate();
    }

    public get stretchedY(): boolean {
        return this._bitmap.stretchedY;
    }

    public set stretchedY(param1: boolean) {
        this._bitmap.stretchedY = param1;
        this._bitmap.invalidate();
    }

    public get zoomX(): number {
        return this._bitmap.zoomX;
    }

    public set zoomX(param1: number) {
        this._bitmap.zoomX = param1;
        this._bitmap.invalidate();
    }

    public get zoomY(): number {
        return this._bitmap.zoomY;
    }

    public set zoomY(param1: number) {
        this._bitmap.zoomY = param1;
        this._bitmap.invalidate();
    }

    public get greyscale(): boolean {
        return this._bitmap.greyscale;
    }

    public set greyscale(param1: boolean) {
        this._bitmap.greyscale = param1;
        this._bitmap.invalidate();
    }

    public get etchingColor(): number {
        return this._bitmap.etchingColor;
    }

    public set etchingColor(param1: number) {
        this._bitmap.etchingColor = param1;
        this._bitmap.invalidate();
    }

    public get fitSizeToContents(): boolean {
        return this._bitmap.fitSizeToContents;
    }

    public set fitSizeToContents(param1: boolean) {
        this._bitmap.fitSizeToContents = param1;
        this._bitmap.invalidate();
    }

    public get etchingPoint(): Point {
        return new Point(0, 1);
    }

    public get wrapX(): boolean {
        return false;
    }

    public set wrapX(param1: boolean) {
    }

    public get wrapY(): boolean {
        return false;
    }

    public set wrapY(param1: boolean) {
    }

    public get rotation(): number {
        return 0;
    }

    public set rotation(param1: number) {
    }

    private get assetUri(): string {
        let _loc2_: string = null;
        let _loc1_: number = Math.floor(this._limit / 20) * 20 | 0;
        _loc1_ = Math.max(_loc1_, 20) | 0;
        _loc2_ = "${image.library.url}reception/challenge_meter_%amount%.png";
        return _loc2_.replace("%amount%", _loc1_.toString());
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_2394 != null) {
                this._SafeStr_2394.removeEventListener("WME_CLICK", this.onClick);
                this._SafeStr_2394.dispose();
                this._SafeStr_2394 = null;
            }
            this._bitmap = null;
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
            if (this._SafeStr_2293 != null) {
                this._SafeStr_2293.rootWindow = null;
                this._SafeStr_2293 = null;
            }
            this._windowManager = null;
            this._disposed = true;
        }
    }

    private refresh(): void {
        if (this._SafeStr_4202) {
            return;
        }
        this._bitmap.assetUri = this.assetUri;
        this._bitmap.invalidate();
    }

    private onClick = (param1: WindowMouseEvent): void => {
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (PixelLimitWidget.#staticsReady) return;
        PixelLimitWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(PixelLimitWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("LIMIT_DEFAULT", null);
        set("LIMIT_DEFAULT", new PropertyStruct("pixel_limit:limit", 0, "String", false, null));
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }

    get [IBitmapDataContainer](): true {
        return true;
    }
}
