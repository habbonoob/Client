import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CollectibleMintTokenCountMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleMintTokenCountMessageEventParser';

export class CollectibleMintTokenCountMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::CollectibleMintTokenCountMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CollectibleMintTokenCountMessageEventParser);
    }

    public getParser(): CollectibleMintTokenCountMessageEventParser {
        return this._parser instanceof CollectibleMintTokenCountMessageEventParser ? this._parser : null;
    }
}
