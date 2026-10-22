import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class NewUserExperienceGiftProduct {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.nux::NewUserExperienceGiftProduct'); }

    declare private _productCode: string;

    declare private _localizationKey: string;

    constructor(param1: IMessageDataWrapper) {
        this._productCode = param1.readString();
        this._localizationKey = param1.readString();
        if (this._localizationKey == "") {
            this._localizationKey = null;
        }
    }

    public get productCode(): string {
        return this._productCode;
    }

    public get localizationKey(): string {
        return this._localizationKey;
    }
}
