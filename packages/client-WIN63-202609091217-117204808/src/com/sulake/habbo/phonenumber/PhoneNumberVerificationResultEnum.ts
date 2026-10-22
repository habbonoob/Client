import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PhoneNumberVerificationResultEnum {
    static { registerClassName(this, 'com.sulake.habbo.phonenumber::PhoneNumberVerificationResultEnum'); }

    public static readonly NON_EXISTING: number = 0;
    public static readonly TOKEN_SENT: number = 1;
    public static readonly VERIFIED: number = 2;
    public static readonly OK: number = 3;
    public static readonly ERROR: number = 4;
    public static readonly RATE_LIMIT: number = 5;
    public static readonly NUMBER_MISTYPED: number = 6;
    public static readonly TOKEN_MISMATCH: number = 7;
    public static readonly NOT_FOUND: number = 8;
    public static readonly NON_VERIFIED: number = 9;
    public static readonly NUMBER_ALREADY_VERIFIED: number = 10;

    constructor() {
    }
}
