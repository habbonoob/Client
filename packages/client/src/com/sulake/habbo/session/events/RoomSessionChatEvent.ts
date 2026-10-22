import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
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

    constructor(param1: string, param2: IRoomSession, param3: number, param4: string, param5: number = 0, param6: number = 0, param7: any[] = null, param8: number = -1) {
        super(param1, param2, false, false);
        this._userId = param3;
        this._text = param4;
        this._chatType = param5;
        this._links = param7;
        this._extraParam = param8;
        this._style = param6;
    }

    private _userId: number = 0;
    private _chatType: number = 0;

    declare private _links: any[];

    declare private _extraParam: number;
    static { (this.prototype as any)._extraParam = 0; }

    private _text: string = "";

    public get text(): string {
        return this._text;
    }

    declare private _style: number;
    static { (this.prototype as any)._style = 0; }

    public get style(): number {
        return this._style;
    }

    public get userId(): number {
        return this._userId;
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
}
