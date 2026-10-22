import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GotMysteryBoxPrizeMessageParser } from '@/com/sulake/habbo/communication/messages/parser/mysterybox/GotMysteryBoxPrizeMessageParser';

export class GotMysteryBoxPrizeMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.mysterybox::GotMysteryBoxPrizeMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GotMysteryBoxPrizeMessageParser);
    }

    public getParser(): GotMysteryBoxPrizeMessageParser {
        return this._parser instanceof GotMysteryBoxPrizeMessageParser ? this._parser : null;
    }
}
