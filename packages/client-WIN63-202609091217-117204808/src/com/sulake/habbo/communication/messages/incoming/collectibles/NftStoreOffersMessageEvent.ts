import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NftStoreOffersMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftStoreOffersMessageEventParser';

export class NftStoreOffersMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::NftStoreOffersMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NftStoreOffersMessageEventParser);
    }

    public getParser(): NftStoreOffersMessageEventParser {
        return this._parser instanceof NftStoreOffersMessageEventParser ? this._parser : null;
    }
}
