import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TargetedOfferTrackingEvent {
    static { registerClassName(this, 'com.sulake.habbo.catalog.targetedoffers.util::TargetedOfferTrackingEvent'); }

    public static readonly TARGETED_OFFER_OPEN_CREDITS_PAGE_CLICKED: string = "targeted.offer.open.credits.page.clicked";
    public static readonly TARGETED_OFFER_WEB_SHOP_INCLIENT_OFFER_CLICKED: string = "targeted.offer.web.inclient.clicked";
    public static readonly TARGETED_OFFER_WEB_SHOP_INCLIENT_OFFER_REJECTED: string = "targeted.offer.web.inclient.rejected";

    constructor() {
    }
}
