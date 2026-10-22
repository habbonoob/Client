import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectRoomPlaneVisibilityUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectRoomPlaneVisibilityUpdateMessage'); }

    public static readonly _SafeStr_7874: string = "RORPVUM_WALL_VISIBILITY";
    public static readonly _SafeStr_8669: string = "RORPVUM_FLOOR_VISIBILITY";

    constructor(param1: string, param2: boolean) {
        super(null, null);
        this._type = param1;
        this._visible = param2;
    }

    private _type: string = "";
    private _visible: boolean = false;

    public get type(): string {
        return this._type;
    }

    public get visible(): boolean {
        return this._visible;
    }
}
