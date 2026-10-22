import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetBuilderSubscriptionUpdatedEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetBuilderSubscriptionUpdatedEvent'); }

    constructor(param1: boolean = false, param2: boolean = false) {
        super("CWE_BUILDER_SUBSCRIPTION_UPDATED", param1, param2);
    }
}
