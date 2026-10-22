import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CollectibleMintableItemResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleMintableItemResultMessageEventParser';

export class CollectibleMintableItemResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::CollectibleMintableItemResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CollectibleMintableItemResultMessageEventParser);
    }

    public getParser(): CollectibleMintableItemResultMessageEventParser {
        return this._parser instanceof CollectibleMintableItemResultMessageEventParser ? this._parser : null;
    }
}
