import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetPurchaseOverrideEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetPurchaseOverrideEvent'); }

    constructor(param1: (...args: any[]) => any, param2: boolean = false, param3: boolean = false) {
        super("PURCHASE_OVERRIDE", param2, param3);
        this._callback = param1;
    }

    declare private _callback: (...args: any[]) => any;

    public get callback(): (...args: any[]) => any {
        return this._callback;
    }
}
