import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { NewUserExperienceGiftOptions } from '@/com/sulake/habbo/communication/messages/incoming/nux/NewUserExperienceGiftOptions';

export class NewUserExperienceGiftOfferParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.nux::NewUserExperienceGiftOfferParser'); }

    constructor() {
    }

    declare private _giftOptions: NewUserExperienceGiftOptions[];

    public get giftOptions(): NewUserExperienceGiftOptions[] {
        return this._giftOptions;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        this._giftOptions = [];
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._giftOptions.push(new NewUserExperienceGiftOptions(param1));
            _loc3_++;
        }
        return true;
    }
}
