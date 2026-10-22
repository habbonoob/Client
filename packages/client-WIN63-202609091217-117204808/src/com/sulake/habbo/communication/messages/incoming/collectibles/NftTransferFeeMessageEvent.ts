import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NftTransferFeeMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftTransferFeeMessageEventParser';

export class NftTransferFeeMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles::NftTransferFeeMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NftTransferFeeMessageEventParser);
    }

    public getParser(): NftTransferFeeMessageEventParser {
        return this._parser instanceof NftTransferFeeMessageEventParser ? this._parser : null;
    }
}
