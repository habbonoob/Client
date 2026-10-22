import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PetAccessRightEnum {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::PetAccessRightEnum'); }

    public static readonly OWNER_ONLY: number = 0;
    public static readonly _SafeStr_8364: number = 1;

    constructor() {
    }
}
