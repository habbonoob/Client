import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { VoucherRedeemOkMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/VoucherRedeemOkMessageParser';

export class VoucherRedeemOkMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::VoucherRedeemOkMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, VoucherRedeemOkMessageParser);
    }

    public get productName(): string {
        return (this._parser instanceof VoucherRedeemOkMessageParser ? this._parser : null).productName;
    }

    public get productDescription(): string {
        return (this._parser instanceof VoucherRedeemOkMessageParser ? this._parser : null).productDescription;
    }
}
