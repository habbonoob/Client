import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GiftReceiverNotFoundParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/GiftReceiverNotFoundParser';

export class GiftReceiverNotFoundEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::GiftReceiverNotFoundEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GiftReceiverNotFoundParser);
    }

    public getParser(): GiftReceiverNotFoundParser {
        return this._parser instanceof GiftReceiverNotFoundParser ? this._parser : null;
    }
}
