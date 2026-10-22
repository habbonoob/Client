import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ExternalVariables {
    static { registerClassName(this, 'com.sulake.habbo.catalog.enum::ExternalVariables'); }

    public static readonly _SafeStr_8626: string = "web.shop.relativeUrl";
    public static readonly _SafeStr_8061: string = "web.shop.subscription.relativeUrl";

    constructor() {
    }
}
