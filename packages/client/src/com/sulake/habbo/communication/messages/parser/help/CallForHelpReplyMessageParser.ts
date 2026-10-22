import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CallForHelpReplyMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::CallForHelpReplyMessageParser'); }

    constructor() {
    }

    declare private _message: string;

    public get message(): string {
        return this._message;
    }

    public flush(): boolean {
        this._message = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._message = param1.readString();
        return true;
    }
}
