import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectRoomAdUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectRoomAdUpdateMessage'); }

    public static readonly ROOM_AD_ACTIVATE: string = "RORUM_ROOM_AD_ACTIVATE";
    public static readonly ROOM_BILLBOARD_IMAGE_LOADED: string = "RORUM_ROOM_BILLBOARD_IMAGE_LOADED";
    public static readonly ROOM_BILLBOARD_LOADING_FAILED: string = "RORUM_ROOM_BILLBOARD_IMAGE_LOADING_FAILED";

    constructor(param1: string, param2: string, param3: string, param4: number = -1, param5: BitmapData = null) {
        super(null, null);
        this._type = param1;
        this._asset = param2;
        this._clickUrl = param3;
        this._objectId = param4;
        this._bitmapData = param5;
    }

    declare private _type: string;

    declare private _clickUrl: string;

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _asset: string;

    public get asset(): string {
        return this._asset;
    }

    declare private _bitmapData: BitmapData;

    public get bitmapData(): BitmapData {
        return this._bitmapData;
    }

    public get type(): string {
        return this._type;
    }

    public get clickUrl(): string {
        return this._clickUrl;
    }

    public get objectId(): number {
        return this._objectId;
    }
}
