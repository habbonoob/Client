import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';

export class ProductDisplayWrapper implements IProductDisplayInfo {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::ProductDisplayWrapper'); }

    declare private _product: IProduct;

    constructor(param1: IProduct) {
        this._product = param1;
    }

    public static isSupported(param1: string): boolean {
        return param1 == "chat_style" || param1 == "r";
    }

    public get productTypeId(): number {
        switch (this._product.productType) {
            case "chat_style":
                return 9;
            case "r":
                return 6;
            default:
                return 0;
        }
    }

    public get itemTypeId(): string {
        return this._product.extraParam;
    }

    public get petFigureString(): string {
        return "";
    }

    public get botFigureString(): string {
        return this._product.extraParam;
    }

    public get figureSetIds(): number[] {
        return undefined;
    }

    public get extraData(): string {
        return "";
    }
}
