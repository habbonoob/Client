import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CollectibleMintTokenOffersMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleMintTokenOffersMessageEventParser';

export class CollectibleMintTokenOffersMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::CollectibleMintTokenOffersMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CollectibleMintTokenOffersMessageEventParser);
    }

    public getParser(): CollectibleMintTokenOffersMessageEventParser {
        return this._parser instanceof CollectibleMintTokenOffersMessageEventParser ? this._parser : null;
    }
}
