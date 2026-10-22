import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { NftClaim } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftClaim';

export class NftClaimsMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::NftClaimsMessageEventParser'); }

    declare private _nftClaims: any[];

    constructor() {
    }

    public flush(): boolean {
        this._nftClaims = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._nftClaims = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._nftClaims.push(new NftClaim(param1));
            _loc3_++;
        }
        return true;
    }

    public get nftClaims(): any[] {
        return this._nftClaims;
    }
}
