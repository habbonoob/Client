import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ChatReviewSessionOfferedToGuideMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::ChatReviewSessionOfferedToGuideMessageParser'); }

    constructor() {
    }

    declare private _acceptanceTimeout: number;
    static { (this.prototype as any)._acceptanceTimeout = 0; }

    public get acceptanceTimeout(): number {
        return this._acceptanceTimeout;
    }

    public flush(): boolean {
        this._acceptanceTimeout = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._acceptanceTimeout = param1.readInteger();
        return true;
    }
}
