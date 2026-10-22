import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CommunityVoteReceivedParser } from '@/com/sulake/habbo/communication/messages/parser/landingview/votes/CommunityVoteReceivedParser';

export class CommunityVoteReceivedEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.landingview.votes::CommunityVoteReceivedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CommunityVoteReceivedParser);
    }

    public getParser(): CommunityVoteReceivedParser {
        return this._parser instanceof CommunityVoteReceivedParser ? this._parser : null;
    }
}
