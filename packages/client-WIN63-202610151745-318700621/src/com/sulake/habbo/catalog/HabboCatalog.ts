import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLoaderStruct } from '@/com/sulake/core/assets/AssetLoaderStruct';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboAvatarEditor } from '@/com/sulake/habbo/avatar/IHabboAvatarEditor';
import type { ICollectorHub } from '@/com/sulake/habbo/catalog/collectibles/ICollectorHub';
import type { IHabboEarnings } from '@/com/sulake/habbo/catalog/earnings/IHabboEarnings';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IVideoOfferManager } from '@/com/sulake/habbo/catalog/IVideoOfferManager';
import type { IMarketPlace } from '@/com/sulake/habbo/catalog/marketplace/IMarketPlace';
import type { ICatalogNavigator } from '@/com/sulake/habbo/catalog/navigation/ICatalogNavigator';
import type { ICatalogNode } from '@/com/sulake/habbo/catalog/navigation/ICatalogNode';
import type { IOfferCenter } from '@/com/sulake/habbo/catalog/offers/IOfferCenter';
import type { IOfferExtension } from '@/com/sulake/habbo/catalog/offers/IOfferExtension';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import type { IRecycler } from '@/com/sulake/habbo/catalog/recycler/IRecycler';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { IDragAndDropDoneReceiver } from '@/com/sulake/habbo/catalog/viewer/IDragAndDropDoneReceiver';
import type { IPageLocalization } from '@/com/sulake/habbo/catalog/viewer/IPageLocalization';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { BundleDiscountRuleset } from '@/com/sulake/habbo/communication/messages/incoming/catalog/BundleDiscountRuleset';
import type { CatalogPageMessageOfferData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPageMessageOfferData';
import type { CatalogPageMessageProductData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPageMessageProductData';
import type { FrontPageItem } from '@/com/sulake/habbo/communication/messages/incoming/catalog/FrontPageItem';
import type { _SafeCls_6019 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6019';
import type { BuildersClubSubscriptionStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/BuildersClubSubscriptionStatusMessageParser';
import type { BundleDiscountRulesetMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/BundleDiscountRulesetMessageParser';
import type { CatalogPageMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/CatalogPageMessageParser';
import type { ClubGiftInfoParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/ClubGiftInfoParser';
import type { HabboClubOffersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/HabboClubOffersMessageParser';
import type { NotEnoughBalanceMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/NotEnoughBalanceMessageParser';
import type { ProductOfferMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/ProductOfferMessageParser';
import type { PurchaseErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/PurchaseErrorMessageParser';
import type { PurchaseNotAllowedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/PurchaseNotAllowedMessageParser';
import type { PurchaseOKMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/PurchaseOKMessageParser';
import type { SellablePetPalettesParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/SellablePetPalettesParser';
import type { SnowWarGameTokensMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/SnowWarGameTokensMessageParser';
import type { EmeraldBalanceMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/EmeraldBalanceMessageEventParser';
import type { SilverBalanceMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/SilverBalanceMessageEventParser';
import type { CreditBalanceParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/purse/CreditBalanceParser';
import type { MarketplaceConfigurationParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceConfigurationParser';
import type { MarketplaceItemStatsParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceItemStatsParser';
import type { MarketplaceMakeOfferResultParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceMakeOfferResultParser';
import type { RecyclerFinishedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/recycler/RecyclerFinishedMessageParser';
import type { RecyclerPrizesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/recycler/RecyclerPrizesMessageParser';
import type { RecyclerStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/recycler/RecyclerStatusMessageParser';
import type { ApproveNameMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/ApproveNameMessageParser';
import type { ScrSendUserInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/ScrSendUserInfoMessageParser';
import type { IHabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/IHabboFreeFlowChat';
import type { FriendBarSelectionEvent } from '@/com/sulake/habbo/friendbar/events/FriendBarSelectionEvent';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { GuildSettingsChangedInManageEvent } from '@/com/sulake/habbo/groups/events/GuildSettingsChangedInManageEvent';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { IHabboNewNavigator } from '@/com/sulake/habbo/navigator/IHabboNewNavigator';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { IHabboQuestEngine } from '@/com/sulake/habbo/quest/IHabboQuestEngine';
import type { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import type { RoomEngineObjectPlacedEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectPlacedEvent';
import type { RoomEngineObjectPlacedOnUserEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectPlacedOnUserEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { IFurniDataListener } from '@/com/sulake/habbo/session/furniture/IFurniDataListener';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { IProductDataListener } from '@/com/sulake/habbo/session/product/IProductDataListener';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component, Core } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CatalogWindowState } from '@/com/sulake/habbo/catalog/CatalogWindowState';
import { ClubBuyController } from '@/com/sulake/habbo/catalog/club/ClubBuyController';
import { ClubBuyOfferData } from '@/com/sulake/habbo/catalog/club/ClubBuyOfferData';
import { ClubExtendController } from '@/com/sulake/habbo/catalog/club/ClubExtendController';
import { ClubGiftController } from '@/com/sulake/habbo/catalog/club/ClubGiftController';
import { HabboClubCenter } from '@/com/sulake/habbo/catalog/clubcenter/HabboClubCenter';
import { MintTokenPurchaseOffer } from '@/com/sulake/habbo/catalog/collectibles/tabs/MintTokenPurchaseOffer';
import { NftStorePurchaseOffer } from '@/com/sulake/habbo/catalog/collectibles/tabs/NftStorePurchaseOffer';
import { CursedDragonAdoptionController } from '@/com/sulake/habbo/catalog/cursed_dragon_adoption/CursedDragonAdoptionController';
import { EarningsController } from '@/com/sulake/habbo/catalog/earnings/EarningsController';
import { CatalogEvent } from '@/com/sulake/habbo/catalog/event/CatalogEvent';
import { CatalogUserEvent } from '@/com/sulake/habbo/catalog/event/CatalogUserEvent';
import { GuildMembershipsController } from '@/com/sulake/habbo/catalog/guilds/GuildMembershipsController';
import { HabbiconController } from '@/com/sulake/habbo/catalog/habbicons/HabbiconController';
import { CatalogViewer, CollectiblesController, MarketPlaceLogic, OfferController, PurchaseConfirmationDialog, RecolorableFurnitureCatalogWidget, SpecialItemsController } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { HabboCatalogUtils } from '@/com/sulake/habbo/catalog/HabboCatalogUtils';
import { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import { MarketplaceItemStats } from '@/com/sulake/habbo/catalog/marketplace/MarketplaceItemStats';
import { CatalogNavigator } from '@/com/sulake/habbo/catalog/navigation/CatalogNavigator';
import { CatalogFurniPurchaseEvent } from '@/com/sulake/habbo/catalog/navigation/events/CatalogFurniPurchaseEvent';
import { OfferCenter } from '@/com/sulake/habbo/catalog/offers/OfferCenter';
import { GiftWrappingConfiguration } from '@/com/sulake/habbo/catalog/purchase/GiftWrappingConfiguration';
import { PlacedObjectPurchaseData } from '@/com/sulake/habbo/catalog/purchase/PlacedObjectPurchaseData';
import { RentConfirmationWindow } from '@/com/sulake/habbo/catalog/purchase/RentConfirmationWindow';
import { RoomAdPurchaseData } from '@/com/sulake/habbo/catalog/purchase/RoomAdPurchaseData';
import { Purse } from '@/com/sulake/habbo/catalog/purse/Purse';
import { PurseEvent } from '@/com/sulake/habbo/catalog/purse/PurseEvent';
import { PurseUpdateEvent } from '@/com/sulake/habbo/catalog/purse/PurseUpdateEvent';
import { RecyclerLogic } from '@/com/sulake/habbo/catalog/recycler/RecyclerLogic';
import { CatalogSearchEntry } from '@/com/sulake/habbo/catalog/search/CatalogSearchEntry';
import { VideoOfferManager } from '@/com/sulake/habbo/catalog/VideoOfferManager';
import { FurnitureOffer } from '@/com/sulake/habbo/catalog/viewer/FurnitureOffer';
import { GameTokensOffer } from '@/com/sulake/habbo/catalog/viewer/GameTokensOffer';
import { Offer } from '@/com/sulake/habbo/catalog/viewer/Offer';
import { PageLocalization } from '@/com/sulake/habbo/catalog/viewer/PageLocalization';
import { Product } from '@/com/sulake/habbo/catalog/viewer/ProductContainer.group';
import { CatalogWidgetApproveNameResultEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetApproveNameResultEvent';
import { CatalogWidgetBuilderSubscriptionUpdatedEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetBuilderSubscriptionUpdatedEvent';
import { CatalogWidgetRoomChangedEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetRoomChangedEvent';
import { CatalogWidgetSellablePetPalettesEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetSellablePetPalettesEvent';
import { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import { SetExtraPurchaseParameterEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetExtraPurchaseParameterEvent';
import { BuildersClubFurniCountMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/BuildersClubFurniCountMessageEvent';
import { BuildersClubSubscriptionStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/BuildersClubSubscriptionStatusMessageEvent';
import { BundleDiscountRulesetMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/BundleDiscountRulesetMessageEvent';
import { CatalogIndexMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogIndexMessageEvent';
import { CatalogPageMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPageMessageEvent';
import { CatalogPublishedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPublishedMessageEvent';
import { ClubGiftInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/ClubGiftInfoEvent';
import { GiftReceiverNotFoundEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/GiftReceiverNotFoundEvent';
import { GiftWrappingConfigurationEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/GiftWrappingConfigurationEvent';
import { HabboClubExtendOfferMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/HabboClubExtendOfferMessageEvent';
import { HabboClubOffersMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/HabboClubOffersMessageEvent';
import { LimitedEditionSoldOutEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/LimitedEditionSoldOutEvent';
import { LtdRaffleEnteredMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/LtdRaffleEnteredMessageEvent';
import { LtdRaffleResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/LtdRaffleResultMessageEvent';
import { NotEnoughBalanceMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/NotEnoughBalanceMessageEvent';
import { ProductOfferEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/ProductOfferEvent';
import { PurchaseErrorMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/PurchaseErrorMessageEvent';
import { PurchaseNotAllowedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/PurchaseNotAllowedMessageEvent';
import { PurchaseOKMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/PurchaseOKMessageEvent';
import { SellablePetPalettesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/SellablePetPalettesMessageEvent';
import { SnowWarGameTokensMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/SnowWarGameTokensMessageEvent';
import { VoucherRedeemErrorMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/VoucherRedeemErrorMessageEvent';
import { VoucherRedeemOkMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/VoucherRedeemOkMessageEvent';
import { EmeraldBalanceMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/EmeraldBalanceMessageEvent';
import { NftStorePurchaseMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/NftStorePurchaseMessageEvent';
import { SilverBalanceMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/SilverBalanceMessageEvent';
import { CreditBalanceEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/purse/CreditBalanceEvent';
import { MarketplaceBuyOfferResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceBuyOfferResultEvent';
import { MarketplaceCancelAllOffersResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceCancelAllOffersResultEvent';
import { MarketplaceCancelOfferResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceCancelOfferResultEvent';
import { MarketplaceClearOwnHistoryResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceClearOwnHistoryResultEvent';
import { MarketplaceConfigurationEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceConfigurationEvent';
import { MarketplaceItemStatsEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceItemStatsEvent';
import { MarketplaceMakeOfferResult } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceMakeOfferResult';
import { MarketPlaceOffersEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketPlaceOffersEvent';
import { MarketPlaceOwnOffersEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketPlaceOwnOffersEvent';
import { ActivityPointsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/ActivityPointsMessageEvent';
import { HabboActivityPointNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/HabboActivityPointNotificationMessageEvent';
import { RecyclerFinishedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/recycler/RecyclerFinishedMessageEvent';
import { RecyclerPrizesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/recycler/RecyclerPrizesMessageEvent';
import { RecyclerStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/recycler/RecyclerStatusMessageEvent';
import { CloseConnectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/CloseConnectionMessageEvent';
import { ApproveNameMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/ApproveNameMessageEvent';
import { GuildMembershipsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembershipsMessageEvent';
import { ScrSendUserInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/ScrSendUserInfoEvent';
import { BuildersClubPlaceRoomItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/BuildersClubPlaceRoomItemMessageComposer';
import { BuildersClubPlaceWallItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/BuildersClubPlaceWallItemMessageComposer';
import { BuildersClubQueryFurniCountMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/BuildersClubQueryFurniCountMessageComposer';
import { GetBundleDiscountRulesetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetBundleDiscountRulesetMessageComposer';
import { GetCatalogIndexComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetCatalogIndexComposer';
import { GetCatalogPageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetCatalogPageComposer';
import { GetClubOffersMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetClubOffersMessageComposer';
import { GetGiftWrappingConfigurationMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetGiftWrappingConfigurationMessageComposer';
import { GetIsOfferGiftableComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetIsOfferGiftableComposer';
import { GetProductOfferComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetProductOfferComposer';
import { GetRoomAdPurchaseInfoComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetRoomAdPurchaseInfoComposer';
import { GetSellablePetPalettesComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetSellablePetPalettesComposer';
import { GetSnowWarGameTokensOfferComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetSnowWarGameTokensOfferComposer';
import { MarkCatalogNewAdditionsPageOpenedComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/MarkCatalogNewAdditionsPageOpenedComposer';
import { PurchaseBasicMembershipExtensionComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/PurchaseBasicMembershipExtensionComposer';
import { PurchaseFromCatalogAsGiftComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/PurchaseFromCatalogAsGiftComposer';
import { PurchaseFromCatalogComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/PurchaseFromCatalogComposer';
import { PurchaseRoomAdMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/PurchaseRoomAdMessageComposer';
import { PurchaseSnowWarGameTokensOfferComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/PurchaseSnowWarGameTokensOfferComposer';
import { PurchaseVipMembershipExtensionComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/PurchaseVipMembershipExtensionComposer';
import { RedeemVoucherMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/RedeemVoucherMessageComposer';
import { RoomAdPurchaseInitiatedComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/RoomAdPurchaseInitiatedComposer';
import { NftStorePurchaseMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/NftStorePurchaseMessageComposer';
import { PurchaseMintTokenMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/PurchaseMintTokenMessageComposer';
import { RequestRoomPropertySet } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/furni/RequestRoomPropertySet';
import { BuyMarketplaceOfferMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/BuyMarketplaceOfferMessageComposer';
import { CancelAllMarketplaceOffersMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/CancelAllMarketplaceOffersMessageComposer';
import { CancelMarketplaceOfferMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/CancelMarketplaceOfferMessageComposer';
import { ClearMarketplaceOwnHistoryMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/ClearMarketplaceOwnHistoryMessageComposer';
import { GetMarketplaceItemStatsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/GetMarketplaceItemStatsComposer';
import { GetMarketplaceOffersMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/GetMarketplaceOffersMessageComposer';
import { GetMarketplaceOwnOffersMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/GetMarketplaceOwnOffersMessageComposer';
import { RedeemMarketplaceOfferCreditsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/RedeemMarketplaceOfferCreditsMessageComposer';
import { GetRecyclerPrizesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/recycler/GetRecyclerPrizesMessageComposer';
import { GetRecyclerStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/recycler/GetRecyclerStatusMessageComposer';
import { RecycleItemsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/recycler/RecycleItemsMessageComposer';
import { PlaceObjectMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/PlaceObjectMessageComposer';
import { ApproveNameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/ApproveNameMessageComposer';
import { LtdRaffleResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/LtdRaffleResultMessageEventParser';
import { NftStorePurchaseMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftStorePurchaseMessageEventParser';
import { Logger } from '@/com/sulake/habbo/Logger';
import { LegacyStuffData } from '@/com/sulake/habbo/room/object/data/LegacyStuffData';
import { RoomPreviewer } from '@/com/sulake/habbo/room/preview/RoomPreviewer';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDCollectiblesController } from '@/com/sulake/iid/IIDCollectiblesController';
import { IIDCursedDragonAdoptionController } from '@/com/sulake/iid/IIDCursedDragonAdoptionController';
import { IIDHabbiconController } from '@/com/sulake/iid/IIDHabbiconController';
import { IIDHabboAvatarEditor } from '@/com/sulake/iid/IIDHabboAvatarEditor';
import { IIDHabboClubCenter } from '@/com/sulake/iid/IIDHabboClubCenter';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboFreeFlowChat } from '@/com/sulake/iid/IIDHabboFreeFlowChat';
import { IIDHabboFriendBar } from '@/com/sulake/iid/IIDHabboFriendBar';
import { IIDHabboFriendList } from '@/com/sulake/iid/IIDHabboFriendList';
import { IIDHabboGroupsManager } from '@/com/sulake/iid/IIDHabboGroupsManager';
import { IIDHabboInventory } from '@/com/sulake/iid/IIDHabboInventory';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNewNavigator } from '@/com/sulake/iid/IIDHabboNewNavigator';
import { IIDHabboNotifications } from '@/com/sulake/iid/IIDHabboNotifications';
import { IIDHabboQuestEngine } from '@/com/sulake/iid/IIDHabboQuestEngine';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboSoundManager } from '@/com/sulake/iid/IIDHabboSoundManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';
import { IIDSpecialItemsController } from '@/com/sulake/iid/IIDSpecialItemsController';
import { IIDVaultController } from '@/com/sulake/iid/IIDVaultController';
import { isIRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class HabboCatalog extends Component implements IHabboCatalog, IProductDataListener, IUpdateReceiver, ILinkEventTracker, IFurniDataListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog::HabboCatalog'); }

    public static readonly GET_SNOWWAR_TOKENS: string = "GET_SNOWWAR_TOKENS";
    public static readonly GET_SNOWWAR_TOKENS2: string = "GET_SNOWWAR_TOKENS2";
    public static readonly GET_SNOWWAR_TOKENS3: string = "GET_SNOWWAR_TOKENS3";
    private static readonly DESKTOP_WINDOW_LAYER: number = 1;
    private static readonly MAX_SEARCH_RESULTS_LENGTH: number = 400;
    private static readonly NO_KNOWN_OFFER: number = -1;
    private static readonly DEFAULT_VIEW_LOCATION: Point = new Point(100, 20);
    private static readonly DEFAULT_VIEW_LOCATION_LARGE: Point = new Point(100, 5);

    private static readonly SEARCH_PRODUCT_CODE_OVERRIDES_BY_FURNI_CLASS_NAME: any = {};

    declare private _windowManager: IHabboWindowManager;

    declare private _communication: IHabboCommunicationManager;

    declare private _toolbar: IHabboToolbar;

    declare private _roomEngine: IRoomEngine;

    declare private _roomSessionManager: IRoomSessionManager;

    declare private _roomSession: IRoomSession;

    declare private _localization: IHabboLocalizationManager;

    declare private _notifications: IHabboNotifications;

    declare private _inventory: IHabboInventory;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _avatarRenderManager: IAvatarRenderManager;

    declare private _soundManager: IHabboSoundManager;

    declare private _friendList: IHabboFriendList;

    declare private _newNavigator: IHabboNewNavigator;

    declare private _avatarEditor: IHabboAvatarEditor;

    declare private _questEngine: IHabboQuestEngine;

    declare private _freeFlowChat: IHabboFreeFlowChat;

    declare private _videoOffers: VideoOfferManager;

    declare private _initialized: boolean;

    declare private _SafeStr_5422: boolean;

    declare private _SafeStr_4887: boolean;

    declare private _SafeStr_2204: CatalogViewer;

    declare private _catalogNavigators: Map<any, any>;

    declare private _catalogStates: Map<any, any>;

    declare private _SafeStr_2234: Purse;

    declare private _SafeStr_2271: RecyclerLogic;

    declare private _SafeStr_2364: IMarketPlace;

    declare private _mainContainer: IWindowContainer;

    declare private _SafeStr_2174: PurchaseConfirmationDialog;

    declare private _giftReceiver: string;

    declare private _SafeStr_4295: boolean;

    declare private _SafeStr_6815: boolean;

    declare private _SafeStr_4987: boolean;

    declare private _giftWrappingConfiguration: GiftWrappingConfiguration;

    declare private _SafeStr_4508: ClubGiftController;

    declare private _SafeStr_3114: ClubBuyController;

    declare private _SafeStr_3227: ClubExtendController;

    declare private _sellablePetPalettes: UtilsMap;

    declare private _SafeStr_2680: boolean;

    declare private _offerInFurniPlacing: IPurchasableOffer;

    declare private _offerPlacingCallbackReceiver: IDragAndDropDoneReceiver;

    declare private _SafeStr_2241: PlacedObjectPurchaseData;

    declare private _newAdditionsAvailable: boolean;

    declare private _SafeStr_7207: boolean;

    declare private _roomPreviewer: RoomPreviewer;

    declare private _SafeStr_2956: GuildMembershipsController;

    declare private _SafeStr_4321: OfferController;

    declare private _utils: HabboCatalogUtils;

    declare private _SafeStr_4068: boolean;

    declare private _SafeStr_2988: string;

    declare private _SafeStr_3025: GameTokensOffer;

    declare private _SafeStr_2971: GameTokensOffer;

    declare private _SafeStr_3098: GameTokensOffer;

    declare private _bundleDiscountRuleset: BundleDiscountRuleset;

    declare private _roomAdPurchaseData: RoomAdPurchaseData;

    declare private _SafeStr_3574: RentConfirmationWindow;

    declare private _messageEvents: IMessageEvent[];

    declare private _catalogType: string;

    declare private _SafeStr_14829: Point;

    declare private _SafeStr_14830: boolean;

    declare private _SafeStr_14831: string;

    declare private _SafeStr_14832: boolean;

    declare private _SafeStr_14833: boolean;

    declare private _furnitureData: IFurnitureData[];

    declare private _frontPageItems: FrontPageItem[];

    declare private _SafeStr_3551: Timer;

    declare private _searchEntries: CatalogSearchEntry[];

    declare private _SafeStr_14834: boolean;

    declare private _pagesVisibleInBuilderMode: Map<any, any>;

    declare private _SafeStr_6613: boolean;

    declare private _builderFurniCount: number;

    declare private _builderFurniLimit: number;

    declare private _builderMaxFurniLimit: number;

    declare private _SafeStr_5508: number;

    declare private _SafeStr_5555: number;

    declare private _builderMembershipUpdateTime: number;

    declare private _builderMembershipDisplayUpdateTime: number;

    declare private _SafeStr_5234: boolean;

    declare private _SafeStr_4829: boolean;

    declare private _offerCenter: OfferCenter;

    declare private _SafeStr_2288: CollectiblesController;

    declare private _habbiconController: HabbiconController;

    declare private _SafeStr_5736: SpecialItemsController;

    declare private _SafeStr_5872: EarningsController;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._SafeStr_2234 = new Purse();
        this._utils = new HabboCatalogUtils(this);
        this.registerUpdateReceiver(this, 1);
        this._SafeStr_14829 = HabboCatalog.DEFAULT_VIEW_LOCATION_LARGE.clone();
        param1.attachComponent(new HabboClubCenter(param1, 0, param3), [new IIDHabboClubCenter()]);
        this._SafeStr_5872 = new EarningsController(param1, 0, param3);
        param1.attachComponent(this._SafeStr_5872, [new IIDVaultController()]);
        this._SafeStr_2288 = new CollectiblesController(param1, 0, param3);
        param1.attachComponent(this._SafeStr_2288, [new IIDCollectiblesController()]);
        this._habbiconController = new HabbiconController(param1, 0, param3);
        param1.attachComponent(this._habbiconController, [new IIDHabbiconController()]);
        this._SafeStr_5736 = new SpecialItemsController(param1, 0, param3);
        param1.attachComponent(this._SafeStr_5736, [new IIDSpecialItemsController()]);
        param1.attachComponent(new CursedDragonAdoptionController(param1, 0, param3), [new IIDCursedDragonAdoptionController()]);
    }

    private static matchesSearchEntry(param1: CatalogSearchEntry, param2: string): boolean {
        for (const _loc3_ of param1.searchTerms ?? []) {
            if (_loc3_.indexOf(param2) >= 0) {
                return true;
            }
        }
        return false;
    }

    private static addSearchTerm(param1: string[], param2: string): void {
        let _loc3_: string = HabboCatalog.normalizeSearchText(param2);
        if (_loc3_.length > 0 && param1.indexOf(_loc3_) < 0) {
            param1.push(_loc3_);
        }
    }

    private static isExcludedFromFurnitureSearchResults(param1: IFurnitureData): boolean {
        return HabboCatalog.startsWith(param1.className, "bc_");
    }

    private static startsWith(param1: string, param2: string): boolean {
        return param1 != null && param1.indexOf(param2) == 0;
    }

    private static normalizeSearchText(param1: string): string {
        if (param1 == null) {
            return "";
        }
        return param1.toLocaleLowerCase();
    }

    private static resolveSearchProductCode(param1: IFurnitureData): string {
        let _loc2_: string = stringOrNull(HabboCatalog.SEARCH_PRODUCT_CODE_OVERRIDES_BY_FURNI_CLASS_NAME[param1.className]);
        return _loc2_ ?? param1.className;
    }

    public static setElementImageCentered(param1: IWindow, param2: BitmapData, param3: number = 0): void {
        let _loc7_: IBitmapWrapperWindow = null;
        let _loc4_: IDisplayObjectWrapper = null;
        if (param2 == null) {
            return;
        }
        if (param1 == null) {
            return;
        }
        if (param1.disposed) {
            return;
        }
        let _loc8_: number = param3 > 0 ? param3 : param1.height;
        let _loc5_: number = (param1.width - param2.width) / 2 | 0;
        let _loc6_: number = (_loc8_ - param2.height) / 2 | 0;
        if ((isIBitmapWrapperWindow(param1) ? param1 : null) != null) {
            _loc7_ = castGuarded(param1, isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
            if (_loc7_.bitmap == null || param3 > 0) {
                _loc7_.bitmap = new BitmapData(param1.width, _loc8_, true, 16777215);
            }
            _loc7_.bitmap.fillRect(_loc7_.bitmap.rect, 16777215);
            _loc7_.bitmap.copyPixels(param2, param2.rect, new Point(_loc5_, _loc6_), null, null, false);
            param1.invalidate();
        } else if ((isIDisplayObjectWrapper(param1) ? param1 : null) != null) {
            _loc4_ = castGuarded(param1, isIDisplayObjectWrapper, "com.sulake.core.window.components.IDisplayObjectWrapper");
            _loc4_.setDisplayObject(new Bitmap(param2));
            param1.invalidate();
        }
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get avatarRenderManager(): IAvatarRenderManager {
        return this._avatarRenderManager;
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get connection(): IConnection {
        return this._communication.connection;
    }

    public get toolbar(): IHabboToolbar {
        return this._toolbar;
    }

    public get giftWrappingConfiguration(): GiftWrappingConfiguration {
        return this._giftWrappingConfiguration;
    }

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    public get soundManager(): IHabboSoundManager {
        return this._soundManager;
    }

    public get roomPreviewer(): RoomPreviewer {
        if (this._roomPreviewer == null) {
            this.initializeRoomPreviewer();
        }
        return this._roomPreviewer;
    }

    public get navigator(): IHabboNavigator {
        return this._newNavigator.legacyNavigator;
    }

    public get utils(): HabboCatalogUtils {
        return this._utils;
    }

    public get questEngine(): IHabboQuestEngine {
        return this._questEngine;
    }

    public get freeFlowChat(): IHabboFreeFlowChat {
        return this._freeFlowChat;
    }

    public get videoOffers(): IVideoOfferManager {
        return this._videoOffers;
    }

    public get frontPageItems(): FrontPageItem[] {
        return this._frontPageItems;
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolbar = param1;
         }, false, [{ "type": "HTE_TOOLBAR_CLICK", "callback": this.onHabboToolbarEvent }]), new ComponentDependency(new IIDHabboNotifications(), (param1: IHabboNotifications): void => {
             this._notifications = param1;
         }, false), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }, false, [{ "type": "REOE_PLACED", "callback": this.onObjectPlacedInRoom }, { "type": "REOE_PLACED_ON_USER", "callback": this.onObjectPlaceOnUser }, { "type": "REOE_SELECTED", "callback": this.onObjectSelected }]), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }, false), new ComponentDependency(new IIDHabboInventory(), (param1: IHabboInventory): void => {
             this._inventory = param1;
         }, false), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._avatarRenderManager = param1;
         }, false), new ComponentDependency(new IIDHabboSoundManager(), (param1: IHabboSoundManager): void => {
             this._soundManager = param1;
         }, false), new ComponentDependency(new IIDHabboRoomSessionManager(), (param1: IRoomSessionManager): void => {
             this._roomSessionManager = param1;
         }, false, [{ "type": "RSE_STARTED", "callback": this.onRoomSessionEvent }, { "type": "RSE_ENDED", "callback": this.onRoomSessionEvent }]), new ComponentDependency(new IIDHabboFriendList(), (param1: IHabboFriendList): void => {
             this._friendList = param1;
         }, false), new ComponentDependency(new IIDHabboNewNavigator(), (param1: IHabboNewNavigator): void => {
             this._newNavigator = param1;
         }, false), new ComponentDependency(new IIDHabboFriendBar(), null, false, [{ "type": "FBVE_FRIEND_SELECTED", "callback": this.onFriendBarSelectionEvent }]), new ComponentDependency(new IIDHabboGroupsManager(), null, false, [{ "type": "GSCIME_GUILD_VISUAL_SETTINGS_CHANGED", "callback": this.onGuildVisualSettingsChanged }]), new ComponentDependency(new IIDHabboAvatarEditor(), (param1: IHabboAvatarEditor): void => {
             this._avatarEditor = param1;
         }, false), new ComponentDependency(new IIDHabboQuestEngine(), (param1: IHabboQuestEngine): void => {
             this._questEngine = param1;
         }, false), new ComponentDependency(new IIDHabboFreeFlowChat(), (param1: IHabboFreeFlowChat): void => {
             this._freeFlowChat = param1;
         }, false)]);
    }

    protected override initComponent(): void {
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this.addMessageEvent(new GuildMembershipsMessageEvent(this.onGuildMemberships));
        this.addMessageEvent(new MarketplaceClearOwnHistoryResultEvent(this.onMarketPlaceClearOwnHistoryResult));
        this.addMessageEvent(new SnowWarGameTokensMessageEvent(this.onSnowWarGameTokenOffer));
        this.addMessageEvent(new LimitedEditionSoldOutEvent(this.onLimitedEditionSoldOut));
        this.addMessageEvent(new HabboClubExtendOfferMessageEvent(this.onHabboClubExtendOffer));
        this.addMessageEvent(new CloseConnectionMessageEvent(this.onRoomExit));
        this.addMessageEvent(new PurchaseNotAllowedMessageEvent(this.onPurchaseNotAllowed));
        this.addMessageEvent(new EmeraldBalanceMessageEvent(this.onEmeraldBalance));
        this.addMessageEvent(new SilverBalanceMessageEvent(this.onSilverBalance));
        this.addMessageEvent(new BuildersClubSubscriptionStatusMessageEvent(this.onBuildersClubSubscriptionStatus));
        this.addMessageEvent(new MarketPlaceOffersEvent(this.onMarketPlaceOffers));
        this.addMessageEvent(new NotEnoughBalanceMessageEvent(this.onNotEnoughBalance));
        this.addMessageEvent(new MarketPlaceOwnOffersEvent(this.onMarketPlaceOwnOffers));
        this.addMessageEvent(new VoucherRedeemOkMessageEvent(this.onVoucherRedeemOk));
        this.addMessageEvent(new RecyclerFinishedMessageEvent(this.onRecyclerFinished));
        this.addMessageEvent(new MarketplaceBuyOfferResultEvent(this.onMarketPlaceBuyResult));
        this.addMessageEvent(new GiftWrappingConfigurationEvent(this.onGiftWrappingConfiguration));
        this.addMessageEvent(new MarketplaceCancelOfferResultEvent(this.onMarketPlaceCancelResult));
        this.addMessageEvent(new PurchaseErrorMessageEvent(this.onPurchaseError));
        this.addMessageEvent(new SellablePetPalettesMessageEvent(this.onSellablePalettes));
        this.addMessageEvent(new ActivityPointsMessageEvent(this.onActivityPoints));
        this.addMessageEvent(new ApproveNameMessageEvent(this.onApproveNameResult));
        this.addMessageEvent(new ClubGiftInfoEvent(this.onClubGiftInfo));
        this.addMessageEvent(new MarketplaceConfigurationEvent(this.onMarketplaceConfiguration));
        this.addMessageEvent(new MarketplaceItemStatsEvent(this.onMarketplaceItemStats));
        this.addMessageEvent(new NftStorePurchaseMessageEvent(this.onNftStorePurchase));
        this.addMessageEvent(new LtdRaffleResultMessageEvent(this.onLtdRaffleResult));
        this.addMessageEvent(new RecyclerStatusMessageEvent(this.onRecyclerStatus));
        this.addMessageEvent(new HabboClubOffersMessageEvent(this.onHabboClubOffers));
        this.addMessageEvent(new LtdRaffleEnteredMessageEvent(this.onLtdRaffleEntered));
        this.addMessageEvent(new CatalogPublishedMessageEvent(this.onCatalogPublished));
        this.addMessageEvent(new ProductOfferEvent(this.onProductOffer));
        this.addMessageEvent(new RecyclerPrizesMessageEvent(this.onRecyclerPrizes));
        this.addMessageEvent(new BundleDiscountRulesetMessageEvent(this.onBundleDiscountRulesetMessageEvent));
        this.addMessageEvent(new BuildersClubFurniCountMessageEvent(this.onBuildersClubFurniCount));
        this.addMessageEvent(new CatalogPageMessageEvent(this.onCatalogPage));
        this.addMessageEvent(new ScrSendUserInfoEvent(this.onSubscriptionInfo));
        this.addMessageEvent(new CreditBalanceEvent(this.onCreditBalance));
        this.addMessageEvent(new GiftReceiverNotFoundEvent(this.onGiftReceiverNotFound));
        this.addMessageEvent(new CatalogIndexMessageEvent(this.onCatalogIndex));
        this.addMessageEvent(new PurchaseOKMessageEvent(this.onPurchaseOK));
        this.addMessageEvent(new VoucherRedeemErrorMessageEvent(this.onVoucherRedeemError));
        this.addMessageEvent(new HabboActivityPointNotificationMessageEvent(this.onActivityPointNotification));
        this.addMessageEvent(new MarketplaceMakeOfferResult(this.onMarketplaceMakeOfferResult));
        this.addMessageEvent(new MarketplaceCancelAllOffersResultEvent(this.onMarketPlaceCancelAllResult));
        this.context.addLinkEventTracker(this);
        this._sessionDataManager.loadProductData(this);
        this._SafeStr_7207 = this.isNewItemsNotificationEnabled();
        this._videoOffers = new VideoOfferManager(this);
        this._SafeStr_4321 = new OfferController(this);
        this._furnitureData = this._sessionDataManager.getFurniData(this);
        this._pagesVisibleInBuilderMode = null;
    }

    private onLtdRaffleResult(param1: LtdRaffleResultMessageEvent): void {
        if (this._SafeStr_2174 != null) {
            this._SafeStr_2174.ltdRaffleEnded();
            this._SafeStr_2174.dispose();
            this._SafeStr_2174 = null;
        }
        let _loc2_: LtdRaffleResultMessageEventParser = asInstanceOf(param1.getParser(), LtdRaffleResultMessageEventParser);
        let _loc4_: string = "notification.raffle." + (_loc2_.hasWon ? "won" : "lost");
        let _loc3_: string = this._localization.getLocalization(_loc4_, _loc4_);
        this._notifications.addItem(_loc3_, "ltd");
    }

    private onLtdRaffleEntered(param1: LtdRaffleEnteredMessageEvent): void {
        if (this._SafeStr_2174 != null) {
            this._SafeStr_2174.ltdRaffleStarted();
        }
    }

    private addMessageEvent(param1: IMessageEvent): void {
        this._messageEvents.push(this._communication.addHabboConnectionMessageEvent(param1));
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.removeUpdateReceiver(this);
        if (this._messageEvents != null && this._communication != null) {
            for (const _loc1_ of this._messageEvents ?? []) {
                this._communication.removeHabboConnectionMessageEvent(_loc1_);
            }
        }
        if (this._videoOffers) {
            this._videoOffers.dispose();
            this._videoOffers = null;
        }
        if (this._offerCenter != null) {
            this._offerCenter.dispose();
            this._offerCenter = null;
        }
        this.reset(true);
        this.context.removeLinkEventTracker(this);
        if (this._SafeStr_2174 != null) {
            this._SafeStr_2174.dispose();
            this._SafeStr_2174 = null;
        }
        if (this._SafeStr_2271 != null) {
            this._SafeStr_2271.dispose();
            this._SafeStr_2271 = null;
        }
        this._SafeStr_2234 = null;
        this._SafeStr_2364 = null;
        if (this._SafeStr_3114 != null) {
            this._SafeStr_3114.dispose();
            this._SafeStr_3114 = null;
        }
        if (this._SafeStr_3227 != null) {
            this._SafeStr_3227.dispose();
            this._SafeStr_3227 = null;
        }
        if (this._sellablePetPalettes != null) {
            this._sellablePetPalettes.dispose();
            this._sellablePetPalettes = null;
        }
        this._roomSession = null;
        if (this._SafeStr_3574 != null) {
            this._SafeStr_3574.dispose();
            this._SafeStr_3574 = null;
        }
        this.resetPlacedOfferData();
        this._SafeStr_2680 = false;
        this._offerPlacingCallbackReceiver = null;
        if (this._roomPreviewer != null) {
            this._roomPreviewer.dispose();
            this._roomPreviewer = null;
        }
        if (this._SafeStr_2956 != null) {
            this._SafeStr_2956.dispose();
            this._SafeStr_2956 = null;
        }
        if (this._utils != null) {
            this._utils.dispose();
            this._utils = null;
        }
        this.disposeSnowWarTokens();
        if (this._SafeStr_4321) {
            this._SafeStr_4321.dispose();
            this._SafeStr_4321 = null;
        }
        super.dispose();
    }

    private disposeSnowWarTokens(): void {
        if (this._SafeStr_3025 != null) {
            this._SafeStr_3025.dispose();
            this._SafeStr_3025 = null;
        }
        if (this._SafeStr_2971 != null) {
            this._SafeStr_2971.dispose();
            this._SafeStr_2971 = null;
        }
        if (this._SafeStr_3098 != null) {
            this._SafeStr_3098.dispose();
            this._SafeStr_3098 = null;
        }
    }

    private init(param1: string = null): boolean {
        if (!this._initialized && this._SafeStr_5422) {
            if (this._SafeStr_4887) {
                this.refreshFurniData();
            }
            this.createCatalogWindowStates();
            this.setActiveCatalogState(param1 == null ? "NORMAL" : param1);
            this._initialized = true;
            this.updatePurse();
            this.createRecycler();
            this.createMarketPlace();
            this.createClubGiftController();
            this.getGiftWrappingConfiguration();
            this.createClubBuyController();
            this.createClubExtendController();
            this.createGroupMembershipsController();
            this.initBundleDiscounts();
            this.events.dispatchEvent(new CatalogEvent("CATALOG_INITIALIZED"));
            this.send(new BuildersClubQueryFurniCountMessageComposer());
            return true;
        }
        return false;
    }

    private reset(param1: boolean = false): void {
        let _loc2_: boolean = false;
        this._initialized = false;
        this._SafeStr_2204 = null;
        this._mainContainer = null;
        if (this._catalogStates != null) {
            for (const _loc3_ of this._catalogStates?.values() ?? []) {
                _loc3_.dispose();
            }
            this._catalogStates = null;
        }
        this._catalogNavigators = null;
        if (!param1) {
            if (this._sessionDataManager == null) {
                Core.crash("Could not reload product data after reset() because _sessionDataManager was null", 7);
                return;
            }
            _loc2_ = this._sessionDataManager.loadProductData(this);
            if (!_loc2_) {
                this.events.dispatchEvent(new CatalogEvent("CATALOG_NOT_READY"));
            }
        }
    }

    private send(param1: IMessageComposer): void {
        if (this.connection == null) {
            return;
        }
        this.connection.send(param1);
    }

    public loadCatalogPage(param1: number, param2: number, param3: string): void {
        this.setCatalogBusy(param3, true);
        this.getCatalogState(param3).lastPageRequestId = param1;
        this.send(new GetCatalogPageComposer(param1, param2, param3));
    }

    public purchaseGameTokensOffer(param1: string): void {
        if (param1 == "GET_SNOWWAR_TOKENS" && this._SafeStr_3025) {
            this.send(new PurchaseSnowWarGameTokensOfferComposer(this._SafeStr_3025.offerId));
        } else if (param1 == "GET_SNOWWAR_TOKENS2" && this._SafeStr_2971) {
            this.send(new PurchaseSnowWarGameTokensOfferComposer(this._SafeStr_2971.offerId));
        } else if (param1 == "GET_SNOWWAR_TOKENS3" && this._SafeStr_3098) {
            this.send(new PurchaseSnowWarGameTokensOfferComposer(this._SafeStr_3098.offerId));
        }
    }

    public purchaseMintTokens(param1: number, param2: string): void {
        this.send(new PurchaseMintTokenMessageComposer(param1, param2));
    }

    public purchaseNftOffer(param1: string, param2: string): void {
        this.send(new NftStorePurchaseMessageComposer(param1, param2));
    }

    public isHabbiconOfferOwned(param1: IPurchasableOffer): boolean {
        if (!this.getBoolean("habbicons.enabled") || param1 == null || param1.product == null || param1.product.productType != "habbicon" || this._habbiconController == null) {
            return false;
        }
        return this.isHabbiconOwned(Number(param1.product.extraParam) | 0);
    }

    public isHabbiconOwned(param1: number): boolean {
        if (!this.getBoolean("habbicons.enabled") || this._habbiconController == null) {
            return false;
        }
        let _loc2_: _SafeCls_6019 = this._habbiconController.tryGetOwnedHabbicon(param1);
        return _loc2_ != null;
    }

    public showHabbiconAlreadyOwnedAlert(): void {
        this._windowManager.alert("${catalog.alert.purchaseerror.title}", "${habbicon.catalog.already_owned}", 0, this.alertDialogEventProcessor);
    }

    public purchaseOffer(param1: number, param2: string = "", param3: number = 1): void {
        let _loc4_: any = undefined;
        let _loc5_: ICatalogNavigator = this.getCatalogNavigator("NORMAL");
        if (_loc5_ != null) {
            _loc4_ = _loc5_.getNodesByOfferId(param1, true);
            if (_loc4_ != null) {
                this.purchaseProduct(_loc4_[0].pageId | 0, param1, param2, param3);
            }
        }
    }

    public purchaseProduct(param1: number, param2: number, param3: string = "", param4: number = 1): void {
        if (this.roomAdPurchaseData == null || this.roomAdPurchaseData.offerId != param2) {
            this.send(new PurchaseFromCatalogComposer(param1, param2, param3, param4));
        } else {
            if (this._roomAdPurchaseData.extended && this._roomAdPurchaseData.expirationTime.getTime() < new Date().getTime()) {
                this._roomAdPurchaseData.extended = false;
            }
            this.send(new PurchaseRoomAdMessageComposer(param1, param2, this.roomAdPurchaseData.flatId, this.roomAdPurchaseData.name, this.roomAdPurchaseData.extended, this.roomAdPurchaseData.description, this.roomAdPurchaseData.categoryId));
        }
    }

    public purchaseVipMembershipExtension(param1: number): void {
        this.send(new PurchaseVipMembershipExtensionComposer(param1));
    }

    public purchaseBasicMembershipExtension(param1: number): void {
        this.send(new PurchaseBasicMembershipExtensionComposer(param1));
    }

    public purchaseProductAsGift(param1: number, param2: number, param3: string, param4: string, param5: string, param6: number, param7: number, param8: number, param9: boolean = false): void {
        this.send(new PurchaseFromCatalogAsGiftComposer(param1, param2, param3, param4, param5, param6, param7, param8, param9));
    }

    public get roomAdPurchaseData(): RoomAdPurchaseData {
        return this._roomAdPurchaseData;
    }

    public set roomAdPurchaseData(param1: RoomAdPurchaseData) {
        this._roomAdPurchaseData = param1;
    }

    public approveName(param1: string, param2: number): void {
        this.send(new ApproveNameMessageComposer(param1, param2));
    }

    public getRecyclerStatus(): void {
        this.send(new GetRecyclerStatusMessageComposer());
    }

    public getRecyclerPrizes(): void {
        this.send(new GetRecyclerPrizesMessageComposer());
    }

    public sendRecycleItems(param1: any[]): void {
        this.send(new RecycleItemsMessageComposer(param1));
    }

    public set giftReceiver(param1: string) {
        this._giftReceiver = param1;
    }

    public getSeasonalCurrencyActivityPointType(): number {
        return this.getInteger("seasonalcurrencyindicator.currency", 1);
    }

    public showPurchaseConfirmation(param1: IPurchasableOffer, param2: number, param3: string = "", param4: number = 1, param5: IStuffData = null, param6: string = null, param7: boolean = true, param8: BitmapData = null): void {
        let _loc14_: any = undefined;
        let _loc11_: any[] = null;
        let _loc9_: string = null;
        let _loc13_: ICatalogNode = null;
        if (param2 == -12345678) {
            _loc14_ = this.currentCatalogNavigator.getNodesByOfferId(param1.offerId, true);
            if (_loc14_ != null) {
                param2 = _loc14_[0].pageId | 0;
            }
        }
        Logger.log("buy: " + [param4, param1.offerId, param3]);
        if (this.isHabbiconOfferOwned(param1)) {
            this.showHabbiconAlreadyOwnedAlert();
            return;
        }
        let _loc12_: number = param1.priceInCredits;
        let _loc15_: number = param1.priceInActivityPoints;
        if (this.multiplePurchaseEnabled) {
            _loc12_ = this._utils.calculateBundlePrice(true, param1.priceInCredits, param4);
            _loc15_ = this._utils.calculateBundlePrice(true, param1.priceInActivityPoints, param4);
        }
        let _loc10_: boolean = param1 instanceof GameTokensOffer;
        if (_loc12_ > 0 && _loc12_ > this._SafeStr_2234.credits && !_loc10_) {
            this.showNotEnoughCreditsAlert();
            return;
        }
        if (_loc15_ > 0 && _loc15_ > this._SafeStr_2234.getActivityPointsForType(param1.activityPointType) && !_loc10_) {
            this.showNotEnoughActivityPointsAlert(param1.activityPointType);
            return;
        }
        if (param1 instanceof Offer || this._SafeStr_4295 || param1 instanceof GameTokensOffer || param1 instanceof MintTokenPurchaseOffer || param1 instanceof NftStorePurchaseOffer) {
            if (this._SafeStr_2174 == null || this._SafeStr_2174.disposed) {
                this._SafeStr_2174 = new PurchaseConfirmationDialog(this._localization, this.assets);
            }
            _loc11_ = [];
            if (this._friendList != null) {
                _loc11_ = this._friendList.getFriendNames();
            }
            _loc9_ = param6;
            if (_loc9_ == null) {
                if (this._giftReceiver != null) {
                    _loc9_ = this._giftReceiver;
                }
            }
            this._SafeStr_2174.showOffer(this, this._roomEngine, param1, param2, param3, param4, param5, _loc11_, _loc9_, param8);
        } else if (param1 instanceof ClubBuyOfferData) {
            if (param2 == -1) {
                _loc13_ = this.currentCatalogNavigator.getNodeByName("hc_membership");
                if (_loc13_ != null) {
                    param2 = _loc13_.pageId;
                }
            }
            if (param2 >= 0) {
                this._SafeStr_3114.showConfirmation(param1 instanceof ClubBuyOfferData ? param1 : null, param2);
            }
        }
        if (this._SafeStr_4295) {
            this._SafeStr_4295 = false;
            this._SafeStr_2174.turnIntoGifting();
        }
    }

    public purchaseWillBeGift(param1: boolean): void {
        this._SafeStr_4295 = param1;
    }

    private initializeRoomPreviewer(): void {
        if (this._roomEngine != null && this._roomEngine.isInitialized && this.getBoolean("catalog.furniture.animation")) {
            if (this._roomPreviewer == null) {
                this._roomPreviewer = new RoomPreviewer(this._roomEngine);
                this._roomPreviewer.centerWallItems = true;
                this._roomPreviewer.createRoomForPreviews();
            }
        }
    }

    private isNewItemsNotificationEnabled(): boolean {
        return this.getBoolean("toolbar.new_additions.notification.enabled");
    }

    public openCatalog(): void {
        this.cancelFurniInMover();
        this.toggleCatalog("NORMAL", true);
    }

    public openCatalogPage(param1: string, param2: string = null): void {
        this.cancelFurniInMover();
        let _loc3_: string = param2 == null ? "NORMAL" : param2;
        this.toggleCatalog(_loc3_, true, false);
        let _loc4_: CatalogWindowState = this.getCatalogState(_loc3_);
        if (!this._initialized || _loc4_ == null || _loc4_.catalogNavigator == null || !_loc4_.catalogNavigator.initialized) {
            _loc4_._SafeStr_2639.requestByName = param1;
            return;
        }
        _loc4_.catalogNavigator.openPage(param1);
    }

    public openRoomAdCatalogPageInExtendedMode(param1: string, param2: string, param3: string, param4: string, param5: Date, param6: number): void {
        let _loc9_: CatalogWindowState = this.getCatalogState("NORMAL");
        let _loc8_: number = _loc9_ == null ? -1 : _loc9_.lastPageRequestId;
        this._roomAdPurchaseData = new RoomAdPurchaseData();
        this._roomAdPurchaseData.name = param2;
        this._roomAdPurchaseData.extended = true;
        this._roomAdPurchaseData.extendedFlatId = this._roomEngine.activeRoomId;
        this._roomAdPurchaseData.description = param3;
        this._roomAdPurchaseData.flatId = this._roomEngine.activeRoomId;
        this._roomAdPurchaseData.roomName = param4;
        this._roomAdPurchaseData.expirationTime = param5;
        this._roomAdPurchaseData.categoryId = param6;
        this.openCatalogPage(param1);
        let _loc7_: ICatalogNode = this.currentCatalogNavigator.getNodeByName(param1);
        if (_loc7_ != null && _loc7_.pageId == _loc8_) {
            this.getRoomAdsPurchaseInfo();
        }
    }

    public openCatalogPageByOfferId(param1: number, param2: string): void {
        this.openCatalogPageById(-12345678, param1, param2);
    }

    public openCatalogPageById(param1: number, param2: number, param3: string): void {
        let _loc4_: CatalogWindowState = this.getCatalogState(param3);
        if (this._initialized && _loc4_ != null && _loc4_.catalogNavigator != null && _loc4_.catalogNavigator.initialized) {
            this.toggleCatalog(param3, true, false);
            _loc4_.catalogViewer.setForceRefresh();
            _loc4_.catalogNavigator.openPageById(param1, param2);
        } else {
            this.toggleCatalog(param3);
            _loc4_ = this.getCatalogState(param3);
            _loc4_._SafeStr_2639.requestById = param1;
            _loc4_._SafeStr_2639.requestedOfferId = param2;
        }
    }

    public openInventoryCategory(param1: string): void {
        if (this._inventory == null) {
            return;
        }
        this._inventory.toggleInventoryPage(param1);
    }

    public openCreditsHabblet(): void {
        HabboWebTools.openWebPageAndMinimizeClient(this.getProperty("web.shop.relativeUrl"));
    }

    public setupInventoryForRecycler(param1: boolean): void {
        if (this._inventory == null) {
            return;
        }
        this._inventory.setupRecycler(param1);
    }

    public get privateRoomSessionActive(): boolean {
        return this._SafeStr_4987;
    }

    public get tradingActive(): boolean {
        if (this._inventory == null) {
            return false;
        }
        return this._inventory.tradingActive;
    }

    public requestInventoryFurniToRecycler(): number {
        if (this._inventory == null) {
            return 0;
        }
        return this._inventory.requestSelectedFurniToRecycler();
    }

    public returnInventoryFurniFromRecycler(param1: number): boolean {
        if (this._inventory == null) {
            return false;
        }
        return this._inventory.returnInventoryFurniFromRecycler(param1);
    }

    public getProductData(param1: string): IProductData {
        return this._sessionDataManager.getProductData(param1);
    }

    public getFurnitureData(param1: number, param2: string): IFurnitureData {
        let _loc3_: IFurnitureData = null;
        if (param2 == "s") {
            _loc3_ = this._sessionDataManager.getFloorItemData(param1);
        }
        if (param2 == "i") {
            _loc3_ = this._sessionDataManager.getWallItemData(param1);
        }
        return _loc3_;
    }

    public getFurnitureDataByName(param1: string, param2: string, param3: number = 0): IFurnitureData {
        let _loc4_: IFurnitureData = null;
        if (this._sessionDataManager == null) {
            return null;
        }
        if (param2 == "s") {
            _loc4_ = this._sessionDataManager.getFloorItemDataByName(param1);
        }
        if (param2 == "i") {
            _loc4_ = this._sessionDataManager.getWallItemDataByName(param1);
        }
        return _loc4_;
    }

    public getPurse(): IPurse {
        return this._SafeStr_2234;
    }

    public getEarnings(): IHabboEarnings {
        return this._SafeStr_5872;
    }

    public getRecycler(): IRecycler {
        return this._SafeStr_2271;
    }

    public getMarketPlace(): IMarketPlace {
        return this._SafeStr_2364;
    }

    public getClubGiftController(): ClubGiftController {
        return this._SafeStr_4508;
    }

    public getClubBuyController(): ClubBuyController {
        return this._SafeStr_3114;
    }

    public getClubExtendController(): ClubExtendController {
        return this._SafeStr_3227;
    }

    public getPublicMarketPlaceOffers(param1: number, param2: number, param3: string, param4: number, param5: boolean = true): void {
        this.send(new GetMarketplaceOffersMessageComposer(param1, param2, param3, param4, param5));
    }

    public getRoomAdsPurchaseInfo(): void {
        this.send(new GetRoomAdPurchaseInfoComposer());
    }

    public sendRoomAdPurchaseInitiatedEvent(): void {
        this.send(new RoomAdPurchaseInitiatedComposer());
    }

    public getOwnMarketPlaceOffers(param1: number = 1): void {
        this.send(new GetMarketplaceOwnOffersMessageComposer(param1));
    }

    public cancelAllMarketPlaceOffers(): void {
        this.send(new CancelAllMarketplaceOffersMessageComposer());
    }

    public clearOwnMarketPlaceHistory(param1: number): void {
        this.send(new ClearMarketplaceOwnHistoryMessageComposer(param1));
    }

    public buyMarketPlaceOffer(param1: number): void {
        this.send(new BuyMarketplaceOfferMessageComposer(param1));
    }

    public redeemSoldMarketPlaceOffers(): void {
        this.send(new RedeemMarketplaceOfferCreditsMessageComposer());
    }

    public redeemExpiredMarketPlaceOffer(param1: number): void {
        this.send(new CancelMarketplaceOfferMessageComposer(param1));
    }

    public getMarketplaceItemStats(param1: number, param2: number, param3: string = null): void {
        if (!this._communication) {
            return;
        }
        this.send(new GetMarketplaceItemStatsComposer(param1, param2, param3));
    }

    public getGroupMembershipsController(): GuildMembershipsController {
        return this._SafeStr_2956;
    }

    public getPixelEffectIcon(param1: number): BitmapData {
        let _loc2_: BitmapDataAsset = asInstanceOf((this._inventory instanceof Component ? this._inventory : null).assets.getAssetByName("fx_icon_" + param1 + "_png"), BitmapDataAsset);
        if (_loc2_ != null && _loc2_.content != null) {
            return (asInstanceOf(_loc2_.content, BitmapData)).clone();
        }
        return new BitmapData(1, 1, true, 16777215);
    }

    public getSubscriptionProductIcon(param1: number): BitmapData {
        let _loc2_: BitmapDataAsset = asInstanceOf(this.assets.getAssetByName("icon_hc"), BitmapDataAsset);
        if (_loc2_ != null) {
            return (asInstanceOf(_loc2_.content, BitmapData)).clone();
        }
        return new BitmapData(1, 1, true, 16777215);
    }

    public getMintTokenProductIcon(): BitmapData {
        let _loc1_: BitmapDataAsset = asInstanceOf(this.assets.getAssetByName("minting_token_large"), BitmapDataAsset);
        if (_loc1_ != null) {
            return (asInstanceOf(_loc1_.content, BitmapData)).clone();
        }
        return new BitmapData(1, 1, true, 16777215);
    }

    public getSellablePetPalettes(param1: string): any[] {
        let _loc2_: any[] = this._sellablePetPalettes.getValue(param1);
        if (_loc2_ != null) {
            return _loc2_.slice();
        }
        this.send(new GetSellablePetPalettesComposer(param1));
        return null;
    }

    private updatePurse(): void {
        let _loc5_: string = null;
        let _loc3_: IIconWindow = null;
        let _loc1_: ITextWindow = null;
        this._localization.registerParameter("catalog.purse.creditbalance", "balance", String(this._SafeStr_2234.credits));
        this._localization.registerParameter("catalog.purse.pixelbalance", "balance", String(this._SafeStr_2234.getActivityPointsForType(0)));
        let _loc4_: number = 11;
        if (!this._SafeStr_2234.hasClubLeft) {
            _loc5_ = "catalog.purse.club.join";
        } else {
            if (this._SafeStr_2234.isVIP) {
                _loc5_ = "catalog.purse.vipdays";
                _loc4_ = 12;
            } else {
                _loc5_ = "catalog.purse.clubdays";
            }
            this._localization.registerParameter(_loc5_, "days", String(this._SafeStr_2234.clubDays));
            this._localization.registerParameter(_loc5_, "months", String(this._SafeStr_2234.clubPeriods));
        }
        if (this._catalogStates == null) {
            return;
        }
        for (const _loc2_ of this._catalogStates?.values() ?? []) {
            if (_loc2_.mainContainer != null) {
                _loc3_ = asGuarded(_loc2_.mainContainer.findChildByName("clubIcon"), isIIconWindow);
                if (_loc3_ != null) {
                    _loc3_.style = _loc4_;
                }
                _loc1_ = asGuarded(_loc2_.mainContainer.findChildByName("clubText"), isITextWindow);
                if (_loc1_ != null) {
                    _loc1_.caption = this._localization.getLocalization(_loc5_);
                }
            }
        }
    }

    private onHabboToolbarEvent(param1: HabboToolbarEvent): void {
        if (param1.type != "HTE_TOOLBAR_CLICK") {
            return;
        }
        switch (param1.iconId) {
            case "HTIE_ICON_CATALOGUE":
                this.toggleCatalog("NORMAL");
                break;
            case "HTIE_ICON_BUILDER":
                this.toggleCatalog("BUILDERS_CLUB");
        }
    }

    private setElementColour(param1: string, param2: number): void {
        if (this._mainContainer == null) {
            return;
        }
        let _loc3_: IWindow = this._mainContainer.findChildByName(param1);
        if (_loc3_ != null) {
            _loc3_.color = param2 >>> 0;
        }
    }

    private focusSearchInput(param1: IWindowContainer): void {
        let _loc2_: ITextFieldWindow = asGuarded(param1.findChildByName("search.input"), isITextFieldWindow);
        if (_loc2_ != null) {
            _loc2_.focus();
            _loc2_.setSelection(0, _loc2_.text.length);
        }
    }

    private setCatalogBusy(param1: string, param2: boolean): void {
        let _loc3_: CatalogWindowState = this.getCatalogState(param1);
        if (_loc3_ == null || _loc3_.mainContainer == null) {
            return;
        }
        _loc3_.mainContainer.caption = param2 ? "${generic.loading}" : (param1 == "NORMAL" ? "${catalog.title}" : "${builder.catalog.title}");
        let _loc4_: IWindow = _loc3_.mainContainer.findChildByName("search_waiting_for_results_mask");
        if (_loc4_ != null) {
            _loc4_.visible = param2;
        }
    }

    private refreshCatalogWindowChrome(param1: string, param2: IWindowContainer): void {
        if (param2 == null) {
            return;
        }
        param2.color = (param1 == "NORMAL" ? 4296112 : 16758076) >>> 0;
        param2.caption = param1 == "NORMAL" ? "${catalog.title}" : "${builder.catalog.title}";
        let _loc3_: IWindow = param2.findChildByName("catalog.header.background.border");
        if (_loc3_ != null) {
            _loc3_.color = param1 == "NORMAL" ? 4281819765 : 4283320388;
        }
        let _loc5_: IWindow = param2.findChildByName("catalog.header.background.body");
        if (_loc5_ != null) {
            _loc5_.color = param1 == "NORMAL" ? 4279123794 : 4281149220;
        }
        let _loc4_: IWindow = param2.findChildByName("catalog.mode.header");
        if (_loc4_ != null) {
            _loc4_.visible = param1 == "NORMAL";
        }
        let _loc6_: IWindow = param2.findChildByName("builder.mode.header");
        if (_loc6_ != null) {
            _loc6_.visible = param1 == "BUILDERS_CLUB";
        }
    }

    public get buildersClubEnabled(): boolean {
        return this.getBoolean("builders.club.enabled");
    }

    public toggleCatalog(param1: string, param2: boolean = false, param3: boolean = true): void {
        if (!this._sessionDataManager.hasSecurity(5) && !this.buildersClubEnabled) {
            param1 = "NORMAL";
        }
        if (this._SafeStr_3551 != null) {
            this._SafeStr_3551.stop();
        }
        this.cancelFurniInMover();
        if (this._catalogStates == null) {
            if (this.init(param1) == false) {
                this._SafeStr_14831 = param1;
                this._SafeStr_14832 = param2;
                this._SafeStr_14833 = param3;
                return;
            }
        }
        this._SafeStr_14831 = null;
        let _loc7_: CatalogWindowState = this.getCatalogState(this._catalogType);
        let _loc6_: CatalogWindowState = this.setActiveCatalogState(param1);
        let _loc5_: boolean = this.mainWindowVisible();
        let _loc4_: boolean = _loc7_ != null && _loc7_ != _loc6_;
        if (_loc6_.catalogNavigator == null || !_loc6_.catalogNavigator.initialized) {
            this.refreshCatalogIndex(param1);
        }
        if (_loc4_ && _loc7_ != null && this.isMainWindowVisible(_loc7_)) {
            this.hideMainWindow(_loc7_, false);
        }
        if (!_loc4_ && _loc5_ && !param2) {
            this.hideMainWindow(_loc6_, true);
        } else if (!_loc5_ || param2 || _loc4_) {
            if (this._newAdditionsAvailable) {
                this._newAdditionsAvailable = false;
                this.events.dispatchEvent(new CatalogEvent("CATALOG_NEW_ITEMS_HIDE"));
                this.markNewAdditionPageOpened();
            }
            this.showMainWindow(_loc6_);
            if (param3 && _loc6_.catalogViewer.currentPage == null && _loc6_.catalogNavigator.initialized) {
                _loc6_.catalogNavigator.showIndex();
                _loc6_.catalogNavigator.loadFrontPage();
            } else if (_loc6_.catalogViewer.currentPage != null) {
                this.dispatchRoomChangedToCatalogPage(_loc6_);
            }
        }
        if (this.mainWindowVisible()) {
            if (this._mainContainer == null) {
                Logger.log("[Catalog] No main container!");
            } else {
                this._mainContainer.activate();
                this.focusSearchInput(this._mainContainer);
            }
            HabboTracking.getInstance().trackGoogle("catalogue", "open");
        }
        this.refreshCatalogWindowChrome(param1, _loc6_.mainContainer);
        this.refreshBuilderStatus();
        if (this.mainWindowVisible()) {
            this.events.dispatchEvent(new Event("HABBO_CATALOG_TRACKING_EVENT_OPEN"));
            if (this._SafeStr_2271 != null && this.getCurrentLayoutCode() == "recycler") {
                this._SafeStr_2271.activate();
            }
        } else {
            this.events.dispatchEvent(new Event("HABBO_CATALOG_TRACKING_EVENT_CLOSE"));
            if (this._SafeStr_2271 != null && _loc7_ != null && _loc7_.catalogViewer != null && _loc7_.catalogViewer.getCurrentLayoutCode() == "recycler") {
                this._SafeStr_2271.cancel();
            }
        }
        if (this._SafeStr_2271 != null) {
            this.setupInventoryForRecycler(this._SafeStr_2271.active && this.mainWindowVisible());
        }
    }

    private getCurrentLayoutCode(): string {
        if (this._SafeStr_2204 == null) {
            return "";
        }
        return this._SafeStr_2204.getCurrentLayoutCode();
    }

    private refreshCatalogIndex(param1: string): void {
        this.send(new GetCatalogIndexComposer(param1));
    }

    private markNewAdditionPageOpened(): void {
        this.send(new MarkCatalogNewAdditionsPageOpenedComposer());
    }

    private createCatalogWindowStates(): void {
        this._catalogStates = new Dictionary();
        this._catalogNavigators = new Dictionary();
        this.createCatalogWindowState("NORMAL");
        this.createCatalogWindowState("BUILDERS_CLUB");
    }

    private createCatalogWindowState(param1: string): CatalogWindowState {
        if (this._catalogStates != null && this._catalogStates.get(param1) != null) {
            return this._catalogStates.get(param1);
        }
        let _loc3_: CatalogWindowState = new CatalogWindowState(param1);
        _loc3_.mainContainer = this.createMainWindow(param1);
        if (param1 == "BUILDERS_CLUB") {
            _loc3_.mainContainer.height += 15;
        }
        _loc3_.catalogNavigator = new CatalogNavigator(this, _loc3_.mainContainer, param1);
        _loc3_.catalogViewer = new CatalogViewer(this, asGuarded(_loc3_.mainContainer.findChildByName("layoutContainer"), isIWindowContainer), param1);
        this._catalogStates.set(param1, _loc3_);
        this._catalogNavigators.set(param1, _loc3_.catalogNavigator);
        let _loc2_: BitmapDataAsset = asInstanceOf(this.assets.getAssetByName("purse_coins_small"), BitmapDataAsset);
        this.setElementImageForContainer(_loc3_.mainContainer, "creditsIcon", asInstanceOf(_loc2_.content, BitmapData));
        let _loc5_: BitmapDataAsset = asInstanceOf(this.assets.getAssetByName("purse_pixels_small"), BitmapDataAsset);
        this.setElementImageForContainer(_loc3_.mainContainer, "pixelsIcon", asInstanceOf(_loc5_.content, BitmapData));
        let _loc4_: BitmapDataAsset = asInstanceOf(this.assets.getAssetByName("purse_club_small"), BitmapDataAsset);
        this.setElementImageForContainer(_loc3_.mainContainer, "clubIcon", asInstanceOf(_loc4_.content, BitmapData));
        return _loc3_;
    }

    private createMainWindow(param1: string): IWindowContainer {
        let _loc5_: IWindow = null;
        let _loc7_: XmlAsset = asInstanceOf(this.assets.getAssetByName(this.getCatalogWindowAssetName(param1)), XmlAsset);
        let _loc2_: IWindowContainer = asGuarded(this._windowManager.buildFromXML(asInstanceOf(_loc7_.content, XML), 1), isIWindowContainer);
        _loc2_.tags.push("habbo_catalog");
        _loc2_.position = this._SafeStr_14829.clone();
        _loc2_.visible = false;
        _loc2_.addEventListener("WE_RELOCATE", this.onMainWindowRelocate);
        let _loc3_: IWindowContainer = asGuarded(_loc2_.parent, isIWindowContainer);
        if (_loc3_ != null) {
            _loc3_.removeChild(_loc2_);
        }
        let _loc6_: IWindow = _loc2_.findChildByName("titlebar_close_button");
        if (_loc6_ == null) {
            _loc6_ = _loc2_.findChildByTag("close");
        }
        if (_loc6_ != null) {
            _loc6_.procedure = this.onWindowClose;
        }
        let _loc4_: ITextFieldWindow = asGuarded(_loc2_.findChildByName("search.input"), isITextFieldWindow);
        if (_loc4_ != null) {
            _loc4_.addEventListener("WKE_KEY_DOWN", this.onSearchInputEvent);
            _loc4_.addEventListener("WKE_KEY_UP", this.onSearchInputEvent);
            _loc4_.setSelection(0, _loc4_.text.length);
            _loc5_ = _loc2_.findChildByName("clear_search_button");
            if (_loc5_ != null) {
                _loc5_.addEventListener("WME_CLICK", this.onClearSearch);
            }
        }
        this.refreshCatalogWindowChrome(param1, _loc2_);
        return _loc2_;
    }

    private getCatalogWindowAssetName(param1: string): string {
        return this.useNonTabbedCatalog(param1) ? "catalog_ubuntu" : "catalog_ubuntu_with_tabs";
    }

    public set isBusy(param1: boolean) {
        this.setCatalogBusy(this._catalogType, param1);
    }

    private onSelectSearch(param1: WindowMouseEvent): void {
        let _loc2_: ITextFieldWindow = asGuarded(param1.target, isITextFieldWindow);
        if (_loc2_) {
            _loc2_.setSelection(0, _loc2_.text.length);
            _loc2_.focus();
        }
    }

    private onClearSearch(param1: WindowMouseEvent = null): void {
        let _loc2_: ITextFieldWindow = asGuarded(this._mainContainer.findChildByName("search.input"), isITextFieldWindow);
        _loc2_.caption = "";
        _loc2_.setSelection(0, _loc2_.text.length);
        _loc2_.focus();
        let _loc3_: IStaticBitmapWrapperWindow = asGuarded(this._mainContainer.findChildByName("search.clear.icon"), isIStaticBitmapWrapperWindow);
        _loc3_.assetUri = "common_small_pen";
        if (this._SafeStr_2204.previousPageId > 0) {
            this.currentCatalogNavigator.openPageById(this._SafeStr_2204.previousPageId, -1);
        }
        this._mainContainer.findChildByName("search.helper").visible = true;
    }

    private onSearchInputEvent(param1: WindowKeyboardEvent): void {
        if (param1.type == "WKE_KEY_DOWN") {
            if (this._SafeStr_3551) {
                this._SafeStr_3551.stop();
            }
            return;
        }
        if (this._SafeStr_3551 == null) {
            this._SafeStr_3551 = new Timer(50, 1);
            this._SafeStr_3551.addEventListener("timer", this.onKeyUpSearchTimer);
        }
        if (param1.target.caption.length >= 3) {
            this._SafeStr_3551.reset();
            this._SafeStr_3551.start();
        }
        let _loc2_: IWindow = this._mainContainer.findChildByName("search.helper");
        _loc2_.visible = param1.target.caption.length == 0;
        let _loc3_: IStaticBitmapWrapperWindow = asGuarded(this._mainContainer.findChildByName("search.clear.icon"), isIStaticBitmapWrapperWindow);
        _loc3_.assetUri = param1.target.caption.length > 0 ? "icons_close" : "common_small_pen";
        if (param1.target.caption.length == 0) {
            this.onClearSearch();
        } else if (param1.keyCode == 13) {
            this.performSearch(param1.target.caption);
        }
    }

    private onKeyUpSearchTimer(param1: TimerEvent): void {
        let _loc2_: ITextFieldWindow = asGuarded(this._mainContainer.findChildByName("search.input"), isITextFieldWindow);
        this.performSearch(_loc2_.caption);
    }

    private performSearch(param1: string): void {
        let _loc8_: IFurnitureData = null;
        let _loc3_: IPurchasableOffer = null;
        let _loc6_: string = null;
        if (this._SafeStr_3551) {
            this._SafeStr_3551.stop();
        }
        if (this._furnitureData == null || param1 == null || param1.length == 0) {
            return;
        }
        let _loc9_: CatalogWindowState = this.getCatalogState(this._catalogType);
        if (_loc9_ == null || _loc9_.catalogNavigator == null || _loc9_.catalogViewer == null || _loc9_.mainContainer == null) {
            return;
        }
        this.ensureSearchEntries();
        let _loc4_: any[] = [];
        let _loc5_: IPurchasableOffer[] = new Array<IPurchasableOffer>(0).fill(null);
        let _loc7_: Map<any, any> = new Dictionary();
        let _loc10_: string = HabboCatalog.normalizeSearchText(param1);
        for (const _loc2_ of this._searchEntries ?? []) {
            _loc8_ = _loc2_.furniData;
            if (!(this._catalogType == "BUILDERS_CLUB" && !_loc8_.availableForBuildersClub)) {
                if (!(this._catalogType == "NORMAL" && _loc8_.excludedFromDynamic)) {
                    if (HabboCatalog.matchesSearchEntry(_loc2_, _loc10_)) {
                        _loc3_ = this.createSearchResultOffer(_loc2_);
                        if (_loc3_ != null) {
                            this.addMatchingNodesForOffer(_loc3_.offerId, _loc7_);
                            if (!HabboCatalog.isExcludedFromFurnitureSearchResults(_loc8_)) {
                                _loc5_.push(_loc3_);
                                if (_loc5_.length >= 400) {
                                    break;
                                }
                            }
                        } else if (this._catalogType == "BUILDERS_CLUB" && _loc8_.furniLine != "") {
                            _loc6_ = HabboCatalog.normalizeSearchText(_loc8_.furniLine);
                            if (_loc6_.length > 0 && _loc4_.indexOf(_loc6_) < 0) {
                                _loc4_.push(_loc6_);
                            }
                        }
                    }
                }
            }
        }
        this.localization.registerParameter("catalog.search.results", "count", _loc5_.length.toString());
        this.localization.registerParameter("catalog.search.results", "needle", param1);
        let _loc11_: IWindow = _loc9_.mainContainer.findChildByName("catalog.header.title");
        if (_loc11_ != null) {
            _loc11_.caption = "${catalog.search.header}";
        }
        _loc9_.catalogNavigator.deactivateCurrentNode();
        _loc9_.catalogViewer.showSearchResults(_loc5_);
        _loc9_.catalogNavigator.filter(_loc10_, _loc4_, _loc7_);
    }

    private ensureSearchEntries(): void {
        let _loc1_: string = null;
        let _loc5_: string = null;
        let _loc4_: IProductData = null;
        let _loc2_: any = undefined;
        if (!this._SafeStr_14834) {
            return;
        }
        this._searchEntries = new Array<CatalogSearchEntry>(0).fill(null);
        if (this._furnitureData != null) {
            for (const _loc3_ of this._furnitureData ?? []) {
                _loc1_ = HabboCatalog.resolveSearchProductCode(_loc3_);
                _loc5_ = "";
                if (this._SafeStr_5422 && _loc1_ != null && _loc1_.length > 0) {
                    _loc4_ = this.getProductData(_loc1_);
                    if (_loc4_ != null && _loc4_.name != null) {
                        _loc5_ = _loc4_.name;
                    }
                }
                _loc2_ = new Array<string>(0).fill(null);
                HabboCatalog.addSearchTerm(_loc2_, _loc3_.localizedName);
                HabboCatalog.addSearchTerm(_loc2_, _loc5_);
                this._searchEntries.push(new CatalogSearchEntry(_loc3_, _loc2_, _loc1_));
            }
        }
        this._SafeStr_14834 = false;
    }

    private createSearchResultOffer(param1: CatalogSearchEntry): IPurchasableOffer {
        let _loc3_: IFurnitureData = param1.furniData;
        let _loc2_: number = -1;
        let _loc4_: boolean = false;
        if (this._catalogType == "BUILDERS_CLUB") {
            if (_loc3_.bcOfferId != -1 && this.currentCatalogNavigator.getNodesByOfferId(_loc3_.bcOfferId, true) != null) {
                _loc2_ = _loc3_.bcOfferId;
            }
        } else if (_loc3_.purchaseOfferId != -1 && this.currentCatalogNavigator.getNodesByOfferId(_loc3_.purchaseOfferId, true) != null) {
            _loc2_ = _loc3_.purchaseOfferId;
        } else if (_loc3_.rentOfferId != -1 && this.currentCatalogNavigator.getNodesByOfferId(_loc3_.rentOfferId, true) != null) {
            _loc2_ = _loc3_.rentOfferId;
            _loc4_ = true;
        }
        if (_loc2_ == -1) {
            return null;
        }
        return new FurnitureOffer(_loc3_, this, _loc2_, _loc4_, param1.productCode);
    }

    private addMatchingNodesForOffer(param1: number, param2: Map<any, any>): void {
        let _loc4_: ICatalogNode[] = this.currentCatalogNavigator.getNodesByOfferId(param1, true);
        if (_loc4_ == null) {
            return;
        }
        for (const _loc3_ of _loc4_ ?? []) {
            param2.set(_loc3_.pageId, true);
        }
    }

    public furniDataReady(): void {
        this._furnitureData = this._sessionDataManager.getFurniData(this);
        this._SafeStr_14834 = true;
        this._pagesVisibleInBuilderMode = null;
    }

    private onRoomSessionEvent(param1: RoomSessionEvent): void {
        switch (param1.type) {
            case "RSE_STARTED":
                this._SafeStr_4987 = param1.session.isPrivateRoom;
                this._roomSession = param1.session;
                if (this._SafeStr_2271 != null) {
                    this._SafeStr_2271.setRoomSessionActive(true);
                }
                break;
            case "RSE_ENDED":
                this._SafeStr_4987 = false;
                this._roomSession = null;
                if (this._SafeStr_2271 != null) {
                    this._SafeStr_2271.setRoomSessionActive(false);
                }
        }
        this.dispatchRoomChangedToCatalogPages();
    }

    private createRecycler(): void {
        this._SafeStr_2271 = new RecyclerLogic(this, this._windowManager);
    }

    private createMarketPlace(): void {
        if (this._SafeStr_2364 == null) {
            this._SafeStr_2364 = new MarketPlaceLogic(this, this._windowManager, this._roomEngine);
        }
    }

    private createClubGiftController(): void {
        if (this._SafeStr_4508 == null) {
            this._SafeStr_4508 = new ClubGiftController(this);
        }
    }

    private createClubBuyController(): void {
        if (this._SafeStr_3114 == null) {
            this._SafeStr_3114 = new ClubBuyController(this, this.connection);
        }
    }

    private createClubExtendController(): void {
        if (this._SafeStr_3227 == null) {
            this._SafeStr_3227 = new ClubExtendController(this);
        }
    }

    private createGroupMembershipsController(): void {
        if (this._SafeStr_2956 == null) {
            this._SafeStr_2956 = new GuildMembershipsController(this);
        }
    }

    private getGiftWrappingConfiguration(): void {
        this.send(new GetGiftWrappingConfigurationMessageComposer());
    }

    public getHabboClubOffers(param1: number): void {
        this.send(new GetClubOffersMessageComposer(param1));
    }

    private onWindowClose(param1: WindowEvent, param2: IWindow): void {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.hideMainWindow();
        if (this._SafeStr_2271 != null && this.getCurrentLayoutCode() == "recycler") {
            this._SafeStr_2271.cancel();
            this.setupInventoryForRecycler(false);
        }
    }

    private onCatalogIndex(param1: CatalogIndexMessageEvent): void {
        let _loc2_: CatalogWindowState = this.getCatalogState(param1.catalogType);
        if (_loc2_ == null || _loc2_.catalogNavigator == null) {
            return;
        }
        this._newAdditionsAvailable = param1.newAdditionsAvailable;
        _loc2_.catalogNavigator.buildCatalogIndex(param1.root);
        if (param1.catalogType == this._catalogType) {
            _loc2_.catalogNavigator.showIndex();
        }
        switch (_loc2_._SafeStr_2639.requestType) {
            case 0:
                if (this._newAdditionsAvailable && this._SafeStr_7207 && !this.newAdditionsPageOpenDisabled && param1.catalogType == "NORMAL") {
                    this.events.dispatchEvent(new CatalogEvent("CATALOG_NEW_ITEMS_SHOW"));
                    this.openCatalogPage("new_additions");
                } else {
                    _loc2_.catalogNavigator.loadFrontPage();
                }
                break;
            case 1:
                _loc2_.catalogNavigator.openPageById(_loc2_._SafeStr_2639.requestId, _loc2_._SafeStr_2639.requestedOfferId);
                _loc2_._SafeStr_2639.resetRequest();
                break;
            case 2:
                _loc2_.catalogNavigator.openPage(_loc2_._SafeStr_2639.requestName);
                _loc2_._SafeStr_2639.resetRequest();
        }
    }

    private onCatalogPage(param1: CatalogPageMessageEvent): void {
        let _loc7_: any;
        let _loc10_: any = undefined;
        let _loc11_: IProductData = null;
        let _loc8_: IFurnitureData = null;
        let _loc12_: Offer = null;
        let _loc13_: CatalogPageMessageParser = param1.getParser();
        let _loc17_: CatalogWindowState = this.getCatalogState(_loc13_.catalogType);
        if (_loc17_ == null || _loc17_.catalogViewer == null) {
            return;
        }
        let _loc9_: number = _loc13_.pageId;
        let _loc4_: string = _loc13_.layoutCode;
        let _loc5_: any[] = _loc13_.localization.images.concat();
        let _loc14_: any[] = _loc13_.localization.texts.concat();
        let _loc2_: IPageLocalization = new PageLocalization(_loc5_, _loc14_);
        let _loc15_: number = _loc13_.offerId;
        let _loc6_: boolean = _loc13_.acceptSeasonCurrencyAsCredits;
        let _loc3_: IPurchasableOffer[] = new Array<IPurchasableOffer>(0).fill(null);
        for (const _loc16_ of _loc13_.offers ?? []) {
            _loc10_ = new Array<IProduct>(0).fill(null);
            _loc11_ = this.getProductData(_loc16_.localizationId);
            for (_loc7_ of _loc16_.products ?? []) {
                _loc8_ = this.getFurnitureData(_loc7_.furniClassId, _loc7_.productType);
                _loc10_.push(new Product(_loc7_.productType, _loc7_.furniClassId, _loc7_.extraParam, this.getProductCountOverride(_loc16_.localizationId, _loc8_, _loc7_.productCount), _loc11_, _loc8_, this, _loc7_.uniqueLimitedItem, _loc7_.uniqueLimitedItemSeriesSize, _loc7_.uniqueLimitedItemsLeft));
            }
            if (!(_loc10_.length == 0 && !HabboCatalogUtils.buildersClub(_loc16_.localizationId))) {
                _loc12_ = new Offer(_loc16_.offerId, _loc16_.localizationId, _loc16_.isRent, _loc16_.priceInCredits, _loc16_.priceInActivityPoints, _loc16_.activityPointType, _loc16_.priceInSilver, _loc16_.giftable, _loc16_.clubLevel, _loc10_, _loc16_.bundlePurchaseAllowed, this);
                if (_loc12_.productContainer != null && this.isOfferCompatibleWithCatalogType(_loc12_, _loc13_.catalogType)) {
                    _loc3_.push(_loc12_);
                } else {
                    _loc12_.dispose();
                }
            }
        }
        if (_loc13_.frontPageItems != null && _loc13_.frontPageItems.length > 0) {
            this._frontPageItems = _loc13_.frontPageItems;
        }
        if (_loc17_.lastPageRequestId == _loc9_) {
            _loc17_.catalogViewer.showCatalogPage(_loc9_, _loc4_, _loc2_, _loc3_, _loc15_, _loc6_);
        }
        this.setCatalogBusy(_loc13_.catalogType, false);
    }

    private isOfferCompatibleWithCatalogType(param1: Offer, param2: string): boolean {
        return param2 == "NORMAL" || param1.pricingModel != "pricing_model_bundle" && param1.pricingModel != "pricing_model_multi";
    }

    private onCatalogPublished(param1: IMessageEvent): void {
        let _loc4_: string = null;
        let _loc2_: CatalogPublishedMessageEvent = param1 instanceof CatalogPublishedMessageEvent ? param1 : null;
        if (_loc2_.newFurniDataHash) {
            this.sessionDataManager.newFurniDataHash = _loc2_.newFurniDataHash;
        }
        this._SafeStr_4887 = true;
        let _loc3_: boolean = this.mainWindowVisible();
        this.reset();
        if (_loc3_) {
            this._windowManager.alert("${catalog.alert.published.title}", "${catalog.alert.published.description}", 0, this.alertDialogEventProcessor);
        } else if (this._notifications) {
            _loc4_ = this.localization.getLocalization("catalog.alert.published.description");
            this._notifications.addItem(_loc4_, "info", "if_icon_temp_png");
        }
    }

    private refreshFurniData(): void {
        this.sessionDataManager.refreshFurniData();
        this._SafeStr_4887 = false;
    }

    private onNftStorePurchase(param1: NftStorePurchaseMessageEvent): void {
        let _loc4_: IProductImageWidget = null;
        let _loc3_: string = null;
        let _loc2_: NftStorePurchaseMessageEventParser = param1.getParser();
        if (_loc2_.result == NftStorePurchaseMessageEventParser._SafeStr_7384) {
            this._windowManager.alert("${catalog.alert.purchaseerror.title}", "${notification.nft.purchase.error}", 0, null);
        } else {
            _loc4_ = this._SafeStr_2174.getNftImage();
            _loc3_ = this._SafeStr_2288.getProductName(_loc4_.productInfo);
            this._notifications.addItem(this._localization.getLocalizationWithParams("notifications.text.purchase.ok", "", "productName", _loc3_), "info", "icon_curator_stamp_large_png");
        }
        if (this._SafeStr_2174 != null) {
            this._SafeStr_2174.dispose();
            this._SafeStr_2174 = null;
        }
    }

    private onPurchaseError(param1: IMessageEvent): void {
        let _loc3_: PurchaseErrorMessageEvent = param1 instanceof PurchaseErrorMessageEvent ? param1 : null;
        let _loc2_: PurchaseErrorMessageParser = _loc3_.getParser();
        let _loc4_: number = _loc2_.errorCode;
        let _loc5_: string = _loc4_ > 0 ? "${catalog.alert.purchaseerror.description." + _loc4_ + "}" : "${catalog.alert.purchaseerror.description}";
        this._windowManager.alert("${catalog.alert.purchaseerror.title}", _loc5_, 0, this.alertDialogEventProcessor);
        if (this._SafeStr_2174 != null) {
            this._SafeStr_2174.dispose();
            this._SafeStr_2174 = null;
        }
    }

    private onPurchaseNotAllowed(param1: IMessageEvent): void {
        let _loc2_: PurchaseNotAllowedMessageEvent = param1 instanceof PurchaseNotAllowedMessageEvent ? param1 : null;
        let _loc3_: PurchaseNotAllowedMessageParser = _loc2_.getParser();
        let _loc4_: number = _loc3_.errorCode;
        let _loc5_: string = "";
        switch (_loc4_ - 1) {
            case 0:
                _loc5_ = "${catalog.alert.purchasenotallowed.hc.description}";
                break;
            default:
                _loc5_ = "${catalog.alert.purchasenotallowed.unknown.description}";
        }
        this._windowManager.alert("${catalog.alert.purchasenotallowed.title}", _loc5_, 0, this.alertDialogEventProcessor);
    }

    private onPurchaseOK(param1: IMessageEvent): void {
        let _loc6_: IBitmapWrapperWindow = null;
        let _loc2_: BitmapData = null;
        let _loc7_: Point = null;
        let _loc5_: string = null;
        let _loc3_: PurchaseOKMessageEvent = param1 instanceof PurchaseOKMessageEvent ? param1 : null;
        let _loc4_: PurchaseOKMessageParser = _loc3_.getParser();
        this.events.dispatchEvent(new CatalogFurniPurchaseEvent(_loc4_.offer.localizationId));
        if (this._SafeStr_2174 != null) {
            if (!this._SafeStr_2680 && !this._SafeStr_2174.isGiftPurchase()) {
                _loc6_ = this._SafeStr_2174.getIconWrapper();
                if (_loc6_) {
                    _loc2_ = _loc6_.bitmap;
                    if (_loc2_) {
                        _loc7_ = new Point();
                        _loc6_.getGlobalPosition(_loc7_);
                        _loc5_ = "HTIE_ICON_INVENTORY";
                        if (this._SafeStr_2174.productType == "e") {
                            _loc5_ = "HTIE_ICON_MEMENU";
                        }
                        this._toolbar.createTransitionToIcon(_loc5_, _loc2_.clone(), _loc7_.x | 0, _loc7_.y | 0);
                    }
                }
            }
            this._SafeStr_2174.ltdRaffleEnded();
            this._SafeStr_2174.dispose();
        }
        this._SafeStr_2174 = null;
    }

    private onGiftReceiverNotFound(param1: GiftReceiverNotFoundEvent): void {
        if (this._SafeStr_2174 != null) {
            this._SafeStr_2174.receiverNotFound();
        }
    }

    private onNotEnoughBalance(param1: IMessageEvent): void {
        let _loc3_: NotEnoughBalanceMessageEvent = param1 instanceof NotEnoughBalanceMessageEvent ? param1 : null;
        let _loc2_: NotEnoughBalanceMessageParser = _loc3_.getParser();
        if (_loc2_.notEnoughCredits) {
            this.showNotEnoughCreditsAlert();
        } else if (_loc2_.notEnoughActivityPoints) {
            this.showNotEnoughActivityPointsAlert(_loc2_.activityPointType);
        }
        if (this._SafeStr_2174 != null) {
            this._SafeStr_2174.notEnoughCredits();
        }
    }

    public setLeftPaneVisibility(param1: boolean): void {
        if (!this._mainContainer) {
            return;
        }
        let _loc2_: IWindow = this._mainContainer.findChildByName("navigationContainer");
        if (_loc2_) {
            _loc2_.visible = param1;
        }
        _loc2_ = this._mainContainer.findChildByName("searchContainer");
        if (_loc2_) {
            _loc2_.visible = param1;
        }
    }

    public showNotEnoughCreditsAlert(): void {
        if (!this._windowManager) {
            return;
        }
        this._windowManager.confirm("${catalog.alert.notenough.title}", "${catalog.alert.notenough.credits.description}", 0, this.noCreditsConfirmDialogEventProcessor);
    }

    public showNotEnoughActivityPointsAlert(param1: number): void {
        let _loc2_: string = this.getActivityPointName(param1);
        let _loc3_: string = this.localization.getLocalizationWithParams("catalog.alert.notenough.activitypoints.title", "", "currencyname", _loc2_);
        let _loc4_: string = this.localization.getLocalizationWithParams("catalog.alert.notenough.activitypoints.description", "", "currencyname", _loc2_);
        if (param1 == 0) {
            this._windowManager.confirm(_loc3_, _loc4_, 0, this.noDucketsConfirmDialogEventProcessor);
        } else {
            this._windowManager.alert(_loc3_, _loc4_, 0, this.alertDialogEventProcessor);
        }
    }

    public getActivityPointName(param1: number): string {
        let _loc2_: string = this.getProperty("activitypoint.name." + param1);
        return this.localization.getLocalization(_loc2_, _loc2_);
    }

    private onSilverBalance(param1: SilverBalanceMessageEvent): void {
        let _loc2_: SilverBalanceMessageEventParser = param1.getParser();
        this._SafeStr_2234.silverBalance = _loc2_.silverBalance;
        this.events.dispatchEvent(new PurseEvent("catalog_purse_silver_balance", this._SafeStr_2234.silverBalance, 0));
        this.events.dispatchEvent(new PurseUpdateEvent());
    }

    private onEmeraldBalance(param1: EmeraldBalanceMessageEvent): void {
        let _loc2_: EmeraldBalanceMessageEventParser = param1.getParser();
        this._SafeStr_2234.emeraldBalance = _loc2_.emeraldBalance;
        this.events.dispatchEvent(new PurseEvent("catalog_purse_emerald_balance", this._SafeStr_2234.emeraldBalance, 0));
        this.events.dispatchEvent(new PurseUpdateEvent());
    }

    private onVoucherRedeemOk(param1: VoucherRedeemOkMessageEvent): void {
        if (param1 == null) {
            return;
        }
        let _loc2_: string = "${catalog.alert.voucherredeem.ok.description}";
        if (param1.productName != "") {
            _loc2_ = "catalog.alert.voucherredeem.ok.description.furni";
            this._localization.registerParameter(_loc2_, "productName", param1.productName);
            this._localization.registerParameter(_loc2_, "productDescription", param1.productDescription);
            _loc2_ = "${" + _loc2_ + "}";
        }
        this._windowManager.alert("${catalog.alert.voucherredeem.ok.title}", _loc2_, 0, this.alertDialogEventProcessor);
    }

    private onVoucherRedeemError(param1: VoucherRedeemErrorMessageEvent): void {
        if (param1 == null) {
            return;
        }
        let _loc2_: string = "${catalog.alert.voucherredeem.error.title}";
        let _loc3_: string = "${catalog.alert.voucherredeem.error.description." + param1.errorCode + "}";
        this._windowManager.alert(_loc2_, _loc3_, 0, this.alertDialogEventProcessor);
    }

    private onApproveNameResult(param1: ApproveNameMessageEvent): void {
        if (param1 == null || this._SafeStr_2204 == null) {
            return;
        }
        let _loc2_: ApproveNameMessageParser = param1.getParser();
        this._SafeStr_2204.dispatchWidgetEvent(new CatalogWidgetApproveNameResultEvent(_loc2_.result, _loc2_.nameValidationInfo));
    }

    private onCreditBalance(param1: IMessageEvent): void {
        let _loc3_: CreditBalanceEvent = param1 instanceof CreditBalanceEvent ? param1 : null;
        let _loc2_: CreditBalanceParser = _loc3_.getParser();
        this._SafeStr_2234.credits = _loc2_.balance;
        this.updatePurse();
        if (!this._SafeStr_6815 && this._soundManager != null) {
            this._soundManager.playSound("HBST_purchase");
        }
        this._SafeStr_6815 = false;
        this.events.dispatchEvent(new PurseEvent("catalog_purse_credit_balance", this._SafeStr_2234.credits, 0));
        this.events.dispatchEvent(new PurseUpdateEvent());
    }

    private onActivityPointNotification(param1: IMessageEvent): void {
        let _loc2_: HabboActivityPointNotificationMessageEvent = param1 instanceof HabboActivityPointNotificationMessageEvent ? param1 : null;
        this._SafeStr_2234.activityPoints.set(_loc2_.type, _loc2_.amount);
        this.updatePurse();
        if (this._soundManager != null && _loc2_.type == 0) {
            this._soundManager.playSound("HBST_pixels");
        }
        this.events.dispatchEvent(new PurseEvent("catalog_purse_activity_point_balance", _loc2_.amount, _loc2_.type));
        this.events.dispatchEvent(new PurseUpdateEvent());
    }

    private onActivityPoints(param1: IMessageEvent): void {
        let _loc4_: number = 0;
        let _loc3_: ActivityPointsMessageEvent = param1 instanceof ActivityPointsMessageEvent ? param1 : null;
        this._SafeStr_2234.activityPoints = _loc3_.points;
        this.updatePurse();
        for (const _loc2_ of _loc3_.points?.keys() ?? []) {
            _loc4_ = _loc2_ | 0;
            this.events.dispatchEvent(new PurseEvent("catalog_purse_activity_point_balance", _loc3_.points.get(_loc4_) | 0, _loc4_));
        }
        this.events.dispatchEvent(new PurseUpdateEvent());
    }

    private onSubscriptionInfo(param1: IMessageEvent): void {
        let _loc3_: boolean = false;
        let _loc2_: ScrSendUserInfoMessageParser = (param1 instanceof ScrSendUserInfoEvent ? param1 : null).getParser();
        this._SafeStr_2234.clubDays = Math.max(0, _loc2_.daysToPeriodEnd) | 0;
        this._SafeStr_2234.clubPeriods = Math.max(0, _loc2_.periodsSubscribedAhead) | 0;
        this._SafeStr_2234.isVIP = _loc2_.isVIP;
        this._SafeStr_2234.pastClubDays = _loc2_.pastClubDays;
        this._SafeStr_2234.pastVipDays = _loc2_.pastVipDays;
        this._SafeStr_2234.isExpiring = _loc2_.responseType == 3 ? true : false;
        this._SafeStr_2234.minutesUntilExpiration = _loc2_.minutesUntilExpiration;
        this._SafeStr_2234.minutesSinceLastModified = _loc2_.minutesSinceLastModified;
        if (ExternalInterface.available) {
            if (_loc2_.productName == "habbo_club" || _loc2_.productName == "club_habbo") {
                _loc3_ = _loc2_.isVIP && _loc2_.minutesUntilExpiration > 0;
                ExternalInterface.call("FlashExternalInterface.subscriptionUpdated", _loc3_);
            }
        }
        this.updatePurse();
        if (_loc2_.responseType == 2) {
            this.reset();
            if (this._SafeStr_2988 != null) {
                this.openCatalogPage(this._SafeStr_2988);
                this._SafeStr_2988 = null;
            }
        }
    }

    private onClubGiftInfo(param1: ClubGiftInfoEvent): void {
        if (!param1 || !this._SafeStr_4508) {
            return;
        }
        let _loc2_: ClubGiftInfoParser = param1.getParser();
        if (!_loc2_) {
            return;
        }
        this._SafeStr_4508.setInfo(_loc2_.daysUntilNextGift, _loc2_.giftsAvailable, _loc2_.offers, _loc2_.giftData);
    }

    private onRecyclerStatus(param1: IMessageEvent): void {
        let _loc2_: RecyclerStatusMessageParser = (param1 instanceof RecyclerStatusMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null || this._SafeStr_2271 == null) {
            return;
        }
        this._SafeStr_2271.setSystemStatus(_loc2_.recyclerStatus, _loc2_.recyclerTimeoutSeconds);
    }

    private onRecyclerFinished(param1: IMessageEvent): void {
        let _loc2_: RecyclerFinishedMessageParser = (param1 instanceof RecyclerFinishedMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null || this._SafeStr_2271 == null) {
            return;
        }
        this._SafeStr_2271.setFinished(_loc2_.recyclerFinishedStatus, _loc2_.prizeId);
    }

    private onRecyclerPrizes(param1: IMessageEvent): void {
        let _loc2_: RecyclerPrizesMessageParser = (param1 instanceof RecyclerPrizesMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null || this._SafeStr_2271 == null) {
            return;
        }
        this._SafeStr_2271.storePrizeTable(_loc2_.prizeLevels);
    }

    private onMarketPlaceOffers(param1: IMessageEvent): void {
        if (this._SafeStr_2364 != null) {
            this._SafeStr_2364.onOffers(param1);
        }
    }

    private onMarketPlaceOwnOffers(param1: IMessageEvent): void {
        if (this._SafeStr_2364 != null) {
            this._SafeStr_2364.onOwnOffers(param1);
        }
    }

    private onMarketPlaceBuyResult(param1: IMessageEvent): void {
        if (this._SafeStr_2364 != null) {
            this._SafeStr_2364.onBuyResult(param1);
        }
    }

    private onMarketPlaceCancelResult(param1: IMessageEvent): void {
        if (this._SafeStr_2364 != null) {
            this._SafeStr_2364.onCancelResult(param1);
        }
    }

    private onMarketPlaceCancelAllResult(param1: IMessageEvent): void {
        if (this._SafeStr_2364 != null) {
            this._SafeStr_2364.onCancelAllResult(param1);
        }
    }

    private onMarketPlaceClearOwnHistoryResult(param1: IMessageEvent): void {
        if (this._SafeStr_2364 != null) {
            this._SafeStr_2364.onClearOwnHistoryResult(param1);
        }
    }

    private onGiftWrappingConfiguration(param1: GiftWrappingConfigurationEvent): void {
        if (param1 == null) {
            return;
        }
        this._giftWrappingConfiguration = new GiftWrappingConfiguration(param1);
    }

    private onMarketplaceItemStats(param1: MarketplaceItemStatsEvent): void {
        if (!param1 || !this._SafeStr_2364) {
            return;
        }
        let _loc2_: MarketplaceItemStatsParser = param1.getParser();
        if (!_loc2_) {
            return;
        }
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
        this._SafeStr_2364.itemStats = _loc3_;
    }

    private onMarketplaceConfiguration(param1: MarketplaceConfigurationEvent): void {
        if (!param1 || !this._SafeStr_2364) {
            return;
        }
        let _loc2_: MarketplaceConfigurationParser = param1.getParser();
        if (!_loc2_) {
            return;
        }
        this._SafeStr_2364.averagePricePeriod = _loc2_.averagePricePeriod;
    }

    private onMarketplaceMakeOfferResult(param1: MarketplaceMakeOfferResult): void {
        if (!param1 || !this._SafeStr_2364) {
            return;
        }
        let _loc2_: MarketplaceMakeOfferResultParser = param1.getParser();
        if (!_loc2_) {
            return;
        }
        if (_loc2_.result == 1) {
            this._SafeStr_2364.refreshOffers();
        }
    }

    private onHabboClubOffers(param1: HabboClubOffersMessageEvent): void {
        let _loc2_: HabboClubOffersMessageParser = param1.getParser();
        if (this._SafeStr_3114 != null && (_loc2_.source == 0 || _loc2_.source == 1 || _loc2_.source == 2 || _loc2_.source == 6)) {
            this._SafeStr_3114.onOffers(_loc2_);
        }
    }

    private onHabboClubExtendOffer(param1: HabboClubExtendOfferMessageEvent): void {
        if (!this._initialized) {
            this.init();
        }
        if (this._SafeStr_3227) {
            this._SafeStr_3227.onOffer(param1);
        }
    }

    private onRoomExit(param1: IMessageEvent): void {
    }

    private onSellablePalettes(param1: SellablePetPalettesMessageEvent): void {
        let _loc2_: SellablePetPalettesParser = param1.getParser();
        this._sellablePetPalettes.remove(_loc2_.productCode);
        let _loc3_: any[] = _loc2_.sellablePalettes;
        if (_loc3_ != null) {
            this._sellablePetPalettes.add(_loc2_.productCode, _loc3_.slice());
            if (this._SafeStr_2204 != null && this._SafeStr_2204.currentPage != null) {
                this._SafeStr_2204.dispatchWidgetEvent(new CatalogWidgetSellablePetPalettesEvent(_loc2_.productCode, _loc3_.slice()));
            }
        }
    }

    private setElementImage(param1: string, param2: BitmapData): void {
        this.setElementImageForContainer(this._mainContainer, param1, param2);
    }

    private setElementImageForContainer(param1: IWindowContainer, param2: string, param3: BitmapData): void {
        if (param1 == null) {
            return;
        }
        let _loc4_: IBitmapWrapperWindow = asGuarded(param1.findChildByName(param2), isIBitmapWrapperWindow);
        if (_loc4_ != null) {
            _loc4_.bitmap = new BitmapData(_loc4_.width, _loc4_.height, true, 0);
            _loc4_.bitmap.copyPixels(param3, param3.rect, new Point(0, 0));
        } else {
            Logger.log("Could not find element: " + param2);
        }
    }

    private alertDialogEventProcessor(param1: IAlertDialog, param2: WindowEvent): void {
        param1.dispose();
        this.resetPlacedOfferData();
    }

    private noCreditsConfirmDialogEventProcessor(param1: IConfirmDialog, param2: WindowEvent): void {
        param1.dispose();
        this.resetPlacedOfferData();
        if (param2.type == "WE_OK") {
            HabboWebTools.openWebPageAndMinimizeClient(this.getProperty("web.shop.relativeUrl"));
        }
    }

    private noDucketsConfirmDialogEventProcessor(param1: IConfirmDialog, param2: WindowEvent): void {
        let _loc3_: string = null;
        param1.dispose();
        this.resetPlacedOfferData();
        if (param2.type == "WE_OK") {
            _loc3_ = this.getProperty("link.format.duckets");
            if (_loc3_ != "") {
                this._windowManager.alert("${catalog.alert.external.link.title}", "${catalog.alert.external.link.desc}", 0, this.onExternalLink);
                HabboWebTools.navigateToURL(_loc3_, "habboMain");
            }
        }
    }

    private onExternalLink(param1: IAlertDialog, param2: WindowEvent): void {
        param1.dispose();
    }

    public redeemVoucher(param1: string): void {
        let _loc2_: IMessageComposer = new RedeemVoucherMessageComposer(param1);
        this.send(_loc2_);
        _loc2_.dispose();
        _loc2_ = null;
    }

    public productDataReady(): void {
        let _loc2_: string = null;
        let _loc1_: boolean = false;
        let _loc3_: boolean = false;
        this._SafeStr_5422 = true;
        this._SafeStr_14834 = true;
        this.events.dispatchEvent(new CatalogEvent("CATALOG_INITIALIZED"));
        if (this._catalogStates == null && this._SafeStr_14831 != null) {
            _loc2_ = this._SafeStr_14831;
            _loc1_ = this._SafeStr_14832;
            _loc3_ = this._SafeStr_14833;
            this._SafeStr_14831 = null;
            this.toggleCatalog(_loc2_, _loc1_, _loc3_);
        }
    }

    public isDraggable(param1: IPurchasableOffer): boolean {
        return this.getBoolean("catalog.drag_and_drop") && this._roomSession != null && (this._SafeStr_2204.currentPage == null || this._SafeStr_2204.currentPage.allowDragging) && (this._catalogType == "NORMAL" && (this._roomSession.isRoomOwner || this._roomSession.isGuildRoom && this._roomSession.roomControllerLevel >= 2) || this._catalogType == "BUILDERS_CLUB" && this.getBuilderFurniPlaceableStatusForOffer(param1) == 0) && param1.pricingModel != "pricing_model_bundle" && param1.pricingModel != "pricing_model_multi" && param1.product != null && param1.product.productType != "e" && param1.product.productType != "h";
    }

    public getBuilderFurniPlaceableStatusForOffer(param1: IPurchasableOffer): number {
        if (param1 == null) {
            return 1;
        }
        if (this.builderFurniCount < 0 || this.builderFurniCount >= this.builderFurniLimit) {
            return 2;
        }
        if (this.roomSession == null) {
            return 3;
        }
        return this.getBuilderFurniPlaceableStatus();
    }

    public getBuilderFurniPlaceableStatus(): number {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: IRoomObject = null;
        let _loc1_: IUserData = null;
        if (!this.roomSession.isRoomOwner && this.roomSession.isGuildRoom && !this.getBoolean("builders.club.furniture.placement.group.room.enabled")) {
            return 5;
        }
        if (this.roomSession.roomControllerLevel < 3) {
            return 4;
        }
        if (this.builderSecondsLeft <= 0) {
            _loc2_ = this.roomEngine.getRoomObjectCount(this.roomSession.roomId, 100);
            _loc3_ = 0;
            while (_loc3_ < _loc2_) {
                _loc4_ = this.roomEngine.getRoomObjectWithIndex(this.roomSession.roomId, _loc3_, 100);
                _loc1_ = this.roomSession.userDataManager.getUserDataByIndex(_loc4_.getId());
                if (_loc1_ != null && _loc1_.type == 1 && _loc1_.roomObjectId != this.roomSession.ownUserRoomId && !_loc1_.isModerator) {
                    return 6;
                }
                _loc3_++;
            }
        }
        return 0;
    }

    public canPlaceWithBC(): boolean {
        return this.getBuilderFurniPlaceableStatus() == 0;
    }

    private updateRoom(param1: string, param2: string): void {
        let _loc4_: string = this._roomEngine.getRoomStringValue(this._roomEngine.activeRoomId, "room_wall_type");
        let _loc5_: string = this._roomEngine.getRoomStringValue(this._roomEngine.activeRoomId, "room_floor_type");
        let _loc3_: string = this._roomEngine.getRoomStringValue(this._roomEngine.activeRoomId, "room_landscape_type");
        _loc4_ = _loc4_ && _loc4_.length > 0 ? _loc4_ : "101";
        _loc5_ = _loc5_ && _loc5_.length > 0 ? _loc5_ : "101";
        _loc3_ = _loc3_ && _loc3_.length > 0 ? _loc3_ : "1.1";
        switch (param1) {
            case "floor":
                this._roomEngine.updateObjectRoom(this._roomEngine.activeRoomId, param2, _loc4_, _loc3_, true);
                break;
            case "wallpaper":
                this._roomEngine.updateObjectRoom(this._roomEngine.activeRoomId, _loc5_, param2, _loc3_, true);
                break;
            case "landscape":
                this._roomEngine.updateObjectRoom(this._roomEngine.activeRoomId, _loc5_, _loc4_, param2, true);
                break;
            default:
                this._roomEngine.updateObjectRoom(this._roomEngine.activeRoomId, _loc5_, _loc4_, _loc3_, true);
        }
    }

    public requestSelectedItemToMover(param1: IDragAndDropDoneReceiver, param2: IPurchasableOffer, param3: boolean = false): void {
        let _loc7_: number = 0;
        let _loc6_: IStuffData = null;
        if (!this.isDraggable(param2)) {
            return;
        }
        let _loc4_: IProduct;
        switch ((_loc4_ = param2.product).productType) {
            case "s":
                _loc7_ = 10;
                break;
            case "i":
                _loc7_ = 20;
        }
        if (param2.page != null && param2.page.layoutCode == "recolorable_furniture") {
            _loc6_ = RecolorableFurnitureCatalogWidget.createStuffData(_loc4_.extraParam);
        }
        let _loc5_: boolean = this._roomEngine.initializeRoomObjectInsert("catalog", -param2.offerId, _loc7_, _loc4_.productClassId, _loc4_.extraParam ? _loc4_.extraParam.toString() : null, _loc6_, -1, -1, null, param3);
        if (_loc5_) {
            this._offerInFurniPlacing = param2;
            this._offerPlacingCallbackReceiver = param1;
            this.hideMainWindow();
            this._SafeStr_2680 = true;
            this._SafeStr_6613 = param3;
        }
    }

    private onObjectSelected(param1: RoomEngineObjectEvent): void {
        let _loc2_: IUserData = null;
        if (param1 == null) {
            return;
        }
        if (this.buildersClubEnabled && (!this._initialized || !this.getCatalogNavigator("BUILDERS_CLUB").initialized)) {
            this.init();
            this.refreshCatalogIndex("BUILDERS_CLUB");
        }
        if (param1.type == "REOE_SELECTED" && param1.category == 100) {
            _loc2_ = this.getUserDataForEvent(param1);
            if (_loc2_ != null) {
                this.events.dispatchEvent(new CatalogUserEvent("CATALOG_USER_SELECTED", _loc2_.webID, _loc2_.name));
            }
        }
    }

    private onFriendBarSelectionEvent(param1: FriendBarSelectionEvent): void {
        let _loc3_: number = 0;
        let _loc2_: string = null;
        let _loc4_: IDragAndDropDoneReceiver = null;
        if (this._SafeStr_2680 && param1.type == "FBVE_FRIEND_SELECTED") {
            this.resetPlacedOfferData(true);
            if (this._offerInFurniPlacing == null || Boolean(this._offerInFurniPlacing.disposed)) {
                this.resetObjectMover();
                return;
            }
            _loc3_ = param1.friendId;
            _loc2_ = param1.friendName;
            _loc4_ = this._offerPlacingCallbackReceiver;
            if (_loc4_ != null) {
                _loc4_.onDragAndDropDone(true, _loc2_);
            }
            this.resetObjectMover(false);
            this.cancelFurniInMover();
        }
    }

    private getUserDataForEvent(param1: RoomEngineObjectEvent): IUserData {
        let _loc3_: IRoomSession = null;
        let _loc2_: IUserData = null;
        if (this._roomSessionManager != null) {
            _loc3_ = this._roomSessionManager.getSession(param1.roomId);
            if (_loc3_ != null) {
                _loc2_ = _loc3_.userDataManager.getUserDataByIndex(param1.objectId);
            }
        }
        return _loc2_;
    }

    private onObjectPlaceOnUser(param1: RoomEngineObjectPlacedOnUserEvent): void {
        let _loc4_: string = null;
        let _loc2_: IUserData = null;
        let _loc3_: IDragAndDropDoneReceiver = null;
        if (this._SafeStr_2680 && param1.type == "REOE_PLACED_ON_USER") {
            this.resetPlacedOfferData(true);
            if (this._offerInFurniPlacing == null || Boolean(this._offerInFurniPlacing.disposed)) {
                this.resetObjectMover();
                return;
            }
            _loc4_ = null;
            _loc2_ = this.getUserDataForEvent(param1);
            if (_loc2_ != null) {
                _loc4_ = _loc2_.name;
            }
            _loc3_ = this._offerPlacingCallbackReceiver;
            if (_loc3_ != null) {
                _loc3_.onDragAndDropDone(true, _loc4_);
            }
            this.resetObjectMover(false);
            this.cancelFurniInMover();
        }
    }

    private onObjectPlacedInRoom(param1: RoomEngineObjectPlacedEvent): void {
        let _loc7_: number = 0;
        let _loc2_: IProduct = null;
        let _loc5_: boolean = false;
        let _loc6_: IDragAndDropDoneReceiver = null;
        let _loc4_: IRoomObjectController = null;
        let _loc8_: number = 0;
        let _loc3_: any = undefined;
        if (this._SafeStr_2680 && param1.type == "REOE_PLACED" && param1.placementSource == "catalog") {
            this.resetPlacedOfferData(true);
            if (this._offerInFurniPlacing == null || Boolean(this._offerInFurniPlacing.disposed)) {
                this.resetObjectMover();
                return;
            }
            _loc7_ = param1.category;
            _loc2_ = this._offerInFurniPlacing.product;
            _loc5_ = false;
            if (_loc7_ == 20) {
                switch (_loc2_.furnitureData.className) {
                    case "floor":
                    case "wallpaper":
                    case "landscape":
                        _loc5_ = param1.placedOnFloor || param1.placedOnWall;
                        break;
                    default:
                        _loc5_ = param1.placedInRoom;
                }
            } else {
                _loc5_ = param1.placedInRoom;
            }
            if (!_loc5_) {
                this.resetObjectMover();
                return;
            }
            this._SafeStr_2241 = new PlacedObjectPurchaseData(param1.roomId, param1.objectId, param1.category, param1.wallLocation, param1.x | 0, param1.y | 0, param1.direction, this._offerInFurniPlacing);
            _loc6_ = this._offerPlacingCallbackReceiver;
            if (_loc6_ != null) {
                _loc6_.onDragAndDropDone(true, null);
            }
            switch (this._catalogType) {
                case "NORMAL":
                    if (_loc7_ == 10) {
                        this._roomEngine.addObjectFurniture(param1.roomId, param1.objectId, _loc2_.productClassId, new Vector3d(param1.x, param1.y, param1.z), new Vector3d(param1.direction, 0, 0), 0, new LegacyStuffData());
                    } else if (_loc7_ == 20) {
                        switch (_loc2_.furnitureData.className) {
                            case "floor":
                            case "wallpaper":
                            case "landscape":
                                this.updateRoom(_loc2_.furnitureData.className, _loc2_.extraParam);
                                break;
                            default:
                                this._roomEngine.addObjectWallItem(param1.roomId, param1.objectId, _loc2_.productClassId, new Vector3d(param1.x, param1.y, param1.z), new Vector3d(param1.direction * 45, 0, 0), 0, param1.instanceData, 0);
                        }
                    }
                    _loc4_ = asGuarded(this._roomEngine.getRoomObject(param1.roomId, param1.objectId, param1.category), isIRoomObjectController);
                    if (_loc4_) {
                        _loc4_.getModelController().setNumber("furniture_alpha_multiplier", 0.5);
                    }
                    break;
                case "BUILDERS_CLUB":
                    _loc8_ = this._offerInFurniPlacing.page.pageId;
                    if (_loc8_ == -12345678) {
                        _loc3_ = this.currentCatalogNavigator.getNodesByOfferId(this._offerInFurniPlacing.offerId, true);
                        if (_loc3_ != null) {
                            _loc8_ = _loc3_[0].pageId | 0;
                        }
                    }
                    switch (_loc7_ - 10) {
                        case 0:
                            this.send(new BuildersClubPlaceRoomItemMessageComposer(_loc8_, this._offerInFurniPlacing.offerId, _loc2_.extraParam, param1.x | 0, param1.y | 0, param1.direction));
                            break;
                        case 10:
                            this.send(new BuildersClubPlaceWallItemMessageComposer(_loc8_, this._offerInFurniPlacing.offerId, _loc2_.extraParam, param1.wallLocation));
                    }
                    if (this._SafeStr_6613) {
                        this.requestSelectedItemToMover(_loc6_, this._offerInFurniPlacing, true);
                    } else {
                        this.toggleBuilderCatalog();
                    }
            }
        }
    }

    private resetObjectMover(param1: boolean = true): void {
        let _loc2_: CatalogWindowState = null;
        if (param1 && this._SafeStr_2680) {
            _loc2_ = this.getCatalogState(this._catalogType);
            this.showMainWindow(_loc2_);
            this.dispatchRoomChangedToCatalogPage(_loc2_);
        }
        this._SafeStr_2680 = false;
        this._offerPlacingCallbackReceiver = null;
    }

    public syncPlacedOfferWithPurchase(param1: IPurchasableOffer): void {
        if (this._SafeStr_2241) {
            if (this._SafeStr_2241.offerId != param1.offerId) {
                this.resetPlacedOfferData();
            }
        }
    }

    public resetPlacedOfferData(param1: boolean = false): void {
        if (!param1) {
            this.resetObjectMover();
        }
        if (this._SafeStr_2241 != null) {
            if (this._SafeStr_2241.category == 10) {
                this._roomEngine.disposeObjectFurniture(this._SafeStr_2241.roomId, this._SafeStr_2241.objectId);
            } else if (this._SafeStr_2241.category == 20) {
                switch (this._SafeStr_2241.furniData.className) {
                    case "floor":
                    case "wallpaper":
                    case "landscape":
                        this.updateRoom("reset", "");
                        break;
                    default:
                        this._roomEngine.disposeObjectWallItem(this._SafeStr_2241.roomId, this._SafeStr_2241.objectId);
                }
            } else {
                this._roomEngine.deleteRoomObject(this._SafeStr_2241.objectId, this._SafeStr_2241.category);
            }
            this._SafeStr_2241.dispose();
            this._SafeStr_2241 = null;
        }
    }

    public cancelFurniInMover(): void {
        if (this._offerInFurniPlacing != null) {
            this._roomEngine.cancelRoomObjectInsert();
            this._SafeStr_2680 = false;
            this._offerInFurniPlacing = null;
        }
    }

    public get collectorHub(): ICollectorHub {
        return this._SafeStr_2288;
    }

    public get specialItemsController(): SpecialItemsController {
        return this._SafeStr_5736;
    }

    public itemAddedToInventory(param1: number, param2: number, param3: number): void {
        let _loc8_: number = 0;
        let _loc6_: string = null;
        let _loc5_: number = 0;
        let _loc7_: number = 0;
        let _loc10_: number = 0;
        let _loc11_: string = null;
        let _loc9_: string = null;
        let _loc4_: string = null;
        if (this._SafeStr_2241 != null && this._SafeStr_2241.productClassId == param1) {
            if (this._SafeStr_2241.roomId == this._roomEngine.activeRoomId) {
                _loc8_ = param2;
                param3 = this._SafeStr_2241.category;
                _loc6_ = this._SafeStr_2241.wallLocation;
                _loc5_ = this._SafeStr_2241.x;
                _loc7_ = this._SafeStr_2241.y;
                _loc10_ = this._SafeStr_2241.direction;
                switch (param3 - 2) {
                    case 0:
                        _loc9_ = this._roomEngine.getRoomStringValue(this._roomEngine.activeRoomId, "room_wall_type");
                        if (this._SafeStr_2241.extraParameter != _loc9_) {
                            this.send(new RequestRoomPropertySet(_loc8_));
                        }
                        break;
                    case 1:
                        _loc11_ = this._roomEngine.getRoomStringValue(this._roomEngine.activeRoomId, "room_floor_type");
                        if (this._SafeStr_2241.extraParameter != _loc11_) {
                            this.send(new RequestRoomPropertySet(_loc8_));
                        }
                        break;
                    case 2:
                        _loc4_ = this._roomEngine.getRoomStringValue(this._roomEngine.activeRoomId, "room_landscape_type");
                        if (this._SafeStr_2241.extraParameter != _loc4_) {
                            this.send(new RequestRoomPropertySet(_loc8_));
                        }
                        break;
                    default:
                        this.send(new PlaceObjectMessageComposer(_loc8_, param3, _loc6_, _loc5_, _loc7_, _loc10_));
                }
                this.resetPlacedOfferData();
            }
        }
    }

    public setImageFromAsset(param1: IWindow, param2: string, param3: (...args: any[]) => any): void {
        if (!param2 || !this.assets) {
            return;
        }
        let _loc4_: BitmapDataAsset = asInstanceOf(this.assets.getAssetByName(param2), BitmapDataAsset);
        if (_loc4_ == null) {
            this.retrievePreviewAsset(param2, param3);
            return;
        }
        if (param1) {
            HabboCatalog.setElementImageCentered(param1, asInstanceOf(_loc4_.content, BitmapData));
        }
    }

    public get imageGalleryHost(): string {
        return this.getProperty("image.library.catalogue.url");
    }

    private retrievePreviewAsset(param1: string, param2: (...args: any[]) => any): void {
        if (!param1 || !this.assets) {
            return;
        }
        let _loc5_: string = this.imageGalleryHost + param1 + ".png";
        let _loc3_: URLRequest = new URLRequest(_loc5_);
        let _loc4_: AssetLoaderStruct = this.assets.loadAssetFromFile(param1, _loc3_, "image/png");
        if (!_loc4_) {
            return;
        }
        if (param2 != null) {
            _loc4_.addEventListener("AssetLoaderEventComplete", param2);
        }
    }

    private showMainWindow(param1: CatalogWindowState = null): void {
        let _loc2_: IDesktopWindow = null;
        if (param1 == null) {
            param1 = this.getCatalogState(this._catalogType);
        }
        if (this._windowManager != null && param1 != null && param1.mainContainer != null && param1.mainContainer.parent == null) {
            _loc2_ = this._windowManager.getDesktop(1);
            if (_loc2_ != null) {
                this.applyCatalogWindowPosition(param1.mainContainer);
                param1.mainContainer.visible = true;
                _loc2_.addChild(param1.mainContainer);
            }
        }
    }

    private hideMainWindow(param1: CatalogWindowState = null, param2: boolean = true): void {
        let _loc3_: IDesktopWindow = null;
        if (param1 == null) {
            param1 = this.getCatalogState(this._catalogType);
        }
        if (this._windowManager != null && param1 != null && param1.mainContainer != null && param1.mainContainer.parent != null) {
            _loc3_ = this._windowManager.getDesktop(1);
            if (_loc3_ != null && !this._SafeStr_4068) {
                this.storeCatalogWindowPosition(param1.mainContainer);
                param1.mainContainer.visible = false;
                _loc3_.removeChild(param1.mainContainer);
                if (param2 && param1.catalogViewer != null) {
                    param1.catalogViewer.catalogWindowClosed();
                }
            }
            this._SafeStr_4068 = false;
        }
    }

    private mainWindowVisible(param1: string = null): boolean {
        return this.isMainWindowVisible(this.getCatalogState(param1 == null ? this._catalogType : param1));
    }

    private isMainWindowVisible(param1: CatalogWindowState): boolean {
        return this._windowManager != null && param1 != null && param1.mainContainer != null && param1.mainContainer.parent != null;
    }

    private getCatalogState(param1: string): CatalogWindowState {
        return this._catalogStates != null ? this._catalogStates.get(param1) : null;
    }

    private ensureCatalogState(param1: string): CatalogWindowState {
        if (this._catalogStates == null) {
            this._catalogStates = new Dictionary();
        }
        if (this._catalogNavigators == null) {
            this._catalogNavigators = new Dictionary();
        }
        return this.getCatalogState(param1) ?? this.createCatalogWindowState(param1);
    }

    private setActiveCatalogState(param1: string): CatalogWindowState {
        this._catalogType = param1;
        let _loc2_: CatalogWindowState = this.ensureCatalogState(param1);
        this._mainContainer = _loc2_?.mainContainer;
        this._SafeStr_2204 = _loc2_?.catalogViewer;
        return _loc2_;
    }

    private storeCatalogWindowPosition(param1: IWindow): void {
        if (param1 == null || this._SafeStr_14830) {
            return;
        }
        if (this._SafeStr_14829 != null && this._SafeStr_14829.x == param1.x && this._SafeStr_14829.y == param1.y) {
            return;
        }
        this._SafeStr_14829 = new Point(param1.x, param1.y);
        this.syncCatalogWindowPositions();
    }

    private applyCatalogWindowPosition(param1: IWindow): void {
        if (param1 != null && this._SafeStr_14829 != null) {
            this.setCatalogWindowPosition(param1, this._SafeStr_14829);
        }
    }

    private syncCatalogWindowPositions(): void {
        if (this._catalogStates == null || this._SafeStr_14829 == null) {
            return;
        }
        for (const _loc1_ of this._catalogStates?.values() ?? []) {
            if (_loc1_.mainContainer != null) {
                this.setCatalogWindowPosition(_loc1_.mainContainer, this._SafeStr_14829);
            }
        }
    }

    private onMainWindowRelocate(param1: WindowEvent): void {
        if (this._SafeStr_14830) {
            return;
        }
        this.storeCatalogWindowPosition(asGuarded(param1.target, isIWindow));
    }

    private setCatalogWindowPosition(param1: IWindow, param2: Point): void {
        if (param1 == null || param2 == null) {
            return;
        }
        if (param1.x == param2.x && param1.y == param2.y) {
            return;
        }
        this._SafeStr_14830 = true;
        param1.position = param2.clone();
        this._SafeStr_14830 = false;
    }

    private dispatchRoomChangedToCatalogPages(): void {
        if (this._catalogStates == null) {
            return;
        }
        for (const _loc1_ of this._catalogStates?.values() ?? []) {
            this.dispatchRoomChangedToCatalogPage(_loc1_);
        }
    }

    private dispatchRoomChangedToCatalogPage(param1: CatalogWindowState): void {
        if (param1 != null && param1.catalogViewer != null && param1.catalogViewer.currentPage != null) {
            param1.catalogViewer.currentPage.dispatchWidgetEvent(new CatalogWidgetRoomChangedEvent());
        }
    }

    private dispatchBuilderSubscriptionUpdatedToCatalogPages(): void {
        if (this._catalogStates == null) {
            return;
        }
        for (const _loc1_ of this._catalogStates?.values() ?? []) {
            if (_loc1_ != null && _loc1_.catalogViewer != null && _loc1_.catalogViewer.currentPage != null) {
                _loc1_.catalogViewer.currentPage.dispatchWidgetEvent(new CatalogWidgetBuilderSubscriptionUpdatedEvent());
            }
        }
    }

    public update(param1: number): void {
        let _loc3_: number = NaN;
        let _loc2_: number = NaN;
        if (this._roomPreviewer != null) {
            this._roomPreviewer.updatePreviewRoomView();
        }
        if (getTimer() - this._builderMembershipDisplayUpdateTime > 500) {
            _loc3_ = this.builderSecondsLeft;
            _loc2_ = this.builderSecondsLeftWithGrace;
            if (_loc3_ > -3 && _loc3_ < 200 || _loc2_ > -3 && _loc2_ < 200) {
                this.refreshBuilderStatus();
            }
        }
    }

    public onGuildMemberships(param1: GuildMembershipsMessageEvent): void {
        if (this._SafeStr_2956) {
            this._SafeStr_2956.onGuildMembershipsMessageEvent(param1);
        }
    }

    private onSnowWarGameTokenOffer(param1: SnowWarGameTokensMessageEvent): void {
        let _loc3_: SnowWarGameTokensMessageParser = param1.getParser();
        this.disposeSnowWarTokens();
        for (const _loc2_ of _loc3_.offers ?? []) {
            if (_loc2_.localizationId == "GET_SNOWWAR_TOKENS") {
                this._SafeStr_3025 = new GameTokensOffer(_loc2_.offerId | 0, stringOrNull(_loc2_.localizationId), _loc2_.priceInCredits | 0, _loc2_.priceInActivityPoints | 0, _loc2_.activityPointType | 0);
            } else if (_loc2_.localizationId == "GET_SNOWWAR_TOKENS2") {
                this._SafeStr_2971 = new GameTokensOffer(_loc2_.offerId | 0, stringOrNull(_loc2_.localizationId), _loc2_.priceInCredits | 0, _loc2_.priceInActivityPoints | 0, _loc2_.activityPointType | 0);
            } else if (_loc2_.localizationId == "GET_SNOWWAR_TOKENS3") {
                this._SafeStr_3098 = new GameTokensOffer(_loc2_.offerId | 0, stringOrNull(_loc2_.localizationId), _loc2_.priceInCredits | 0, _loc2_.priceInActivityPoints | 0, _loc2_.activityPointType | 0);
            }
        }
    }

    public buySnowWarTokensOffer(param1: string): void {
        if (param1 == "GET_SNOWWAR_TOKENS" && this._SafeStr_3025) {
            this.showPurchaseConfirmation(this._SafeStr_3025, -1, this._SafeStr_3025.localizationId);
        } else if (param1 == "GET_SNOWWAR_TOKENS2" && this._SafeStr_2971) {
            this.showPurchaseConfirmation(this._SafeStr_2971, -1, this._SafeStr_2971.localizationId);
        } else if (param1 == "GET_SNOWWAR_TOKENS3" && this._SafeStr_3098) {
            this.showPurchaseConfirmation(this._SafeStr_3098, -1, this._SafeStr_3098.localizationId);
        } else {
            this._communication.connection.send(new GetSnowWarGameTokensOfferComposer());
        }
    }

    public verifyClubLevel(param1: number = 1): boolean {
        if (this._sessionDataManager.clubLevel >= param1) {
            return true;
        }
        this.openClubCenter();
        return false;
    }

    public openClubCenter(): void {
        this.context.createLinkEvent("habboUI/open/hccenter");
    }

    public openVault(): void {
        this.context.createLinkEvent("habboUI/open/vault");
    }

    private onGuildVisualSettingsChanged(param1: GuildSettingsChangedInManageEvent): void {
        if (this._SafeStr_2956) {
            this._SafeStr_2956.onGuildVisualSettingsChanged(param1.guildId);
        }
    }

    public get avatarEditor(): IHabboAvatarEditor {
        return this._avatarEditor;
    }

    public checkGiftable(param1: IPurchasableOffer): void {
        this.send(new GetIsOfferGiftableComposer(param1.offerId));
    }

    public rememberPageDuringVipPurchase(param1: number): void {
        let _loc2_: ICatalogNode = this.currentCatalogNavigator.getNodeById(param1);
        if (_loc2_) {
            this._SafeStr_2988 = _loc2_.pageName;
        } else {
            this._SafeStr_2988 = "frontpage";
        }
    }

    public forgetPageDuringVipPurchase(): void {
        this._SafeStr_2988 = null;
        this._SafeStr_4068 = false;
    }

    public doNotCloseAfterVipPurchase(): void {
        this._SafeStr_4068 = this._SafeStr_2988 != null;
    }

    private initBundleDiscounts(): void {
        this.sendGetBundleDiscountRuleset();
    }

    private sendGetBundleDiscountRuleset(): void {
        this.send(new GetBundleDiscountRulesetMessageComposer());
    }

    public sendGetProductOffer(param1: number): void {
        this.send(new GetProductOfferComposer(param1));
    }

    private onBundleDiscountRulesetMessageEvent(param1: BundleDiscountRulesetMessageEvent): void {
        let _loc2_: BundleDiscountRulesetMessageParser = param1.getParser();
        this._bundleDiscountRuleset = _loc2_.bundleDiscountRuleset;
        this._utils.resolveBundleDiscountFlatPriceSteps();
    }

    private onLimitedEditionSoldOut(param1: LimitedEditionSoldOutEvent): void {
        this._windowManager.alert("${catalog.alert.limited_edition_sold_out.title}", "${catalog.alert.limited_edition_sold_out.message}", 0, this.alertDialogEventProcessor);
        if (this._SafeStr_2174 != null) {
            this._SafeStr_2174.dispose();
            this._SafeStr_2174 = null;
        }
    }

    private onProductOffer(param1: ProductOfferEvent): void {
        let _loc6_: IFurnitureData = null;
        let _loc3_: ProductOfferMessageParser = param1.getParser();
        let _loc4_: CatalogPageMessageOfferData = _loc3_.offerData;
        if (!_loc4_ || _loc4_.products.length == 0) {
            return;
        }
        let _loc5_: CatalogPageMessageProductData = _loc4_.products[0];
        if (this._SafeStr_2204 != null && this._SafeStr_2204.currentPage != null && _loc5_.uniqueLimitedItem) {
            this._SafeStr_2204.currentPage.updateLimitedItemsLeft(_loc4_.offerId, _loc5_.uniqueLimitedItemsLeft);
        }
        let _loc7_: IProduct[] = new Array<IProduct>(0).fill(null);
        let _loc8_: IProductData = this.getProductData(_loc4_.localizationId);
        for (_loc5_ of _loc4_.products ?? []) {
            _loc6_ = this.getFurnitureData(_loc5_.furniClassId, _loc5_.productType);
            _loc7_.push(new Product(_loc5_.productType, _loc5_.furniClassId, _loc5_.extraParam, this.getProductCountOverride(_loc4_.localizationId, _loc6_, _loc5_.productCount), _loc8_, _loc6_, this, _loc5_.uniqueLimitedItem, _loc5_.uniqueLimitedItemSeriesSize, _loc5_.uniqueLimitedItemsLeft));
        }
        let _loc2_: Offer = new Offer(_loc4_.offerId, _loc4_.localizationId, _loc4_.isRent, _loc4_.priceInCredits, _loc4_.priceInActivityPoints, _loc4_.activityPointType, _loc4_.priceInSilver, _loc4_.giftable, _loc4_.clubLevel, _loc7_, _loc4_.bundlePurchaseAllowed, this);
        if (!this.isOfferCompatibleWithCatalogType(_loc2_, this._catalogType)) {
            _loc2_.dispose();
            return;
        }
        if (this._SafeStr_2204 && this._SafeStr_2204.currentPage) {
            _loc2_.page = this._SafeStr_2204.currentPage;
            this._SafeStr_2204.currentPage.dispatchWidgetEvent(new SelectProductEvent(_loc2_));
            if (_loc2_.product && _loc2_.product.productType == "i") {
                this._SafeStr_2204.currentPage.dispatchWidgetEvent(new SetExtraPurchaseParameterEvent(_loc2_.product.extraParam));
            }
            if (this._SafeStr_2680 && this._offerInFurniPlacing) {
                this._offerInFurniPlacing = _loc2_;
            }
        }
    }

    private onBuildersClubSubscriptionStatus(param1: BuildersClubSubscriptionStatusMessageEvent): void {
        let _loc2_: BuildersClubSubscriptionStatusMessageParser = param1.getParser();
        this._builderFurniLimit = _loc2_.furniLimit;
        this._builderMaxFurniLimit = _loc2_.maxFurniLimit;
        this._SafeStr_5508 = _loc2_.secondsLeft;
        this._builderMembershipUpdateTime = getTimer();
        this._SafeStr_5555 = _loc2_.secondsLeftWithGrace;
        if (ExternalInterface.available) {
            ExternalInterface.call("FlashExternalInterface.updateBuildersClub", this._SafeStr_5508 > 0);
        }
        this.dispatchBuilderSubscriptionUpdatedToCatalogPages();
        this.refreshBuilderStatus();
    }

    private getProductCountOverride(param1: string, param2: IFurnitureData, param3: number): number {
        if (param1 == "wf_storage_furni_bd" && param2 != null && param2.className == "wf_storage_furni1") {
            return 5;
        }
        if (param1 == "wf_storage_coins_bd" && param2 != null && param2.className == "wf_storage_coins2") {
            return 5;
        }
        return param3;
    }

    private onBuildersClubFurniCount(param1: BuildersClubFurniCountMessageEvent): void {
        this._builderFurniCount = param1.getParser().furniCount;
        this.dispatchBuilderSubscriptionUpdatedToCatalogPages();
        this.refreshBuilderStatus();
    }

    private refreshBuilderStatus(): void {
        let _loc5_: number = this._SafeStr_5508 - (getTimer() - this._builderMembershipUpdateTime) / 1000;
        let _loc2_: number = this._SafeStr_5555 - (getTimer() - this._builderMembershipUpdateTime) / 1000;
        if (this._SafeStr_5234 && _loc5_ <= 0 && _loc2_ > 0) {
            this.events.dispatchEvent(new CatalogEvent("CATALOG_BUILDER_MEMBERSHIP_IN_GRACE"));
        } else if (this._SafeStr_4829 && _loc2_ <= 0) {
            this.events.dispatchEvent(new CatalogEvent("CATALOG_BUILDER_MEMBERSHIP_EXPIRED"));
        }
        this._SafeStr_5234 = _loc5_ > 0;
        this._SafeStr_4829 = _loc2_ > 0;
        let _loc3_: string = "builder.header.status." + (this._SafeStr_5234 ? "member" : (this._SafeStr_4829 ? "grace" : "trial"));
        let _loc6_: string = this._localization.getLocalization(_loc3_);
        this._localization.registerParameter("builder.header.title", "bcstatus", _loc6_);
        let _loc1_: string = this._SafeStr_5234 ? FriendlyTime.getFriendlyTime(this._localization, _loc5_) : (this._SafeStr_4829 ? FriendlyTime.getFriendlyTime(this._localization, _loc2_) : _loc6_);
        this._localization.registerParameter("builder.header.status.membership", "duration", "<font color=\"#ff8d00\"><b>" + _loc1_ + "</b></font>");
        this._localization.registerParameter("builder.header.status.limit", "count", "<font color=\"#ff8d00\"><b>" + this._builderFurniCount + "</b></font>");
        this._localization.registerParameter("builder.header.status.limit", "limit", "<font color=\"#ff8d00\"><b>" + this._builderFurniLimit + "</b></font>");
        this._builderMembershipDisplayUpdateTime = getTimer();
        if (this._catalogStates != null) {
            for (const _loc4_ of this._catalogStates?.values() ?? []) {
                this.refreshCatalogWindowChrome(stringOrNull(_loc4_.catalogType), _loc4_.mainContainer);
            }
        }
    }

    public get bundleDiscountEnabled(): boolean {
        return this._catalogType != "BUILDERS_CLUB";
    }

    public get bundleDiscountRuleset(): BundleDiscountRuleset {
        return this._bundleDiscountRuleset;
    }

    public get multiplePurchaseEnabled(): boolean {
        return this.getBoolean("catalog.multiple.purchase.enabled") && this._catalogType != "BUILDERS_CLUB";
    }

    public get newAdditionsPageOpenDisabled(): boolean {
        return this.getBoolean("catalog.new.additions.page.open.disabled");
    }

    public showVipBenefits(): void {
        if (!this._utils) {
            this.init();
        }
        if (this._utils) {
            if (!this.getCatalogNavigator("NORMAL").initialized) {
                this.refreshCatalogIndex("NORMAL");
            }
            this._utils.showVipBenefits();
        }
    }

    public get currentPage(): ICatalogPage {
        return this._SafeStr_2204?.currentPage;
    }

    public displayProductIcon(param1: string, param2: number, param3: IBitmapWrapperWindow): void {
        this._utils.displayProductIcon(param1, param2, param3);
    }

    public openRentConfirmationWindow(param1: IFurnitureData, param2: boolean, param3: number = -1, param4: number = -1, param5: boolean = false): void {
        if (this._SafeStr_3574 == null) {
            this._SafeStr_3574 = new RentConfirmationWindow(this);
        }
        this._SafeStr_3574.show(param1, param2, param3, param4, param5);
    }

    public get roomSession(): IRoomSession {
        return this._roomSession;
    }

    public get linkPattern(): string {
        return "catalog/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        switch (_loc2_[1]) {
            case "open":
                if (_loc2_.length > 2) {
                    this.openCatalogPage(stringOrNull(_loc2_[2]));
                } else {
                    this.openCatalog();
                }
                break;
            case "warehouse":
                if (_loc2_.length > 2) {
                    this.openCatalogPage(stringOrNull(_loc2_[2]), "BUILDERS_CLUB");
                } else {
                    this.toggleCatalog("BUILDERS_CLUB", true);
                }
                break;
            case "club_buy":
                this.openClubCenter();
                break;
            case "habbicons":
                if (this.getBoolean("habbicons.enabled")) {
                    this.context.createLinkEvent("habbicons/open");
                }
                break;
            default:
                Logger.log("Catalog unknown link-type receive: " + _loc2_[1]);
        }
    }

    public get inventory(): IHabboInventory {
        return this._inventory;
    }

    public get mainContainer(): IWindowContainer {
        return this._mainContainer;
    }

    public toggleBuilderCatalog(): void {
        this.toggleCatalog("BUILDERS_CLUB");
    }

    public get catalogType(): string {
        return this._catalogType;
    }

    public getCatalogNavigator(param1: string): ICatalogNavigator {
        return this._catalogNavigators != null ? this._catalogNavigators.get(param1) : null;
    }

    public get currentCatalogNavigator(): ICatalogNavigator {
        return this.getCatalogNavigator(this._catalogType);
    }

    public get builderFurniLimit(): number {
        return this._builderFurniLimit;
    }

    public get builderFurniCount(): number {
        return this._builderFurniCount;
    }

    public get builderMaxFurniLimit(): number {
        return this._builderMaxFurniLimit;
    }

    public get builderSecondsLeft(): number {
        return this._SafeStr_5508 - (getTimer() - this._builderMembershipUpdateTime) / 1000;
    }

    public get builderSecondsLeftWithGrace(): number {
        return this._SafeStr_5555 - (getTimer() - this._builderMembershipUpdateTime) / 1000;
    }

    public getOfferCenter(param1: IOfferExtension): IOfferCenter {
        if (this._offerCenter == null) {
            this._offerCenter = new OfferCenter(this.windowManager, this.assets, this);
        }
        this._offerCenter.offerExtension = param1;
        return this._offerCenter;
    }

    public isNewIdentity(): boolean {
        return this.getInteger("new.identity", 0) > 0;
    }

    public useNonTabbedCatalog(param1: string): boolean {
        if (param1 == "BUILDERS_CLUB") {
            return true;
        }
        return this.getBoolean("client.desktop.use.non.tabbed.catalog");
    }

    public get notifications(): IHabboNotifications {
        return this._notifications;
    }

    protected override initInstanceFields(): void {
        this.onLtdRaffleResult = this.onLtdRaffleResult.bind(this);
        this.onLtdRaffleEntered = this.onLtdRaffleEntered.bind(this);
        this.onHabboToolbarEvent = this.onHabboToolbarEvent.bind(this);
        this.onClearSearch = this.onClearSearch.bind(this);
        this.onSearchInputEvent = this.onSearchInputEvent.bind(this);
        this.onKeyUpSearchTimer = this.onKeyUpSearchTimer.bind(this);
        this.onRoomSessionEvent = this.onRoomSessionEvent.bind(this);
        this.onWindowClose = this.onWindowClose.bind(this);
        this.onCatalogIndex = this.onCatalogIndex.bind(this);
        this.onCatalogPage = this.onCatalogPage.bind(this);
        this.onCatalogPublished = this.onCatalogPublished.bind(this);
        this.onNftStorePurchase = this.onNftStorePurchase.bind(this);
        this.onPurchaseError = this.onPurchaseError.bind(this);
        this.onPurchaseNotAllowed = this.onPurchaseNotAllowed.bind(this);
        this.onPurchaseOK = this.onPurchaseOK.bind(this);
        this.onGiftReceiverNotFound = this.onGiftReceiverNotFound.bind(this);
        this.onNotEnoughBalance = this.onNotEnoughBalance.bind(this);
        this.onSilverBalance = this.onSilverBalance.bind(this);
        this.onEmeraldBalance = this.onEmeraldBalance.bind(this);
        this.onVoucherRedeemOk = this.onVoucherRedeemOk.bind(this);
        this.onVoucherRedeemError = this.onVoucherRedeemError.bind(this);
        this.onApproveNameResult = this.onApproveNameResult.bind(this);
        this.onCreditBalance = this.onCreditBalance.bind(this);
        this.onActivityPointNotification = this.onActivityPointNotification.bind(this);
        this.onActivityPoints = this.onActivityPoints.bind(this);
        this.onSubscriptionInfo = this.onSubscriptionInfo.bind(this);
        this.onClubGiftInfo = this.onClubGiftInfo.bind(this);
        this.onRecyclerStatus = this.onRecyclerStatus.bind(this);
        this.onRecyclerFinished = this.onRecyclerFinished.bind(this);
        this.onRecyclerPrizes = this.onRecyclerPrizes.bind(this);
        this.onMarketPlaceOffers = this.onMarketPlaceOffers.bind(this);
        this.onMarketPlaceOwnOffers = this.onMarketPlaceOwnOffers.bind(this);
        this.onMarketPlaceBuyResult = this.onMarketPlaceBuyResult.bind(this);
        this.onMarketPlaceCancelResult = this.onMarketPlaceCancelResult.bind(this);
        this.onMarketPlaceCancelAllResult = this.onMarketPlaceCancelAllResult.bind(this);
        this.onMarketPlaceClearOwnHistoryResult = this.onMarketPlaceClearOwnHistoryResult.bind(this);
        this.onGiftWrappingConfiguration = this.onGiftWrappingConfiguration.bind(this);
        this.onMarketplaceItemStats = this.onMarketplaceItemStats.bind(this);
        this.onMarketplaceConfiguration = this.onMarketplaceConfiguration.bind(this);
        this.onMarketplaceMakeOfferResult = this.onMarketplaceMakeOfferResult.bind(this);
        this.onHabboClubOffers = this.onHabboClubOffers.bind(this);
        this.onHabboClubExtendOffer = this.onHabboClubExtendOffer.bind(this);
        this.onRoomExit = this.onRoomExit.bind(this);
        this.onSellablePalettes = this.onSellablePalettes.bind(this);
        this.alertDialogEventProcessor = this.alertDialogEventProcessor.bind(this);
        this.noCreditsConfirmDialogEventProcessor = this.noCreditsConfirmDialogEventProcessor.bind(this);
        this.noDucketsConfirmDialogEventProcessor = this.noDucketsConfirmDialogEventProcessor.bind(this);
        this.onExternalLink = this.onExternalLink.bind(this);
        this.onObjectSelected = this.onObjectSelected.bind(this);
        this.onFriendBarSelectionEvent = this.onFriendBarSelectionEvent.bind(this);
        this.onObjectPlaceOnUser = this.onObjectPlaceOnUser.bind(this);
        this.onObjectPlacedInRoom = this.onObjectPlacedInRoom.bind(this);
        this.onMainWindowRelocate = this.onMainWindowRelocate.bind(this);
        this.onGuildMemberships = this.onGuildMemberships.bind(this);
        this.onSnowWarGameTokenOffer = this.onSnowWarGameTokenOffer.bind(this);
        this.onGuildVisualSettingsChanged = this.onGuildVisualSettingsChanged.bind(this);
        this.onBundleDiscountRulesetMessageEvent = this.onBundleDiscountRulesetMessageEvent.bind(this);
        this.onLimitedEditionSoldOut = this.onLimitedEditionSoldOut.bind(this);
        this.onProductOffer = this.onProductOffer.bind(this);
        this.onBuildersClubSubscriptionStatus = this.onBuildersClubSubscriptionStatus.bind(this);
        this.onBuildersClubFurniCount = this.onBuildersClubFurniCount.bind(this);
        this._initialized = false;
        this._SafeStr_5422 = false;
        this._SafeStr_4887 = false;
        this._SafeStr_4295 = false;
        this._SafeStr_6815 = true;
        this._SafeStr_4987 = false;
        this._sellablePetPalettes = new UtilsMap();
        this._SafeStr_2680 = false;
        this._newAdditionsAvailable = false;
        this._SafeStr_7207 = false;
        this._SafeStr_4068 = false;
        this._SafeStr_2988 = null;
        this._bundleDiscountRuleset = null;
        this._catalogType = "NORMAL";
        this._SafeStr_14830 = false;
        this._SafeStr_14832 = false;
        this._SafeStr_14833 = true;
        this._SafeStr_14834 = true;
        this._SafeStr_6613 = false;
        this._builderFurniCount = -1;
        this._builderFurniLimit = 0;
        this._builderMaxFurniLimit = 0;
        this._SafeStr_5508 = 0;
        this._SafeStr_5555 = 0;
        this._builderMembershipUpdateTime = 0;
        this._builderMembershipDisplayUpdateTime = 0;
        this._SafeStr_5234 = false;
        this._SafeStr_4829 = false;
        super.initInstanceFields();
    }

    get [IHabboCatalog](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
