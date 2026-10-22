import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarScaleType {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::AvatarScaleType'); }

    public static readonly LARGE: string = "h";
    public static readonly SMALL: string = "sh";
    public static readonly LARGE_TO_SMALL: string = "h_50";
    public static readonly DEFAULT_SCALE: string = "h";

    constructor() {
    }
}
