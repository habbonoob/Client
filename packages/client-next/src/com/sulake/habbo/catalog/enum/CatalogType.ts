import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class CatalogType {
    static { registerClassName(this, 'com.sulake.habbo.catalog.enum::CatalogType'); }

    public static readonly NORMAL: string = "NORMAL";
    public static readonly BUILDER: string = "BUILDERS_CLUB";

    constructor() {
    }
}
