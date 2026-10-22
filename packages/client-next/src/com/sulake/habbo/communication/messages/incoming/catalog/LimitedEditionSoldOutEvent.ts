import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { LimitedEditionSoldOutParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/LimitedEditionSoldOutParser';

export class LimitedEditionSoldOutEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::LimitedEditionSoldOutEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, LimitedEditionSoldOutParser);
    }

    public getParser(): LimitedEditionSoldOutParser {
        return this._parser instanceof LimitedEditionSoldOutParser ? this._parser : null;
    }
}
