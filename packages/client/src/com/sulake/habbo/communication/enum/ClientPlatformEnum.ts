import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ClientPlatformEnum {
    static { registerClassName(this, 'com.sulake.habbo.communication.enum::ClientPlatformEnum'); }

    public static readonly UNKNOWN: number = 0;
    public static readonly FLASH: number = 1;
    public static readonly IOS: number = 2;
    public static readonly ANDROID: number = 3;
    public static readonly WEBGL: number = 4;
    public static readonly MACOS: number = 5;
    public static readonly WIN: number = 6;
    public static readonly LINUX: number = 7;
}
