import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';

export class RoomObjectRoomAdEvent extends RoomObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectRoomAdEvent'); }

    public static readonly ROOM_AD_LOAD_IMAGE: string = "RORAE_ROOM_AD_LOAD_IMAGE";
    public static readonly ROOM_AD_FURNI_CLICK: string = "RORAE_ROOM_AD_FURNI_CLICK";
    public static readonly ROOM_AD_FURNI_DOUBLE_CLICK: string = "RORAE_ROOM_AD_FURNI_DOUBLE_CLICK";
    public static readonly ROOM_AD_TOOLTIP_SHOW: string = "RORAE_ROOM_AD_TOOLTIP_SHOW";
    public static readonly ROOM_AD_TOOLTIP_HIDE: string = "RORAE_ROOM_AD_TOOLTIP_HIDE";

    constructor(param1: string, param2: IRoomObject, param3: string = "", param4: string = "", param5: boolean = false, param6: boolean = false) {
        super(param1, param2, param5, param6);
        this._imageUrl = param3;
        this._clickUrl = param4;
    }

    private _imageUrl: string = "";
    private _clickUrl: string = "";

    public get clickUrl(): string {
        return this._clickUrl;
    }

    public get imageUrl(): string {
        return this._imageUrl;
    }

    public override clone(): Event {
        return new RoomObjectRoomAdEvent(this.type, this.object, this.imageUrl, this.clickUrl, this.bubbles, this.cancelable);
    }
}
