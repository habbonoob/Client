import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredRoomLogsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/roomlogs/WiredRoomLogsMessageParser';

export class WiredRoomLogsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu.roomlogs::WiredRoomLogsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredRoomLogsMessageParser);
    }

    public getParser(): WiredRoomLogsMessageParser {
        return this._parser instanceof WiredRoomLogsMessageParser ? this._parser : null;
    }
}
