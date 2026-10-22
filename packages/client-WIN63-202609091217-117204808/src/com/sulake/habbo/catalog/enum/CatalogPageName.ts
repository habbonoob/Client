import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class CatalogPageName {
    static { registerClassName(this, 'com.sulake.habbo.catalog.enum::CatalogPageName'); }

    public static readonly CATALOG_PAGE_DUCKETS_INFO: string = "ducket_info";
    public static readonly CATALOG_PAGE_CREDITS: string = "credits";
    public static readonly CATALOG_PAGE_SPECIAL_EFFECTS: string = "avatar_effects";
    public static readonly CATALOG_PAGE_CLUB: string = "hc_membership";
    public static readonly CATALOG_PAGE_CLUB_GIFTS: string = "club_gifts";
    public static readonly CATALOG_PAGE_SOLD_RARES: string = "limited_sold";
    public static readonly CATALOG_PAGE_PETS_ACCESSORIES: string = "pet_accessories";
    public static readonly CATALOG_PAGE_SONG_DISK_SHOP: string = "trax_songs";
    public static readonly CATALOG_PAGE_NEW_ADDITIONS: string = "new_additions";
    public static readonly CATALOG_PAGE_SHELL_GIFTS: string = "quest_shell";
    public static readonly CATALOG_PAGE_SNOWFLAKE_GIFTS: string = "quest_snowflakes";
    public static readonly CATALOG_PAGE_VALENTINES_GIFTS: string = "val_quests";
    public static readonly CATALOG_PAGE_GROUP_FURNITURE: string = "guild_custom_furni";
    public static readonly CATALOG_PAGE_GIFT_SHOP: string = "gift_shop";
    public static readonly CATALOG_PAGE_HORSE_STYLES: string = "horse_styles";
    public static readonly CATALOG_PAGE_HORSE_SHOE: string = "horse_shoe";
    public static readonly CATALOG_PAGE_SPEND_NUTS: string = "set_easter";
    public static readonly CATALOG_PAGE_ECOTRON: string = "ecotron_transform";
    public static readonly CATALOG_PAGE_LOYALTY_POINTS_INFO: string = "loyalty_info";
    public static readonly CATALOG_PAGE_BUNDLES: string = "room_bundles";
    public static readonly CATALOG_PAGE_MOBILE_BUNDLES: string = "room_bundles_mobile";
    public static readonly CATALOG_PAGE_SUBSCRIPTIONS: string = "habbo_club_desktop";
    public static readonly CATALOG_PAGE_MOBILE_SUBSCRIPTIONS: string = "mobile_subscriptions";

    constructor() {
    }
}
