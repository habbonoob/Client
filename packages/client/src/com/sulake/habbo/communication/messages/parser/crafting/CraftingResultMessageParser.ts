import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { FurnitureProductItem } from '@/com/sulake/habbo/communication/messages/parser/crafting/FurnitureProductItem';

export class CraftingResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.crafting::CraftingResultMessageParser'); }

    constructor() {
    }

    declare private _success: boolean;
    static { (this.prototype as any)._success = false; }

    declare private _productData: FurnitureProductItem;

    public get success(): boolean {
        return this._success;
    }

    public get productData(): FurnitureProductItem {
        return this._productData;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._success = param1.readBoolean();
        if (this._success) {
            this._productData = new FurnitureProductItem(param1);
        }
        return true;
    }

    public flush(): boolean {
        this._success = false;
        return true;
    }
}
