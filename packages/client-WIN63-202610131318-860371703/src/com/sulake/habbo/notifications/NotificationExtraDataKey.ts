import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class NotificationExtraDataKey {
    static { registerClassName(this, 'com.sulake.habbo.notifications::NotificationExtraDataKey'); }

    public static readonly _SafeStr_14982: string = "time_display";
    public static readonly STAY: string = "stay";
    public static readonly ID: string = "id";
    public static readonly PRODUCT: string = "product";
    public static readonly _SafeStr_14983: string = "rarity";
    public static readonly _SafeStr_14984: string = "rarity_color";
    public static readonly TOGGLE_BUTTON_CALLBACK: string = "toggle_callback";

    constructor() {
    }
}
