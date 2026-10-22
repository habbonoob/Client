import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class NftTransferAssetsResultMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::NftTransferAssetsResultMessageEventParser'); }

    constructor() {
    }

    declare private _resultCode: any;

    public get success(): boolean {
        return this._resultCode == 0;
    }

    public get resultCode(): any {
        return this._resultCode;
    }

    public flush(): boolean {
        this._resultCode = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._resultCode = param1.readShort();
        return true;
    }
}
