import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectRoomUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectRoomUpdateMessage'); }

    public static readonly ROOM_WALL_UPDATE: string = "RORUM_ROOM_WALL_UPDATE";
    public static readonly ROOM_FLOOR_UPDATE: string = "RORUM_ROOM_FLOOR_UPDATE";
    public static readonly ROOM_LANDSCAPE_UPDATE: string = "RORUM_ROOM_LANDSCAPE_UPDATE";

    constructor(param1: string, param2: string) {
        super(null, null);
        this._type = param1;
        this._value = param2;
    }

    private _type: string = "";
    private _value: string = "";

    public get type(): string {
        return this._type;
    }

    public get value(): string {
        return this._value;
    }
}
