import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { IssueCloseNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/IssueCloseNotificationMessageParser';

export class IssueCloseNotificationMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::IssueCloseNotificationMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, IssueCloseNotificationMessageParser);
    }

    public getParser(): IssueCloseNotificationMessageParser {
        return this._parser instanceof IssueCloseNotificationMessageParser ? this._parser : null;
    }
}
