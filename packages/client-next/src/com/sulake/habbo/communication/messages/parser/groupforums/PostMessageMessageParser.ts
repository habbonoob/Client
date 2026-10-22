import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { MessageData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/MessageData';

export class PostMessageMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.groupforums::PostMessageMessageParser'); }

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    declare private _threadId: number;
    static { (this.prototype as any)._threadId = 0; }

    declare private _message: MessageData;

    constructor() {
    }

    public get groupId(): number {
        return this._groupId;
    }

    public get threadId(): number {
        return this._threadId;
    }

    public get message(): MessageData {
        return this._message;
    }

    public flush(): boolean {
        this._groupId = -1;
        this._threadId = -1;
        this._message = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._groupId = param1.readInteger();
        this._threadId = param1.readInteger();
        this._message = MessageData.readFromMessage(param1);
        return true;
    }
}
