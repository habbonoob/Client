import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';

export class RoomEngineObjectPlacedOnUserEvent extends RoomEngineObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineObjectPlacedOnUserEvent'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: number, param6: number, param7: boolean = false, param8: boolean = false) {
        super(param1, param2, param3, param4, param7, param8);
        this._droppedObjectId = this.droppedObjectId;
        this._droppedObjectCategory = param6;
    }

    declare private _droppedObjectId: number;
    static { (this.prototype as any)._droppedObjectId = 0; }

    declare private _droppedObjectCategory: number;
    static { (this.prototype as any)._droppedObjectCategory = 0; }

    public get droppedObjectId(): number {
        return this._droppedObjectId;
    }

    public get droppedObjectCategory(): number {
        return this._droppedObjectCategory;
    }
}
