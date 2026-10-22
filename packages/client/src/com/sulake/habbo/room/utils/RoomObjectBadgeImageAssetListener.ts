import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';

export class RoomObjectBadgeImageAssetListener {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::RoomObjectBadgeImageAssetListener'); }

    constructor(param1: IRoomObjectController, param2: boolean) {
        this._object = param1;
        this._groupBadge = param2;
    }

    declare private _object: IRoomObjectController;

    declare private _groupBadge: boolean;
    static { (this.prototype as any)._groupBadge = false; }

    public get object(): IRoomObjectController {
        return this._object;
    }

    public get groupBadge(): boolean {
        return this._groupBadge;
    }
}
