import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FurnitureContextMenuTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.enums::FurnitureContextMenuTypeEnum'); }

    public static readonly DUMMY: string = "DUMMY";
    public static readonly FRIEND_FURNITURE: string = "FRIEND_FURNITURE";
    public static readonly MONSTERPLANT_SEED: string = "MONSTERPLANT_SEED";
    public static readonly MYSTERY_BOX: string = "MYSTERY_BOX";
    public static readonly EFFECT_BOX: string = "EFFECT_BOX";
    public static readonly MYSTERY_TROPHY: string = "MYSTERY_TROPHY";
    public static readonly RANDOM_TELEPORT: string = "RANDOM_TELEPORT";
    public static readonly PURCHASABLE_CLOTHING: string = "PURCHASABLE_CLOTHING";
    public static readonly GENERIC_USABLE: string = "GENERIC_USABLE";

    constructor() {
    }
}
