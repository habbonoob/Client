import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class HabboUnseenItemsUpdatedEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.inventory.events::HabboUnseenItemsUpdatedEvent'); }

    public static readonly _SafeStr_7828: string = "HUIUE_UNSEEN_ITEMS_CHANGED";

    constructor(param1: boolean = false, param2: boolean = false) {
        super("HUIUE_UNSEEN_ITEMS_CHANGED");
        this._SafeStr_5838 = new Dictionary();
    }

    declare private _inventoryCount: number;
    static { (this.prototype as any)._inventoryCount = 0; }

    declare private _SafeStr_5838: Map<any, any>;

    public get inventoryCount(): number {
        return this._inventoryCount;
    }

    public set inventoryCount(param1: number) {
        this._inventoryCount = param1;
    }

    public setCategoryCount(param1: number, param2: number): void {
        this._SafeStr_5838.set(param1.toString(), param2);
    }

    public getCategoryCount(param1: number): number {
        return this._SafeStr_5838.get(param1.toString()) | 0;
    }
}
