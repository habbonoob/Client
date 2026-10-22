import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UnseenItemsParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/UnseenItemsParser';

export class UnseenItemsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::UnseenItemsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UnseenItemsParser);
    }

    public getParser(): UnseenItemsParser {
        return this._parser instanceof UnseenItemsParser ? this._parser : null;
    }
}
