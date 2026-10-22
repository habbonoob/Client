import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';

export class ChatEntry {
    static { registerClassName(this, 'com.sulake.habbo.messenger::ChatEntry'); }

    public static readonly TYPE_OWN_CHAT: number = 1;
    public static readonly TYPE_OTHER_CHAT: number = 2;
    public static readonly _SafeStr_7871: number = 3;
    public static readonly TYPE_INFO: number = 4;
    public static readonly _SafeStr_7876: number = 5;

    constructor(param1: number, param2: number, param3: string, param4: number, param5: number = 0, param6: string = null, param7: string = null, param8: string = "", param9: number = 0) {
        this._type = param1;
        this._chatId = param2;
        this._message = param3;
        this._secondsSinceSent = param4;
        this._clientReceiveTime = getTimer();
        this._awaitConfirmationId = param9;
        this._messageId = param8;
        this._senderId = param5;
        this._senderName = param6;
        this._senderFigure = param7;
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _chatId: number;
    static { (this.prototype as any)._chatId = 0; }

    declare private _message: string;

    declare private _secondsSinceSent: number;
    static { (this.prototype as any)._secondsSinceSent = 0; }

    declare private _clientReceiveTime: number;
    static { (this.prototype as any)._clientReceiveTime = 0; }

    declare private _awaitConfirmationId: number;
    static { (this.prototype as any)._awaitConfirmationId = 0; }

    declare private _messageId: string;

    declare private _senderId: number;
    static { (this.prototype as any)._senderId = 0; }

    declare private _senderFigure: string;

    declare private _senderName: string;

    public get senderName(): string {
        return this._senderName;
    }

    public get type(): number {
        return this._type;
    }

    public get chatId(): number {
        return this._chatId;
    }

    public get message(): string {
        return this._message;
    }

    public get secondsSinceSent(): number {
        let _loc1_: number = (getTimer() - this._clientReceiveTime) / 1000 | 0;
        return this._secondsSinceSent + _loc1_;
    }

    public get awaitConfirmationId(): number {
        return this._awaitConfirmationId;
    }

    public get messageId(): string {
        return this._messageId;
    }

    public get senderId(): number {
        return this._senderId;
    }

    public get senderFigure(): string {
        return this._senderFigure;
    }

    public sentTimeStamp(): number {
        return new Date().getTime() - this.secondsSinceSent * 1000;
    }

    public prefixMessageWith(param1: string): void {
        this._message = param1 + "\n" + this._message;
    }

    public isAwaitingConfirmation(): boolean {
        return this._awaitConfirmationId != 0;
    }

    public isConfirmed(param1: string, param2: string): void {
        this._awaitConfirmationId = 0;
        this._message = param1;
        this._messageId = param2;
    }
}
