import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { IFurnitureImageWidget } from '@/com/sulake/habbo/window/widgets/IFurnitureImageWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class FurnitureImageWidget implements IFurnitureImageWidget, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::FurnitureImageWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "furniture_image";
    private static readonly _SafeStr_7827: string = "furniture_image:furnitureType";
    private static readonly SCALE_KEY: string = "furniture_image:scale";
    private static readonly _SafeStr_7582: string = "furniture_image:direction";
    private static readonly ITEM_TYPE_FLOOR: number = 0;
    private static readonly ITEM_TYPE_WALL: number = 1;
    private static readonly _SafeStr_3917: any[] = ["northeast", "east", "southeast", "south", "southwest", "west", "northwest", "north"];
    private static readonly SCALES: any[] = [32, 64];

    private static get FURNITURE_TYPE_DEFAULT(): PropertyStruct {
        FurnitureImageWidget.#initStatics();
        return FurnitureImageWidget.FURNITURE_TYPE_DEFAULT;
    }

    private static get SCALE_DEFAULT(): PropertyStruct {
        FurnitureImageWidget.#initStatics();
        return FurnitureImageWidget.SCALE_DEFAULT;
    }

    private static get DIRECTION_DEFAULT(): PropertyStruct {
        FurnitureImageWidget.#initStatics();
        return FurnitureImageWidget.DIRECTION_DEFAULT;
    }

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._SafeStr_3587 = new UtilsMap();
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("furniture_image_xml").content, XML)), isIWindowContainer);
        this._bitmap = asGuarded(this._root.findChildByName("bitmap"), isIBitmapWrapperWindow);
        this._SafeStr_2394 = asGuarded(this._root.findChildByName("region"), isIRegionWindow);
        this._SafeStr_2394.addEventListener("WME_CLICK", this.onClick);
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

    private _furnitureType: string = "table_plasto_square";
    private _scale: number = FurnitureImageWidget.SCALE_DEFAULT.value | 0;
    private _direction: number = FurnitureImageWidget._SafeStr_3917.indexOf(String(FurnitureImageWidget.DIRECTION_DEFAULT.value));

    declare private _SafeStr_3587: UtilsMap;

    declare private _extra: string;

    private _itemType: number = 0;
    private _stuffData: IStuffData = null;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public get properties(): any[] {
        let _loc1_: any[] = [];
        if (this._disposed) {
            return _loc1_;
        }
        _loc1_.push(FurnitureImageWidget.FURNITURE_TYPE_DEFAULT.withValue(this._furnitureType));
        _loc1_.push(FurnitureImageWidget.SCALE_DEFAULT.withValue(this._scale));
        _loc1_.push(FurnitureImageWidget.DIRECTION_DEFAULT.withValue(FurnitureImageWidget._SafeStr_3917[this._direction]));
        return _loc1_;
    }

    public set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "furniture_image:furnitureType":
                    this.furnitureType = String(_loc2_.value);
                    break;
                case "furniture_image:scale":
                    this.scale = _loc2_.value | 0;
                    break;
                case "furniture_image:direction":
                    this.direction = FurnitureImageWidget._SafeStr_3917.indexOf(String(_loc2_.value));
            }
        }
    }

    public get furnitureType(): string {
        return this._furnitureType;
    }

    public set furnitureType(param1: string) {
        this._furnitureType = param1;
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

    public imageReady(param1: number, param2: BitmapData): void {
        let _loc3_: string = stringOrNull(this._SafeStr_3587.getValue(param1));
        if (_loc3_ == this._furnitureType) {
            this.refresh();
        }
    }

    public imageFailed(param1: number): void {
    }

    private refresh(): void {
        let _loc1_: ImageResult = null;
        let _loc2_: string = null;
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc3_: string = null;
        this._bitmap.bitmap = null;
        if (this._windowManager.roomEngine != null) {
            _loc2_ = "std";
            _loc5_ = this._windowManager.roomEngine.getFurnitureTypeId(this._furnitureType);
            if (this._itemType == 0) {
                _loc1_ = this._windowManager.roomEngine.getFurnitureImage(_loc5_, new Vector3d(this._direction * 45, 0, 0), this._scale, this, 0, this._extra, -1, -1, this._stuffData);
            } else {
                _loc1_ = this._windowManager.roomEngine.getWallItemImage(_loc5_, new Vector3d(this._direction * 45, 0, 0), this._scale, this, 0, this._stuffData ? this._stuffData.getLegacyString() : "");
            }
            if (_loc1_ != null) {
                _loc4_ = _loc1_.id;
                this._SafeStr_3587.remove(_loc4_);
                if (_loc4_ > 0) {
                    this._SafeStr_3587.add(_loc4_, this._furnitureType);
                }
                this._bitmap.bitmap = _loc1_.data;
                this._bitmap.disposesBitmap = true;
            }
        }
        if (this._bitmap.bitmap == null || this._bitmap.bitmap.width < 2) {
            _loc3_ = "placeholder_furni" + (this._scale == 32 ? "_small" : "") + "_png";
            this._bitmap.bitmap = asInstanceOf(this._windowManager.assets.getAssetByName(_loc3_).content, BitmapData);
            this._bitmap.disposesBitmap = false;
        }
        this._bitmap.invalidate();
        this._SafeStr_2293.width = this._bitmap.bitmap.width;
        this._SafeStr_2293.height = this._bitmap.bitmap.height;
    }

    private onClick = (param1: WindowMouseEvent): void => {
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FurnitureImageWidget.#staticsReady) return;
        FurnitureImageWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FurnitureImageWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("FURNITURE_TYPE_DEFAULT", null);
        set("SCALE_DEFAULT", null);
        set("DIRECTION_DEFAULT", null);
        set("FURNITURE_TYPE_DEFAULT", new PropertyStruct("furniture_image:furnitureType", "table_plasto_square", "String", false));
        set("SCALE_DEFAULT", new PropertyStruct("furniture_image:scale", 64, "int", false, FurnitureImageWidget.SCALES));
        set("DIRECTION_DEFAULT", new PropertyStruct("furniture_image:direction", FurnitureImageWidget._SafeStr_3917[2], "String", false, FurnitureImageWidget._SafeStr_3917));
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
