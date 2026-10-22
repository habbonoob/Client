import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { IssuePickFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssuePickFailedMessageParser';

export class IssuePickFailedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::IssuePickFailedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, IssuePickFailedMessageParser);
    }

    public getParser(): IssuePickFailedMessageParser {
        return this._parser instanceof IssuePickFailedMessageParser ? this._parser : null;
    }
}
