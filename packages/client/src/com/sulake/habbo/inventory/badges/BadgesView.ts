import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { BadgesModel } from '@/com/sulake/habbo/inventory/badges/BadgesModel';
import type { IInventoryView } from '@/com/sulake/habbo/inventory/IInventoryView';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { Badge } from '@/com/sulake/habbo/inventory/badges/Badge';
import { BadgeGridView } from '@/com/sulake/habbo/inventory/badges/BadgeGridView';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class BadgesView implements IInventoryView {
    static { registerClassName(this, 'com.sulake.habbo.inventory.badges::BadgesView'); }

    private static readonly GRID_UPDATE_DELAY_MS: number = 100;
    private static readonly GRID_ITEMS_PER_UPDATE: number = 25;

    constructor(param1: BadgesModel, param2: IHabboWindowManager, param3: IAssetLibrary) {
        this._SafeStr_2134 = param1;
        this._windowManager = param2;
    }

    declare private _windowManager: IHabboWindowManager;

    declare private _view: IWindowContainer;

    declare private _SafeStr_2134: BadgesModel;

    declare private _SafeStr_4764: IItemGridWindow;

    private _isInitialized: boolean = false;

    declare private _grid: BadgeGridView;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get isVisible(): boolean {
        return !!(this._view && this._view.parent != null && this._view.visible);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._windowManager = null;
        this._SafeStr_2134 = null;
        if (this._grid != null) {
            this._grid.dispose();
            this._grid = null;
        }
        this._SafeStr_4764 = null;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
    }

    public getWindowContainer(): IWindowContainer {
        if (!this._isInitialized) {
            this.init();
        }
        if (this._view == null || Boolean(this._view.disposed)) {
            return null;
        }
        return this._view;
    }

    public updateAll(param1: string): void {
        this.updateListViews(param1);
        this.updateActionView();
    }

    public updateActionView(): void {
        let _loc2_: any = undefined;
        if (!this._isInitialized) {
            return;
        }
        if (this._view == null || Boolean(this._view.disposed)) {
            return;
        }
        let _loc3_: IButtonWindow = asGuarded(this._view.findChildByName("wearBadge_button"), isIButtonWindow);
        if (_loc3_ == null) {
            return;
        }
        let _loc1_: Badge = this._SafeStr_2134.getSelectedBadge();
        if (_loc1_ == null) {
            _loc3_.disable();
            this.setBadgeName(null);
            this._view.findChildByName("badge_image").visible = false;
        } else {
            if (_loc1_.isInUse) {
                _loc3_.caption = "${inventory.badges.clearbadge}";
            } else {
                _loc3_.caption = "${inventory.badges.wearbadge}";
            }
            this.setBadgeName(_loc1_.badgeName);
            castGuarded(castGuarded(this._view.findChildByName("badge_image"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget").badgeId = _loc1_.badgeId;
            this._view.findChildByName("badge_image").visible = true;
            _loc2_ = this._SafeStr_2134.getBadges(1);
            if (_loc2_ != null && _loc2_.length >= this._SafeStr_2134.getMaxActiveCount() && !_loc1_.isInUse) {
                _loc3_.disable();
            } else {
                _loc3_.enable();
            }
        }
    }

    private init(): void {
        this._view = this._SafeStr_2134.controller.view.getView("badges");
        this._view.procedure = this.windowEventProc;
        this._view.visible = false;
        let _loc3_: IWindow = this._view.findChildByName("wearBadge_button");
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", this.onWearBadgeClick);
        }
        let _loc1_: IItemGridWindow = asGuarded(this._view.findChildByName("inactive_items"), isIItemGridWindow);
        let _loc2_: IItemListWindow = asGuarded(this._view.findChildByName("item_grid_pages"), isIItemListWindow);
        _loc2_.enableScrollByDragging = true;
        this._grid = new BadgeGridView(this, _loc1_, _loc2_);
        this._SafeStr_4764 = asGuarded(this._view.findChildByName("active_items"), isIItemGridWindow);
        this._view.findChildByName("filter").caption = "";
        this._view.findChildByName("clear_filter_button").visible = false;
        this._isInitialized = true;
    }

    private updateListViews(param1: string): void {
        let _loc2_: Badge = null;
        let _loc3_: number = 0;
        if (!this._isInitialized) {
            return;
        }
        if (this._view == null || Boolean(this._view.disposed)) {
            return;
        }
        this._SafeStr_4764.removeGridItems();
        this._grid.setFilter(0, param1, param1);
        this._grid.setItems(this._SafeStr_2134.getBadges(0));
        let _loc4_: Badge[] = this._SafeStr_2134.getBadges(1);
        _loc3_ = 0;
        while (_loc3_ < _loc4_.length) {
            _loc2_ = asInstanceOf(_loc4_[_loc3_], Badge);
            this._SafeStr_4764.addGridItem(_loc2_.window);
            _loc3_++;
        }
    }

    private setBadgeName(param1: string): void {
        if (this._view == null || Boolean(this._view.disposed)) {
            return;
        }
        let _loc2_: ITextWindow = asGuarded(this._view.findChildByName("badgeName"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        if (param1 == null) {
            _loc2_.text = "";
        } else {
            _loc2_.text = "";
            _loc2_.text = param1;
        }
    }

    private windowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: any;
        let _loc3_: WindowKeyboardEvent = null;
        if (param1.type == "WME_CLICK") {
            _loc4_ = param2.name;
            if ("clear_filter_button" === _loc4_) {
                this._view.findChildByName("filter").caption = "";
                param2.visible = false;
                this.updateAll(null);
            }
        } else if (param1.type == "WKE_KEY_UP") {
            _loc3_ = param1 instanceof WindowKeyboardEvent ? param1 : null;
            _loc4_ = param2.name;
            if ("filter" === _loc4_) {
                this._view.findChildByName("clear_filter_button").visible = param2.caption.length > 0;
                if (_loc3_.keyCode == 13) {
                    this.updateAll(param2.caption);
                }
            }
        }
    };

    private onWearBadgeClick = (param1: WindowEvent): void => {
        let _loc2_: Badge = this._SafeStr_2134.getSelectedBadge();
        if (_loc2_ != null) {
            this._SafeStr_2134.toggleBadgeWearing(_loc2_.badgeId);
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
