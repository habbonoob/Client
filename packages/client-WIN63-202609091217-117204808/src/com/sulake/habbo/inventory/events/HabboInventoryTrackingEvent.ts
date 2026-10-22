import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboInventoryTrackingEvent {
    static { registerClassName(this, 'com.sulake.habbo.inventory.events::HabboInventoryTrackingEvent'); }

    public static readonly HABBO_INVENTORY_TRACKING_EVENT_CLOSED: string = "HABBO_INVENTORY_TRACKING_EVENT_CLOSED";
    public static readonly HABBO_INVENTORY_TRACKING_EVENT_FURNI: string = "HABBO_INVENTORY_TRACKING_EVENT_FURNI";
    public static readonly HABBO_INVENTORY_TRACKING_EVENT_POSTERS: string = "HABBO_INVENTORY_TRACKING_EVENT_POSTERS";
    public static readonly HABBO_INVENTORY_TRACKING_EVENT_BADGES: string = "HABBO_INVENTORY_TRACKING_EVENT_BADGES";
    public static readonly HABBO_INVENTORY_TRACKING_EVENT_ACHIEVEMENTS: string = "HABBO_INVENTORY_TRACKING_EVENT_ACHIEVEMENTS";
    public static readonly HABBO_INVENTORY_TRACKING_EVENT_TRADING: string = "HABBO_INVENTORY_TRACKING_EVENT_TRADING";
    public static readonly HABBO_INVENTORY_TRACKING_EVENT_PETS: string = "HABBO_INVENTORY_TRACKING_EVENT_PETS";
    public static readonly HABBO_INVENTORY_TRACKING_EVENT_BOTS: string = "HABBO_INVENTORY_TRACKING_EVENT_BOTS";
    public static readonly HABBO_INVENTORY_TRACKING_EVENT_COLLECTIBLES: string = "HABBO_INVENTORY_TRACKING_EVENT_COLLECTIBLES";

    constructor() {
    }
}
