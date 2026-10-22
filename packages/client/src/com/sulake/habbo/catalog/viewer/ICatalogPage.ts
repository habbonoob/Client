import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { ICatalogViewer } from '@/com/sulake/habbo/catalog/viewer/ICatalogViewer';
import type { IPageLocalization } from '@/com/sulake/habbo/catalog/viewer/IPageLocalization';
import type { Event } from '@habbo-pixi/runtime/events/Event';

export interface ICatalogPage {
    get window(): IWindowContainer;
    get viewer(): ICatalogViewer;
    get pageId(): number;
    get offers(): IPurchasableOffer[];
    get localization(): IPageLocalization;
    get layoutCode(): string;
    get hasLinks(): boolean;
    get links(): any[];
    get acceptSeasonCurrencyAsCredits(): boolean;
    get allowDragging(): boolean;
    set searchPageId(param1: number);
    get mode(): number;
    get isBuilderPage(): boolean;
    dispose(): void;
    init(): void;
    closed(): void;
    selectOffer(param1: number): void;
    replaceOffers(param1: IPurchasableOffer[], param2?: boolean): void;
    updateLimitedItemsLeft(param1: number, param2: number): void;
    dispatchWidgetEvent(param1: Event): boolean;
}
