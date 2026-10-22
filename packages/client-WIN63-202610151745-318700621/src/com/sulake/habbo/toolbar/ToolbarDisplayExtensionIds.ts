import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ToolbarDisplayExtensionIds {
    static { registerClassName(this, 'com.sulake.habbo.toolbar::ToolbarDisplayExtensionIds'); }

    public static readonly _SafeStr_8058: string = "toolbar_dimmer";
    public static readonly _SafeStr_8044: string = "purse";
    public static readonly CREDITS_EXTENSION_ID: string = "purse_credits";
    public static readonly _SafeStr_8284: string = "purse_engagement_currency";
    public static readonly _SafeStr_8324: string = "purse_habbo_club";
    public static readonly _SafeStr_8742: string = "purse_seasonal_currency";
    public static readonly _SafeStr_8037: string = "logout_tools";
    public static readonly TALENT_PROMO_EXTENSION_ID: string = "talent_promo";
    public static readonly ROOM_TOOLS_EXTENSION_ID: string = "room_tools";
    public static readonly CLUB_PROMO: string = "club_promo";
    public static readonly VIP_QUESTS: string = "vip_quests";
    public static readonly MYSTERY_BOX: string = "mystery_box";
    public static readonly VIDEO_OFFERS: string = "video_offers";
    public static readonly BUILDER: string = "builder";
    public static readonly _SafeStr_8402: string = "settings";
    public static readonly PHONE_NUMBER: string = "phone_number";
    public static readonly VERIFICATION_CODE: string = "verification_code";
    public static readonly RETURN_GIFT: string = "return_gift";
    public static readonly TARGETED_OFFER: string = "targeted_offer";
    public static readonly NEW_FEATURE: string = "new_feature";

    constructor() {
    }
}
