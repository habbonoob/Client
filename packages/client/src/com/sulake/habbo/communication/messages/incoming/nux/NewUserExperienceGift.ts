import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { NewUserExperienceGiftProduct } from '@/com/sulake/habbo/communication/messages/incoming/nux/NewUserExperienceGiftProduct';

export class NewUserExperienceGift {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.nux::NewUserExperienceGift'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._thumbnailUrl = param1.readString();
        if (this._thumbnailUrl == "") {
            this._thumbnailUrl = null;
        }
        this._productOfferList = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._productOfferList.push(new NewUserExperienceGiftProduct(param1));
            _loc3_++;
        }
    }

    declare private _productOfferList: NewUserExperienceGiftProduct[];

    declare private _thumbnailUrl: string;

    public get productOfferList(): NewUserExperienceGiftProduct[] {
        return this._productOfferList;
    }

    public get thumbnailUrl(): string {
        return this._thumbnailUrl;
    }
}
