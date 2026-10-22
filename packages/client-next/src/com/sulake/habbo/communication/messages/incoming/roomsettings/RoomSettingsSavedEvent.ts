import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomSettingsSavedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/RoomSettingsSavedMessageParser';

export class RoomSettingsSavedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::RoomSettingsSavedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomSettingsSavedMessageParser);
    }

    public getParser(): RoomSettingsSavedMessageParser {
        return this._parser instanceof RoomSettingsSavedMessageParser ? this._parser : null;
    }
}
