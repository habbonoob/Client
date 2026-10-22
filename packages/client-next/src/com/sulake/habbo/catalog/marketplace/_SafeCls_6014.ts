import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_6014 {
    static { registerClassName(this, 'com.sulake.habbo.catalog.marketplace::_SafeCls_6014'); }

    public static readonly OPEN: number = 1;
    public static readonly SOLD: number = 2;
    public static readonly EXPIRED: number = 3;

    constructor() {
    }

    public static isClearable(param1: number): boolean {
        return param1 == 2 || param1 == 3;
    }
}
