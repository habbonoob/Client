import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NftCollectionsMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftCollectionsMessageEventParser';

export class NftCollectionsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::NftCollectionsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NftCollectionsMessageEventParser);
    }

    public getParser(): NftCollectionsMessageEventParser {
        return this._parser instanceof NftCollectionsMessageEventParser ? this._parser : null;
    }
}
