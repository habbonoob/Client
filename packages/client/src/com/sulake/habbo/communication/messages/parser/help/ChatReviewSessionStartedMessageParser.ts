import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ChatReviewSessionStartedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::ChatReviewSessionStartedMessageParser'); }

    constructor() {
    }

    declare private _votingTimeout: number;
    static { (this.prototype as any)._votingTimeout = 0; }

    declare private _chatRecord: string;

    public get votingTimeout(): number {
        return this._votingTimeout;
    }

    public get chatRecord(): string {
        return this._chatRecord;
    }

    public flush(): boolean {
        this._votingTimeout = -1;
        this._chatRecord = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._votingTimeout = param1.readInteger();
        this._chatRecord = param1.readString();
        return true;
    }
}
