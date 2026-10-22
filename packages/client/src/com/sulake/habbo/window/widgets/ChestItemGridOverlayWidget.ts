import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { LimitedItemOverlayNumberBitmapGenerator } from '@/com/sulake/habbo/window/utils/LimitedItemOverlayNumberBitmapGenerator';
import { IChestItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IChestItemGridOverlayWidget';

export class ChestItemGridOverlayWidget implements IChestItemGridOverlayWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::ChestItemGridOverlayWidget'); }

    public static readonly TYPE: string = "chest_overlay_grid";
    public static readonly COLOR_SILVER: string = "silver";
    public static readonly COLOR_GOLD: string = "gold";
    public static readonly COLOR_BROWN: string = "brown";

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = castGuarded(this._windowManager.buildFromXML(XML.from(this._windowManager.assets.getAssetByName("chest_overlay_griditem_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2293.rootWindow = this._root;
    }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    declare private _contentsCount: number;
    static { (this.prototype as any)._contentsCount = 0; }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _color: string;

    public get color(): string {
        return this._color;
    }

    public set color(param1: string) {
        this._color = param1;
        castGuarded(this._root.findChildByName("chest_plaque_bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "chest_overlay_" + param1 + "_plaque";
    }

    public get properties(): any[] {
        return [];
    }

    public set properties(param1: any[]) {
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public get contentsCount(): number {
        return this._contentsCount;
    }

    public set contentsCount(param1: number) {
        this._contentsCount = param1;
        let _loc2_: IBitmapWrapperWindow = castGuarded(this._root.findChildByName("chest_plaque_number_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc2_.bitmap = LimitedItemOverlayNumberBitmapGenerator.createBitmap(this._windowManager.assets, this._contentsCount, _loc2_.width, _loc2_.height);
    }

    public dispose(): void {
        if (!this.disposed) {
            if (this._SafeStr_2293 != null) {
                this._SafeStr_2293.rootWindow = null;
                this._SafeStr_2293 = null;
            }
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
            this._windowManager = null;
            this._disposed = true;
        }
    }

    get [IChestItemGridOverlayWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
