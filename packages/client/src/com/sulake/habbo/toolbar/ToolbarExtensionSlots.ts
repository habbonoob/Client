import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ToolbarExtensionSlots {
    static { registerClassName(this, 'com.sulake.habbo.toolbar::ToolbarExtensionSlots'); }

    public static readonly SLOT_LOGOUTTOOLS: number = 0;
    public static readonly SLOT_PURSE: number = 0;
    public static readonly SLOT_SETTINGS: number = 1;
    public static readonly SLOT_CREDITS: number = 2;
    public static readonly SLOT_ENGAGEMENT_CURRENCY: number = 3;
    public static readonly SLOT_CLUB: number = 4;
    public static readonly SLOT_SEASONAL_CURRENCY: number = 5;
    public static readonly SLOT_BUILDER: number = 6;
    public static readonly SLOT_CITIZENSHIP_PROMO: number = 7;
    public static readonly SLOT_OFFERS: number = 8;
    public static readonly SLOT_ROOMTOOLS: number = 9;
    public static readonly SLOT_CLUB_PROMO: number = 10;
    public static readonly SLOT_CAMERA: number = 11;
    public static readonly SLOT_PHONE_NUMBER: number = 12;
    public static readonly SLOT_TARGETED_OFFER: number = 13;
}
