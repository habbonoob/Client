import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogFurniPurchaseEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.navigation.events::CatalogFurniPurchaseEvent'); }

    public static readonly CATALOG_FURNI_PURCHASE: string = "CATALOG_FURNI_PURCHASE";

    declare private _localizationId: string;

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super("CATALOG_FURNI_PURCHASE", param2, param3);
        this._localizationId = param1;
    }

    public get localizationId(): string {
        return this._localizationId;
    }
}
