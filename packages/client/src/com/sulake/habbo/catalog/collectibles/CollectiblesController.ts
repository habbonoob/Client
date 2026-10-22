import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { ICollectibleProductPreviewListener } from '@/com/sulake/habbo/catalog/collectibles/ICollectibleProductPreviewListener';
import type { ICollectorHub } from '@/com/sulake/habbo/catalog/collectibles/ICollectorHub';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { PurseEvent } from '@/com/sulake/habbo/catalog/purse/PurseEvent';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { RedeemNftLootBoxResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/RedeemNftLootBoxResultMessageEventParser';
import type { RedeemNftLootBoxStateMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/RedeemNftLootBoxStateMessageEventParser';
import type { IHabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/IHabboFreeFlowChat';
import type { HabboInventoryCategoryInitializeEvent } from '@/com/sulake/habbo/inventory/events/HabboInventoryCategoryInitializeEvent';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { CollectiblesRewardBoxView } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesRewardBoxView';
import { BaseItemWrapper } from '@/com/sulake/habbo/catalog/collectibles/renderer/model/BaseItemWrapper';
import { CollectibleRarity } from '@/com/sulake/habbo/catalog/collectibles/util/CollectibleRarity';
import { CollectiblesView__com_sulake_habbo_catalog_collectibles as CollectiblesView } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { RedeemNftLootBoxResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/RedeemNftLootBoxResultMessageEvent';
import { RedeemNftLootBoxStateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/RedeemNftLootBoxStateMessageEvent';
import { ProgressTreasureHuntMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/treasurehunt/ProgressTreasureHuntMessageComposer';
import { ChatItem } from '@/com/sulake/habbo/freeflowchat/data/ChatItem';
import { ChatStyle, HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat.group';
import { PooledChatBubble } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/PooledChatBubble';
import { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import { RoomSessionChatEvent } from '@/com/sulake/habbo/session/events/RoomSessionChatEvent';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboFreeFlowChat } from '@/com/sulake/iid/IIDHabboFreeFlowChat';
import { IIDHabboInventory } from '@/com/sulake/iid/IIDHabboInventory';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNotifications } from '@/com/sulake/iid/IIDHabboNotifications';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class CollectiblesController extends Component implements ILinkEventTracker, ICollectorHub {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles::CollectiblesController'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        CollectiblesController.#initStatics();
        return CollectiblesController._log;
    }

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _freeFlowChat: IHabboFreeFlowChat;

    declare private _roomEngine: IRoomEngine;

    declare private _view: CollectiblesView;

    declare private _SafeStr_4459: CollectiblesRewardBoxView;

    declare private _disposed_CollectiblesController: boolean;

    declare private _SafeStr_6247: number;

    declare private _SafeStr_6627: string;

    declare private _SafeStr_2864: number;

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
                this._communicationManager = param1;
            }, true), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
                this._sessionDataManager = param1;
            }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
                this._windowManager = param1;
            }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
                this._localizationManager = param1;
            }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
                this._roomEngine = param1;
            }, false), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
                this._catalog = param1;
            }), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
                this._avatarRenderManager = param1;
            }), new ComponentDependency(new IIDHabboFreeFlowChat(), (param1: IHabboFreeFlowChat): void => {
                this._freeFlowChat = param1;
            }), new ComponentDependency(new IIDHabboNotifications(), (param1: IHabboNotifications): void => {
                this._notifications = param1;
            }), new ComponentDependency(new IIDHabboInventory(), (param1: IHabboInventory): void => {
                this._inventory = param1;
            }, false, [{ "type": "HABBO_INVENTORY_CATEGORY_INITIALIZED", "callback": this.onInventoryInitialize }])]);
    }

    declare private _localizationManager: IHabboLocalizationManager;

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    declare private _avatarRenderManager: IAvatarRenderManager;

    public get avatarRenderManager(): IAvatarRenderManager {
        return this._avatarRenderManager;
    }

    declare private _windowManager: IHabboWindowManager;

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    declare private _inventory: IHabboInventory;

    public get inventory(): IHabboInventory {
        return this._inventory;
    }

    declare private _notifications: IHabboNotifications;

    public get notifications(): IHabboNotifications {
        return this._notifications;
    }

    declare private _catalog: IHabboCatalog;

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public get linkPattern(): string {
        return "collectibles/";
    }

    protected override initComponent(): void {
        this.context.addLinkEventTracker(this);
        this._catalog.events.addEventListener("catalog_purse_emerald_balance", this.onEmeraldBalance);
        this._catalog.events.addEventListener("catalog_purse_silver_balance", this.onSilverBalance);
        let _loc1_: IMessageEvent[] = new Array<IMessageEvent>(0).fill(null);
        _loc1_.push(new RedeemNftLootBoxStateMessageEvent(this.onRedeemLootBoxStateEvent));
        _loc1_.push(new RedeemNftLootBoxResultMessageEvent(this.onRedeemLootBoxResultEvent));
        for (const _loc2_ of _loc1_ ?? []) {
            this.addMessageEvent(_loc2_);
        }
    }

    public override dispose(): void {
        if (!this._disposed_CollectiblesController) {
            if (this._catalog) {
                if (this._catalog.events) {
                    this._catalog.events.removeEventListener("catalog_purse_emerald_balance", this.onEmeraldBalance);
                    this._catalog.events.removeEventListener("catalog_purse_silver_balance", this.onSilverBalance);
                }
                this._catalog = null;
            }
            if (this._view) {
                this._view.dispose();
                this._view = null;
            }
            this._communicationManager = null;
            this._sessionDataManager = null;
            this._windowManager = null;
            this._localizationManager = null;
            this._roomEngine = null;
            this._disposed_CollectiblesController = true;
        }
        super.dispose();
    }

    public send(param1: IMessageComposer): void {
        this._communicationManager.connection.send(param1);
    }

    public addMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._communicationManager.addHabboConnectionMessageEvent(param1);
    }

    public removeMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._communicationManager.removeHabboConnectionMessageEvent(param1);
    }

    public getProductType(param1: IProductDisplayInfo): string {
        let _loc2_: string = null;
        if (param1 == null) {
            return "unknown";
        }
        switch (param1.productTypeId) {
            case 0:
                _loc2_ = this.localizationManager.getLocalization("product.type.wall");
                break;
            case 1:
                _loc2_ = this.localizationManager.getLocalization("product.type.room");
                break;
            case 2:
                _loc2_ = this.localizationManager.getLocalization("product.type.effect");
                break;
            case 4:
                _loc2_ = this.localizationManager.getLocalization("product.type.badge");
                break;
            case 9:
                _loc2_ = this.localizationManager.getLocalization("product.type.chatstyle");
                break;
            case 10:
                _loc2_ = this.localizationManager.getLocalization("product.type.pets");
                break;
            case 11:
                _loc2_ = this.localizationManager.getLocalization("product.type.clothing");
                break;
            default:
                _loc2_ = "Unknown";
        }
        return _loc2_;
    }

    public getProductName(param1: IProductDisplayInfo): string {
        let _loc2_: IFurnitureData = null;
        _loc2_ = null;
        if (param1 == null) {
            return "unknown";
        }
        switch (param1.productTypeId - -1) {
            case 0:
                return "unknown";
            case 1:
                _loc2_ = this._sessionDataManager.getWallItemData(parseInt(param1.itemTypeId) | 0);
                if (_loc2_ == null) {
                    return "(missing wall item)";
                }
                return _loc2_.localizedName;
                break;
            case 2:
            case 12:
                _loc2_ = this._sessionDataManager.getFloorItemData(parseInt(param1.itemTypeId) | 0);
                if (_loc2_ == null) {
                    return "(missing floor item)";
                }
                return _loc2_.localizedName;
                break;
            case 3:
                return this.localizationManager.getLocalization("fx_" + param1.itemTypeId);
            case 5:
                return this.localizationManager.getBadgeName(param1.itemTypeId);
            case 10:
                return this.localizationManager.getLocalization("product.type.chatstyle");
            case 11:
                return this.localizationManager.getLocalization("pet.type." + param1.itemTypeId);
            default:
                CollectiblesController._log.warn("Can not yet handle this type of product: ");
                return "(missing)";
        }
    }

    public previewIcon(param1: IProductDisplayInfo, param2: ICollectibleProductPreviewListener): void {
        let _loc4_: IFurnitureData = null;
        _loc4_ = null;
        let _loc5_: number = 0;
        let _loc3_: ImageResult = null;
        let _loc6_: number = 0;
        _loc3_ = null;
        if (param1 == null) {
            param2.setUnknownImage();
            return;
        }
        switch (param1.productTypeId - -1) {
            case 0:
                param2.setUnknownImage();
                break;
            case 1:
                _loc4_ = this._sessionDataManager.getWallItemData(parseInt(param1.itemTypeId) | 0);
                if (_loc4_ == null) {
                    param2.clearPreviewer();
                    break;
                }
                _loc5_ = this.tempCategoryMapping("I", _loc4_.id);
                if (_loc5_ == 1) {
                    param2.imageResult = this._roomEngine.getWallItemIcon(_loc4_.id, param2);
                    break;
                }
                param2.clearPreviewer();
                break;
            case 2:
            case 12:
                _loc4_ = this._sessionDataManager.getFloorItemData(parseInt(param1.itemTypeId) | 0);
                if (_loc4_ == null) {
                    param2.clearPreviewer();
                    break;
                }
                param2.imageResult = this._roomEngine.getFurnitureIcon(_loc4_.id, param2);
                break;
            case 3:
                _loc3_ = new ImageResult();
                _loc3_.data = this._catalog.getPixelEffectIcon(parseInt(param1.itemTypeId) | 0);
                param2.imageResult = _loc3_;
                break;
            case 5:
                param2.badgeResult = param1.itemTypeId;
                break;
            case 10:
                _loc6_ = parseInt(param1.itemTypeId) | 0;
                _loc3_ = new ImageResult();
                _loc3_.data = this._freeFlowChat.chatStyleLibrary.getStyle(_loc6_).selectorPreview;
                param2.imageResult = _loc3_;
                break;
            case 11:
                param2.petResult = param1.petFigureString;
                break;
            default:
                CollectiblesController._log.warn("Can not yet handle this type of product: ");
                param2.clearPreviewer();
        }
    }

    public previewImage(param1: IProductDisplayInfo, param2: ICollectibleProductPreviewListener): void {
        let _loc7_: string = null;
        let _loc4_: IFurnitureData = null;
        _loc4_ = null;
        let _loc6_: number = 0;
        let _loc3_: ImageResult = null;
        let _loc5_: BitmapData = null;
        if (param1 == null) {
            param2.setUnknownImage();
            return;
        }
        if (this.handlePreviewImageEasterEgg(param1, param2)) {
            return;
        }
        switch (param1.productTypeId - -1) {
            case 0:
                param2.setUnknownImage();
                break;
            case 1:
                _loc4_ = this._sessionDataManager.getWallItemData(parseInt(param1.itemTypeId) | 0);
                if (_loc4_ == null) {
                    param2.clearPreviewer();
                    break;
                }
                _loc6_ = this.tempCategoryMapping("I", _loc4_.id);
                if (_loc6_ == 1) {
                    param2.imageResult = this._roomEngine.getWallItemImage(_loc4_.id, new Vector3d(90), 64, param2);
                    break;
                }
                param2.clearPreviewer();
                break;
            case 2:
                _loc4_ = this._sessionDataManager.getFloorItemData(parseInt(param1.itemTypeId) | 0);
                if (_loc4_ == null) {
                    param2.clearPreviewer();
                    break;
                }
                param2.imageResult = this._roomEngine.getFurnitureImage(_loc4_.id, new Vector3d(90, 0, 0), 64, param2);
                break;
            case 3:
                if (param1.itemTypeId == "") {
                    param2.clearPreviewer();
                    break;
                }
                param2.setEffectResult(this._sessionDataManager.figure, parseInt(param1.itemTypeId) | 0);
                break;
            case 5:
                param2.badgeResult = param1.itemTypeId;
                break;
            case 10:
                _loc3_ = new ImageResult();
                _loc5_ = this.createChatItemPreview(parseInt(param1.itemTypeId) | 0);
                if (_loc5_ == null) {
                    param2.clearPreviewer();
                    break;
                }
                _loc3_.data = _loc5_;
                param2.imageResult = _loc3_;
                break;
            case 11:
                param2.petResult = param1.petFigureString;
                break;
            case 12:
                _loc7_ = this._avatarRenderManager.getFigureStringWithFigureIds(this._sessionDataManager.figure, this._sessionDataManager.gender, param1.figureSetIds);
                param2.avatarResult = _loc7_;
                break;
            default:
                CollectiblesController._log.warn("Can not yet handle this type of product: ");
                param2.clearPreviewer();
        }
    }

    public itemAddedToInventory(param1: number, param2: number, param3: boolean): void {
        if (this._view != null && this._view.mintInventoryListWidget != null) {
            this._view.mintInventoryListWidget.amountChangedForItem("furni", param1, param3);
        }
    }

    public itemRemovedFromInventory(param1: number, param2: number, param3: boolean): void {
        if (this._view != null && this._view.mintInventoryListWidget != null) {
            this._view.mintInventoryListWidget.amountChangedForItem("furni", param1, param3);
        }
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        if (_loc2_[1] == "open") {
            this.showCollectibleHub();
        }
    }

    private onRedeemLootBoxStateEvent(param1: RedeemNftLootBoxStateMessageEvent): void {
        let _loc5_: string = null;
        let _loc3_: RedeemNftLootBoxStateMessageEventParser = param1.getParser();
        let _loc2_: any = this._sessionDataManager.userId == _loc3_.openerAvatarId;
        if (_loc3_.start) {
            return;
        }
        let _loc4_: BaseItemWrapper = new BaseItemWrapper(_loc3_.reward);
        if (_loc2_) {
            this.showLootBoxReward(_loc4_);
        } else {
            _loc5_ = this.localizationManager.getLocalizationWithParams("collectibles.reward_box.notif.desc", "", "name", this.localizationManager.getLocalization("generic.someone"), "item", this.getProductName(_loc4_));
            this._notifications.addItem(_loc5_, "nft_opening", null, null, [_loc4_, _loc3_.reward.rarity, CollectibleRarity.getRarityColor(_loc3_.reward.rarity)]);
        }
    }

    private onRedeemLootBoxResultEvent(param1: RedeemNftLootBoxResultMessageEvent): void {
        let _loc2_: RedeemNftLootBoxResultMessageEventParser = param1.getParser();
        if (_loc2_.fail) {
            this.notifications.addItem(this.localizationManager.getLocalization("generic.error"), "info", "icon_curator_stamp_large_png");
        }
        if (_loc2_.notInStarDustWallet) {
            this.notifications.addItem(this.localizationManager.getLocalization("collectibles.reward_box.wrong_wallet"), "info", "icon_curator_stamp_large_png");
        }
    }

    private updateView(): void {
        if (this._view) {
            this._view.updateBalances(this._catalog.getPurse());
        }
    }

    private handlePreviewImageEasterEgg(param1: IProductDisplayInfo, param2: ICollectibleProductPreviewListener): boolean {
        let _loc6_: string = null;
        let _loc3_: ImageResult = null;
        let _loc4_: BitmapData = null;
        let _loc5_: string = null;
        if (param1.productTypeId == this._SafeStr_6247 && param1.itemTypeId == this._SafeStr_6627) {
            this._SafeStr_2864 += 1;
        } else {
            this._SafeStr_2864 = 1;
        }
        this._SafeStr_6247 = param1.productTypeId;
        this._SafeStr_6627 = param1.itemTypeId;
        if (param1.productTypeId == 9) {
            _loc6_ = "";
            if (this._SafeStr_2864 == 7) {
                _loc6_ = "Evil Frank";
            }
            if (this._SafeStr_2864 == 10) {
                _loc6_ = "Bonne Blonde";
            }
            if (this._SafeStr_2864 == 15) {
                _loc6_ = "Furni fairy";
            }
            if (this._SafeStr_2864 == 22) {
                _loc6_ = "Wacky Wired";
            }
            if (this._SafeStr_2864 == 35) {
                _loc6_ = "Quacky duck";
            }
            if (this._SafeStr_2864 == 70) {
                _loc6_ = "Pixel poo";
            }
            if (this._SafeStr_2864 == 100) {
                _loc6_ = "Bobba filtered";
            }
            if (_loc6_ != "") {
                _loc3_ = new ImageResult();
                _loc4_ = this.createChatItemPreview(parseInt(param1.itemTypeId) | 0, _loc6_);
                if (_loc4_ == null) {
                    return false;
                }
                _loc3_.data = _loc4_;
                param2.imageResult = _loc3_;
                _loc5_ = _loc6_.substr(0, 3);
                if (_loc6_.indexOf("red") == 8 && param1.itemTypeId == "1020") {
                    this.send(new ProgressTreasureHuntMessageComposer("wf15", _loc5_ + _loc5_ + _loc5_ + _loc5_ + _loc5_));
                }
                return true;
            }
        }
        return false;
    }

    private createChatItemPreview(param1: number, param2: string = null): BitmapData {
        if (param2 == null) {
            param2 = this._sessionDataManager.userName;
        }
        let _loc6_: ChatStyle = asInstanceOf(this._freeFlowChat.chatStyleLibrary.getStyle(param1), ChatStyle);
        if (_loc6_ == null) {
            return null;
        }
        let _loc3_: RoomSessionChatEvent = new RoomSessionChatEvent("RSCE_CHAT_EVENT", null, -1, "", 0);
        let _loc4_: ChatItem = new ChatItem(_loc3_, getTimer(), null, 0, null, null, null, param2);
        let _loc5_: PooledChatBubble = new PooledChatBubble(this._freeFlowChat instanceof HabboFreeFlowChat ? this._freeFlowChat : null);
        _loc5_.chatItem = _loc4_;
        _loc5_.face = null;
        _loc5_.style = _loc6_;
        _loc5_.recreate(param2, 0, false);
        let _loc7_: BitmapData = new BitmapData(_loc5_.width | 0, _loc5_.height | 0, true, 0);
        _loc7_.draw(_loc5_);
        return _loc7_;
    }

    private tempCategoryMapping(param1: string, param2: number): number {
        if (param1 == "S") {
            return 1;
        }
        if (param1 == "I") {
            if (param2 == 3001) {
                return 2;
            }
            if (param2 == 3002) {
                return 3;
            }
            if (param2 == 4057) {
                return 4;
            }
            return 1;
        }
        return 1;
    }

    private showCollectibleHub(): void {
        if (!this._view || this._view.disposed) {
            this._view = new CollectiblesView(this, this._windowManager);
            this.updateView();
        } else {
            this._view.showWindow();
        }
    }

    private showLootBoxReward(param1: BaseItemWrapper): void {
        if (!this._SafeStr_4459 || this._SafeStr_4459.disposed) {
            this._SafeStr_4459 = new CollectiblesRewardBoxView(this, this._windowManager);
            this._SafeStr_4459.showReward(param1, true);
        } else {
            this._SafeStr_4459.showReward(param1, false);
        }
    }

    public onSilverBalance(param1: PurseEvent): void {
        this.updateView();
    }

    private onEmeraldBalance(param1: PurseEvent): void {
        this.updateView();
    }

    private onInventoryInitialize(param1: HabboInventoryCategoryInitializeEvent): void {
        let _loc2_: string = param1.category;
        if (this._view != null && this._view.mintInventoryListWidget != null) {
            this._view.mintInventoryListWidget.onInventoryInitialize(_loc2_);
        }
    }

    protected override initInstanceFields(): void {
        this.onRedeemLootBoxStateEvent = this.onRedeemLootBoxStateEvent.bind(this);
        this.onRedeemLootBoxResultEvent = this.onRedeemLootBoxResultEvent.bind(this);
        this.onSilverBalance = this.onSilverBalance.bind(this);
        this.onEmeraldBalance = this.onEmeraldBalance.bind(this);
        this.onInventoryInitialize = this.onInventoryInitialize.bind(this);
        this._disposed_CollectiblesController = false;
        this._SafeStr_6247 = -1;
        this._SafeStr_6627 = "";
        this._SafeStr_2864 = 0;
        super.initInstanceFields();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (CollectiblesController.#staticsReady) return;
        CollectiblesController.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(CollectiblesController, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.collectibles.CollectiblesController"));
    }
}
