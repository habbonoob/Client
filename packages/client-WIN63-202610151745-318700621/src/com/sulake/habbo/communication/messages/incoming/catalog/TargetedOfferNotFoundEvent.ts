import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TargetedOfferNotFoundParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/TargetedOfferNotFoundParser';

export class TargetedOfferNotFoundEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::TargetedOfferNotFoundEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TargetedOfferNotFoundParser);
    }

    public getParser(): TargetedOfferNotFoundParser {
        return this._parser instanceof TargetedOfferNotFoundParser ? this._parser : null;
    }
}
