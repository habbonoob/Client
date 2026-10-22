import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ClubStatus {
    static { registerClassName(this, 'com.sulake.habbo.catalog.clubcenter.util::ClubStatus'); }

    public static readonly ACTIVE: string = "active";
    public static readonly NONE: string = "none";
    public static readonly _SafeStr_7552: string = "expired";

    constructor() {
    }
}
