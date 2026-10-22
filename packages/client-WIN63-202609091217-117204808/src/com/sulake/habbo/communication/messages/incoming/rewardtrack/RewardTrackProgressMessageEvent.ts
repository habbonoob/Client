import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RewardTrackProgressMessageParser } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/RewardTrackProgressMessageParser';

export class RewardTrackProgressMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.rewardtrack::RewardTrackProgressMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RewardTrackProgressMessageParser);
    }

    public getParser(): RewardTrackProgressMessageParser {
        return this._parser instanceof RewardTrackProgressMessageParser ? this._parser : null;
    }
}
