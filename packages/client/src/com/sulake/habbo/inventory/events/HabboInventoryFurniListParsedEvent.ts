import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class HabboInventoryFurniListParsedEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.inventory.events::HabboInventoryFurniListParsedEvent'); }

    public static readonly _SafeStr_7858: string = "HFLPE_FURNI_LIST_PARSED";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super("HFLPE_FURNI_LIST_PARSED");
        this._category = param1;
    }

    declare private _category: string;

    public get category(): string {
        return this._category;
    }
}
