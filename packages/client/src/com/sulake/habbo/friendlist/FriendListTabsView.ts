import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FriendListTab } from '@/com/sulake/habbo/friendlist/domain/FriendListTab';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class FriendListTabsView {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::FriendListTabsView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        FriendListTabsView.#initStatics();
        return FriendListTabsView._log;
    }

    constructor(param1: HabboFriendList) {
        this._friendList = param1;
    }

    declare private _friendList: HabboFriendList;

    declare private _content: IWindowContainer;

    public prepare(param1: IWindowContainer): void {
        this._content = param1;
        this.refresh("prepare");
    }

    public refresh(param1: string): void {
        let _loc3_: IWindowContainer = null;
        let _loc4_: number = 0;
        FriendListTabsView._log.info("TABS: REFRESH: " + param1);
        this._content.width = this._friendList.tabs.tabContentWidth;
        this._content.findChildByName("bg").width = this._friendList.tabs.tabContentWidth;
        let _loc2_: number = 1;
        for (const _loc5_ of this._friendList.tabs.getTabs() ?? []) {
            _loc3_ = asGuarded(this._content.getChildByName("flt_" + _loc5_.id), isIWindowContainer);
            if (!this.isTabVisible(_loc5_.id | 0)) {
                _loc3_.visible = false;
            } else {
                _loc3_.visible = true;
                _loc3_.width = this._friendList.tabs.tabContentWidth;
                _loc3_.y = _loc2_;
                _loc4_ = this.refreshHeader(_loc5_, _loc3_);
                this.refreshTabContent(_loc5_, _loc3_);
                _loc3_.height = _loc4_ + (_loc5_.selected ? this._friendList.tabs.tabContentHeight : 0);
                _loc2_ += _loc3_.height;
            }
        }
        this._content.height = _loc2_ + 1;
        this._content.findChildByName("bg").height = this._content.height;
        FriendListTabsView._log.info("TABS: REFRESH END");
    }

    private isTabVisible(param1: number): boolean {
        if (param1 != 2) {
            return true;
        }
        return this._friendList.friendRequests.requests.length > 0;
    }

    private refreshTabContent(param1: FriendListTab, param2: IWindowContainer): void {
        if (param1.selected) {
            if (param1.view == null) {
                param1.view = asGuarded(this.getTabContent(param1), isIWindowContainer);
            }
            this.refreshTabContentDims(param1.view);
            this.refreshScrollBarVisibility(param1.view);
            param2.addChild(param1.view);
        } else if (param1.view != null) {
            param2.removeChild(param1.view);
        }
    }

    private refreshHeader(param1: FriendListTab, param2: IWindowContainer): number {
        let _loc3_: IWindowContainer = asGuarded(param2.getChildByName("header"), isIWindowContainer);
        _loc3_.width = this._friendList.tabs.tabContentWidth;
        this.showBgImage(_loc3_, param1.newMessageArrived, "hdr_hilite");
        this.showBgImage(_loc3_, !param1.newMessageArrived, param1.headerPicName);
        let _loc4_: boolean = param1.id == 1 && !param1.newMessageArrived;
        FriendListTabsView._log.info("TAB " + param1.id + ", " + param1.name + ", " + _loc4_);
        this.refreshArrowIcon(_loc3_, "arrow_down_black", param1.selected && _loc4_, 12);
        this.refreshArrowIcon(_loc3_, "arrow_right_black", !param1.selected && _loc4_, 15);
        this.refreshArrowIcon(_loc3_, "arrow_down_white", param1.selected && !_loc4_, 12);
        this.refreshArrowIcon(_loc3_, "arrow_right_white", !param1.selected && !_loc4_, 15);
        this.refreshTabText(param1, _loc3_);
        return _loc3_.height;
    }

    private showBgImage(param1: IWindowContainer, param2: boolean, param3: string): void {
        FriendListTabsView._log.info("REFRESHING BG IMAGE: " + param2 + ", " + param3);
        let _loc4_: IBitmapWrapperWindow = asGuarded(param1.getChildByName(param3), isIBitmapWrapperWindow);
        if (!param2) {
            if (_loc4_ != null) {
                _loc4_.visible = false;
            }
        } else {
            if (_loc4_.bitmap == null) {
                _loc4_.bitmap = this._friendList.getButtonImage(param3);
                _loc4_.height = _loc4_.bitmap.height;
                param1.height = _loc4_.bitmap.height;
                _loc4_.procedure = this.onTabClick;
            }
            _loc4_.width = this._friendList.tabs.tabContentWidth;
            _loc4_.visible = true;
        }
    }

    private refreshArrowIcon(param1: IWindowContainer, param2: string, param3: boolean, param4: number): void {
        let _loc5_: ITextWindow = null;
        let _loc6_: IWindow = null;
        this._friendList.refreshButton(param1, param2, param3, null, 0);
        if (param3) {
            _loc5_ = castGuarded(param1.findChildByName("caption_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc6_ = param1.findChildByName(param2);
            _loc6_.x = _loc5_.textWidth + param4 | 0;
        }
    }

    private refreshTabText(param1: FriendListTab, param2: IWindowContainer): void {
        let _loc3_: ITextWindow = asGuarded(param2.findChildByName("caption_text"), isITextWindow);
        _loc3_.text = param1.name + " (" + param1.tabView.getEntryCount() + ")";
        _loc3_.textColor = this._friendList.laf.getTabTextColor(param1.newMessageArrived, param1.id);
    }

    private onTabClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.tab." + param2.id + "}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        FriendListTabsView._log.info("TAB CLICKED!");
        let _loc3_: FriendListTab = this._friendList.tabs.findTab(param2.id);
        for (const _loc4_ of this._friendList.tabs.getTabs() ?? []) {
            _loc4_.tabView.tabClicked(_loc3_.id);
        }
        this._friendList.tabs.toggleSelected(_loc3_);
        this._friendList.view.refresh("tabClick");
        if (_loc3_.selected) {
            switch (_loc3_.id - 1) {
                case 0:
                    this._friendList.trackFriendListEvent("HABBO_FRIENDLIST_TRACKING_EVENT_FRIENDS");
                    break;
                case 1:
                    this._friendList.trackFriendListEvent("HABBO_FRIENDLIST_TRACKING_EVENT_REQUEST");
                    break;
                case 2:
                    this._friendList.trackFriendListEvent("HABBO_FRIENDLIST_TRACKING_EVENT_SEARCH");
            }
        } else {
            this._friendList.trackFriendListEvent("HABBO_FRIENDLIST_TRACKING_EVENT_MINIMZED");
        }
    };

    private getTabContent(param1: FriendListTab): IWindow {
        let _loc2_: IWindowContainer = castGuarded(this._friendList.getXmlWindow("tab_content"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc2_.background = true;
        _loc2_.color = this._friendList.laf.getTabBgColor(param1.id);
        _loc2_.addChild(this.getTabContentFooter(param1));
        let _loc3_: IItemListWindow = castGuarded(_loc2_.findChildByName("list_content"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        _loc3_.color = this._friendList.laf.getTabBgColor(param1.id);
        param1.tabView.fillList(_loc3_);
        return _loc2_;
    }

    private refreshTabContentDims(param1: IWindowContainer): void {
        let _loc3_: IWindowContainer = asGuarded(param1.getChildByName("footer"), isIWindowContainer);
        let _loc6_: IWindowContainer = asGuarded(param1.getChildByName("list"), isIWindowContainer);
        let _loc8_: IWindow = asGuarded(_loc6_.getChildByName("scroller"), isIWindow);
        let _loc9_: IItemListWindow = castGuarded(_loc6_.getChildByName("list_content"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        let _loc7_: IWindow = _loc6_.parent;
        let _loc4_: number = this._friendList.tabs.tabContentWidth;
        let _loc5_: number = this._friendList.tabs.tabContentHeight;
        _loc7_.height = Math.max(0, _loc5_) | 0;
        _loc7_.width = _loc4_;
        let _loc2_: number = Math.max(_loc5_ - _loc6_.y - _loc3_.height, 0) | 0;
        _loc6_.height = _loc2_;
        _loc8_.height = _loc2_;
        _loc9_.height = _loc2_;
        _loc6_.width = _loc4_;
        _loc9_.width = _loc4_;
        _loc8_.x = _loc4_ - 27;
        _loc3_.y = _loc5_ - _loc3_.height;
        _loc3_.width = _loc4_;
    }

    private refreshScrollBarVisibility(param1: IWindowContainer): void {
        let _loc6_: IWindowContainer = asGuarded(param1.getChildByName("list"), isIWindowContainer);
        let _loc7_: IWindow = asGuarded(_loc6_.getChildByName("scroller"), isIWindow);
        let _loc9_: IItemListWindow = castGuarded(_loc6_.getChildByName("list_content"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        let _loc3_: any = _loc9_.scrollableRegion.height > _loc9_.height;
        let _loc2_: number = 22;
        let _loc5_: number = this._friendList.tabs.tabContentWidth - 10;
        let _loc8_: number = _loc5_ - _loc2_;
        let _loc4_: number = _loc3_ ? _loc8_ : _loc5_;
        _loc7_.visible = _loc3_;
        _loc9_.width = _loc4_;
        this.change(_loc9_, _loc4_);
    }

    private change(param1: IItemListWindow, param2: number): void {
        let _loc3_: number = 0;
        let _loc4_: IWindow = null;
        _loc3_ = 0;
        while (_loc3_ < param1.numListItems) {
            _loc4_ = param1.getListItemAt(_loc3_ >>> 0);
            _loc4_.width = param2;
            _loc3_++;
        }
    }

    private getTabContentFooter(param1: FriendListTab): IWindow {
        let _loc2_: IWindowContainer = castGuarded(this._friendList.getXmlWindow(param1.footerName), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        param1.tabView.fillFooter(_loc2_);
        return _loc2_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FriendListTabsView.#staticsReady) return;
        FriendListTabsView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FriendListTabsView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.friendlist.FriendListTabsView"));
    }
}
