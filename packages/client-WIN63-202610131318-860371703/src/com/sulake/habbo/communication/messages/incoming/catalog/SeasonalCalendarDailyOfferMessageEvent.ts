import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { CatalogPageMessageOfferData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPageMessageOfferData';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { SeasonalCalendarDailyOfferMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/SeasonalCalendarDailyOfferMessageParser';

export class SeasonalCalendarDailyOfferMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::SeasonalCalendarDailyOfferMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, SeasonalCalendarDailyOfferMessageParser);
    }

    public get offer(): CatalogPageMessageOfferData {
        return castTo(this.parser, SeasonalCalendarDailyOfferMessageParser).offerData;
    }

    public get pageId(): number {
        return castTo(this.parser, SeasonalCalendarDailyOfferMessageParser).pageId;
    }
}
