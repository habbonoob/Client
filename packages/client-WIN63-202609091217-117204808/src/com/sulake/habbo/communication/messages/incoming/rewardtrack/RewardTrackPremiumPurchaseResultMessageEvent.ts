import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RewardTrackPremiumPurchaseResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/RewardTrackPremiumPurchaseResultMessageParser';

export class RewardTrackPremiumPurchaseResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.rewardtrack::RewardTrackPremiumPurchaseResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RewardTrackPremiumPurchaseResultMessageParser);
    }

    public getParser(): RewardTrackPremiumPurchaseResultMessageParser {
        return this._parser instanceof RewardTrackPremiumPurchaseResultMessageParser ? this._parser : null;
    }
}
