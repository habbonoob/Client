import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomChatSettingsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/RoomChatSettingsMessageParser';

export class RoomChatSettingsMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.chat::RoomChatSettingsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomChatSettingsMessageParser);
    }

    public getParser(): RoomChatSettingsMessageParser {
        return this._parser instanceof RoomChatSettingsMessageParser ? this._parser : null;
    }
}
