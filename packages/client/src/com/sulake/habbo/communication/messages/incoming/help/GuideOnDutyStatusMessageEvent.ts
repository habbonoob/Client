import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuideOnDutyStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideOnDutyStatusMessageParser';

export class GuideOnDutyStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::GuideOnDutyStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuideOnDutyStatusMessageParser);
    }

    public getParser(): GuideOnDutyStatusMessageParser {
        return this._parser instanceof GuideOnDutyStatusMessageParser ? this._parser : null;
    }
}
