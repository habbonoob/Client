import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { ICatalogViewer } from '@/com/sulake/habbo/catalog/viewer/ICatalogViewer';
import type { IPageLocalization } from '@/com/sulake/habbo/catalog/viewer/IPageLocalization';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CatalogPage } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { PageLocalization } from '@/com/sulake/habbo/catalog/viewer/PageLocalization';
import { Logger } from '@/com/sulake/habbo/Logger';

export class CatalogViewer implements ICatalogViewer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::CatalogViewer'); }

    declare private _catalog: HabboCatalog;

    declare private _container: IWindowContainer;

    declare private _catalogType: string;

    declare private _page: ICatalogPage;

    declare private _forceRefresh: boolean;
    static { (this.prototype as any)._forceRefresh = false; }

    declare private _previousPageId: number;
    static { (this.prototype as any)._previousPageId = 0; }

    constructor(param1: HabboCatalog, param2: IWindowContainer, param3: string) {
        this._catalog = param1;
        this._container = param2;
        this._catalogType = param3;
    }

    public get roomEngine(): IRoomEngine {
        return this._catalog.roomEngine;
    }

    public dispose(): void {
        if (this._page) {
            this._page.dispose();
            this._page = null;
        }
        this._catalog = null;
        this._container = null;
        this._catalogType = null;
    }

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public get catalogType(): string {
        return this._catalogType;
    }

    public get mainContainer(): IWindowContainer {
        return this._container == null ? null : asGuarded(this._container.parent, isIWindowContainer);
    }

    public showCatalogPage(param1: number, param2: string, param3: IPageLocalization, param4: IPurchasableOffer[], param5: number, param6: boolean): void {
        Logger.log("[Catalog Viewer] Show Catalog Page: " + [param1, param2, param4.length, param5]);
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
            this.setLeftPaneVisibility(this._container.x >= 130);
        } else {
            Logger.log("[CatalogViewer] No window for page: " + param2);
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

    public dispatchWidgetEvent(param1: Event): boolean {
        return this._page.dispatchWidgetEvent(param1);
    }

    public getCurrentLayoutCode(): string {
        if (this._page == null) {
            return "";
        }
        return this._page.layoutCode;
    }

    public get currentPage(): ICatalogPage {
        return this._page;
    }

    public showSearchResults(param1: IPurchasableOffer[]): void {
        if (this._page != null) {
            this._container.removeChild(this._page.window);
            this._page.dispose();
        }
        let _loc2_: ICatalogPage = new CatalogPage(this, -1, "default_3x3", new PageLocalization(["catalog_header_roombuilder", "credits_v3_teaser"], ["${catalog.search.results}"]), param1, this._catalog, false, 1);
        this._page = _loc2_;
        if (_loc2_.window != null) {
            this._container.addChild(_loc2_.window);
            _loc2_.window.width = this._container.width;
            _loc2_.window.height = this._container.height;
        } else {
            Logger.log("[CatalogViewer] No window for page: <SEARCH>");
        }
        this._container.visible = true;
    }

    public get viewerTags(): any[] {
        return this._container ? this._container.tags : [];
    }

    public setForceRefresh(): void {
        this._forceRefresh = true;
    }

    public get previousPageId(): number {
        return this._previousPageId;
    }

    private setLeftPaneVisibility(param1: boolean): void {
        let _loc2_: IWindowContainer = this.mainContainer;
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IWindowContainer = asGuarded(_loc2_.findChildByName("navigationContainer"), isIWindowContainer);
        if (_loc3_ != null) {
            _loc3_.visible = param1;
        }
        _loc3_ = asGuarded(_loc2_.findChildByName("searchContainer"), isIWindowContainer);
        if (_loc3_ != null) {
            _loc3_.visible = param1;
        }
    }
}
