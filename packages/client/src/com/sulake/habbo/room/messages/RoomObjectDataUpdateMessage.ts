import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectDataUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectDataUpdateMessage'); }

    constructor(param1: number, param2: IStuffData, param3: number = NaN) {
        super(null, null);
        this._state = param1;
        this._data = param2;
        this._extra = param3;
    }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    private _data: IStuffData = null;
    private _extra: number = NaN;

    public get state(): number {
        return this._state;
    }

    public get data(): IStuffData {
        return this._data;
    }

    public get extra(): number {
        return this._extra;
    }
}
