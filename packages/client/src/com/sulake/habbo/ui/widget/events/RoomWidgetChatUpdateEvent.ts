import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetChatUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetChatUpdateEvent'); }

    public static readonly WIDGET_UPDATE_EVENT_CHAT: string = "RWCUE_EVENT_CHAT";
    public static readonly CHAT_TYPE_SPEAK: number = 0;
    public static readonly CHAT_TYPE_WHISPER: number = 1;
    public static readonly CHAT_TYPE_SHOUT: number = 2;
    public static readonly CHAT_TYPE_RESPECT: number = 3;
    public static readonly CHAT_TYPE_PETRESPECT: number = 4;
    public static readonly CHAT_TYPE_NOTIFY: number = 5;
    public static readonly CHAT_TYPE_PETTREAT: number = 6;
    public static readonly CHAT_TYPE_PETREVIVE: number = 7;
    public static readonly CHAT_TYPE_PET_REBREED_FERTILIZE: number = 8;
    public static readonly CHAT_TYPE_PET_SPEED_FERTILIZE: number = 9;
    public static readonly CHAT_TYPE_BOT_SPEAK: number = 10;
    public static readonly CHAT_TYPE_BOT_SHOUT: number = 11;
    public static readonly CHAT_TYPE_BOT_WHISPER: number = 12;

    constructor(param1: string, param2: number, param3: string, param4: string, param5: number, param6: number, param7: number, param8: number, param9: number, param10: BitmapData, param11: number, param12: number, param13: number = 0, param14: number = 0, param15: any[] = null, param16: boolean = false, param17: boolean = false) {
        super(param1, param16, param17);
        this._userId = param2;
        this._text = param3;
        this._chatType = param13;
        this._userName = param4;
        this._userCategory = param5;
        this._userType = param6;
        this._petType = param7;
        this._links = param15;
        this._userX = param8;
        this._userY = param9;
        this._userImage = param10;
        this._userColor = param11;
        this._roomId = param12;
        this._styleId = param14;
    }

    private _userId: number = 0;
    private _chatType: number = 0;

    declare private _links: any[];

    declare private _userX: number;
    static { (this.prototype as any)._userX = NaN; }

    declare private _userY: number;
    static { (this.prototype as any)._userY = NaN; }

    declare private _userImage: BitmapData;

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _userCategory: number;
    static { (this.prototype as any)._userCategory = 0; }

    declare private _userType: number;
    static { (this.prototype as any)._userType = 0; }

    declare private _petType: number;
    static { (this.prototype as any)._petType = 0; }

    declare private _styleId: number;
    static { (this.prototype as any)._styleId = 0; }

    private _text: string = "";

    public get text(): string {
        return this._text;
    }

    declare private _userName: string;

    public get userName(): string {
        return this._userName;
    }

    declare private _userColor: number;
    static { (this.prototype as any)._userColor = 0; }

    public get userColor(): number {
        return this._userColor;
    }

    public get userId(): number {
        return this._userId;
    }

    public get chatType(): number {
        return this._chatType;
    }

    public get userCategory(): number {
        return this._userCategory;
    }

    public get userType(): number {
        return this._userType;
    }

    public get petType(): number {
        return this._petType;
    }

    public get links(): any[] {
        return this._links;
    }

    public get userX(): number {
        return this._userX;
    }

    public get userY(): number {
        return this._userY;
    }

    public get userImage(): BitmapData {
        return this._userImage;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get styleId(): number {
        return this._styleId;
    }
}
