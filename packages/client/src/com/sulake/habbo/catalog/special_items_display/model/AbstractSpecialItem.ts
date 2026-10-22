import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SpecialItem } from '@/com/sulake/habbo/catalog/special_items_display/model/SpecialItem';
import type { SpecialItemsController } from '@/com/sulake/habbo/catalog/special_items_display/SpecialItemsController';

export class AbstractSpecialItem implements SpecialItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.special_items_display.model::AbstractSpecialItem'); }

    constructor(param1: number, param2: string, param3: string, param4: SpecialItemsController) {
        this._index = param1;
        this._setKey = param2;
        this._itemKey = param3;
        this._name = param4.localizationManager.getLocalization("special_items." + param2 + ".body." + param3 + ".title");
        this._desc = param4.localizationManager.getLocalization("special_items." + param2 + ".body." + param3 + ".desc");
    }

    declare private _setKey: string;

    declare private _desc: string;

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    public get index(): number {
        return this._index;
    }

    declare private _itemKey: string;

    public get itemKey(): string {
        return this._itemKey;
    }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._desc;
    }

    public get productTypeId(): number {
        return -1;
    }

    public get itemTypeId(): string {
        return "";
    }

    public get petFigureString(): string {
        return "";
    }

    public get figureSetIds(): number[] {
        return null;
    }

    public get isValid(): boolean {
        return false;
    }

    public get extraData(): string {
        return "";
    }
}
