import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class NotificationExtraDataKey {
    static { registerClassName(this, 'com.sulake.habbo.notifications::NotificationExtraDataKey'); }

    public static readonly _SafeStr_14345: string = "time_display";
    public static readonly STAY: string = "stay";
    public static readonly ID: string = "id";
    public static readonly PRODUCT: string = "product";
    public static readonly _SafeStr_14346: string = "rarity";
    public static readonly _SafeStr_14347: string = "rarity_color";
    public static readonly TOGGLE_BUTTON_CALLBACK: string = "toggle_callback";

    constructor() {
    }
}
