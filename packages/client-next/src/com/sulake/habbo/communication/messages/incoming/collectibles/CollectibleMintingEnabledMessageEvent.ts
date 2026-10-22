import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CollectibleMintingEnabledMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleMintingEnabledMessageEventParser';

export class CollectibleMintingEnabledMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::CollectibleMintingEnabledMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CollectibleMintingEnabledMessageEventParser);
    }

    public getParser(): CollectibleMintingEnabledMessageEventParser {
        return this._parser instanceof CollectibleMintingEnabledMessageEventParser ? this._parser : null;
    }
}
