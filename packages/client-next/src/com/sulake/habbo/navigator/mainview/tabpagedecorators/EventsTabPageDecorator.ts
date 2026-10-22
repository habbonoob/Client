import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { ITabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/ITabPageDecorator';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Logger } from '@/com/sulake/habbo/Logger';

export class EventsTabPageDecorator implements ITabPageDecorator {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview.tabpagedecorators::EventsTabPageDecorator'); }

    declare private _navigator: HabboNavigator;

    declare private _filter: IDropMenuWindow;

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
    }

    public refreshCustomContent(param1: IWindowContainer): void {
        let _loc2_: IWindowContainer = asGuarded(param1.getChildByName("room_ad_header"), isIWindowContainer);
        if (this._filter == null || Boolean(this._filter.disposed)) {
            this._filter = asGuarded(_loc2_.getChildByName("roomAdFilter"), isIDropMenuWindow);
            this.prepareFilter();
            this._filter.addEventListener("WE_SELECTED", this.onFilterSelected);
        }
        _loc2_.visible = true;
    }

    public tabSelected(): void {
        if (this._filter != null && !this._filter.disposed) {
            this._filter.removeEventListener("WE_SELECTED", this.onFilterSelected);
            this._filter.selection = 0;
            this._filter.addEventListener("WE_SELECTED", this.onFilterSelected);
        }
    }

    public refreshFooter(param1: IWindowContainer): void {
        let _loc2_: IWindowContainer = asGuarded(param1.getChildByName("room_ads_footer"), isIWindowContainer);
        let _loc3_: IWindow = _loc2_.findChildByName("get_event_but");
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", this.onGetEventClick);
        }
        _loc2_.visible = true;
    }

    public navigatorOpenedWhileInTab(): void {
        this.startSearch();
    }

    private prepareFilter(): void {
        if (this._filter == null || Boolean(this._filter.disposed)) {
            return;
        }
        let _loc1_: any[] = [];
        _loc1_.push(this._navigator.getText("navigator.roomad.topads"));
        _loc1_.push(this._navigator.getText("navigator.roomad.newads"));
        this._filter.populate(_loc1_);
        this._filter.selection = 0;
    }

    private onFilterSelected = (param1: WindowEvent): void => {
        this.startSearch();
    };

    private onGetEventClick = (param1: WindowEvent): void => {
        this._navigator.openCatalogRoomAdsPage();
    };

    private startSearch(): void {
        let _loc1_: number = 16;
        if (this._filter != null && !this._filter.disposed) {
            _loc1_ = this.getSearchType(this._filter.selection);
        }
        this._navigator.mainViewCtrl.startSearch(1, _loc1_);
    }

    private getSearchType(param1: number): number {
        switch (param1) {
            case 0:
                return 16;
            case 1:
                return 17;
            default:
                Logger.log("Invalid index when searching Room ad search type: " + param1);
                return 0;
        }
    }

    public get filterCategory(): string {
        if (this._filter == null || Boolean(this._filter.disposed)) {
            return null;
        }
        return stringOrNull(this._filter.enumerateSelection()[this._filter.selection]);
    }

    public setSubSelection(param1: number): void {
    }

    public processSearchParam(param1: string): string {
        return param1;
    }
}
