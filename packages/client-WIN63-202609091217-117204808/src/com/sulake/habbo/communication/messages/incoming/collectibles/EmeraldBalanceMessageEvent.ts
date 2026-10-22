import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { EmeraldBalanceMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/EmeraldBalanceMessageEventParser';

export class EmeraldBalanceMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::EmeraldBalanceMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, EmeraldBalanceMessageEventParser);
    }

    public getParser(): EmeraldBalanceMessageEventParser {
        return this._parser instanceof EmeraldBalanceMessageEventParser ? this._parser : null;
    }
}
