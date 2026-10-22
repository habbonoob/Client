import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class SelectProductEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::SelectProductEvent'); }

    constructor(param1: IPurchasableOffer, param2: boolean = false, param3: boolean = false) {
        super("SELECT_PRODUCT", param2, param3);
        this._offer = param1;
    }

    declare private _offer: IPurchasableOffer;

    public get offer(): IPurchasableOffer {
        return this._offer;
    }
}
