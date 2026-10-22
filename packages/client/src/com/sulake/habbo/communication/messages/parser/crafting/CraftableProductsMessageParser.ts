import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { FurnitureProductItem } from '@/com/sulake/habbo/communication/messages/parser/crafting/FurnitureProductItem';

export class CraftableProductsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.crafting::CraftableProductsMessageParser'); }

    constructor() {
    }

    private _recipeProductItems: FurnitureProductItem[] = new Array<FurnitureProductItem>(0).fill(null);
    private _usableInventoryFurniClasses: string[] = new Array<string>(0).fill(null);

    public get recipeProductItems(): FurnitureProductItem[] {
        return this._recipeProductItems;
    }

    public get usableInventoryFurniClasses(): string[] {
        return this._usableInventoryFurniClasses;
    }

    public flush(): boolean {
        this._recipeProductItems = new Array<FurnitureProductItem>(0).fill(null);
        this._usableInventoryFurniClasses = new Array<string>(0).fill(null);
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._recipeProductItems.push(new FurnitureProductItem(param1));
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._usableInventoryFurniClasses.push(param1.readString());
            _loc3_++;
        }
        return true;
    }

    public hasData(): boolean {
        return this._recipeProductItems.length > 0 || this._usableInventoryFurniClasses.length > 0;
    }
}
