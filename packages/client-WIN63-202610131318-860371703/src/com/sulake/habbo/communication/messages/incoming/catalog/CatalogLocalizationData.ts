import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class CatalogLocalizationData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::CatalogLocalizationData'); }

    declare private _images: any[];

    declare private _texts: any[];

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        let _loc5_: number = 0;
        this._images = [];
        this._texts = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._images.push(param1.readString());
            _loc3_++;
        }
        let _loc4_: number = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            this._texts.push(param1.readString());
            _loc5_++;
        }
    }

    public get images(): any[] {
        return this._images;
    }

    public get texts(): any[] {
        return this._texts;
    }
}
