import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class BreedingRarityCategoryData {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::BreedingRarityCategoryData'); }

    declare public chance: number;
    static { (this.prototype as any).chance = 0; }

    declare public breeds: any[];

    constructor() {
    }
}
