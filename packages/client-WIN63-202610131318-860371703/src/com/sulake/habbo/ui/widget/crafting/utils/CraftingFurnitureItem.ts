import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';

export class CraftingFurnitureItem extends EventDispatcher {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting.utils::CraftingFurnitureItem'); }

    declare private _recipeCode: string;

    declare private _productCode: string;

    declare private _furnitureData: IFurnitureData;

    declare private _inventoryIds: number[];

    declare private _SafeStr_4817: number[];

    constructor(param1: string, param2: string, param3: IFurnitureData) {
        super();
        this._recipeCode = param1;
        this._productCode = param2;
        this._furnitureData = param3;
        this._inventoryIds = new Array<number>(0).fill(0);
        this._SafeStr_4817 = new Array<number>(0).fill(0);
    }

    public get recipeCode(): string {
        return this._recipeCode;
    }

    public get furnitureData(): IFurnitureData {
        return this._furnitureData;
    }

    public get productCode(): string {
        return this._productCode;
    }

    public get typeId(): number {
        return this._furnitureData ? this._furnitureData.id : -1;
    }

    public get countInInventory(): number {
        return (this._inventoryIds ? this._inventoryIds.length : 0) | 0;
    }

    public set inventoryIds(param1: number[]) {
        this._inventoryIds = param1;
    }

    public getItemToMixer(): number {
        if (this.countInInventory == 0) {
            return 0;
        }
        let _loc1_: number = this._inventoryIds.shift() | 0;
        this._SafeStr_4817.push(_loc1_);
        return _loc1_;
    }

    public returnItemToInventory(param1: number): void {
        this._inventoryIds.push(param1);
        this._SafeStr_4817.splice(this._SafeStr_4817.indexOf(param1), 1);
    }
}
