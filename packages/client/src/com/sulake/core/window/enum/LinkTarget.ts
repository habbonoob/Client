import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class LinkTarget {
    static { registerClassName(this, 'com.sulake.core.window.enum::LinkTarget'); }

    public static readonly _SafeStr_7526: string = "_self";
    public static readonly BLANK: string = "_blank";
    public static readonly PARENT: string = "_parent";
    public static readonly TOP: string = "_top";
    public static readonly DEFAULT: string = "default";
    public static readonly INTERNAL: string = "internal";
}
