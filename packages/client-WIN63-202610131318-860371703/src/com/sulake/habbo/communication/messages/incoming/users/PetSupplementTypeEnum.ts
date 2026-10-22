import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PetSupplementTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::PetSupplementTypeEnum'); }

    public static readonly WATER: number = 0;
    public static readonly LIGHT: number = 1;
    public static readonly _SafeStr_8711: number = 2;
    public static readonly _SafeStr_7976: number = 3;
    public static readonly _SafeStr_7605: number = 4;

    constructor() {
    }
}
