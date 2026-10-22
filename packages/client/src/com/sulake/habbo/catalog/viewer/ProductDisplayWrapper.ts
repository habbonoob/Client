import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';

export class ProductDisplayWrapper implements IProductDisplayInfo {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::ProductDisplayWrapper'); }

    public static isSupported(param1: string): boolean {
        return param1 == "chat_style";
    }

    constructor(param1: IProduct) {
        this._product = param1;
    }

    declare private _product: IProduct;

    public get productTypeId(): number {
        let _loc1_: any = this._product.productType;
        if ("chat_style" !== _loc1_) {
            return 0;
        }
        return 9;
    }

    public get itemTypeId(): string {
        return this._product.extraParam;
    }

    public get petFigureString(): string {
        return "";
    }

    public get figureSetIds(): number[] {
        return undefined;
    }

    public get extraData(): string {
        return "";
    }
}
