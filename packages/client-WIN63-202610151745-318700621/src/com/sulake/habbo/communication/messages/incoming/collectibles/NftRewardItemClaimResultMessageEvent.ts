import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NftRewardItemClaimResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftRewardItemClaimResultMessageEventParser';

export class NftRewardItemClaimResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::NftRewardItemClaimResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NftRewardItemClaimResultMessageEventParser);
    }

    public getParser(): NftRewardItemClaimResultMessageEventParser {
        return this._parser instanceof NftRewardItemClaimResultMessageEventParser ? this._parser : null;
    }
}
