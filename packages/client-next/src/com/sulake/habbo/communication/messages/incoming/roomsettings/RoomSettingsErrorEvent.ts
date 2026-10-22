import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomSettingsErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/RoomSettingsErrorMessageParser';

export class RoomSettingsErrorEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::RoomSettingsErrorEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomSettingsErrorMessageParser);
    }

    public getParser(): RoomSettingsErrorMessageParser {
        return this._parser instanceof RoomSettingsErrorMessageParser ? this._parser : null;
    }
}
