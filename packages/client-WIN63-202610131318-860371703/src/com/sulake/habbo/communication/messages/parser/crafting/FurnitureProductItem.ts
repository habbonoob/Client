import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class FurnitureProductItem {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.crafting::FurnitureProductItem'); }

    declare private _recipeCode: string;

    declare private _productCode: string;

    declare private _furnitureClassName: string;

    constructor(param1: IMessageDataWrapper) {
        this._recipeCode = param1.readString();
        this._productCode = param1.readString();
        this._furnitureClassName = param1.readString();
    }

    public get recipeCode(): string {
        return this._recipeCode;
    }

    public get productCode(): string {
        return this._productCode;
    }

    public get furnitureClassName(): string {
        return this._furnitureClassName;
    }
}
