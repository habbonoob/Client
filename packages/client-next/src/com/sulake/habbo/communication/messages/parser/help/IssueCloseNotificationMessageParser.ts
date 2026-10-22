import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class IssueCloseNotificationMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::IssueCloseNotificationMessageParser'); }

    declare private _closeReason: number;
    static { (this.prototype as any)._closeReason = 0; }

    declare private _messageText: string;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._closeReason = param1.readInteger();
        this._messageText = param1.readString();
        return true;
    }

    public get closeReason(): number {
        return this._closeReason;
    }

    public get messageText(): string {
        return this._messageText;
    }
}
