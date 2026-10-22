import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { VoucherRedeemErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/VoucherRedeemErrorMessageParser';

export class VoucherRedeemErrorMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::VoucherRedeemErrorMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, VoucherRedeemErrorMessageParser);
    }

    public get errorCode(): string {
        return (this._parser instanceof VoucherRedeemErrorMessageParser ? this._parser : null).errorCode;
    }
}
