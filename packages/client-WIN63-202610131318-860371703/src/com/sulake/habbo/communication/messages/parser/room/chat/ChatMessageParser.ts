import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Point } from '@habbo-pixi/runtime/geom/Point';

export class ChatMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.chat::ChatMessageParser'); }

    private _userId: number = 0;
    private _text: string = "";

    declare private _links: any[];

    private _gesture: number = 0;
    private _trackingId: number = -1;
    private _styleId: number = 0;
    private _SafeStr_14067: number = -1;
    private _chatBubbleWidthOverride: number = -1;
    private _hideUsername: boolean = false;

    declare private _location: Point;

    constructor() {
    }

    public get userId(): number {
        return this._userId;
    }

    public get text(): string {
        return this._text;
    }

    public get links(): any[] {
        return this._links;
    }

    public get gesture(): number {
        return this._gesture;
    }

    public get trackingId(): number {
        return this._trackingId;
    }

    public get styleId(): number {
        return this._styleId;
    }

    public get receiverRoomIndex(): number {
        return this._SafeStr_14067;
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

    public flush(): boolean {
        this._userId = 0;
        this._text = "";
        this._gesture = 0;
        this._links = null;
        this._trackingId = -1;
        this._styleId = 0;
        this._SafeStr_14067 = -1;
        this._chatBubbleWidthOverride = -1;
        this._hideUsername = false;
        this._location = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        if (param1 == null) {
            return false;
        }
        this._userId = param1.readInteger();
        this._text = param1.readString();
        this._gesture = param1.readInteger();
        this._styleId = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        if (_loc2_ > 0) {
            this._links = [];
            _loc3_ = 0;
            while (_loc3_ < _loc2_) {
                this._links.push([param1.readString(), param1.readString(), param1.readBoolean()]);
                _loc3_++;
            }
        }
        this._trackingId = param1.readInteger();
        if (param1.bytesAvailable) {
            this._SafeStr_14067 = param1.readInteger();
        }
        if (param1.bytesAvailable) {
            this._chatBubbleWidthOverride = param1.readInteger();
        }
        if (param1.bytesAvailable) {
            this._hideUsername = param1.readBoolean();
        }
        if (param1.bytesAvailable) {
            this._location = new Point(param1.readInteger(), param1.readInteger());
        }
        return true;
    }
}
