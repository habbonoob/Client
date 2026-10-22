import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';

export class CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::CatalogWidget'); }

    constructor(param1: IWindowContainer) {
        this._window = param1;
        this._isEmbedded = param1.tags.indexOf("EMBEDDED") > -1;
    }

    declare protected _events: IEventDispatcher;

    protected _isEmbedded: boolean = false;

    declare private _page: ICatalogPage;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare protected _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    public get events(): IEventDispatcher {
        return this._events;
    }

    public set events(param1: IEventDispatcher) {
        this._events = param1;
    }

    public get page(): ICatalogPage {
        return this._page;
    }

    public set page(param1: ICatalogPage) {
        this._page = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        this._events = null;
        this._page = null;
        this._window = null;
        this._disposed = true;
    }

    public init(): boolean {
        return true;
    }

    public closed(): void {
    }

    protected getAssetXML(param1: string): XML {
        if (!this.page || !this.page.viewer || !this.page.viewer.catalog || !this.page.viewer.catalog.assets) {
            return null;
        }
        let _loc2_: XmlAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName(param1), XmlAsset);
        if (_loc2_ == null) {
            return null;
        }
        return asInstanceOf(_loc2_.content, XML);
    }

    protected attachWidgetView(param1: string): void {
        if (this._isEmbedded) {
            return;
        }
        let _loc2_: XML = this.getAssetXML(param1);
        if (_loc2_ == null) {
            return;
        }
        this.window.removeChildAt(0);
        if (!this.window || !this.page || !this.page.viewer || !this.page.viewer.catalog) {
            return;
        }
        this.window.addChild(this.page.viewer.catalog.windowManager.buildFromXML(_loc2_));
    }

    protected getAssetBitmapData(param1: string): BitmapData {
        let _loc2_: BitmapDataAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName(param1), BitmapDataAsset);
        if (_loc2_ == null) {
            return null;
        }
        return asInstanceOf(_loc2_.content, BitmapData);
    }
}
