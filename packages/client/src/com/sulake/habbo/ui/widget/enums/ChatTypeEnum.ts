import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ChatTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.enums::ChatTypeEnum'); }

    public static readonly _SafeStr_8319: number = 0;
    public static readonly WHISPER: number = 1;
    public static readonly SHOUT: number = 2;
}
