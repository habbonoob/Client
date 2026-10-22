import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RewardTrackClaimResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/RewardTrackClaimResultMessageParser';

export class RewardTrackClaimResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.rewardtrack::RewardTrackClaimResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RewardTrackClaimResultMessageParser);
    }

    public getParser(): RewardTrackClaimResultMessageParser {
        return this._parser instanceof RewardTrackClaimResultMessageParser ? this._parser : null;
    }
}
