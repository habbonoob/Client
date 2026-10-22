import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator';
import { isITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';

export class TopViewSelector {
    static { registerClassName(this, 'com.sulake.habbo.navigator.view::TopViewSelector'); }

    declare private _navigator: HabboNewNavigator;

    declare private _template: ITabButtonWindow;

    declare private _tabContext: ITabContextWindow;

    constructor(param1: HabboNewNavigator) {
        this._navigator = param1;
    }

    public set template(param1: ITabButtonWindow) {
        this._template = param1;
    }

    public set tabContext(param1: ITabContextWindow) {
        this._tabContext = param1;
    }

    public refresh(): void {
        let _loc1_: number = 0;
        let _loc3_: string = null;
        let _loc2_: ITabButtonWindow = null;
        this.clearTabs();
        _loc1_ = 0;
        while (_loc1_ < this._navigator.contextContainer.getTopLevelSearches().length) {
            _loc3_ = stringOrNull(this._navigator.contextContainer.getTopLevelSearches()[_loc1_]);
            _loc2_ = castGuarded(this._template.clone(), isITabButtonWindow, "com.sulake.core.window.components.ITabButtonWindow");
            _loc2_.caption = "${navigator.toplevelview." + _loc3_ + "}";
            _loc2_.id = _loc1_;
            _loc2_.procedure = this.topViewSelectorButtonProcedure;
            this._tabContext.addTabItem(_loc2_);
            _loc1_++;
        }
    }

    public selectTabByIndex(param1: number): void {
        this._tabContext.selector.setSelected(this._tabContext.getTabItemAt(param1 >>> 0));
    }

    private clearTabs(): void {
        let _loc1_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < this._tabContext.numTabItems) {
            this._tabContext.removeTabItem(this._tabContext.getTabItemAt(0));
            _loc1_++;
        }
    }

    private topViewSelectorButtonProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            if (this._navigator.contextContainer.getTopLevelSearches().length > param2.id) {
                this._navigator.performSearch(stringOrNull(this._navigator.contextContainer.getTopLevelSearches()[param2.id]), "", this._navigator.view.currentFilterText());
            }
        }
    };
}
