import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class UserTypingMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.chat::UserTypingMessageParser'); }

    private _userId: number = 0;
    private _isTyping: boolean = false;

    constructor() {
    }

    public get userId(): number {
        return this._userId;
    }

    public get isTyping(): boolean {
        return this._isTyping;
    }

    public flush(): boolean {
        this._userId = 0;
        this._isTyping = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._userId = param1.readInteger();
        this._isTyping = param1.readInteger() == 1;
        return true;
    }
}
