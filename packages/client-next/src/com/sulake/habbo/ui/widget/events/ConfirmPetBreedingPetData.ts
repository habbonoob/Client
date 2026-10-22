import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ConfirmPetBreedingPetData {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::ConfirmPetBreedingPetData'); }

    declare public name: string;

    declare public level: number;
    static { (this.prototype as any).level = 0; }

    declare public figure: string;

    declare public owner: string;

    declare public webId: number;
    static { (this.prototype as any).webId = 0; }

    constructor() {
    }
}
