import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabbiconEntryModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconEntryModel';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class HabbiconSetModel {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconSetModel'); }

    declare public id: string;

    declare public collectionId: number;
    static { (this.prototype as any).collectionId = 0; }

    declare public name: string;

    declare public title: string;

    declare public description: string;

    declare public _SafeStr_14123: BitmapData;

    public habbicons: HabbiconEntryModel[] = new Array<HabbiconEntryModel>(0).fill(null);

    declare public rewardHabbicon: HabbiconEntryModel;

    public completed: number = 0;
    public total: number = 0;
    public priceCredits: number = 0;
    public priceActivityPoints: number = 0;
    public activityPointType: number = 0;
    public canBuy: boolean = false;

    constructor() {
    }

    public get complete(): boolean {
        return this.total > 0 && this.completed >= this.total;
    }

    public get progressRatio(): number {
        return this.total <= 0 ? 0 : Math.max(0, Math.min(1, this.completed / this.total));
    }
}
