import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class PerksUpdatedEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.session.events::PerksUpdatedEvent'); }

    public static readonly PERKS_UPDATED: string = "PUE_perks_updated";

    constructor() {
        super("PUE_perks_updated");
    }
}
