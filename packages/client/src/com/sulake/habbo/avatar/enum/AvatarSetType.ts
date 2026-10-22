import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarSetType {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::AvatarSetType'); }

    public static readonly _SafeStr_7873: string = "full";
    public static readonly HEAD: string = "head";
    public static readonly BODY: string = "body";
}
