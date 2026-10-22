import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { CatalogNavigator } from '@/com/sulake/habbo/catalog/navigation/CatalogNavigator';
import type { ICatalogNode } from '@/com/sulake/habbo/catalog/navigation/ICatalogNode';
import { isITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';

export class TopViewSelector {
    static { registerClassName(this, 'com.sulake.habbo.catalog::TopViewSelector'); }

    declare private _catalog: CatalogNavigator;

    declare private _template: ITabButtonWindow;

    declare private _tabContext: ITabContextWindow;

    constructor(param1: CatalogNavigator, param2: ITabContextWindow) {
        this._catalog = param1;
        this._tabContext = param2;
        let _loc3_: ITabButtonWindow = castGuarded(param2.getTabItemAt(0).clone(), isITabButtonWindow, "com.sulake.core.window.components.ITabButtonWindow");
        this._template = _loc3_;
        this._tabContext.removeTabItem(_loc3_);
    }

    public addTabItem(param1: ICatalogNode): void {
        let _loc2_: ITabButtonWindow = castGuarded(this._template.clone(), isITabButtonWindow, "com.sulake.core.window.components.ITabButtonWindow");
        _loc2_.caption = param1.localization;
        _loc2_.name = param1.pageName;
        _loc2_.procedure = this.topViewSelectorButtonProcedure;
        this._tabContext.addTabItem(_loc2_);
        this.alignTabs();
    }

    private alignTabs(): void {
        let _loc1_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < this._tabContext.numTabItems) {
            this._tabContext.getTabItemAt(_loc1_ >>> 0).width = this._tabContext.getTabItemAt(_loc1_ >>> 0).parent.width / this._tabContext.numTabItems | 0;
            _loc1_++;
        }
    }

    public clearTabs(): void {
        while (this._tabContext.numTabItems > 0) {
            this._tabContext.removeTabItem(this._tabContext.getTabItemAt(0));
        }
    }

    public selectTabByIndex(param1: number): void {
        this._tabContext.selector.setSelected(this._tabContext.getTabItemAt(param1 >>> 0));
        this.selectTabButton(this._tabContext.getTabItemAt(param1 >>> 0));
    }

    private topViewSelectorButtonProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: ITabButtonWindow = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = isITabButtonWindow(param2) ? param2 : null;
            if (_loc3_) {
                this.selectTabButton(_loc3_);
            }
        }
    };

    private selectTabButton(param1: ITabButtonWindow): void {
        if (!param1) {
            return;
        }
        let _loc2_: ICatalogNode = this._catalog.getNodeByName(param1.name);
        if (_loc2_ != null) {
            this._catalog.showNodeContent(_loc2_);
        }
    }
}
