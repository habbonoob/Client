import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PetSupplementTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.enums::PetSupplementTypeEnum'); }

    public static readonly WATER: number = 0;
    public static readonly LIGHT: number = 1;

    constructor() {
    }
}
