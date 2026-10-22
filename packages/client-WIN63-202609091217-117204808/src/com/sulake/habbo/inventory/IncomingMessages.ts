import { asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { FurniData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniData';
import type { TradeNftAssetInventoryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/trading/TradeNftAssetInventoryMessageParser';
import type { TradeNftAssetsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/trading/TradeNftAssetsMessageParser';
import type { TradeNftItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/trading/TradeNftItem';
import type { AvatarEffectActivatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/avatareffect/AvatarEffectActivatedMessageParser';
import type { AvatarEffectAddedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/avatareffect/AvatarEffectAddedMessageParser';
import type { AvatarEffectExpiredMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/avatareffect/AvatarEffectExpiredMessageParser';
import type { AvatarEffectsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/avatareffect/AvatarEffectsMessageParser';
import type { BadgePointLimitsParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/badges/BadgePointLimitsParser';
import type { BadgeReceivedParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/badges/BadgeReceivedParser';
import type { BadgesParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/badges/BadgesParser';
import type { BotAddedToInventoryParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/bots/BotAddedToInventoryParser';
import type { BotInventoryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/bots/BotInventoryMessageParser';
import type { BotRemovedFromInventoryParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/bots/BotRemovedFromInventoryParser';
import type { FurniListAddOrUpdateParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/furni/FurniListAddOrUpdateParser';
import type { FurniListParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/furni/FurniListParser';
import type { FurniListRemoveMultipleParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/furni/FurniListRemoveMultipleParser';
import type { FurniListRemoveParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/furni/FurniListRemoveParser';
import type { PostItPlacedParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/furni/PostItPlacedParser';
import type { PetAddedToInventoryParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetAddedToInventoryParser';
import type { PetInventoryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetInventoryMessageParser';
import type { PetRemovedFromInventoryParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetRemovedFromInventoryParser';
import type { MarketplaceCanMakeOfferResultParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceCanMakeOfferResultParser';
import type { MarketplaceConfigurationParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceConfigurationParser';
import type { MarketplaceItemStatsParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceItemStatsParser';
import type { MarketplaceMakeOfferResultParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceMakeOfferResultParser';
import type { FlatAccessDeniedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/FlatAccessDeniedMessageParser';
import type { HabboAchievementNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/HabboAchievementNotificationMessageParser';
import type { TradeRequirement } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/TradeRequirement';
import type { WiredTradeInitiateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/WiredTradeInitiateMessageParser';
import type { WiredTradeItemsUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/WiredTradeItemsUpdateMessageParser';
import type { ScrSendUserInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/ScrSendUserInfoMessageParser';
import type { BadgesModel } from '@/com/sulake/habbo/inventory/badges/BadgesModel';
import type { BotsModel } from '@/com/sulake/habbo/inventory/bots/BotsModel';
import type { CollectiblesModel } from '@/com/sulake/habbo/inventory/collectibles/CollectiblesModel';
import type { EffectsModel } from '@/com/sulake/habbo/inventory/effects/EffectsModel';
import type { FurniModel } from '@/com/sulake/habbo/inventory/furni/FurniModel';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { MarketplaceModel } from '@/com/sulake/habbo/inventory/marketplace/MarketplaceModel';
import type { PetsModel } from '@/com/sulake/habbo/inventory/pets/PetsModel';
import type { WiredTradingModel } from '@/com/sulake/habbo/inventory/wired_trading/WiredTradingModel';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { MarketplaceItemStats } from '@/com/sulake/habbo/catalog/marketplace/MarketplaceItemStats';
import { NotEnoughBalanceMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/NotEnoughBalanceMessageEvent';
import { TradeNftAssetInventoryMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/trading/TradeNftAssetInventoryMessageEvent';
import { TradeNftAssetsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/trading/TradeNftAssetsMessageEvent';
import { UserRightsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserRightsMessageEvent';
import { AchievementsScoreEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/achievements/AchievementsScoreEvent';
import { AvatarEffect } from '@/com/sulake/habbo/communication/messages/incoming/inventory/avatareffect/AvatarEffect';
import { AvatarEffectActivatedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/avatareffect/AvatarEffectActivatedMessageEvent';
import { AvatarEffectAddedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/avatareffect/AvatarEffectAddedMessageEvent';
import { AvatarEffectExpiredMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/avatareffect/AvatarEffectExpiredMessageEvent';
import { AvatarEffectsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/avatareffect/AvatarEffectsMessageEvent';
import { BadgePointLimitsEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/badges/BadgePointLimitsEvent';
import { BadgeReceivedEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/badges/BadgeReceivedEvent';
import { BadgesEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/badges/BadgesEvent';
import { BotAddedToInventoryEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/bots/BotAddedToInventoryEvent';
import { BotInventoryEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/bots/BotInventoryEvent';
import { BotRemovedFromInventoryEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/bots/BotRemovedFromInventoryEvent';
import { FigureSetIdsEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/clothing/FigureSetIdsEvent';
import { FurniListAddOrUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniListAddOrUpdateEvent';
import { FurniListEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniListEvent';
import { FurniListInvalidateEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniListInvalidateEvent';
import { FurniListRemoveEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniListRemoveEvent';
import { FurniListRemoveMultipleEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniListRemoveMultipleEvent';
import { PostItPlacedEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/PostItPlacedEvent';
import { GoToBreedingNestFailureEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/pets/GoToBreedingNestFailureEvent';
import { PetAddedToInventoryEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/pets/PetAddedToInventoryEvent';
import { PetInventoryEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/pets/PetInventoryEvent';
import { PetRemovedFromInventoryEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/pets/PetRemovedFromInventoryEvent';
import { ItemDataStructure } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/ItemDataStructure';
import { TradeOpenFailedEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradeOpenFailedEvent';
import { TradeSilverFeeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradeSilverFeeMessageEvent';
import { TradeSilverSetMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradeSilverSetMessageEvent';
import { TradingAcceptEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingAcceptEvent';
import { TradingCloseEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingCloseEvent';
import { TradingCompletedEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingCompletedEvent';
import { TradingConfirmationEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingConfirmationEvent';
import { TradingItemListEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingItemListEvent';
import { TradingNotOpenEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingNotOpenEvent';
import { TradingOpenEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingOpenEvent';
import { TradingOtherNotAllowedEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingOtherNotAllowedEvent';
import { TradingYouAreNotAllowedEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingYouAreNotAllowedEvent';
import { MarketplaceCanMakeOfferResult } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceCanMakeOfferResult';
import { MarketplaceConfigurationEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceConfigurationEvent';
import { MarketplaceItemStatsEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceItemStatsEvent';
import { MarketplaceMakeOfferResult } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceMakeOfferResult';
import { FlatAccessDeniedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/FlatAccessDeniedMessageEvent';
import { HabboAchievementNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/HabboAchievementNotificationMessageEvent';
import { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import { CloseConnectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/CloseConnectionMessageEvent';
import { OpenConnectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/OpenConnectionMessageEvent';
import { WiredTradeCancelledMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/trade/WiredTradeCancelledMessageEvent';
import { WiredTradeCompletedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/trade/WiredTradeCompletedMessageEvent';
import { WiredTradeInitiateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/trade/WiredTradeInitiateMessageEvent';
import { WiredTradeItemsUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/trade/WiredTradeItemsUpdateMessageEvent';
import { HabboUserBadgesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboUserBadgesMessageEvent';
import { ScrSendUserInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/ScrSendUserInfoEvent';
import { AchievementsScoreMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/achievements/AchievementsScoreMessageParser';
import { TradeOpenFailedParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradeOpenFailedParser';
import { TradingAcceptParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingAcceptParser';
import { TradingCloseParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingCloseParser';
import { TradingCompletedParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingCompletedParser';
import { TradingConfirmationParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingConfirmationParser';
import { TradingItemListParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingItemListParser';
import { TradingNotOpenParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingNotOpenParser';
import { TradingOpenParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingOpenParser';
import { TradingOtherNotAllowedParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingOtherNotAllowedParser';
import { TradingYouAreNotAllowedParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingYouAreNotAllowedParser';
import { WiredTradeCancelledMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/WiredTradeCancelledMessageParser';
import { CollectibleGroupedItem } from '@/com/sulake/habbo/inventory/collectibles/CollectibleGroupedItem';
import { Effect } from '@/com/sulake/habbo/inventory/effects/Effect';
import { HabboInventoryFurniListParsedEvent } from '@/com/sulake/habbo/inventory/events/HabboInventoryFurniListParsedEvent';
import { HabboInventoryHabboClubEvent } from '@/com/sulake/habbo/inventory/events/HabboInventoryHabboClubEvent';
import { FurnitureItem } from '@/com/sulake/habbo/inventory/items/FurnitureItem';
import { GroupItem } from '@/com/sulake/habbo/inventory/items/GroupItem';
import { TradingModel } from '@/com/sulake/habbo/inventory/trading/TradingModel';
import { Logger } from '@/com/sulake/habbo/Logger';

export class IncomingMessages {
    static { registerClassName(this, 'com.sulake.habbo.inventory::IncomingMessages'); }

    private static readonly GROUPED_FURNI_TYPE: string = "credit_groupitem_type_id";

    declare private _inventory: HabboInventory;

    declare private _com: IHabboCommunicationManager;

    declare private _SafeStr_4455: UtilsMap[];

    declare private _SafeStr_4561: UtilsMap[];

    declare private _SafeStr_8187: UtilsMap[];

    declare private _SafeStr_4273: UtilsMap[];

    declare private _SafeStr_2373: number;
    static { (this.prototype as any)._SafeStr_2373 = 0; }

    constructor(param1: HabboInventory) {
        this._inventory = param1;
        this._com = this._inventory.communication;
        this._com.addHabboConnectionMessageEvent(new AchievementsScoreEvent(this.onAchievementsScore));
        this._com.addHabboConnectionMessageEvent(new TradingItemListEvent(this.onTradingItemList, TradingItemListParser));
        this._com.addHabboConnectionMessageEvent(new PostItPlacedEvent(this.onPostItPlaced));
        this._com.addHabboConnectionMessageEvent(new FurniListRemoveMultipleEvent(this.onFurniListRemoveMultiple));
        this._com.addHabboConnectionMessageEvent(new GoToBreedingNestFailureEvent(this.onGoToBreedingNestFailure));
        this._com.addHabboConnectionMessageEvent(new TradingNotOpenEvent(this.onTradingNotOpen, TradingNotOpenParser));
        this._com.addHabboConnectionMessageEvent(new ScrSendUserInfoEvent(this.onClubStatus));
        this._com.addHabboConnectionMessageEvent(new BadgePointLimitsEvent(this.onBadgePointLimits));
        this._com.addHabboConnectionMessageEvent(new WiredTradeCancelledMessageEvent(this.onWiredTradeCancelled));
        this._com.addHabboConnectionMessageEvent(new BotRemovedFromInventoryEvent(this.onBotRemoved));
        this._com.addHabboConnectionMessageEvent(new MarketplaceMakeOfferResult(this.onMarketplaceMakeOfferResult));
        this._com.addHabboConnectionMessageEvent(new FurniListAddOrUpdateEvent(this.onFurnitureAddOrUpdate));
        this._com.addHabboConnectionMessageEvent(new FigureSetIdsEvent(this.onFigureSetIds));
        this._com.addHabboConnectionMessageEvent(new MarketplaceCanMakeOfferResult(this.onMarketplaceCanMakeOfferResult));
        this._com.addHabboConnectionMessageEvent(new OpenConnectionMessageEvent(this.onRoomLeft));
        this._com.addHabboConnectionMessageEvent(new BadgeReceivedEvent(this.onBadgeReceived));
        this._com.addHabboConnectionMessageEvent(new TradingCloseEvent(this.onTradingClose, TradingCloseParser));
        this._com.addHabboConnectionMessageEvent(new TradeSilverSetMessageEvent(this.onTradeSilverSet));
        this._com.addHabboConnectionMessageEvent(new PetInventoryEvent(this.onPets));
        this._com.addHabboConnectionMessageEvent(new BotAddedToInventoryEvent(this.onBotAdded));
        this._com.addHabboConnectionMessageEvent(new TradingCompletedEvent(this.onTradingCompleted, TradingCompletedParser));
        this._com.addHabboConnectionMessageEvent(new TradingOtherNotAllowedEvent(this.onTradingOtherNotAllowed, TradingOtherNotAllowedParser));
        this._com.addHabboConnectionMessageEvent(new WiredTradeCompletedMessageEvent(this.onWiredTradeCompleted));
        this._com.addHabboConnectionMessageEvent(new FurniListInvalidateEvent(this.onFurniListInvalidate));
        this._com.addHabboConnectionMessageEvent(new AvatarEffectActivatedMessageEvent(this.onAvatarEffectActivated));
        this._com.addHabboConnectionMessageEvent(new AvatarEffectsMessageEvent(this.onAvatarEffects));
        this._com.addHabboConnectionMessageEvent(new BotInventoryEvent(this.onBots));
        this._com.addHabboConnectionMessageEvent(new FurniListEvent(this.onFurniList));
        this._com.addHabboConnectionMessageEvent(new MarketplaceItemStatsEvent(this.onMarketplaceItemStats));
        this._com.addHabboConnectionMessageEvent(new TradingYouAreNotAllowedEvent(this.onTradingYouAreNotAllowed, TradingYouAreNotAllowedParser));
        this._com.addHabboConnectionMessageEvent(new CloseConnectionMessageEvent(this.onRoomLeft));
        this._com.addHabboConnectionMessageEvent(new NotEnoughBalanceMessageEvent(this.onNotEnoughCredits));
        this._com.addHabboConnectionMessageEvent(new HabboUserBadgesMessageEvent(this.onUserBadges));
        this._com.addHabboConnectionMessageEvent(new PetAddedToInventoryEvent(this.onPetAdded));
        this._com.addHabboConnectionMessageEvent(new UserRightsMessageEvent(this.onUserRights));
        this._com.addHabboConnectionMessageEvent(new WiredTradeItemsUpdateMessageEvent(this.onWiredTradeItemsUpdate));
        this._com.addHabboConnectionMessageEvent(new WiredTradeInitiateMessageEvent(this.onWiredTradeInitiate));
        this._com.addHabboConnectionMessageEvent(new HabboAchievementNotificationMessageEvent(this.onAchievementReceived));
        this._com.addHabboConnectionMessageEvent(new TradingConfirmationEvent(this.onTradingConfirmation, TradingConfirmationParser));
        this._com.addHabboConnectionMessageEvent(new BadgesEvent(this.onBadges));
        this._com.addHabboConnectionMessageEvent(new RoomEntryInfoMessageEvent(this.onRoomEnter));
        this._com.addHabboConnectionMessageEvent(new MarketplaceConfigurationEvent(this.onMarketplaceConfiguration));
        this._com.addHabboConnectionMessageEvent(new TradingAcceptEvent(this.onTradingAccepted, TradingAcceptParser));
        this._com.addHabboConnectionMessageEvent(new FurniListRemoveEvent(this.onFurniListRemove));
        this._com.addHabboConnectionMessageEvent(new TradeOpenFailedEvent(this.onTradingOpenFailed, TradeOpenFailedParser));
        this._com.addHabboConnectionMessageEvent(new FlatAccessDeniedMessageEvent(this.onFlatAccessDenied));
        this._com.addHabboConnectionMessageEvent(new TradingOpenEvent(this.onTradingOpen, TradingOpenParser));
        this._com.addHabboConnectionMessageEvent(new AvatarEffectAddedMessageEvent(this.onAvatarEffectAdded));
        this._com.addHabboConnectionMessageEvent(new TradeNftAssetsMessageEvent(this.onTradeNfts));
        this._com.addHabboConnectionMessageEvent(new AvatarEffectExpiredMessageEvent(this.onAvatarEffectExpired));
        this._com.addHabboConnectionMessageEvent(new PetRemovedFromInventoryEvent(this.onPetRemoved));
        this._com.addHabboConnectionMessageEvent(new TradeSilverFeeMessageEvent(this.onTradeSilverFee));
        this._com.addHabboConnectionMessageEvent(new TradeNftAssetInventoryMessageEvent(this.onCollectibles));
    }

    public dispose(): void {
        this._inventory = null;
        this._com = null;
    }

    public onFurniList = (param1: FurniListEvent): void => {
        let _loc4_: FurniListParser = param1.getParser();
        if (_loc4_ == null) {
            return;
        }
        if (!this._inventory.isMainViewInitialized) {
            this._inventory.initializeFurniturePage();
        }
        let _loc2_: FurniModel = this._inventory.furniModel;
        if (_loc2_ == null) {
            return;
        }
        if (this._SafeStr_4561 == null) {
            this._SafeStr_4561 = new Array<UtilsMap>(_loc4_.totalFragments >>> 0).fill(null);
        }
        let _loc5_: UtilsMap = new UtilsMap();
        _loc5_.concatenate(_loc4_.furniFragment);
        let _loc3_: UtilsMap = this.addMessageFragment(_loc5_, _loc4_.totalFragments, _loc4_.fragmentNo, this._SafeStr_4561);
        if (!_loc3_) {
            return;
        }
        _loc2_.insertFurniture(_loc3_);
        this._SafeStr_4561 = null;
        this._inventory.events.dispatchEvent(new HabboInventoryFurniListParsedEvent("furni"));
    };

    public onFurnitureAddOrUpdate = (param1: IMessageEvent): void => {
        let _loc2_: FurnitureItem = null;
        let _loc5_: GroupItem = null;
        let _loc3_: FurniListAddOrUpdateParser = (param1 instanceof FurniListAddOrUpdateEvent ? param1 : null).getParser();
        if (_loc3_ == null) {
            return;
        }
        let _loc7_: FurniModel = this._inventory.furniModel;
        if (_loc7_ == null || !_loc7_.isListInited()) {
            return;
        }
        let _loc8_: GroupItem[] = [];
        let _loc6_: FurniData[] = _loc3_.getFurni();
        for (const _loc4_ of _loc6_ ?? []) {
            _loc5_ = _loc7_.getItemWithStripId(_loc4_.itemId);
            if (_loc5_) {
                _loc2_ = _loc5_.getItem(_loc4_.itemId);
                if (_loc2_) {
                    _loc2_.update(_loc4_);
                    _loc5_.hasUnseenItems = true;
                }
            } else {
                _loc2_ = new FurnitureItem(_loc4_);
                _loc5_ = _loc7_.addOrUpdateItem(_loc2_, false);
                _loc8_.push(_loc5_);
            }
        }
        if (_loc8_.length > 0) {
            _loc7_.updateUnseenItemsThumbs(_loc8_, false);
        }
        _loc7_.setViewToState();
        _loc7_.updateView();
    };

    public onFurniListRemove = (param1: IMessageEvent): void => {
        let _loc2_: FurniListRemoveParser = (param1 instanceof FurniListRemoveEvent ? param1 : null).getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc5_: FurniModel = this._inventory.furniModel;
        if (_loc5_ == null) {
            return;
        }
        let _loc4_: number = _loc2_.stripId;
        let _loc3_: GroupItem = _loc5_.removeFurni(_loc4_);
        if (_loc3_) {
            _loc5_.resetUnseenItems();
        }
    };

    public onFurniListRemoveMultiple = (param1: IMessageEvent): void => {
        let _loc2_: FurniListRemoveMultipleParser = (param1 instanceof FurniListRemoveMultipleEvent ? param1 : null).getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: FurniModel = this._inventory.furniModel;
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: boolean = _loc4_.removeFurnis(_loc2_.stripIds);
        if (_loc3_) {
            _loc4_.resetUnseenItems();
        }
    };

    public onFurniListInvalidate = (param1: IMessageEvent): void => {
        this._inventory.setInventoryCategoryInit("furni", false);
        this._inventory.setInventoryCategoryInit("rentables", false);
    };

    public onPostItPlaced = (param1: IMessageEvent): void => {
        let _loc2_: PostItPlacedParser = (param1 instanceof PostItPlacedEvent ? param1 : null).getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: FurniModel = this._inventory.furniModel;
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: number = _loc2_.id;
        let _loc5_: number = _loc2_.itemsLeft;
        _loc3_.updatePostItCount(_loc4_, _loc5_);
    };

    public onAvatarEffects = (param1: IMessageEvent): void => {
        let _loc5_: number = 0;
        let _loc4_: AvatarEffect = null;
        let _loc7_: Effect = null;
        if (this._inventory == null) {
            return;
        }
        let _loc6_: EffectsModel = this._inventory.effectsModel;
        if (_loc6_ == null) {
            return;
        }
        let _loc3_: AvatarEffectsMessageParser = (param1 instanceof AvatarEffectsMessageEvent ? param1 : null).getParser();
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: any[] = _loc3_.effects;
        _loc5_ = 0;
        while (_loc5_ < _loc2_.length) {
            _loc4_ = asInstanceOf(_loc2_[_loc5_], AvatarEffect);
            _loc7_ = new Effect();
            _loc7_.type = _loc4_.type;
            _loc7_.subType = _loc4_.subType;
            _loc7_.duration = _loc4_.duration;
            _loc7_.isPermanent = _loc4_.isPermanent;
            _loc7_.amountInInventory = _loc4_.inactiveEffectsInInventory;
            if (_loc4_.secondsLeftIfActive >= 0) {
                _loc7_.isActive = true;
                _loc7_.secondsLeft = _loc4_.secondsLeftIfActive;
                _loc7_.amountInInventory++;
            } else if (_loc4_.secondsLeftIfActive == -1) {
                _loc7_.isActive = false;
                _loc7_.secondsLeft = _loc4_.duration;
            }
            _loc6_.addEffect(_loc7_, false);
            _loc5_++;
        }
        this._inventory.setInventoryCategoryInit("effects");
        _loc6_.refreshViews();
        this._inventory.notifyChangedEffects();
    };

    public onAvatarEffectAdded = (param1: IMessageEvent): void => {
        let _loc5_: EffectsModel = this._inventory.effectsModel;
        if (_loc5_ == null) {
            return;
        }
        let _loc2_: AvatarEffectAddedMessageParser = (param1 instanceof AvatarEffectAddedMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc7_: number = _loc2_.type;
        let _loc6_: number = _loc2_.subType;
        let _loc8_: number = _loc2_.duration;
        let _loc3_: boolean = _loc2_.isPermanent;
        let _loc4_: Effect = new Effect();
        _loc4_.type = _loc7_;
        _loc4_.subType = _loc6_;
        _loc4_.duration = _loc8_;
        _loc4_.isPermanent = _loc3_;
        _loc4_.secondsLeft = _loc8_;
        _loc5_.addEffect(_loc4_);
        this._inventory.notifyChangedEffects();
    };

    public onAvatarEffectActivated = (param1: IMessageEvent): void => {
        let _loc3_: EffectsModel = this._inventory.effectsModel;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: AvatarEffectActivatedMessageParser = (param1 instanceof AvatarEffectActivatedMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: number = _loc2_.type;
        _loc3_.setEffectActivated(_loc4_);
        this._inventory.notifyChangedEffects();
    };

    public onAvatarEffectExpired = (param1: IMessageEvent): void => {
        let _loc3_: EffectsModel = this._inventory.effectsModel;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: AvatarEffectExpiredMessageParser = (param1 instanceof AvatarEffectExpiredMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: number = _loc2_.type;
        _loc3_.setEffectExpired(_loc4_);
        this._inventory.notifyChangedEffects();
    };

    public onClubStatus = (param1: IMessageEvent): void => {
        let _loc2_: ScrSendUserInfoMessageParser = (param1 instanceof ScrSendUserInfoEvent ? param1 : null).getParser();
        if (_loc2_.productName == "habbo_club" || _loc2_.productName == "club_habbo") {
            this._inventory.setClubStatus(_loc2_.periodsSubscribedAhead, _loc2_.daysToPeriodEnd, _loc2_.hasEverBeenMember, _loc2_.isVIP, _loc2_.responseType == 3, _loc2_.responseType == 4, _loc2_.minutesUntilExpiration, _loc2_.minutesSinceLastModified);
            this._inventory.events.dispatchEvent(new HabboInventoryHabboClubEvent());
        }
    };

    public onBadges = (param1: IMessageEvent): void => {
        let _loc3_: BadgesParser = (param1 instanceof BadgesEvent ? param1 : null).getParser();
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: BadgesModel = this._inventory.badgesModel;
        if (_loc4_ == null) {
            return;
        }
        if (this._SafeStr_4273 == null) {
            this._SafeStr_2373 = getTimer();
            this._SafeStr_4273 = new Array<UtilsMap>(_loc3_.totalFragments >>> 0).fill(null);
        }
        let _loc5_: UtilsMap = new UtilsMap();
        _loc5_.concatenate(_loc3_.currentFragment);
        let _loc2_: UtilsMap = this.addMessageFragment(_loc5_, _loc3_.totalFragments, _loc3_.fragmentNo, this._SafeStr_4273);
        if (!_loc2_) {
            return;
        }
        this._SafeStr_4273 = null;
        let _loc6_: number = getTimer() - this._SafeStr_2373;
        this._SafeStr_2373 = 0;
        Logger.log("Parsing badges took: " + _loc6_ + "ms");
        this._SafeStr_2373 = getTimer();
        _loc4_.initBadges(_loc2_);
        _loc6_ = getTimer() - this._SafeStr_2373;
        this._SafeStr_2373 = 0;
        Logger.log("Initializing badges took: " + _loc6_ + "ms");
        _loc4_.updateView();
        this._inventory.setInventoryCategoryInit("badges");
    };

    public onCollectibles = (param1: IMessageEvent): void => {
        let _loc3_: TradeNftAssetInventoryMessageParser = (param1 instanceof TradeNftAssetInventoryMessageEvent ? param1 : null).getParser();
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: CollectiblesModel = this._inventory.collectiblesModel;
        if (_loc4_ == null) {
            return;
        }
        let _loc5_: UtilsMap = new UtilsMap();
        for (const _loc2_ of _loc3_.items ?? []) {
            _loc5_.add(_loc2_.assetId, _loc2_);
        }
        _loc4_.initCollectibles(_loc5_);
    };

    public onTradeNfts = (param1: IMessageEvent): void => {
        let _loc2_: TradeNftAssetsMessageParser = (param1 instanceof TradeNftAssetsMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: CollectiblesModel = this._inventory.collectiblesModel;
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: UtilsMap = this.parseNftTradeMap(_loc2_.myItems, _loc4_);
        let _loc5_: UtilsMap = this.parseNftTradeMap(_loc2_.theirItems, _loc4_);
        let _loc6_: TradingModel = this._inventory.tradingModel;
        if (_loc6_ == null) {
            return;
        }
        _loc6_.updateNftItems(_loc3_, _loc5_, _loc2_.myItems.length, _loc2_.theirItems.length);
    };

    public parseNftTradeMap(param1: TradeNftItem[], param2: CollectiblesModel): UtilsMap {
        let _loc6_: string = null;
        let _loc7_: CollectibleGroupedItem = null;
        let _loc4_: any = undefined;
        let _loc5_: UtilsMap = new UtilsMap();
        for (const _loc3_ of param1 ?? []) {
            _loc6_ = _loc3_.productCode;
            _loc7_ = _loc5_.getValue(_loc6_);
            if (_loc7_ == null) {
                _loc4_ = [];
                _loc4_.push(_loc3_.assetId);
                _loc7_ = new CollectibleGroupedItem(_loc3_, _loc4_, param2);
                _loc5_.add(_loc6_, _loc7_);
                _loc7_.initializeImage();
            } else {
                _loc7_.addAssetId(_loc3_.assetId);
            }
        }
        return _loc5_;
    }

    public onBadgePointLimits = (param1: IMessageEvent): void => {
        let _loc2_: BadgePointLimitsParser = (param1 instanceof BadgePointLimitsEvent ? param1 : null).getParser();
        for (const _loc3_ of _loc2_.data ?? []) {
            this._inventory.localization.setBadgePointLimit(stringOrNull(_loc3_.badgeId), _loc3_.limit | 0);
        }
    };

    public onUserBadges = (param1: IMessageEvent): void => {
        let _loc2_: HabboUserBadgesMessageEvent = param1 instanceof HabboUserBadgesMessageEvent ? param1 : null;
        if (_loc2_.userId != this._inventory.sessionData.userId) {
            return;
        }
        let _loc4_: BadgesModel = this._inventory.badgesModel;
        if (_loc4_ == null) {
            return;
        }
        this._SafeStr_2373 = getTimer();
        for (const _loc3_ of _loc2_.selectedBadges ?? []) {
            _loc4_.updateBadge(stringOrNull(_loc3_.badgeCode), true, 0, _loc3_.ownerCount | 0, _loc3_.badgeRarityId | 0);
        }
        let _loc5_: number = getTimer() - this._SafeStr_2373;
        this._SafeStr_2373 = 0;
        Logger.log("Updating badges " + _loc2_.selectedBadges.length + "took: " + _loc5_ + "ms");
        this._SafeStr_2373 = getTimer();
        _loc4_.updateView();
        _loc5_ = getTimer() - this._SafeStr_2373;
        this._SafeStr_2373 = 0;
        Logger.log("Updating badge view took: " + _loc5_ + "ms");
    };

    public onAchievementReceived = (param1: IMessageEvent): void => {
        let _loc4_: HabboAchievementNotificationMessageEvent = param1 instanceof HabboAchievementNotificationMessageEvent ? param1 : null;
        let _loc3_: HabboAchievementNotificationMessageParser = _loc4_.getParser();
        let _loc2_: BadgesModel = this._inventory.badgesModel;
        if (_loc2_ != null) {
            _loc2_.updateBadge(_loc3_.data.badgeCode, false, _loc3_.data.badgeId, _loc3_.data.ownerCount, _loc3_.data.badgeRarityId);
            _loc2_.removeBadge(_loc3_.data.removedBadgeCode);
            _loc2_.updateView();
        }
    };

    public onBadgeReceived = (param1: IMessageEvent): void => {
        let _loc3_: BadgeReceivedParser = castTo(param1, BadgeReceivedEvent).getParser();
        let _loc2_: BadgesModel = this._inventory.badgesModel;
        if (_loc2_ != null) {
            _loc2_.updateBadge(_loc3_.badgeCode, false, _loc3_.badgeId, _loc3_.ownerCount, _loc3_.badgeRarityId);
            _loc2_.updateView();
        }
    };

    public onAchievementsScore = (param1: IMessageEvent): void => {
        let _loc2_: AchievementsScoreEvent = param1 instanceof AchievementsScoreEvent ? param1 : null;
        let _loc3_: AchievementsScoreMessageParser = asInstanceOf(_loc2_.getParser(), AchievementsScoreMessageParser);
        if (_loc3_ == null) {
            return;
        }
        this._inventory.localization.registerParameter("achievements_score_description", "score", _loc3_.score.toString());
    };

    private onTradingOpen = (param1: IMessageEvent): void => {
        let _loc14_: number = 0;
        if (!this._inventory) {
            ErrorReportStorage.addDebugData("IncomingEvent", "Trading open - inventory is null!");
            return;
        }
        let _loc2_: ISessionDataManager = this._inventory.sessionData;
        let _loc17_: IRoomSession = this._inventory.roomSession;
        if (!_loc2_) {
            ErrorReportStorage.addDebugData("IncomingEvent", "Trading open - sessionData not available!");
            return;
        }
        if (!_loc17_) {
            ErrorReportStorage.addDebugData("IncomingEvent", "Trading open - roomSession not available!");
            return;
        }
        this._inventory.toggleInventorySubPage("trading");
        let _loc6_: TradingOpenEvent = param1 instanceof TradingOpenEvent ? param1 : null;
        if (!_loc6_) {
            ErrorReportStorage.addDebugData("IncomingEvent", "event is of unknown type:" + param1 + "!");
            return;
        }
        let _loc9_: number = _loc6_.userID;
        let _loc3_: IUserData = _loc17_.userDataManager.getUserData(_loc9_);
        if (!_loc3_) {
            ErrorReportStorage.addDebugData("IncomingEvent", "Trading open - failed to retrieve own user data!");
            return;
        }
        let _loc7_: string = _loc3_.name;
        let _loc5_: boolean = Number(_loc6_.userCanTrade) > 0;
        let _loc15_: number = _loc6_.otherUserID;
        let _loc16_: IUserData = _loc17_.userDataManager.getUserData(_loc15_);
        if (!_loc16_) {
            ErrorReportStorage.addDebugData("IncomingEvent", "Trading open - failed to retrieve other user data!");
            return;
        }
        let _loc12_: string = _loc16_.name;
        let _loc11_: boolean = Number(_loc6_.otherUserCanTrade) > 0;
        let _loc4_: boolean = _loc15_ == _loc2_.userId;
        if (_loc15_ == _loc2_.userId) {
            _loc14_ = _loc9_;
            let _loc10_: string = _loc7_;
            let _loc8_: boolean = _loc5_;
            _loc9_ = _loc15_;
            _loc7_ = _loc12_;
            _loc5_ = _loc11_;
            _loc15_ = _loc14_;
            _loc12_ = _loc10_;
            _loc11_ = _loc8_;
        }
        let _loc13_: TradingModel = this._inventory.tradingModel;
        if (_loc13_ != null) {
            _loc13_.startTrading(_loc9_, _loc7_, _loc5_, _loc15_, _loc12_, _loc11_, _loc4_);
        }
    };

    private onTradingOpenFailed = (param1: IMessageEvent): void => {
        let _loc2_: TradingModel = this._inventory.tradingModel;
        if (_loc2_ != null) {
            _loc2_.handleMessageEvent(param1);
        }
    };

    private onTradingClose = (param1: IMessageEvent): void => {
        let _loc2_: TradingModel = this._inventory.tradingModel;
        if (_loc2_ != null) {
            _loc2_.handleMessageEvent(param1);
        }
    };

    private onTradingCompleted = (param1: IMessageEvent): void => {
        let _loc2_: TradingModel = this._inventory.tradingModel;
        if (_loc2_ != null) {
            _loc2_.handleMessageEvent(param1);
        }
    };

    private onTradingAccepted = (param1: IMessageEvent): void => {
        let _loc2_: TradingModel = this._inventory.tradingModel;
        if (_loc2_ != null) {
            _loc2_.handleMessageEvent(param1);
        }
    };

    private onTradeSilverFee = (param1: IMessageEvent): void => {
        let _loc2_: TradingModel = this._inventory.tradingModel;
        if (_loc2_ != null) {
            _loc2_.handleMessageEvent(param1);
        }
    };

    private onTradeSilverSet = (param1: IMessageEvent): void => {
        let _loc2_: TradingModel = this._inventory.tradingModel;
        if (_loc2_ != null) {
            _loc2_.handleMessageEvent(param1);
        }
    };

    private onTradingConfirmation = (param1: IMessageEvent): void => {
        let _loc2_: TradingModel = this._inventory.tradingModel;
        if (_loc2_ != null) {
            _loc2_.handleMessageEvent(param1);
        }
    };

    private onTradingItemList = (param1: IMessageEvent): void => {
        let _loc8_: GroupItem = null;
        let _loc2_: TradingItemListEvent = param1 instanceof TradingItemListEvent ? param1 : null;
        let _loc4_: UtilsMap = new UtilsMap();
        let _loc5_: UtilsMap = new UtilsMap();
        let _loc6_: number = this._inventory.sessionData.userId;
        let _loc3_: FurniModel = this._inventory.furniModel;
        if (_loc3_ == null) {
            return;
        }
        if (this._inventory.getBoolean("trading.warning.enabled") && _loc2_.secondUserNumCredits > 0) {
            _loc8_ = this._inventory.furniModel.createCreditGroupItem(_loc2_.secondUserNumCredits);
            _loc5_.add("credit_groupitem_type_id", _loc8_);
        }
        this.populateItemGroups(_loc2_.firstUserItemArray, _loc4_, _loc2_.firstUserID == _loc6_);
        this.populateItemGroups(_loc2_.secondUserItemArray, _loc5_, _loc2_.secondUserID == _loc6_);
        let _loc7_: TradingModel = this._inventory.tradingModel;
        if (_loc7_ != null) {
            _loc7_.updateItemGroupMaps(_loc2_, _loc4_, _loc5_);
        }
    };

    private populateItemGroups(param1: any[], param2: UtilsMap, param3: boolean): void {
        let _loc9_: GroupItem = null;
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc5_: string = null;
        let _loc4_: ItemDataStructure = null;
        let _loc6_: number = 0;
        let _loc10_: number = param1.length;
        _loc6_ = 0;
        while (_loc6_ < _loc10_) {
            _loc4_ = asInstanceOf(param1[_loc6_], ItemDataStructure);
            _loc7_ = _loc4_.itemTypeId;
            _loc8_ = _loc4_.category;
            _loc5_ = _loc4_.itemType + String(_loc7_);
            if (!_loc4_.isGroupable || this.isFurniExternalImage(_loc4_.itemTypeId)) {
                _loc5_ = "itemid" + _loc4_.itemId;
            }
            if (_loc4_.category == 6) {
                _loc5_ = String(_loc7_) + "poster" + _loc4_.stuffData.getLegacyString();
            } else if (_loc4_.category == 17) {
                _loc5_ = TradingModel.getGuildFurniType(_loc7_, _loc4_.stuffData);
            }
            _loc9_ = _loc4_.isGroupable && !this.isFurniExternalImage(_loc4_.itemTypeId) ? asInstanceOf(param2.getValue(_loc5_), GroupItem) : null;
            if (_loc9_ == null) {
                _loc9_ = this._inventory.furniModel.createGroupItem(_loc7_, _loc8_, _loc4_.stuffData);
                param2.add(_loc5_, _loc9_);
            }
            _loc9_.push(new FurnitureItem(_loc4_));
            _loc6_++;
        }
    }

    private isFurniExternalImage(param1: number): boolean {
        let _loc2_: IFurnitureData = this._inventory.getFurnitureData(param1, "i");
        return !!(_loc2_ && _loc2_.isExternalImageType);
    }

    private onTradingNotOpen = (param1: IMessageEvent): void => {
        let _loc2_: TradingModel = this._inventory.tradingModel;
        if (_loc2_ != null) {
            _loc2_.handleMessageEvent(param1);
        }
    };

    private onTradingOtherNotAllowed = (param1: IMessageEvent): void => {
        let _loc2_: TradingModel = this._inventory.tradingModel;
        if (_loc2_ != null) {
            _loc2_.handleMessageEvent(param1);
        }
    };

    private onTradingYouAreNotAllowed = (param1: IMessageEvent): void => {
        let _loc2_: TradingModel = this._inventory.tradingModel;
        if (_loc2_ != null) {
            _loc2_.handleMessageEvent(param1);
        }
    };

    private onRoomLeft = (param1: IMessageEvent): void => {
        this._inventory.closeView();
        this._inventory.furniModel.roomLeft();
    };

    private onFlatAccessDenied = (param1: IMessageEvent): void => {
        let _loc2_: FlatAccessDeniedMessageParser = (param1 instanceof FlatAccessDeniedMessageEvent ? param1 : null).getParser();
        if (this._inventory.sessionData == null || _loc2_.userName != this._inventory.sessionData.userName) {
            return;
        }
        this._inventory.closeView();
        this._inventory.furniModel.roomLeft();
    };

    private onPets = (param1: PetInventoryEvent): void => {
        if (param1 == null || this._inventory == null) {
            return;
        }
        let _loc4_: PetsModel = this._inventory.petsModel;
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: PetInventoryMessageParser = param1.getParser();
        if (this._SafeStr_4455 == null) {
            this._SafeStr_4455 = new Array<UtilsMap>(_loc3_.totalFragments >>> 0).fill(null);
        }
        let _loc5_: UtilsMap = new UtilsMap();
        _loc5_.concatenate(_loc3_.petListFragment);
        let _loc2_: UtilsMap = this.addMessageFragment(_loc5_, _loc3_.totalFragments, _loc3_.fragmentNo, this._SafeStr_4455);
        if (!_loc2_) {
            return;
        }
        this._inventory.petsModel.updatePets(_loc2_);
        this._SafeStr_4455 = null;
    };

    private onPetAdded = (param1: PetAddedToInventoryEvent): void => {
        if (param1 == null || this._inventory == null) {
            return;
        }
        let _loc3_: PetsModel = this._inventory.petsModel;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: PetAddedToInventoryParser = param1.getParser();
        _loc3_.addPet(_loc2_.pet);
        if (_loc2_.openInventory()) {
        }
    };

    private onGoToBreedingNestFailure = (param1: GoToBreedingNestFailureEvent): void => {
        if (param1 == null || this._inventory == null) {
            return;
        }
        let _loc2_: string = "${gotobreedingnestfailure.getnest}";
        let _loc3_: (...args: any[]) => any = this.getNest;
        if (param1.getParser().reason == 6) {
            _loc2_ = "${gotobreedingnestfailure.getfood}";
            _loc3_ = this.getFood;
        }
        this._inventory.windowManager.simpleAlert("${gotobreedingnestfailure.caption}", "${gotobreedingnestfailure.subtitle}", "${gotobreedingnestfailure.message." + param1.getParser().reason + "}", _loc2_, "", null, null, _loc3_);
    };

    private getNest = (): void => {
        let _loc1_: string = this._inventory.getProperty("gotobreedingnestfailure.catalogpage.nests");
        this._inventory.catalog.openCatalogPage(_loc1_);
    };

    private getFood = (): void => {
        let _loc1_: string = this._inventory.getProperty("gotobreedingnestfailure.catalogpage.food");
        this._inventory.catalog.openCatalogPage(_loc1_);
    };

    private onPetRemoved = (param1: PetRemovedFromInventoryEvent): void => {
        if (param1 == null || this._inventory == null) {
            return;
        }
        let _loc3_: PetsModel = this._inventory.petsModel;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: PetRemovedFromInventoryParser = param1.getParser();
        _loc3_.removePet(_loc2_.petId);
    };

    private onBots = (param1: BotInventoryEvent): void => {
        if (param1 == null || this._inventory == null) {
            return;
        }
        let _loc3_: BotsModel = this._inventory.botsModel;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: BotInventoryMessageParser = param1.getParser();
        _loc3_.updateItems(_loc2_.items);
        this._inventory.setInventoryCategoryInit("bots");
        _loc3_.setListInitialized();
    };

    private onBotRemoved = (param1: BotRemovedFromInventoryEvent): void => {
        if (param1 == null || this._inventory == null) {
            return;
        }
        let _loc3_: BotsModel = this._inventory.botsModel;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: BotRemovedFromInventoryParser = param1.getParser();
        _loc3_.removeItem(_loc2_.itemId);
    };

    private onBotAdded = (param1: BotAddedToInventoryEvent): void => {
        if (param1 == null || this._inventory == null) {
            return;
        }
        let _loc3_: BotsModel = this._inventory.botsModel;
        if (_loc3_ == null) {
            return;
        }
        if (_loc3_.items.length >= this._inventory.botsMax) {
            return;
        }
        let _loc2_: BotAddedToInventoryParser = param1.getParser();
        _loc3_.addItem(_loc2_.item);
    };

    private onMarketplaceConfiguration = (param1: MarketplaceConfigurationEvent): void => {
        if (param1 == null || this._inventory == null) {
            return;
        }
        let _loc4_: MarketplaceModel = this._inventory.marketplaceModel;
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: MarketplaceConfigurationParser = param1.getParser();
        _loc4_.isEnabled = _loc3_.isEnabled;
        _loc4_.commission = _loc3_.commission;
        _loc4_.tokenBatchPrice = _loc3_.tokenBatchPrice;
        _loc4_.tokenBatchSize = _loc3_.tokenBatchSize;
        _loc4_.offerMinPrice = _loc3_.offerMinPrice;
        _loc4_.offerMaxPrice = _loc3_.offerMaxPrice;
        _loc4_.expirationHours = _loc3_.expirationHours;
        _loc4_.averagePricePeriod = _loc3_.averagePricePeriod;
        _loc4_.sellingFeePercentage = _loc3_.sellingFeePercentage;
        _loc4_.revenueLimit = _loc3_.revenueLimit;
        _loc4_.halfTaxLimit = _loc3_.halfTaxLimit;
        this._inventory.setInventoryCategoryInit("marketplace");
        let _loc2_: FurniModel = this._inventory.furniModel;
        if (_loc2_ != null) {
            _loc2_.updateView();
        }
    };

    private onMarketplaceCanMakeOfferResult = (param1: MarketplaceCanMakeOfferResult): void => {
        if (param1 == null || this._inventory == null) {
            return;
        }
        let _loc3_: MarketplaceModel = this._inventory.marketplaceModel;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: MarketplaceCanMakeOfferResultParser = param1.getParser();
        _loc3_.proceedOfferMaking(_loc2_.resultCode, _loc2_.tokenCount);
    };

    private onMarketplaceMakeOfferResult = (param1: MarketplaceMakeOfferResult): void => {
        if (param1 == null || this._inventory == null) {
            return;
        }
        let _loc3_: MarketplaceModel = this._inventory.marketplaceModel;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: MarketplaceMakeOfferResultParser = param1.getParser();
        _loc3_.endOfferMaking(_loc2_.result);
    };

    private onMarketplaceItemStats = (param1: MarketplaceItemStatsEvent): void => {
        if (param1 == null || this._inventory == null) {
            return;
        }
        let _loc4_: MarketplaceModel = this._inventory.marketplaceModel;
        if (_loc4_ == null) {
            return;
        }
        let _loc2_: MarketplaceItemStatsParser = param1.getParser();
        let _loc3_: MarketplaceItemStats = new MarketplaceItemStats();
        _loc3_.averagePrice = _loc2_.averagePrice;
        _loc3_.offerCount = _loc2_.offerCount;
        _loc3_.historyLength = _loc2_.historyLength;
        _loc3_.dayOffsets = _loc2_.dayOffsets;
        _loc3_.averagePrices = _loc2_.averagePrices;
        _loc3_.soldAmounts = _loc2_.soldAmounts;
        _loc3_.furniCategoryId = _loc2_.furniCategoryId;
        _loc3_.furniTypeId = _loc2_.furniTypeId;
        _loc3_.lowestCurrentPrice = _loc2_.lowestCurrentPrice;
        _loc3_.suggestedPrice = _loc2_.suggestedPrice;
        _loc4_.setItemStats(_loc3_);
    };

    private onNotEnoughCredits = (param1: NotEnoughBalanceMessageEvent): void => {
        if (!param1 || !this._inventory) {
            return;
        }
        let _loc2_: MarketplaceModel = this._inventory.marketplaceModel;
        if (_loc2_ == null) {
            return;
        }
        _loc2_.onNotEnoughCredits();
    };

    private onUserRights = (param1: IMessageEvent): void => {
        let _loc2_: MarketplaceModel = null;
        if (this._inventory.isInventoryCategoryInit("marketplace")) {
            _loc2_ = this._inventory.marketplaceModel;
            if (_loc2_ == null) {
                return;
            }
            _loc2_.requestInitialization();
        }
    };

    private onFigureSetIds = (param1: FigureSetIdsEvent): void => {
        this._inventory.updatePurchasedFigureSetIds(param1.getParser().figureSetIds, param1.getParser().boundFurnitureNames);
    };

    private onRoomEnter = (param1: IMessageEvent): void => {
        if (this._inventory.getBoolean("effects.reactivate.on.room.entry")) {
            this._inventory.effectsModel.reactivateLastEffect();
        }
        this._inventory.furniModel.roomEntered();
    };

    private addMessageFragment(param1: UtilsMap, param2: number, param3: number, param4: UtilsMap[]): UtilsMap {
        if (param2 == 1) {
            return param1;
        }
        param4[param3] = param1;
        for (const _loc5_ of param4 ?? []) {
            if (_loc5_ == null) {
                return null;
            }
        }
        let _loc6_: UtilsMap = new UtilsMap();
        for (const _loc7_ of param4 ?? []) {
            _loc6_.concatenate(_loc7_);
            _loc7_.dispose();
        }
        param4 = null;
        return _loc6_;
    }

    private onWiredTradeInitiate = (param1: WiredTradeInitiateMessageEvent): void => {
        if (!this._inventory) {
            ErrorReportStorage.addDebugData("IncomingEvent", "Trading open - inventory is null!");
            return;
        }
        let _loc2_: ISessionDataManager = this._inventory.sessionData;
        let _loc8_: IRoomSession = this._inventory.roomSession;
        if (!_loc2_) {
            ErrorReportStorage.addDebugData("IncomingEvent", "Trading open - sessionData not available!");
            return;
        }
        if (!_loc8_) {
            ErrorReportStorage.addDebugData("IncomingEvent", "Trading open - roomSession not available!");
            return;
        }
        let _loc4_: WiredTradeInitiateMessageParser = param1.getParser();
        let _loc3_: TradeRequirement = _loc4_.requirement;
        if (_loc3_ != null && _loc3_.rules != null && _loc3_.rules.youGiveRule == null) {
            ErrorReportStorage.addDebugData("IncomingEvent", "Initiated a trade where the user gives nothing - not possible");
            return;
        }
        let _loc9_: boolean = _loc4_.showRequirementsImmediate;
        let _loc6_: boolean = _loc4_.overridePreviousTrade;
        let _loc5_: number = _loc4_.timeoutSeconds;
        let _loc7_: WiredTradingModel = this._inventory.wiredTradingModel;
        if (_loc7_ != null) {
            _loc7_.onWiredTradeInitiate(_loc3_, _loc9_, _loc6_, _loc5_);
        }
    };

    private onWiredTradeCancelled = (param1: WiredTradeCancelledMessageEvent): void => {
        this._inventory.wiredTradingModel.tradeIsCancelled((asInstanceOf(param1.getParser(), WiredTradeCancelledMessageParser)).transactionFailureTypeId);
    };

    private onWiredTradeCompleted = (param1: WiredTradeCompletedMessageEvent): void => {
        this._inventory.wiredTradingModel.tradeIsCompleted();
    };

    private onWiredTradeItemsUpdate = (param1: WiredTradeItemsUpdateMessageEvent): void => {
        let _loc8_: GroupItem = null;
        let _loc6_: UtilsMap = new UtilsMap();
        let _loc5_: UtilsMap = new UtilsMap();
        let _loc2_: FurniModel = this._inventory.furniModel;
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: WiredTradeItemsUpdateMessageParser = param1.getParser();
        let _loc3_: TradingItemListParser = _loc4_.tradingItems;
        if (_loc3_.secondUserNumCredits > 0) {
            _loc8_ = this._inventory.furniModel.createCreditGroupItem(_loc3_.secondUserNumCredits);
            _loc5_.add("credit_groupitem_type_id", _loc8_);
        }
        this.populateItemGroups(_loc3_.firstUserItemArray, _loc6_, true);
        this.populateItemGroups(_loc3_.secondUserItemArray, _loc5_, false);
        let _loc7_: WiredTradingModel = this._inventory.wiredTradingModel;
        if (_loc7_ != null) {
            _loc7_.updateItemGroupMaps(_loc3_, _loc6_, _loc5_, _loc4_.canAccept, _loc4_.extra);
        }
    };
}
