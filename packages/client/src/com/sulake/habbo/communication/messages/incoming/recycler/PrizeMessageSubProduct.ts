import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class PrizeMessageSubProduct {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.recycler::PrizeMessageSubProduct'); }

    constructor(param1: IMessageDataWrapper) {
        this._productItemType = param1.readString();
        this._productItemTypeId = param1.readInteger();
    }

    declare private _productItemType: string;

    declare private _productItemTypeId: number;
    static { (this.prototype as any)._productItemTypeId = 0; }

    public get productItemType(): string {
        return this._productItemType;
    }

    public get productItemTypeId(): number {
        return this._productItemTypeId;
    }
}
