import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NftClaimsMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftClaimsMessageEventParser';

export class NftClaimsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::NftClaimsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NftClaimsMessageEventParser);
    }

    public getParser(): NftClaimsMessageEventParser {
        return this._parser instanceof NftClaimsMessageEventParser ? this._parser : null;
    }
}
