import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { MintTokenOffer } from '@/com/sulake/habbo/communication/messages/parser/collectibles/MintTokenOffer';

export class CollectibleMintTokenOffersMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::CollectibleMintTokenOffersMessageEventParser'); }

    declare private _tokenOffers: MintTokenOffer[];

    constructor() {
    }

    public flush(): boolean {
        this._tokenOffers = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc2_: MintTokenOffer = null;
        this._tokenOffers = [];
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = new MintTokenOffer(param1);
            this._tokenOffers.push(_loc2_);
            _loc4_++;
        }
        return true;
    }

    public get tokenOffers(): MintTokenOffer[] {
        return this._tokenOffers;
    }
}
