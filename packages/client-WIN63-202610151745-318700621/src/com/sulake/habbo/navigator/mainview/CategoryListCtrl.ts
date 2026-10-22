import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FlatCategory } from '@/com/sulake/habbo/communication/messages/incoming/navigator/FlatCategory';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { IViewCtrl } from '@/com/sulake/habbo/navigator/IViewCtrl';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { UserCountRenderer } from '@/com/sulake/habbo/navigator/UserCountRenderer';
import { Util } from '@/com/sulake/habbo/navigator/Util';

export class CategoryListCtrl implements IViewCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview::CategoryListCtrl'); }

    private static readonly CATEGORY_SPACING: number = 5;

    declare private _SafeStr_3810: UserCountRenderer;

    declare private _navigator: HabboNavigator;

    declare private _content: IWindowContainer;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _SafeStr_2928: IScrollbarWindow;

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
        this._SafeStr_3810 = new UserCountRenderer(this._navigator);
    }

    public dispose(): void {
        if (this._SafeStr_3810) {
            this._SafeStr_3810.dispose();
            this._SafeStr_3810 = null;
        }
    }

    public refresh(): void {
        let _loc4_: number = 0;
        let _loc1_: FlatCategory = null;
        let _loc10_: IWindowContainer = null;
        let _loc2_: number = 0;
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        let _loc6_: any[] = this._navigator.data.allCategories;
        let _loc7_: UtilsMap = this._navigator.data.categoriesWithVisitorData.categoryToCurrentUserCountMap;
        let _loc8_: UtilsMap = this._navigator.data.categoriesWithVisitorData.categoryToMaxUserCountMap;
        let _loc9_: IWindowContainer = castGuarded(this._SafeStr_2221.getListItemAt(0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc4_ = 0;
        while (_loc4_ < _loc6_.length) {
            _loc1_ = _loc6_[_loc4_];
            if (_loc1_.visible) {
                _loc10_ = this.getCategoryContainer(_loc9_, _loc4_);
                if (_loc10_ == null) {
                    _loc10_ = this.createEntry(_loc4_);
                    _loc10_.id = _loc4_;
                    _loc9_.addChild(_loc10_);
                }
                _loc2_ = _loc7_.getValue(_loc1_.nodeId) | 0;
                _loc5_ = _loc8_.getValue(_loc1_.nodeId) | 0;
                this.refreshEntry(_loc10_, _loc1_, _loc2_, _loc5_);
                _loc10_.y = _loc3_;
                _loc3_ += _loc10_.height + 5;
                _loc10_.visible = true;
                _loc9_.height = Util.getLowestPoint(_loc9_) > 0 ? Util.getLowestPoint(_loc9_) + 5 : 0;
            }
            _loc4_++;
        }
        if (this._SafeStr_2928 != null) {
            this._SafeStr_2928.scrollV = 0;
            this._SafeStr_2928.visible = true;
        }
    }

    public refreshEntry(param1: IWindowContainer, param2: FlatCategory, param3: number, param4: number): void {
        param1.findChildByName("category_name_txt").caption = param2.visibleName;
        param1.findChildByName("arrow_right_icon").visible = true;
        this._SafeStr_3810.refreshUserCount(param4, castGuarded(param1.findChildByName("enter_category_button"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"), param3, "${navigator.usercounttooltip.users}", 297, 35);
    }

    public createEntry(param1: number): IWindowContainer {
        let _loc2_: IWindowContainer = castGuarded(this._navigator.getXmlWindow("grs_category_selector"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this.setProcedureAndId(_loc2_, param1, "enter_category_button", this.onSelectCategory);
        this._navigator.refreshButton(_loc2_, "navi_room_icon", true, null, 0);
        return _loc2_;
    }

    private onSelectCategory = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: FlatCategory = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = this._navigator.data.allCategories[param2.id];
            this._navigator.mainViewCtrl.startSearch(2, 1, "" + _loc3_.nodeId);
        }
    };

    private getCategoryContainer(param1: IWindowContainer, param2: number): IWindowContainer {
        return castGuarded(param1.getChildByID(param2), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private setProcedureAndId(param1: IWindowContainer, param2: number, param3: string, param4: (...args: any[]) => any): void {
        param1.findChildByName(param3).procedure = param4;
        param1.findChildByName(param3).id = param2;
    }

    public set content(param1: IWindowContainer) {
        this._content = param1;
        this._SafeStr_2221 = this._content ? castGuarded(this._content.findChildByName("item_list_category"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow") : null;
        this._SafeStr_2928 = this._content ? castGuarded(this._content.findChildByName("scroller"), isIScrollbarWindow, "com.sulake.core.window.components.IScrollbarWindow") : null;
    }

    public get content(): IWindowContainer {
        return this._content;
    }
}
