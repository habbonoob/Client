import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MOTDNotificationParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/MOTDNotificationParser';

export class MOTDNotificationEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::MOTDNotificationEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MOTDNotificationParser);
    }

    public getParser(): MOTDNotificationParser {
        return this._parser instanceof MOTDNotificationParser ? this._parser : null;
    }
}
