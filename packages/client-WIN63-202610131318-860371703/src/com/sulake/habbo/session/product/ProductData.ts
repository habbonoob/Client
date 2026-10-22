import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';

export class ProductData implements IProductData {
    static { registerClassName(this, 'com.sulake.habbo.session.product::ProductData'); }

    declare private _type: string;

    declare private _name: string;

    private _description: string = "";

    constructor(param1: string, param2: string) {
        this._type = param1;
        this._name = param2;
    }

    public get type(): string {
        return this._type;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }
}
