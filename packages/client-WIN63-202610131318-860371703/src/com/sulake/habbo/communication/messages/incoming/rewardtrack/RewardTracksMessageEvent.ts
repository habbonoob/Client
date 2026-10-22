import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RewardTracksMessageParser } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/RewardTracksMessageParser';

export class RewardTracksMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.rewardtrack::RewardTracksMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RewardTracksMessageParser);
    }

    public getParser(): RewardTracksMessageParser {
        return this._parser instanceof RewardTracksMessageParser ? this._parser : null;
    }
}
