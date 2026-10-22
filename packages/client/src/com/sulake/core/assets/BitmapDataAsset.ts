import { asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetTypeDeclaration } from '@/com/sulake/core/assets/AssetTypeDeclaration';
import type { ILazyAsset } from '@/com/sulake/core/assets/ILazyAsset';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Loader } from '@habbo-pixi/runtime/display/Loader';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { IAsset } from '@/com/sulake/core/assets/IAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { PNGDecoder } from '@/com/sulake/core/utils/images/PNGDecoder';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class BitmapDataAsset implements ILazyAsset {
    static { registerClassName(this, 'com.sulake.core.assets::BitmapDataAsset'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        BitmapDataAsset.#initStatics();
        return BitmapDataAsset._log;
    }

    private static readonly CLONE_BITMAP_DATA: boolean = true;
    private static readonly USE_ASYNC_LOADER: boolean = false;
    private static readonly IMMEDIATE_PREPARE: boolean = false;
    protected static _SafeStr_3912: number = 0;
    protected static _instances: number = 0;

    public static get instances(): number {
        return BitmapDataAsset._instances;
    }

    public static get allocatedByteCount(): number {
        return BitmapDataAsset._SafeStr_3912;
    }

    constructor(param1: AssetTypeDeclaration, param2: string = null) {
        this._decl = param1;
        this._SafeStr_2991 = param2;
        BitmapDataAsset._instances = BitmapDataAsset._instances + 1 >>> 0;
    }

    declare public name: string;

    declare private _unknown: any;

    declare private _bitmap: BitmapData;

    declare private _decl: AssetTypeDeclaration;

    declare private _SafeStr_2991: string;

    declare private _loader: Loader;

    private _SafeStr_6360: boolean = true;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _rectangle: Rectangle;

    public get rectangle(): Rectangle {
        let _loc1_: BitmapData = null;
        if (!this._rectangle) {
            _loc1_ = castTo(this.content, BitmapData);
            if (_loc1_) {
                this._rectangle = _loc1_.rect;
            }
        }
        return this._rectangle;
    }

    private _offset: Point = new Point(0, 0);

    public get offset(): Point {
        return this._offset;
    }

    private _flipH: boolean = false;

    public get flipH(): boolean {
        return this._flipH;
    }

    private _flipV: boolean = false;

    public get flipV(): boolean {
        return this._flipV;
    }

    public get url(): string {
        return this._SafeStr_2991;
    }

    public get content(): any {
        if (!this._bitmap) {
            this.prepareLazyContent();
        }
        return this._bitmap;
    }

    public get declaration(): AssetTypeDeclaration {
        return this._decl;
    }

    public dispose(): void {
        if (!this._disposed) {
            BitmapDataAsset._instances = BitmapDataAsset._instances - 1 >>> 0;
            if (this._bitmap) {
                try {
                    BitmapDataAsset._SafeStr_3912 -= this._bitmap.width * this._bitmap.height * 4;
                    if (this._SafeStr_6360) {
                        this._bitmap.dispose();
                    }
                } catch (e) {
                }
            }
            if (this._unknown instanceof BitmapData) {
                if (this._SafeStr_6360) {
                    (this._unknown instanceof BitmapData ? this._unknown : null).dispose();
                }
            } else if (this._unknown instanceof Bitmap) {
                (this._unknown instanceof Bitmap ? this._unknown : null).bitmapData.dispose();
            } else if (this._unknown instanceof ByteArray) {
                (this._unknown instanceof ByteArray ? this._unknown : null).clear();
            }
            this._unknown = null;
            this._bitmap = null;
            this._offset = null;
            this._decl = null;
            this._SafeStr_2991 = null;
            this._rectangle = null;
            this._disposed = true;
        }
    }

    public setUnknownContent(param1: any): void {
        if (param1 == null) {
        }
        if (this._bitmap) {
            if (this._bitmap == (param1 instanceof BitmapData ? param1 : null)) {
                return;
            }
            if (this._SafeStr_6360) {
                this._bitmap.dispose();
            }
        }
        this._unknown = param1;
        this._bitmap = null;
    }

    public prepareLazyContent(): void {
        let _loc3_: any = null;
        let _loc2_: Bitmap = null;
        let _loc1_: Bitmap = null;
        if (this._unknown == null) {
            return;
        }
        if (typeof this._unknown === "function") {
            _loc3_ = new (typeof this._unknown === "function" ? this._unknown : null)();
            _loc2_ = _loc3_ instanceof Bitmap ? _loc3_ : null;
            if (_loc2_ != null) {
                this._bitmap = _loc2_.bitmapData.clone();
                _loc2_.bitmapData.dispose();
                if (this._bitmap != null) {
                    BitmapDataAsset._SafeStr_3912 += this._bitmap.width * this._bitmap.height * 4;
                    this._unknown = null;
                    return;
                }
                _loc3_ = new BitmapData(20, 20, true, 16711680);
            }
            this._bitmap = _loc3_ instanceof BitmapData ? _loc3_ : null;
            if (this._bitmap != null) {
                this._unknown = null;
                return;
            }
        }
        if (this._unknown instanceof Bitmap) {
            _loc1_ = castTo(this._unknown, Bitmap);
            this._bitmap = _loc1_.bitmapData;
            if (this._bitmap == null) {
                throw new Error("Failed to convert Bitmap to BitmapDataAsset!");
            }
            this._unknown = null;
        }
        if (this._unknown instanceof BitmapData) {
            this._bitmap = this._unknown instanceof BitmapData ? this._unknown : null;
            if (this._bitmap != null) {
                this._unknown = null;
                return;
            }
            throw new Error("Failed to convert BitmapData to BitmapDataAsset!");
        }
        if (this._unknown instanceof BitmapDataAsset) {
            this._bitmap = castTo(this._unknown, BitmapDataAsset)._bitmap;
            this._offset = castTo(this._unknown, BitmapDataAsset)._offset;
            this._flipH = castTo(this._unknown, BitmapDataAsset)._flipH;
            this._flipV = castTo(this._unknown, BitmapDataAsset)._flipV;
            if (this._bitmap != null) {
                this._unknown = null;
                return;
            }
            throw new Error("Failed to read content from BitmapDataAsset!");
        }
        if (this._unknown instanceof ByteArray) {
            try {
                this._bitmap = new PNGDecoder().decode(this._unknown instanceof ByteArray ? this._unknown : null);
            } catch (e) {
                BitmapDataAsset._log.error("Error decoding asset content to PNG: " + this.url + "::" + this.name);
            }
            this._unknown = null;
        }
    }

    public setFromOtherAsset(param1: IAsset): void {
        if (param1 instanceof BitmapDataAsset) {
            this._bitmap = castTo(param1, BitmapDataAsset)._bitmap;
            this._offset = castTo(param1, BitmapDataAsset)._offset;
            return;
        }
        throw new Error("Provided asset should be of type BitmapDataAsset!");
    }

    public setParamsDesc(param1: XMLList): void {
        let _loc3_: any[] = null;
        let _loc5_: string = null;
        for (const _loc2_ of param1 ?? []) {
            _loc5_ = _loc2_.attribute("key").toString();
            let _loc4_: string = _loc2_.attribute("value").toString();
            switch (_loc5_) {
                case "offset":
                    _loc3_ = _loc4_.split(",");
                    this._offset.x = parseInt(stringOrNull(_loc3_[0]));
                    this._offset.y = parseInt(stringOrNull(_loc3_[1]));
                    break;
                case "region":
                    _loc3_ = _loc4_.split(",");
                    if (!this._rectangle) {
                        this._rectangle = new Rectangle();
                    }
                    this._rectangle.x = parseInt(stringOrNull(_loc3_[0]));
                    this._rectangle.y = parseInt(stringOrNull(_loc3_[1]));
                    this._rectangle.width = parseInt(stringOrNull(_loc3_[2]));
                    this._rectangle.height = parseInt(stringOrNull(_loc3_[3]));
                    break;
                case "flipH":
                    this._flipH = _loc4_ == "1" || _loc4_ == "true";
                    break;
                case "flipV":
                    this._flipV = _loc4_ == "1" || _loc4_ == "true";
            }
        }
    }

    private onLoaderComplete = (param1: Event): void => {
        let _loc2_: Loader = asInstanceOf(param1.currentTarget.loader, Loader);
        let _loc3_: Bitmap = asInstanceOf(_loc2_.content, Bitmap);
        this._bitmap = _loc3_.bitmapData;
        if (this._loader && this._loader.contentLoaderInfo) {
            this._loader.contentLoaderInfo.removeEventListener("complete", this.onLoaderComplete);
        }
        this._loader = null;
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (BitmapDataAsset.#staticsReady) return;
        BitmapDataAsset.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(BitmapDataAsset, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.core.assets.BitmapDataAsset"));
    }

    get [IAsset](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
