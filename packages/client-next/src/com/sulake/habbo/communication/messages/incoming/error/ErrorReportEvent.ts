import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ErrorReportMessageParser } from '@/com/sulake/habbo/communication/messages/parser/error/ErrorReportMessageParser';

export class ErrorReportEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.error::ErrorReportEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ErrorReportMessageParser);
    }

    public getParser(): ErrorReportMessageParser {
        return this._parser instanceof ErrorReportMessageParser ? this._parser : null;
    }
}
