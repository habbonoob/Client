import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IPageLocalization } from '@/com/sulake/habbo/catalog/viewer/IPageLocalization';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { Event } from '@habbo-pixi/runtime/events/Event';

export interface ICatalogViewer {
    get catalog(): IHabboCatalog;
    get roomEngine(): IRoomEngine;
    get viewerTags(): any[];
    showCatalogPage(param1: number, param2: string, param3: IPageLocalization, param4: IPurchasableOffer[], param5: number, param6: boolean): void;
    dispose(): void;
    getCurrentLayoutCode(): string;
    dispatchWidgetEvent(param1: Event): boolean;
}
