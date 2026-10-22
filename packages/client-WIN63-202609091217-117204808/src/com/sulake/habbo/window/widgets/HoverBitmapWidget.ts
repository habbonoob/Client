import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { IHoverBitmapWidget } from '@/com/sulake/habbo/window/widgets/IHoverBitmapWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';

export class HoverBitmapWidget implements IHoverBitmapWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::HoverBitmapWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "hover_bitmap";
    private static readonly _SafeStr_8414: string = "hover_bitmap:hover_asset";
    private static readonly NORMAL_ASSET_KEY: string = "hover_bitmap:normal_asset";

    private static get HOVER_ASSET_DEFAULT(): PropertyStruct {
        HoverBitmapWidget.#initStatics();
        return HoverBitmapWidget.HOVER_ASSET_DEFAULT;
    }

    private static get NORMAL_ASSET_DEFAULT(): PropertyStruct {
        HoverBitmapWidget.#initStatics();
        return HoverBitmapWidget.NORMAL_ASSET_DEFAULT;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _bitmap: IStaticBitmapWrapperWindow;

    declare private _normalAsset: string;

    declare private _hoverAsset: string;

    private _SafeStr_14769: boolean = false;

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._bitmap = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("hover_bitmap_xml").content, XML)), isIStaticBitmapWrapperWindow);
        this._bitmap.addEventListener("WME_OVER", this.onMouseOver);
        this._bitmap.addEventListener("WME_OUT", this.onMouseOut);
        this._SafeStr_2293.rootWindow = this._bitmap;
        this._bitmap.width = this._SafeStr_2293.width;
        this._bitmap.height = this._SafeStr_2293.height;
        this._bitmap.invalidate();
    }

    private onMouseOver = (param1: WindowMouseEvent): void => {
        this._SafeStr_14769 = true;
        this._bitmap.assetUri = this._hoverAsset;
    };

    private onMouseOut = (param1: WindowMouseEvent): void => {
        this._SafeStr_14769 = false;
        this._bitmap.assetUri = this._normalAsset;
    };

    public dispose(): void {
        if (!this._disposed) {
            if (this._bitmap != null) {
                this._bitmap.dispose();
                this._bitmap = null;
            }
            this._SafeStr_2293.rootWindow = null;
            this._SafeStr_2293 = null;
            this._windowManager = null;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public get properties(): any[] {
        let _loc2_: any[] = [];
        if (this._disposed) {
            return _loc2_;
        }
        _loc2_.push(HoverBitmapWidget.NORMAL_ASSET_DEFAULT.withValue(this._normalAsset));
        _loc2_.push(HoverBitmapWidget.HOVER_ASSET_DEFAULT.withValue(this._hoverAsset));
        if (this._bitmap != null) {
            for (const _loc1_ of this._bitmap.properties ?? []) {
                if (_loc1_.key != "asset_uri") {
                    _loc2_.push(_loc1_);
                }
            }
        }
        return _loc2_;
    }

    public set properties(param1: any[]) {
        if (this._disposed) {
            return;
        }
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "hover_bitmap:normal_asset":
                    this.normalAsset = String(_loc2_.value);
                    break;
                case "hover_bitmap:hover_asset":
                    this.hoverAsset = String(_loc2_.value);
            }
        }
        if (this._bitmap != null) {
            this._bitmap.properties = param1;
            this._bitmap.invalidate();
        }
    }

    public get normalAsset(): string {
        return this._normalAsset;
    }

    public set normalAsset(param1: string) {
        this._normalAsset = param1;
        if (!this._SafeStr_14769) {
            this._bitmap.assetUri = this._normalAsset;
        }
    }

    public get hoverAsset(): string {
        return this._hoverAsset;
    }

    public set hoverAsset(param1: string) {
        this._hoverAsset = param1;
        if (this._SafeStr_14769) {
            this._bitmap.assetUri = this._hoverAsset;
        }
    }

    public get bitmapWrapper(): IStaticBitmapWrapperWindow {
        return this._bitmap;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HoverBitmapWidget.#staticsReady) return;
        HoverBitmapWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HoverBitmapWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("HOVER_ASSET_DEFAULT", null);
        set("NORMAL_ASSET_DEFAULT", null);
        set("HOVER_ASSET_DEFAULT", new PropertyStruct("hover_bitmap:hover_asset", null, "String"));
        set("NORMAL_ASSET_DEFAULT", new PropertyStruct("hover_bitmap:normal_asset", null, "String"));
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
