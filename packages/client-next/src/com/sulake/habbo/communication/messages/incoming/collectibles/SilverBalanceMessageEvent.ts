import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { SilverBalanceMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/SilverBalanceMessageEventParser';

export class SilverBalanceMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::SilverBalanceMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, SilverBalanceMessageEventParser);
    }

    public getParser(): SilverBalanceMessageEventParser {
        return this._parser instanceof SilverBalanceMessageEventParser ? this._parser : null;
    }
}
