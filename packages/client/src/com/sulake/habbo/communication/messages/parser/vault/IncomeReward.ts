import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class IncomeReward {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.vault::IncomeReward'); }

    constructor(param1: number, param2: number, param3: number, param4: string) {
        this._rewardCategory = param1;
        this._rewardType = param2;
        this._amount = param3;
        this._productCode = param4;
    }

    declare private _rewardCategory: number;
    static { (this.prototype as any)._rewardCategory = 0; }

    declare private _rewardType: number;
    static { (this.prototype as any)._rewardType = 0; }

    declare private _amount: number;
    static { (this.prototype as any)._amount = 0; }

    public get amount(): number {
        return this._amount;
    }

    declare private _productCode: string;

    public get productCode(): string {
        return this._productCode;
    }

    public get rewardCategory(): number {
        return this._rewardCategory;
    }

    public get rewardType(): number {
        return this._rewardType;
    }
}
