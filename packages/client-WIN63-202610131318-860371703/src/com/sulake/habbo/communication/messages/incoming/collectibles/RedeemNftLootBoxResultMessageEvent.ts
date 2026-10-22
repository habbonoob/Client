import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RedeemNftLootBoxResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/RedeemNftLootBoxResultMessageEventParser';

export class RedeemNftLootBoxResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::RedeemNftLootBoxResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RedeemNftLootBoxResultMessageEventParser);
    }

    public getParser(): RedeemNftLootBoxResultMessageEventParser {
        return this._parser instanceof RedeemNftLootBoxResultMessageEventParser ? this._parser : null;
    }
}
