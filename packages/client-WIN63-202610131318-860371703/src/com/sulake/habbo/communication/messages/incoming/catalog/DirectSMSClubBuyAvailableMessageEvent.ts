import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { DirectSMSClubBuyAvailableMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/DirectSMSClubBuyAvailableMessageParser';

export class DirectSMSClubBuyAvailableMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::DirectSMSClubBuyAvailableMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, DirectSMSClubBuyAvailableMessageParser);
    }

    public getParser(): DirectSMSClubBuyAvailableMessageParser {
        return this._parser instanceof DirectSMSClubBuyAvailableMessageParser ? this._parser : null;
    }
}
