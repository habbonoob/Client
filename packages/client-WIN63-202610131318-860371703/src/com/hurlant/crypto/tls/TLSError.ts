import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TLSError extends Error {
    static { registerClassName(this, 'com.hurlant.crypto.tls::TLSError'); }

    public static readonly close_notify: number = 0;
    public static readonly _SafeStr_7804: number = 10;
    public static readonly bad_record_mac: number = 20;
    public static readonly decryption_failed: number = 21;
    public static readonly record_overflow: number = 22;
    public static readonly decompression_failure: number = 30;
    public static readonly handshake_failure: number = 40;
    public static readonly bad_certificate: number = 42;
    public static readonly _SafeStr_8406: number = 43;
    public static readonly _SafeStr_8405: number = 44;
    public static readonly _SafeStr_8472: number = 45;
    public static readonly _SafeStr_8592: number = 46;
    public static readonly _SafeStr_7699: number = 47;
    public static readonly unknown_ca: number = 48;
    public static readonly access_denied: number = 49;
    public static readonly decode_error: number = 50;
    public static readonly decrypt_error: number = 51;
    public static readonly _SafeStr_8375: number = 70;
    public static readonly insufficient_security: number = 71;
    public static readonly internal_error: number = 80;
    public static readonly user_canceled: number = 90;
    public static readonly no_renegotiation: number = 100;

    constructor(param1: string, param2: number) {
        super(param1); this.errorID = param2;
    }
}
