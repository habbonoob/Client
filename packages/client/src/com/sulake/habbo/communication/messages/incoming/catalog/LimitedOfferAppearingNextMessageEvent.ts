import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { LimitedOfferAppearingNextMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/LimitedOfferAppearingNextMessageParser';

export class LimitedOfferAppearingNextMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::LimitedOfferAppearingNextMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, LimitedOfferAppearingNextMessageParser);
    }

    public getParser(): LimitedOfferAppearingNextMessageParser {
        return this._parser instanceof LimitedOfferAppearingNextMessageParser ? this._parser : null;
    }
}
