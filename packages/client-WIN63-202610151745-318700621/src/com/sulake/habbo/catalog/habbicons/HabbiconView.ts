import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabbiconController } from '@/com/sulake/habbo/catalog/habbicons/HabbiconController';
import type { HabbiconControllerEvent } from '@/com/sulake/habbo/catalog/habbicons/HabbiconControllerEvent';
import type { HabbiconTileView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconTileView';
import type { _SafeCls_6014 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6014';
import type { _SafeCls_6022 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6022';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabbiconAlbumHeaderView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconAlbumHeaderView';
import { HabbiconAlbumModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconAlbumModel';
import { HabbiconAlbumStats } from '@/com/sulake/habbo/catalog/habbicons/HabbiconAlbumStats';
import { HabbiconCollectionTrayView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconCollectionTrayView';
import { HabbiconEntryModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconEntryModel';
import { HabbiconPopupController } from '@/com/sulake/habbo/catalog/habbicons/HabbiconPopupController';
import { HabbiconSetModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconSetModel';
import { HabbiconSetPageView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconSetPageView';
import { HabbiconSetRailView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconSetRailView';
import { HabbiconTabView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconTabView';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';

export class HabbiconView implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconView'); }

    private static readonly DESKTOP_WINDOW_LAYER: number = 1;

    declare private _controller: HabbiconController;

    declare private _windowManager: IHabboWindowManager;

    declare private _window: IWindowContainer;

    declare private _headerView: HabbiconAlbumHeaderView;

    declare private _tabView: HabbiconTabView;

    declare private _SafeStr_14873: HabbiconSetRailView;

    declare private _SafeStr_14874: HabbiconSetPageView;

    declare private _SafeStr_14875: HabbiconCollectionTrayView;

    declare private _SafeStr_14876: HabbiconPopupController;

    declare private _SafeStr_14870: IWindowContainer;

    declare private _emptyTileTemplate: IWindowContainer;

    declare private _SafeStr_14877: IWindowContainer;

    declare private _SafeStr_14878: IWindowContainer;

    declare private _SafeStr_14879: HabbiconAlbumModel;

    private _SafeStr_14880: string = "all_sets";

    declare private _SafeStr_14881: HabbiconSetModel;

    declare private _SafeStr_14882: HabbiconTileView;

    declare private _SafeStr_14883: boolean;
    static { (this.prototype as any)._SafeStr_14883 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: HabbiconController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(this._controller.assets.getAssetByName("habbicon_view_xml").content), 1), isIWindowContainer);
        this._window.center();
        this.extractTemplates();
        this.createChildViews();
        this.addEventListeners();
        this._controller.registerUpdateReceiver(this, 1);
        this.refreshWholeAlbum(false);
    }

    private extractTemplates(): void {
        this._SafeStr_14870 = asGuarded(this.setGrid.getGridItemByName("tile_template"), isIWindowContainer);
        this.setGrid.removeGridItem(this._SafeStr_14870);
        this._emptyTileTemplate = asGuarded(this.setGrid.getGridItemByName("empty_tile_template"), isIWindowContainer);
        this.setGrid.removeGridItem(this._emptyTileTemplate);
        this._SafeStr_14877 = asGuarded(this.trayGroupList.getListItemByName("tray_group_template"), isIWindowContainer);
        this._SafeStr_14878 = asGuarded((asGuarded(this._SafeStr_14877.findChildByName("tray_group_grid"), isIItemGridWindow)).getGridItemByName("tray_tile_template"), isIWindowContainer);
    }

    private createChildViews(): void {
        this._headerView = new HabbiconAlbumHeaderView(this._controller, this.albumHeader);
        this._tabView = new HabbiconTabView(this._window, this.onTabChanged);
        this._SafeStr_14873 = new HabbiconSetRailView(this.allSetsContainer, this.onSetSelected);
        this._SafeStr_14874 = new HabbiconSetPageView(this._controller, this.setPageContainer, this._SafeStr_14870, this._emptyTileTemplate, this.onTileClicked);
        this._SafeStr_14875 = new HabbiconCollectionTrayView(this._controller, this.trayContainer, this._SafeStr_14877, this._SafeStr_14878, this.onTileClicked);
        this._SafeStr_14876 = new HabbiconPopupController(this._window, this.onPopupActionClicked, this.onPopupBuyClicked, this.onPopupHidden, this.isPointInsideAnyTile, this._controller.configuration, this._controller.localizationManager);
    }

    private addEventListeners(): void {
        this.headerButtonClose.addEventListener("WME_CLICK", this.onWindowClose);
        this._controller.addEventListener("hce_habbicon_status_changed", this.onControllerDataUpdated);
        this._controller.addEventListener("hce_owned_habbicons_updated", this.onControllerDataUpdated);
        this._controller.addEventListener("hce_shop_data_updated", this.onControllerDataUpdated);
    }

    private removeEventListeners(): void {
        if (this._window != null) {
            this.headerButtonClose.removeEventListener("WME_CLICK", this.onWindowClose);
        }
        if (this._controller != null) {
            this._controller.removeEventListener("hce_habbicon_status_changed", this.onControllerDataUpdated);
            this._controller.removeEventListener("hce_owned_habbicons_updated", this.onControllerDataUpdated);
            this._controller.removeEventListener("hce_shop_data_updated", this.onControllerDataUpdated);
        }
    }

    private onControllerDataUpdated = (param1: HabbiconControllerEvent): void => {
        if (param1.habbiconId > 0) {
            this.refreshChangedHabbicon(param1.habbiconId, param1.collectionId, this.shouldAnimateProgress());
            return;
        }
        if (param1.type == "hce_owned_habbicons_updated" || param1.type == "hce_shop_data_updated") {
            if (this._SafeStr_14879 == null || this._SafeStr_14879.sets.length == 0) {
                this.refreshWholeAlbum(true);
            } else {
                this.refreshProgressFromController(this.shouldAnimateProgress());
            }
        }
    };

    private rebuildAlbum(param1: boolean): void {
        let _loc2_: number = param1 && this._SafeStr_14881 != null ? this._SafeStr_14881.collectionId : 0;
        this._SafeStr_14879 = this.buildAlbumFromController();
        this._SafeStr_14881 = _loc2_ > 0 ? this._SafeStr_14879.findSetByCollectionId(_loc2_) : null;
        if (this._SafeStr_14881 == null && this._SafeStr_14879.sets.length > 0) {
            this._SafeStr_14881 = this._SafeStr_14879.sets[0];
        }
    }

    private refreshWholeAlbum(param1: boolean): void {
        this.hidePopupAndClearActiveTile();
        this.rebuildAlbum(param1);
        this._headerView.refresh(this._SafeStr_14879._SafeStr_14884, false);
        this._SafeStr_14873.setSets(this._SafeStr_14879.sets);
        this._SafeStr_14873.setActiveSet(this._SafeStr_14881);
        this.refreshActiveTabContent();
    }

    private refreshChangedHabbicon(param1: number, param2: number, param3: boolean): void {
        let _loc11_: HabbiconSetModel = null;
        let _loc9_: HabbiconSetModel = null;
        let _loc10_: boolean = param3 && this._SafeStr_14880 == "all_sets";
        let _loc8_: boolean = this._SafeStr_14876.visible && this._SafeStr_14876.activeTile != null && this._SafeStr_14876.activeTile.item != null;
        let _loc5_: number = _loc8_ ? this._SafeStr_14876.activeTile.item.habbiconId : 0;
        let _loc4_: HabbiconAlbumModel = this.buildAlbumFromController();
        let _loc7_: HabbiconEntryModel = _loc4_.findEntryByHabbiconId(param1);
        let _loc6_: HabbiconSetModel = param2 > 0 ? _loc4_.findSetByCollectionId(param2) : null;
        if (_loc6_ == null && _loc7_ != null) {
            _loc6_ = _loc4_.findSetByCollectionId(_loc7_.collectionId);
        }
        if (this._SafeStr_14879 == null || _loc6_ == null) {
            this.refreshWholeAlbum(true);
            return;
        }
        _loc11_ = this._SafeStr_14879.findSetByCollectionId(_loc6_.collectionId);
        if (_loc11_ == null) {
            this.refreshWholeAlbum(true);
            return;
        }
        this._SafeStr_14879._SafeStr_14884 = _loc4_._SafeStr_14884;
        this._SafeStr_14879._SafeStr_14885 = _loc4_._SafeStr_14885;
        this._SafeStr_14879.favouriteGroups = _loc4_.favouriteGroups;
        this.copySetState(_loc11_, _loc6_);
        _loc9_ = _loc11_;
        this._headerView.refresh(this._SafeStr_14879._SafeStr_14884, param3);
        this._SafeStr_14873.setActiveSet(this._SafeStr_14881);
        if (_loc9_ != null) {
            this._SafeStr_14873.refreshSet(_loc9_, _loc10_);
        }
        if (this._SafeStr_14880 == "all_sets") {
            this.refreshActiveSetChange(_loc9_, _loc7_, _loc10_);
            if (_loc8_ && _loc5_ == param1 && this._SafeStr_14876.activeTile != null && this._SafeStr_14876.activeTile.item != null) {
                this._SafeStr_14876.showForTile(this._SafeStr_14876.activeTile);
            }
            return;
        }
        this.hidePopupAndClearActiveTile();
        this.refreshActiveTabContent();
    }

    private refreshProgressFromController(param1: boolean): void {
        let _loc7_: HabbiconSetModel = null;
        let _loc3_: boolean = false;
        let _loc4_: boolean = false;
        let _loc2_: HabbiconAlbumModel = this.buildAlbumFromController();
        let _loc6_: boolean = param1 && this._SafeStr_14880 == "all_sets";
        if (_loc2_.sets.length == 0) {
            return;
        }
        if (this.albumStatsChanged(this._SafeStr_14879._SafeStr_14884, _loc2_._SafeStr_14884)) {
            this._SafeStr_14879._SafeStr_14884 = _loc2_._SafeStr_14884;
            this._headerView.refresh(this._SafeStr_14879._SafeStr_14884, param1);
        } else {
            this._SafeStr_14879._SafeStr_14884 = _loc2_._SafeStr_14884;
        }
        this._SafeStr_14879._SafeStr_14885 = _loc2_._SafeStr_14885;
        this._SafeStr_14879.favouriteGroups = _loc2_.favouriteGroups;
        for (const _loc5_ of _loc2_.sets ?? []) {
            _loc7_ = this._SafeStr_14879.findSetByCollectionId(_loc5_.collectionId);
            if (_loc7_ != null) {
                _loc3_ = _loc7_.completed != _loc5_.completed || _loc7_.total != _loc5_.total;
                _loc4_ = this.setRewardPanelChanged(_loc7_, _loc5_);
                this.copySetState(_loc7_, _loc5_);
                if (_loc3_) {
                    this._SafeStr_14873.refreshSet(_loc7_, _loc6_);
                    if (this._SafeStr_14881 != null && this._SafeStr_14881.collectionId == _loc7_.collectionId) {
                        this._SafeStr_14874.refreshProgress(this._SafeStr_14881, _loc6_);
                    }
                }
                if (_loc3_ || _loc4_) {
                    if (this._SafeStr_14881 != null && this._SafeStr_14881.collectionId == _loc7_.collectionId) {
                        this._SafeStr_14874.refreshReward(this._SafeStr_14881, _loc6_);
                    }
                }
            }
        }
    }

    private albumStatsChanged(param1: HabbiconAlbumStats, param2: HabbiconAlbumStats): boolean {
        return param1 == null || param2 == null || param1.ownedHabbicons != param2.ownedHabbicons || param1.completedSets != param2.completedSets || param1.collected != param2.collected || param1.total != param2.total;
    }

    private setRewardPanelChanged(param1: HabbiconSetModel, param2: HabbiconSetModel): boolean {
        return param1 == null || param2 == null || param1.canBuy != param2.canBuy || param1.priceCredits != param2.priceCredits || param1.priceActivityPoints != param2.priceActivityPoints || param1.activityPointType != param2.activityPointType || this.rewardHabbiconChanged(param1.rewardHabbicon, param2.rewardHabbicon);
    }

    private rewardHabbiconChanged(param1: HabbiconEntryModel, param2: HabbiconEntryModel): boolean {
        if (param1 == null || param2 == null) {
            return param1 != param2;
        }
        return param1.habbiconId != param2.habbiconId || param1.state != param2.state || param1.owned != param2.owned || param1.favorite != param2.favorite || param1.claimable != param2.claimable;
    }

    private copySetState(param1: HabbiconSetModel, param2: HabbiconSetModel): void {
        param1.id = param2.id;
        param1.collectionId = param2.collectionId;
        param1.name = param2.name;
        param1.title = param2.title;
        param1.description = param2.description;
        param1._SafeStr_14886 = param2._SafeStr_14886;
        param1.habbicons = param2.habbicons;
        param1.rewardHabbicon = param2.rewardHabbicon;
        param1.completed = param2.completed;
        param1.total = param2.total;
        param1.priceCredits = param2.priceCredits;
        param1.priceActivityPoints = param2.priceActivityPoints;
        param1.activityPointType = param2.activityPointType;
        param1.canBuy = param2.canBuy;
    }

    private refreshActiveSetChange(param1: HabbiconSetModel, param2: HabbiconEntryModel, param3: boolean): void {
        if (this._SafeStr_14881 == null || param1 == null || this._SafeStr_14881.collectionId != param1.collectionId) {
            return;
        }
        this._SafeStr_14874.refreshProgress(this._SafeStr_14881, param3);
        this._SafeStr_14874.refreshReward(this._SafeStr_14881, param3);
        if (param2 != null && !param2.isReward) {
            this._SafeStr_14874.refreshEntry(param2);
        }
    }

    private refreshActiveTabContent(): void {
        if (this._SafeStr_14879 == null) {
            return;
        }
        if (this._SafeStr_14880 == "all_sets") {
            this.allSetsContainer.visible = true;
            this.trayContainer.visible = false;
            this._SafeStr_14874.refresh(this._SafeStr_14881, false);
        } else if (this._SafeStr_14880 == "owned") {
            this.allSetsContainer.visible = false;
            this.trayContainer.visible = true;
            this._SafeStr_14875.refresh(this._SafeStr_14880, this._SafeStr_14879._SafeStr_14885);
        } else if (this._SafeStr_14880 == "favourited") {
            this.allSetsContainer.visible = false;
            this.trayContainer.visible = true;
            this._SafeStr_14875.refresh(this._SafeStr_14880, this._SafeStr_14879.favouriteGroups);
        }
    }

    private selectSet(param1: HabbiconSetModel): void {
        this._SafeStr_14881 = param1;
        this.hidePopupAndClearActiveTile();
        this._SafeStr_14873.setActiveSet(this._SafeStr_14881);
        if (this._SafeStr_14880 == "all_sets") {
            this._SafeStr_14874.refresh(this._SafeStr_14881, false);
        }
    }

    private onTabChanged = (param1: string): void => {
        this._SafeStr_14880 = param1;
        this.hidePopupAndClearActiveTile();
        this.allSetsContainer.visible = param1 == "all_sets";
        this.trayContainer.visible = param1 != "all_sets";
        if (param1 == "owned") {
            this._SafeStr_14875.refresh(param1, this._SafeStr_14879._SafeStr_14885);
        } else if (param1 == "favourited") {
            this._SafeStr_14875.refresh(param1, this._SafeStr_14879.favouriteGroups);
        } else {
            this._SafeStr_14874.refresh(this._SafeStr_14881, false);
        }
    };

    private onSetSelected = (param1: HabbiconSetModel): void => {
        this.selectSet(param1);
    };

    private onTileClicked = (param1: HabbiconTileView): void => {
        if (param1 == null || param1.item == null) {
            return;
        }
        if (this._SafeStr_14882 != null && this._SafeStr_14882 != param1) {
            this._SafeStr_14882.setActive(false);
        }
        this._SafeStr_14882 = param1;
        this._SafeStr_14882.setActive(true);
        if (!param1.item.isReward && !param1.item.owned && !param1.item.claimable) {
            this._controller.getHabbiconInfo(param1.item.habbiconId);
        }
        this._SafeStr_14876.showForTile(param1);
    };

    private onPopupActionClicked = (param1: HabbiconTileView, param2: string): void => {
        if (param1 == null || param1.item == null) {
            return;
        }
        switch (param2) {
            case "claim":
                if (param1.item.claimable) {
                    this._controller.claimHabbicon(param1.item.habbiconId);
                }
                break;
            case "add_favorite":
                if (param1.item.owned) {
                    this._controller.favoriteHabbicon(param1.item.habbiconId);
                }
                break;
            case "remove_favorite":
                if (param1.item.favorite) {
                    this._controller.unfavoriteHabbicon(param1.item.habbiconId);
                }
        }
    };

    private onPopupBuyClicked = (param1: HabbiconTileView): void => {
        if (param1 == null || param1.item == null) {
            return;
        }
        if (param1.item.purchasable && this.hasHabbiconPrice(param1.item)) {
            this._controller.openHabbiconPurchaseConfirmation(param1.item);
            this.hidePopupAndClearActiveTile();
        }
    };

    private onPopupHidden = (): void => {
        this.clearActiveTile();
    };

    private hidePopupAndClearActiveTile(): void {
        if (this._SafeStr_14876 != null) {
            this._SafeStr_14876.hide(false);
        }
        this.clearActiveTile();
    }

    private clearActiveTile(): void {
        if (this._SafeStr_14882 != null) {
            this._SafeStr_14882.setActive(false);
            this._SafeStr_14882 = null;
        }
    }

    private buildAlbumFromController(): HabbiconAlbumModel {
        let _loc6_: any = null;
        let _loc2_: HabbiconSetModel = null;
        let _loc4_: any = null;
        let _loc1_: HabbiconEntryModel = null;
        let _loc5_: HabbiconAlbumModel = new HabbiconAlbumModel();
        let _loc3_: _SafeCls_6022[] = this._controller.shopCollections;
        if (_loc3_ == null || _loc3_.length == 0) {
            return _loc5_;
        }
        for (_loc6_ of _loc3_ ?? []) {
            if (_loc6_ != null) {
                _loc2_ = new HabbiconSetModel();
                _loc2_.collectionId = _loc6_.collectionId;
                _loc2_.id = "collection_" + _loc6_.collectionId;
                _loc2_.name = _loc6_.name;
                _loc2_.title = this.resolveCollectionTitle(_loc6_);
                _loc2_.description = this.resolveCollectionDescription(_loc6_);
                _loc2_.priceCredits = _loc6_.priceCredits;
                _loc2_.priceActivityPoints = _loc6_.priceActivityPoints;
                _loc2_.activityPointType = _loc6_.activityPointType;
                _loc2_._SafeStr_14886 = HabbiconAssetManager.getCollectionIconBitmap(_loc6_.collectionId);
                if (_loc6_.habbicons != null) {
                    for (_loc4_ of _loc6_.habbicons ?? []) {
                        _loc1_ = this.createEntryFromData(_loc4_, _loc2_);
                        if (_loc1_ != null) {
                            _loc2_.habbicons.push(_loc1_);
                        }
                    }
                }
                _loc2_.rewardHabbicon = this.createRewardEntry(_loc6_, _loc2_);
                _loc2_.canBuy = (_loc6_.priceCredits > 0 || _loc6_.priceActivityPoints > 0) && !_loc6_.completed;
                this.updateSetProgress(_loc2_);
                _loc5_.sets.push(_loc2_);
            }
        }
        this.updateAlbumStats(_loc5_);
        _loc5_._SafeStr_14885 = this.createTrayGroups(_loc5_, false);
        _loc5_.favouriteGroups = this.createFavouriteTrayGroups(_loc5_);
        return _loc5_;
    }

    private createEntryFromData(param1: _SafeCls_6014, param2: HabbiconSetModel): HabbiconEntryModel {
        let _loc3_: HabbiconEntryModel = null;
        if (param1 == null) {
            return null;
        }
        _loc3_ = new HabbiconEntryModel();
        _loc3_.id = String(param1.habbiconId);
        _loc3_.habbiconId = param1.habbiconId;
        _loc3_.collectionId = param1.collectionId;
        _loc3_.collectionName = param2.name;
        _loc3_.collectionTitle = param2.title;
        _loc3_.name = this.resolveHabbiconDisplayName(param1.habbiconId, param1.name);
        _loc3_.description = "Server-driven habbicon state and price.";
        _loc3_._SafeStr_14887 = param2.habbicons.length | 0;
        _loc3_.state = param1.state;
        _loc3_.favorite = _loc3_.state == 3;
        _loc3_.owned = _loc3_.favorite || _loc3_.state == 2;
        _loc3_.claimable = _loc3_.state == 1;
        _loc3_.isReward = false;
        _loc3_.priceCredits = param1.priceCredits;
        _loc3_.priceActivityPoints = param1.priceActivityPoints;
        _loc3_.activityPointType = param1.activityPointType;
        _loc3_.purchasable = _loc3_.state == 0 && this.hasHabbiconPrice(_loc3_);
        _loc3_.color = this.seededColor(_loc3_.habbiconId * 37 + _loc3_.collectionId * 11);
        return _loc3_;
    }

    private createRewardEntry(param1: _SafeCls_6022, param2: HabbiconSetModel): HabbiconEntryModel {
        let _loc3_: HabbiconEntryModel = null;
        let _loc4_: number = 0;
        if (param1._SafeStr_14069 <= 0) {
            return null;
        }
        _loc4_ = param1._SafeStr_14070;
        _loc3_ = new HabbiconEntryModel();
        _loc3_.id = "reward_" + param1._SafeStr_14069;
        _loc3_.habbiconId = param1._SafeStr_14069;
        _loc3_.collectionId = param1.collectionId;
        _loc3_.collectionName = param2.name;
        _loc3_.collectionTitle = param2.title;
        _loc3_.name = this.resolveHabbiconDisplayName(param1._SafeStr_14069);
        _loc3_.description = "Collection reward habbicon.";
        _loc3_._SafeStr_14887 = param2.habbicons.length | 0;
        _loc3_.state = _loc4_;
        _loc3_.favorite = _loc4_ == 3;
        _loc3_.owned = _loc3_.favorite || _loc4_ == 2;
        _loc3_.claimable = _loc4_ == 1;
        _loc3_.purchasable = false;
        _loc3_.isReward = true;
        _loc3_.priceCredits = 0;
        _loc3_.priceActivityPoints = 0;
        _loc3_.activityPointType = param1.activityPointType;
        _loc3_.color = this.seededColor(_loc3_.habbiconId * 37 + _loc3_.collectionId * 11);
        return _loc3_;
    }

    private createTrayGroups(param1: HabbiconAlbumModel, param2: boolean): HabbiconSetModel[] {
        let _loc3_: any = undefined;
        let _loc4_: any = null;
        let _loc6_: HabbiconSetModel[] = new Array<HabbiconSetModel>(0).fill(null);
        for (const _loc5_ of param1.sets ?? []) {
            _loc3_ = new Array<HabbiconEntryModel>(0).fill(null);
            for (_loc4_ of _loc5_.habbicons ?? []) {
                if (param2 ? _loc4_.favorite : _loc4_.owned) {
                    _loc3_.push(_loc4_);
                }
            }
            if (_loc5_.rewardHabbicon != null && (param2 ? _loc5_.rewardHabbicon.favorite : _loc5_.rewardHabbicon.owned)) {
                _loc3_.push(_loc5_.rewardHabbicon);
            }
            if (_loc3_.length > 0) {
                _loc6_.push(this.createTrayGroup(_loc5_, _loc3_));
            }
        }
        return _loc6_;
    }

    private createFavouriteTrayGroups(param1: HabbiconAlbumModel): HabbiconSetModel[] {
        let _loc3_: any = null;
        let _loc6_: HabbiconSetModel = null;
        let _loc5_: HabbiconSetModel[] = new Array<HabbiconSetModel>(0).fill(null);
        let _loc2_: HabbiconEntryModel[] = new Array<HabbiconEntryModel>(0).fill(null);
        for (const _loc4_ of param1.sets ?? []) {
            for (_loc3_ of _loc4_.habbicons ?? []) {
                if (_loc3_.favorite) {
                    _loc2_.push(_loc3_);
                }
            }
            if (_loc4_.rewardHabbicon != null && _loc4_.rewardHabbicon.favorite) {
                _loc2_.push(_loc4_.rewardHabbicon);
            }
        }
        if (_loc2_.length > 0) {
            _loc6_ = new HabbiconSetModel();
            _loc6_.id = "favourited";
            _loc6_.name = "favourited";
            _loc6_.title = "${habbicons.favourites.title}";
            _loc6_.habbicons = _loc2_;
            _loc5_.push(_loc6_);
        }
        return _loc5_;
    }

    private createTrayGroup(param1: HabbiconSetModel, param2: HabbiconEntryModel[]): HabbiconSetModel {
        let _loc3_: HabbiconSetModel = new HabbiconSetModel();
        _loc3_.id = param1.id;
        _loc3_.collectionId = param1.collectionId;
        _loc3_.name = param1.name;
        _loc3_.title = param1.title;
        _loc3_.description = param1.description;
        _loc3_._SafeStr_14886 = param1._SafeStr_14886;
        _loc3_.habbicons = param2;
        _loc3_.rewardHabbicon = null;
        _loc3_.completed = param1.completed;
        _loc3_.total = param1.total;
        _loc3_.priceCredits = param1.priceCredits;
        _loc3_.priceActivityPoints = param1.priceActivityPoints;
        _loc3_.activityPointType = param1.activityPointType;
        _loc3_.canBuy = param1.canBuy;
        return _loc3_;
    }

    private updateSetProgress(param1: HabbiconSetModel): void {
        param1.completed = 0;
        param1.total = 0;
        for (const _loc2_ of param1.habbicons ?? []) {
            if (!_loc2_.isReward) {
                param1.total++;
                if (_loc2_.owned || _loc2_.claimable) {
                    param1.completed++;
                }
            }
        }
    }

    private updateAlbumStats(param1: HabbiconAlbumModel): void {
        let _loc2_: any;
        param1._SafeStr_14884 = new HabbiconAlbumStats();
        for (const _loc3_ of param1.sets ?? []) {
            param1._SafeStr_14884.total += _loc3_.total;
            param1._SafeStr_14884.collected += _loc3_.completed;
            if (_loc3_.complete) {
                param1._SafeStr_14884.completedSets++;
            }
            for (_loc2_ of _loc3_.habbicons ?? []) {
                if (_loc2_.owned) {
                    param1._SafeStr_14884.ownedHabbicons++;
                }
            }
            if (_loc3_.rewardHabbicon != null) {
                param1._SafeStr_14884.total++;
                if (_loc3_.rewardHabbicon.owned) {
                    param1._SafeStr_14884.collected++;
                    param1._SafeStr_14884.ownedHabbicons++;
                }
            }
        }
    }

    private resolveCollectionTitle(param1: _SafeCls_6022): string {
        if (param1 == null || param1.name == null || param1.name.length == 0) {
            return "Habbicon Collection";
        }
        return this.localize("habbicon_collection_" + param1.name.toLowerCase() + "_name", param1.name);
    }

    private resolveCollectionDescription(param1: _SafeCls_6022): string {
        if (param1 == null || param1.name == null || param1.name.length == 0) {
            return "";
        }
        return this.localize("habbicon_collection_" + param1.name.toLowerCase() + "_description", param1.name + " set description");
    }

    private resolveHabbiconDisplayName(param1: number, param2: string = null): string {
        let _loc3_: string = this.resolveHabbiconKey(param1, param2);
        if (_loc3_ == null || _loc3_.length == 0) {
            return "Habbicon";
        }
        return this.localize("habbicon_" + _loc3_.toLowerCase() + "_name", param2 != null && param2.length > 0 ? param2 : "Habbicon");
    }

    private resolveHabbiconKey(param1: number, param2: string = null): string {
        let _loc3_: string = HabbiconAssetManager.getHabbiconNameKey(param1);
        return _loc3_ != null && _loc3_.length > 0 ? _loc3_ : param2 ?? "";
    }

    private localize(param1: string, param2: string): string {
        let _loc3_: IHabboLocalizationManager = this._controller != null ? this._controller.localizationManager : null;
        let _loc4_: string = _loc3_ != null ? _loc3_.getLocalization(param1, param2) : param2;
        return _loc4_ != null && _loc4_.length > 0 ? _loc4_ : param2;
    }

    private formatPrice(param1: number, param2: number): string {
        if (param1 > 0 && param2 > 0) {
            return param1 + "c + " + param2;
        }
        if (param1 > 0) {
            return param1.toString();
        }
        return Math.max(0, param2).toString();
    }

    private hasHabbiconPrice(param1: HabbiconEntryModel): boolean {
        return param1 != null && (param1.priceCredits > 0 || param1.priceActivityPoints > 0);
    }

    private getPriceIconStyle(param1: number, param2: number, param3: number): number {
        let _loc4_: number = param2 > 0 ? param3 : 7;
        return ActivityPointTypeEnum.getIconStyleFor(_loc4_, this._controller.configuration, false);
    }

    private seededColor(param1: number): number {
        let _loc2_: number = param1 % 6;
        switch (_loc2_) {
            case 0:
                return 16371247;
            case 1:
                return 15964719;
            case 2:
                return 15695663;
            case 3:
                return 9358143;
            case 4:
                return 5095656;
            default:
                return 12813557;
        }
    }

    private onWindowClose = (param1: WindowMouseEvent): void => {
        this.hideWindow();
    };

    private hideWindow(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._SafeStr_14876 != null) {
            this._SafeStr_14876.hide();
            this._SafeStr_14876.detachFromStage();
        }
        if (this._windowManager != null && this._window != null && this._window.parent != null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
        }
    }

    public showWindow(): void {
        let _loc1_: IDesktopWindow = this._windowManager != null ? this._windowManager.getDesktop(1) : null;
        if (this._windowManager != null && this._window != null && this._window.parent == null && _loc1_ != null) {
            _loc1_.addChild(this._window);
        }
        if (this._SafeStr_14876 != null && _loc1_ != null) {
            this._SafeStr_14876.attachToDesktop(_loc1_);
        }
        if (!this._SafeStr_14883) {
            this._tabView.select("all_sets");
            this.onTabChanged("all_sets");
            this._SafeStr_14883 = true;
        }
        if (this._window != null) {
            this._window.activate();
        }
    }

    public update(param1: number): void {
        if (!this.shouldAnimateProgress()) {
            return;
        }
        this._headerView.update(param1);
        if (this._SafeStr_14880 == "all_sets") {
            this._SafeStr_14873.update(param1);
            this._SafeStr_14874.update(param1);
        }
    }

    private shouldAnimateProgress(): boolean {
        return this._window != null && this._window.parent != null;
    }

    private isPointInsideAnyTile = (param1: Point): boolean => {
        return this._SafeStr_14882 != null && this._SafeStr_14882.window != null && Boolean(this._SafeStr_14882.window.visible) && this.isPointInsideWindow(this._SafeStr_14882.window, param1);
    };

    private isPointInsideWindow(param1: IWindow, param2: Point): boolean {
        if (!param1 || !param2) {
            return false;
        }
        let _loc3_: Rectangle = new Rectangle();
        param1.getGlobalRectangle(_loc3_);
        return _loc3_.containsPoint(param2);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.hideWindow();
        this.removeEventListeners();
        this._controller.removeUpdateReceiver(this);
        if (this._headerView != null) {
            this._headerView.dispose();
            this._headerView = null;
        }
        if (this._tabView != null) {
            this._tabView.dispose();
            this._tabView = null;
        }
        if (this._SafeStr_14873 != null) {
            this._SafeStr_14873.dispose();
            this._SafeStr_14873 = null;
        }
        if (this._SafeStr_14874 != null) {
            this._SafeStr_14874.dispose();
            this._SafeStr_14874 = null;
        }
        if (this._SafeStr_14875 != null) {
            this._SafeStr_14875.dispose();
            this._SafeStr_14875 = null;
        }
        if (this._SafeStr_14876 != null) {
            this._SafeStr_14876.dispose();
            this._SafeStr_14876 = null;
        }
        this.disposeTemplate(this._SafeStr_14870);
        this.disposeTemplate(this._emptyTileTemplate);
        this.disposeTemplate(this._SafeStr_14878);
        this.disposeTemplate(this._SafeStr_14877);
        this._SafeStr_14870 = null;
        this._emptyTileTemplate = null;
        this._SafeStr_14878 = null;
        this._SafeStr_14877 = null;
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._SafeStr_14879 = null;
        this._SafeStr_14881 = null;
        this._SafeStr_14882 = null;
        this._controller = null;
        this._windowManager = null;
        this._disposed = true;
    }

    private disposeTemplate(param1: IWindowContainer): void {
        if (param1 != null && !param1.disposed) {
            param1.dispose();
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get headerButtonClose(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get albumHeader(): IWindowContainer {
        return asGuarded(this._window.findChildByName("album_header"), isIWindowContainer);
    }

    private get allSetsContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("all_sets_container"), isIWindowContainer);
    }

    private get setPageContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("set_page_container"), isIWindowContainer);
    }

    private get setGrid(): IItemGridWindow {
        return asGuarded(this._window.findChildByName("set_grid"), isIItemGridWindow);
    }

    private get trayContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("tray_container"), isIWindowContainer);
    }

    private get trayGroupList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("tray_group_list"), isIItemListWindow);
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
