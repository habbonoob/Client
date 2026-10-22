import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { NftCollection } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftCollection';

export class NftCollectionsMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::NftCollectionsMessageEventParser'); }

    constructor() {
    }

    declare private _nftCollections: any[];

    public get nftCollections(): any[] {
        return this._nftCollections;
    }

    public flush(): boolean {
        this._nftCollections = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._nftCollections = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._nftCollections.push(new NftCollection(param1));
            _loc3_++;
        }
        return true;
    }
}
