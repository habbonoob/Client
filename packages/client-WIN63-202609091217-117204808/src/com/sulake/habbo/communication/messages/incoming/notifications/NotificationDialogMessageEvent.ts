import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NotificationDialogMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/NotificationDialogMessageParser';

export class NotificationDialogMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::NotificationDialogMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NotificationDialogMessageParser);
    }

    public getParser(): NotificationDialogMessageParser {
        return this._parser instanceof NotificationDialogMessageParser ? this._parser : null;
    }
}
