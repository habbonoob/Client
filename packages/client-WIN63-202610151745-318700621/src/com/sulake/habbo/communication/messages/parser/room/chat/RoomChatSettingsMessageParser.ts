import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { RoomChatSettings } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomChatSettings';

export class RoomChatSettingsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.chat::RoomChatSettingsMessageParser'); }

    declare private _chatSettings: RoomChatSettings;

    constructor() {
    }

    public flush(): boolean {
        this._chatSettings = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._chatSettings = RoomChatSettings.fromFloodSensitivity(param1.readInteger());
        return true;
    }

    public get chatSettings(): RoomChatSettings {
        return this._chatSettings;
    }
}
