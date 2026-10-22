import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectRoomPlanePropertyUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectRoomPlanePropertyUpdateMessage'); }

    public static readonly WALL_THICKNESS: string = "RORPPUM_WALL_THICKNESS";
    public static readonly FLOOR_THICKNESS: string = "RORPVUM_FLOOR_THICKNESS";

    constructor(param1: string, param2: number) {
        super(null, null);
        this._type = param1;
        this._value = param2;
    }

    private _type: string = "";
    private _value: number = 0;

    public get type(): string {
        return this._type;
    }

    public get value(): number {
        return this._value;
    }
}
