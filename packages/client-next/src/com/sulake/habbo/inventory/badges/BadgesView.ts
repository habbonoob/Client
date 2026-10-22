import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
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
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { _SafeCls_6038 } from '@/com/sulake/habbo/communication/enum/_SafeCls_6038';
import { _SafeCls_6046 } from '@/com/sulake/habbo/groups/_SafeCls_6046';
import { Badge } from '@/com/sulake/habbo/inventory/badges/Badge';
import { BadgeGridView } from '@/com/sulake/habbo/inventory/badges/BadgeGridView';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class BadgesView implements IInventoryView {
    static { registerClassName(this, 'com.sulake.habbo.inventory.badges::BadgesView'); }

    private static readonly GRID_UPDATE_DELAY_MS: number = 100;
    private static readonly GRID_ITEMS_PER_UPDATE: number = 25;
    private static readonly FILTER_ALL: number = 0;
    private static readonly FILTER_NORMAL_BADGES: number = 1;
    private static readonly FILTER_ACHIEVEMENTS: number = 2;
    private static readonly _SafeStr_14282: number = -1;
    private static readonly _SafeStr_14283: number = -2;

    declare private _windowManager: IHabboWindowManager;

    declare private _view: IWindowContainer;

    declare private _SafeStr_2134: BadgesModel;

    declare private _SafeStr_4764: IItemGridWindow;

    private _disposed: boolean = false;
    private _isInitialized: boolean = false;

    declare private _grid: BadgeGridView;

    private _SafeStr_14287: number = 0;
    private _ignoreBadgeFilterEvents: boolean = false;
    private _SafeStr_14288: number = -1;
    private _SafeStr_14289: any[] = [-1];
    private _ignoreBadgeRarityFilterEvents: boolean = false;

    constructor(param1: BadgesModel, param2: IHabboWindowManager, param3: IAssetLibrary) {
        this._SafeStr_2134 = param1;
        this._windowManager = param2;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get isVisible(): boolean {
        return !!(this._view && this._view.parent != null && this._view.visible);
    }

    public isStandaloneBadgeRarity(param1: number): boolean {
        return this._SafeStr_2134 != null && this._SafeStr_2134.isStandaloneBadgeRarity(param1);
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
        if (!this._isInitialized) {
            return;
        }
        this._SafeStr_2134.forceSelection();
        let _loc2_: string = param1 ?? this.getSearchTerm();
        this.updateFilterOptions();
        this.updateListViews(_loc2_);
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
            _loc3_.caption = "${inventory.badges.wearbadge}";
            _loc3_.disable();
            this.clearSelectedBadgeDetails();
            this.setBadgeImageVisible(false);
        } else {
            if (_loc1_.isInUse) {
                _loc3_.caption = "${inventory.badges.clearbadge}";
            } else {
                _loc3_.caption = "${inventory.badges.wearbadge}";
            }
            this.updateSelectedBadgeDetails(_loc1_);
            castGuarded(castGuarded(this._view.findChildByName("badge_image"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget").badgeId = _loc1_.badgeId;
            this.setBadgeImageVisible(true);
            _loc2_ = this._SafeStr_2134.getBadges(1);
            if (_loc2_ != null && _loc2_.length >= this._SafeStr_2134.getMaxActiveCount() && !_loc1_.isInUse) {
                _loc3_.disable();
            } else {
                _loc3_.enable();
            }
        }
    }

    private clearSelectedBadgeDetails(): void {
        this.setBadgeName(null);
        this.setTextDetail("badgeDescription", null, false);
        this.setBadgeRarityDetail(0, false);
        this.setTextDetail("badgeOwnerCount", null, false);
    }

    private updateSelectedBadgeDetails(param1: Badge): void {
        this.setBadgeName(param1.badgeName);
        this.setTextDetail("badgeDescription", param1.badgeDescription, param1.badgeDescription != null && param1.badgeDescription != "");
        this.setBadgeRarityDetail(param1.badgeRarityId, true);
        this.setTextDetail("badgeOwnerCount", this._SafeStr_2134.controller.localization.getLocalizationWithParams("badge.owner_count", "", "count", _SafeCls_6046.formatOwnerCount(param1.ownerCount)), _SafeCls_6046.shouldShowOwnerCount(param1.ownerCount));
    }

    private setBadgeImageVisible(param1: boolean): void {
        let _loc2_: IWindow = this._view.findChildByName("badge_image");
        if (_loc2_ != null) {
            _loc2_.visible = param1;
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
        this._grid = new BadgeGridView(this, _loc1_, _loc2_);
        this._SafeStr_4764 = asGuarded(this._view.findChildByName("active_items"), isIItemGridWindow);
        this._view.findChildByName("filter").caption = "";
        this._view.findChildByName("clear_filter_button").visible = false;
        this.updateFilterOptions();
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
        this._grid.setFilter(this._SafeStr_14287, this._SafeStr_14288, param1);
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

    private setTextDetail(param1: string, param2: string, param3: boolean, param4: number = -1): void {
        if (this._view == null || Boolean(this._view.disposed)) {
            return;
        }
        let _loc5_: ITextWindow = asGuarded(this._view.findChildByName(param1), isITextWindow);
        if (_loc5_ == null) {
            return;
        }
        _loc5_.visible = param3;
        _loc5_.text = "";
        if (!param3) {
            return;
        }
        if (param4 >= 0) {
            _loc5_.textColor = param4 >>> 0;
        }
        _loc5_.text = param2 ?? "";
    }

    private setBadgeRarityDetail(param1: number, param2: boolean): void {
        if (this._view == null || Boolean(this._view.disposed)) {
            return;
        }
        let _loc5_: IBorderWindow = asGuarded(this._view.findChildByName("badgeRarityTag"), isIBorderWindow);
        let _loc4_: ITextWindow = asGuarded(this._view.findChildByName("badgeRarityBorder"), isITextWindow);
        let _loc3_: ITextWindow = asGuarded(this._view.findChildByName("badgeRarity"), isITextWindow);
        if (_loc5_ == null || _loc4_ == null || _loc3_ == null) {
            return;
        }
        _loc5_.visible = param2;
        _loc4_.visible = param2;
        _loc4_.text = "";
        _loc3_.visible = param2;
        _loc3_.text = "";
        if (!param2) {
            return;
        }
        _loc3_.textColor = 16777215;
        _loc3_.text = this._SafeStr_2134.controller.localization.getLocalizationWithParams("badge.rarity.badge", "", "rarity", this.getBadgeRarityText(param1));
        _loc4_.text = _loc3_.text;
        _loc5_.color = _SafeCls_6038.getWhiteBackgroundTagColor(param1, this._SafeStr_2134.isUncommonBadgeRarityEnabled());
    }

    private getBadgeRarityText(param1: number): string {
        let _loc2_: string = _SafeCls_6038.getLabelLocalizationKey(param1, this._SafeStr_2134.isUncommonBadgeRarityEnabled());
        return this._SafeStr_2134.controller.localization.getLocalization(_loc2_, _loc2_);
    }

    private updateFilterOptions(): void {
        let _loc2_: IDropMenuWindow = asGuarded(this._view.findChildByName("filter.options"), isIDropMenuWindow);
        if (_loc2_ == null) {
            return;
        }
        let _loc1_: any[] = [this.getBadgeFilterLabel(0), this.getBadgeFilterLabel(1), this.getBadgeFilterLabel(2)];
        this._ignoreBadgeFilterEvents = true;
        try {
            _loc2_.populate(_loc1_);
            _loc2_.selection = this._SafeStr_14287;
        } finally {
            this._ignoreBadgeFilterEvents = false;
        }
        this.updateRarityFilterOptions();
    }

    private updateRarityFilterOptions(): void {
        let _loc2_: IDropMenuWindow = asGuarded(this._view.findChildByName("filter.rarity"), isIDropMenuWindow);
        if (_loc2_ == null) {
            return;
        }
        this._SafeStr_14289 = this.getAvailableBadgeRarityFilterIds();
        if (this._SafeStr_14289.indexOf(this._SafeStr_14288) == -1) {
            this._SafeStr_14288 = -1;
        }
        if (!this.isBadgeRarityFilterEnabled()) {
            this._SafeStr_14288 = -1;
        }
        let _loc1_: any[] = [];
        for (const _loc3_ of this._SafeStr_14289 ?? []) {
            _loc1_.push(this.getBadgeRarityFilterLabel(_loc3_ | 0));
        }
        this._ignoreBadgeRarityFilterEvents = true;
        try {
            _loc2_.populate(_loc1_);
            _loc2_.selection = Math.max(0, this._SafeStr_14289.indexOf(this._SafeStr_14288)) | 0;
        } finally {
            this._ignoreBadgeRarityFilterEvents = false;
        }
        if (this.isBadgeRarityFilterEnabled()) {
            _loc2_.enable();
        } else {
            _loc2_.disable();
        }
    }

    private windowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc6_: string;
        let _loc4_: WindowKeyboardEvent = null;
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        if (param1.type == "WME_CLICK") {
            _loc6_ = param2.name;
            if ("clear_filter_button" === _loc6_) {
                this._view.findChildByName("filter").caption = "";
                param2.visible = false;
                this.updateAll(null);
            }
        } else if (param1.type == "WKE_KEY_UP") {
            _loc4_ = param1 instanceof WindowKeyboardEvent ? param1 : null;
            _loc6_ = param2.name;
            if ("filter" === _loc6_) {
                this._view.findChildByName("clear_filter_button").visible = param2.caption.length > 0;
                if (_loc4_.keyCode == 27) {
                    param2.caption = "";
                    this._view.findChildByName("clear_filter_button").visible = false;
                    this.updateAll(null);
                } else if (_loc4_.keyCode == 13) {
                    this.updateAll(param2.caption);
                }
            }
        } else if (param1.type == "WE_SELECTED") {
            switch (param2.name) {
                case "filter.options":
                    if (!this._ignoreBadgeFilterEvents) {
                        _loc5_ = this.getSelectedBadgeFilter(isIDropMenuWindow(param2) ? param2 : null);
                        if (_loc5_ != this._SafeStr_14287) {
                            this._SafeStr_14287 = _loc5_;
                            this.updateAll(null);
                        }
                    }
                    break;
                case "filter.rarity":
                    if (!this._ignoreBadgeRarityFilterEvents) {
                        _loc3_ = this.getSelectedBadgeRarityFilter(isIDropMenuWindow(param2) ? param2 : null);
                        if (_loc3_ != this._SafeStr_14288) {
                            this._SafeStr_14288 = _loc3_;
                            this.updateAll(null);
                        }
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

    private getSelectedBadgeFilter(param1: IDropMenuWindow): number {
        if (param1 == null) {
            return 0;
        }
        let _loc2_: number = param1.selection;
        if (_loc2_ < 0 || _loc2_ > 2) {
            _loc2_ = 0;
        }
        return _loc2_;
    }

    private getBadgeFilterLabel(param1: number): string {
        switch (param1) {
            case 0:
                return this._SafeStr_2134.controller.localization.getLocalization("inventory.badges.filter.all");
            case 1:
                return this._SafeStr_2134.controller.localization.getLocalization("inventory.badges.filter.normal_badges");
            case 2:
                return this._SafeStr_2134.controller.localization.getLocalization("inventory.badges.filter.achievements");
            default:
                return "";
        }
    }

    private getAvailableBadgeRarityFilterIds(): any[] {
        let _loc1_: any[] = this._SafeStr_2134.getAvailableRareBadgeRarityIds();
        if (this._SafeStr_2134.hasCommonBadgeRarityGroup()) {
            _loc1_.unshift(-2);
        }
        _loc1_.unshift(-1);
        return _loc1_;
    }

    private getSelectedBadgeRarityFilter(param1: IDropMenuWindow): number {
        if (param1 == null || this._SafeStr_14289 == null || this._SafeStr_14289.length == 0) {
            return -1;
        }
        let _loc2_: number = param1.selection;
        if (_loc2_ < 0 || _loc2_ >= this._SafeStr_14289.length) {
            _loc2_ = 0;
        }
        return this._SafeStr_14289[_loc2_] | 0;
    }

    private isBadgeRarityFilterEnabled(): boolean {
        return this._SafeStr_14289 != null && this._SafeStr_14289.length > 2;
    }

    private getBadgeRarityFilterLabel(param1: number): string {
        if (param1 == -1) {
            return this._SafeStr_2134.controller.localization.getLocalization("inventory.badges.filter.rarity.all");
        }
        if (param1 == -2) {
            return this._SafeStr_2134.controller.localization.getLocalization("inventory.badges.filter.rarity.common");
        }
        let _loc2_: string = _SafeCls_6038.getLocalizationKey(param1, this._SafeStr_2134.isUncommonBadgeRarityEnabled());
        return _loc2_.length > 0 ? this._SafeStr_2134.controller.localization.getLocalization(_loc2_, _loc2_) : "";
    }

    private getSearchTerm(): string {
        if (this._view == null || Boolean(this._view.disposed)) {
            return "";
        }
        let _loc1_: ITextWindow = asGuarded(this._view.findChildByName("filter"), isITextWindow);
        return _loc1_ != null ? _loc1_.caption : "";
    }

    get [IDisposable](): true {
        return true;
    }
}
