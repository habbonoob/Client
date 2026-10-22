import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CampaignCalendarDoorOpenedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/campaign/CampaignCalendarDoorOpenedMessageParser';

export class CampaignCalendarDoorOpenedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.campaign::CampaignCalendarDoorOpenedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CampaignCalendarDoorOpenedMessageParser);
    }

    public getParser(): CampaignCalendarDoorOpenedMessageParser {
        return this._parser instanceof CampaignCalendarDoorOpenedMessageParser ? this._parser : null;
    }
}
