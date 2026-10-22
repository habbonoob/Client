import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { ITabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/ITabPageDecorator';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CanCreateRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/CanCreateRoomMessageComposer';

export class MyRoomsTabPageDecorator implements ITabPageDecorator {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview.tabpagedecorators::MyRoomsTabPageDecorator'); }

    private readonly SUB_ITEMS: any[] = [[5, "navigator.navisel.myrooms"], [4, "navigator.navisel.wherearemyfriends"], [3, "navigator.navisel.myfriendsrooms"], [18, "navigator.navisel.roomswithrights"], [19, "navigator.navisel.mygroups"], [6, "navigator.navisel.myfavourites"], [7, "navigator.navisel.visitedrooms"], [23, ""]];

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: HabboNavigator;

    declare private _filter: IDropMenuWindow;

    public get filterCategory(): string {
        return stringOrNull(this._filter && !this._filter.disposed ? this._filter.enumerateSelection()[this._filter.selection] : null);
    }

    public refreshCustomContent(param1: IWindowContainer): void {
        let _loc2_: string = "me_header";
        let _loc3_: IWindowContainer = asGuarded(param1.getChildByName(_loc2_), isIWindowContainer);
        if (this._filter == null || Boolean(this._filter.disposed)) {
            this._filter = castGuarded(_loc3_.findChildByName("meSubNavi"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
            this.prepareSubNavi();
            this._filter.addEventListener("WE_SELECTED", this.onFilterSelected);
        }
        _loc3_.visible = true;
    }

    public tabSelected(): void {
        if (this._filter != null && !this._filter.disposed) {
            this._filter.removeEventListener("WE_SELECTED", this.onFilterSelected);
            this._filter.selection = 0;
            this._filter.addEventListener("WE_SELECTED", this.onFilterSelected);
        }
    }

    public refreshFooter(param1: IWindowContainer): void {
        let _loc2_: IWindowContainer = asGuarded(param1.getChildByName("me_footer"), isIWindowContainer);
        let _loc3_: IWindow = _loc2_.findChildByName("create_room_but");
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", this.onCreateRoomClick);
        }
        this._navigator.refreshButton(_loc2_, "create_room", true, null, 0);
        _loc2_.visible = true;
    }

    public navigatorOpenedWhileInTab(): void {
        this.startSearch();
    }

    public setSubSelection(param1: number): void {
        let _loc3_: number = 0;
        let _loc2_: any[] = null;
        if (!this._filter || Boolean(this._filter.disposed)) {
            return;
        }
        let _loc4_: number = this._filter.numMenuItems;
        _loc3_ = 0;
        while (_loc3_ < _loc4_) {
            _loc2_ = this.SUB_ITEMS[_loc3_];
            if (_loc2_[0] == param1) {
                this._filter.selection = _loc3_;
                return;
            }
            _loc3_++;
        }
        this._filter.selection = 0;
    }

    public processSearchParam(param1: string): string {
        return param1;
    }

    private onCreateRoomClick = (param1: WindowEvent): void => {
        this._navigator.send(new CanCreateRoomMessageComposer());
    };

    private prepareSubNavi(): void {
        if (this._filter == null || Boolean(this._filter.disposed)) {
            return;
        }
        let _loc2_: any[] = [];
        for (const _loc1_ of this.SUB_ITEMS ?? []) {
            _loc2_.push(this._navigator.getText(stringOrNull(_loc1_[1])));
        }
        this._filter.populate(_loc2_);
        this._filter.selection = 0;
    }

    private onFilterSelected = (param1: WindowEvent): void => {
        this.startSearch();
        let _loc2_: IWindow = param1.target;
        if (isIDropMenuWindow(_loc2_)) {
            this._navigator.trackNavigationDataPoint(stringOrNull(castGuarded(_loc2_, isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow").enumerateSelection()[castGuarded(_loc2_, isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow").selection]), "category.view");
        }
    };

    private startSearch(): void {
        let _loc1_: number = this._filter == null || Boolean(this._filter.disposed) ? 0 : this._filter.selection;
        this._navigator.mainViewCtrl.startSearch(3, this.getSearchTypeForIndex(_loc1_));
    }

    private getSearchTypeForIndex(param1: number): number {
        if (param1 <= this.SUB_ITEMS.length) {
            return this.SUB_ITEMS[param1][0] | 0;
        }
        return this.SUB_ITEMS[0][0] | 0;
    }
}
