import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { NftWardrobeItem } from '@/com/sulake/habbo/communication/messages/parser/nft/NftWardrobeItem';

export class UserNftWardrobeMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.nft::UserNftWardrobeMessageParser'); }

    declare private _nftAvatars: any[];

    constructor() {
    }

    public flush(): boolean {
        this._nftAvatars = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._nftAvatars.push(new NftWardrobeItem(param1));
            _loc3_++;
        }
        return true;
    }

    public get nftAvatars(): any[] {
        return this._nftAvatars;
    }
}
