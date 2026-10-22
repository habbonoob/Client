import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ChatBubbleWidth {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.enum::ChatBubbleWidth'); }

    public static readonly NORMAL: number = 350;
    public static readonly THIN: number = 240;
    public static readonly WIDE: number = 2000;

    public static accordingToRoomChatSetting(param1: number): number {
        switch (param1) {
            case 0:
                return 2000;
            case 1:
                return 350;
            case 2:
                return 240;
            default:
                return 350;
        }
    }

    constructor() {
    }
}
