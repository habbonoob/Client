import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class NftRewardItemClaimResultMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::NftRewardItemClaimResultMessageEventParser'); }

    declare private _collectionId: string;

    declare private _walletAddress: string;

    declare private _success: boolean;
    static { (this.prototype as any)._success = false; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._collectionId = param1.readString();
        this._walletAddress = param1.readString();
        this._success = param1.readBoolean();
        return true;
    }

    public get collectionId(): string {
        return this._collectionId;
    }

    public get walletAddress(): string {
        return this._walletAddress;
    }

    public get success(): boolean {
        return this._success;
    }
}
