import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NftCollectionsScoreMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftCollectionsScoreMessageEventParser';

export class NftCollectionsScoreMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::NftCollectionsScoreMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NftCollectionsScoreMessageEventParser);
    }

    public getParser(): NftCollectionsScoreMessageEventParser {
        return this._parser instanceof NftCollectionsScoreMessageEventParser ? this._parser : null;
    }
}
