import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { PrizeMessageSubProduct } from '@/com/sulake/habbo/communication/messages/incoming/recycler/PrizeMessageSubProduct';

export class PrizeMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.recycler::PrizeMessageData'); }

    private _SafeStr_5841: number = 1;

    declare private _productCode: string;

    declare private _subProducts: any[];

    declare private _productItemType: string;

    declare private _productItemTypeId: number;
    static { (this.prototype as any)._productItemTypeId = 0; }

    constructor(param1: IMessageDataWrapper) {
        let _loc2_: number = 0;
        this._subProducts = [];
        this._productCode = param1.readString();
        this._SafeStr_5841 = param1.readInteger();
        if (!this.isDeal) {
            this._productItemType = param1.readString();
            this._productItemTypeId = param1.readInteger();
        } else {
            while (_loc2_ < this._SafeStr_5841) {
                this._subProducts.push(new PrizeMessageSubProduct(param1));
                _loc2_++;
            }
        }
    }

    public get productItemType(): string {
        return this._productItemType;
    }

    public get productItemTypeId(): number {
        return this._productItemTypeId;
    }

    public get isDeal(): boolean {
        return this._SafeStr_5841 > 1;
    }

    public get subProducts(): any[] {
        return this._subProducts;
    }

    public get productCode(): string {
        return this._productCode;
    }
}
