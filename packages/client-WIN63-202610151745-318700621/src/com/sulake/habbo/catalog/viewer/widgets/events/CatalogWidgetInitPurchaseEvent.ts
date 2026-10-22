import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetInitPurchaseEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetInitPurchaseEvent'); }

    private _SafeStr_6990: boolean = true;

    declare private _userName: string;

    constructor(param1: boolean = true, param2: string = null, param3: boolean = false, param4: boolean = false) {
        super("INIT_PURCHASE", param3, param4);
        this._SafeStr_6990 = param1;
        this._userName = param2;
    }

    public get enableBuyAsGift(): boolean {
        return this._SafeStr_6990;
    }

    public get userName(): string {
        return this._userName;
    }
}
