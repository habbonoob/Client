import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ChatStyleTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.enums::ChatStyleTypeEnum'); }

    public static readonly NORMAL: number = 0;
    public static readonly GENERIC: number = 1;
    public static readonly BOT: number = 2;
}
