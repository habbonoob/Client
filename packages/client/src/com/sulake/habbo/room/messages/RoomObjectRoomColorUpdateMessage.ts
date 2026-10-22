import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectRoomColorUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectRoomColorUpdateMessage'); }

    public static readonly BACKGROUND_COLOR: string = "RORCUM_BACKGROUND_COLOR";

    constructor(param1: string, param2: number, param3: number, param4: boolean) {
        super(null, null);
        this._type = param1;
        this._color = param2;
        this._light = param3;
        this._bgOnly = param4;
    }

    private _type: string = "";
    private _light: number = 0;
    private _bgOnly: boolean = true;
    private _color: number = 0;

    public get color(): number {
        return this._color;
    }

    public get type(): string {
        return this._type;
    }

    public get light(): number {
        return this._light >>> 0;
    }

    public get bgOnly(): boolean {
        return this._bgOnly;
    }
}
