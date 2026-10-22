import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class HabbiconControllerEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconControllerEvent'); }

    public static readonly _SafeStr_14098: string = "hce_owned_habbicons_updated";
    public static readonly SHOP_DATA_UPDATED: string = "hce_shop_data_updated";
    public static readonly _SafeStr_14099: string = "hce_habbicon_status_changed";
    public static readonly RECENT_HABBICONS_UPDATED: string = "hce_recent_habbicons_updated";
    public static readonly ROOM_USE_HABBICON: string = "hce_room_use_habbicon";

    declare public habbiconId: number;
    static { (this.prototype as any).habbiconId = 0; }

    declare public collectionId: number;
    static { (this.prototype as any).collectionId = 0; }

    declare public roomIndex: number;
    static { (this.prototype as any).roomIndex = 0; }

    constructor(param1: string, param2: number = 0, param3: number = 0, param4: number = 0) {
        super(param1);
        this.habbiconId = param2;
        this.collectionId = param3;
        this.roomIndex = param4;
    }

    public override clone(): Event {
        return new HabbiconControllerEvent(this.type, this.habbiconId, this.collectionId, this.roomIndex);
    }
}
