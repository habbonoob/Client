import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PerkAllowancesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/perk/PerkAllowancesMessageParser';

export class PerkAllowancesMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.perk::PerkAllowancesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PerkAllowancesMessageParser);
    }

    public getParser(): PerkAllowancesMessageParser {
        return this._parser instanceof PerkAllowancesMessageParser ? this._parser : null;
    }
}
