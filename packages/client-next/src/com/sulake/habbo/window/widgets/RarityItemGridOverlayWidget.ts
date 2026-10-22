import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { LimitedItemOverlayNumberBitmapGenerator } from '@/com/sulake/habbo/window/utils/LimitedItemOverlayNumberBitmapGenerator';
import { IRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';

export class RarityItemGridOverlayWidget implements IRarityItemGridOverlayWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::RarityItemGridOverlayWidget'); }

    public static readonly TYPE: string = "rarity_item_overlay_grid";

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _root: IWindowContainer;

    declare private _rarityLevel: number;
    static { (this.prototype as any)._rarityLevel = 0; }

    declare private _SafeStr_8392: IStaticBitmapWrapperWindow;

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = castGuarded(this._windowManager.buildFromXML(XML.from(this._windowManager.assets.getAssetByName("rarity_item_overlay_griditem_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2293.rootWindow = this._root;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set rarityLevel(param1: number) {
        this._rarityLevel = param1;
        let _loc2_: IBitmapWrapperWindow = castGuarded(this._root.findChildByName("rarity_item_overlay_plaque_number_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc2_.bitmap = LimitedItemOverlayNumberBitmapGenerator.createBitmap(this._windowManager.assets, this.rarityLevel, _loc2_.width, _loc2_.height);
    }

    public get rarityLevel(): number {
        return this._rarityLevel;
    }

    public get properties(): any[] {
        return [];
    }

    public set properties(param1: any[]) {
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

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    get [IRarityItemGridOverlayWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
