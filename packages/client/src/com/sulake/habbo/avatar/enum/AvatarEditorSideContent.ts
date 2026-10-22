import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarEditorSideContent {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::AvatarEditorSideContent'); }

    public static readonly NOTHING: string = "nothing";
    public static readonly WARDROBE: string = "wardrobe";
}
