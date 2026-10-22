import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ClientDeviceTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.communication.enum::ClientDeviceTypeEnum'); }

    public static readonly UNKNOWN: number = 0;
    public static readonly PHONE: number = 1;
    public static readonly TABLET: number = 2;
    public static readonly BROWSER: number = 3;
    public static readonly DESKTOP: number = 4;
}
