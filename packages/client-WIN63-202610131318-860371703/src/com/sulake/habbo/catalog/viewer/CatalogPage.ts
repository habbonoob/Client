import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { ICatalogViewer } from '@/com/sulake/habbo/catalog/viewer/ICatalogViewer';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IPageLocalization } from '@/com/sulake/habbo/catalog/viewer/IPageLocalization';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ActivityPointDisplayCatalogWidget, ClubBuyCatalogWidget, ItemGridCatalogWidget, LocalizationCatalogWidget, LoyaltyVipBuyCatalogWidget, PetPreviewCatalogWidget, ProductViewCatalogWidget, RecolorableFurnitureCatalogWidget, RoomPreviewCatalogWidget, SingleViewCatalogWidget, SongDiskProductViewCatalogWidget, SpacesNewCatalogWidget, VipBuyCatalogWidget } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { AddOnBadgeViewCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/AddOnBadgeViewCatalogWidget';
import { BuilderAddonsCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/BuilderAddonsCatalogWidget';
import { BuilderCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/BuilderCatalogWidget';
import { BuilderLoyaltyCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/BuilderLoyaltyCatalogWidget';
import { BuilderSubscriptionCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/BuilderSubscriptionCatalogWidget';
import { BundleGridViewCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/BundleGridViewCatalogWidget';
import { BundlePurchaseExtraInfoWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/BundlePurchaseExtraInfoWidget';
import { BuyGuildWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/BuyGuildWidget';
import { ClubGiftWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ClubGiftWidget';
import { ColourGridCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ColourGridCatalogWidget';
import { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import { ProductOfferUpdatedEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/ProductOfferUpdatedEvent';
import { FeaturedItemsCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/FeaturedItemsCatalogWidget';
import { FirstProductSelectorCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/FirstProductSelectorCatalogWidget';
import { GuildBadgeViewCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/GuildBadgeViewCatalogWidget';
import { GuildForumSelectorCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/GuildForumSelectorCatalogWidget';
import { GuildSelectorCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/GuildSelectorCatalogWidget';
import { MadMoneyCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/MadMoneyCatalogWidget';
import { MarketPlaceCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/MarketPlaceCatalogWidget';
import { MarketPlaceOwnItemsCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/MarketPlaceOwnItemsCatalogWidget';
import { NewPetsCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/NewPetsCatalogWidget';
import { PetsCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/PetsCatalogWidget';
import { PurchaseCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/PurchaseCatalogWidget';
import { RecyclerCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/RecyclerCatalogWidget';
import { RecyclerPrizesCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/RecyclerPrizesCatalogWidget';
import { RedeemItemCodeCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/RedeemItemCodeCatalogWidget';
import { RoomAdsCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/RoomAdsCatalogWidget';
import { SimplePriceCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/SimplePriceCatalogWidget';
import { SoldLtdItemsCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/SoldLtdItemsCatalogWidget';
import { SpecialInfoWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/SpecialInfoWidget';
import { SpinnerCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/SpinnerCatalogWidget';
import { TextInputCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/TextInputCatalogWidget';
import { TotalPriceWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/TotalPriceWidget';
import { TraxPreviewCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/TraxPreviewCatalogWidget';
import { TrophyCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/TrophyCatalogWidget';
import { UniqueLimitedItemWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/UniqueLimitedItemWidget';
import { UserBadgeSelectorCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/UserBadgeSelectorCatalogWidget';
import { WarningCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/WarningCatalogWidget';
import { Logger } from '@/com/sulake/habbo/Logger';

export class CatalogPage implements ICatalogPage {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::CatalogPage'); }

    protected static readonly LAYOUT_MAGIC_PREFIX: string = "layout_";
    public static readonly MODE_NORMAL: number = 0;
    public static readonly MODE_SEARCH: number = 1;

    declare protected _layout: XML;

    declare protected _window: IWindowContainer;

    declare private _viewer: ICatalogViewer;

    declare private _pageId: number;
    static { (this.prototype as any)._pageId = 0; }

    declare private _layoutCode: string;

    declare private _offers: IPurchasableOffer[];

    declare private _localization: IPageLocalization;

    private _SafeStr_2139: any[] = [];

    declare private _widgetEvents: EventDispatcherWrapper;

    declare private _catalog: HabboCatalog;

    declare private _searchPageId: number;
    static { (this.prototype as any)._searchPageId = 0; }

    declare private _SafeStr_4599: ItemGridCatalogWidget;

    declare private _acceptSeasonCurrencyAsCredits: boolean;
    static { (this.prototype as any)._acceptSeasonCurrencyAsCredits = false; }

    declare private _mode: number;
    static { (this.prototype as any)._mode = 0; }

    constructor(param1: ICatalogViewer, param2: number, param3: string, param4: IPageLocalization, param5: IPurchasableOffer[], param6: HabboCatalog, param7: boolean, param8: number = -1) {
        this._viewer = param1;
        this._pageId = param2;
        this._layoutCode = param3;
        this._localization = param4;
        this._offers = param5;
        this._catalog = param6;
        for (const _loc9_ of param5 ?? []) {
            _loc9_.page = this;
        }
        this._widgetEvents = new EventDispatcherWrapper();
        this._SafeStr_2139 = [];
        this._acceptSeasonCurrencyAsCredits = param7;
        if (param8 == -1) {
            this._mode = 0;
        } else {
            this._mode = param8;
        }
        this.init();
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get viewer(): ICatalogViewer {
        return this._viewer;
    }

    public get pageId(): number {
        return this._mode == 1 ? -12345678 : this._pageId;
    }

    public get layoutCode(): string {
        return this._layoutCode;
    }

    public get offers(): IPurchasableOffer[] {
        return this._offers;
    }

    public get localization(): IPageLocalization {
        return this._localization;
    }

    public get links(): any[] {
        return this._localization.getLinks(this._layoutCode);
    }

    public get hasLinks(): boolean {
        return this._localization.hasLinks(this._layoutCode);
    }

    public get acceptSeasonCurrencyAsCredits(): boolean {
        return this._acceptSeasonCurrencyAsCredits;
    }

    public get allowDragging(): boolean {
        return this._layoutCode != "sold_ltd_items";
    }

    public set searchPageId(param1: number) {
        this._searchPageId = param1;
    }

    public get mode(): number {
        return this._mode;
    }

    public get isBuilderPage(): boolean {
        return this._viewer.catalogType == "BUILDERS_CLUB";
    }

    public selectOffer(param1: number): void {
        let _loc3_: IGridItem = null;
        let _loc4_: ITextFieldWindow = null;
        if (this._SafeStr_4599 != null && param1 > -1) {
            Logger.log("selecting offer " + param1);
            for (const _loc2_ of this._offers ?? []) {
                if (_loc2_.offerId == param1) {
                    _loc3_ = _loc2_.gridItem;
                    this._SafeStr_4599.select(_loc3_, true);
                }
            }
        }
        if (this._window && this._window.findChildByName("trophyWidget") != null) {
            _loc4_ = asGuarded(this._window.findChildByName("input_text"), isITextFieldWindow);
            _loc4_.focus();
            _loc4_.activate();
        }
    }

    public dispose(): void {
        for (const _loc2_ of this._SafeStr_2139 ?? []) {
            _loc2_.dispose();
        }
        this._SafeStr_2139 = null;
        this._localization.dispose();
        for (const _loc1_ of this._offers ?? []) {
            _loc1_.dispose();
        }
        this._offers = new Array<IPurchasableOffer>(0).fill(null);
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        if (this._widgetEvents != null) {
            this._widgetEvents.dispose();
            this._widgetEvents = null;
        }
        this._viewer = null;
        this._layout = null;
        this._pageId = 0;
        this._layoutCode = "";
        this._acceptSeasonCurrencyAsCredits = false;
    }

    public init(): void {
        if (this.createWindow(this.layoutCode)) {
            this.createWidgets();
        }
    }

    public closed(): void {
        if (this._SafeStr_2139 != null) {
            for (const _loc1_ of this._SafeStr_2139 ?? []) {
                _loc1_.closed();
            }
        }
    }

    protected createWindow(param1: string): boolean {
        if (param1 == "frontpage4") {
            param1 = "frontpage_featured";
        }
        let _loc2_: string = "layout_" + param1;
        if (this._viewer.viewerTags.indexOf("UBUNTU") > -1) {
            if (!this.viewer.catalog.assets.hasAsset(_loc2_)) {
                _loc2_ = "old_" + _loc2_;
            }
        } else {
            _loc2_ = "old_" + _loc2_;
        }
        let _loc3_: XmlAsset = asInstanceOf(this.viewer.catalog.assets.getAssetByName(_loc2_), XmlAsset);
        if (_loc3_ == null) {
            Logger.log("Could not find asset for layout " + _loc2_);
            return false;
        }
        this._layout = asInstanceOf(_loc3_.content, XML);
        this._window = asGuarded(this.viewer.catalog.windowManager.buildFromXML(this._layout), isIWindowContainer);
        if (this._window == null) {
            Logger.log("Could not create layout " + param1);
            return false;
        }
        return true;
    }

    private localize(): void {
    }

    private createWidgets(): void {
        this.createWidgetsRecursion(this._window);
        this.initializeWidgets();
    }

    private createWidgetsRecursion(param1: IWindowContainer): void {
        let _loc2_: number = 0;
        let _loc3_: IWindowContainer = null;
        if (param1 != null) {
            _loc2_ = 0;
            while (_loc2_ < param1.numChildren) {
                _loc3_ = asGuarded(param1.getChildAt(_loc2_), isIWindowContainer);
                if (_loc3_ != null) {
                    this.createWidget(_loc3_);
                    this.createWidgetsRecursion(_loc3_);
                }
                _loc2_++;
            }
        }
    }

    private createWidget(param1: IWindowContainer): void {
        if (param1 == null) {
            return;
        }
        switch (param1.name) {
            case "itemGridWidget":
                if (this._SafeStr_4599 == null) {
                    this._SafeStr_4599 = new ItemGridCatalogWidget(param1, this._catalog.sessionDataManager, this._viewer.catalogType);
                    this._SafeStr_2139.push(this._SafeStr_4599);
                }
                break;
            case "productViewWidget":
                this._SafeStr_2139.push(new ProductViewCatalogWidget(param1, this._catalog));
                break;
            case "songDiskProductViewWidget":
                this._SafeStr_2139.push(new SongDiskProductViewCatalogWidget(param1, this._catalog));
                break;
            case "singleViewWidget":
                this._SafeStr_2139.push(new SingleViewCatalogWidget(param1, this._catalog));
                break;
            case "purchaseWidget":
                this._SafeStr_2139.push(new PurchaseCatalogWidget(param1, this._catalog));
                break;
            case "colourGridWidget":
                this._SafeStr_2139.push(new ColourGridCatalogWidget(param1));
                break;
            case "recolorableFurnitureWidget":
                this._SafeStr_2139.push(new RecolorableFurnitureCatalogWidget(param1));
                break;
            case "traxPreviewWidget":
                this._SafeStr_2139.push(new TraxPreviewCatalogWidget(param1, this._catalog.soundManager));
                break;
            case "redeemItemCodeWidget":
                this._SafeStr_2139.push(new RedeemItemCodeCatalogWidget(param1));
                break;
            case "spacesNewWidget":
                this._SafeStr_2139.push(new SpacesNewCatalogWidget(param1, this._catalog.sessionDataManager, this._viewer.catalogType));
                break;
            case "roomPreviewWidget":
                this._SafeStr_2139.push(new RoomPreviewCatalogWidget(param1));
                break;
            case "trophyWidget":
                this._SafeStr_2139.push(new TrophyCatalogWidget(param1, this._catalog));
                break;
            case "addOnBadgeViewWidget":
                this._SafeStr_2139.push(new AddOnBadgeViewCatalogWidget(param1));
                break;
            case "petsWidget":
                this._SafeStr_2139.push(new PetsCatalogWidget(param1, this._catalog));
                break;
            case "newPetsWidget":
                this._SafeStr_2139.push(new NewPetsCatalogWidget(param1, this._catalog));
                break;
            case "roomAdsCatalogWidget":
                this._SafeStr_2139.push(new RoomAdsCatalogWidget(param1, this._catalog));
                break;
            case "textInputWidget":
                this._SafeStr_2139.push(new TextInputCatalogWidget(param1));
                break;
            case "specialInfoWidget":
                this._SafeStr_2139.push(new SpecialInfoWidget(param1));
                break;
            case "recyclerWidget":
                this._SafeStr_2139.push(new RecyclerCatalogWidget(param1));
                break;
            case "recyclerPrizesWidget":
                this._SafeStr_2139.push(new RecyclerPrizesCatalogWidget(param1));
                break;
            case "marketPlaceWidget":
                this._SafeStr_2139.push(new MarketPlaceCatalogWidget(param1));
                break;
            case "marketPlaceOwnItemsWidget":
                this._SafeStr_2139.push(new MarketPlaceOwnItemsCatalogWidget(param1));
                break;
            case "clubGiftWidget":
                this._SafeStr_2139.push(new ClubGiftWidget(param1, this._catalog.getClubGiftController(), this._catalog));
                break;
            case "clubBuyWidget":
                this._SafeStr_2139.push(new ClubBuyCatalogWidget(param1));
                break;
            case "vipBuyWidget":
                this._SafeStr_2139.push(new VipBuyCatalogWidget(param1, this._catalog));
                break;
            case "loyaltyVipBuyWidget":
                this._SafeStr_2139.push(new LoyaltyVipBuyCatalogWidget(param1, this._catalog));
                break;
            case "vipGiftWidget":
                this._SafeStr_2139.push(new VipBuyCatalogWidget(param1, this._catalog, true));
                break;
            case "activityPointDisplayWidget":
                this._SafeStr_2139.push(new ActivityPointDisplayCatalogWidget(param1));
                break;
            case "madMoneyWidget":
                this._SafeStr_2139.push(new MadMoneyCatalogWidget(param1));
                break;
            case "buyGuildWidget":
                this._SafeStr_2139.push(new BuyGuildWidget(param1));
                break;
            case "guildBadgeViewWidget":
                this._SafeStr_2139.push(new GuildBadgeViewCatalogWidget(param1, this._catalog.getGroupMembershipsController()));
                break;
            case "guildSelectorWidget":
                this._SafeStr_2139.push(new GuildSelectorCatalogWidget(param1, this._catalog.getGroupMembershipsController()));
                break;
            case "guildForumSelectorWidget":
                this._SafeStr_2139.push(new GuildForumSelectorCatalogWidget(param1, this._catalog.getGroupMembershipsController()));
                break;
            case "petPreviewWidget":
                this._SafeStr_2139.push(new PetPreviewCatalogWidget(param1, this._catalog));
                break;
            case "spinnerWidget":
                this._SafeStr_2139.push(new SpinnerCatalogWidget(param1, this._catalog));
                break;
            case "bundlePurchaseExtraInfoWidget":
                this._SafeStr_2139.push(new BundlePurchaseExtraInfoWidget(param1, this._catalog));
                break;
            case "totalPriceWidget":
                this._SafeStr_2139.push(new TotalPriceWidget(param1, this._catalog));
                break;
            case "limitedItemWidget":
                this._SafeStr_2139.push(new UniqueLimitedItemWidget(param1, this._catalog));
                break;
            case "soldLtdItemsWidget":
                this._SafeStr_2139.push(new SoldLtdItemsCatalogWidget(param1, this._catalog));
                break;
            case "userBadgeSelectorWidget":
                this._SafeStr_2139.push(new UserBadgeSelectorCatalogWidget(param1, this._catalog));
                break;
            case "bundleGridScrollWidget":
                this._SafeStr_2139.push(new BundleGridViewCatalogWidget(param1));
                break;
            case "simplePriceWidget":
                this._SafeStr_2139.push(new SimplePriceCatalogWidget(param1, this._catalog));
                break;
            case "builderWidget":
                this._SafeStr_2139.push(new BuilderCatalogWidget(param1, this._catalog));
                break;
            case "builderSubscriptionWidget":
                this._SafeStr_2139.push(new BuilderSubscriptionCatalogWidget(param1, this._catalog));
                break;
            case "builderAddonsWidget":
                this._SafeStr_2139.push(new BuilderAddonsCatalogWidget(param1, this._catalog));
                break;
            case "builderLoyaltyWidget":
                this._SafeStr_2139.push(new BuilderLoyaltyCatalogWidget(param1, this._catalog));
                break;
            case "warningWidget":
                this._SafeStr_2139.push(new WarningCatalogWidget(param1));
                break;
            case "firstProductAutoSelectorWidget":
                this._SafeStr_2139.push(new FirstProductSelectorCatalogWidget(param1));
                break;
            case "featuredItemsWidget":
                this._SafeStr_2139.push(new FeaturedItemsCatalogWidget(param1, this._catalog));
        }
    }

    private initializeWidgets(): void {
        let _loc3_: any = null;
        let _loc6_: ColourGridCatalogWidget = null;
        let _loc7_: ItemGridCatalogWidget = null;
        let _loc1_: IWindowContainer = null;
        let _loc4_: number = 0;
        let _loc5_: IWindowContainer = null;
        let _loc2_: any[] = [];
        if (this._layoutCode == "default_3x3_color_grouping") {
            _loc1_ = asGuarded(this._window.findChildByName("itemGridWidget"), isIWindowContainer);
            _loc4_ = 3;
            _loc1_.height = 64 - _loc4_;
            _loc5_ = asGuarded(this._window.findChildByName("colourGridWidget"), isIWindowContainer);
            _loc5_.visible = true;
            _loc5_.width = 360;
            _loc5_.x = _loc1_.x;
            _loc5_.y = _loc1_.y + _loc1_.height + _loc4_;
            _loc5_.height = 91;
            _loc6_ = new ColourGridCatalogWidget(_loc5_);
            this._SafeStr_2139.push(_loc6_);
        }
        for (_loc3_ of this._SafeStr_2139 ?? []) {
            _loc3_.page = this;
            if (_loc3_ instanceof ItemGridCatalogWidget) {
                _loc7_ = _loc3_ instanceof ItemGridCatalogWidget ? _loc3_ : null;
            }
            _loc3_.events = this._widgetEvents;
            if (!_loc3_.init()) {
                _loc2_.push(_loc3_);
            }
        }
        this.removeWidgets(_loc2_);
        this.initializeLocalizations();
        this._widgetEvents.dispatchEvent(new CatalogWidgetEvent("WIDGETS_INITIALIZED"));
    }

    private initializeLocalizations(): void {
        let _loc1_: ICatalogWidget = new LocalizationCatalogWidget(this._window, this._catalog);
        this._SafeStr_2139.push(_loc1_);
        _loc1_.page = this;
        _loc1_.events = this._widgetEvents;
        _loc1_.init();
    }

    private removeWidgets(param1: any[]): void {
        let _loc3_: any = null;
        let _loc2_: any = null;
        let _loc4_: number = 0;
        if (param1 == null || param1.length == 0) {
            return;
        }
        for (_loc3_ of this._SafeStr_2139 ?? []) {
            if (_loc3_.window != null) {
                for (_loc2_ of param1 ?? []) {
                    if (_loc2_.window != null) {
                        if (_loc2_.window.getChildIndex(_loc3_.window) >= 0) {
                            if (param1.indexOf(_loc3_) < 0) {
                                param1.push(_loc3_);
                            }
                            break;
                        }
                    }
                }
            }
        }
        for (_loc2_ of param1 ?? []) {
            if (_loc2_.window != null) {
                this._window.removeChild(_loc2_.window);
                _loc2_.window.dispose();
            }
            _loc4_ = this._SafeStr_2139.indexOf(_loc2_);
            if (_loc4_ >= 0) {
                this._SafeStr_2139.splice(_loc4_, 1);
            }
            _loc2_.dispose();
        }
    }

    public dispatchWidgetEvent(param1: Event): boolean {
        if (this._widgetEvents != null) {
            return this._widgetEvents.dispatchEvent(param1);
        }
        return false;
    }

    public replaceOffers(param1: IPurchasableOffer[], param2: boolean = false): void {
        if (param2) {
            for (const _loc3_ of this._offers ?? []) {
                _loc3_.dispose();
            }
        }
        this._offers = param1;
    }

    public updateLimitedItemsLeft(param1: number, param2: number): void {
        for (const _loc3_ of this._offers ?? []) {
            if (_loc3_.offerId == param1) {
                _loc3_.product.uniqueLimitedItemsLeft = param2;
                this._widgetEvents.dispatchEvent(new ProductOfferUpdatedEvent(_loc3_));
                return;
            }
        }
    }
}
