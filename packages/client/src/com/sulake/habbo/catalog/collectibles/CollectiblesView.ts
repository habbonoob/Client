import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import type { ISelectorListWindow } from '@/com/sulake/core/window/components/ISelectorListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CollectiblesController } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesController';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import type { CollectibleWalletAddressesMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleWalletAddressesMessageEventParser';
import type { NftCollectionsScoreMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftCollectionsScoreMessageEventParser';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import { isISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowLinkEvent } from '@/com/sulake/core/window/events/WindowLinkEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CollectionsTab } from '@/com/sulake/habbo/catalog/collectibles/tabs/CollectionsTab';
import { RewardClaimsTab } from '@/com/sulake/habbo/catalog/collectibles/tabs/RewardClaimsTab';
import { TransferNftsTab } from '@/com/sulake/habbo/catalog/collectibles/tabs/TransferNftsTab';
import { MintInventoryListTab, ShopTab } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { CollectibleWalletAddressesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/CollectibleWalletAddressesMessageEvent';
import { NftCollectionsScoreMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/NftCollectionsScoreMessageEvent';
import { GetCollectibleWalletAddressesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/GetCollectibleWalletAddressesMessageComposer';
import { GetCollectorScoreMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/GetCollectorScoreMessageComposer';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class CollectiblesView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles::CollectiblesView'); }

    private static readonly DESKTOP_WINDOW_LAYER: number = 1;
    public static readonly STARDUST_WALLET_DISPLAY_NAME: string = "Collector Wallet";
    private static readonly TAB_COLLECTIONS: string = "top_view_collections_button";
    private static readonly TAB_MINT: string = "top_view_minting_button";
    private static readonly TAB_INFO: string = "top_view_info_button";
    private static readonly TAB_TRANSFER: string = "top_view_transfer_button";
    private static readonly TAB_SHOP: string = "top_view_shop_button";
    private static readonly TAB_REWARDS: string = "top_view_rewards_button";
    private static readonly TAB_COLLECTOR_PROFILE: string = "top_view_profile_button";
    private static readonly TAB_LEVELS: string = "top_view_levels_button";

    constructor(param1: CollectiblesController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._window = asGuarded(param2.buildFromXML(XML.from(this._controller.assets.getAssetByName("collectible_view_xml").content), 1), isIWindowContainer);
        this._window.findChildByName("top_view_profile_button").procedure = this.onTab;
        this._window.findChildByName("top_view_collections_button").procedure = this.onTab;
        this._window.findChildByName("top_view_levels_button").procedure = this.onTab;
        this._window.findChildByName("top_view_minting_button").procedure = this.onTab;
        this._window.findChildByName("top_view_info_button").procedure = this.onTab;
        this._window.findChildByName("top_view_transfer_button").procedure = this.onTab;
        this._window.findChildByName("top_view_shop_button").procedure = this.onTab;
        this._window.findChildByName("top_view_rewards_button").procedure = this.onTab;
        this._window.findChildByName("top_view_collections_button").caption = "${collectibles.collections.title}";
        this._window.findChildByName("top_view_shop_button").caption = "${collectibles.shop.title}";
        this._window.findChildByName("top_view_minting_button").caption = "${shop.minting.title}";
        this._window.findChildByName("top_view_transfer_button").caption = "${collectibles.transfer}";
        this._window.findChildByName("top_view_info_button").caption = "${collectibles.info.title}";
        this._window.findChildByName("top_view_rewards_button").caption = "${collectibles.claim.title}";
        this.addMessageEvents();
        this.refresh();
        this.requestWalletAddresses();
        let _loc6_: boolean = param1.context.configuration.getBoolean("nft.minting.enabled");
        this._window.findChildByName("top_view_minting_button").visible = _loc6_;
        let _loc3_: boolean = param1.context.configuration.getBoolean("collectibles.transfer.enabled");
        this._window.findChildByName("top_view_transfer_button").visible = _loc3_;
        let _loc4_: boolean = param1.context.configuration.getBoolean("nft.shop.enabled");
        this._window.findChildByName("top_view_shop_button").visible = _loc4_;
        this.levelTitle.caption = param1.localizationManager.getLocalization("collectibles.level").toUpperCase();
        this.centerTabLayout();
        this.initWidgets();
        let _loc5_: IWindow = this._window.findChildByName("header_button_close");
        if (_loc5_ != null) {
            _loc5_.addEventListener("WME_CLICK", this.onWindowClose);
        }
        this.infoLink.addEventListener("WE_LINK", this.onClickHtmlLink);
        this.infoLink.initializeLinkStyle();
        this.transferLink.addEventListener("WE_LINK", this.onClickHtmlLink);
        this.transferLink.initializeLinkStyle();
    }

    declare private _windowManager: IHabboWindowManager;

    declare private _controller: CollectiblesController;

    private _currentTab: string = "top_view_rewards_button";

    declare private _mintInventoryListWidget: MintInventoryListTab;

    declare private _collectionsWidget: CollectionsTab;

    declare private _transferWidget: TransferNftsTab;

    declare private _SafeStr_4669: ShopTab;

    declare private _SafeStr_3763: RewardClaimsTab;

    private _SafeStr_5008: boolean = false;

    declare private _messageEvents: IMessageEvent[];

    declare private _activeWallet: string;

    declare private _stardustWallet: string;

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    private _walletAddresses: any[] = null;

    public get walletAddresses(): any[] {
        return this._walletAddresses;
    }

    public get nonStardustWallets(): any[] {
        if (this._walletAddresses == null) {
            return null;
        }
        let _loc2_: any[] = [];
        for (const _loc1_ of this._walletAddresses ?? []) {
            if (_loc1_ != this._stardustWallet) {
                _loc2_.push(_loc1_);
            }
        }
        return _loc2_;
    }

    public get activeWallet(): string {
        return this._activeWallet;
    }

    public get stardustWallet(): string {
        return this._stardustWallet;
    }

    public get disposed(): boolean {
        return false;
    }

    public get mintInventoryListWidget(): MintInventoryListTab {
        return this._mintInventoryListWidget;
    }

    public get transferWidget(): TransferNftsTab {
        return this._transferWidget;
    }

    public get collectionsWidget(): CollectionsTab {
        return this._collectionsWidget;
    }

    private get scoreValue(): ITextWindow {
        return asGuarded(this._window.findChildByName("current_score_value"), isITextWindow);
    }

    private get hiscoreValue(): ITextWindow {
        return asGuarded(this._window.findChildByName("current_hiscore_value"), isITextWindow);
    }

    private get levelValue(): ITextWindow {
        return asGuarded(this._window.findChildByName("collector_level"), isITextWindow);
    }

    private get levelTitle(): ITextWindow {
        return asGuarded(this._window.findChildByName("level_title"), isITextWindow);
    }

    private get collectorLevelBg(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("collector_level_bg"), isIStaticBitmapWrapperWindow);
    }

    private get collectorLevelBg2(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("collector_level_bg2"), isIStaticBitmapWrapperWindow);
    }

    private get infoLink(): IHTMLTextWindow {
        return asGuarded(this._window.findChildByName("info_desc"), isIHTMLTextWindow);
    }

    private get transferLink(): IHTMLTextWindow {
        return asGuarded(this._window.findChildByName("transfer_desc"), isIHTMLTextWindow);
    }

    public showWindow(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._windowManager != null && this._window != null && this._window.parent == null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
            }
        }
    }

    public updateBalances(param1: IPurse): void {
        if (!this._window) {
            return;
        }
        let _loc2_: IWindow = this._window.findChildByName("emerald_currency_value");
        if (_loc2_) {
            _loc2_.caption = "" + param1.emeraldBalance;
        }
        let _loc3_: IWindow = this._window.findChildByName("silver_currency_value");
        if (_loc3_) {
            _loc3_.caption = "" + param1.silverBalance;
        }
        if (this._transferWidget) {
            this._transferWidget.onSilverBalanceUpdated();
        }
    }

    public walletsLoaded(): boolean {
        return this._walletAddresses != null;
    }

    public setActiveWalletIndex(param1: number): void {
        if (this._walletAddresses.length > 0 && (param1 < 0 || param1 >= this._walletAddresses.length || this._walletAddresses[param1] == this._activeWallet)) {
            return;
        }
        this._activeWallet = stringOrNull(this._walletAddresses.length > 0 ? this._walletAddresses[param1] : null);
        if (this._collectionsWidget) {
            this._collectionsWidget.activeWallet = this._activeWallet;
        }
        if (this._mintInventoryListWidget) {
            this._mintInventoryListWidget.activeWallet = this._activeWallet;
        }
        if (this._activeWallet != null) {
            this._controller.send(new GetCollectorScoreMessageComposer(this._activeWallet));
        }
    }

    public dispose(): void {
        this.removeMessageEvents();
        if (this._collectionsWidget) {
            this._collectionsWidget.dispose();
            this._collectionsWidget = null;
        }
        if (this._mintInventoryListWidget) {
            this._mintInventoryListWidget.dispose();
            this._mintInventoryListWidget = null;
        }
        if (this._transferWidget) {
            this._transferWidget.dispose();
            this._transferWidget = null;
        }
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    private onWindowClose = (param1: WindowEvent): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.hideWindow();
    };

    private hideWindow(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._windowManager != null && this._window != null && this._window.parent != null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
        }
    }

    private centerTabLayout(): void {
        let _loc3_: number = 0;
        let _loc1_: IWindow = null;
        let _loc4_: ISelectorListWindow = castGuarded(this._window.findChildByName("top_view_select_tab_context"), isITabContextWindow, "com.sulake.core.window.components.ITabContextWindow").selector;
        let _loc2_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < _loc4_.numSelectables) {
            _loc1_ = _loc4_.getSelectableAt(_loc3_);
            if (_loc1_.visible) {
                _loc2_ += _loc1_.width;
            } else {
                _loc1_.width = 0;
            }
            _loc3_++;
        }
        _loc4_.x = this._window.width / 2 - _loc2_ / 2 | 0;
        this.window.findChildByName("tab_bg").visible = _loc2_ > 350;
    }

    private addMessageEvents(): void {
        if (!this._controller) {
            return;
        }
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this._messageEvents.push(new CollectibleWalletAddressesMessageEvent(this.onCollectableWalletAddressMessage));
        this._messageEvents.push(new NftCollectionsScoreMessageEvent(this.onCollectionsScoreMessage));
        for (const _loc1_ of this._messageEvents ?? []) {
            this._controller.addMessageEvent(_loc1_);
        }
    }

    private onCollectionsScoreMessage = (param1: NftCollectionsScoreMessageEvent): void => {
        let _loc3_: any = 0;
        let _loc2_: NftCollectionsScoreMessageEventParser = param1.getParser();
        this.levelValue.caption = String(_loc2_.level);
        this.scoreValue.caption = String(_loc2_.score);
        this.hiscoreValue.caption = String(_loc2_.highestScore);
        let _loc4_: number = 0;
        switch (_loc4_ = Math.max(0, (_loc2_.level - 1) / 5) | 0) {
            case 0:
                _loc3_ = 8162450;
                break;
            case 1:
                _loc3_ = 2529547;
                break;
            case 2:
                _loc3_ = 32234;
                break;
            case 3:
                _loc3_ = 13828339;
                break;
            default:
                _loc3_ = 15571457;
        }
        this.collectorLevelBg.color = _loc3_ >>> 0;
        this.collectorLevelBg2.color = _loc3_ >>> 0;
    };

    private onCollectableWalletAddressMessage = (param1: CollectibleWalletAddressesMessageEvent): void => {
        this._SafeStr_5008 = false;
        let _loc2_: CollectibleWalletAddressesMessageEventParser = param1.getParser();
        this._walletAddresses = _loc2_.walletAddresses;
        this._stardustWallet = _loc2_.stardustWalletAddress;
        if (this._collectionsWidget) {
            this._collectionsWidget.onWalletsAddressesUpdated(this._walletAddresses);
        }
        if (this._transferWidget) {
            this._transferWidget.onWalletsAddressesUpdated(this.nonStardustWallets);
        }
        if (this._SafeStr_3763) {
            this._SafeStr_3763.onWalletsAddressesUpdated(this._walletAddresses);
        }
        this.setActiveWalletIndex(0);
    };

    private requestWalletAddresses(): void {
        if (this._SafeStr_5008) {
            return;
        }
        this._SafeStr_5008 = true;
        this._controller.send(new GetCollectibleWalletAddressesMessageComposer());
    }

    private refresh(): void {
        let _loc1_: ITabContextWindow = castGuarded(this._window.findChildByName("top_view_select_tab_context"), isITabContextWindow, "com.sulake.core.window.components.ITabContextWindow");
        _loc1_.selector.setSelected(castGuarded(this._window.findChildByName(this._currentTab), isISelectableWindow, "com.sulake.core.window.components.ISelectableWindow"));
        this.hideAllTabContainers();
        switch (this._currentTab) {
            case "top_view_profile_button":
                this._window.findChildByName("collectorProfileContainer").visible = true;
                break;
            case "top_view_collections_button":
                this._window.findChildByName("collectionsContainer").visible = true;
                if (!this._collectionsWidget) {
                    this._collectionsWidget = new CollectionsTab(this, this._controller);
                }
                break;
            case "top_view_levels_button":
                this._window.findChildByName("levelsContainer").visible = true;
                break;
            case "top_view_minting_button":
                this._window.findChildByName("mintingContainer").visible = true;
                if (!this._mintInventoryListWidget) {
                    this._mintInventoryListWidget = new MintInventoryListTab(this, this._controller);
                }
                break;
            case "top_view_transfer_button":
                this._window.findChildByName("transferContainer").visible = true;
                if (!this._transferWidget) {
                    this._transferWidget = new TransferNftsTab(this, this._controller);
                }
                break;
            case "top_view_info_button":
                this._window.findChildByName("infoContainer").visible = true;
                break;
            case "top_view_shop_button":
                this._window.findChildByName("shopContainer").visible = true;
                if (!this._SafeStr_4669) {
                    this._SafeStr_4669 = new ShopTab(this, this._controller);
                }
                break;
            case "top_view_rewards_button":
                this._window.findChildByName("rewardsContainer").visible = true;
                if (!this._SafeStr_3763) {
                    this._SafeStr_3763 = new RewardClaimsTab(this, this._controller);
                }
        }
    }

    private initWidgets(): void {
        if (!this._collectionsWidget) {
            this._collectionsWidget = new CollectionsTab(this, this._controller);
        }
        if (!this._mintInventoryListWidget) {
            this._mintInventoryListWidget = new MintInventoryListTab(this, this._controller);
        }
        if (!this._transferWidget) {
            this._transferWidget = new TransferNftsTab(this, this._controller);
        }
        if (!this._SafeStr_4669) {
            this._SafeStr_4669 = new ShopTab(this, this._controller);
        }
        if (!this._SafeStr_3763) {
            this._SafeStr_3763 = new RewardClaimsTab(this, this._controller);
        }
    }

    private hideAllTabContainers(): void {
        this._window.findChildByName("collectorProfileContainer").visible = false;
        this._window.findChildByName("collectionsContainer").visible = false;
        this._window.findChildByName("levelsContainer").visible = false;
        this._window.findChildByName("mintingContainer").visible = false;
        this._window.findChildByName("transferContainer").visible = false;
        this._window.findChildByName("infoContainer").visible = false;
        this._window.findChildByName("shopContainer").visible = false;
        this._window.findChildByName("rewardsContainer").visible = false;
    }

    private onTab = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._currentTab = param2.name;
        this.refresh();
    };

    private onClickHtmlLink = (param1: WindowEvent): void => {
        let _loc2_: WindowLinkEvent = param1 instanceof WindowLinkEvent ? param1 : null;
        if (_loc2_ != null) {
            HabboWebTools.openWebPageAndMinimizeClient(_loc2_.link);
        }
    };

    private removeMessageEvents(): void {
        if (!this._controller || !this._messageEvents) {
            return;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this._controller.removeMessageEvent(_loc1_);
            _loc1_.dispose();
        }
        this._messageEvents = null;
    }

    get [IDisposable](): true {
        return true;
    }
}
