import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuideSessionMessageMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::GuideSessionMessageMessageParser'); }

    constructor() {
    }

    declare private _senderId: number;
    static { (this.prototype as any)._senderId = 0; }

    declare private _chatMessage: string;

    public get chatMessage(): string {
        return this._chatMessage;
    }

    public get senderId(): number {
        return this._senderId;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._chatMessage = param1.readString();
        this._senderId = param1.readInteger();
        return true;
    }
}
