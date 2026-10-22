import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class ChatlineData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::ChatlineData'); }

    constructor(param1: IMessageDataWrapper) {
        this._timeStamp = param1.readString();
        this._chatterId = param1.readInteger();
        this._chatterName = param1.readString();
        this._msg = param1.readString();
        this._hasHighlighting = param1.readBoolean();
    }

    declare private _timeStamp: string;

    declare private _chatterId: number;
    static { (this.prototype as any)._chatterId = 0; }

    declare private _chatterName: string;

    declare private _hasHighlighting: boolean;
    static { (this.prototype as any)._hasHighlighting = false; }

    declare private _msg: string;

    public get msg(): string {
        return this._msg;
    }

    public get timeStamp(): string {
        return this._timeStamp;
    }

    public get chatterId(): number {
        return this._chatterId;
    }

    public get chatterName(): string {
        return this._chatterName;
    }

    public get hasHighlighting(): boolean {
        return this._hasHighlighting;
    }
}
