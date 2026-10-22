import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CampaignCalendarDataMessageParser } from '@/com/sulake/habbo/communication/messages/parser/campaign/CampaignCalendarDataMessageParser';

export class CampaignCalendarDataMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.campaign::CampaignCalendarDataMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CampaignCalendarDataMessageParser);
    }

    public getParser(): CampaignCalendarDataMessageParser {
        return this._parser instanceof CampaignCalendarDataMessageParser ? this._parser : null;
    }
}
