import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CollectableMintableItemTypesMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectableMintableItemTypesMessageEventParser';

export class CollectableMintableItemTypesMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::CollectableMintableItemTypesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CollectableMintableItemTypesMessageEventParser);
    }

    public getParser(): CollectableMintableItemTypesMessageEventParser {
        return this._parser instanceof CollectableMintableItemTypesMessageEventParser ? this._parser : null;
    }
}
