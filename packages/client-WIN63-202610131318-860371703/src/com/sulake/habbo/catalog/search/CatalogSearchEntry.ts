import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';

export class CatalogSearchEntry {
    static { registerClassName(this, 'com.sulake.habbo.catalog.search::CatalogSearchEntry'); }

    declare private _furniData: IFurnitureData;

    declare private _searchTerms: string[];

    declare private _productCode: string;

    constructor(param1: IFurnitureData, param2: string[], param3: string) {
        this._furniData = param1;
        this._searchTerms = param2;
        this._productCode = param3;
    }

    public get furniData(): IFurnitureData {
        return this._furniData;
    }

    public get searchTerms(): string[] {
        return this._searchTerms;
    }

    public get productCode(): string {
        return this._productCode;
    }
}
