import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NftClaimResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftClaimResultMessageEventParser';

export class NftClaimResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::NftClaimResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NftClaimResultMessageEventParser);
    }

    public getParser(): NftClaimResultMessageEventParser {
        return this._parser instanceof NftClaimResultMessageEventParser ? this._parser : null;
    }
}
