import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarEditorType {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::AvatarEditorType'); }

    public static readonly _SafeStr_8140: number = 0;
    public static readonly _SafeStr_8247: number = 1;
    public static readonly BOT_EDITOR: number = 2;
    public static readonly DEV_TOOL_EDITOR: number = 3;

    constructor() {
    }

    public static isDevelopmentEditor(param1: number): boolean {
        return param1 == 2 || param1 == 2 || param1 == 3;
    }
}
