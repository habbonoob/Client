import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FurniId {
    static { registerClassName(this, 'com.sulake.habbo.utils::FurniId'); }

    private static readonly _SafeStr_8332: number = 2147418112;

    public static isBuilderClubId(param1: number): boolean {
        return param1 >= 2147418112;
    }

    constructor() {
    }
}
