import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TargetedOfferParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/TargetedOfferParser';

export class TargetedOfferEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::TargetedOfferEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TargetedOfferParser);
    }

    public getParser(): TargetedOfferParser {
        return this._parser instanceof TargetedOfferParser ? this._parser : null;
    }
}
