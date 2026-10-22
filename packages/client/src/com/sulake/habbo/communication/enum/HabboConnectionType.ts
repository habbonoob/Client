import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboConnectionType {
    static { registerClassName(this, 'com.sulake.habbo.communication.enum::HabboConnectionType'); }

    public static readonly HABBO_MAIN: string = "habbo";
    public static readonly NORMAL_MODE: number = 0;
    public static readonly DEVELOPMENT_MODE: number = 1;
    public static readonly NO_CRYPTO_MODE: number = 2;

    constructor() {
    }
}
