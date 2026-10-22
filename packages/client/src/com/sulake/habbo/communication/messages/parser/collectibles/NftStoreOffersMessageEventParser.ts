import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { NftStoreOffer } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftStoreOffer';

export class NftStoreOffersMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::NftStoreOffersMessageEventParser'); }

    constructor() {
    }

    declare private _nftStoreOffers: any[];

    public get nftStoreOffers(): any[] {
        return this._nftStoreOffers;
    }

    public flush(): boolean {
        this._nftStoreOffers = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._nftStoreOffers = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._nftStoreOffers.push(new NftStoreOffer(param1));
            _loc3_++;
        }
        return true;
    }
}
