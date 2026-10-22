import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { ISeparatorWidget } from '@/com/sulake/habbo/window/widgets/ISeparatorWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';

export class SeparatorWidget implements ISeparatorWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::SeparatorWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "separator";
    private static readonly VERTICAL_KEY: string = "separator:vertical";
    private static readonly BORDER_IMAGE_HORIZONTAL: string = "illumina_light_separator_horizontal";
    private static readonly BORDER_IMAGE_VERTICAL: string = "illumina_light_separator_vertical";

    private static get VERTICAL_DEFAULT(): PropertyStruct {
        SeparatorWidget.#initStatics();
        return SeparatorWidget.VERTICAL_DEFAULT;
    }

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("separator_xml").content, XML)), isIWindowContainer);
        this._canvas = asGuarded(this._root.getChildByName("canvas"), isIBitmapWrapperWindow);
        this._children = asGuarded(this._root.getChildByName("children"), isIWindowContainer);
        this._canvas.addEventListener("WE_RESIZE", this.onChange);
        this._canvas.addEventListener("WE_RESIZED", this.onChange);
        this._children.addEventListener("WE_CHILD_ADDED", this.onChange);
        this._children.addEventListener("WE_CHILD_REMOVED", this.onChange);
        this._children.addEventListener("WE_CHILD_RELOCATED", this.onChange);
        this._children.addEventListener("WE_CHILD_RESIZED", this.onChange);
        this._SafeStr_2293.rootWindow = this._root;
        this._root.width = this._SafeStr_2293.width;
        this._root.height = this._SafeStr_2293.height;
    }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    declare private _canvas: IBitmapWrapperWindow;

    declare private _SafeStr_2414: BitmapData;

    declare private _children: IWindowContainer;

    private _vertical: boolean = Boolean(SeparatorWidget.VERTICAL_DEFAULT.value);

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get iterator(): IIterator {
        return this._children.iterator;
    }

    public get properties(): any[] {
        let _loc1_: any[] = [];
        if (this._disposed) {
            return _loc1_;
        }
        _loc1_.push(SeparatorWidget.VERTICAL_DEFAULT.withValue(this._vertical));
        return _loc1_;
    }

    public set properties(param1: any[]) {
        if (this._disposed) {
            return;
        }
        for (const _loc2_ of param1 ?? []) {
            let _loc3_: any = _loc2_.key;
            if ("separator:vertical" === _loc3_) {
                this.vertical = Boolean(_loc2_.value);
            }
        }
    }

    public get vertical(): boolean {
        return this._vertical;
    }

    public set vertical(param1: boolean) {
        this._vertical = param1;
        this.refresh();
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_2414 != null) {
                this._SafeStr_2414.dispose();
                this._SafeStr_2414 = null;
            }
            if (this._canvas != null) {
                this._canvas.removeEventListener("WE_RESIZE", this.onChange);
                this._canvas.removeEventListener("WE_RESIZED", this.onChange);
                this._canvas = null;
            }
            if (this._children != null) {
                this._children.removeEventListener("WE_CHILD_ADDED", this.onChange);
                this._children.removeEventListener("WE_CHILD_REMOVED", this.onChange);
                this._children.removeEventListener("WE_CHILD_RELOCATED", this.onChange);
                this._children.removeEventListener("WE_CHILD_RESIZED", this.onChange);
                this._children = null;
            }
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

    private onChange = (param1: WindowEvent): void => {
        this.refresh();
    };

    private refresh(): void {
        let _loc1_: BitmapData = null;
        let _loc4_: Point = null;
        if (this._disposed) {
            return;
        }
        if (this._SafeStr_2414 == null || this._SafeStr_2414.width != this._canvas.width || this._SafeStr_2414.height != this._canvas.height) {
            if (this._SafeStr_2414 != null) {
                this._SafeStr_2414.dispose();
            }
            this._SafeStr_2414 = new BitmapData(Math.max(1, this._canvas.width) | 0, Math.max(1, this._canvas.height) | 0, true, 0);
            this._canvas.bitmap = this._SafeStr_2414;
        }
        this._SafeStr_2414.lock();
        this._SafeStr_2414.fillRect(new Rectangle(0, 0, this._canvas.width, this._canvas.height), 0);
        let _loc3_: BitmapDataAsset = asInstanceOf(this._windowManager.assets.getAssetByName(this._vertical ? "illumina_light_separator_vertical" : "illumina_light_separator_horizontal"), BitmapDataAsset);
        if (_loc3_ != null) {
            _loc1_ = asInstanceOf(_loc3_.content, BitmapData);
            if (this._vertical) {
                _loc4_ = new Point(this._canvas.width / 2 - 1, 0);
                while (_loc4_.y < this._canvas.height) {
                    this._SafeStr_2414.copyPixels(_loc1_, _loc3_.rectangle, _loc4_);
                    _loc4_.y += _loc3_.rectangle.height;
                }
            } else {
                _loc4_ = new Point(0, this._canvas.height / 2 - 1);
                while (_loc4_.x < this._canvas.width) {
                    this._SafeStr_2414.copyPixels(_loc1_, _loc3_.rectangle, _loc4_);
                    _loc4_.x += _loc3_.rectangle.width;
                }
            }
        }
        for (const _loc2_ of valuesOf(this._children.iterator)) {
            if (_loc2_.visible) {
                this._SafeStr_2414.fillRect(_loc2_.rectangle, 0);
            }
        }
        this._SafeStr_2414.unlock();
        this._canvas.invalidate();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (SeparatorWidget.#staticsReady) return;
        SeparatorWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(SeparatorWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("VERTICAL_DEFAULT", null);
        set("VERTICAL_DEFAULT", new PropertyStruct("separator:vertical", false, "Boolean"));
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
