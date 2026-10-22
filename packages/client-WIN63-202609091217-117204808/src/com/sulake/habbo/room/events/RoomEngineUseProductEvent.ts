import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';

export class RoomEngineUseProductEvent extends RoomEngineObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineUseProductEvent'); }

    public static readonly USE_PRODUCT_FROM_ROOM: string = "ROSM_USE_PRODUCT_FROM_ROOM";
    public static readonly USE_PRODUCT_FROM_INVENTORY: string = "ROSM_USE_PRODUCT_FROM_INVENTORY";

    declare private _inventoryStripId: number;
    static { (this.prototype as any)._inventoryStripId = 0; }

    declare private _furnitureTypeId: number;
    static { (this.prototype as any)._furnitureTypeId = 0; }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: number = -1, param6: number = -1, param7: boolean = false, param8: boolean = false) {
        super(param1, param2, param3, param4, param7, param8);
        this._inventoryStripId = param5;
        this._furnitureTypeId = param6;
    }

    public get inventoryStripId(): number {
        return this._inventoryStripId;
    }

    public get furnitureTypeId(): number {
        return this._furnitureTypeId;
    }
}
