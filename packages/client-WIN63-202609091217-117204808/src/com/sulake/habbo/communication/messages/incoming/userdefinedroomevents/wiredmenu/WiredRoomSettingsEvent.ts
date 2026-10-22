import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredRoomSettingsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/WiredRoomSettingsMessageParser';

export class WiredRoomSettingsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu::WiredRoomSettingsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredRoomSettingsMessageParser);
    }

    public getParser(): WiredRoomSettingsMessageParser {
        return this._parser instanceof WiredRoomSettingsMessageParser ? this._parser : null;
    }
}
