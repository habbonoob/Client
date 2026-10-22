import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FlatCategory } from '@/com/sulake/habbo/communication/messages/incoming/navigator/FlatCategory';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { ITabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/ITabPageDecorator';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class RoomsTabPageDecorator implements ITabPageDecorator {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview.tabpagedecorators::RoomsTabPageDecorator'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        RoomsTabPageDecorator.#initStatics();
        return RoomsTabPageDecorator._log;
    }

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: HabboNavigator;

    declare private _filter: IDropMenuWindow;

    private _SafeStr_4752: boolean = false;

    public get filterCategory(): string {
        return stringOrNull(this._filter && !this._filter.disposed ? this._filter.enumerateSelection()[this._filter.selection] : null);
    }

    private get defaultSelection(): number {
        return this._SafeStr_4752 ? 2 : 0;
    }

    public refreshCustomContent(param1: IWindowContainer): void {
        let _loc2_: string = "rooms_header";
        let _loc3_: IWindowContainer = asGuarded(param1.getChildByName(_loc2_), isIWindowContainer);
        if (this._filter == null || Boolean(this._filter.disposed)) {
            this._filter = castGuarded(_loc3_.findChildByName("roomCtgFilter"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
            this.prepareRoomCategories();
            this._filter.addEventListener("WE_SELECTED", this.onFilterSelected);
        }
        _loc3_.visible = true;
    }

    public prepareRoomCategories(): void {
        if (this._filter == null || Boolean(this._filter.disposed)) {
            return;
        }
        let _loc1_: any[] = [this._navigator.getText("navigator.navisel.popularrooms"), this._navigator.getText("navigator.navisel.highestscore")];
        this._SafeStr_4752 = this._navigator.context.configuration.getBoolean("navigator.2014.personalized.navigator");
        if (this._SafeStr_4752) {
            _loc1_.push(this._navigator.getText("navigator.navisel.recommendedrooms"));
        }
        for (const _loc2_ of this._navigator.data.visibleCategories ?? []) {
            _loc1_.push(_loc2_.nodeName);
        }
        this._filter.populate(_loc1_);
        this._filter.selection = this.defaultSelection;
    }

    public tabSelected(): void {
        if (this._filter != null && !this._filter.disposed) {
            this._filter.removeEventListener("WE_SELECTED", this.onFilterSelected);
            this._filter.selection = this.defaultSelection;
            this._filter.addEventListener("WE_SELECTED", this.onFilterSelected);
        }
    }

    public refreshFooter(param1: IWindowContainer): void {
        this._navigator.officialRoomEntryManager.refreshAdFooter(param1);
    }

    public navigatorOpenedWhileInTab(): void {
        this.startSearch();
    }

    public setSubSelection(param1: number): void {
    }

    public processSearchParam(param1: string): string {
        return param1;
    }

    private onFilterSelected = (param1: WindowEvent): void => {
        this.startSearch();
    };

    private startSearch(): void {
        let _loc3_: number = 0;
        let _loc4_: FlatCategory = null;
        let _loc1_: number = 0;
        let _loc2_: number = this._filter && !this._filter.disposed ? this._filter.selection : this.defaultSelection;
        RoomsTabPageDecorator._log.info("Room filter changed: " + _loc2_);
        if (_loc2_ == 0) {
            this._navigator.mainViewCtrl.startSearch(2, 1);
        } else if (_loc2_ == 1) {
            this._navigator.mainViewCtrl.startSearch(2, 2);
        } else if (_loc2_ == 2 && this._SafeStr_4752) {
            this._navigator.mainViewCtrl.startSearch(2, 22);
        } else {
            _loc3_ = 2;
            if (this._SafeStr_4752) {
                _loc3_++;
            }
            _loc4_ = this._navigator.data.visibleCategories[_loc2_ - _loc3_];
            if (_loc4_ == null) {
                RoomsTabPageDecorator._log.warn("No fc found: " + _loc2_ + ", " + this._navigator.data.visibleCategories.length);
                return;
            }
            _loc1_ = _loc4_.nodeId;
            RoomsTabPageDecorator._log.info("Searching with catId: " + _loc1_);
            this._navigator.mainViewCtrl.startSearch(2, 1, "" + _loc1_);
        }
        if (this._filter && !this._filter.disposed) {
            this._navigator.trackNavigationDataPoint(stringOrNull(this._filter.enumerateSelection()[this._filter.selection]), "category.view");
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RoomsTabPageDecorator.#staticsReady) return;
        RoomsTabPageDecorator.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RoomsTabPageDecorator, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.navigator.mainview.tabpagedecorators.RoomsTabPageDecorator"));
    }
}
