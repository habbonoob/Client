import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CompetitionVotingInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/competition/CompetitionVotingInfoMessageParser';

export class CompetitionVotingInfoMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.competition::CompetitionVotingInfoMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CompetitionVotingInfoMessageParser);
    }

    public getParser(): CompetitionVotingInfoMessageParser {
        return this._parser instanceof CompetitionVotingInfoMessageParser ? this._parser : null;
    }
}
