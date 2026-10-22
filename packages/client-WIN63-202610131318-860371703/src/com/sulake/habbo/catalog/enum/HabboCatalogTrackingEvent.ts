import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboCatalogTrackingEvent {
    static { registerClassName(this, 'com.sulake.habbo.catalog.enum::HabboCatalogTrackingEvent'); }

    public static readonly HABBO_CATALOG_TRACKING_EVENT_OPEN: string = "HABBO_CATALOG_TRACKING_EVENT_OPEN";
    public static readonly HABBO_CATALOG_TRACKING_EVENT_CLOSE: string = "HABBO_CATALOG_TRACKING_EVENT_CLOSE";

    constructor() {
    }
}
