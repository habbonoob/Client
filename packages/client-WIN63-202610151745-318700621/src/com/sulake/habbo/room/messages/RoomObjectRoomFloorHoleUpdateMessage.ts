import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectRoomFloorHoleUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectRoomFloorHoleUpdateMessage'); }

    public static readonly ADD_HOLE: string = "RORPFHUM_ADD";
    public static readonly REMOVE_HOLE: string = "RORPFHUM_REMOVE";
    private _type: string = "";

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    declare private _invert: boolean;
    static { (this.prototype as any)._invert = false; }

    constructor(param1: string, param2: number, param3: number = 0, param4: number = 0, param5: number = 0, param6: number = 0, param7: boolean = false) {
        super(null, null);
        this._type = param1;
        this._id = param2;
        this._SafeStr_2126 = param3;
        this._y = param4;
        this._width = param5;
        this._height = param6;
        this._invert = param7;
    }

    public get type(): string {
        return this._type;
    }

    public get id(): number {
        return this._id;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get invert(): boolean {
        return this._invert;
    }
}
