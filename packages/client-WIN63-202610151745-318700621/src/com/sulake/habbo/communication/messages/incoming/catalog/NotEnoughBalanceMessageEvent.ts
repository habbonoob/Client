import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NotEnoughBalanceMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/NotEnoughBalanceMessageParser';

export class NotEnoughBalanceMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::NotEnoughBalanceMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NotEnoughBalanceMessageParser);
    }

    public getParser(): NotEnoughBalanceMessageParser {
        return this._parser instanceof NotEnoughBalanceMessageParser ? this._parser : null;
    }
}
