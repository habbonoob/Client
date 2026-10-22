import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class VoucherRedeemOkMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::VoucherRedeemOkMessageParser'); }

    constructor() {
    }

    private _productDescription: string = "";
    private _productName: string = "";

    public get productName(): string {
        return this._productName;
    }

    public get productDescription(): string {
        return this._productDescription;
    }

    public flush(): boolean {
        this._productDescription = "";
        this._productName = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._productDescription = param1.readString();
        this._productName = param1.readString();
        return true;
    }
}
