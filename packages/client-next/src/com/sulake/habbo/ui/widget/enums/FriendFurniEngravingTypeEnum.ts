import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FriendFurniEngravingTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.enums::FriendFurniEngravingTypeEnum'); }

    public static readonly LOVE_LOCK: number = 0;
    public static readonly CARVE_A_TREE: number = 1;
    public static readonly FRIENDS_PORTRAIT: number = 2;
    public static readonly _SafeStr_8489: number = 3;
    public static readonly _SafeStr_8637: number = 4;

    constructor() {
    }
}
