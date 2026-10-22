import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { SavedSearch } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SavedSearch';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { SearchContext } from '@/com/sulake/habbo/navigator/context/SearchContext';
import { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator.group';

export class QuickLinksView {
    static { registerClassName(this, 'com.sulake.habbo.navigator.view::QuickLinksView'); }

    constructor(param1: HabboNewNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: HabboNewNavigator;

    declare private _template: IRegionWindow;

    private _linkSearches: any[] = [];
    private _SafeStr_4553: any[] = [];

    declare private _itemList: IItemListWindow;

    public set itemList(param1: IItemListWindow) {
        this._itemList = param1;
    }

    public set template(param1: IRegionWindow) {
        this._template = param1;
    }

    public setQuickLinks(param1: SavedSearch[]): void {
        let _loc2_: number = 0;
        let _loc4_: IRegionWindow = null;
        let _loc3_: ITextWindow = null;
        this._itemList.removeListItems();
        this._linkSearches = [];
        this._SafeStr_4553 = [];
        _loc2_ = 0;
        while (_loc2_ < param1.length) {
            _loc4_ = castGuarded(this._template.clone(), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
            _loc4_.id = _loc2_;
            _loc3_ = castGuarded(_loc4_.findChildByName("quick_link_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc3_.caption = this._navigator.localization.getLocalization("navigator.searchcode.title." + param1[_loc2_].searchCode, param1[_loc2_].searchCode) + (param1[_loc2_].filter != "" ? " - " + param1[_loc2_].filter : "");
            if (param1[_loc2_].searchCode.indexOf("category__") == 0) {
                _loc3_.caption = param1[_loc2_].searchCode.substr("category__".length) + (param1[_loc2_].filter != "" ? " - " + param1[_loc2_].filter : "");
            }
            _loc4_.procedure = this.listItemProcedure;
            this._linkSearches.push(new SearchContext(param1[_loc2_].searchCode, param1[_loc2_].filter));
            this._SafeStr_4553.push(param1[_loc2_].id);
            this._itemList.addListItem(_loc4_);
            _loc2_++;
        }
    }

    private listItemProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            if (isIRegionWindow(param2)) {
                if (this._linkSearches.length > param2.id) {
                    this._navigator.performSearchByContext(this._linkSearches[param2.id]);
                    this._navigator.trackEventLog("savedsearch.execute", "SavedSearch", HabboNewNavigator.getEventLogExtraStringFromSearch(stringOrNull(this._linkSearches[param2.id].searchCode), stringOrNull(this._linkSearches[param2.id].filtering)));
                }
            } else if (isIContainerButtonWindow(param2)) {
                this._navigator.deleteSavedSearch(this._SafeStr_4553[param2.parent.id] | 0);
            }
        } else if (param1.type == "WME_OVER") {
            if (isIRegionWindow(param2)) {
                castGuarded(castGuarded(param2, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").getChildAt(1), isIContainerButtonWindow, "com.sulake.core.window.components.IContainerButtonWindow").visible = true;
            } else if (isIContainerButtonWindow(param2)) {
                param2.visible = true;
            }
        } else if (param1.type == "WME_OUT" && isIRegionWindow(param2)) {
            castGuarded(castGuarded(param2, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").getChildAt(1), isIContainerButtonWindow, "com.sulake.core.window.components.IContainerButtonWindow").visible = false;
        }
    };
}
