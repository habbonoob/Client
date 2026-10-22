import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class OfferReward {
    static { registerClassName(this, 'com.sulake.habbo.catalog.offers::OfferReward'); }

    declare private _name: string;

    declare private _contentType: string;

    declare private _classId: number;
    static { (this.prototype as any)._classId = 0; }

    constructor(param1: string, param2: string, param3: number) {
        this._name = param1;
        this._contentType = param2;
        this._classId = param3;
    }

    public get name(): string {
        return this._name;
    }

    public get contentType(): string {
        return this._contentType;
    }

    public get classId(): number {
        return this._classId;
    }
}
