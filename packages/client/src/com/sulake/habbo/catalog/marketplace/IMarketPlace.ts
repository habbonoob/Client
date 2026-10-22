import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IMarketPlaceOfferData } from '@/com/sulake/habbo/catalog/marketplace/IMarketPlaceOfferData';
import type { IMarketPlaceVisualization } from '@/com/sulake/habbo/catalog/marketplace/IMarketPlaceVisualization';
import type { MarketplaceItemStats } from '@/com/sulake/habbo/catalog/marketplace/MarketplaceItemStats';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';

export interface IMarketPlace {
    get windowManager(): IHabboWindowManager;
    get localization(): IHabboLocalizationManager;
    get itemStats(): MarketplaceItemStats;
    set itemStats(param1: MarketplaceItemStats);
    get creditsWaiting(): number;
    get averagePricePeriod(): number;
    set averagePricePeriod(param1: number);
    registerVisualization(param1?: IMarketPlaceVisualization): void;
    onOffers(param1: IMessageEvent): void;
    onOwnOffers(param1: IMessageEvent): void;
    onBuyResult(param1: IMessageEvent): void;
    onCancelResult(param1: IMessageEvent): void;
    requestOffersByName(param1: string): void;
    requestOffersByPrice(param1: number): void;
    requestOffers(param1: number, param2: number, param3: string, param4: number): void;
    refreshOffers(): void;
    requestOwnItems(): void;
    requestItemStats(param1: number, param2: number): void;
    buyOffer(param1: number): void;
    redeemExpiredOffer(param1: number): void;
    latestOffers(): UtilsMap;
    latestOwnOffers(): UtilsMap;
    totalItemsFound(): number;
    getNameLocalizationKey(param1: IMarketPlaceOfferData): string;
    getDescriptionLocalizationKey(param1: IMarketPlaceOfferData): string;
    isAccountSafetyLocked(): boolean;
}
