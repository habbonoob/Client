import type { ClubBuyOfferData } from '@/com/sulake/habbo/catalog/club/ClubBuyOfferData';

export interface IVipBuyCatalogWidget {
    dispose(): void;
    init(): boolean;
    reset(): void;
    initClubType(param1: number): void;
    showOffer(param1: ClubBuyOfferData): void;
    get isGift(): boolean;
}
