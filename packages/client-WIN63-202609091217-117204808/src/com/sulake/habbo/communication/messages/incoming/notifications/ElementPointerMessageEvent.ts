import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ElementPointerMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/ElementPointerMessageParser';

export class ElementPointerMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::ElementPointerMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ElementPointerMessageParser);
    }

    public getParser(): ElementPointerMessageParser {
        return this._parser instanceof ElementPointerMessageParser ? this._parser : null;
    }
}
