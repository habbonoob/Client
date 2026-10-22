import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.event::CatalogEvent'); }

    public static readonly CATALOG_INITIALIZED: string = "CATALOG_INITIALIZED";
    public static readonly CATALOG_NOT_READY: string = "CATALOG_NOT_READY";
    public static readonly CATALOG_NEW_ITEMS_SHOW: string = "CATALOG_NEW_ITEMS_SHOW";
    public static readonly CATALOG_NEW_ITEMS_HIDE: string = "CATALOG_NEW_ITEMS_HIDE";
    public static readonly CATALOG_USER_SELECTED: string = "CATALOG_USER_SELECTED";
    public static readonly CATALOG_BUILDER_MEMBERSHIP_EXPIRED: string = "CATALOG_BUILDER_MEMBERSHIP_EXPIRED";
    public static readonly CATALOG_BUILDER_MEMBERSHIP_IN_GRACE: string = "CATALOG_BUILDER_MEMBERSHIP_IN_GRACE";
    public static readonly CATALOG_INVISIBLE_PAGE_VISITED: string = "CATALOG_INVISIBLE_PAGE_VISITED";
    public static readonly COLLECTIBLES_CLAIM_WAIT: string = "COLLECTIBLE_CLAIM_WAIT";
    public static readonly COLLECTIBLES_CLAIM_SUCCESS: string = "COLLECTIBLE_CLAIM_SUCCESS";
    public static readonly COLLECTIBLES_CLAIM_FAIL: string = "COLLECTIBLES_CLAIM_FAIL";
    public static readonly COLLECTIBLES_MINT_SUCCESS: string = "COLLECTIBLES_MINT_SUCCESS";
    public static readonly COLLECTIBLES_MINT_FAIL: string = "COLLECTIBLES_MINT_FAIL";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
