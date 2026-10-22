import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class UIFlagEnum {
    static { registerClassName(this, 'com.sulake.habbo.session::UIFlagEnum'); }

    public static readonly FRIEND_BAR_OPEN: number = 1;
    public static readonly ROOM_TOOLS_OPEN: number = 2;

    constructor() {
    }
}
