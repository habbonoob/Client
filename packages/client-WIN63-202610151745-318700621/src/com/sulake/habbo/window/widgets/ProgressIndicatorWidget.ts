import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { ProgressIndicatorMode } from '@/com/sulake/habbo/window/enum/ProgressIndicatorMode';
import { ProgressIndicatorStyle } from '@/com/sulake/habbo/window/enum/ProgressIndicatorStyle';
import { IProgressIndicatorWidget } from '@/com/sulake/habbo/window/widgets/IProgressIndicatorWidget';

export class ProgressIndicatorWidget implements IProgressIndicatorWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::ProgressIndicatorWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "progress_indicator";
    private static readonly STYLE_KEY: string = "progress_indicator:style";
    private static readonly SIZE_KEY: string = "progress_indicator:size";
    private static readonly _SafeStr_8618: string = "progress_indicator:position";
    private static readonly MODE_KEY: string = "progress_indicator:mode";
    private static readonly MAXIMUM_SIZE: number = 1000;

    private static get STYLE_DEFAULT(): PropertyStruct {
        ProgressIndicatorWidget.#initStatics();
        return ProgressIndicatorWidget.STYLE_DEFAULT;
    }

    private static get SIZE_DEFAULT(): PropertyStruct {
        ProgressIndicatorWidget.#initStatics();
        return ProgressIndicatorWidget.SIZE_DEFAULT;
    }

    private static get POSITION_DEFAULT(): PropertyStruct {
        ProgressIndicatorWidget.#initStatics();
        return ProgressIndicatorWidget.POSITION_DEFAULT;
    }

    private static get MODE_DEFAULT(): PropertyStruct {
        ProgressIndicatorWidget.#initStatics();
        return ProgressIndicatorWidget.MODE_DEFAULT;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IItemListWindow;

    private _position: number = ProgressIndicatorWidget.POSITION_DEFAULT.value >>> 0;
    private _style: string = String(ProgressIndicatorWidget.STYLE_DEFAULT.value);
    private _mode: string = String(ProgressIndicatorWidget.MODE_DEFAULT.value);

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("progress_indicator_xml").content, XML)), isIItemListWindow);
        this._SafeStr_2293.setParamFlag(147456);
        this._SafeStr_2293.rootWindow = this._root;
    }

    public dispose(): void {
        if (!this._disposed) {
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
        _loc1_.push(ProgressIndicatorWidget.STYLE_DEFAULT.withValue(this._style));
        _loc1_.push(ProgressIndicatorWidget.SIZE_DEFAULT.withValue(this.size));
        _loc1_.push(ProgressIndicatorWidget.POSITION_DEFAULT.withValue(this._position));
        _loc1_.push(ProgressIndicatorWidget.MODE_DEFAULT.withValue(this._mode));
        return _loc1_;
    }

    public set properties(param1: any[]) {
        if (this._disposed) {
            return;
        }
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "progress_indicator:style":
                    this.style = String(_loc2_.value);
                    break;
                case "progress_indicator:size":
                    this.size = _loc2_.value >>> 0;
                    break;
                case "progress_indicator:position":
                    this.position = _loc2_.value >>> 0;
                    break;
                case "progress_indicator:mode":
                    this.mode = String(_loc2_.value);
            }
        }
    }

    public get style(): string {
        return this._style;
    }

    public set style(param1: string) {
        this._style = param1;
        this.refresh();
    }

    public get size(): number {
        return this._root.numListItems >>> 0;
    }

    public set size(param1: number) {
        param1 = Math.min(Math.max(param1, 1), 1000) >>> 0;
        if (param1 != this.size) {
            while (param1 < this.size) {
                this._root.removeListItemAt(this.size - 1);
            }
            while (param1 > this.size) {
                this._root.addListItem(this._root.getListItemAt(0).clone());
            }
            this.refresh();
        }
    }

    public get position(): number {
        return this._position;
    }

    public set position(param1: number) {
        this._position = param1;
        this.refresh();
    }

    public get mode(): string {
        return this._mode;
    }

    public set mode(param1: string) {
        this._mode = param1;
        this.refresh();
    }

    private refresh(): void {
        let _loc3_: number = 0;
        let _loc4_: IStaticBitmapWrapperWindow = null;
        let _loc2_: boolean = false;
        let _loc1_: BitmapData = null;
        _loc3_ = 0;
        while (_loc3_ < this.size) {
            _loc4_ = asGuarded(this._root.getListItemAt(_loc3_ >>> 0), isIStaticBitmapWrapperWindow);
            switch (this._mode) {
                case "position":
                    _loc2_ = _loc3_ + 1 == this.position;
                    break;
                case "progress":
                    _loc2_ = _loc3_ < this.position;
            }
            _loc4_.assetUri = "progress_disk_" + this._style + (_loc2_ ? "_on" : "_off");
            _loc1_ = _loc4_.bitmapData;
            _loc4_.width = _loc1_.width;
            _loc4_.height = _loc1_.height;
            this._root.height = _loc1_.height;
            _loc3_++;
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ProgressIndicatorWidget.#staticsReady) return;
        ProgressIndicatorWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ProgressIndicatorWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("STYLE_DEFAULT", null);
        set("SIZE_DEFAULT", null);
        set("POSITION_DEFAULT", null);
        set("MODE_DEFAULT", null);
        set("STYLE_DEFAULT", new PropertyStruct("progress_indicator:style", "flat", "String", false, ProgressIndicatorStyle.ALL));
        set("SIZE_DEFAULT", new PropertyStruct("progress_indicator:size", 1, "uint"));
        set("POSITION_DEFAULT", new PropertyStruct("progress_indicator:position", 0, "uint"));
        set("MODE_DEFAULT", new PropertyStruct("progress_indicator:mode", "position", "String", false, ProgressIndicatorMode.ALL));
    }

    get [IProgressIndicatorWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
