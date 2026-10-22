import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { IssueInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueInfoMessageParser';

export class IssueInfoMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::IssueInfoMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, IssueInfoMessageParser);
    }

    public getParser(): IssueInfoMessageParser {
        return this._parser instanceof IssueInfoMessageParser ? this._parser : null;
    }
}
