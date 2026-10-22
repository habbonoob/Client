import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredErrorLogsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/WiredErrorLogsMessageParser';

export class WiredErrorLogsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu::WiredErrorLogsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredErrorLogsMessageParser);
    }

    public getParser(): WiredErrorLogsMessageParser {
        return this._parser instanceof WiredErrorLogsMessageParser ? this._parser : null;
    }
}
