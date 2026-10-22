import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';

export class RoomObjectFurniIconImageAssetListener {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::RoomObjectFurniIconImageAssetListener'); }

    declare private _object: IRoomObjectController;

    constructor(param1: IRoomObjectController) {
        this._object = param1;
    }

    public get object(): IRoomObjectController {
        return this._object;
    }
}
