import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CollectibleWalletAddressesMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::CollectibleWalletAddressesMessageEventParser'); }

    declare private _stardustWalletAddress: string;

    declare private _walletAddresses: any[];

    constructor() {
    }

    public flush(): boolean {
        this._stardustWalletAddress = null;
        this._walletAddresses = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._stardustWalletAddress = param1.readString();
        this._walletAddresses = [];
        if (this._stardustWalletAddress != "") {
            this._walletAddresses.push(this._stardustWalletAddress);
        }
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._walletAddresses.push(param1.readString());
            _loc3_++;
        }
        return true;
    }

    public get walletAddresses(): any[] {
        return this._walletAddresses;
    }

    public get stardustWalletAddress(): string {
        return this._stardustWalletAddress;
    }
}
