import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { ICatalogViewer } from '@/com/sulake/habbo/catalog/viewer/ICatalogViewer';
import type { IPageLocalization } from '@/com/sulake/habbo/catalog/viewer/IPageLocalization';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { CatalogPage } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { FurnitureOffer } from '@/com/sulake/habbo/catalog/viewer/FurnitureOffer';
import { PageLocalization } from '@/com/sulake/habbo/catalog/viewer/PageLocalization';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class CatalogViewer implements ICatalogViewer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::CatalogViewer'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        CatalogViewer.#initStatics();
        return CatalogViewer._log;
    }

    constructor(param1: HabboCatalog, param2: IWindowContainer) {
        this._catalog = param1;
        this._container = param2;
    }

    declare private _container: IWindowContainer;

    declare private _page: ICatalogPage;

    declare private _forceRefresh: boolean;
    static { (this.prototype as any)._forceRefresh = false; }

    declare private _previousPageId: number;
    static { (this.prototype as any)._previousPageId = 0; }

    declare private _catalog: HabboCatalog;

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public get roomEngine(): IRoomEngine {
        return this._catalog.roomEngine;
    }

    public get currentPage(): ICatalogPage {
        return this._page;
    }

    public get viewerTags(): any[] {
        return this._container ? this._container.tags : [];
    }

    public get previousPageId(): number {
        return this._previousPageId;
    }

    public dispose(): void {
        if (this._page) {
            this._page.dispose();
            this._page = null;
        }
        this._catalog = null;
        this._container = null;
    }

    public showCatalogPage(param1: number, param2: string, param3: IPageLocalization, param4: IPurchasableOffer[], param5: number, param6: boolean): void {
        CatalogViewer._log.info("[Catalog Viewer] Show Catalog Page: " + [param1, param2, param4.length, param5]);
        if (this._page != null) {
            if (!this._forceRefresh && this._page.pageId == param1) {
                if (param5 > -1) {
                    this._page.selectOffer(param5);
                }
                return;
            }
            this.disposeCurrentPage();
        }
        let _loc7_: ICatalogPage;
        this._page = _loc7_ = new CatalogPage(this, param1, param2, param3, param4, this._catalog, param6);
        this._previousPageId = param1 > -12345678 ? param1 : this._previousPageId;
        if (_loc7_.window != null) {
            this._container.addChild(_loc7_.window);
            _loc7_.window.height = this._container.height;
            this._container.width = _loc7_.window.width;
            this._container.x = this._container.parent.width - this._container.width - 8;
            if (this._container.x < 130) {
                this._catalog.setLeftPaneVisibility(false);
            } else {
                this._catalog.setLeftPaneVisibility(true);
            }
        } else {
            CatalogViewer._log.warn("No window for page: " + param2);
        }
        this._container.visible = true;
        this._forceRefresh = false;
        _loc7_.selectOffer(param5);
    }

    public disposeCurrentPage(): void {
        if (this._page != null) {
            this._container.removeChild(this._page.window);
            this._page.dispose();
            this._container.invalidate();
        }
    }

    public catalogWindowClosed(): void {
        if (this._page != null) {
            this._page.closed();
        }
    }

    public getCurrentLayoutCode(): string {
        if (this._page == null) {
            return "";
        }
        return this._page.layoutCode;
    }

    public showSearchResults(param1: IFurnitureData[]): void {
        let _loc3_: IPurchasableOffer = null;
        if (this._page != null) {
            this._container.removeChild(this._page.window);
            this._page.dispose();
        }
        let _loc2_: IPurchasableOffer[] = new Array<IPurchasableOffer>(0).fill(null);
        for (const _loc5_ of param1 ?? []) {
            _loc3_ = new FurnitureOffer(_loc5_, this._catalog);
            _loc2_.push(_loc3_);
        }
        let _loc4_: ICatalogPage;
        this._page = _loc4_ = new CatalogPage(this, -1, "default_3x3", new PageLocalization(["catalog_header_roombuilder", "credits_v3_teaser"], ["${catalog.search.results}"]), _loc2_, this._catalog, false, 1);
        if (_loc4_.window != null) {
            this._container.addChild(_loc4_.window);
            _loc4_.window.width = this._container.width;
            _loc4_.window.height = this._container.height;
        } else {
            CatalogViewer._log.warn("No window for page: <SEARCH>");
        }
        this._container.visible = true;
    }

    public setForceRefresh(): void {
        this._forceRefresh = true;
    }

    public dispatchWidgetEvent(param1: Event): boolean {
        return this._page.dispatchWidgetEvent(param1);
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (CatalogViewer.#staticsReady) return;
        CatalogViewer.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(CatalogViewer, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.viewer.CatalogViewer"));
    }
}
