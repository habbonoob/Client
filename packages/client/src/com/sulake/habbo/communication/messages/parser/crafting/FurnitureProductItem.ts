import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class FurnitureProductItem {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.crafting::FurnitureProductItem'); }

    constructor(param1: IMessageDataWrapper) {
        this._recipeCode = param1.readString();
        this._productCode = param1.readString();
        this._furnitureClassName = param1.readString();
    }

    declare private _furnitureClassName: string;

    declare private _recipeCode: string;

    public get recipeCode(): string {
        return this._recipeCode;
    }

    declare private _productCode: string;

    public get productCode(): string {
        return this._productCode;
    }

    public get furnitureClassName(): string {
        return this._furnitureClassName;
    }
}
