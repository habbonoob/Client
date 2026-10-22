import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomObjectPlacementSource {
    static { registerClassName(this, 'com.sulake.habbo.room.enum::RoomObjectPlacementSource'); }

    public static readonly CATALOG: string = "catalog";
    public static readonly INVENTORY: string = "inventory";
    public static readonly INFO_STAND: string = "info_stand";

    constructor() {
    }
}
