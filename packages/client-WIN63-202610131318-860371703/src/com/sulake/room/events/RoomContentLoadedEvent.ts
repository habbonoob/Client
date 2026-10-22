import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class RoomContentLoadedEvent extends Event {
    static { registerClassName(this, 'com.sulake.room.events::RoomContentLoadedEvent'); }

    public static readonly CONTENT_LOAD_SUCCESS: string = "RCLE_SUCCESS";
    public static readonly CONTENT_LOAD_FAILURE: string = "RCLE_FAILURE";
    public static readonly CONTENT_LOAD_CANCEL: string = "RCLE_CANCEL";

    declare private _contentType: string;

    constructor(param1: string, param2: string, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._contentType = param2;
    }

    public get contentType(): string {
        return this._contentType;
    }
}
