import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RedeemNftLootBoxStateMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/RedeemNftLootBoxStateMessageEventParser';

export class RedeemNftLootBoxStateMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::RedeemNftLootBoxStateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RedeemNftLootBoxStateMessageEventParser);
    }

    public getParser(): RedeemNftLootBoxStateMessageEventParser {
        return this._parser instanceof RedeemNftLootBoxStateMessageEventParser ? this._parser : null;
    }
}
