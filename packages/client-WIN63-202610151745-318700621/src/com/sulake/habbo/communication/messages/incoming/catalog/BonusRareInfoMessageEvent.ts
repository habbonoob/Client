import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BonusRareInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/BonusRareInfoMessageParser';

export class BonusRareInfoMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::BonusRareInfoMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BonusRareInfoMessageParser);
    }

    public getParser(): BonusRareInfoMessageParser {
        return this._parser instanceof BonusRareInfoMessageParser ? this._parser : null;
    }
}
