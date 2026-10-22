import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';

export class RecycleRewardDisplayWrapper implements IProductDisplayInfo {
    static { registerClassName(this, 'com.sulake.habbo.catalog.recycler::RecycleRewardDisplayWrapper'); }

    declare private _productType: string;

    declare private _productClassId: number;
    static { (this.prototype as any)._productClassId = 0; }

    constructor(param1: string, param2: number) {
        this._productType = param1;
        this._productClassId = param2;
    }

    public get productTypeId(): number {
        switch (this._productType) {
            case "chat_style":
                return 9;
            case "i":
                return 0;
            case "s":
                return 1;
            default:
                return -1;
        }
    }

    public get itemTypeId(): string {
        return String(this._productClassId);
    }

    public get petFigureString(): string {
        return "";
    }

    public get botFigureString(): string {
        return "";
    }

    public get figureSetIds(): number[] {
        return undefined;
    }

    public get extraData(): string {
        return "";
    }
}
