import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomSettingsDataMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/RoomSettingsDataMessageParser';

export class RoomSettingsDataEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::RoomSettingsDataEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomSettingsDataMessageParser);
    }

    public getParser(): RoomSettingsDataMessageParser {
        return this._parser instanceof RoomSettingsDataMessageParser ? this._parser : null;
    }
}
