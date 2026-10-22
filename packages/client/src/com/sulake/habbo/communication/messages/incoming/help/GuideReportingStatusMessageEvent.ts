import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuideReportingStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideReportingStatusMessageParser';

export class GuideReportingStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::GuideReportingStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuideReportingStatusMessageParser);
    }

    public getParser(): GuideReportingStatusMessageParser {
        return this._parser instanceof GuideReportingStatusMessageParser ? this._parser : null;
    }
}
