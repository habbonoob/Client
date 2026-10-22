import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { LegacyStuffData } from '@/com/sulake/habbo/room/object/data/LegacyStuffData';

export class ObjectData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ObjectData'); }

    constructor(param1: number, param2: number, param3: IStuffData) {
        this._id = param1;
        this._state = param2;
        this._data = param3;
    }

    private _id: number = 0;
    private _state: number = 0;
    private _data: IStuffData = new LegacyStuffData();

    public get id(): number {
        return this._id;
    }

    public get state(): number {
        return this._state;
    }

    public get data(): IStuffData {
        return this._data;
    }
}
