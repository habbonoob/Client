import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NftBonusItemClaimResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftBonusItemClaimResultMessageEventParser';

export class NftBonusItemClaimResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::NftBonusItemClaimResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NftBonusItemClaimResultMessageEventParser);
    }

    public getParser(): NftBonusItemClaimResultMessageEventParser {
        return this._parser instanceof NftBonusItemClaimResultMessageEventParser ? this._parser : null;
    }
}
