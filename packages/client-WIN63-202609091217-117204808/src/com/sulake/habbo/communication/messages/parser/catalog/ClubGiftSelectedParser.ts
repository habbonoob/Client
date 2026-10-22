import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CatalogPageMessageProductData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPageMessageProductData';

export class ClubGiftSelectedParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::ClubGiftSelectedParser'); }

    declare private _productCode: string;

    declare private _products: any[];

    constructor() {
    }

    public flush(): boolean {
        this._products = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._products = [];
        this._productCode = param1.readString();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._products.push(new CatalogPageMessageProductData(param1));
            _loc3_++;
        }
        return true;
    }

    public get productCode(): string {
        return this._productCode;
    }

    public get products(): any[] {
        return this._products;
    }
}
