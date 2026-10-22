import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MyCfhReportStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/MyCfhReportStatusMessageParser';

export class MyCfhReportStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.callforhelp::MyCfhReportStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MyCfhReportStatusMessageParser);
    }

    public getParser(): MyCfhReportStatusMessageParser {
        return this._parser instanceof MyCfhReportStatusMessageParser ? this._parser : null;
    }
}
