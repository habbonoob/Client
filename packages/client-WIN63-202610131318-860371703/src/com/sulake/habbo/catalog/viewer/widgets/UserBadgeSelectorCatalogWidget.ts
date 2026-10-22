import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import { SetExtraPurchaseParameterEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetExtraPurchaseParameterEvent';
import { SetRoomPreviewerStuffDataEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetRoomPreviewerStuffDataEvent';
import { BadgesEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/badges/BadgesEvent';
import { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class UserBadgeSelectorCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::UserBadgeSelectorCatalogWidget'); }

    private static readonly BADGE_GRID_ITEM_NAME: string = "badgeGridItem";
    private static readonly MAX_SEARCH_STRING_LENGTH: number = 40;

    declare private _itemGrid: IItemGridWindow;

    declare private _gridItemLayout: XML;

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_14844: string;

    declare private _SafeStr_5455: IMessageEvent;

    declare private _excludedBadges: any[];

    declare private _SafeStr_14845: any[];

    declare private _SafeStr_14846: any[];

    private _SafeStr_3657: string = "";

    declare private _SafeStr_14847: any;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
        this._excludedBadges = this._catalog.getProperty("badge.display.excluded.badgeCodes").split(",");
    }

    public override dispose(): void {
        if (this._SafeStr_5455) {
            this._catalog.connection.removeMessageEvent(this._SafeStr_5455);
        }
        this._catalog = null;
        this._excludedBadges = null;
        this._SafeStr_14845 = null;
        this._SafeStr_14846 = null;
        this._SafeStr_14847 = null;
        this._SafeStr_14844 = null;
        super.dispose();
    }

    public override init(): boolean {
        this._itemGrid = asGuarded(this._window.findChildByName("badgeGrid"), isIItemGridWindow);
        let _loc1_: XmlAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("badgeGridItem"), XmlAsset);
        this._gridItemLayout = asInstanceOf(_loc1_.content, XML);
        this._window.procedure = this.onWidgetEvent;
        this.refreshBadgeData();
        this.applyBadgeFilter(false);
        this.updateSearchUiState();
        this.events.addEventListener("WIDGETS_INITIALIZED", this.onWidgetsInitialized);
        this._SafeStr_5455 = new BadgesEvent(this.onUserBadgesUpdated);
        this._catalog.connection.addMessageEvent(this._SafeStr_5455);
        return true;
    }

    private refreshBadgeData(): void {
        this._SafeStr_14845 = this._catalog.inventory.getAllMyBadgeIds(this._excludedBadges);
        if (this._SafeStr_14845 == null) {
            this._SafeStr_14845 = [];
        }
        if (this._SafeStr_14844 != null && this._SafeStr_14845.indexOf(this._SafeStr_14844) == -1) {
            this._SafeStr_14844 = null;
        }
        this.rebuildBadgeSearchCache();
    }

    private rebuildBadgeSearchCache(): void {
        this._SafeStr_14847 = {};
        for (const _loc1_ of this._SafeStr_14845 ?? []) {
            this._SafeStr_14847[_loc1_] = this.buildBadgeSearchText(stringOrNull(_loc1_));
        }
    }

    private resetBadgeSelectorGrid(): void {
        if (this._itemGrid == null) {
            return;
        }
        this._itemGrid.destroyGridItems();
        let _loc2_: number = 0;
        for (const _loc1_ of this._SafeStr_14846 ?? []) {
            this._itemGrid.addGridItem(this.createGridItem(stringOrNull(_loc1_), _loc2_++));
        }
        this.restoreSelectionState();
    }

    private onWidgetsInitialized = (param1: CatalogWidgetEvent): void => {
        if (this.page.offers.length == 0) {
            return;
        }
        let _loc2_: IPurchasableOffer = this.page.offers[0];
        this.events.dispatchEvent(new CatalogWidgetEvent("CWE_EXTRA_PARAM_REQUIRED_FOR_BUY"));
        this.events.dispatchEvent(new SelectProductEvent(_loc2_));
    };

    protected createGridItem(param1: string, param2: number): IWindowContainer {
        let _loc4_: IWindowContainer = asGuarded(this.page.viewer.catalog.windowManager.buildFromXML(this._gridItemLayout), isIWindowContainer);
        let _loc3_: IBadgeImageWidget = castGuarded(castGuarded(_loc4_.findChildByName("badgeWidget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget");
        _loc3_.type = "normal";
        _loc3_.badgeId = param1;
        _loc4_.id = param2;
        _loc4_.name = "badgeGridItem";
        _loc4_.procedure = this.badgeGridItemWindowProc;
        return _loc4_;
    }

    private setBadgeGridItemSelectionBg(param1: number, param2: boolean): void {
        let _loc3_: IWindowContainer = castGuarded(this._itemGrid.getGridItemAt(param1 >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc3_ != null) {
            castGuarded(_loc3_.findChildByName("bg"), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow").style = (param2 ? 0 : 2) >>> 0;
        }
    }

    private restoreSelectionState(): void {
        if (this._SafeStr_14844 == null || this._SafeStr_14846 == null) {
            return;
        }
        let _loc1_: number = this._SafeStr_14846.indexOf(this._SafeStr_14844);
        if (_loc1_ >= 0) {
            this.setBadgeGridItemSelectionBg(_loc1_, true);
        }
    }

    private clearSelectedBadge(param1: boolean = true): void {
        let _loc2_: number = 0;
        if (this._SafeStr_14844 != null && this._SafeStr_14846 != null) {
            _loc2_ = this._SafeStr_14846.indexOf(this._SafeStr_14844);
            if (_loc2_ >= 0) {
                this.setBadgeGridItemSelectionBg(_loc2_, false);
            }
        }
        this._SafeStr_14844 = null;
        if (param1) {
            this.events.dispatchEvent(new SetExtraPurchaseParameterEvent(""));
            this.page.dispatchWidgetEvent(new SetRoomPreviewerStuffDataEvent(this.getPreviewerStuffData("")));
        }
    }

    private setSelectedBadgeByIndex(param1: number): void {
        if (this._SafeStr_14846 == null || param1 < 0 || param1 >= this._SafeStr_14846.length) {
            return;
        }
        if (this._SafeStr_14844 != null && this._SafeStr_14846.indexOf(this._SafeStr_14844) >= 0) {
            this.setBadgeGridItemSelectionBg(this._SafeStr_14846.indexOf(this._SafeStr_14844), false);
        }
        this._SafeStr_14844 = stringOrNull(this._SafeStr_14846[param1]);
        this.setBadgeGridItemSelectionBg(param1, true);
        this.events.dispatchEvent(new SetExtraPurchaseParameterEvent(this._SafeStr_14844));
        this.page.dispatchWidgetEvent(new SetRoomPreviewerStuffDataEvent(this.getPreviewerStuffData(this._SafeStr_14844)));
    }

    private getBadgeGridItemWindow(param1: IWindow): IWindowContainer {
        let _loc2_: IWindow = param1;
        while (_loc2_ != null) {
            if (_loc2_.name == "badgeGridItem") {
                return isIWindowContainer(_loc2_) ? _loc2_ : null;
            }
            _loc2_ = _loc2_.parent;
        }
        return null;
    }

    private badgeGridItemWindowProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        let _loc3_: IWindowContainer = this.getBadgeGridItemWindow(param2);
        if (_loc3_ != null) {
            this.setSelectedBadgeByIndex(_loc3_.id);
        }
    };

    private getPreviewerStuffData(param1: string): IStuffData {
        let _loc2_: any[] = [];
        _loc2_.push("0");
        _loc2_.push(param1 == null ? "" : param1);
        _loc2_.push("");
        _loc2_.push("");
        let _loc3_: StringArrayStuffData = new StringArrayStuffData();
        _loc3_.setArray(_loc2_);
        return _loc3_;
    }

    private onWidgetEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: ITextFieldWindow = null;
        let _loc4_: WindowKeyboardEvent = null;
        if (param2 == null) {
            param2 = asGuarded(param1.target, isIWindow);
        }
        if (param1.type == "WME_CLICK") {
            if (param2 != null && param2.name == "search_placeholder") {
                this.focusSearchInput();
            } else if (param2 != null && (param2.name == "cancel_search_btn" || param2.parent != null && param2.parent.name == "cancel_search_btn")) {
                this.clearSearch();
            }
        } else if (param1.type == "WE_CHANGE") {
            _loc3_ = isITextFieldWindow(param2) ? param2 : null;
            if (_loc3_ == null || _loc3_.name != "search_input") {
                return;
            }
            if (_loc3_.text.length > 40) {
                _loc3_.text = _loc3_.text.substr(0, 40);
            }
            _loc3_.scrollH = 0;
            this._SafeStr_3657 = this.normalizeSearchText(_loc3_.text);
            this.applyBadgeFilter();
            this.updateSearchUiState();
        } else if (param1.type == "WKE_KEY_DOWN") {
            if (isITextFieldWindow(param2) && param2.name == "search_input") {
                _loc4_ = param1 instanceof WindowKeyboardEvent ? param1 : null;
                if (_loc4_ != null && _loc4_.keyCode == 27) {
                    this.clearSearch();
                }
            }
        }
    };

    private focusSearchInput(): void {
        let _loc1_: ITextFieldWindow = asGuarded(this._window.findChildByName("search_input"), isITextFieldWindow);
        if (_loc1_ != null) {
            _loc1_.focus();
            _loc1_.setSelection(0, _loc1_.text.length);
        }
    }

    private clearSearch(): void {
        let _loc1_: ITextFieldWindow = asGuarded(this._window.findChildByName("search_input"), isITextFieldWindow);
        if (_loc1_ != null) {
            _loc1_.text = "";
            _loc1_.scrollH = 0;
        }
        this._SafeStr_3657 = "";
        this.applyBadgeFilter();
        this.updateSearchUiState();
    }

    private applyBadgeFilter(param1: boolean = true): void {
        this._SafeStr_14846 = [];
        for (const _loc2_ of this._SafeStr_14845 ?? []) {
            if (this.matchesSearch(stringOrNull(_loc2_))) {
                this._SafeStr_14846.push(_loc2_);
            }
        }
        if (param1 && this._SafeStr_14844 != null && this._SafeStr_14846.indexOf(this._SafeStr_14844) == -1) {
            this.clearSelectedBadge();
        }
        this.resetBadgeSelectorGrid();
    }

    private matchesSearch(param1: string): boolean {
        if (this._SafeStr_3657 == "") {
            return true;
        }
        let _loc2_: string = stringOrNull(this._SafeStr_14847[param1]);
        return _loc2_ != null && _loc2_.indexOf(this._SafeStr_3657) >= 0;
    }

    private buildBadgeSearchText(param1: string): string {
        if (param1 == null || this._catalog == null || this._catalog.localization == null) {
            return "";
        }
        return this.normalizeSearchText(param1 + " " + this._catalog.localization.getBadgeName(param1) + " " + this._catalog.localization.getBadgeDesc(param1));
    }

    private normalizeSearchText(param1: string): string {
        return param1 == null ? "" : param1.toLowerCase();
    }

    private updateSearchUiState(): void {
        if (this._window == null) {
            return;
        }
        let _loc1_: ITextFieldWindow = asGuarded(this._window.findChildByName("search_input"), isITextFieldWindow);
        let _loc3_: IWindow = this._window.findChildByName("search_placeholder");
        let _loc2_: IWindow = this._window.findChildByName("cancel_search_btn");
        let _loc4_: boolean = _loc1_ != null && _loc1_.text.length > 0;
        if (_loc3_ != null) {
            _loc3_.visible = !_loc4_;
        }
        if (_loc2_ != null) {
            _loc2_.visible = _loc4_;
        }
    }

    private onUserBadgesUpdated = (param1: IMessageEvent): void => {
        this.refreshBadgeData();
        this.applyBadgeFilter();
        this.updateSearchUiState();
    };
}
