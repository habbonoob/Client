import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class NftTransferFeeMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::NftTransferFeeMessageEventParser'); }

    private _transferFee: number = 0;

    constructor() {
    }

    public flush(): boolean {
        this._transferFee = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._transferFee = param1.readInteger();
        return true;
    }

    public get transferFee(): number {
        return this._transferFee;
    }
}
