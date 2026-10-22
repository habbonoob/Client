import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabbiconEntryModel {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconEntryModel'); }

    declare public id: string;

    declare public habbiconId: number;
    static { (this.prototype as any).habbiconId = 0; }

    declare public collectionId: number;
    static { (this.prototype as any).collectionId = 0; }

    declare public collectionName: string;

    declare public collectionTitle: string;

    declare public name: string;

    declare public description: string;

    declare public _SafeStr_14887: number;
    static { (this.prototype as any)._SafeStr_14887 = 0; }

    declare public state: number;
    static { (this.prototype as any).state = 0; }

    declare public owned: boolean;
    static { (this.prototype as any).owned = false; }

    declare public favorite: boolean;
    static { (this.prototype as any).favorite = false; }

    declare public claimable: boolean;
    static { (this.prototype as any).claimable = false; }

    declare public purchasable: boolean;
    static { (this.prototype as any).purchasable = false; }

    declare public isReward: boolean;
    static { (this.prototype as any).isReward = false; }

    declare public priceCredits: number;
    static { (this.prototype as any).priceCredits = 0; }

    declare public priceActivityPoints: number;
    static { (this.prototype as any).priceActivityPoints = 0; }

    declare public activityPointType: number;
    static { (this.prototype as any).activityPointType = 0; }

    declare public color: number;
    static { (this.prototype as any).color = 0; }

    constructor() {
    }
}
