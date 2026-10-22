import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { OfferRewardDeliveredMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/OfferRewardDeliveredMessageParser';

export class OfferRewardDeliveredMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::OfferRewardDeliveredMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, OfferRewardDeliveredMessageParser);
    }

    public getParser(): OfferRewardDeliveredMessageParser {
        return this._parser instanceof OfferRewardDeliveredMessageParser ? this._parser : null;
    }
}
