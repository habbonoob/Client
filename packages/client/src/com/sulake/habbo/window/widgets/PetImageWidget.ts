import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { PetFigureData } from '@/com/sulake/habbo/avatar/pets/PetFigureData';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { IPetImageWidget } from '@/com/sulake/habbo/window/widgets/IPetImageWidget';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class PetImageWidget implements IPetImageWidget, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::PetImageWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "pet_image";
    private static readonly FIGURE_KEY: string = "pet_image:figure";
    private static readonly SCALE_KEY: string = "pet_image:scale";
    private static readonly _SafeStr_7582: string = "pet_image:direction";
    private static readonly _SafeStr_8616: string = "pet_image:zoomX";
    private static readonly _SafeStr_8758: string = "pet_image:zoomY";
    private static readonly SHRINK_ON_OVERFLOW_KEY: string = "pet_image:shrink_on_overflow";
    private static readonly _SafeStr_3917: any[] = ["northeast", "east", "southeast", "south", "southwest", "west", "northwest", "north"];
    private static readonly SCALES: any[] = [32, 64];

    private static get FIGURE_DEFAULT(): PropertyStruct {
        PetImageWidget.#initStatics();
        return PetImageWidget.FIGURE_DEFAULT;
    }

    private static get SCALE_DEFAULT(): PropertyStruct {
        PetImageWidget.#initStatics();
        return PetImageWidget.SCALE_DEFAULT;
    }

    private static get DIRECTION_DEFAULT(): PropertyStruct {
        PetImageWidget.#initStatics();
        return PetImageWidget.DIRECTION_DEFAULT;
    }

    private static get ZOOM_X_DEFAULT(): PropertyStruct {
        PetImageWidget.#initStatics();
        return PetImageWidget.ZOOM_X_DEFAULT;
    }

    private static get ZOOM_Y_DEFAULT(): PropertyStruct {
        PetImageWidget.#initStatics();
        return PetImageWidget.ZOOM_Y_DEFAULT;
    }

    private static get SHRINK_ON_OVERFLOW_DEFAULT(): PropertyStruct {
        PetImageWidget.#initStatics();
        return PetImageWidget.SHRINK_ON_OVERFLOW_DEFAULT;
    }

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._SafeStr_3587 = new UtilsMap();
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("pet_image_xml").content, XML)), isIWindowContainer);
        this._bitmap = asGuarded(this._root.findChildByName("bitmap"), isIBitmapWrapperWindow);
        this._SafeStr_2394 = asGuarded(this._root.findChildByName("region"), isIRegionWindow);
        this.refresh();
        this._SafeStr_2293.rootWindow = this._root;
        this._root.width = this._SafeStr_2293.width;
        this._root.height = this._SafeStr_2293.height;
    }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    declare private _bitmap: IBitmapWrapperWindow;

    declare private _SafeStr_2394: IRegionWindow;

    private _figure: string = String(PetImageWidget.FIGURE_DEFAULT.value);
    private _scale: number = PetImageWidget.SCALE_DEFAULT.value | 0;
    private _direction: number = PetImageWidget._SafeStr_3917.indexOf(String(PetImageWidget.DIRECTION_DEFAULT.value));
    private _zoomX: number = Number(PetImageWidget.ZOOM_X_DEFAULT.value);
    private _zoomY: number = Number(PetImageWidget.ZOOM_Y_DEFAULT.value);

    declare private _SafeStr_3587: UtilsMap;

    declare private _SafeStr_3745: BitmapData;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private _shrinkOnOverflow: boolean = Boolean(PetImageWidget.SHRINK_ON_OVERFLOW_DEFAULT.value);

    public get shrinkOnOverflow(): boolean {
        return this._shrinkOnOverflow;
    }

    public set shrinkOnOverflow(param1: boolean) {
        this._shrinkOnOverflow = param1;
        this.refresh();
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public get properties(): any[] {
        let _loc1_: any[] = [];
        if (this._disposed) {
            return _loc1_;
        }
        _loc1_.push(PetImageWidget.FIGURE_DEFAULT.withValue(this._figure));
        _loc1_.push(PetImageWidget.SCALE_DEFAULT.withValue(this._scale));
        _loc1_.push(PetImageWidget.DIRECTION_DEFAULT.withValue(PetImageWidget._SafeStr_3917[this._direction]));
        _loc1_.push(PetImageWidget.ZOOM_X_DEFAULT.withValue(this._zoomX));
        _loc1_.push(PetImageWidget.ZOOM_Y_DEFAULT.withValue(this._zoomY));
        _loc1_.push(PetImageWidget.SHRINK_ON_OVERFLOW_DEFAULT.withValue(this._shrinkOnOverflow));
        return _loc1_;
    }

    public set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "pet_image:figure":
                    this.figure = String(_loc2_.value);
                    break;
                case "pet_image:scale":
                    this.scale = _loc2_.value | 0;
                    break;
                case "pet_image:direction":
                    this.direction = PetImageWidget._SafeStr_3917.indexOf(String(_loc2_.value));
                    break;
                case "pet_image:zoomX":
                    this.zoomX = Number(_loc2_.value);
                    break;
                case "pet_image:zoomY":
                    this.zoomY = Number(_loc2_.value);
                    break;
                case "pet_image:shrink_on_overflow":
                    this.shrinkOnOverflow = Boolean(_loc2_.value);
            }
        }
    }

    public get figure(): string {
        return this._figure;
    }

    public set figure(param1: string) {
        this._figure = this.cleanupAvatarString(param1);
        this.refresh();
    }

    public get scale(): number {
        return this._scale;
    }

    public set scale(param1: number) {
        this._scale = param1;
        this.refresh();
    }

    public get direction(): number {
        return this._direction;
    }

    public set direction(param1: number) {
        this._direction = param1;
        this.refresh();
    }

    public get zoomX(): number {
        return this._zoomX;
    }

    public set zoomX(param1: number) {
        this._zoomX = param1;
        this.refresh();
    }

    public get zoomY(): number {
        return this._zoomY;
    }

    public set zoomY(param1: number) {
        this._zoomY = param1;
        this.refresh();
    }

    public get petWidth(): number {
        if (this._SafeStr_3745 == null) {
            return 0;
        }
        return this._SafeStr_3745.width;
    }

    public get petHeight(): number {
        if (this._SafeStr_3745 == null) {
            return 0;
        }
        return this._SafeStr_3745.height;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_2394 != null) {
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

    public imageReady(param1: number, param2: BitmapData): void {
        let _loc3_: string = stringOrNull(this._SafeStr_3587.getValue(param1));
        if (_loc3_ != null) {
            if (this.cleanupAvatarString(_loc3_) == this._figure) {
                this.refresh();
            }
        }
    }

    public imageFailed(param1: number): void {
    }

    public refresh(): void {
        let _loc4_: string = null;
        let _loc2_: ImageResult = null;
        let _loc6_: number = 0;
        let _loc5_: string = null;
        if (this._bitmap == null) {
            return;
        }
        this._bitmap.bitmap = null;
        this._bitmap.blend = this._SafeStr_2293.blend;
        let _loc1_: PetFigureData = new PetFigureData(this._figure);
        if (this._windowManager.roomEngine != null) {
            _loc4_ = "std";
            _loc2_ = this._windowManager.roomEngine.getPetImage(_loc1_.typeId, _loc1_.paletteId, _loc1_.color, new Vector3d(this._direction * 45), this.scale, this, true, 0, _loc1_.customParts, _loc4_);
            if (_loc2_ != null) {
                _loc6_ = _loc2_.id;
                this._SafeStr_3587.remove(_loc6_);
                if (_loc6_ > 0) {
                    this._SafeStr_3587.add(_loc6_, this._figure);
                }
                this._bitmap.bitmap = _loc2_.data;
                this._bitmap.disposesBitmap = true;
            }
        }
        if (this._bitmap.bitmap == null || this._bitmap.bitmap.width < 2) {
            _loc5_ = "placeholder_pet" + (this._scale == 32 ? "_small" : "") + "_png";
            this._bitmap.bitmap = asInstanceOf(this._windowManager.assets.getAssetByName(_loc5_).content, BitmapData);
            this._bitmap.disposesBitmap = false;
        }
        let _loc7_: number = this.zoomX;
        let _loc3_: number = this.zoomY;
        this._SafeStr_3745 = this._bitmap.bitmap;
        if (this._shrinkOnOverflow && (this._SafeStr_3745.width * this.zoomX > this._SafeStr_2293.width || this._SafeStr_3745.height * this.zoomY > this._SafeStr_2293.height)) {
            _loc7_ *= 0.5;
            _loc3_ *= 0.5;
        }
        if (_loc7_ != 1 || _loc3_ != 1) {
            this._bitmap.bitmap = this.zoomBitmapData(this._bitmap.bitmap, _loc7_, _loc3_);
        }
        this._bitmap.invalidate();
    }

    private zoomBitmapData(param1: BitmapData, param2: number, param3: number): BitmapData {
        let _loc5_: number = param1.width * param2;
        let _loc6_: number = param1.height * param3;
        let _loc4_: BitmapData = new BitmapData(_loc5_ | 0, _loc6_ | 0, true, 0);
        let _loc7_: Matrix = new Matrix();
        _loc7_.scale(param2, param3);
        _loc4_.draw(param1, _loc7_);
        return _loc4_;
    }

    private cleanupAvatarString(param1: string): string {
        return param1 == null ? String(PetImageWidget.FIGURE_DEFAULT.value) : param1.replace(/NaN/g, "");
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (PetImageWidget.#staticsReady) return;
        PetImageWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(PetImageWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("FIGURE_DEFAULT", null);
        set("SCALE_DEFAULT", null);
        set("DIRECTION_DEFAULT", null);
        set("ZOOM_X_DEFAULT", null);
        set("ZOOM_Y_DEFAULT", null);
        set("SHRINK_ON_OVERFLOW_DEFAULT", null);
        set("FIGURE_DEFAULT", new PropertyStruct("pet_image:figure", "1 0 ffffff", "String"));
        set("SCALE_DEFAULT", new PropertyStruct("pet_image:scale", 64, "int", false, PetImageWidget.SCALES));
        set("DIRECTION_DEFAULT", new PropertyStruct("pet_image:direction", PetImageWidget._SafeStr_3917[2], "String", false, PetImageWidget._SafeStr_3917));
        set("ZOOM_X_DEFAULT", new PropertyStruct("pet_image:zoomX", 1, "Number"));
        set("ZOOM_Y_DEFAULT", new PropertyStruct("pet_image:zoomY", 1, "Number"));
        set("SHRINK_ON_OVERFLOW_DEFAULT", new PropertyStruct("pet_image:shrink_on_overflow", false, "Boolean"));
    }

    get [IPetImageWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
