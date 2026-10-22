import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NftTransferAssetsResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftTransferAssetsResultMessageEventParser';

export class NftTransferAssetsResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::NftTransferAssetsResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NftTransferAssetsResultMessageEventParser);
    }

    public getParser(): NftTransferAssetsResultMessageEventParser {
        return this._parser instanceof NftTransferAssetsResultMessageEventParser ? this._parser : null;
    }
}
