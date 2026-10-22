import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionChatEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionChatEvent'); }

    public static readonly ROOM_SESSION_CHAT_EVENT: string = "RSCE_CHAT_EVENT";
    public static readonly ROOM_SESSION_FLOODCONTROL_EVENT: string = "RSCE_FLOOD_EVENT";
    public static readonly CHAT_TYPE_SPEAK: number = 0;
    public static readonly CHAT_TYPE_WHISPER: number = 1;
    public static readonly CHAT_TYPE_SHOUT: number = 2;
    public static readonly CHAT_TYPE_RESPECT: number = 3;
    public static readonly CHAT_TYPE_PETRESPECT: number = 4;
    public static readonly CHAT_TYPE_HAND_ITEM_RECEIVED: number = 5;
    public static readonly CHAT_TYPE_PETTREAT: number = 6;
    public static readonly CHAT_TYPE_PETREVIVE: number = 7;
    public static readonly CHAT_TYPE_PET_REBREED_FERTILIZE: number = 8;
    public static readonly CHAT_TYPE_PET_SPEED_FERTILIZE: number = 9;
    public static readonly CHAT_TYPE_MUTE_REMAINING: number = 10;
    public static readonly CHAT_TYPE_PING: number = 11;
    public static readonly CHAT_TYPE_SPECIAL_SYSTEM: number = 12;
    private _userId: number = 0;
    private _text: string = "";
    private _chatType: number = 0;

    declare private _links: any[];

    declare private _extraParam: number;
    static { (this.prototype as any)._extraParam = 0; }

    declare private _style: number;
    static { (this.prototype as any)._style = 0; }

    declare private _chatBubbleWidthOverride: number;
    static { (this.prototype as any)._chatBubbleWidthOverride = 0; }

    declare private _hideUsername: boolean;
    static { (this.prototype as any)._hideUsername = false; }

    declare private _location: Point;

    constructor(param1: string, param2: IRoomSession, param3: number, param4: string, param5: number = 0, param6: number = 0, param7: any[] = null, param8: number = -1, param9: number = -1, param10: boolean = false, param11: Point = null) {
        super(param1, param2, false, false);
        this._userId = param3;
        this._text = param4;
        this._chatType = param5;
        this._links = param7;
        this._extraParam = param8;
        this._style = param6;
        this._chatBubbleWidthOverride = param9;
        this._hideUsername = param10;
        this._location = param11;
    }

    public get userId(): number {
        return this._userId;
    }

    public get text(): string {
        return this._text;
    }

    public get chatType(): number {
        return this._chatType;
    }

    public get links(): any[] {
        return this._links;
    }

    public get extraParam(): number {
        return this._extraParam;
    }

    public get style(): number {
        return this._style;
    }

    public get chatBubbleWidthOverride(): number {
        return this._chatBubbleWidthOverride;
    }

    public get hideUsername(): boolean {
        return this._hideUsername;
    }

    public get location(): Point {
        return this._location;
    }
}
