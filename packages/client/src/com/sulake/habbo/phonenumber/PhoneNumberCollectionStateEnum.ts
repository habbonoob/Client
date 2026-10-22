import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PhoneNumberCollectionStateEnum {
    static { registerClassName(this, 'com.sulake.habbo.phonenumber::PhoneNumberCollectionStateEnum'); }

    public static readonly NON_EXISTING: number = 0;
    public static readonly _SafeStr_7572: number = 1;
    public static readonly NEVER_AGAIN: number = 2;
    public static readonly TOKEN_INPUT: number = 3;
}
