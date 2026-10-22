import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomSettingsSaveErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/RoomSettingsSaveErrorMessageParser';

export class RoomSettingsSaveErrorEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::RoomSettingsSaveErrorEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomSettingsSaveErrorMessageParser);
    }

    public getParser(): RoomSettingsSaveErrorMessageParser {
        return this._parser instanceof RoomSettingsSaveErrorMessageParser ? this._parser : null;
    }
}
