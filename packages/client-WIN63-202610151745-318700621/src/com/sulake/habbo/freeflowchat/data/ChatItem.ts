import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomSessionChatEvent } from '@/com/sulake/habbo/session/events/RoomSessionChatEvent';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class ChatItem {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.data::ChatItem'); }

    private _SafeStr_5424: number = 0;
    private _userId: number = 0;
    private _roomId: number = 0;
    private _text: string = "";
    private _chatType: number = 0;

    declare private _links: any[];

    declare private _style: number;
    static { (this.prototype as any)._style = 0; }

    declare private _userLocation: IVector3d;

    declare private _forcedColor: any;

    declare private _forcedScreenLocation: any;

    declare private _forcedFigure: string;

    declare private _forcedUserName: string;

    declare private _extraParam: number;
    static { (this.prototype as any)._extraParam = 0; }

    declare private _chatBubbleWidthOverride: number;
    static { (this.prototype as any)._chatBubbleWidthOverride = 0; }

    private _SafeStr_15076: boolean = false;

    declare private _hideUsername: boolean;
    static { (this.prototype as any)._hideUsername = false; }

    declare private _SafeStr_15077: boolean;
    static { (this.prototype as any)._SafeStr_15077 = false; }

    constructor(param1: RoomSessionChatEvent, param2: number, param3: IVector3d = null, param4: number = 0, param5: any = null, param6: any = null, param7: string = null, param8: string = null) {
        this._SafeStr_5424 = param2;
        this._userLocation = param3 != null ? new Vector3d(param3.x, param3.y, param3.z) : null;
        this._userId = param1.userId;
        if (param1.session) {
            this._roomId = param1.session.roomId;
        } else {
            this._roomId = 1;
        }
        this._text = param1.text;
        this._chatType = param1.chatType;
        this._style = param1.style;
        this._links = new Array(param1.links);
        this._forcedColor = param6;
        this._forcedScreenLocation = param5;
        this._forcedFigure = param7;
        this._forcedUserName = param8;
        this._extraParam = param4;
        this._chatBubbleWidthOverride = param1.chatBubbleWidthOverride;
        this._hideUsername = param1.hideUsername || param1.userId < 0;
        this._SafeStr_15077 = param1.location != null;
    }

    public get userId(): number {
        return this._userId;
    }

    public get roomId(): number {
        return this._roomId;
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

    public get style(): number {
        return this._style;
    }

    public get timeStamp(): number {
        return this._SafeStr_5424 >>> 0;
    }

    public get userLocation(): IVector3d {
        return this._userLocation;
    }

    public get forcedColor(): any {
        return this._forcedColor;
    }

    public get forcedScreenLocation(): any {
        return this._forcedScreenLocation;
    }

    public get forcedFigure(): string {
        return this._forcedFigure;
    }

    public get forcedUserName(): string {
        return this._forcedUserName;
    }

    public get extraParam(): number {
        return this._extraParam;
    }

    public get chatBubbleWidthOverride(): number {
        return this._chatBubbleWidthOverride;
    }

    public get tableTabMarkupEnabled(): boolean {
        return this._SafeStr_15076;
    }

    public get hideUsername(): boolean {
        return this._hideUsername;
    }

    public get hasCustomLocation(): boolean {
        return this._SafeStr_15077;
    }

    public set text(param1: string) {
        this._text = param1;
    }

    public set style(param1: number) {
        this._style = param1;
    }

    public set tableTabMarkupEnabled(param1: boolean) {
        this._SafeStr_15076 = param1;
    }
}
