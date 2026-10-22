import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { ICatalogNavigator } from '@/com/sulake/habbo/catalog/navigation/ICatalogNavigator';
import type { ICatalogNode } from '@/com/sulake/habbo/catalog/navigation/ICatalogNode';
import type { NodeData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/NodeData';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import { CatalogEvent } from '@/com/sulake/habbo/catalog/event/CatalogEvent';
import { CatalogNode } from '@/com/sulake/habbo/catalog/navigation/CatalogNode';
import { CatalogNodeRenderable } from '@/com/sulake/habbo/catalog/navigation/CatalogNodeRenderable';
import { CatalogPageOpenedEvent } from '@/com/sulake/habbo/catalog/navigation/events/CatalogPageOpenedEvent';
import { TopViewSelector } from '@/com/sulake/habbo/catalog/TopViewSelector';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class CatalogNavigator implements ICatalogNavigator {
    static { registerClassName(this, 'com.sulake.habbo.catalog.navigation::CatalogNavigator'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        CatalogNavigator.#initStatics();
        return CatalogNavigator._log;
    }

    public static readonly DUMMY_PAGE_ID_FOR_OFFER_SEARCH: number = -12345678;

    private static searchNodesWith(param1: string, param2: any[], param3: ICatalogNode, param4: ICatalogNode[]): void {
        let _loc6_: boolean = false;
        let _loc5_: string = null;
        try {
            if (param3.visible && param3.pageId > 0) {
                _loc6_ = false;
                _loc5_ = [param3.pageName, param3.localization].join(" ").toLowerCase();
                _loc5_ = _loc5_.replace(/ /gi, "");
                if (_loc5_.indexOf(param1) > -1) {
                    param4.push(param3);
                    _loc6_ = true;
                }
                if (!_loc6_) {
                    for (const _loc7_ of param2 ?? []) {
                        if (_loc5_.indexOf(stringOrNull(_loc7_)) >= 0) {
                            param4.push(param3);
                            break;
                        }
                    }
                }
            }
            for (const _loc8_ of param3.children ?? []) {
                CatalogNavigator.searchNodesWith(param1, param2, _loc8_, param4);
            }
        } catch (e) {
            CatalogNavigator._log.error(["Error when loading nodes by name " + param1 + ":", e].join(","));
        }
    }

    constructor(param1: HabboCatalog, param2: IWindowContainer, param3: string) {
        this._catalog = param1;
        this._container = param2;
        this._catalogType = param3;
        this._currentNodes = new Array<ICatalogNode>(0).fill(null);
        this._SafeStr_2221 = asGuarded(this._container.findChildByName("navigationList"), isIItemListWindow);
        this._SafeStr_5934 = this._SafeStr_2221.removeListItem(this._SafeStr_2221.getListItemByName(param3.toLowerCase() + "_topitem_template"));
        this._SafeStr_5715 = this._SafeStr_2221.removeListItem(this._SafeStr_2221.getListItemByName(param3.toLowerCase() + "_subitem_template"));
        this._listTemplate = this._SafeStr_2221.removeListItem(this._SafeStr_2221.getListItemByName(param3.toLowerCase() + "_list_template"));
        this._tabs = castGuarded(this._container.findChildByName("tab_context"), isITabContextWindow, "com.sulake.core.window.components.ITabContextWindow");
        if (this._tabs != null) {
            if (this._catalog.useNonTabbedCatalog()) {
                this._tabs.visible = false;
            } else {
                this._SafeStr_3478 = new TopViewSelector(this, this._tabs);
            }
        }
    }

    declare private _container: IWindowContainer;

    declare private _catalogType: string;

    declare private _tabs: ITabContextWindow;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _index: ICatalogNode;

    declare private _currentNodes: ICatalogNode[];

    declare private _offersToNodes: Map<any, any>;

    declare private _SafeStr_5934: IWindow;

    declare private _SafeStr_5715: IWindow;

    declare private _listTemplate: IWindow;

    declare private _SafeStr_3478: TopViewSelector;

    declare private _catalog: HabboCatalog;

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public get initialized(): boolean {
        return this._index != null;
    }

    public get listTemplate(): IWindow {
        return this._listTemplate;
    }

    public get isDeepHierarchy(): boolean {
        return (this._catalog instanceof Component ? this._catalog : null).getBoolean("catalog.deep.hierarchy");
    }

    public dispose(): void {
        if (this._index != null) {
            this._index.dispose();
        }
        this._index = null;
        this._offersToNodes = null;
        this._currentNodes = null;
        this._catalog = null;
        this._container = null;
        this._SafeStr_2221 = null;
    }

    public buildCatalogIndex(param1: NodeData): void {
        this._index = null;
        this._offersToNodes = new Dictionary();
        this._index = this.buildIndexNode(param1, 0, null);
    }

    public showIndex(): void {
        if (this._index == null) {
            return;
        }
        this._SafeStr_2221.removeListItems();
        if (this._SafeStr_3478 != null) {
            this._SafeStr_3478.clearTabs();
        }
        for (const _loc1_ of this._index.children ?? []) {
            if (_loc1_.visible) {
                if (this._catalog.useNonTabbedCatalog()) {
                    (_loc1_ instanceof CatalogNodeRenderable ? _loc1_ : null).addToList(this._SafeStr_2221);
                } else {
                    this._SafeStr_3478.addTabItem(_loc1_);
                }
            }
        }
        if (this._SafeStr_3478 != null) {
            this._SafeStr_3478.selectTabByIndex(0);
        }
    }

    public showNodeContent(param1: ICatalogNode): void {
        let _loc3_: any[] = null;
        let _loc5_: number = 0;
        let _loc4_: ICatalogNode = null;
        let _loc2_: any = false;
        if (this._index == null) {
            return;
        }
        this._SafeStr_2221.removeListItems();
        if (param1 == null || !param1.visible) {
            return;
        }
        if (param1.children.length) {
            for (const _loc6_ of param1.children ?? []) {
                if (_loc6_.visible) {
                    (_loc6_ instanceof CatalogNodeRenderable ? _loc6_ : null).addToList(this._SafeStr_2221);
                }
            }
            _loc3_ = this.getPathToNodeWithLayout(param1);
            if (_loc3_.length > 0) {
                _loc5_ = 0;
                while (_loc5_ < _loc3_.length) {
                    _loc4_ = _loc3_[_loc5_];
                    _loc2_ = _loc5_ == _loc3_.length - 1;
                    if (_loc2_ || this._currentNodes.indexOf(_loc4_) == -1) {
                        this.activateNode(_loc4_);
                    }
                    _loc5_++;
                }
            } else {
                this.openCatalogPage(param1);
            }
        } else {
            this.openCatalogPage(param1);
        }
    }

    public activateNode(param1: ICatalogNode): void {
        let _loc3_: number = NaN;
        let _loc5_: number = NaN;
        let _loc7_: number = 0;
        let _loc8_: any = this._currentNodes.indexOf(param1) >= 0;
        let _loc2_: boolean = param1.isOpen;
        let _loc6_: ICatalogNode[] = new Array<ICatalogNode>(0).fill(null);
        for (const _loc4_ of this._currentNodes ?? []) {
            _loc4_.deactivate();
            if (_loc4_.depth < param1.depth) {
                _loc6_.push(_loc4_);
            } else {
                _loc4_.close();
            }
        }
        this._currentNodes = _loc6_;
        param1.activate();
        if (_loc8_ && _loc2_) {
            param1.close();
        } else {
            param1.open();
        }
        if (this._currentNodes.indexOf(param1) < 0) {
            this._currentNodes.push(param1);
        }
        if (param1.isBranch) {
            if (param1.parent && param1.parent instanceof CatalogNodeRenderable) {
                (asInstanceOf(param1.parent, CatalogNodeRenderable)).updateChildListHeight();
            }
            _loc3_ = 0;
            _loc5_ = 0;
            _loc7_ = 0;
            while (_loc7_ < this._SafeStr_2221.numListItems) {
                if (this._SafeStr_2221.getListItemAt(_loc7_ >>> 0).visible) {
                    _loc5_ += this._SafeStr_2221.getListItemAt(_loc7_ >>> 0).height;
                }
                _loc7_++;
            }
            for (param1 of this._currentNodes ?? []) {
                _loc3_ += param1.offsetV;
            }
            if (_loc3_ - this._SafeStr_2221.height > 0) {
                this._SafeStr_2221.scrollV = _loc3_ / _loc5_;
            }
        }
        if (param1.pageId > -1) {
            this.openCatalogPage(param1);
        }
    }

    public openPage(param1: string): void {
        let _loc2_: ICatalogNode = this.getNodeByName(param1);
        if (_loc2_ != null && _loc2_.visible) {
            this._catalog.loadCatalogPage(_loc2_.pageId, -1, this._catalogType);
            this.openNavigatorAtNode(_loc2_);
        } else {
            if (_loc2_ != null && !_loc2_.visible) {
                this._catalog.events.dispatchEvent(new CatalogEvent("CATALOG_INVISIBLE_PAGE_VISITED"));
            }
            this.loadFrontPage();
        }
    }

    public openPageById(param1: number, param2: number): void {
        let _loc3_: ICatalogNode = null;
        let _loc4_: any = undefined;
        if (!this.initialized) {
            this._catalog.openCatalogPageById(param1, param2, this._catalogType);
        } else {
            if (param1 == -12345678) {
                _loc4_ = this.getNodesByOfferId(param2, true);
                if (_loc4_ != null) {
                    _loc3_ = _loc4_[0];
                }
            } else {
                _loc3_ = this.getNodeById(param1);
            }
            if (_loc3_ != null) {
                this._catalog.loadCatalogPage(_loc3_.pageId, param2, this._catalogType);
                this.openNavigatorAtNode(_loc3_);
            }
        }
    }

    public openPageByOfferId(param1: number): void {
        let _loc3_: any = undefined;
        let _loc2_: ICatalogNode = null;
        if (!this.initialized) {
            this._catalog.openCatalogPageById(-12345678, param1, this._catalogType);
        } else {
            _loc3_ = this.getNodesByOfferId(param1);
            if (_loc3_ != null) {
                _loc2_ = _loc3_[0];
                this._catalog.loadCatalogPage(_loc2_.pageId, param1, this._catalogType);
                this.openNavigatorAtNode(_loc2_);
            }
        }
    }

    public deactivateCurrentNode(): void {
        for (const _loc1_ of this._currentNodes ?? []) {
            _loc1_.deactivate();
            _loc1_.close();
        }
        this._currentNodes = new Array<ICatalogNode>(0).fill(null);
    }

    public filter(param1: string, param2: any[]): void {
        let _loc4_: ICatalogNode[] = new Array<ICatalogNode>(0).fill(null);
        CatalogNavigator.searchNodesWith(param1, param2, this._index, _loc4_);
        this._SafeStr_2221.removeListItems();
        for (const _loc3_ of _loc4_ ?? []) {
            CatalogNavigator._log.info("Found node: " + [_loc3_.pageId, _loc3_.pageName, _loc3_.localization]);
            if (_loc3_.visible) {
                (_loc3_ instanceof CatalogNodeRenderable ? _loc3_ : null).addToList(this._SafeStr_2221);
            }
        }
    }

    public loadFrontPage(): void {
        if (this._index == null) {
            return;
        }
        let _loc1_: ICatalogNode = this.getFirstNavigable(this._index);
        if (_loc1_ == null) {
            return;
        }
        CatalogNavigator._log.info("Load front page: " + _loc1_.localization + "(" + _loc1_.pageId + ")");
        this._catalog.loadCatalogPage(_loc1_.pageId, -1, this._catalogType);
    }

    public getNodesByOfferId(param1: number, param2: boolean = false): ICatalogNode[] {
        let _loc4_: any = undefined;
        if (this._offersToNodes != null) {
            if (param2) {
                _loc4_ = new Array<ICatalogNode>(0).fill(null);
                for (const _loc3_ of valuesOf(this._offersToNodes.get(param1))) {
                    if (_loc3_.visible) {
                        _loc4_.push(_loc3_);
                    }
                }
                if (_loc4_.length > 0) {
                    return _loc4_;
                }
                return null;
            }
            return this._offersToNodes.get(param1);
        }
        return null;
    }

    public getNodeByName(param1: string): ICatalogNode {
        return this._index != null ? this.getFirstNodeByName(param1, this._index) : null;
    }

    public getOptionalNodeByName(param1: string): ICatalogNode {
        return this._index ? this.getFirstNodeByName(param1, this._index) : null;
    }

    public getNodeById(param1: number, param2: ICatalogNode = null): ICatalogNode {
        if (param2 == null) {
            param2 = this._index;
        }
        if (param2 == null) {
            return null;
        }
        let _loc3_: any = null;
        if (param2.pageId == param1 && param2 != this._index) {
            _loc3_ = param2;
        } else {
            for (const _loc4_ of param2.children ?? []) {
                _loc3_ = this.getNodeById(param1, _loc4_);
                if (_loc3_ != null) {
                    break;
                }
            }
        }
        return _loc3_;
    }

    public getItemTemplate(param1: number): IWindow {
        if (this.isDeepHierarchy) {
            return param1 > 2 ? this._SafeStr_5715 : this._SafeStr_5934;
        }
        return param1 == 1 ? this._SafeStr_5934 : this._SafeStr_5715;
    }

    private getPathToNodeWithLayout(param1: ICatalogNode): any[] {
        let _loc2_: any[] = null;
        for (const _loc3_ of param1.children ?? []) {
            if (_loc3_.visible) {
                if (_loc3_.pageId > -1) {
                    return [_loc3_];
                }
                if (_loc3_.isBranch) {
                    _loc2_ = this.getPathToNodeWithLayout(_loc3_);
                    if (_loc2_.length > 0) {
                        _loc2_.unshift(_loc3_);
                        return _loc2_;
                    }
                }
            }
        }
        return [];
    }

    private openCategoryForNode(param1: ICatalogNode): ICatalogNode {
        let _loc3_: number = 0;
        let _loc2_: ICatalogNode = param1.parent;
        while (_loc2_ != null && _loc2_.parent != null && _loc2_.parent.pageName != "root") {
            _loc2_ = _loc2_.parent;
        }
        if (this._SafeStr_3478 && _loc2_.parent) {
            _loc3_ = _loc2_.parent.children.indexOf(_loc2_);
            this._SafeStr_3478.selectTabByIndex(_loc3_);
        }
        this.showNodeContent(_loc2_);
        return _loc2_;
    }

    private openCatalogPage(param1: ICatalogNode): void {
        this._catalog.loadCatalogPage(param1.pageId, -1, this._catalogType);
        this._catalog.events.dispatchEvent(new CatalogPageOpenedEvent(param1.pageId, param1.localization));
    }

    private openNavigatorAtNode(param1: ICatalogNode): void {
        if (param1 == null) {
            return;
        }
        this.deactivateCurrentNode();
        let _loc2_: ICatalogNode = param1.parent;
        while (_loc2_ != null && _loc2_.parent != null) {
            _loc2_.open();
            if (this._catalog.useNonTabbedCatalog()) {
                this._currentNodes.push(_loc2_);
            }
            _loc2_ = _loc2_.parent;
        }
        if (!this._catalog.useNonTabbedCatalog()) {
            this.openCategoryForNode(param1);
        }
        this.activateNode(param1);
    }

    private getFirstNavigable(param1: ICatalogNode): ICatalogNode {
        let _loc2_: ICatalogNode = null;
        if (param1.visible && param1 != this._index) {
            return param1;
        }
        for (const _loc3_ of param1.children ?? []) {
            _loc2_ = this.getFirstNavigable(_loc3_);
            if (_loc2_ != null) {
                return _loc2_;
            }
        }
        return null;
    }

    private buildIndexNode(param1: NodeData, param2: number, param3: ICatalogNode): ICatalogNode {
        let _loc4_: ICatalogNode = null;
        let _loc5_: boolean = param1.visible;
        if (!_loc5_) {
            _loc4_ = new CatalogNode(this, param1, param2, param3);
        } else {
            _loc4_ = new CatalogNodeRenderable(this, param1, param2, param3);
        }
        for (const _loc6_ of _loc4_.offerIds ?? []) {
            if (this._offersToNodes.has(_loc6_)) {
                this._offersToNodes.get(_loc6_).push(_loc4_);
            } else {
                this._offersToNodes.set(_loc6_, [_loc4_]);
            }
        }
        param2++;
        for (const _loc7_ of param1.children ?? []) {
            _loc4_.addChild(this.buildIndexNode(_loc7_, param2, _loc4_));
        }
        return _loc4_;
    }

    private getFirstNodeByName(param1: string, param2: ICatalogNode): ICatalogNode {
        let _loc3_: any = null;
        try {
            if (param2.pageName == param1 && param2 != this._index) {
                _loc3_ = param2;
            } else {
                for (const _loc4_ of param2.children ?? []) {
                    _loc3_ = this.getFirstNodeByName(param1, _loc4_);
                    if (_loc3_ != null) {
                        break;
                    }
                }
            }
        } catch (e) {
            CatalogNavigator._log.error(["Error when loading node by name " + param1 + ":", e].join(","));
        }
        return _loc3_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (CatalogNavigator.#staticsReady) return;
        CatalogNavigator.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(CatalogNavigator, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.navigation.CatalogNavigator"));
    }
}
