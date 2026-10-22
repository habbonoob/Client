import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ChatMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.chat::ChatMessageParser'); }

    constructor() {
    }

    private _userId: number = 0;

    declare private _links: any[];

    private _gesture: number = 0;
    private _trackingId: number = -1;
    private _styleId: number = 0;
    private _text: string = "";

    public get text(): string {
        return this._text;
    }

    public get userId(): number {
        return this._userId;
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

    public flush(): boolean {
        this._userId = 0;
        this._text = "";
        this._gesture = 0;
        this._links = null;
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
        return true;
    }
}
