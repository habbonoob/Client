import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class HabboInventoryCategoryInitializeEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.inventory.events::HabboInventoryCategoryInitializeEvent'); }

    public static readonly HABBO_INVENTORY_CATEGORY_INITIALIZED: string = "HABBO_INVENTORY_CATEGORY_INITIALIZED";

    declare private _category: string;

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super("HABBO_INVENTORY_CATEGORY_INITIALIZED", param2, param3);
        this._category = param1;
    }

    public get category(): string {
        return this._category;
    }
}
