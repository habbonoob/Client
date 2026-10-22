import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CampaignCalendarData } from '@/com/sulake/habbo/communication/messages/parser/campaign/CampaignCalendarData';

export class CampaignCalendarDataMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.campaign::CampaignCalendarDataMessageParser'); }

    constructor() {
    }

    declare private _data: CampaignCalendarData;

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new CampaignCalendarData();
        this._data.parse(param1);
        return true;
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }

    public cloneData(): CampaignCalendarData {
        return this._data ? this._data.clone() : null;
    }
}
